import React, { useState } from "react";
import { Plane, Train, Hotel, User, Clock, ShieldCheck, Shield, AlertCircle, Calendar, Info } from "lucide-react";
import toast from "react-hot-toast";
import { useCreateBookingMutation, useVerifyPaymentMutation } from "../../../services/bookingService";
import { addBooking } from "../../../utils/bookingUtils";

export default function ReviewDetailsComponent({ 
    flight, train, hotel, type, from, to, date, pax, fromName, toName, 
    passengers, isSecureTrip, appliedCoupon, userData, calculateTotal, onBack, onBookingSuccess,
    setIsAuthModalOpen
}) {
    const isFlight = type === "flight";
    const isTrain = type === "train";
    const item = flight || train || hotel;
    const Icon = isFlight ? Plane : (isTrain ? Train : Hotel);
    
    const [createBooking] = useCreateBookingMutation();
    const [verifyPayment] = useVerifyPaymentMutation();
    const [isLocalLoading, setIsLocalLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);

    const handleContinueToPayment = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsAuthModalOpen(true);
            toast.error("Please login to proceed with payment");
            return;
        }

        setIsLocalLoading(true);
        const totalToPay = calculateTotal();
        const bookingData = {
            id: `BK-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
            bookingRef: `YT${Math.floor(100000 + Math.random() * 900000)}`,
            type,
            fromCode: from,
            toCode: to,
            fromName,
            toName,
            travelDate: date,
            departTime: item.dep,
            arriveTime: item.arr,
            passengers: pax,
            passengerDetails: passengers,
            totalPrice: totalToPay,
            meal: item.meal,
            class: item.class,
            isSecureTrip,
            coupon: appliedCoupon?.code,
            providerName: type === "flight" ? item.airline : item.name,
            providerCode: type === "flight" ? item.flightNo : item.trainNo,
            status: "pending",
            bookedAt: new Date().toISOString(),
            seats: item.seats || "",
            selection: item.selection || []
        };

        try {
            const response = await createBooking(bookingData).unwrap();
            if (response.success) {
                openRazorpay(response, response.booking._id);
            }
        } catch (error) {
            console.error("Booking failed:", error);
            toast.error(error?.data?.message || "Failed to initiate booking. Please try again.");
            setIsLocalLoading(false);
        }
    };

    const openRazorpay = (response, bookingId) => {
        const options = {
            key: "rzp_test_SSesz1GFvxuPR3", 
            amount: response.booking.totalPrice * 100,
            currency: "INR",
            name: "Yatralo",
            description: "Flight Booking Payment",
            image: "https://example.com/your_logo", 
            order_id: response.orderId,
            handler: async function (razorResponse) {
                setVerifying(true);
                try {
                    // VERIFY ON BACKEND
                    const verifyRes = await verifyPayment({
                        razorpay_order_id: razorResponse.razorpay_order_id,
                        razorpay_payment_id: razorResponse.razorpay_payment_id,
                        razorpay_signature: razorResponse.razorpay_signature,
                        bookingId: bookingId
                    }).unwrap();

                    if (verifyRes.success) {
                        addBooking(verifyRes.booking);
                        onBookingSuccess(verifyRes.booking);
                        toast.success("Payment successful! Booking confirmed.");
                    } else {
                        toast.error("Payment verification failed!");
                    }
                } catch (err) {
                    console.error("Verification error:", err);
                    toast.error("Error verifying payment");
                } finally {
                    setVerifying(false);
                    setIsLocalLoading(false);
                }
            },
            prefill: {
                name: userData?.data?.name || passengers[0].name,
                email: userData?.data?.email || "",
                contact: userData?.data?.phone || ""
            },
            theme: { color: "#7c3aed" },
            modal: {
                ondismiss: function() {
                    setIsLocalLoading(false);
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="lg:col-span-2 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Review Trip Card */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-5 text-white">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                            <Icon size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black">Review All Details of Passenger</h2>
                            <p className="text-violet-100 text-[11px] font-medium">Please verify all data before payment</p>
                        </div>
                    </div>
                </div>
                
                <div className="p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-2 border-b border-slate-50 pb-8 mb-8">
                        <div className="text-center md:text-left flex-1">
                            <p className="text-3xl font-black text-slate-900 leading-none">{item.dep}</p>
                            <p className="text-sm font-bold text-[#f97316] mt-1.5 uppercase tracking-wider">{from}</p>
                            <p className="text-xs text-slate-500 font-medium mt-1">{fromName}</p>
                        </div>

                        <div className="flex flex-col items-center flex-1">
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Duration</p>
                            <div className="w-full flex items-center gap-2">
                                <div className="flex-1 h-px bg-slate-200 border-t border-dashed" />
                                <Icon size={18} className="text-[#f97316]" />
                                <div className="flex-1 h-px bg-slate-200 border-t border-dashed" />
                            </div>
                            <p className="text-xs font-bold text-slate-900 mt-2">{item.duration}m</p>
                        </div>

                        <div className="text-center md:text-right flex-1">
                            <p className="text-3xl font-black text-slate-900 leading-none">{item.arr}</p>
                            <p className="text-sm font-bold text-[#f97316] mt-1.5 uppercase tracking-wider">{to}</p>
                            <p className="text-xs text-slate-500 font-medium mt-1">{toName}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                            <User size={16} className="text-[#f97316]" />
                            Passenger Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {passengers.map((p, i) => (
                                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-white border border-slate-100 rounded-full flex items-center justify-center font-bold text-xs text-slate-600">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900">{p.name}</p>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                                                {p.age} Years • {p.gender} {p.passport ? `• Passport: ${p.passport}` : ""}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-emerald-50/30 border border-emerald-100 rounded-2xl p-6 relative overflow-hidden">
                    <ShieldCheck className="text-emerald-600 mb-3" size={24} />
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Verification Status</h3>
                    <p className="text-xs font-bold text-slate-600 mt-1">Passenger details are verified and ready for booking.</p>
                </div>
                <div className="bg-amber-50/30 border border-amber-100 rounded-2xl p-6 relative overflow-hidden">
                    <AlertCircle className="text-amber-500 mb-3" size={24} />
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Important Note</h3>
                    <p className="text-xs font-bold text-slate-600 mt-1">Please ensure names match with government IDs exactly.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
                <button
                    onClick={onBack}
                    disabled={isLocalLoading}
                    className="w-full md:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-widest text-sm disabled:opacity-50"
                >
                    Back to Details
                </button>
                <button
                    onClick={handleContinueToPayment}
                    disabled={isLocalLoading || verifying}
                    className="w-full md:flex-1 py-4 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white font-black rounded-2xl shadow-xl shadow-violet-100 hover:opacity-90 transition-all uppercase tracking-widest text-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {verifying ? (
                        <>
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Verifying...</span>
                        </>
                    ) : isLocalLoading ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        "Continue to Payment"
                    )}
                </button>
            </div>
        </div>
    );
}
