import React from 'react';
import { SlidersHorizontal, CheckCircle2 } from 'lucide-react';

const FilterSidebar = ({ filters, onFilterChange }) => {
    return (
        <aside className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col gap-10">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black italic tracking-tighter uppercase text-gray-800 flex items-center gap-3">
                    <SlidersHorizontal size={20} className="text-[#008cff]" />
                    Filters
                </h3>
                <button className="text-[10px] font-black uppercase text-[#008cff] tracking-widest italic hover:scale-105 transition-all">Clear All</button>
            </div>

            {/* Price Range */}
            <div className="space-y-6">
                <div className="flex justify-between items-center group">
                    <p className="font-black text-gray-700 uppercase text-xs tracking-widest italic group-hover:text-[#008cff] transition-colors">Price Range <span className="text-gray-300">(per night)</span></p>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">₹0 - ₹20,000</span>
                </div>
                <div className="relative group p-1">
                   <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-100 -translate-y-1/2 rounded-full overflow-hidden">
                       <span className="absolute left-[30%] right-[20%] h-full bg-gradient-to-r from-[#008cff] to-[#00a2ff]"></span>
                   </div>
                   <div className="absolute top-1/2 left-[30%] w-6 h-6 bg-white border-2 border-[#008cff] -translate-y-1/2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"></div>
                   <div className="absolute top-1/2 right-[20%] w-6 h-6 bg-white border-2 border-[#008cff] -translate-y-1/2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"></div>
                </div>
            </div>

            {/* Rating Filter */}
            <div className="space-y-6">
                <p className="font-black text-gray-700 uppercase text-xs tracking-widest italic group-hover:text-[#008cff] transition-colors">Star Rating</p>
                <div className="space-y-4">
                    {[5, 4, 3, 2].map(star => (
                        <FilterOption key={star} label={`${star} Star Hotel`} sub={`(${Math.floor(Math.random() * 100)} available)`} />
                    ))}
                </div>
            </div>

            {/* Amenities Filter */}
            <div className="space-y-6">
                <p className="font-black text-gray-700 uppercase text-xs tracking-widest italic group-hover:text-[#008cff] transition-colors">Amenities</p>
                <div className="space-y-4">
                    <FilterOption label="Breakfast Included" />
                    <FilterOption label="Free WiFi" />
                    <FilterOption label="Swimming Pool" />
                    <FilterOption label="AC" selected />
                    <FilterOption label="Airport Shuttle" />
                </div>
            </div>

            {/* Popular Locations */}
            <div className="space-y-6">
                <p className="font-black text-gray-700 uppercase text-xs tracking-widest italic group-hover:text-[#008cff] transition-colors">Popular Locations</p>
                <div className="space-y-4">
                    <FilterOption label="Near Airport" />
                    <FilterOption label="City Center" />
                    <FilterOption label="Indiranagar" />
                    <FilterOption label="MG Road" />
                </div>
            </div>
            
            <p className="mt-6 text-[10px] text-gray-400 text-center uppercase tracking-widest font-black italic">Refine your perfect stay</p>
        </aside>
    );
};

const FilterOption = ({ label, sub, selected }) => (
    <div className={`flex items-center justify-between gap-4 p-4 rounded-2xl cursor-pointer transition-all border group ${selected ? 'bg-blue-50/50 border-[#008cff22]' : 'border-transparent hover:bg-gray-50' }`}>
        <div>
            <p className={`text-sm font-bold tracking-tight leading-none ${selected ? 'text-[#008cff]' : 'text-gray-600 group-hover:text-[#008cff]'}`}>{label}</p>
            {sub && <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">{sub}</p>}
        </div>
        <div className={`shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
            selected ? 'bg-[#008cff] border-[#008cff] text-white shadow-lg shadow-blue-500/20' : 'border-gray-100 group-hover:border-gray-200'
        }`}>
            {selected && <CheckCircle2 size={14} />}
        </div>
    </div>
);

export default FilterSidebar;
