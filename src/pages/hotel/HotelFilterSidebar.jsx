import React from "react";
import { Search, ChevronDown, Star } from "lucide-react";

export default function HotelFilterSidebar({ onPriceChange }) {
    const handlePriceFilter = (range) => {
        if (!onPriceChange) return;
        const max = range.includes("+") ? 100000 : parseInt(range.split("-")[1].replace("₹", "").trim());
        onPriceChange(max);
    };

    return (
        <div className="flex flex-col gap-5 w-full">
            {/* Map Placeholder */}
            <div className="relative rounded-lg overflow-hidden h-32 w-full group cursor-pointer border border-slate-200">
               <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80" alt="Map" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
               <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="bg-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 cursor-pointer hover:bg-slate-50 transition-colors">
                     <span className="text-[11px] font-bold text-blue-600 uppercase">View on Map</span>
                  </div>
               </div>
            </div>

            {/* General Filter Group */}
            <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
                <div className="relative mb-6">
                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <Search size={14} />
                   </div>
                   <input 
                      type="text" 
                      placeholder="Search for locality" 
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium focus:outline-none focus:border-blue-400 transition-colors"
                   />
                </div>

                {/* Suggested For You */}
                <div className="mb-6">
                    <h4 className="text-[13px] font-black text-slate-800 mb-4 tracking-tight">Suggested For You</h4>
                    <div className="space-y-3">
                        {[
                            { label: "Pool", count: 1122 },
                            { label: "Last Minute Deals", count: 489 },
                            { label: "Villas", count: 234 },
                            { label: "Hot Deal", count: 89 },
                            { label: "Breakfast Included", count: 876 }
                        ].map((item, i) => (
                            <label key={i} className="flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-3">
                                   <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" />
                                   <span className="text-[12px] font-medium text-slate-600 group-hover:text-slate-900">{item.label}</span>
                                </div>
                                <span className="text-[11px] text-slate-400">({item.count})</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Per Night */}
                <div className="mb-6">
                    <h4 className="text-[13px] font-black text-slate-800 mb-4 tracking-tight">Price Per Night</h4>
                    <div className="space-y-3">
                        {[
                            "₹0 - ₹2000",
                            "₹2000 - ₹5000",
                            "₹5000 - ₹10000",
                            "₹10000 - ₹20000",
                            "₹20000 - ₹30000",
                            "₹30000+"
                        ].map((price, i) => (
                            <label key={i} className="flex items-center gap-3 group cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="priceFilter" 
                                    onChange={() => handlePriceFilter(price)}
                                    className="w-4 h-4 rounded-full border-slate-300 accent-blue-600 cursor-pointer" 
                                />
                                <span className="text-[12px] font-medium text-slate-600 group-hover:text-slate-900">{price}</span>
                            </label>
                        ))}
                        <button onClick={() => onPriceChange(50000)} className="text-[10px] text-blue-500 font-bold uppercase mt-2">Clear Price Filter</button>
                    </div>
                </div>

                {/* Star Category */}
                <div className="mb-6">
                    <h4 className="text-[13px] font-black text-slate-800 mb-4 tracking-tight">Star Category</h4>
                    <div className="space-y-3">
                        {[5, 4, 3].map((star, i) => (
                            <label key={i} className="flex items-center gap-3 group cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" />
                                <span className="text-[12px] font-medium text-slate-600 group-hover:text-slate-900 flex items-center gap-1">
                                    {star} <Star size={12} className="fill-amber-400 text-amber-400" />
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Property Type */}
                <div className="mb-6">
                    <h4 className="text-[13px] font-black text-slate-800 mb-4 tracking-tight">Property Type</h4>
                    <div className="space-y-3">
                        {["Hotel", "Apartment", "Resort", "Villa", "Homestay"].map((type, i) => (
                            <label key={i} className="flex items-center gap-3 group cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" />
                                <span className="text-[12px] font-medium text-slate-600 group-hover:text-slate-900">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


