import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    Search,
    MapPin,
    Calendar,
    Users,
    Star,
    Coffee,
    Wifi,
    Wind,
    ChevronRight,
    RefreshCw,
    Filter,
    Sparkles
} from "lucide-react";
import toast from "react-hot-toast";

function HotelCard({ hotel, index, onBook }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden hover:border-[#7c3aed]/40 transition-all group p-2"
        >
            <div className="flex flex-col md:flex-row">
                <div className="md:w-72 relative overflow-hidden rounded-[2rem]">
                    <img
                        src={hotel.image || "/assets/img/img_2dc438666a.jpg"}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 aspect-[4/3] md:aspect-square"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs font-black text-slate-800">{hotel.rating}</span>
                    </div>
                </div>

                <div className="flex-1 p-6 md:p-8 flex flex-col">
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                        <div>
                            <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight mb-2 tracking-tight">{hotel.name}</h3>
                            <p className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                <MapPin size={13} className="text-[#7c3aed]" />
                                {hotel.city}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Starting from</p>
                            <p className="text-3xl font-black text-[#f97316]">₹{hotel.price.toLocaleString()}</p>
                            <p className="text-[10px] font-bold text-slate-500">Per Night + Taxes</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8 mt-2">
                        {["Free Wifi", "Breakfast Included", "Pool Access", "Spa"].map((amt, i) => (
                            <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-500">
                                {amt === "Free Wifi" ? <Wifi size={12} className="text-[#7c3aed]" /> : <Sparkles size={12} className="text-[#f97316]" />}
                                {amt}
                            </span>
                        ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                        <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                           Free Cancellation until 24h before check-in
                        </div>
                        <button
                            onClick={() => onBook(hotel)}
                            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-violet-100 flex items-center gap-2"
                        >
                            Book Room <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

const MOCK_HOTELS = [
    { id: 1, name: "The Grand Regal Hotel", city: "Mumbai", price: 8500, rating: "4.8", image: "/assets/img/img_f0726367ba.jpg" },
    { id: 2, name: "Ocean Breeze Resort", city: "Goa", price: 12400, rating: "4.9", image: "/assets/img/img_30bf67cf24.jpg" },
    { id: 3, name: "City Center Suites", city: "Delhi", price: 4200, rating: "4.2", image: "/assets/img/img_2fb2e54a39.jpg" },
    { id: 4, name: "Heritage Palace Stay", city: "Jaipur", price: 6800, rating: "4.6", image: "/assets/img/img_11fb8a464f.jpg" },
];

export default function HotelSearchResultsPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const location = searchParams.get("location") || "Select Destination";
    const checkIn = searchParams.get("checkIn") || "Choose Date";
    const checkOut = searchParams.get("checkOut") || "Choose Date";

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            {/* Header / Top Search Info */}
            <section className="bg-white border-b border-slate-200 py-6 px-6 sticky top-20 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4">
                    <div className="flex-1 min-w-[200px] bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 flex items-center gap-4">
                        <MapPin size={20} className="text-[#7c3aed]" />
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Destination</p>
                            <p className="text-sm font-black text-slate-900">{location}</p>
                        </div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 flex items-center gap-4">
                        <Calendar size={18} className="text-[#f97316]" />
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</p>
                            <p className="text-sm font-black text-slate-900">{checkIn} — {checkOut}</p>
                        </div>
                    </div>
                    <button onClick={() => navigate("/hotels")} className="ml-auto px-10 py-4 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white font-black text-xs rounded-2xl uppercase tracking-widest shadow-xl shadow-violet-100 hover:scale-105 transition-all">
                        Modify Search
                    </button>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-10">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-8">
                         <div className="relative">
                            <motion.div 
                              animate={{ rotate: 360 }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              className="w-32 h-32 border-4 border-dashed border-violet-200 rounded-full"
                            />
                            <motion.div 
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="absolute inset-0 flex items-center justify-center text-[#7c3aed]"
                            >
                              <Sparkles size={48} />
                            </motion.div>
                         </div>
                         <div className="text-center">
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Curating finest hotels...</h3>
                            <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-xs">Finding matches from 500,000+ properties</p>
                         </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
                        <div className="flex items-center justify-between mb-4">
                           <h2 className="text-3xl font-black text-slate-900 tracking-tight">Available Stays</h2>
                           <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-[#7c3aed] transition-all">
                                <Filter size={14} /> Filter Results
                           </button>
                        </div>
                        {MOCK_HOTELS.map((hotel, i) => (
                            <HotelCard 
                                key={hotel.id} 
                                hotel={hotel} 
                                index={i} 
                                onBook={(h) => {
                                    toast.success(`Opening ${h.name} details`);
                                    navigate("/booking-selection", {
                                        state: {
                                            type: "hotel",
                                            hotel: h,
                                            from: location,
                                            to: location,
                                            fromName: location,
                                            toName: location,
                                            date: checkIn,
                                            pax: Number(searchParams.get("guests")) || 1,
                                            checkIn,
                                            checkOut,
                                            location
                                        }
                                    });
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
