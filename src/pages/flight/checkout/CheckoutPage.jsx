import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import { useGetUserQuery } from "../../../services/userService";
import { 
    useCreateBookingMutation, 
    useVerifyPaymentMutation 
} from "../../../services/flightService";
import { formatInr } from "../../../utils/bookingUtils";
import { ShieldCheck, Calendar, Info, ArrowRight, User, Phone, Mail, UserCheck, ChevronRight, X as CloseIcon } from "lucide-react";


// New Components
import CheckoutStepper from "./CheckoutStepper";
import PassengerDetailsComponent from "./PassengerDetailsComponent";
import ReviewDetailsComponent from "./ReviewDetailsComponent";
import StatusPageComponent from "./StatusPageComponent";

const STEPS = ["Travellers", "Review", "Status"];

export default function CheckoutPage() {
    const { step } = useParams();
    const navigate = useNavigate();
    
    // Step Mapping: /checkout/passengers (0), /checkout/review (1), /checkout/status (2)
    const currentStep = step === "review" ? 1 : step === "status" ? 2 : 0;

    // Booking State from localStorage
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [addOns, setAddOns] = useState(null);
    const [bookingInfo, setBookingInfo] = useState({ pax: 1, tripType: "oneway" });

    const [token, setToken] = useState(localStorage.getItem("token"));
    const { data: userData } = useGetUserQuery(token, { skip: !token });
    
    const [passengersLocal, setPassengersLocal] = useState([]);
    const [contactInfoLocal, setContactInfoLocal] = useState({ email: "", phone: "", countryCode: "+91" });
    const [bookingResult, setBookingResultLocal] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);


    const [createBooking, { isLoading: isMutationLoading }] = useCreateBookingMutation();
    const [verifyPayment] = useVerifyPaymentMutation();

    useEffect(() => {
        // Load pay SDK once
        const script = document.createElement("script");
        script.src = "https://checkout.pay.com/v1/checkout.js";
        script.async = true;
        script.onerror = () => {
            console.error("pay SDK could not be loaded. Please disable AdBlockers or check your connection.");
            toast.error("Security Service Blocked (pay). Please check your internet.");
        };
        document.body.appendChild(script);

    }, []);


    useEffect(() => {
        const flight = localStorage.getItem("yatralo-selected-flight");
        const storedAddOns = localStorage.getItem("yatralo-addons");
        const info = localStorage.getItem("yatralo-booking-info");

        if (!flight) {
            navigate("/flights");
            return;
        }

        const parsedFlight = JSON.parse(flight);
        setSelectedFlight(parsedFlight);

        if (storedAddOns) setAddOns(JSON.parse(storedAddOns));
        if (info) setBookingInfo(JSON.parse(info));

        // Default to step 0 if no step in URL
        if (!step) navigate("/checkout/passengers", { replace: true });

        // Load passengers/contact from localStorage if they exist (for back navigation)
        const storedPassengers = localStorage.getItem("yatralo-passengers");
        const storedContact = localStorage.getItem("yatralo-contact");

        if (storedPassengers) {
            setPassengersLocal(JSON.parse(storedPassengers));
        } else {
            const count = parsedFlight.pax || bookingInfo.pax || 1;
            setPassengersLocal(Array.from({ length: count }, () => ({ title: "Mr", firstName: "", lastName: "", gender: "Male", dob: "", nationality: "India" })));
        }

        if (storedContact) {
            setContactInfoLocal(JSON.parse(storedContact));
        }
    }, [navigate, step]); // Added step to dependency array

    const calculateTotal = () => {
        let total = Number(selectedFlight?.price) || 0;
        const pCount = Number(selectedFlight?.pax || bookingInfo?.pax || 1);

        const fuelSurcharge = 850 * pCount;
        const airportTax = 420 * pCount;
        const convenienceFee = 300;

        const addOnsPrice = ((addOns?.insurance ? 249 : 0) * pCount) + ((addOns?.baggage || 0) * 450) + (addOns?.seatPrice || 0);
        return total + fuelSurcharge + airportTax + convenienceFee + addOnsPrice;

    };

    const handlePassengerSubmit = () => {
        const isValid = passengersLocal.every(p => p.firstName && p.lastName && p.dob);
        if (!isValid) {
            toast.error("Please fill all passenger details correctly");
            return;
        }
        if (!contactInfoLocal.email || !contactInfoLocal.phone) {
            toast.error("Contact details is mandatory");
            return;
        }
        localStorage.setItem("yatralo-passengers", JSON.stringify(passengersLocal));
        localStorage.setItem("yatralo-contact", JSON.stringify(contactInfoLocal));
        navigate("/checkout/review");
    };

    const handlepayPayment = async () => {
        console.log("Initiating pay Flow...");
        if (!window.pay) {
            toast.error("pay SDK is still loading...");
            return;
        }

        const totalAmount = calculateTotal();
        setIsProcessing(true);

        try {
            // 1. Create PRE-PAYMENT Booking in Backend
            const bookingPayload = {
                type: "flight",
                fromCode: selectedFlight.origin,
                toCode: selectedFlight.destination,
                travelDate: selectedFlight.depDate,
                totalPrice: totalAmount,
                providerName: selectedFlight.airline,
                passengers: passengersLocal.length,
                details: {
                    flight: selectedFlight,
                    addOns,
                    contact: contactInfoLocal,
                    passengers: passengersLocal
                }
            };

            const createResponse = await createBooking(bookingPayload).unwrap();

            if (!createResponse.success || !createResponse.orderId) {
                toast.error(createResponse.message || "Failed to initiate booking.");
                setIsProcessing(false);
                return;
            }

            const options = {
                key: "rzp_test_SSesz1GFvxuPR3", // Corrected key to match backend .env
                amount: Math.round(totalAmount * 100),
                currency: "INR",
                name: "Yatralo Travels",
                description: "Flight Booking Payment",
                order_id: createResponse.orderId,
                handler: async (response) => {
                    try {
                        setIsProcessing(true);
                        const verifyPayload = {
                            pay_order_id: response.pay_order_id,
                            pay_payment_id: response.pay_payment_id,
                            pay_signature: response.pay_signature,
                            bookingId: createResponse.bookingId // Corrected from .booking._id
                        };

                        const verifyResponse = await verifyPayment(verifyPayload).unwrap();

                        if (verifyResponse.success) {
                            toast.success("Payment Verified! Fetching E-Ticket...");
                            handleBookingSuccess({
                                ...verifyResponse.booking,
                                amount: totalAmount,
                                flightDetails: selectedFlight
                            });
                        } else {
                            toast.error(verifyResponse.message || "Verification failed. Check your wallet.");
                        }
                    } catch (err) {
                        toast.error("Network Aborted by Backend Service.");
                    } finally {
                        setIsProcessing(false);
                    }
                },
                modal: {
                    ondismiss: () => setIsProcessing(false)
                },
                prefill: {
                    name: (passengersLocal[0]?.firstName || "") + " " + (passengersLocal[0]?.lastName || ""),
                    email: contactInfoLocal.email,
                    contact: contactInfoLocal.phone,
                },
                theme: { color: "#4f46e5" },
            };


            const rzp = new window.pay(options);
            rzp.open();
        } catch (err) {
            const errMsg = err?.data?.message || err?.message || "Initiation Aborted by Backend Service.";
            toast.error(errMsg);
            console.error("Initiation Error:", err);
            setIsProcessing(false);
        }
    };



    const handleBookingSuccess = (result) => {
        setBookingResultLocal(result);
        navigate("/checkout/status");

        localStorage.setItem("yatralo-last-booking", JSON.stringify({
            result,
            passengers: passengersLocal,
            flight: selectedFlight
        }));
    };

    if (!selectedFlight || !addOns) return null;

    return (
        <div className="min-h-screen bg-[#f5f7fa] pt-24 pb-20 font-sans">
            <div className="max-w-7xl mx-auto px-6">

                <div className="flex justify-center mb-16">
                   <CheckoutStepper currentStep={currentStep} steps={STEPS} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        {currentStep === 0 && (
                            <PassengerDetailsComponent
                                passengers={passengersLocal}
                                setPassengers={setPassengersLocal}
                                pax={selectedFlight.pax || bookingInfo.pax || 1}
                                userData={userData}
                                onNext={handlePassengerSubmit}
                                contactInfo={contactInfoLocal}
                                setContactInfo={setContactInfoLocal}
                            />
                        )}
                        {currentStep === 1 && (
                            <ReviewDetailsComponent
                                selectedFlight={selectedFlight}
                                passengers={passengersLocal}
                                contactInfo={contactInfoLocal}
                                addOns={addOns}
                                calculateTotal={calculateTotal}
                                onNext={handlepayPayment}
                                onBack={() => navigate("/checkout/passengers")}
                                isLoading={isProcessing || isMutationLoading}
                            />
                        )}
                        {currentStep === 2 && (
                            <StatusPageComponent
                                bookingResult={bookingResult}
                                passengers={passengersLocal}
                                type="flight"
                                fromName={selectedFlight.originCity}
                                toName={selectedFlight.destinationCity}
                            />
                        )}
                    </div>

                    {currentStep < 2 && (
                        <aside className="space-y-6">
                           <div className="sticky top-40 bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group">
                              <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600" />
                              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                                 <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                                 Fare Summary
                              </h3>

                              <div className="bg-slate-50 p-6 rounded-2xl space-y-4 mb-8 group-hover:bg-blue-50/30 transition-colors">
                                 <div className="flex items-center justify-between gap-4">
                                    <div className="flex-1">
                                       <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none mb-1.5">{selectedFlight.code} {selectedFlight.flightNo}</p>
                                       <p className="text-xl font-black text-slate-800 tracking-tight leading-tight">{selectedFlight.origin} <span className="text-slate-300 mx-1">→</span> {selectedFlight.destination}</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-900 shadow-sm group-hover:scale-110 transition-transform">
                                       <img src={`https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/${selectedFlight.code}.png`} className="w-8" alt={selectedFlight.airline} />
                                    </div>
                                 </div>
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter flex items-center gap-2">
                                    <Calendar size={12} className="text-slate-300" /> {selectedFlight.depDate} • Economy
                                 </p>
                              </div>
                              
                              <div className="space-y-4 pt-4 border-t border-slate-100">
                                 <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Fare</span> 
                                    <span className="font-bold text-slate-700">₹{selectedFlight.price.toLocaleString()}</span>
                                 </div>
                                 <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Taxes & Fees</span> 
                                    <span className="font-bold text-slate-700">₹{( (850* (selectedFlight.pax||bookingInfo.pax||1) ) + (420* (selectedFlight.pax||bookingInfo.pax||1)) + 300 ).toLocaleString()}</span>
                                 </div>
                                 {(addOns.insurance || (addOns.baggage && addOns.baggage > 0)) && (
                                   <div className="flex justify-between items-center">
                                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Add-ons</span> 
                                      <span className="font-black text-blue-600">₹{( (addOns.insurance ? 249*(selectedFlight.pax||bookingInfo.pax||1) : 0) + ((addOns.baggage || 0)*450) ).toLocaleString()}</span>
                                   </div>
                                 )}

                                 <div className="mt-8 pt-8 border-t border-slate-100 flex justify-between items-end bg-gradient-to-b from-transparent to-slate-50/50 -mx-8 px-8 -mb-8 pb-8">
                                    <div>
                                       <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-2">Grand Total</p>
                                       <h4 className="text-4xl font-black text-slate-900 tracking-tighter">₹{calculateTotal().toLocaleString()}</h4>
                                    </div>
                                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform">
                                       <ShieldCheck size={24} strokeWidth={2.5} />
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div className="bg-white rounded-2xl border border-slate-100 p-6 flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                 <Info size={20} />
                              </div>
                              <div>
                                 <p className="text-xs font-black text-slate-800 uppercase tracking-tight">Need Assistance?</p>
                                 <p className="text-[10px] font-bold text-slate-400 mt-1">Our support team is available 24/7 for your booking queries.</p>
                              </div>
                           </div>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    );
}


