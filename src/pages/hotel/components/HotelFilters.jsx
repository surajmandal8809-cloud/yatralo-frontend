import React, { useState } from "react";
import { Check } from "lucide-react";

const HotelFilters = () => {
    const [priceRange, setPriceRange] = useState(5000);
    
    const filterGroups = [
        {
            title: "Suggested For You",
            options: ["Free Cancellation", "Breakfast Included", "Pay At Hotel", "Top Rated"]
        },
        {
            title: "Star Rating",
            options: ["5 Star", "4 Star", "3 Star", "Below 3 Star"]
        },
        {
            title: "User Rating",
            options: ["4.5+ Excellent", "4+ Good", "3.5+ Average"]
        }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-8 sticky top-36">
            <div>
                <h3 className="text-lg font-black text-gray-800 mb-6 flex items-center justify-between">
                    Filters <span className="text-xs text-blue-600 font-bold uppercase cursor-pointer hover:underline">Clear All</span>
                </h3>
                
                <div className="mb-6">
                    <label className="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-4">Price Range (Per Night)</label>
                    <input 
                        type="range" 
                        min="500" 
                        max="20000" 
                        step="500"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between items-center mt-3">
                        <span className="text-sm font-bold text-gray-600">₹ 500</span>
                        <span className="text-sm font-black text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">₹ {parseInt(priceRange).toLocaleString()}</span>
                    </div>
                </div>

                <div className="space-y-8 mt-12">
                    {filterGroups.map((group, idx) => (
                        <div key={idx}>
                            <h4 className="text-xs text-gray-400 font-black uppercase tracking-widest mb-4 flex items-center border-b pb-2">
                                {group.title}
                            </h4>
                            <div className="space-y-3">
                                {group.options.map((opt, oIdx) => (
                                    <label key={oIdx} className="flex items-center group cursor-pointer">
                                        <div className="relative flex items-center justify-center">
                                            <input type="checkbox" className="peer appearance-none h-5 w-5 border-2 border-gray-300 rounded group-hover:border-blue-400 checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer" />
                                            <Check size={10} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                                        </div>
                                        <span className="ml-3 text-sm font-medium text-gray-600 group-hover:text-gray-900 group-hover:font-bold transition-all">{opt}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HotelFilters;
