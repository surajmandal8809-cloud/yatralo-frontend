import React, { useState, useRef, useEffect } from "react";
import { Search, MapPin, Calendar, Users, ChevronDown, Check, History, TrendingUp, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { searchHotelsCities } from "../../../services/hotelRoutes";

const HorizontalHotelSearch = ({ 
    initialCity = "Delhi", 
    initialCityCode = "DEL",
    initialCheckIn = "", 
    initialCheckOut = "", 
    initialGuests = 2 
}) => {
    const navigate = useNavigate();
    const [city, setCity] = useState({ city: initialCity, iataCode: initialCityCode });
    const [checkIn, setCheckIn] = useState(initialCheckIn);
    const [checkOut, setCheckOut] = useState(initialCheckOut);
    const [guests, setGuests] = useState(initialGuests);
    
    // Suggestion logic
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestionRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCitySearch = async (val) => {
        setSearchQuery(val);
        if (val.length < 2) return;
        setLoadingSuggestions(true);
        try {
            const data = await searchHotelsCities(val);
            setSuggestions(data.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingSuggestions(false);
        }
    };

    const handleSelectCity = (c) => {
        setCity(c);
        setShowSuggestions(false);
        setSearchQuery("");
    };

    const popularCities = [
        { city: "Mumbai", iataCode: "BOM", country: "India" },
        { city: "Delhi", iataCode: "DEL", country: "India" },
        { city: "Bengaluru", iataCode: "BLR", country: "India" },
        { city: "Goa", iataCode: "GOI", country: "India" },
        { city: "Jaipur", iataCode: "JAI", country: "India" },
    ];

    const handleSearch = () => {
        const params = new URLSearchParams({
            cityCode: city.iataCode,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            adults: guests.toString()
        });
        navigate(`/hotels/results?${params.toString()}`);
    };

    return (
        <div className="bg-white shadow-xl rounded-2xl border border-slate-100 flex flex-col md:flex-row items-stretch">
            
            {/* CITY BOX */}
            <div className="flex-1 relative group md:border-r border-slate-100" ref={suggestionRef}>
                <div 
                    onClick={() => setShowSuggestions(true)}
                    className="p-4 md:px-6 md:py-3 h-full hover:bg-slate-50 transition-colors cursor-pointer"
                >
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#7c3aed] mb-1 block">City / Hotel / Area</label>
                    <div className="flex items-center gap-3">
                        <MapPin size={18} className="text-slate-400 group-hover:text-[#7c3aed] transition-colors" />
                        <div className="font-black text-slate-800 text-lg leading-tight uppercase tracking-tight">{city.city}</div>
                    </div>
                </div>

                <AnimatePresence>
                    {showSuggestions && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute left-0 right-0 top-full mt-2 bg-white shadow-2xl rounded-2xl z-[100] border p-2 min-w-[300px]"
                        >
                            <div className="relative mb-2">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input 
                                    autoFocus
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => handleCitySearch(e.target.value)}
                                    className="w-full p-3 pl-10 border rounded-xl outline-none text-sm font-bold bg-slate-50"
                                    placeholder="Where are you going?"
                                />
                            </div>
                            <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                                {(searchQuery.length >= 2 ? suggestions : popularCities).map((c, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSelectCity(c)}
                                        className="w-full flex items-center justify-between p-3 hover:bg-indigo-50 rounded-xl transition-all text-left"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                                                <MapPin size={14} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-800 tracking-tight">{c.city}</p>
                                                <p className="text-[10px] font-bold text-slate-400">{c.country}</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">{c.iataCode}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* CHECK-IN BOX */}
            <div className="flex-1 p-4 md:px-6 md:py-3 border-b md:border-b-0 md:border-r border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Check-In</label>
                <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-slate-400" />
                    <input 
                        type="date" 
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="bg-transparent font-black text-slate-800 text-sm outline-none w-full cursor-pointer"
                    />
                </div>
            </div>

            {/* CHECK-OUT BOX */}
            <div className="flex-1 p-4 md:px-6 md:py-3 border-b md:border-b-0 md:border-r border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Check-Out</label>
                <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-slate-400" />
                    <input 
                        type="date" 
                        value={checkOut}
                        min={checkIn}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="bg-transparent font-black text-slate-800 text-sm outline-none w-full cursor-pointer"
                    />
                </div>
            </div>

            {/* GUESTS BOX */}
            <div className="flex-1 p-4 md:px-6 md:py-3 border-b md:border-b-0 border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Rooms & Guests</label>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Users size={18} className="text-slate-400" />
                        <select 
                            value={guests}
                            onChange={(e) => setGuests(parseInt(e.target.value))}
                            className="bg-transparent font-black text-slate-800 text-sm outline-none w-full cursor-pointer appearance-none"
                        >
                            {[1,2,3,4,5,6].map(v => (
                                <option key={v} value={v}>{v} Adult{v > 1 ? 's' : ''}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* SEARCH BUTTON */}
            <button 
                onClick={handleSearch}
                className="bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white px-10 py-5 md:py-0 font-black uppercase tracking-[0.2em] text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
                Search <Search size={18} strokeWidth={3} />
            </button>
        </div>
    );
};

export default HorizontalHotelSearch;
