import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    CheckCircle2,
    ChevronRight,
    CreditCard,
    Info,
    Plane,
    Train,
    User,
    Lock,
    Check,
    Download,
    Share2,
    Calendar,
    Clock,
    MapPin,
    ArrowRight,
    Hotel,
    Utensils
} from "lucide-react";
import toast from "react-hot-toast";
import { useGetUserQuery } from "../services/userService";
import { addBooking, formatInr, isInternational } from "../utils/bookingUtils";

const STEPS = ["Review", "Payment", "Success"];

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { flight, train, hotel, type, from, to, date, pax, fromName, toName } = location.state || {};

    const [currentStep, setCurrentStep] = useState(0);
    const token = localStorage.getItem("token");
    const { data: userData } = useGetUserQuery(token, { skip: !token });
    const [passengers, setPassengers] = useState(
        Array.from({ length: pax || 1 }, () => ({ name: "", age: "", gender: "Male", passport: "" }))
    );
    const [loading, setLoading] = useState(false);
    const [bookingResult, setBookingResult] = useState(null);

    // Pre-fill first passenger if user is logged in
    useEffect(() => {
        if (userData?.user && passengers[0].name === "") {
            const newP = [...passengers];
            newP[0].name = userData.user.name || "";
            // Optionally fill age if available in userData
            setPassengers(newP);
        }
    }, [userData, passengers]);

    // If no state or no token is present, redirect back
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Session expired or login required");
            navigate("/auth/login");
            return;
        }

        if (!type || (!flight && !train && !hotel)) {
            navigate("/");
        }
    }, [type, flight, train, hotel, navigate]);

    const isFlight = type === "flight";
    const isTrain = type === "train";
    const isHotel = type === "hotel";
    const isGlobal = isFlight && isInternational(from, to);

    if (!type || (!flight && !train && !hotel)) return null;

    const item = flight || train || hotel;
    const Icon = isFlight ? Plane : (isTrain ? Train : Hotel);

    const handleNext = () => {
        if (currentStep === 0) {
            // Validate passengers
            const isValid = passengers.every(p => p.name && p.age && (!isGlobal || p.passport));
            if (!isValid) {
                toast.error(isGlobal ? "Please fill name, age and passport details" : "Please fill all passenger details");
                return;
            }
            setCurrentStep(1);
        } else if (currentStep === 1) {
            // Simulate Payment
            setLoading(true);
            setTimeout(() => {
                const result = {
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
                    totalPrice: item.price,
                    meal: item.meal,
                    class: item.class,
                    providerName: isFlight ? item.airline : item.name,
                    providerCode: isFlight ? item.flightNo : item.trainNo,
                    status: "confirmed",
                    bookedAt: new Date().toISOString(),
                };
                addBooking(result);
                setBookingResult(result);
                setLoading(false);
                setCurrentStep(2);
                toast.success("Booking Confirmed!");
            }, 2000);
        }
    };

    const renderStepIcon = (index) => {
        if (currentStep > index) return <Check size={16} className="text-white" />;
        return <span className="text-sm font-bold">{index + 1}</span>;
    };

    return (
        <div className="min-h-screen bg-[#f2f2f2] pt-24 pb-20 font-sans">
            <div className="max-w-6xl mx-auto px-4 md:px-6">

                {/* Stepper */}
                <div className="flex items-center justify-center mb-10">
                    {STEPS.map((step, index) => (
                        <React.Fragment key={step}>
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep >= index ? "bg-[#CF3425] text-white shadow-lg shadow-[#CF3425]/20" : "bg-white text-slate-400 border border-slate-200"
                                        }`}
                                >
                                    {renderStepIcon(index)}
                                </div>
                                <span className={`text-[13px] font-bold mt-2 ${currentStep >= index ? "text-slate-900" : "text-slate-400"}`}>
                                    {step}
                                </span>
                            </div>
                            {index < STEPS.length - 1 && (
                                <div className={`w-16 md:w-32 h-[2px] mx-2 -mt-6 transition-all duration-300 ${currentStep > index ? "bg-[#CF3425]" : "bg-slate-200"}`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {currentStep === 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column: Details & Passengers */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Review Trip */}
                            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">
                                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-5 text-white">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                            <Icon size={20} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-black">Review Your Trip</h2>
                                            <p className="text-blue-100 text-sm font-medium">Please verify your journey details</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-2">
                                        <div className="text-center md:text-left flex-1">
                                            <p className="text-3xl font-black text-slate-900 leading-none">{item.dep}</p>
                                            <p className="text-sm font-bold text-[#CF3425] mt-1.5 uppercase tracking-wider">{from}</p>
                                            <p className="text-xs text-slate-500 font-medium mt-1">{fromName}</p>
                                        </div>

                                        <div className="flex flex-col items-center flex-1">
                                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Non-Stop</p>
                                            <div className="w-full flex items-center gap-2">
                                                <div className="flex-1 h-px bg-slate-200 border-t border-dashed" />
                                                <Icon size={18} className="text-[#CF3425] rotate-90 md:rotate-0" />
                                                <div className="flex-1 h-px bg-slate-200 border-t border-dashed" />
                                            </div>
                                            <p className="text-xs font-bold text-slate-900 mt-2">{item.duration}m</p>
                                        </div>

                                        <div className="text-center md:text-right flex-1">
                                            <p className="text-3xl font-black text-slate-900 leading-none">{item.arr}</p>
                                            <p className="text-sm font-bold text-[#CF3425] mt-1.5 uppercase tracking-wider">{to}</p>
                                            <p className="text-xs text-slate-500 font-medium mt-1">{toName}</p>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-[#CF3425]">
                                                <Calendar size={16} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Date</p>
                                                <p className="text-sm font-bold text-slate-800">{new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500">
                                                <Info size={16} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Type</p>
                                                <p className="text-sm font-bold text-slate-800 capitalize">{type}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500">
                                                <User size={16} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Adults</p>
                                                <p className="text-sm font-bold text-slate-800">{pax}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500">
                                                <div className="text-xs font-black">{isFlight ? "15kg" : (isTrain ? "AC" : "WiFi")}</div>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">{isFlight ? "Check-in" : (isTrain ? "Coach" : "Amenity")}</p>
                                                <p className="text-sm font-bold text-slate-800">{isFlight ? "Included" : "Available"}</p>
                                            </div>
                                        </div>

                                        {item.seats && (
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                                                    <div className="text-[10px] font-black">{isFlight ? "Seat" : "Berth"}</div>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">{isFlight ? "Seat" : "Berth"}</p>
                                                    <p className="text-sm font-bold text-slate-800 truncate max-w-[80px]">{item.seats}</p>
                                                </div>
                                            </div>
                                        )}

                                        {item.class && (
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-[#CF3425]">
                                                    <div className="text-[10px] font-black">CLS</div>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Class / Type</p>
                                                    <p className="text-sm font-bold text-slate-800">{item.class}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Passenger Details */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <User className="text-[#CF3425]" size={20} />
                                        <h3 className="text-lg font-black text-slate-900">Passenger Details</h3>
                                    </div>
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{pax} Traveller{pax > 1 ? 's' : ''}</span>
                                </div>

                                <div className="p-6 space-y-6">
                                    {passengers.map((p, i) => (
                                        <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                            <p className="text-[11px] font-black text-[#CF3425] uppercase tracking-[0.2em] mb-4">Adult {i + 1}</p>
                                            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                                                <div className="md:col-span-3">
                                                    <label className="text-[11px] font-black text-slate-500 uppercase mb-1.5 block">Full Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Same as passport/ID"
                                                        value={p.name}
                                                        onChange={(e) => {
                                                            const newP = [...passengers];
                                                            newP[i].name = e.target.value;
                                                            setPassengers(newP);
                                                        }}
                                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:border-blue-400 outline-none text-sm font-bold transition-all"
                                                    />
                                                </div>
                                                <div className="md:col-span-1">
                                                    <label className="text-[11px] font-black text-slate-500 uppercase mb-1.5 block">Age</label>
                                                    <input
                                                        type="number"
                                                        placeholder="Age"
                                                        value={p.age}
                                                        onChange={(e) => {
                                                            const newP = [...passengers];
                                                            newP[i].age = e.target.value;
                                                            setPassengers(newP);
                                                        }}
                                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:border-blue-400 outline-none text-sm font-bold transition-all"
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="text-[11px] font-black text-slate-500 uppercase mb-1.5 block">Gender</label>
                                                    <select
                                                        value={p.gender}
                                                        onChange={(e) => {
                                                            const newP = [...passengers];
                                                            newP[i].gender = e.target.value;
                                                            setPassengers(newP);
                                                        }}
                                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:border-blue-400 outline-none text-sm font-bold transition-all appearance-none bg-no-repeat bg-[right_1rem_center]"
                                                    >
                                                        <option>Male</option>
                                                        <option>Female</option>
                                                    </select>
                                                </div>
                                                {isGlobal && (
                                                    <div className="md:col-span-6">
                                                        <label className="text-[11px] font-black text-slate-500 uppercase mb-1.5 block">Passport Number</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Passport ID (Required for International)"
                                                            value={p.passport}
                                                            onChange={(e) => {
                                                                const newP = [...passengers];
                                                                newP[i].passport = e.target.value;
                                                                setPassengers(newP);
                                                            }}
                                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:border-blue-400 outline-none text-sm font-bold transition-all"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Fare Summary */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden sticky top-24">
                                <div className="p-6 border-b border-slate-100">
                                    <h3 className="text-lg font-black text-slate-900 leading-none">Fare Summary</h3>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-bold">Base Fare ({pax} Traveller{pax > 1 ? 's' : ''})</span>
                                        <span className="text-slate-900 font-black">{formatInr(item.price * 0.85)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-bold">Taxes & Surcharges</span>
                                        <span className="text-slate-900 font-black">{formatInr(item.price * 0.15)}</span>
                                    </div>
                                    <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                                        <span className="text-lg font-black text-slate-900">Total Amount</span>
                                        <span className="text-2xl font-black text-[#CF3425]">{formatInr(item.price)}</span>
                                    </div>
                                    <div className="bg-rose-50 p-4 rounded-xl flex gap-3">
                                        <Info size={16} className="text-[#CF3425] flex-shrink-0 mt-0.5" />
                                        <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
                                            By clicking continue, you agree to our booking policy and terms of service.
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleNext}
                                        className="w-full bg-[#cf3425] hover:bg-[#b82e1f] text-white font-semibold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group"
                                    >
                                        Continue to Payment
                                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 1 && (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                            <div className="p-8 border-b border-slate-100 text-center">
                                <div className="w-16 h-16 bg-rose-50 text-[#CF3425] rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <CreditCard size={32} />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900">Payment Selection</h2>
                                <p className="text-slate-500 font-bold mt-1">Select your preferred payment method</p>
                                <div className="mt-4 inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black">
                                    <Lock size={12} />
                                    SECURE 256-BIT ENCRYPTION
                                </div>
                            </div>

                            <div className="p-8 space-y-4">
                                <div className="space-y-3">
                                    <div className="p-5 border-2 border-[#CF3425] bg-rose-50/50 rounded-2xl flex items-center justify-between cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-full border-4 border-[#CF3425] bg-white" />
                                            <div>
                                                <p className="text-sm font-black text-slate-900">Credit / Debit Card</p>
                                                <p className="text-xs text-slate-500 font-bold">Visa, Mastercard, RuPay, Amex</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <div className="w-8 h-5 bg-slate-200 rounded sm" />
                                            <div className="w-8 h-5 bg-slate-200 rounded sm" />
                                        </div>
                                    </div>

                                    <div className="p-5 border border-slate-200 rounded-2xl flex items-center justify-between opacity-60 grayscale cursor-not-allowed">
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-full border-2 border-slate-200" />
                                            <div>
                                                <p className="text-sm font-black text-slate-900">UPI / QR Scan</p>
                                                <p className="text-xs text-slate-500 font-bold">Google Pay, PhonePe, Paytm</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5 border border-slate-200 rounded-2xl flex items-center justify-between opacity-60 grayscale cursor-not-allowed">
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-full border-2 border-slate-200" />
                                            <div>
                                                <p className="text-sm font-black text-slate-900">Net Banking</p>
                                                <p className="text-xs text-slate-500 font-bold">Safe & Secure bank transfer</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 p-6 bg-slate-50 rounded-2xl space-y-4">
                                    <div>
                                        <label className="text-[11px] font-black text-slate-500 uppercase mb-1.5 block tracking-widest">Card Number</label>
                                        <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm font-bold" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[11px] font-black text-slate-500 uppercase mb-1.5 block tracking-widest">Expiry</label>
                                            <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm font-bold" />
                                        </div>
                                        <div>
                                            <label className="text-[11px] font-black text-slate-500 uppercase mb-1.5 block tracking-widest">CVV</label>
                                            <input type="password" placeholder="***" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm font-bold" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Amount to Pay</p>
                                            <p className="text-2xl font-black text-slate-900">{formatInr(item.price)}</p>
                                        </div>
                                        <button
                                            onClick={() => setCurrentStep(0)}
                                            className="text-xs font-black text-[#CF3425] hover:underline"
                                        >
                                            Back to Review
                                        </button>
                                    </div>

                                    <button
                                        onClick={handleNext}
                                        disabled={loading}
                                        className="w-full bg-[#cf3425] hover:bg-[#b82e1f] text-white font-semibold py-4 rounded-xl shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                PROCESSING PAYMENT...
                                            </>
                                        ) : (
                                            <>
                                                <Lock size={18} />
                                                PAY {formatInr(item.price)} NOW
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 2 && bookingResult && (
                    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">

                        {/* Success Hero */}
                        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100">
                            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-10 text-white text-center">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white/30 scale-110">
                                    <CheckCircle2 size={48} />
                                </div>
                                <h1 className="text-4xl font-black mb-2 tracking-tight">Booking Confirmed!</h1>
                                <p className="text-emerald-50 font-bold opacity-90">Your ticket has been booked successfully</p>
                                <div className="mt-8 inline-flex items-center gap-6 bg-black/10 px-6 py-3 rounded-2xl backdrop-blur-sm border border-white/10">
                                    <div>
                                        <p className="text-[10px] uppercase font-black tracking-widest opacity-60">Booking ID</p>
                                        <p className="text-lg font-black">{bookingResult.bookingRef}</p>
                                    </div>
                                    <div className="w-px h-8 bg-white/20" />
                                    <div>
                                        <p className="text-[10px] uppercase font-black tracking-widest opacity-60">Status</p>
                                        <p className="text-lg font-black uppercase">Confirmed</p>
                                    </div>
                                </div>
                            </div>

                            {/* The Ticket (Visible after success) */}
                            <div className="p-8 md:p-12 bg-[#f8fafc]">
                                <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative">
                                    {/* Ticket Header */}
                                    <div className="bg-slate-900 p-6 flex items-center justify-between text-white">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#CF3425] rounded-xl flex items-center justify-center shadow-lg">
                                                <Icon size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black tracking-tight">{bookingResult.providerName}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{bookingResult.providerCode}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400">E-Ticket</p>
                                            <p className="text-sm font-black">{bookingResult.bookingRef}</p>
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        {/* Journey Details */}
                                        <div className="flex justify-between items-center mb-10">
                                            <div>
                                                <p className="text-3xl font-black text-slate-900 leading-none">{bookingResult.fromCode}</p>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1.5">{fromName}</p>
                                                <p className="text-lg font-black text-[#CF3425] mt-2">{bookingResult.departTime}</p>
                                            </div>

                                            <div className="flex flex-col items-center flex-1 mx-4">
                                                <div className="w-full flex items-center gap-1.5 mb-2">
                                                    <div className="w-2 h-2 rounded-full bg-slate-200" />
                                                    <div className="flex-1 h-px bg-slate-200 border-t border-dashed" />
                                                    <Icon size={14} className="text-slate-300" />
                                                    <div className="flex-1 h-px bg-slate-200 border-t border-dashed" />
                                                    <div className="w-2 h-2 rounded-full bg-slate-200" />
                                                </div>
                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                                    Economy Class
                                                </span>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-3xl font-black text-slate-900 leading-none">{bookingResult.toCode}</p>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1.5">{toName}</p>
                                                <p className="text-lg font-black text-[#CF3425] mt-2">{bookingResult.arriveTime}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-8 py-6 border-y border-slate-100">
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Date</p>
                                                <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                                    <Calendar size={14} className="text-[#CF3425]" />
                                                    {new Date(bookingResult.travelDate).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Meal / Service</p>
                                                <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                                    <Utensils size={14} className="text-[#CF3425]" />
                                                    {bookingResult.meal || "Standard Meal"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-8 space-y-4">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Passengers</p>
                                            {passengers.map((p, i) => (
                                                <div key={i} className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-rose-50 text-[#CF3425] rounded-full flex items-center justify-center font-bold text-xs">
                                                            {i + 1}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black text-slate-800">{p.name}</p>
                                                            <p className="text-[10px] font-bold text-slate-400">{p.age} Yrs • {p.gender} {p.passport ? `• Pass: ${p.passport}` : ""}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Seat</p>
                                                        <p className="text-sm font-black text-slate-900">{String.fromCharCode(65 + i)}12</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* QR Mock */}
                                        <div className="mt-10 flex flex-col items-center pt-8 border-t border-dashed border-slate-200">
                                            <div className="w-32 h-32 bg-slate-100 rounded-2xl border-2 border-slate-200 flex items-center justify-center p-2 mb-3">
                                                <div className="w-full h-full bg-slate-200 rounded lg overflow-hidden flex flex-wrap p-1">
                                                    {Array.from({ length: 64 }).map((_, i) => (
                                                        <div key={i} className={`w-1/8 h-1/8 ${Math.random() > 0.5 ? 'bg-slate-900' : 'bg-transparent'}`} style={{ width: '12.5%', height: '12.5%' }}></div>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scan for boarding</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 border-t border-slate-100 flex flex-wrap gap-4 justify-center">
                                <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                                    <Download size={16} /> Download PDF
                                </button>
                                <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                                    <Share2 size={16} /> Share Ticket
                                </button>
                                <button
                                    onClick={() => navigate("/bookings")}
                                    className="flex items-center gap-2 px-8 py-3 bg-[#cf3425] hover:bg-[#b82e1f] text-white rounded-xl text-sm font-semibold transition-all shadow-lg"
                                >
                                    Go to My Bookings
                                </button>
                            </div>
                        </div>

                        <div className="bg-[#CF3425] rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-200">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white backdrop-blur-md">
                                    <Coffee size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black">Join our loyalty program</h3>
                                    <p className="text-rose-100 text-sm font-medium">Earn points on every trip and get exclusive discounts.</p>
                                </div>
                            </div>
                            <button className="px-8 py-3 bg-white text-[#CF3425] rounded-xl text-sm font-black shadow-lg">Learn More</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const Coffee = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
        <line x1="6" y1="2" x2="6" y2="4" />
        <line x1="10" y1="2" x2="10" y2="4" />
        <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
);
