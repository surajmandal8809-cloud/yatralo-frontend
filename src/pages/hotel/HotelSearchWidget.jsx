import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Hotel, 
  Search, 
  ChevronRight, 
  X, 
  ChevronDown, 
  History,
  TrendingUp,
  CreditCard,
  ShieldCheck,
  Briefcase
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const HotelSearchWidget = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null); // 'location', 'date', 'guests'
  
  const [location, setLocation] = useState({ city: "Delhi", code: "DEL", name: "New Delhi, India" });
  const [checkIn, setCheckIn] = useState(new Date().toISOString().split("T")[0]);
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0]);
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }
    const fetchCities = async () => {
      setIsFetching(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/hotels/cities/suggest?keyword=${searchQuery}`);
        const result = await res.json();
        if (result.status) {
          setSuggestions(result.data);
        }
      } catch (error) {
        console.error("Cities suggest error", error);
      } finally {
        setIsFetching(false);
      }
    };
    const timeoutId = setTimeout(fetchCities, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("location", location.city);
    params.set("cityCode", location.code);
    params.set("checkInDate", checkIn);
    params.set("checkOutDate", checkOut);
    params.set("guests", guests.adults.toString());
    params.set("autoSearch", "1");
    
    navigate(`/hotels/results?${params.toString()}`);
  };

  const recentSearches = [
    { city: "Mumbai", code: "BOM", name: "Maharashtra, India" },
    { city: "Goa", code: "GOI", name: "Goa, India" },
  ];

  const airportResults = searchQuery.length >= 2 ? (suggestions || []) : [
    { city: "Delhi", iataCode: "DEL", country: "India" },
    { city: "Mumbai", iataCode: "BOM", country: "India" },
    { city: "Bengaluru", iataCode: "BLR", country: "India" },
    { city: "Goa", iataCode: "GOI", country: "India" },
    { city: "Hyderabad", iataCode: "HYD", country: "India" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 -mt-24 relative z-20">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-200/50 p-1 md:p-2 border border-slate-100">
        
        {/* Horizontal Tabs Placeholder Style */}
        <div className="flex items-center gap-2 p-3 pb-0">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white shadow-lg shadow-orange-100">
              <Hotel size={14} strokeWidth={3} />
              Hotels & Homestays
            </button>
        </div>

        {/* Main Search Panel */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-9 gap-1 mt-2 p-1 md:p-2 bg-slate-50 rounded-[2rem]">
          {/* DESTINATION */}
          <div className="lg:col-span-3 relative group md:border-r border-slate-200/50">
            <button
              onClick={() => setActiveModal("location")}
              className="w-full h-24 p-5 text-left bg-white hover:bg-indigo-50/30 transition-all rounded-l-[1.8rem] flex flex-col justify-center"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">City / Area / Property</p>
              <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors uppercase truncate">{location.city}</h3>
              <p className="text-[10px] font-black text-slate-500 truncate mt-0.5">{location.name}</p>
            </button>
          </div>

          {/* CHECK-IN */}
          <div className="lg:col-span-2 relative group md:border-r border-slate-200/50">
            <button
              onClick={() => setActiveModal("date")}
              className="w-full h-24 p-5 text-left bg-white hover:bg-indigo-50/30 transition-all flex flex-col justify-center"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Check-in</p>
              <h3 className="text-2xl font-black text-slate-900 leading-tight flex items-baseline gap-1">
                {new Date(checkIn).getDate()}{" "}
                <span className="text-sm font-bold text-slate-500">{new Date(checkIn).toLocaleDateString(undefined, { month: 'short', year: '2-digit' })}</span>
              </h3>
              <p className="text-[10px] font-black text-slate-500 mt-0.5 uppercase tracking-widest">{new Date(checkIn).toLocaleDateString(undefined, { weekday: 'long' })}</p>
            </button>
          </div>

          {/* CHECK-OUT */}
          <div className="lg:col-span-2 relative group md:border-r border-slate-200/50">
            <button
              onClick={() => setActiveModal("date")}
              className="w-full h-24 p-5 text-left bg-white hover:bg-indigo-50/30 transition-all flex flex-col justify-center"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Check-out</p>
              <h3 className="text-2xl font-black text-slate-900 leading-tight flex items-baseline gap-1">
                {new Date(checkOut).getDate()}{" "}
                <span className="text-sm font-bold text-slate-500">{new Date(checkOut).toLocaleDateString(undefined, { month: 'short', year: '2-digit' })}</span>
              </h3>
              <p className="text-[10px] font-black text-slate-500 mt-0.5 uppercase tracking-widest">{new Date(checkOut).toLocaleDateString(undefined, { weekday: 'long' })}</p>
            </button>
          </div>

          {/* GUESTS */}
          <div className="lg:col-span-2 relative group">
            <button
              onClick={() => setActiveModal("guests")}
              className="w-full h-24 p-5 text-left bg-white hover:bg-indigo-50/30 transition-all md:rounded-r-[1.8rem] flex flex-col justify-center"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Guests & Rooms</p>
              <h3 className="text-2xl font-black text-slate-900 leading-tight">
                {guests.adults} <span className="text-sm font-bold text-slate-500">Adult{guests.adults > 1 ? 's' : ''}</span>
              </h3>
              <p className="text-[10px] font-black text-slate-500 mt-0.5 truncate uppercase tracking-widest">{guests.rooms} Room{guests.rooms > 1 ? 's' : ''}</p>
            </button>
          </div>
        </div>

        {/* Search CTA */}
        <div className="flex justify-center -mb-8 relative z-30">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="px-12 py-5 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-full font-black text-lg uppercase tracking-[0.2em] shadow-2xl shadow-orange-200 flex items-center gap-3"
          >
            Search Hotels <Search size={24} strokeWidth={3} />
          </motion.button>
        </div>
      </div>

      {/* Autocomplete Modal */}
      <AnimatePresence>
        {activeModal === "location" && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl z-[101] overflow-hidden"
            >
              <div className="p-8 pb-4">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Select Destination</h3>
                  <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <div className="relative mb-8">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Where are you going?"
                    className="w-full bg-slate-50 border-2 border-slate-100 p-4 pl-12 rounded-2xl outline-none focus:border-indigo-600/20 focus:bg-white transition-all font-bold text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <div className="flex items-center gap-2 mb-4 text-indigo-600">
                      <History size={16} />
                      <span className="text-xs font-black uppercase tracking-widest">Recent Searches</span>
                    </div>
                    <div className="space-y-4">
                      {recentSearches.map((loc) => (
                        <button
                          key={loc.code}
                          onClick={() => {
                              setLocation({ city: loc.city, code: loc.code, name: loc.name });
                              setActiveModal(null);
                          }}
                          className="w-full flex items-center gap-4 group text-left"
                        >
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            <MapPin size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-800 tracking-tight">{loc.city}</p>
                            <p className="text-[10px] font-bold text-slate-400">{loc.name}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4 text-indigo-600">
                      <TrendingUp size={16} />
                      <span className="text-xs font-black uppercase tracking-widest">Popular Cities</span>
                    </div>
                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2 no-scrollbar">
                      {airportResults.map((loc, i) => (
                        <button
                          key={i}
                          onClick={() => {
                              setLocation({ city: loc.city, code: loc.iataCode || loc.code, name: `${loc.city}, ${loc.country || 'India'}` });
                              setActiveModal(null);
                          }}
                          className="w-full flex items-center gap-4 group text-left"
                        >
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            <MapPin size={18} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-black text-slate-800 tracking-tight">{loc.city}</p>
                            <p className="text-[10px] font-bold text-slate-400">{loc.country || loc.name}</p>
                          </div>
                        </button>
                      ))}
                      {isFetching && <div className="text-center py-4 text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Scanning cities...</div>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-6 flex items-center gap-6 overflow-x-auto no-scrollbar">
                 <div className="flex-shrink-0 flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-200 pr-6">
                    Special Rates For
                 </div>
                 {["Business Trip", "Couple", "Solo Traveller", "Honeymoon"].map((tag) => (
                   <button key={tag} className="flex-shrink-0 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-all uppercase tracking-widest">
                     {tag}
                   </button>
                 ))}
              </div>
            </motion.div>
          </>
        )}

        {/* Date Picker Modal */}
        {activeModal === "date" && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl z-[101] overflow-hidden p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Select Stay Dates</h3>
                  <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mt-1">Average 25% discount for weekday stays</p>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-indigo-50 border-2 border-indigo-600 rounded-2xl">
                  <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">Check-in</p>
                  <p className="text-lg font-black text-slate-900">{new Date(checkIn).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Check-out</p>
                  <p className="text-lg font-black text-slate-900">{new Date(checkOut).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>

              <div className="space-y-6">
                 {/* Mock Calendar with Prices */}
                 <div className="bg-slate-50 rounded-2xl p-4">
                    <div className="grid grid-cols-7 gap-1 text-center mb-4">
                       {["S","M","T","W","T","F","S"].map(d => <span key={d} className="text-[10px] font-black text-slate-400">{d}</span>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                       {Array.from({ length: 31 }).map((_, i) => {
                         const day = i + 1;
                         const isCheckIn = day === new Date(checkIn).getDate();
                         const isCheckOut = day === new Date(checkOut).getDate();
                         const randomPrice = 2500 + (day * 100);
                         return (
                           <button
                             key={day}
                             onClick={() => {
                               const d = new Date(); d.setDate(day);
                               if (activeModal === 'date') setCheckIn(d.toISOString().split("T")[0]);
                             }}
                             className={`relative h-14 flex flex-col items-center justify-center rounded-xl transition-all ${
                               isCheckIn || isCheckOut ? "bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white shadow-lg shadow-orange-100" : "bg-white hover:bg-indigo-50"
                             }`}
                           >
                             <span className="text-sm font-black">{day}</span>
                             <span className={`text-[8px] font-bold ${isCheckIn || isCheckOut ? "text-indigo-100" : "text-slate-400"}`}>₹{randomPrice}</span>
                           </button>
                         );
                       })}
                    </div>
                 </div>

                 <button 
                  onClick={() => setActiveModal(null)}
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-100"
                 >
                   Confirm Selection
                 </button>
              </div>
            </motion.div>
          </>
        )}

        {/* Guests Modal */}
        {activeModal === "guests" && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl z-[101] overflow-hidden p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Accommodation Details</h3>
                <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { id: 'adults', label: 'Adults', desc: '12+ Years' },
                    { id: 'children', label: 'Children', desc: '0-12 Years' },
                    { id: 'rooms', label: 'Rooms', desc: 'Max 8' },
                  ].map((type) => (
                    <div key={type.id} className="text-center">
                      <p className="text-sm font-black text-slate-800">{type.label}</p>
                      <p className="text-[10px] font-bold text-slate-400 block mb-3">{type.desc}</p>
                      <div className="flex items-center justify-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <button 
                          onClick={() => setGuests(p => ({ ...p, [type.id]: Math.max(type.id === 'adults' || type.id === 'rooms' ? 1 : 0, p[type.id] - 1) }))}
                          className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-900 shadow-sm disabled:opacity-30"
                          disabled={type.id === 'adults' ? guests.adults <= 1 : (type.id === 'rooms' ? guests.rooms <= 1 : guests.children <= 0)}
                        >-</button>
                        <span className="text-lg font-black text-slate-900 min-w-4">{guests[type.id]}</span>
                        <button 
                          onClick={() => setGuests(p => ({ ...p, [type.id]: Math.min(type.id === 'rooms' ? 8 : (type.id === 'adults' ? 12 : 6), p[type.id] + 1) }))}
                          className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#f97316] flex items-center justify-center text-white shadow-lg shadow-orange-100"
                        >+</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-slate-100">
                   <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Quick Room Selection</p>
                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                     {["1 Adult", "2 Adults", "2 Adults, 1 Child", "4 Adults, 2 Rooms"].map((cls) => (
                       <button
                         key={cls}
                         className="px-4 py-3 rounded-xl bg-slate-50 text-[10px] font-black uppercase tracking-widest border border-transparent hover:border-indigo-600 hover:text-indigo-600 transition-all text-slate-500"
                       >
                         {cls}
                       </button>
                     ))}
                   </div>
                </div>

                <div className="bg-indigo-50 p-4 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-indigo-600">
                    <Briefcase size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black text-slate-900">Corporate Booking</p>
                    <p className="text-[10px] font-bold text-slate-500">Book for your business travel</p>
                  </div>
                  <ChevronRight size={18} className="text-indigo-400" />
                </div>

                <button 
                  onClick={() => setActiveModal(null)}
                  className="w-full py-4 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-orange-100"
                >
                  Apply Selection
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HotelSearchWidget;
