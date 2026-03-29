import React from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Wifi, Coffee, Wind, ChevronRight, CheckCircle2 } from "lucide-react";

export default function HotelCard({ hotel, index, onBook }) {
    // MakeMyTrip style horizontal card
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.08)] overflow-hidden hover:shadow-[0_8px_20px_rgb(0,0,0,0.12)] transition-shadow duration-300 mb-6 flex flex-col md:flex-row border border-slate-100"
        >
            {/* Left side: Images */}
            <div className="relative md:w-72 lg:w-80 h-56 md:h-auto overflow-hidden">
                <img
                    src={(hotel.images && hotel.images[0]) || hotel.image || "/assets/img/img_2dc438666a.jpg"}
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
                    <span className="text-xs font-black text-slate-800">{hotel.rating}</span>
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span className="text-[10px] text-slate-500 font-bold ml-1">Very Good</span>
                </div>
            </div>

            {/* Middle side: Info */}
            <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <div className="flex">
                                    {[1,2,3,4,5].map((star) => (
                                        <Star key={star} size={12} className={star <= Math.round(hotel.rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"} />
                                    ))}
                                </div>
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Hotel</span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight mb-1">{hotel.name}</h3>
                            <p className="flex items-center gap-1 text-sm font-medium text-slate-500 mb-1">
                                <span className="font-bold">{hotel.address}</span>
                            </p>
                            <p className="flex items-center gap-1 text-sm font-medium text-blue-600 mb-2 hover:underline cursor-pointer">
                                <MapPin size={14} />
                                {hotel.city} | <span className="text-slate-500">View on Map</span>
                            </p>
                            <p className="text-xs text-slate-500 font-medium line-clamp-2 md:line-clamp-3 mb-4">{hotel.description}</p>
                        </div>
                    </div>

                    <div className="space-y-2 mt-1">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 bg-slate-50 w-fit px-2 py-1 rounded">
                            <CheckCircle2 size={12} className="text-emerald-500" />
                            Free Cancellation till 24 hrs before check in
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-x-3 gap-y-2 mt-4">
                        {(hotel.amenities || []).slice(0, 5).map((amenity, i) => (
                            <span key={i} className="flex items-center gap-1 text-[10px] font-black uppercase tracking-tight text-slate-400 border border-slate-100 px-2 py-1 rounded-full bg-slate-50/50 transition-colors hover:bg-white hover:text-blue-600 hover:border-blue-200">
                                {amenity.replace(/_/g, " ")}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right side: Price & Action */}
            <div className="w-full md:w-64 bg-slate-50/50 p-5 md:border-l border-slate-100 flex flex-col justify-end items-end text-right">
                <div className="mb-auto text-right w-full">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Per Night</p>
                    <div className="flex items-end justify-end gap-2 mt-1">
                        <p className="text-sm font-bold text-slate-400 line-through">₹{(hotel.price * 1.3).toFixed(0)}</p>
                        <p className="text-3xl font-black text-slate-900">₹{hotel.price}</p>
                    </div>
                    <p className="text-xs font-bold text-slate-500 mt-1">+ ₹{Math.round(hotel.price * 0.18)} taxes & fees</p>
                </div>
                
                <div className="w-full mt-6">
                    <button
                        onClick={() => onBook(hotel)}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg text-sm font-bold shadow-md shadow-blue-200 transition-all flex justify-center items-center gap-2"
                    >
                        View Details <ChevronRight size={16} />
                    </button>
                    <p className="text-[10px] text-center text-rose-500 font-bold mt-2">Only 2 rooms left!</p>
                </div>
            </div>
        </motion.div>
    );
}
