import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Hotel, 
  Search, 
  X, 
  ChevronDown, 
  History, 
  TrendingUp,
  Briefcase,
  Star,
  Home,
  CheckCircle2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLazyGetCitySuggestionsQuery } from "../../services/hotelService";
import toast from "react-hot-toast";

const HotelSearchWidget = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null); // 'location', 'dates', 'guests'
  
  const [location, setLocation] = useState({ city: "Delhi", code: "DEL", state: "India" });
  const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split("T")[0]);
  const [checkOutDate, setCheckOutDate] = useState(() => {
     const d = new Date();
     d.setDate(d.getDate() + 2);
     return d.toISOString().split("T")[0];
  });
  const [guests, setGuests] = useState({ rooms: 1, adults: 2, children: 0 });

  const [searchQuery, setSearchQuery] = useState("");
  const [trigger, { data: searchData, isFetching }] = useLazyGetCitySuggestionsQuery();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length >= 2) {
      trigger(e.target.value);
    }
  };

  const handleSelectLocation = (loc) => {
    setLocation(loc);
    setActiveModal(null);
    setSearchQuery("");
  };

  const handleSearchHotels = () => {
    const params = new URLSearchParams();
    params.append("city", location.code);
    params.append("checkin", checkInDate);
    params.append("checkout", checkOutDate);
    params.append("rooms", guests.rooms);
    params.append("adults", guests.adults);
    params.append("children", guests.children);
    params.append("autoSearch", "1");
    
    navigate(`/hotels/results?${params.toString()}`);
  };

  const recentSearches = [
    { city: "Mumbai", code: "BOM", state: "Maharashtra" },
    { city: "Bangalore", code: "BLR", state: "Karnataka" },
  ];

  const popularCities = [
    { city: "Delhi", code: "DEL", state: "National Capital Territory" },
    { city: "Goa", code: "GOI", state: "India" },
    { city: "Jaipur", code: "JAI", state: "Rajasthan" },
    { city: "Dubai", code: "DXB", state: "United Arab Emirates" },
    { city: "London", code: "LHR", state: "United Kingdom" },
  ];

  const locationResults = searchQuery.length >= 2 ? (searchData?.data || []) : popularCities;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 -mt-24 relative z-20">
      <div className="bg-white rounded-[2.8rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] p-2 border border-slate-100 relative overflow-visible">
        
        {/* Type Indicators (Hotels, Villas, etc) */}
        <div className="flex items-center gap-2 p-3 pb-0">
          {[
            { id: "hotels", label: "Hotels", icon: Hotel },
            { id: "villas", label: "Homestays & Villas", icon: Home },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                tab.id === "hotels"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                : "bg-transparent text-slate-400 hover:bg-slate-50"
              }`}
            >
              <tab.icon size={14} strokeWidth={3} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Panel */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-9 gap-1 mt-3 p-1.5 bg-slate-50 rounded-[2.3rem]">
          
          {/* LOCATION */}
          <div className="lg:col-span-3 relative group md:border-r border-slate-200/50">
            <button
              onClick={() => setActiveModal("location")}
              className="w-full h-28 p-7 text-left bg-white hover:bg-blue-50/30 transition-all rounded-l-[2rem] flex flex-col justify-center"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-2">
                 <MapPin size={10} className="text-blue-500" /> City / Area / Property
              </p>
              <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors uppercase truncate">
                {location.city}
              </h3>
              <p className="text-[10px] font-black text-slate-500 truncate mt-1">
                {location.state}
              </p>
            </button>
          </div>

          {/* CHECK-IN */}
          <div className="lg:col-span-2 relative group md:border-r border-slate-200/50">
            <button
              onClick={() => setActiveModal("dates")}
              className="w-full h-28 p-7 text-left bg-white hover:bg-blue-50/30 transition-all flex flex-col justify-center"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-2">
                 <Calendar size={10} className="text-blue-500" /> Check-in
              </p>
              <h3 className="text-2xl font-black text-slate-900 leading-tight flex items-baseline gap-1.5">
                {new Date(checkInDate).getDate()}{" "}
                <span className="text-sm font-bold text-slate-500">{new Date(checkInDate).toLocaleDateString(undefined, { month: 'short', year: '2-digit' })}</span>
              </h3>
              <p className="text-[10px] font-black text-slate-500 mt-1 uppercase tracking-widest">{new Date(checkInDate).toLocaleDateString(undefined, { weekday: 'long' })}</p>
            </button>
          </div>

          {/* CHECK-OUT */}
          <div className="lg:col-span-2 relative group md:border-r border-slate-200/50">
            <button
              onClick={() => setActiveModal("dates")}
              className="w-full h-28 p-7 text-left bg-white hover:bg-blue-50/30 transition-all flex flex-col justify-center"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-2">
                 <Calendar size={10} className="text-blue-500" /> Check-out
              </p>
              <h3 className="text-2xl font-black text-slate-900 leading-tight flex items-baseline gap-1.5">
                {new Date(checkOutDate).getDate()}{" "}
                <span className="text-sm font-bold text-slate-500">{new Date(checkOutDate).toLocaleDateString(undefined, { month: 'short', year: '2-digit' })}</span>
              </h3>
              <p className="text-[10px] font-black text-slate-500 mt-1 uppercase tracking-widest">{new Date(checkOutDate).toLocaleDateString(undefined, { weekday: 'long' })}</p>
            </button>
          </div>

          {/* GUESTS */}
          <div className="lg:col-span-2 relative group">
            <button
              onClick={() => setActiveModal("guests")}
              className="w-full h-28 p-7 text-left bg-white hover:bg-blue-50/30 transition-all md:rounded-r-[2rem] flex flex-col justify-center"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-2">
                 <Users size={10} className="text-blue-500" /> Guests & Rooms
              </p>
              <h3 className="text-2xl font-black text-slate-900 leading-tight truncate">
                {guests.adults + guests.children} <span className="text-sm font-bold text-slate-500">Guests</span>
              </h3>
              <p className="text-[10px] font-black text-slate-500 mt-1 uppercase tracking-widest">
                {guests.rooms} {guests.rooms > 1 ? 'Rooms' : 'Room'}
              </p>
            </button>
          </div>
        </div>

        {/* Global CTA */}
        <div className="flex justify-center -mb-8 relative z-30">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearchHotels}
            className="px-14 py-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full font-black text-lg uppercase tracking-[0.25em] shadow-2xl shadow-blue-300 flex items-center gap-4 transition-all"
          >
            Search Hotels <Search size={22} strokeWidth={3} />
          </motion.button>
        </div>
      </div>

      {/* SEARCH MODALS */}
      <AnimatePresence>
        {activeModal === "location" && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModal(null)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl z-[101] overflow-hidden">
               <div className="p-10">
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="text-2xl font-black text-slate-900">Select Location</h3>
                     <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} /></button>
                  </div>
                  <div className="relative mb-10">
                     <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                     <input autoFocus type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Where do you want to stay?" className="w-full bg-slate-50 border-2 border-slate-100 p-5 pl-14 rounded-2xl outline-none focus:border-blue-500/20 focus:bg-white transition-all font-bold text-slate-900" />
                  </div>
                  <div className="grid grid-cols-2 gap-12">
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-6 flex items-center gap-2"><History size={12} /> Recent History</p>
                        <div className="space-y-5">
                           {recentSearches.map((loc, i) => (
                             <button key={i} onClick={() => handleSelectLocation(loc)} className="w-full flex items-center gap-4 group text-left">
                                <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all"><MapPin size={18} /></div>
                                <div><p className="text-sm font-black text-slate-800">{loc.city}</p><p className="text-[10px] font-bold text-slate-400">{loc.state}</p></div>
                             </button>
                           ))}
                        </div>
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-6 flex items-center gap-2"><TrendingUp size={12} /> Popular Cities</p>
                        <div className="space-y-5 max-h-64 overflow-y-auto pr-2 no-scrollbar">
                           {locationResults.map((loc, i) => (
                             <button key={i} onClick={() => handleSelectLocation(loc)} className="w-full flex items-center gap-4 group text-left">
                                <div className="w-11 h-11 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all"><Hotel size={18} /></div>
                                <div className="flex-1">
                                   <div className="flex items-center justify-between"><p className="text-sm font-black text-slate-800">{loc.city}</p><span className="text-[9px] font-black bg-slate-50 px-2 py-1 rounded-lg text-blue-600">{loc.code}</span></div>
                                   <p className="text-[10px] font-bold text-slate-400">{loc.state}</p>
                                </div>
                             </button>
                           ))}
                           {isFetching && <p className="text-center py-4 text-[10px] font-black uppercase tracking-widest text-slate-300 animate-pulse">Searching...</p>}
                        </div>
                     </div>
                  </div>
               </div>
               <div className="bg-slate-50 p-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Star size={18} className="fill-blue-600" /></div>
                  <p className="text-[11px] font-black text-slate-500 uppercase tracking-wide">YatraLo Premium Properties available in all major cities</p>
               </div>
            </motion.div>
          </>
        )}

        {/* DATES MODAL */}
        {activeModal === "dates" && (
           <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModal(null)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-xl bg-white rounded-[3rem] shadow-2xl z-[101] overflow-hidden p-10">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-slate-900">Choose Stay Period</h3>
                  <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} /></button>
               </div>
               <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="p-6 bg-blue-50 border-2 border-blue-600 rounded-2xl"><p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Check-in</p><p className="text-lg font-black text-slate-800">{new Date(checkInDate).toLocaleDateString(undefined, { day:'numeric', month:'long' })}</p></div>
                  <div className="p-6 bg-white border-2 border-slate-50 rounded-2xl"><p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Check-out</p><p className="text-lg font-black text-slate-800">{new Date(checkOutDate).toLocaleDateString(undefined, { day:'numeric', month:'long' })}</p></div>
               </div>
               <div className="bg-slate-50 rounded-[2rem] p-6 mb-8 text-center text-slate-300 border border-slate-100 flex flex-col items-center justify-center gap-4 h-64 border-dashed">
                  <Calendar size={48} />
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest animate-pulse">Interactive Calendar Coming Soon...</p>
               </div>
               <button onClick={() => setActiveModal(null)} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-200">Confirm Dates</button>
            </motion.div>
           </>
        )}

        {/* GUESTS MODAL */}
        {activeModal === "guests" && (
           <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModal(null)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-xl bg-white rounded-[3rem] shadow-2xl z-[101] overflow-hidden p-10">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-black text-slate-900">Guests & Rooms</h3>
                  <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} /></button>
               </div>
               <div className="space-y-8 mb-10">
                  {[
                    { id: 'rooms', label: 'Rooms', desc: 'Max 6 rooms per booking' },
                    { id: 'adults', label: 'Adults', desc: '12+ years old' },
                    { id: 'children', label: 'Children', desc: '0-12 years old' },
                  ].map(type => (
                    <div key={type.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                       <div><p className="font-black text-slate-800">{type.label}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{type.desc}</p></div>
                       <div className="flex items-center gap-6">
                          <button onClick={() => setGuests(p => ({...p, [type.id]: Math.max(type.id === 'children' ? 0 : 1, p[type.id] - 1)}))} className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center font-black text-slate-800">-</button>
                          <span className="text-xl font-black text-slate-900 min-w-[20px] text-center">{guests[type.id]}</span>
                          <button onClick={() => setGuests(p => ({...p, [type.id]: Math.min(type.id === 'rooms' ? 6 : 12, p[type.id] + 1)}))} className="w-9 h-9 rounded-xl bg-blue-600 text-white shadow-lg flex items-center justify-center font-black">+</button>
                       </div>
                    </div>
                  ))}
               </div>
               <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-4 mb-10">
                  <CheckCircle2 className="text-blue-600" size={24} />
                  <div><p className="text-sm font-black text-slate-800 uppercase tracking-tight">Best Rate for {guests.adults} Guests</p><p className="text-[10px] font-bold text-slate-400">Prices are updated based on your guest selection.</p></div>
               </div>
               <button onClick={() => setActiveModal(null)} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-200 text-sm">Apply Guest Details</button>
            </motion.div>
           </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HotelSearchWidget;
