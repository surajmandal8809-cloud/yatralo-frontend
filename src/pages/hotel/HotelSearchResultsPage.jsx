import React, { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { 
  Filter, 
  ChevronDown, 
  Search, 
  Hotel, 
  MapPin, 
  Star, 
  X, 
  ChevronRight, 
  Calendar, 
  Users, 
  TrendingUp,
  History,
  ShieldCheck,
  CheckCircle2,
  Waves,
  Coffee,
  Zap,
  Clock,
  Sparkles,
  Table
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchHotelsQuery, useLazyGetCitySuggestionsQuery } from "../../services/hotelService";
import HotelCard from "./HotelCard";

// Inner Search Picker for Results Page
function LocationPicker({ label, value, code, onSelect }) {
  const [showPicker, setShowPicker] = useState(false);
  const [query, setQuery] = useState("");
  const [trigger, { data: searchResults, isFetching }] = useLazyGetCitySuggestionsQuery();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowPicker(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (val) => {
    setQuery(val);
    if (val.length >= 2) trigger(val);
  };

  return (
    <div className="relative group flex-1" ref={dropdownRef}>
      <div 
        onClick={() => setShowPicker(!showPicker)}
        className="bg-white border border-slate-200 rounded-lg px-4 py-1.5 cursor-pointer hover:border-blue-500 transition-all h-full flex flex-col justify-center"
      >
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight leading-none mb-1">{label}</p>
        <div className="flex items-center justify-between">
           <p className="text-sm font-black text-slate-800 truncate">{value}</p>
           <ChevronDown size={14} className="text-slate-400" />
        </div>
      </div>

      <AnimatePresence>
        {showPicker && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-[60] p-4"
          >
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2 mb-4 text-slate-400">
               <Search size={14} />
               <input autoFocus type="text" value={query} onChange={(e) => handleSearch(e.target.value)} placeholder="Search city or area..." className="bg-transparent text-xs font-bold outline-none w-full text-slate-800" />
            </div>
            <div className="space-y-1 max-h-60 overflow-y-auto no-scrollbar">
              {isFetching ? (
                 <div className="py-4 text-center text-[10px] text-slate-400 font-black uppercase animate-pulse">Scanning Locations...</div>
              ) : searchResults?.data?.length > 0 ? (
                searchResults.data.map(loc => (
                  <button key={loc._id || loc.code} onClick={() => { onSelect({city: loc.city, code: loc.code}); setShowPicker(false); setQuery(""); }} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-all text-left">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600"><MapPin size={14} /></div>
                    <div className="flex-1">
                      <p className="text-[11px] font-bold text-slate-800">{loc.city}</p>
                      <p className="text-[9px] text-slate-400 truncate">{loc.state || 'India'}</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="py-2 px-2 text-[10px] text-slate-400 font-bold uppercase">Popular: Delhi, Mumbai, Goa...</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HotelSearchResultsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [location, setLocation] = useState({ city: searchParams.get("city") || "Delhi", code: searchParams.get("city") || "DEL" });
  const [checkin, setCheckin] = useState(searchParams.get("checkin") || new Date().toISOString().split("T")[0]);
  const [checkout, setCheckout] = useState(searchParams.get("checkout") || new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0]);
  const [guests, setGuests] = useState(Number(searchParams.get("adults")) || 2);

  const [activeFilters, setActiveFilters] = useState({ price: 50000, ratings: [], propertyType: [] });
  const [sortBy, setSortBy] = useState("cheapest");

  const { data: response, isLoading } = useSearchHotelsQuery({
    location: location.city,
    checkin,
    checkout,
    guests
  });

  const handleUpdateSearch = () => {
     const params = new URLSearchParams(searchParams);
     params.set("city", location.city);
     params.set("checkin", checkin);
     params.set("checkout", checkout);
     params.set("adults", guests);
     setSearchParams(params);
  };

  const hotels = useMemo(() => {
    if (!response?.data) return [];
    let filtered = response.data;
    
    // Client-side filtering simulation
    filtered = filtered.filter(h => h.price <= activeFilters.price);
    if (activeFilters.ratings.length > 0) filtered = filtered.filter(h => activeFilters.ratings.includes(Math.floor(h.rating)));

    return [...filtered].sort((a,b) => {
       if (sortBy === "cheapest") return a.price - b.price;
       if (sortBy === "rating") return b.rating - a.rating;
       return 0;
    });
  }, [response, activeFilters, sortBy]);

  const toggleFilter = (list, item, setter) => {
    list.includes(item) ? setter(list.filter(i => i !== item)) : setter([...list, item]);
  };

  const handleBookHotel = (hotel) => {
     localStorage.setItem("yatralo-selected-hotel", JSON.stringify(hotel));
     navigate(`/hotels/booking?id=${hotel._id || hotel.id}`, {
        state: { 
           hotel: hotel, 
           checkIn: checkin, 
           checkOut: checkout, 
           pax: guests 
        }
     });
  };

  const offers = [
    { title: "Long Stay Savings", desc: "FLAT 15% OFF on 3+ night stays, using HOTEL15", icon: Sparkles, color: "bg-blue-600" },
    { title: "Bank Discounts", desc: "Up to ₹2000 OFF* via ICICI Bank Cards", icon: ShieldCheck, color: "bg-red-600" },
    { title: "Free Meal Upgrade", desc: "Book select luxury properties", icon: Coffee, color: "bg-emerald-600" },
  ];

  return (
    <div className="min-h-screen bg-[#f2f2f2] font-sans pb-20">
      
      {/* Sticky Premium Search Bar (Flight Style) */}
      <section className="bg-[#031b34] pt-20 pb-2 px-6 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-1.5 mb-2">
             <div className="flex bg-white/10 p-0.5 rounded-lg">
                <span className="px-3 py-1 text-[10px] text-white font-black uppercase">Stays & Villas</span>
             </div>
             <div className="flex bg-white/10 p-1 rounded-lg gap-1 flex-1">
                <LocationPicker label="City/Area" value={location.city} code={location.code} onSelect={setLocation} />
                <div className="relative flex-1 group bg-white border border-slate-200 rounded-lg px-4 py-1.5 hover:border-blue-500 transition-all cursor-pointer flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight leading-none mb-1">Check-in</p>
                    <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className="bg-transparent text-sm font-black text-slate-800 outline-none w-full cursor-pointer" />
                </div>
                <div className="relative flex-1 group bg-white border border-slate-200 rounded-lg px-4 py-1.5 hover:border-blue-500 transition-all cursor-pointer flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight leading-none mb-1">Check-out</p>
                    <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} className="bg-transparent text-sm font-black text-slate-800 outline-none w-full cursor-pointer" />
                </div>
                <div className="relative flex-1 group bg-white border border-slate-200 rounded-lg px-4 py-1.5 hover:border-blue-500 transition-all cursor-pointer flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight leading-none mb-1">Guests & Rooms</p>
                    <p className="text-sm font-black text-slate-800">{guests} Adult{guests>1?'s':''}, 1 Room</p>
                </div>
             </div>
             <button onClick={handleUpdateSearch} className="bg-gradient-to-r from-[#7c3aed] to-[#f97316] hover:saturate-150 text-white px-10 h-10 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95">Update</button>
          </div>

          <div className="flex items-center gap-6 mt-3 px-1 text-[11px] font-bold text-white/70">
             <span className="text-blue-300">Property:</span>
             {['Premium', 'Budget', 'Villa', 'Resort', 'Homestay'].map(t => (
               <label key={t} className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                  <input type="radio" name="pType" className="w-4 h-4 accent-blue-500" />
                  <span>{t}</span>
               </label>
             ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col lg:grid lg:grid-cols-[260px_1fr] gap-6">
          
          {/* Sidebar Filter Panel */}
          <aside className="space-y-4">
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                   <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Applied Filters</h3>
                   <button onClick={() => setActiveFilters({ price: 50000, ratings: [], propertyType: [] })} className="text-[10px] text-blue-500 font-bold hover:underline uppercase">Clear All</button>
                </div>

                <div className="space-y-8">
                   <div>
                      <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest mb-4">Price Per Night</p>
                      <input type="range" min="1000" max="50000" step="500" value={activeFilters.price} onChange={e => setActiveFilters(p => ({...p, price: Number(e.target.value)}))} className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                      <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-bold">
                         <span>₹ 1,000</span>
                         <span className="text-slate-800">₹ {activeFilters.price.toLocaleString()}</span>
                      </div>
                   </div>

                   <div>
                      <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest mb-4">User Rating</p>
                      <div className="space-y-3">
                         {[4, 3, 2].map(r => (
                           <label key={r} className="flex items-center justify-between group cursor-pointer">
                              <div className="flex items-center gap-3">
                                 <input type="checkbox" checked={activeFilters.ratings.includes(r)} onChange={() => setActiveFilters(prev => ({...prev, ratings: prev.ratings.includes(r) ? prev.ratings.filter(i => i !== r) : [...prev.ratings, r]}))} className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                                 <span className="text-[12px] font-bold text-slate-600 group-hover:text-blue-600 transition-colors">{r}+ Stars (Good)</span>
                              </div>
                              <span className="text-[11px] font-bold text-slate-400 italic">240+</span>
                           </label>
                         ))}
                      </div>
                   </div>

                   <div>
                      <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest mb-4">Popular Amenities</p>
                      <div className="space-y-3">
                         {["Breakfast Included", "Free WiFi", "Swimming Pool", "Spa", "Gym"].map(am => (
                           <label key={am} className="flex items-center gap-3 group cursor-pointer">
                               <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                               <span className="text-[12px] font-bold text-slate-600 group-hover:text-blue-600 transition-colors">{am}</span>
                           </label>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </aside>

          {/* Results Area */}
          <main className="space-y-4">
             <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black text-slate-900 tracking-tight italic uppercase">Properties in {location.city}</h2>
             </div>

             {/* Offers Carousel */}
             <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {offers.map((offer, i) => (
                   <div key={i} className="min-w-[340px] flex gap-4 bg-white p-4 rounded-2xl border border-slate-200 group hover:shadow-lg transition-all cursor-pointer">
                      <div className={`w-14 h-14 rounded-full ${offer.color} flex items-center justify-center text-white shadow-xl overflow-hidden`}>
                         <offer.icon size={28} className="group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1">
                         <p className="text-sm font-black text-slate-800 leading-tight mb-1">{offer.title}</p>
                         <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest">{offer.desc}</p>
                      </div>
                      <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 mt-2" />
                   </div>
                ))}
             </div>
             
             {/* Date/Rate Ribbon */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex items-center">
                <button className="px-4 text-slate-300 hover:text-blue-500"><ChevronRight className="rotate-180" size={18}/></button>
                <div className="flex-1 flex overflow-x-auto no-scrollbar">
                   {Array.from({ length: 7 }).map((_, i) => {
                     const d = new Date(checkin);
                     d.setDate(d.getDate() + i - 1);
                     const active = d.toISOString().split("T")[0] === checkin;
                     return (
                       <button
                         key={i}
                         onClick={() => { setCheckin(d.toISOString().split("T")[0]); handleUpdateSearch(); }}
                         className={`flex-1 min-w-[120px] py-4 text-center transition-all border-r border-slate-50 ${active ? 'bg-orange-50 border-b-4 border-b-orange-500' : 'hover:bg-slate-50'}`}
                       >
                          <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none">{d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                          <p className={`text-[13px] font-black mt-1 ${active ? 'text-orange-600' : 'text-slate-800'}`}>₹{(6500 + i * 200).toLocaleString()}</p>
                       </button>
                     );
                   })}
                 </div>
                <button className="px-4 text-slate-300 hover:text-blue-500"><ChevronRight size={18}/></button>
             </div>

             {/* Smart Tabs Sorting */}
             <div className="grid grid-cols-4 gap-4">
                {[
                  { id: 'cheapest', label: 'CHEAPEST', price: '2,999', icon: Zap },
                  { id: 'rating', label: 'TOP RATED', price: '4.8', icon: Star },
                  { id: 'preferred', label: 'PREFERED BY YOU', price: '5,500', icon: Sparkles },
                  { id: 'all', label: 'VIEW ALL', price: '', icon: Table },
                ].map(s => {
                  const active = sortBy === s.id;
                  return (
                    <button key={s.id} onClick={() => setSortBy(s.id)} className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${active ? 'bg-orange-50 border-orange-500 shadow-md' : 'bg-white border-slate-100 hover:border-orange-200'}`}>
                       <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${active ? 'bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white' : 'bg-slate-100 text-slate-400'}`}>
                          <s.icon size={20} />
                       </div>
                       <div>
                          <p className={`text-[9px] font-black uppercase tracking-widest ${active ? 'text-[#7c3aed]' : 'text-slate-400'}`}>{s.label}</p>
                          {s.price && <p className={`text-sm font-black ${active ? 'text-slate-900' : 'text-slate-600'}`}>{s.id === 'rating' ? '' : '₹'} {s.price} <span className="text-[8px] font-bold text-slate-400 ml-1">avg/night</span></p>}
                       </div>
                    </button>
                  );
                })}
             </div>

             <div className="space-y-4">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-64 bg-white rounded-2xl animate-pulse shadow-sm border border-slate-200" />
                  ))
                ) : hotels.length > 0 ? (
                  hotels.map((h, i) => (
                    <HotelCard 
                      key={h._id || i} 
                      hotel={h} 
                      index={i} 
                      onBook={handleBookHotel} 
                    />
                  ))
                ) : (
                  <div className="text-center py-32 bg-white rounded-2xl shadow-sm border border-slate-200">
                    <Hotel size={64} className="mx-auto mb-6 text-slate-100" />
                    <h3 className="text-2xl font-black text-slate-900 italic uppercase">No Stays Found</h3>
                    <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-[0.2em]">Adjust filters to discover more properties.</p>
                  </div>
                )}
             </div>
          </main>
        </div>
      </div>
    </div>
  );
}
