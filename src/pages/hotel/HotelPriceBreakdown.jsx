import React from "react";
import { Info, Calculator, Ticket } from "lucide-react";

export default function HotelPriceBreakdown({ baseFare, taxesAndFees, totalPayable, onContinue }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
                <Calculator size={16} className="text-slate-500" />
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Price Summary</h3>
            </div>
            
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-500">Base Fare (1 Room x 1 Night)</span>
                    <span className="text-sm font-black text-slate-900">₹{baseFare}</span>
                </div>
                <div className="flex justify-between items-center group cursor-help relative">
                    <span className="text-sm font-bold text-slate-500 flex items-center gap-1.5 underline decoration-dotted decoration-slate-300">
                        Taxes & Service Fees <Info size={12} className="text-slate-400" />
                    </span>
                    <span className="text-sm font-black text-slate-900">₹{taxesAndFees}</span>
                </div>
                
                <div className="pt-6 border-t-2 border-dashed border-slate-100 flex justify-between items-center">
                    <div>
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Amount</span>
                        <p className="text-[10px] font-bold text-emerald-600">Free Cancellation Available</p>
                    </div>
                    <span className="text-3xl font-black text-slate-900 tracking-tight">₹{totalPayable}</span>
                </div>

                <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 flex items-center gap-3">
                    <Ticket size={20} className="text-blue-600" />
                    <div>
                         <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest leading-none mb-1">Coupon Code</p>
                         <p className="text-[11px] font-bold text-blue-600">YATRALO20 applied! - ₹0 savings</p>
                    </div>
                </div>

                <button 
                    onClick={onContinue} 
                    className="w-full mt-2 py-4 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-xl font-black text-sm uppercase shadow-lg shadow-violet-100 transition-all transform hover:scale-[1.02] active:scale-95"
                >
                    Continue to Checkout
                </button>
                <p className="text-[10px] text-center text-slate-400 font-bold tracking-tight">Login now to earn 500+ Reward Points!</p>
            </div>
        </div>
    );
}

