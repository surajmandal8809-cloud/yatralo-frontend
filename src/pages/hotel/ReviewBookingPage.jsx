import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
    ChevronDown, 
    Info, 
    ShieldCheck, 
    Star, 
    Check, 
    ChevronRight, 
    X, 
    Clock, 
    Plus, 
    HelpCircle,
    Heart,
    Smartphone,
    User,
    ArrowRight
} from "lucide-react";
import { createBooking, verifyPayment } from "../../services/hotelRoutes";

const ReviewBookingPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    // Booking Details from URL
    const hotelId = searchParams.get("hotelId");
    const hotelName = searchParams.get("hotelName") || "Ginger Goa, Panjim";
    const roomType = searchParams.get("roomType") || "Luxe Queen Room";
    const basePrice = parseInt(searchParams.get("price") || "5099");
    const checkInDate = searchParams.get("checkInDate") || "2026-04-03";
    const checkOutDate = searchParams.get("checkOutDate") || "2026-04-04";
    const adults = searchParams.get("adults") || "2";

    // Form State
    const [formData, setFormData] = useState({
        title: "Mr",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        specialRequests: ""
    });
    const [insurance, setInsurance] = useState("no");
    const [agreed, setAgreed] = useState(false);

    const [loading, setLoading] = useState(false);

    // Dynamic Calculations
    const discount = 510;
    const taxes = 229;
    const totalAmount = basePrice - discount + taxes + (insurance === "yes" ? 59 : 0);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        
        if (!formData.email || !formData.phone || !formData.firstName || !agreed) {
            return alert("Please fill all required fields and agree to terms");
        }

        setLoading(true);

        const res = await loadRazorpay();
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            setLoading(false);
            return;
        }

        const options = {
            key: "rzp_test_dummykey",
            amount: totalAmount * 100,
            currency: "INR",
            name: "YatraLo Hotels",
            description: `Booking for ${hotelName}`,
            image: "/assets/logo.png",
            handler: async (response) => {
                try {
                    await createBooking({
                        hotelId,
                        hotelName,
                        roomType,
                        totalAmount,
                        paymentId: response.razorpay_payment_id,
                        userDetails: formData,
                        checkInDate,
                        checkOutDate,
                        adults
                    });

                    const successParams = new URLSearchParams({
                        status: "success",
                        bookingId: `BK-${Date.now()}`,
                        hotelName,
                        roomType,
                        amount: totalAmount
                    });
                    navigate(`/hotels/status?${successParams.toString()}`);
                } catch (err) {
                    navigate(`/hotels/status?status=failed`);
                }
            },
            prefill: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                contact: formData.phone
            },
            theme: { color: "#008cff" }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#f2f2f2] pb-24 pt-16 font-sans text-[#4a4a4a]">
            
            {/* TOP HEADER TITLE */}
            <div className="bg-[#f0f2f5] py-4 border-b">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-none italic uppercase">Review your Booking</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-6 flex flex-col lg:grid lg:grid-cols-[1fr_360px] gap-6">
                
                {/* LEFT COLUMN */}
                <div className="space-y-6">
                    
                    {/* HOTEL SUMMARY CARD */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden p-6 relative">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex-1">
                                <h2 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic leading-none truncate pr-4">{hotelName}</h2>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="flex gap-0.5 text-orange-400">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded border uppercase tracking-widest">Couple Friendly</span>
                                </div>
                                <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-tight italic">Plot No. 37, 38, Near Passport Office, SGO Complex, EDC, Pato, Goa, India</p>
                            </div>
                            <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 border border-slate-100 shadow-sm">
                                <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=200&q=80" alt="Hotel" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex items-center justify-between mb-8">
                            <div className="flex-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Check-In</p>
                                <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{new Date(checkInDate).toLocaleDateString(undefined, { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-tight italic">2 PM</p>
                            </div>
                            <div className="px-4 text-center">
                                <div className="text-[9px] font-black text-slate-300 bg-white border px-3 py-1 rounded-full uppercase italic leading-none mb-1">1 Night</div>
                                <div className="w-10 h-[1px] bg-slate-200 mx-auto"/>
                            </div>
                            <div className="flex-1 text-right">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Check-Out</p>
                                <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{new Date(checkOutDate).toLocaleDateString(undefined, { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-tight italic">12 PM</p>
                            </div>
                            <div className="ml-8 border-l pl-8 font-black text-xs text-slate-800 tracking-tighter italic whitespace-nowrap">
                                1 Night | {adults} Adults | 1 Room
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-black text-slate-800 tracking-tighter uppercase italic leading-none">{roomType}</h3>
                                <button className="text-[10px] font-black text-[#008cff] uppercase tracking-widest hover:underline italic">See Inclusions</button>
                            </div>
                            <ul className="grid grid-cols-2 gap-y-3">
                                {[
                                    { icon: Check, text: "Room Only" },
                                    { icon: X, text: "No meals included", color: "text-slate-400" },
                                    { icon: ShieldCheck, text: "Complimentary Meal Upgrade" },
                                    { icon: Clock, text: "Early check-in upto 2 hrs" },
                                ].map((item, i) => (
                                    <li key={i} className={`flex items-center gap-2 text-[11px] font-bold ${item.color || 'text-slate-600'} uppercase tracking-tight`}>
                                        <item.icon size={12} className={item.color ? "" : "text-green-500"} /> {item.text}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6">
                                <p className="text-[11px] font-black text-slate-800 uppercase italic">Non-Refundable</p>
                                <p className="text-[11px] font-bold text-red-500 mt-1 uppercase tracking-tight italic">Refund is not applicable for this booking.</p>
                                <button className="text-[10px] font-black text-[#008cff] mt-2 uppercase tracking-widest hover:underline italic">Cancellation policy details</button>
                            </div>
                        </div>
                    </div>

                    {/* IMPORTANT INFO CARD */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-black tracking-tighter uppercase italic mb-6">Important Information</h2>
                        <div className="bg-pink-50/30 border border-pink-100 rounded-2xl p-5 mb-6">
                            <div className="flex items-center gap-3 text-pink-600 text-[11px] font-black uppercase tracking-widest mb-3 italic">
                                <div className="w-5 h-5 bg-pink-100 rounded-full flex items-center justify-center"><Heart size={10} fill="currentColor"/></div>
                                Couple/Bachelor Rules
                            </div>
                            <p className="text-[11px] font-bold text-slate-600 uppercase tracking-tight italic">Unmarried couples allowed. Local ids are allowed</p>
                        </div>
                        <ul className="space-y-3 pl-2">
                            {[
                                "Primary Guest should be at least 18 years of age.",
                                "Groups with only male guests are allowed at the property.",
                                "Passport, Aadhaar, Driving License and Govt. ID are accepted as ID proof(s).",
                                "Pets are not allowed.",
                            ].map((text, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-1 h-1 bg-slate-300 rounded-full mt-1.5 shrink-0" />
                                    <p className="text-[11px] font-bold text-slate-600 uppercase tracking-tight leading-relaxed italic">{text}</p>
                                </li>
                            ))}
                        </ul>
                        <button className="text-[10px] font-black text-[#008cff] mt-4 uppercase tracking-widest italic hover:underline">View More</button>
                    </div>

                    {/* GUEST DETAILS CARD */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-black tracking-tighter uppercase italic mb-8">Guest Details</h2>
                        <div className="grid grid-cols-12 gap-x-6 gap-y-8 mb-8">
                            <div className="col-span-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block italic">Title</label>
                                <select 
                                    name="title" 
                                    value={formData.title} 
                                    onChange={handleInputChange}
                                    className="w-full bg-slate-50 border rounded-lg p-3 text-xs font-black uppercase italic outline-none focus:border-[#008cff]"
                                >
                                    <option value="Mr">Mr.</option>
                                    <option value="Ms">Ms.</option>
                                </select>
                            </div>
                            <div className="col-span-5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block italic">First Name</label>
                                <input 
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    type="text" 
                                    placeholder="First Name" 
                                    className="w-full bg-white border rounded-lg p-3 text-xs font-bold italic outline-none transition-all focus:border-[#008cff] focus:bg-slate-50/50" 
                                />
                            </div>
                            <div className="col-span-5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block italic">Last Name</label>
                                <input 
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    type="text" 
                                    placeholder="Last Name" 
                                    className="w-full bg-white border rounded-lg p-3 text-xs font-bold italic outline-none transition-all focus:border-[#008cff] focus:bg-slate-50/50" 
                                />
                            </div>
                            <div className="col-span-6">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block italic">Email Address <span className="text-[9px] font-medium ml-2 lowercase tracking-normal">(Booking voucher will be sent to this email ID)</span></label>
                                <input 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    type="email" 
                                    placeholder="Email ID" 
                                    className="w-full bg-white border rounded-lg p-3 text-xs font-bold italic outline-none transition-all focus:border-[#008cff] focus:bg-slate-50/50" 
                                />
                            </div>
                            <div className="col-span-6">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block italic">Mobile Number</label>
                                <div className="flex group">
                                    <div className="w-16 bg-slate-50 border rounded-l-lg border-r-0 p-3 text-xs font-black italic flex items-center justify-between text-slate-600">
                                        +91 <ChevronDown size={12}/>
                                    </div>
                                    <input 
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        type="tel" 
                                        placeholder="Contact Number" 
                                        className="flex-1 bg-white border rounded-r-lg p-3 text-xs font-bold italic outline-none transition-all focus:border-[#008cff] focus:bg-slate-50/50" 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mb-8">
                            <input type="checkbox" className="w-4 h-4 accent-[#008cff]" />
                            <span className="text-[11px] font-bold text-slate-600 italic">Enter GST Details <span className="text-slate-400">(Optional)</span></span>
                        </div>

                        <button className="flex items-center gap-2 text-[11px] font-black text-[#008cff] uppercase tracking-widest italic mb-6">
                            <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded-full flex items-center justify-center"><Plus size={10}/></div>
                            Add Guest
                        </button>

                        <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between border">
                            <span className="text-[11px] font-black text-slate-600 uppercase italic">Login to prefill traveller details and get access to secret deals</span>
                            <button className="bg-white text-[#008cff] px-6 py-2 rounded-lg border border-[#008cff] text-[10px] font-black uppercase tracking-widest transition-all hover:bg-blue-50 italic">Login</button>
                        </div>
                    </div>

                    {/* SPECIAL REQUEST ACCORDION */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center justify-between cursor-pointer group">
                        <div className="flex flex-col">
                            <span className="text-sm font-black text-slate-800 uppercase italic tracking-tighter leading-none">Special Request</span>
                            <span className="text-[10px] font-bold text-red-400 uppercase italic tracking-tight mt-1">Special requests are subject to each hotel's availability...</span>
                        </div>
                        <ChevronDown size={20} className="text-slate-300 group-hover:text-slate-600 transition-all"/>
                    </div>

                    {/* TRIP SECURE CARD */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-50/50 to-white p-6 border-b">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center text-indigo-600 shadow-sm shadow-indigo-100/50 animate-bounce">
                                    <ShieldCheck size={20} />
                                </div>
                                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-tight italic leading-relaxed">
                                    Chase the adrenaline rush worry-free! Secure your trip against sudden events
                                </p>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter leading-none">Trip Secure</h3>
                                    <p className="text-[11px] font-black text-[#008cff] uppercase tracking-widest mt-1">Enjoy a Worry-Free Stay</p>
                                </div>
                                <div className="flex items-center gap-3 grayscale opacity-70">
                                    <img src="https://logodownload.org/wp-content/uploads/2019/10/aditya-birla-logo.png" className="h-6" alt=""/>
                                    <div className="w-[1px] h-6 bg-slate-200"/>
                                    <img src="https://logos-world.net/wp-content/uploads/2020/11/SBI-Logo.png" className="h-4" alt=""/>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-10">
                                {[
                                    { l: "Medical Assistance", v: "24*7 SUPPORT", icon: <Check size={14} className="text-green-500"/> },
                                    { l: "Personal Accident", v: "Rs 10,00,000", icon: <Heart size={14} className="text-pink-500"/> },
                                    { l: "OPD Expenses", v: "Rs 25,000", icon: <X size={14} className="text-orange-500"/> },
                                    { l: "Refund on Hotel Cancellation", v: "Rs 10,000", icon: <ShieldCheck size={14} className="text-blue-500"/> },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-3">
                                        <div className="flex items-center gap-3">
                                            {item.icon}
                                            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight italic">{item.l}</span>
                                        </div>
                                        <span className="text-[11px] font-black text-slate-800 tracking-tight italic">{item.v}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${insurance === 'yes' ? 'border-[#008cff] bg-[#008cff]' : 'border-slate-300'}`} onClick={() => setInsurance('yes')}>
                                            <div className="w-1.5 h-1.5 bg-white rounded-full"/>
                                        </div>
                                        <span className="text-[12px] font-black italic tracking-tighter uppercase">Yes, secure my trip. <span className="text-[10px] text-slate-400 font-bold ml-1 tracking-normal">(₹ 59 per person)</span></span>
                                    </div>
                                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest italic">7 more benefits</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${insurance === 'no' ? 'border-slate-400 bg-slate-400' : 'border-slate-300'}`} onClick={() => setInsurance('no')}>
                                        <div className="w-1.5 h-1.5 bg-white rounded-full"/>
                                    </div>
                                    <span className="text-[12px] font-black italic tracking-tighter uppercase">No, I will book without trip secure.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 mt-10">
                        <input 
                            type="checkbox" 
                            checked={agreed} 
                            onChange={(e) => setAgreed(e.target.checked)} 
                            className="w-5 h-5 mt-1 accent-[#008cff] shrink-0" 
                        />
                        <p className="text-[11px] font-bold text-slate-500 italic leading-relaxed uppercase tracking-tight">
                            By proceeding, I agree to YatraLo's <span className="text-[#008cff] cursor-pointer hover:underline">User Agreement</span>, <span className="text-[#008cff] cursor-pointer hover:underline">Terms of Service</span> and <span className="text-[#008cff] cursor-pointer hover:underline">Cancellation & Property Booking Policies</span>.
                        </p>
                    </div>

                    <button 
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-1/3 h-14 bg-gradient-to-r from-blue-600 to-[#008cff] text-white rounded-xl font-black uppercase text-base tracking-widest shadow-2xl shadow-blue-100 italic flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "PAY NOW"
                        )}
                    </button>
                </div>

                {/* RIGHT COLUMN: PRICE SIDEBAR */}
                <aside className="space-y-6">
                    
                    {/* PRICE BREAKUP CARD */}
                    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b bg-slate-50/50 flex items-center justify-between">
                            <h3 className="text-[13px] font-black tracking-tight uppercase italic leading-none">Price Breakup</h3>
                            <ChevronDown size={14} className="text-slate-300"/>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex justify-between items-center text-[12px] font-bold uppercase tracking-tight italic">
                                <span className="text-slate-500">Base Price <span className="text-[10px] lowercase tracking-normal">(1 Room x 1 Night)</span></span>
                                <span className="text-slate-800 font-black">₹ {basePrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-[12px] font-bold uppercase tracking-tight italic">
                                <span className="text-[#008cff]">Discount by Property</span>
                                <span className="text-[#008cff] font-black">- ₹ {discount.toLocaleString()}</span>
                            </div>
                            <div className="w-full h-[1px] bg-slate-100"/>
                            <div className="flex justify-between items-center text-[12px] font-bold uppercase tracking-tight italic bg-indigo-50/30 p-2 rounded-lg">
                                <span className="text-slate-800 font-black">Price after Discount</span>
                                <span className="text-slate-800 font-black text-sm">₹ {(basePrice - discount).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-[12px] font-bold uppercase tracking-tight italic">
                                <span className="text-slate-500 flex items-center gap-1">Hotel Taxes <HelpCircle size={12} className="text-slate-300"/></span>
                                <span className="text-slate-800 font-black">₹ {taxes.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="p-6 bg-gradient-to-r from-slate-50 to-white flex justify-between items-center border-t border-slate-100">
                            <span className="text-base font-black text-slate-800 uppercase italic tracking-tighter">Total Amount to be paid</span>
                            <span className="text-2xl font-black text-slate-900 tracking-tighter italic leading-none">₹ {totalAmount.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* COUPON CODES CARD */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-xs font-black uppercase tracking-widest mb-4 italic">Coupon Codes</h3>
                        <p className="text-[10px] font-bold text-slate-400 mb-4 italic">No coupon codes applicable for this property.</p>
                        <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg text-[10px] font-black uppercase tracking-widest text-orange-600 mb-6 italic leading-relaxed">
                            YATRALO GIFT CARDS CAN BE APPLIED AT PAYMENT STEP
                        </div>
                        <div className="flex h-12">
                            <input type="text" placeholder="Have a Coupon Code" className="flex-1 bg-white border border-slate-200 rounded-l-lg p-3 text-xs font-bold italic outline-none focus:border-[#008cff]"/>
                            <button className="bg-[#008cff] text-white px-4 rounded-r-lg flex items-center justify-center transition-all hover:bg-blue-600"><ArrowRight size={18}/></button>
                        </div>
                    </div>

                    {/* LOGIN WHY PROMPT */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6">
                        <h3 className="text-[11px] font-black text-slate-800 uppercase italic tracking-widest border-b pb-4 leading-none">WHY <span className="text-[#008cff]">SIGN UP</span> OR <span className="text-[#008cff]">LOGIN</span></h3>
                        <div className="space-y-4">
                            {[
                                "Get access to Secret Deals",
                                "Book Faster - we'll save & pre-fill your details",
                                "Manage your bookings from one place",
                            ].map((text, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <Check size={14} className="text-cyan-500 mt-0.5 shrink-0" />
                                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-tight leading-relaxed italic">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

            </div>

            {/* CHATBOT FLOATING ICON AS SEEN IN MMT SCREENSHOT */}
            <div className="fixed bottom-10 right-10 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="bg-white px-6 py-2 rounded-full shadow-2xl border border-slate-100 flex items-center gap-3 hover:scale-105 transition-all">
                   <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white p-2">
                       <Smartphone size={20}/>
                   </div>
                   <span className="text-sm font-black text-slate-800 uppercase italic tracking-tight">Ask me anything!</span>
                </div>
            </div>

        </div>
    );
};

export default ReviewBookingPage;
