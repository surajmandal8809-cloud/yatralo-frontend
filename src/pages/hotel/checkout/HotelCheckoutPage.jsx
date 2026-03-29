import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import HotelGuestForm from "../HotelGuestForm";
import HotelCheckoutSummary from "../HotelCheckoutSummary";

export default function HotelCheckoutPage() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [hotel, setHotel] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [pax, setPax] = useState(2);
    const [isProcessing, setIsProcessing] = useState(false);

    const [primaryGuest, setPrimaryGuest] = useState({ firstName: "", lastName: "" });
    const [contactInfo, setContactInfo] = useState({ email: "", phone: "" });

    useEffect(() => {
        if (!location.state?.hotel) {
            navigate("/hotels");
            return;
        }
        setHotel(location.state.hotel);
        setTotalAmount(location.state.totalAmount);
        setPax(location.state.pax || 2);
    }, [location.state, navigate]);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handleRazorpayPayment = async () => {
        if (!primaryGuest.firstName || !primaryGuest.lastName || !contactInfo.email || !contactInfo.phone) {
            toast.error("Please fill all details!");
            return;
        }

        if (!window.Razorpay) {
            toast.error("Razorpay SDK is still loading...");
            return;
        }

        setIsProcessing(true);
        toast.loading("Initiating Payment...", { duration: 1500 });

        setTimeout(() => {
            setIsProcessing(false);
            const rzp = new window.Razorpay({
                 key: "rzp_test_SSesz1GFvxuPR3",
                 amount: Math.round(totalAmount * 100),
                 currency: "INR",
                 name: "Yatralo Hotels",
                 description: "Hotel Booking Payment",
                 handler: function (response) {
                     toast.success("Payment Verified! Booking Confirmed.");
                     navigate("/hotels"); // To home or success
                 },
                 prefill: {
                     name: primaryGuest.firstName + " " + primaryGuest.lastName,
                     email: contactInfo.email,
                     contact: contactInfo.phone,
                 },
                 theme: { color: "#3b82f6" }
            });
            rzp.open();
        }, 1500);
    };

    if (!hotel) return null;

    return (
        <div className="min-h-screen bg-[#f5f7fa] pt-24 pb-20 font-sans">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                    <HotelGuestForm 
                        primaryGuest={primaryGuest} 
                        setPrimaryGuest={setPrimaryGuest} 
                        contactInfo={contactInfo} 
                        setContactInfo={setContactInfo} 
                    />

                    <button 
                        onClick={handleRazorpayPayment} 
                        disabled={isProcessing}
                        className="w-full py-5 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-2xl font-black text-lg transition-all uppercase tracking-[0.2em] shadow-xl shadow-violet-100 disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
                    >
                        {isProcessing ? "Processing..." : `Pay ₹${totalAmount}`}
                    </button>
                </div>

                <aside>
                    <HotelCheckoutSummary 
                        hotel={hotel} 
                        checkIn={location.state?.checkIn} 
                        checkOut={location.state?.checkOut} 
                        totalAmount={totalAmount} 
                    />
                </aside>
            </div>
        </div>
    );
}
