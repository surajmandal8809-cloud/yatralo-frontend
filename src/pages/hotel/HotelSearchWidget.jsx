import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  ChevronRight,
  Navigation,
  Globe,
  Tag
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const HotelSearchWidget = () => {
    const navigate = useNavigate();
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];

    const [formData, setFormData] = useState({
        location: "Delhi",
        locationCode: "DEL",
        checkIn: today,
        checkOut: tomorrow,
        guests: "2 Guests, 1 Room"
    });

    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (!searchQuery || searchQuery.length < 2) {
            setSuggestions([]);
            return;
        }
        const fetchCities = async () => {
             try {
                const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
                const res = await fetch(`${apiUrl}/hotels/cities/suggest?keyword=${searchQuery}`);
                const result = await res.json();
                if (result.status) {
                    setSuggestions(result.data);
                }
             } catch (error) {
                console.error("Cities suggest error", error);
             }
        };
        const timeoutId = setTimeout(fetchCities, 300);
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.append("city", formData.locationCode);
        params.append("checkin", formData.checkIn);
        params.append("checkout", formData.checkOut);
        params.append("adults", formData.guests.split(" ")[0]);
        params.append("autoSearch", "1");
        
        navigate(`/hotels/results?${params.toString()}`);
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
            <div className="bg-white/95 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-white/20 p-1 md:p-2 overflow-visible">
                
                {/* Horizontal Tabs Header Style */}
                <div className="flex border-b border-slate-100 mb-2 overflow-x-auto no-scrollbar">
                    <div className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 text-[#f97316] text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] relative whitespace-nowrap">
                         <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#7c3aed] to-[#f97316]" />
                         <Navigation size={14} strokeWidth={3} />
                         Hotels & Stays
                    </div>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                        
                        {/* DESTINATION */}
                        <div className="relative group">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Destination</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#f97316] transition-colors">
                                    <MapPin size={18} />
                                </div>
                                <input
                                    required
                                    type="text"
                                    value={searchQuery || formData.location}
                                    placeholder="Enter City or Area"
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    onFocus={() => {
                                        setShowSuggestions(true);
                                        if(!searchQuery) setSearchQuery(formData.location);
                                    }}
                                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                    className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl text-sm font-black text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#f97316]/10 focus:border-[#f97316] outline-none transition-all h-14"
                                />
                                
                                {showSuggestions && suggestions.length > 0 && (
                                    <AnimatePresence>
                                        <motion.ul 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute z-50 top-[110%] left-0 w-full bg-white border border-slate-100 rounded-2xl shadow-2xl max-h-64 overflow-y-auto overflow-x-hidden no-scrollbar"
                                        >
                                            {suggestions.map((c, i) => (
                                                <li 
                                                    key={i}
                                                    onClick={() => {
                                                        setFormData(prev => ({...prev, location: c.city, locationCode: c.code}));
                                                        setSearchQuery(c.city);
                                                        setShowSuggestions(false);
                                                    }}
                                                    className="px-6 py-4 hover:bg-slate-50 cursor-pointer flex flex-col border-b border-slate-50 last:border-none transition-colors"
                                                >
                                                    <span className="font-black text-slate-800 text-sm">{c.city}</span>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{c.state}, India</span>
                                                </li>
                                            ))}
                                        </motion.ul>
                                    </AnimatePresence>
                                )}
                            </div>
                        </div>

                        {/* CHECK-IN */}
                        <div className="relative group">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Check-in</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#f97316] transition-colors">
                                    <Calendar size={18} />
                                </div>
                                <input
                                    required
                                    type="date"
                                    value={formData.checkIn}
                                    onChange={(e) => setFormData(p => ({...p, checkIn: e.target.value}))}
                                    className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl text-sm font-black text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#f97316]/10 focus:border-[#f97316] outline-none transition-all h-14"
                                />
                            </div>
                        </div>

                        {/* CHECK-OUT */}
                        <div className="relative group">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Check-out</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#f97316] transition-colors">
                                    <Calendar size={18} />
                                </div>
                                <input
                                    required
                                    type="date"
                                    value={formData.checkOut}
                                    onChange={(e) => setFormData(p => ({...p, checkOut: e.target.value}))}
                                    className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl text-sm font-black text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#f97316]/10 focus:border-[#f97316] outline-none transition-all h-14"
                                />
                            </div>
                        </div>

                        {/* GUESTS */}
                        <div className="relative group">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Guests & Rooms</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#f97316] transition-colors">
                                    <Users size={18} />
                                </div>
                                <input
                                    required
                                    readOnly
                                    type="text"
                                    value={formData.guests}
                                    className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl text-sm font-black text-slate-900 outline-none h-14 cursor-help translate-y-[0.5px]"
                                />
                            </div>
                        </div>

                        {/* SEARCH BUTTON */}
                        <div className="relative">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full h-14 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-2xl font-black uppercase tracking-[0.15em] flex items-center justify-center gap-3 shadow-xl shadow-orange-100 transition-all text-xs group"
                            >
                                <Search size={18} strokeWidth={3} />
                                Search Hotels
                            </motion.button>
                        </div>
                    </form>

                    {/* Popular Tags Style from SearchForm */}
                    <div className="mt-6 flex flex-wrap items-center gap-3 text-[10px] text-slate-400">
                        <Tag size={12} className="text-slate-300" />
                        <span className="font-bold uppercase tracking-wider">Top Trending:</span>
                        {["Mumbai", "Goa", "Dubai", "Bali", "Paris"].map((dest) => (
                            <button
                                key={dest}
                                type="button"
                                onClick={() => {
                                    setSearchQuery(dest);
                                    setFormData(p => ({...p, location: dest}));
                                }}
                                className="px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full hover:border-[#f97316] hover:text-[#f97316] transition-all font-black uppercase tracking-tighter"
                            >
                                {dest}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelSearchWidget;
