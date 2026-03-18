import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useGetUserQuery } from "../../../services/userService";
import { useGetCouponsQuery } from "../../../services/couponService";
import { formatInr, isInternational } from "../../../utils/bookingUtils";

// New Components
import CheckoutStepper from "./CheckoutStepper";
import PassengerDetailsComponent from "./PassengerDetailsComponent";
import ReviewDetailsComponent from "./ReviewDetailsComponent";
import StatusPageComponent from "./StatusPageComponent";
import FareSummaryComponent from "./FareSummaryComponent";
import AuthModal from "../../../components/Auth/AuthModal";

const STEPS = ["Passenger Details", "Review Details", "Status"];

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Get step from URL or default to 0
    const stepParam = searchParams.get("step");
    const getInitialStep = () => {
        if (stepParam === "review") return 1;
        if (stepParam === "status") return 2;
        return 0;
    };
    
    const [currentStep, setCurrentStep] = useState(getInitialStep());
    const { flight, train, hotel, type, from, to, date, pax, fromName, toName } = location.state || {};

    const [token, setToken] = useState(localStorage.getItem("token"));
    const { data: userData } = useGetUserQuery(token, { skip: !token });
    
    const [passengers, setPassengers] = useState(
        Array.from({ length: pax || 1 }, () => ({ name: "", age: "", gender: "Male", passport: "" }))
    );
    const [bookingResult, setBookingResult] = useState(null);
    const [isSecureTrip, setIsSecureTrip] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [promoCode, setPromoCode] = useState("");
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const { data: couponsData } = useGetCouponsQuery(type);

    // Update local token when localStorage changes
    useEffect(() => {
        const handleStorage = () => setToken(localStorage.getItem("token"));
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    // Sync URL with currentStep
    useEffect(() => {
        const stepMap = ["details", "review", "status"];
        const nextStep = stepMap[currentStep];
        
        // Only update if current step in URL is different to avoid redundant navigation and state loss
        if (searchParams.get("step") !== nextStep) {
            setSearchParams(
                { step: nextStep }, 
                { replace: true, state: location.state } // Preserve the state!
            );
        }
    }, [currentStep, setSearchParams, searchParams, location.state]);

    // Pre-fill first passenger if user is logged in
    useEffect(() => {
        if (userData?.data && (passengers[0]?.name === "" || !passengers[0]?.name)) {
            setPassengers(prev => {
                const newP = [...prev];
                if (newP[0]) {
                    newP[0].name = userData.data.first_name
                        ? `${userData.data.first_name} ${userData.data.last_name || ""}`.trim()
                        : (userData.data.name || userData.data.first_name || "");
                }
                return newP;
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    // Redirect ONLY if state is missing (not token)
    useEffect(() => {
        // Only redirect if absolutely no type and we aren't in status step
        // We add a small delay or check to ensure state has chance to load if needed
        if (!type && currentStep !== 2) {
            console.warn("CheckoutPage: No type in state, redirecting to home");
            navigate("/");
        }
    }, [type, navigate, currentStep]);

    if (!type && currentStep !== 2) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Checkout Details...</p>
                </div>
            </div>
        );
    }

    const isGlobal = type === "flight" && isInternational(from, to);
    const item = flight || train || hotel;

    const calculateTotal = () => {
        if (!item) return 0;
        let total = item.price || 0;
        if (isSecureTrip) total += (199 * pax);
        if (appliedCoupon) {
            if (appliedCoupon.discountType === "percentage") {
                total -= (total * appliedCoupon.discountValue / 100);
            } else {
                total -= appliedCoupon.discountValue;
            }
        }
        return Math.max(total, 0);
    };

    const handlePassengerSubmit = () => {
        const isValid = passengers.every(p => p.name && p.age && (!isGlobal || p.passport));
        if (!isValid) {
            toast.error(isGlobal ? "Please fill name, age and passport details" : "Please fill all passenger details");
            return;
        }
        setCurrentStep(1); // Move to Review
    };

    const handleBookingSuccess = (result) => {
        setBookingResult(result);
        setCurrentStep(2); // Move to Status
    };

    const handleAuthSuccess = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setIsAuthModalOpen(false);
        toast.success("Login Successful! You can proceed to payment.");
    };

    return (
        <div className="min-h-screen bg-[#f2f2f2] pt-24 pb-20 font-sans">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                
                <CheckoutStepper currentStep={currentStep} steps={STEPS} />

                {currentStep < 2 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {currentStep === 0 ? (
                            <PassengerDetailsComponent 
                                passengers={passengers}
                                setPassengers={setPassengers}
                                isGlobal={isGlobal}
                                pax={pax}
                                userData={userData}
                                onNext={handlePassengerSubmit}
                            />
                        ) : (
                            <ReviewDetailsComponent 
                                flight={flight}
                                train={train}
                                hotel={hotel}
                                type={type}
                                from={from}
                                to={to}
                                date={date}
                                pax={pax}
                                fromName={fromName}
                                toName={toName}
                                passengers={passengers}
                                isSecureTrip={isSecureTrip}
                                appliedCoupon={appliedCoupon}
                                userData={userData}
                                calculateTotal={calculateTotal}
                                onBack={() => setCurrentStep(0)}
                                onBookingSuccess={handleBookingSuccess}
                                setIsAuthModalOpen={setIsAuthModalOpen}
                            />
                        )}

                        <FareSummaryComponent 
                            item={item}
                            pax={pax}
                            isSecureTrip={isSecureTrip}
                            appliedCoupon={appliedCoupon}
                            setAppliedCoupon={setAppliedCoupon}
                            promoCode={promoCode}
                            setPromoCode={setPromoCode}
                            couponsData={couponsData}
                            calculateTotal={calculateTotal}
                            formatInr={formatInr}
                        />
                    </div>
                ) : (
                    <StatusPageComponent 
                        bookingResult={bookingResult} 
                        passengers={passengers}
                        type={type}
                        fromName={fromName}
                        toName={toName}
                    />
                )}
            </div>

            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
                onAuthSuccess={handleAuthSuccess} 
            />
        </div>
    );
}
