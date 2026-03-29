import React from "react";
import { Star, MapPin, Share2, Heart } from "lucide-react";

export default function HotelDetailsHeader({ hotel }) {
    return (
        <div className="bg-white pt-6 pb-2 border-b border-slate-100">
            <div className="max-w-6xl mx-auto px-4 flex justify-between items-start">
                <div>
                     <div className="flex items-center gap-2 mb-1">
                        <div className="flex">
                            {[1,2,3,4,5].map((s) => (
                                <Star key={s} size={14} className={s <= Math.round(hotel.rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"} />
                            ))}
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1.5 py-0.5 border border-slate-200 rounded">Hotel</span>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 mb-1">{hotel.name}</h1>
                    <p className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
                        <MapPin size={16} className="text-blue-600" />
                        {hotel.city} | <span className="text-blue-600 font-bold hover:underline cursor-pointer">View on Map</span>
                    </p>
                </div>

                <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors">
                        <Share2 size={18} /> Share
                    </button>
                    <button className="flex items-center gap-2 text-slate-600 hover:text-rose-600 font-bold text-sm transition-colors">
                        <Heart size={18} /> Save
                    </button>
                </div>
            </div>
        </div>
    );
}
