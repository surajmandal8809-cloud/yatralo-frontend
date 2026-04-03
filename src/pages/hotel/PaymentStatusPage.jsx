import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, X, Mail, Gift } from "lucide-react";

const PaymentStatusPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const status = searchParams.get("status");
    const bookingId = searchParams.get("bookingId");
    const hotelName = searchParams.get("hotelName");
    const amount = searchParams.get("amount");

    const isSuccess = status === "success";

    return (
        <div className="min-h-screen bg-[#f2f2f2] pt-32 pb-12 flex items-center justify-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full mx-4 bg-white rounded-3xl shadow-2xl border overflow-hidden"
            >
                {/* Header Decoration */}
                <div className={`h-4 ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}></div>
                
                <div className="p-12 text-center">
                    <div className={`w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg ${isSuccess ? 'bg-green-100 text-green-600 shadow-green-100' : 'bg-red-100 text-red-600 shadow-red-100'}`}>
                        {isSuccess ? <Check size={48} /> : <X size={48} />}
                    </div>

                    <h1 className={`text-4xl font-black mb-4 uppercase tracking-tighter ${isSuccess ? 'text-gray-800' : 'text-red-600'}`}>
                        {isSuccess ? 'Booking Confirmed!' : 'Payment Failed'}
                    </h1>
                    
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-12">
                        {isSuccess 
                            ? "We've received your payment. Your stay details are below."
                            : "Something went wrong with your transaction. Please try again."
                        }
                    </p>

                    {isSuccess && (
                        <div className="bg-gray-50/50 rounded-2xl p-8 border border-gray-100 mb-12 text-left space-y-6">
                            <div className="flex justify-between border-b pb-4">
                                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Booking ID</span>
                                <span className="text-sm font-black text-blue-600">{bookingId}</span>
                            </div>
                            <div className="flex justify-between border-b pb-4">
                                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Hotel Name</span>
                                <span className="text-sm font-black text-gray-800">{hotelName}</span>
                            </div>
                            <div className="flex justify-between border-b pb-4">
                                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Total Amount Paid</span>
                                <span className="text-sm font-black text-gray-800">₹ {parseInt(amount || "0").toLocaleString()}</span>
                            </div>
                            <div className="pt-4 flex items-center space-x-3 text-green-600">
                                <Mail size={14} />
                                <span className="text-xs font-bold uppercase tracking-widest">Confirmation email sent to your registered ID.</span>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row gap-4">
                        <button 
                            onClick={() => navigate('/bookings')}
                            className="flex-1 bg-[#15457b] text-white py-4 rounded-xl font-black uppercase text-sm tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-900 transition-all transform active:scale-95"
                        >
                            View Bookings
                        </button>
                        <button 
                            onClick={() => navigate('/')}
                            className="flex-1 bg-white text-[#15457b] border-2 border-[#15457b] py-4 rounded-xl font-black uppercase text-sm tracking-widest shadow-lg hover:bg-gray-50 transition-all transform active:scale-95"
                        >
                            Back To Home
                        </button>
                    </div>
                </div>

                {isSuccess && (
                    <div className="bg-green-600 p-6 flex items-center space-x-6 text-white overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-full bg-white/10 -skew-x-12 transform group-hover:translate-x-full transition-transform duration-1000"></div>
                        <Gift size={32} className="opacity-40" />
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-widest">Congratulations!</h4>
                            <p className="text-[10px] font-bold uppercase opacity-80 mt-1">You've unlocked a ₹500 discount for your next flight booking.</p>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default PaymentStatusPage;
