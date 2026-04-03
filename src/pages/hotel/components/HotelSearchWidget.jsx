import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  ChevronRight, 
  X, 
  History, 
  TrendingUp,
  Hotel,
  Bed,
  CheckCircle,
  Building,
  Home,
  ShieldCheck,
  CreditCard,
  ArrowRightLeft,
  ChevronDown,
  LayoutGrid
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { searchHotelsCities } from "../../../services/hotelRoutes";

const HotelSearchWidget = () => {
  const navigate = useNavigate();
  const [stayType, setStayType] = useState("upfront"); // upfront, pay-at-hotel, villa
  const [activeModal, setActiveModal] = useState(null); // 'city', 'date', 'guests'
  
  const [city, setCity] = useState({ city: "Delhi", iataCode: "DEL", country: "India" });
  const [checkIn, setCheckIn] = useState(new Date().toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

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

  const handleSelectCity = (cityData) => {
    setCity(cityData);
    setActiveModal(null);
    setSearchQuery("");
  };

  const handleSearchHotels = () => {
    if (!city.iataCode) return;
    
    const params = new URLSearchParams({
      cityCode: city.iataCode,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      adults: guests.toString()
    });
    
    navigate(`/hotels/results?${params.toString()}`);
  };

  const popularCities = [
    { city: "Mumbai", iataCode: "BOM", country: "India" },
    { city: "Delhi", iataCode: "DEL", country: "India" },
    { city: "Bengaluru", iataCode: "BLR", country: "India" },
    { city: "Goa", iataCode: "GOI", country: "India" },
    { city: "Jaipur", iataCode: "JAI", country: "India" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 relative z-20">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 p-1 md:p-2 border border-slate-100">
        
        {/* TABS - PURPLE TO ORANGE GRADIENT (MMT STYLE) */}
        <div className="flex items-center gap-2 p-3 pb-0">
          {[
            { id: "upfront", label: "Hotels", icon: Hotel },
            { id: "pay-at-hotel", label: "Pay at Hotel", icon: CreditCard },
            { id: "villa", label: "Villas & Homes", icon: Home },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStayType(tab.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                stayType === tab.id 
                ? "bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white shadow-lg shadow-orange-100" 
                : "bg-transparent text-slate-500 hover:bg-slate-50"
              }`}
            >
              <tab.icon size={14} strokeWidth={3} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* MAIN SEARCH PANEL - 5 COLUMN FORMAT TO MATCH IMAGE */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 gap-1 mt-3 p-1 md:p-2 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-inner">
          
          {/* COLUMN 1: LOCATION */}
          <div className="lg:col-span-3 relative group md:border-r border-slate-200/50">
            <button
              onClick={() => setActiveModal("city")}
              className="w-full h-24 p-6 text-left bg-white hover:bg-indigo-50/30 transition-all rounded-l-[1.8rem] flex flex-col justify-center"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">City / Location</p>
              <h3 className="text-3xl font-black text-slate-900 leading-tight group-hover:text-[#7c3aed] transition-colors uppercase">{city.city}</h3>
              <p className="text-[10px] font-black text-slate-500 truncate mt-0.5">{city.iataCode}, {city.country}</p>
            </button>
          </div>

          {/* COLUMN 2: CHECK-IN */}
          <div className="lg:col-span-2 relative group md:border-r border-slate-200/50">
            <button
              onClick={() => setActiveModal("date")}
              className="w-full h-24 p-6 text-left bg-white hover:bg-indigo-50/30 transition-all flex flex-col justify-center"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Check-In</p>
              <h3 className="text-2xl font-black text-slate-900 leading-tight flex items-baseline gap-1">
                {new Date(checkIn).getDate()}{" "}
                <span className="text-sm font-bold text-slate-500 uppercase">{new Date(checkIn).toLocaleDateString(undefined, { month: 'short', year: '2-digit' })}</span>
              </h3>
              <p className="text-[10px] font-black text-slate-500 mt-0.5 uppercase tracking-widest leading-none">{new Date(checkIn).toLocaleDateString(undefined, { weekday: 'long' })}</p>
            </button>
          </div>

          {/* COLUMN 3: CHECK-OUT */}
          <div className="lg:col-span-2 relative group md:border-r border-slate-200/50">
            <button
              onClick={() => setActiveModal("date")}
              className="w-full h-24 p-6 text-left bg-white hover:bg-indigo-50/30 transition-all flex flex-col justify-center"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Check-Out</p>
              <h3 className="text-2xl font-black text-slate-900 leading-tight flex items-baseline gap-1">
                {new Date(checkOut).getDate()}{" "}
                <span className="text-sm font-bold text-slate-500 uppercase">{new Date(checkOut).toLocaleDateString(undefined, { month: 'short', year: '2-digit' })}</span>
              </h3>
              <p className="text-[10px] font-black text-slate-500 mt-0.5 uppercase tracking-widest leading-none">{new Date(checkOut).toLocaleDateString(undefined, { weekday: 'long' })}</p>
            </button>
          </div>

          {/* COLUMN 4: GUESTS */}
          <div className="lg:col-span-1.5 relative group md:border-r border-slate-200/50">
            <button
              onClick={() => setActiveModal("guests")}
              className="w-full h-24 p-5 text-left bg-white hover:bg-indigo-50/30 transition-all flex flex-col justify-center"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Guests</p>
              <h3 className="text-2xl font-black text-slate-900 leading-tight">{guests} <span className="text-sm font-bold text-slate-500 uppercase">Pax</span></h3>
              <p className="text-[10px] font-black text-slate-500 mt-0.5 uppercase">Adults</p>
            </button>
          </div>

          {/* COLUMN 5: ROOMS & TYPE */}
          <div className="lg:col-span-1.5 relative group">
            <button
              onClick={() => setActiveModal("guests")}
              className="w-full h-24 p-5 text-left bg-white hover:bg-indigo-50/30 transition-all md:rounded-r-[1.8rem] flex flex-col justify-center"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Rooms & Class</p>
              <h3 className="text-2xl font-black text-slate-900 leading-tight">{rooms} <span className="text-sm font-bold text-slate-500 uppercase">Room</span></h3>
              <p className="text-[10px] font-black text-slate-500 mt-0.5 truncate uppercase">Economy</p>
            </button>
          </div>
        </div>

        {/* SEARCH BUTTON - PURPLE TO ORANGE PILL BUTTON OVERLAPPING (MATCHING IMAGE) */}
        <div className="flex justify-center -mb-8 relative z-30 pt-4 pb-2">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearchHotels}
            className="px-16 py-5 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-full font-black text-xl uppercase tracking-[0.2em] shadow-2xl shadow-orange-200 flex items-center gap-3 italic"
          >
            Search Hotels <Search size={24} strokeWidth={4} />
          </motion.button>
        </div>
      </div>

      {/* MODALS (Same functionality, matched to new theme) */}
      <AnimatePresence>
        {activeModal === "city" && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModal(null)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl z-[101] overflow-hidden" >
              <div className="p-10 pb-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Destination Search</h3>
                  <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={28} /></button>
                </div>
                <div className="relative mb-10">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                  <input autoFocus type="text" value={searchQuery} onChange={(e) => handleCitySearch(e.target.value)} placeholder="Type a city or hotel name..." className="w-full bg-slate-50 border-2 border-slate-100 p-6 pl-14 rounded-2xl outline-none focus:border-[#7c3aed]/20 focus:bg-white transition-all font-black text-slate-900 uppercase italic text-lg" />
                </div>
                <div className="grid grid-cols-2 gap-12">
                   <div>
                      <h4 className="flex items-center gap-2 text-[#7c3aed] text-xs font-black uppercase tracking-[0.2em] mb-6"><History size={16}/> Recent Hotspots</h4>
                      <div className="space-y-5">
                         {popularCities.slice(0, 2).map(c => (
                            <button key={c.iataCode} onClick={() => handleSelectCity(c)} className="w-full flex items-center gap-4 group">
                               <div className="w-12 h-12 bg-indigo-50 text-[#7c3aed] rounded-xl flex items-center justify-center group-hover:bg-[#7c3aed] group-hover:text-white transition-all shadow-sm"><Hotel size={20}/></div>
                               <div className="text-left"><p className="text-sm font-black text-slate-800 uppercase italic leading-none">{c.city}</p><p className="text-[10px] font-bold text-slate-400 mt-1 uppercase leading-none">{c.iataCode}</p></div>
                            </button>
                         ))}
                      </div>
                   </div>
                   <div>
                      <h4 className="flex items-center gap-2 text-[#7c3aed] text-xs font-black uppercase tracking-[0.2em] mb-6"><TrendingUp size={16}/> Trending Collections</h4>
                      <div className="space-y-5 max-h-[250px] overflow-y-auto pr-4 no-scrollbar">
                         {(searchQuery.length >= 2 ? suggestions : popularCities).map(c => (
                            <button key={c.iataCode} onClick={() => handleSelectCity(c)} className="w-full flex items-center gap-4 group">
                               <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-[#f97316] group-hover:text-white transition-all shadow-sm"><MapPin size={20}/></div>
                               <div className="flex-1 text-left">
                                  <div className="flex items-center justify-between"><p className="text-sm font-black text-slate-800 uppercase italic leading-none">{c.city}</p><span className="text-[10px] font-black text-[#7c3aed] opacity-40 italic">{c.iataCode}</span></div>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mt-1">{c.country}</p>
                               </div>
                            </button>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
              <div className="bg-slate-50 p-6 flex items-center gap-4 border-t border-slate-100">
                 <ShieldCheck size={18} className="text-[#7c3aed]"/>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Price Guarantee on All Luxury Collections</span>
              </div>
            </motion.div>
          </>
        )}

        {activeModal === "date" && (
           <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModal(null)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-xl bg-white rounded-[3rem] shadow-2xl z-[101] overflow-hidden p-10" >
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic leading-none">Select Stay Duration</h3>
                  <X className="cursor-pointer text-slate-300 hover:text-slate-900 transition-colors" onClick={() => setActiveModal(null)} size={28}/>
               </div>
               <div className="grid grid-cols-2 gap-5 mb-10">
                  <div className="p-6 bg-[#7c3aed]/5 border-2 border-[#7c3aed] rounded-3xl"><p className="text-[10px] font-black text-[#7c3aed] uppercase tracking-widest mb-2 italic">Check-In</p><p className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">{new Date(checkIn).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</p></div>
                  <div className="p-6 bg-white border-2 border-slate-100 rounded-3xl"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Check-Out</p><p className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">{new Date(checkOut).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</p></div>
               </div>
               <div className="space-y-8">
                  <div className="flex gap-6">
                     <div className="flex-1"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block italic">From</label><input type="date" value={checkIn} min={new Date().toISOString().split('T')[0]} onChange={e => setCheckIn(e.target.value)} className="w-full bg-slate-50 p-4 border-2 border-slate-100 rounded-2xl font-black text-slate-900 outline-none focus:border-[#7c3aed] transition-all"/></div>
                     <div className="flex-1"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block italic">To</label><input type="date" value={checkOut} min={checkIn} onChange={e => setCheckOut(e.target.value)} className="w-full bg-slate-50 p-4 border-2 border-slate-100 rounded-2xl font-black text-slate-900 outline-none focus:border-[#7c3aed] transition-all"/></div>
                  </div>
                  <button onClick={() => setActiveModal(null)} className="w-full py-5 bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-200 italic">Apply Stay Dates</button>
               </div>
            </motion.div>
           </>
        )}

        {activeModal === "guests" && (
           <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModal(null)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-xl bg-white rounded-[3rem] shadow-2xl z-[101] overflow-hidden p-10" >
               <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic leading-none mb-10">Guest Configuration</h3>
               <div className="grid grid-cols-2 gap-10">
                  <div className="text-center group"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 italic">Rooms</p><div className="flex items-center justify-center gap-6 bg-slate-50 p-4 rounded-3xl border-2 border-slate-100 group-hover:border-[#7c3aed]/20 transition-all"><button onClick={() => setRooms(Math.max(1, rooms-1))} className="w-12 h-12 rounded-full bg-white text-slate-900 font-black shadow-md">-</button><span className="text-3xl font-black text-slate-900 italic min-w-8">{rooms}</span><button onClick={() => setRooms(rooms+1)} className="w-12 h-12 rounded-full bg-[#7c3aed] text-white font-black shadow-lg shadow-indigo-200">+</button></div></div>
                  <div className="text-center group"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 italic">Occupants</p><div className="flex items-center justify-center gap-6 bg-slate-50 p-4 rounded-3xl border-2 border-slate-100 group-hover:border-[#7c3aed]/20 transition-all"><button onClick={() => setGuests(Math.max(1, guests-1))} className="w-12 h-12 rounded-full bg-white text-slate-900 font-black shadow-md">-</button><span className="text-3xl font-black text-slate-900 italic min-w-8">{guests}</span><button onClick={() => setGuests(guests+1)} className="w-12 h-12 rounded-full bg-[#7c3aed] text-white font-black shadow-lg shadow-indigo-200">+</button></div></div>
               </div>
               <button onClick={() => setActiveModal(null)} className="w-full mt-12 py-5 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-orange-100 italic">Apply Config</button>
            </motion.div>
           </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HotelSearchWidget;
