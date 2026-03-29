import React from "react";
import { Search, MapPin, Calendar, ChevronDown } from "lucide-react";

export default function HotelSearchHeader({ location, checkIn, checkOut, guests, onModify }) {
    return (
        <section className="bg-[#041422] py-4 px-6 sticky top-20 z-40 border-b border-white/10 shadow-lg">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2 md:gap-4">
                <div className="flex-1 min-w-[200px] bg-white/10 hover:bg-white/20 transition-colors border border-white/20 rounded-lg px-4 py-2.5 flex items-center gap-3 cursor-pointer" onClick={onModify}>
                    <MapPin size={20} className="text-blue-400" />
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">City, Property Name Or Location</p>
                        <p className="text-sm font-bold text-white leading-none">{location}</p>
                    </div>
                </div>

                <div className="bg-white/10 hover:bg-white/20 transition-colors border border-white/20 rounded-lg px-4 py-2.5 flex items-center gap-3 cursor-pointer" onClick={onModify}>
                    <Calendar size={18} className="text-blue-400" />
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Check-In</p>
                        <p className="text-sm font-bold text-white leading-none">{checkIn}</p>
                    </div>
                </div>

                <div className="bg-white/10 hover:bg-white/20 transition-colors border border-white/20 rounded-lg px-4 py-2.5 flex items-center gap-3 cursor-pointer" onClick={onModify}>
                    <Calendar size={18} className="text-blue-400" />
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Check-Out</p>
                        <p className="text-sm font-bold text-white leading-none">{checkOut}</p>
                    </div>
                </div>

                <div className="bg-white/10 hover:bg-white/20 transition-colors border border-white/20 rounded-xl px-4 py-2.5 flex items-center justify-between gap-6 cursor-pointer min-w-[150px]" onClick={onModify}>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Rooms & Guests</p>
                        <p className="text-sm font-black text-white leading-none">1 Room, {guests} Adults</p>
                    </div>
                    <ChevronDown size={14} className="text-blue-400" />
                </div>

                <button 
                    onClick={onModify} 
                    className="px-10 py-3.5 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white font-black text-xs rounded-xl shadow-lg shadow-violet-950/40 transition-all uppercase tracking-widest ml-auto hover:scale-[1.02] active:scale-95"
                >
                    Search
                </button>
            </div>
        </section>
    );
}
