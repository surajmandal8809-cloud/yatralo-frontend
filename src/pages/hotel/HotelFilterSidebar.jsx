import React from "react";
import { Filter, Star, Check } from "lucide-react";

export default function HotelFilterSidebar() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sticky top-48 hidden lg:block">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <h3 className="font-black text-slate-900 text-lg">Select Filters</h3>
                <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest">Clear All</button>
            </div>

            <div className="mb-8">
                <h4 className="text-sm font-black text-slate-800 mb-4">Suggested For You</h4>
                <div className="space-y-3">
                    {[
                        "Free Cancellation", 
                        "5 Star Properties", 
                        "Beachfront", 
                        "Breakfast Included"
                    ].map(filter => (
                        <label key={filter} className="flex items-center gap-3 cursor-pointer group">
                            <div className="w-5 h-5 rounded border border-slate-300 flex justify-center items-center group-hover:border-blue-500 transition-colors bg-slate-50">
                                {/* Toggle check conditionally later, mock unchecked for now */}
                            </div>
                            <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">{filter}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-8">
                <h4 className="text-sm font-black text-slate-800 mb-4">Price per night</h4>
                <div className="space-y-3">
                    {[
                        "₹0 - ₹2000",
                        "₹2000 - ₹5000",
                        "₹5000 - ₹10000",
                        "₹10000 - ₹20000",
                        "₹20000+"
                    ].map(price => (
                        <label key={price} className="flex items-center gap-3 cursor-pointer group">
                            <div className="w-5 h-5 rounded border border-slate-300 flex justify-center items-center group-hover:border-blue-500 transition-colors bg-slate-50">
                            </div>
                            <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">{price}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <h4 className="text-sm font-black text-slate-800 mb-4">Star Category</h4>
                <div className="flex gap-2 mb-2">
                    {[5,4,3].map(star => (
                        <button key={star} className="flex-1 py-1.5 border border-slate-200 rounded flex items-center justify-center gap-1 hover:border-blue-500 hover:bg-blue-50 transition-all font-bold text-xs text-slate-600">
                            {star} <Star size={12} className="fill-amber-400 text-amber-400" />
                        </button>
                    ))}
                </div>
            </div>
            
        </div>
    );
}
