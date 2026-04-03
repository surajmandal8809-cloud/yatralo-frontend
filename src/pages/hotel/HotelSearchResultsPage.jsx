import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Hotel as HotelIcon, 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  ArrowRightLeft, 
  X,
  Filter,
  Star
} from "lucide-react";
import { searchHotels, searchHotelsCities } from "../../services/hotelRoutes";
import HotelCard from "./components/HotelCard";
import HotelFilters from "./components/HotelFilters";

// Dynamic City Search Box for the result page (Mirroring AirportSearchBox in Flight)
function CitySearchBox({ label, value, iata, onSelect }) {
  const [showPicker, setShowPicker] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowPicker(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (val) => {
    setQuery(val);
    if (val.length >= 2) {
      setLoading(true);
      try {
        const results = await searchHotelsCities(val);
        setSuggestions(results.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="relative group flex-1" ref={dropdownRef}>
      <div 
        onClick={() => setShowPicker(!showPicker)}
        className="bg-white border border-slate-200 rounded-lg px-4 flex flex-col justify-center h-[54px] cursor-pointer hover:border-blue-400 hover:bg-slate-50/50 transition-all group"
      >
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight leading-none mb-1.5">{label}</p>
        <div className="flex items-center justify-between">
           <p className="text-sm font-black text-slate-900 truncate uppercase">{iata || value}</p>
           <ChevronDown size={12} className="text-slate-400 group-hover:text-blue-500" />
        </div>
      </div>

      <AnimatePresence>
        {showPicker && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-[60] p-4"
          >
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2 mb-4">
               <Search size={14} className="text-slate-400" />
               <input 
                 autoFocus
                 type="text" 
                 value={query}
                 onChange={(e) => handleSearch(e.target.value)}
                 placeholder="Search by City or Hotel..." 
                 className="bg-transparent text-xs font-bold outline-none w-full text-slate-800" 
               />
            </div>
            <div className="space-y-1 max-h-60 overflow-y-auto no-scrollbar">
              {loading ? (
                 <div className="py-4 text-center text-[10px] text-slate-400 uppercase font-black tracking-widest">Searching...</div>
              ) : suggestions.length > 0 ? (
                suggestions.map(c => (
                  <button 
                    key={c.iataCode} 
                    onClick={() => { onSelect({ city: c.city, iata: c.iataCode }); setShowPicker(false); setQuery(""); }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-all text-left"
                  >
                    <span className="text-[10px] font-black bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded min-w-[36px] text-center">{c.iataCode}</span>
                    <div className="flex-1">
                      <p className="text-[11px] font-bold text-slate-800">{c.city}, {c.country || 'India'}</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="py-2 px-2 text-[10px] text-slate-400 font-bold uppercase">Popular: DEL, BOM, BLR, GOI...</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const HotelSearchResultsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const cityCode = searchParams.get("cityCode") || "DEL";
    const checkInDate = searchParams.get("checkInDate") || new Date().toISOString().split("T")[0];
    const checkOutDate = searchParams.get("checkOutDate") || new Date(Date.now() + 86400000).toISOString().split("T")[0];
    const adults = searchParams.get("adults") || "2";

    const [fromData, setFromData] = useState({ iata: cityCode, city: "Loading..." });
    const [checkIn, setCheckIn] = useState(checkInDate);
    const [checkOut, setCheckOut] = useState(checkOutDate);
    const [guests, setGuests] = useState(adults);

    const fetchHotels = useCallback(async () => {
        setLoading(true);
        try {
            const results = await searchHotels({
                cityCode: cityCode,
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
                adults: adults
            });
            if (results.status) {
                setHotels(results.data);
            }
        } catch (err) {
            console.error("Failed to fetch hotels:", err);
        } finally {
            setLoading(false);
        }
    }, [cityCode, checkInDate, checkOutDate, adults]);

    useEffect(() => {
        fetchHotels();
    }, [fetchHotels]);

    const handleSearch = () => {
        const params = new URLSearchParams({
            cityCode: fromData.iata,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            adults: guests.toString()
        });
        setSearchParams(params);
        setShowMobileSearch(false);
    };

    return (
        <div className="min-h-screen bg-[#f2f2f2] pb-12 pt-16 font-sans">
            
            {/* Sticky Premium Search Bar (Matching Flight Design) */}
            <section className="bg-white py-3 px-4 md:px-6 sticky top-14 md:top-16 z-40 shadow-sm border-b border-slate-200">
                <div className="max-w-7xl mx-auto">
                    {/* Desktop Search Bar */}
                    <div className="hidden md:block">
                        <div className="flex items-center gap-1.5 overflow-visible">
                            <div className="flex bg-slate-100/50 p-1 rounded-xl gap-1.5 flex-1 items-center">
                                <div className="min-w-[100px] h-[54px] bg-white border border-slate-200 rounded-lg px-4 flex flex-col justify-center shrink-0">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight leading-none mb-1.5">Property Type</p>
                                    <p className="text-sm font-black text-slate-900 leading-none">HOTELS</p>
                                </div>

                                <CitySearchBox label="Destination" value={fromData.city} iata={fromData.iata} onSelect={setFromData} />

                                <div className="relative flex-1 group bg-white border border-slate-200 rounded-lg px-4 flex flex-col justify-center h-[54px] hover:border-blue-400 hover:bg-slate-50/50 transition-all cursor-pointer">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight leading-none mb-1.5">Check-In</p>
                                    <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="bg-transparent text-sm font-black text-slate-900 outline-none w-full cursor-pointer uppercase" />
                                </div>

                                <div className="relative flex-1 group bg-white border border-slate-200 rounded-lg px-4 flex flex-col justify-center h-[54px] hover:border-blue-400 hover:bg-slate-50/50 transition-all cursor-pointer">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight leading-none mb-1.5">Check-Out</p>
                                    <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="bg-transparent text-sm font-black text-slate-900 outline-none w-full cursor-pointer uppercase" />
                                </div>

                                <div className="relative flex-1 group bg-white border border-slate-200 rounded-lg px-4 flex flex-col justify-center h-[54px] hover:border-blue-400 hover:bg-slate-50/50 transition-all cursor-pointer">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight leading-none mb-1.5">Guests</p>
                                    <div className="flex items-center justify-between">
                                       <p className="text-sm font-black text-slate-900 leading-none truncate">{guests} Adults</p>
                                       <ChevronDown size={12} className="text-slate-400" />
                                    </div>
                                </div>
                            </div>
                            
                            <button 
                                onClick={handleSearch} 
                                className="h-[54px] px-10 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-black text-sm rounded-lg shadow-lg shadow-blue-200/50 transition-all uppercase tracking-widest ml-1 active:scale-95"
                            >Search</button>
                        </div>
                    </div>

                    {/* Mobile Search Summary */}
                    <div className="md:hidden flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-700 shadow-xl" onClick={() => setShowMobileSearch(true)}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200/20">
                                <HotelIcon size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-black text-white leading-none tracking-tight">Stay in {cityCode}</p>
                                <p className="text-[11.5px] font-bold text-white/60 mt-1 uppercase tracking-wider">
                                    {new Date(checkInDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })} - {new Date(checkOutDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })} • {adults} Gst
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="h-6 w-[1px] bg-white/10" />
                           <button className="text-white/80 p-1">
                              <ChevronDown size={18} />
                           </button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 md:px-6 pt-10">
                <div className="flex flex-col lg:grid lg:grid-cols-[260px_1fr] gap-6">
                    
                    {/* Sidebar Filter Panel */}
                    <aside className="hidden lg:block space-y-4">
                        <HotelFilters />
                    </aside>

                    {/* Main Content Area */}
                    <main className="space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base md:text-xl font-black text-slate-900 tracking-tight italic uppercase">
                                {loading ? 'Scanning Hotels...' : `${hotels.length} Properties in ${cityCode}`}
                            </h2>
                            <button onClick={() => setShowFilters(true)} className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 text-[12px] font-black uppercase tracking-widest text-[#7c3aed] shadow-sm">
                                <Filter size={14} /> Refine
                            </button>
                            <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50 transition-all group">
                                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Sort Matrix:</span>
                                <span className="text-sm font-black text-blue-600 italic">POPULARITY</span>
                                <ChevronDown size={14} className="text-slate-400 group-hover:text-blue-500" />
                            </div>
                        </div>

                        {loading ? (
                            <div className="space-y-6">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-72 bg-white rounded-2xl shadow-sm border border-slate-200 animate-pulse" />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {hotels.map(hotel => (
                                    <HotelCard 
                                        key={hotel.id} 
                                        hotel={hotel} 
                                        onClick={() => {
                                            const params = new URLSearchParams({
                                                hotelId: hotel.id,
                                                checkInDate: checkInDate,
                                                checkOutDate: checkOutDate,
                                                adults: adults
                                            });
                                            navigate(`/hotels/details?${params.toString()}`);
                                        }}
                                    />
                                ))}
                                
                                {hotels.length === 0 && (
                                    <div className="text-center py-24 md:py-32 bg-white rounded-3xl shadow-sm border border-slate-200 px-6">
                                        <HotelIcon size={64} className="mx-auto mb-6 text-slate-100" />
                                        <h3 className="text-xl md:text-2xl font-black text-slate-900 italic uppercase tracking-tighter leading-none">No Stay Points Found</h3>
                                        <p className="text-[10px] md:text-xs font-bold text-slate-400 mt-2 uppercase tracking-[0.2em] leading-relaxed italic max-w-sm mx-auto">"Adjust the location or date matrix to re-index the hotel list."</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Mobile Search Edit Drawer (Mirroring Flight) */}
            <AnimatePresence>
                {showMobileSearch && (
                    <div className="fixed inset-0 z-[60] flex flex-col md:hidden">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowMobileSearch(false)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                        <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="relative mt-auto bg-white rounded-t-[2.5rem] p-6 pb-12 max-h-[95vh] overflow-y-auto">
                            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6" />
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">Modify Search</h3>
                                <button onClick={() => setShowMobileSearch(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-900"><X size={20}/></button>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-1">Where to?</p>
                                    <CitySearchBox label="Destination" value={fromData.city} iata={fromData.iata} onSelect={setFromData} />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                   <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                      <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Calendar size={12}/> Check-In</p>
                                      <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="bg-transparent text-sm font-black text-slate-900 outline-none w-full" />
                                   </div>
                                   <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                      <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Calendar size={12}/> Check-Out</p>
                                      <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="bg-transparent text-sm font-black text-slate-900 outline-none w-full" />
                                   </div>
                                </div>

                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Users size={12}/> Travelers</p>
                                    <div className="flex items-center justify-between">
                                        <button onClick={() => setGuests(Math.max(1, parseInt(guests)-1))} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-900 text-xs font-black">-</button>
                                        <span className="text-sm font-black">{guests}</span>
                                        <button onClick={() => setGuests(parseInt(guests)+1)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-900 text-xs font-black">+</button>
                                    </div>
                                </div>

                                <button onClick={handleSearch} className="w-full h-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-[1.5rem] text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-100 mt-4">Update Results</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
                {showFilters && (
                    <div className="fixed inset-0 z-[60] flex flex-col md:hidden">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFilters(false)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                        <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="relative mt-auto bg-white rounded-t-[2.5rem] p-6 pb-12 shadow-2xl overflow-y-auto">
                            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6" />
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">Refine Properties</h3>
                                <button onClick={() => setShowFilters(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100"><X size={20}/></button>
                            </div>
                            <HotelFilters />
                            <button onClick={() => setShowFilters(false)} className="w-full h-16 bg-slate-900 text-white rounded-2xl text-sm font-black uppercase tracking-[0.2em] shadow-xl mt-8 italic">Apply Matrix</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HotelSearchResultsPage;
