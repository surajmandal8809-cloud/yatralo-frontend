import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ShieldCheck, Bus } from "lucide-react";
import { addBooking } from "../../utils/bookingUtils";

export default function BusCheckoutPage() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [bus, setBus] = useState(null);
    const [addOns, setAddOns] = useState(null);
    const [pax, setPax] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    const [passengers, setPassengers] = useState([]);
    const [contactInfo, setContactInfo] = useState({ email: "", phone: "" });

    useEffect(() => {
        if (!location.state?.bus) {
            navigate("/buses");
            return;
        }
        setBus(location.state.bus);
        setAddOns(location.state.addOns);
        setPax(location.state.pax);
        setTotalAmount(location.state.totalAmount);
        
        setPassengers(Array.from({ length: location.state.pax }, () => ({ firstName: "", lastName: "", age: "" })));
    }, [location.state, navigate]);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handleRazorpayPayment = async () => {
        if (!passengers.every(p => p.firstName && p.lastName && p.age) || !contactInfo.email || !contactInfo.phone) {
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
                 name: "Yatralo Bus",
                 description: "Bus Booking Payment",
                 handler: function (response) {
                     addBooking({
                         type: 'bus',
                         fromCode: bus.from,
                         toCode: bus.to,
                         travelDate: bus.depDate || new Date().toLocaleDateString(),
                         totalPrice: totalAmount,
                         providerName: bus.operator,
                         status: 'confirmed',
                         details: { bus, passengers, contactInfo }
                     });
                     navigate("/bookings");
                 },
                 prefill: {
                     name: passengers[0].firstName + " " + passengers[0].lastName,
                     email: contactInfo.email,
                     contact: contactInfo.phone,
                 },
                 theme: { color: "#f97316" }
            });
            rzp.open();
        }, 1500);
    };

    if (!bus) return null;

    return (
        <div className="min-h-screen bg-[#f5f7fa] pt-24 pb-20 font-sans">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-6">Passenger Details</h2>
                        {passengers.map((p, i) => (
                            <div key={i} className="grid grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">First Name</label>
                                    <input value={p.firstName} onChange={(e) => { const newP = [...passengers]; newP[i].firstName = e.target.value; setPassengers(newP); }} className="w-full p-3 bg-slate-50 border rounded-xl text-sm outline-none focus:border-orange-500" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Last Name</label>
                                    <input value={p.lastName} onChange={(e) => { const newP = [...passengers]; newP[i].lastName = e.target.value; setPassengers(newP); }} className="w-full p-3 bg-slate-50 border rounded-xl text-sm outline-none focus:border-orange-500" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Age</label>
                                    <input value={p.age} onChange={(e) => { const newP = [...passengers]; newP[i].age = e.target.value; setPassengers(newP); }} className="w-full p-3 bg-slate-50 border rounded-xl text-sm outline-none focus:border-orange-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-6">Contact Details</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase">Email ID</label>
                                <input value={contactInfo.email} onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl text-sm outline-none focus:border-orange-500" />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase">Mobile No</label>
                                <input value={contactInfo.phone} onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl text-sm outline-none focus:border-orange-500" />
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={handleRazorpayPayment} 
                        disabled={isProcessing}
                        className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-black text-lg shadow-lg shadow-orange-100 transition-all uppercase tracking-widest disabled:opacity-50"
                    >
                        {isProcessing ? "Processing..." : `Pay ₹${totalAmount}`}
                    </button>
                </div>

                <aside>
                    <div className="sticky top-24 bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Booking Summary</h3>
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <p className="text-xl font-black">{bus.from} → {bus.to}</p>
                                <p className="text-xs text-slate-500">{bus.operator} • {bus.depTime}</p>
                            </div>
                            <Bus size={32} className="text-orange-500" />
                        </div>
                        <div className="pt-4 border-t border-slate-100 flex justify-between">
                            <span className="font-bold">Total Payable</span>
                            <span className="text-2xl font-black text-orange-600">₹{totalAmount}</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
