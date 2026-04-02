import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import HotelCheckoutStepper from "./HotelCheckoutStepper";
import HotelGuestDetails from "./HotelGuestDetails";
import HotelReviewSection from "./HotelReviewSection";
import HotelStatusSection from "./HotelStatusSection";
import { Star, Calendar, Users, ShieldCheck } from "lucide-react";
import { useCreateBookingMutation, useVerifyPaymentMutation } from "../../../services/flightService";
import { addBooking } from "../../../utils/bookingUtils";

const STEPS = ["Guests", "Review & Pay", "Confirmation"];

export default function HotelCheckoutPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    
    const [currentStep, setCurrentStep] = useState(0);
    const [hotel, setHotel] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [guests, setGuests] = useState([]);
    const [contactInfo, setContactInfo] = useState({ email: "", phone: "" });
    const [isProcessing, setIsProcessing] = useState(false);
    const [bookingResult, setBookingResult] = useState(null);
    const token = localStorage.getItem("token");

    const [createBooking, { isLoading: isBookingLoading }] = useCreateBookingMutation();
    const [verifyPayment] = useVerifyPaymentMutation();

    useEffect(() => {
        // Source selection overview
        const state = location.state;
        const hotelId = searchParams.get("id");
        const roomName = searchParams.get("room") || "Standard Room";
        const paxCount = Number(searchParams.get("guests") || state?.pax || 2);
        const checkIn = searchParams.get("checkIn") || state?.checkIn;
        const checkOut = searchParams.get("checkOut") || state?.checkOut;

        const savedHotel = localStorage.getItem("yatralo-selected-hotel");
        let hotelToUse = state?.hotel;

        if (!hotelToUse && (hotelId || savedHotel)) {
            if (savedHotel) {
                const h = JSON.parse(savedHotel);
                if (!hotelId || h.id === hotelId) hotelToUse = h;
            }
        }

        if (hotelToUse) {
            setHotel({ ...hotelToUse, roomType: roomName });
            setTotalAmount(state?.totalAmount || hotelToUse.price);
            setGuests(Array.from({ length: paxCount }, () => ({ title: "Mr", firstName: "", lastName: "" })));
        } else {
            navigate("/hotels");
            return;
        }

        // Load contact from local storage if exists
        const savedContact = localStorage.getItem("yatralo-contact");
        if (savedContact) setContactInfo(JSON.parse(savedContact));

    }, [location.state, searchParams, navigate]);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handleNext = () => {
        if (currentStep === 0) {
            // Validate Guests
            const isValid = guests.every(g => g.firstName && g.lastName);
            if (!isValid || !contactInfo.email || !contactInfo.phone) {
                toast.error("Please provide all required guest and contact details.");
                return;
            }
            if (!token) {
                toast.error("Please login to continue with the booking.");
                return;
            }
            localStorage.setItem("yatralo-contact", JSON.stringify(contactInfo));
            setCurrentStep(1);
        } else if (currentStep === 1) {
            handleRazorpayPayment();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
        else navigate(-1);
    };

    const handleRazorpayPayment = async () => {
        if (!window.Razorpay) {
            toast.error("Razorpay Service is initializing. Please wait...");
            return;
        }

        setIsProcessing(true);

        try {
            const bookingPayload = {
                type: "hotel",
                from: hotel.city,
                to: hotel.name,
                travelDate: searchParams.get("checkIn") || location.state?.checkIn || new Date().toLocaleDateString(),
                totalPrice: totalAmount,
                providerName: hotel.name,
                passengers: guests.length,
                details: {
                    hotel: hotel,
                    contact: contactInfo,
                    guests: guests
                }
            };

            const createResponse = await createBooking(bookingPayload).unwrap();

            if (!createResponse.success || !createResponse.orderId) {
                toast.error(createResponse.message || "Failed to initiate booking.");
                setIsProcessing(false);
                return;
            }

            const options = {
                key: "rzp_test_SSesz1GFvxuPR3",
                amount: Math.round(totalAmount * 100),
                currency: "INR",
                name: "Yatralo Hotels",
                description: `Stay at ${hotel.name}`,
                order_id: createResponse.orderId,
                handler: async (response) => {
                    try {
                        setIsProcessing(true);
                        const verifyPayload = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            bookingId: createResponse.bookingId 
                        };

                        const verifyResponse = await verifyPayment(verifyPayload).unwrap();

                        if (verifyResponse.success) {
                            const result = {
                                bookingId: verifyResponse.booking._id,
                                hotelDetails: hotel,
                                amount: totalAmount,
                                guests: guests,
                                date: new Date().toLocaleDateString(),
                                checkIn: searchParams.get("checkIn") || location.state?.checkIn || "20 Apr 2026",
                                checkOut: searchParams.get("checkOut") || location.state?.checkOut || "21 Apr 2026",
                                nights: Number(searchParams.get("nights") || location.state?.nights || 1)
                            };
                            
                            setBookingResult(result);
                            setCurrentStep(2);
                            
                            addBooking({ 
                                ...result, 
                                type: 'hotel', 
                                fromCode: hotel.city, 
                                toCode: hotel.name,
                                totalPrice: totalAmount,
                                travelDate: result.checkIn,
                                providerName: hotel.name,
                                status: 'confirmed'
                            });
                        } else {
                            toast.error("Payment verification failed.");
                        }
                    } catch (err) {
                        toast.error("Verification error occurred.");
                    } finally {
                        setIsProcessing(false);
                    }
                },
                prefill: {
                    name: guests[0].firstName + " " + guests[0].lastName,
                    email: contactInfo.email,
                    contact: contactInfo.phone,
                },
                theme: { color: "#7c3aed" },
                modal: { ondismiss: () => setIsProcessing(false) }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            toast.error(err?.data?.message || "Initiation failed.");
            setIsProcessing(false);
        }
    };

    if (!hotel) return null;

    return (
        <div className="min-h-screen bg-[#f5f7fa] pt-28 pb-20 font-sans">
            <div className="max-w-7xl mx-auto px-6">
                
                <div className="flex justify-center mb-16">
                    <HotelCheckoutStepper currentStep={currentStep} steps={STEPS} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                   <div className="lg:col-span-2">
                        {currentStep === 0 && (
                            <HotelGuestDetails 
                                guests={guests} 
                                setGuests={setGuests} 
                                contactInfo={contactInfo} 
                                setContactInfo={setContactInfo} 
                                onNext={handleNext} 
                            />
                        )}
                        {currentStep === 1 && (
                            <HotelReviewSection 
                                hotel={hotel} 
                                guests={guests} 
                                contactInfo={contactInfo} 
                                totalAmount={totalAmount} 
                                onNext={handleNext} 
                                onBack={handleBack} 
                                isLoading={isProcessing}
                                checkIn={searchParams.get("checkIn") || location.state?.checkIn}
                                checkOut={searchParams.get("checkOut") || location.state?.checkOut}
                                nights={Number(searchParams.get("nights") || location.state?.nights || 1)}
                            />
                        )}
                        {currentStep === 2 && (
                            <HotelStatusSection 
                                bookingResult={bookingResult} 
                                guests={guests}
                                fromName={hotel.city} 
                                toName={hotel.name} 
                            />
                        )}
                   </div>

                   {currentStep < 2 && (
                      <aside className="space-y-6">
                         {/* Sticky Selection Summary */}
                         <div className="sticky top-40 bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-700 group overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600" />
                            <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-10 flex items-center gap-3">
                               <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                               Selection Overview
                            </h3>
                            
                            <div className="bg-slate-50 p-6 rounded-3xl mb-10 group-hover:bg-blue-50/50 transition-colors">
                               <div className="flex items-center gap-4 mb-6">
                                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-100 p-0.5 group-hover:scale-110 transition-transform duration-500">
                                     <img src={hotel.image || hotel.images?.[0] || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'} className="w-full h-full object-cover rounded-xl" alt="" />
                                  </div>
                                  <div>
                                     <p className="text-sm font-black text-slate-900 tracking-tight leading-none uppercase italic">{hotel.name}</p>
                                     <div className="flex items-center gap-1 mt-1 font-black text-[#f97316]">
                                        <Star size={10} className="fill-[#f97316]" />
                                        <span className="text-[10px] uppercase tracking-widest">{hotel.rating} Excellent</span>
                                     </div>
                                  </div>
                               </div>
                               <div className="space-y-4 pt-6 border-t border-slate-200/50">
                                  <div className="flex items-center gap-3">
                                     <Calendar size={14} className="text-slate-300" />
                                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{searchParams.get("checkIn") || location.state?.checkIn || '20 Apr'} - {searchParams.get("checkOut") || location.state?.checkOut || '21 Apr'}</p>
                                  </div>
                                  <div className="flex items-center gap-3">
                                     <Users size={14} className="text-slate-300" />
                                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{guests.length} Adults | 1 Room</p>
                                  </div>
                               </div>
                            </div>

                            <div className="space-y-4 pt-10 border-t border-slate-100">
                               <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest text-slate-400"><span>Net Fare</span><span className="text-slate-700">₹ {Math.round(totalAmount*0.82).toLocaleString()}</span></div>
                               <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest text-slate-400"><span>Tax & Service Fees</span><span className="text-slate-700">₹ {Math.round(totalAmount*0.18).toLocaleString()}</span></div>
                               <div className="pt-8 flex justify-between items-end bg-gradient-to-b from-transparent to-slate-50/50 -mx-10 px-10 -mb-10 pb-10">
                                  <div>
                                     <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 leading-none">Grand Total</p>
                                     <h4 className="text-4xl font-black text-slate-900 tracking-tighter">₹ {totalAmount.toLocaleString()}</h4>
                                  </div>
                                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform"><ShieldCheck size={24} /></div>
                               </div>
                            </div>
                         </div>
                      </aside>
                   )}
                </div>
            </div>
        </div>
    );
}
