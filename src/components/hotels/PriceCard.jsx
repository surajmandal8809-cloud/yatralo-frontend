import React from 'react';
import { Tag, ShieldCheck, ChevronRight } from 'lucide-react';

const PriceCard = ({ price, taxes, onSelect }) => {
    return (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col gap-6 sticky top-24 group hover:border-[#008cff11] transition-all">
            <div className="flex items-center gap-2 mb-4">
                <Tag size={18} className="text-[#008cff] -rotate-45" />
                <span className="text-[10px] font-black italic uppercase tracking-widest text-[#008cff]">Best Price Guaranteed</span>
            </div>

            <div className="space-y-2">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Pricing Summary</p>
                <div className="flex justify-between items-baseline">
                    <p className="text-4xl font-black italic tracking-tighter text-gray-900 leading-none">₹{price || '4,999'}</p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Per Night</p>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-50 group-hover:bg-blue-50/20 group-hover:border-blue-50 transition-all">
                    <span className="text-sm font-medium text-gray-400 italic shrink-0 tracking-tight leading-none group-hover:text-blue-500">Taxes & Fees</span>
                    <span className="text-sm font-black italic tracking-tighter text-gray-800 leading-none group-hover:text-blue-500">+ ₹{taxes || '899'}</span>
                </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-50/50 rounded-2xl border border-green-50/50 group-hover:bg-green-50 group-hover:border-green-100 transition-all">
                <ShieldCheck size={20} className="text-green-600 shrink-0 mt-1" />
                <div className="space-y-1">
                    <p className="text-[10px] uppercase font-black tracking-widest text-green-700 italic">Free Cancellation</p>
                    <p className="text-xs text-green-600 leading-tight">Until 24h before check-in. Cancel with confidence.</p>
                </div>
            </div>

            <button 
                onClick={onSelect}
                className="w-full bg-gradient-to-r from-[#008cff] to-[#00a2ff] text-white py-6 rounded-3xl font-black italic uppercase tracking-widest shadow-2xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg leading-none pt-7"
            >
                BOOK NOW
                <ChevronRight size={20} className="text-white" />
            </button>
            <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-black italic">Hurry, only 2 rooms left!</p>
        </div>
    );
};

export default PriceCard;
