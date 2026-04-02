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
  ShieldCheck,
  Coffee,
  Zap,
  Sparkles,
  Table,
  Globe,
  Tag,
  ThumbsUp,
  Award,
  Heart,
  Eye
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchHotelsQuery, useLazyGetCitySuggestionsQuery } from "../../services/hotelService";
import HotelCard from "./HotelCard";

// Top Search Bar Field Component (White Box Style)
const SearchField = ({ label, value, subtext, onClick, icon: Icon }) => (
  <div 
    onClick={onClick} 
    className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-1.5 cursor-pointer hover:border-blue-500 transition-all flex flex-col justify-center h-14"
  >
    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-0.5 leading-none">{label}</p>
    <div className="flex items-center gap-2 mt-0.5">
      <Icon size={14} className="text-slate-400 shrink-0" />
      <p className="text-sm font-black text-slate-800 truncate leading-none">{value}</p>
    </div>
    {subtext && <p className="text-[10px] font-bold text-slate-400 mt-1 leading-none italic">{subtext}</p>}
  </div>
);

export default function HotelSearchResultsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'location', 'guests'

  const [location, setLocation] = useState({ 
    city: searchParams.get("city") || searchParams.get("location") || "Goa", 
    code: searchParams.get("cityCode") || "GOI" 
  });
  const [checkin, setCheckin] = useState(searchParams.get("checkInDate") || new Date().toISOString().split("T")[0]);
  const [checkout, setCheckout] = useState(searchParams.get("checkOutDate") || new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0]);
  const [guests, setGuests] = useState(Number(searchParams.get("guests") || 2));
  const [locationQuery, setLocationQuery] = useState("");

  const [trigger, { data: suggestions, isFetching }] = useLazyGetCitySuggestionsQuery();

  const [activeFilters, setActiveFilters] = useState({ price: [1000, 50000], starCategory: [], userRating: [], propertyType: [] });
  const [sortBy, setSortBy] = useState("Popular");

  const queryParams = useMemo(() => ({
    location: location.code,
    checkin,
    checkout,
    guests
  }), [location.code, checkin, checkout, guests]);

  const { data: response, isLoading, isError } = useSearchHotelsQuery(queryParams);

  useEffect(() => {
    if (locationQuery.length >= 2) trigger(locationQuery);
  }, [locationQuery, trigger]);

  const handleUpdateSearch = () => {
     setActiveModal(null);
     const params = new URLSearchParams();
     params.set("city", location.city);
     params.set("cityCode", location.code);
     params.set("checkInDate", checkin);
     params.set("checkOutDate", checkout);
     params.set("guests", guests.toString());
     setSearchParams(params);
  };

  const results = useMemo(() => {
    if (!response?.data) return [];
    let filtered = response.data;
    // Apply dummy filters for UI
    if (activeFilters.starCategory.length > 0) filtered = filtered.filter(h => activeFilters.starCategory.includes(Math.floor(h.rating)));
    return filtered;
  }, [response, activeFilters]);

  const handleBookHotel = (hotel) => {
    localStorage.setItem("yatralo-selected-hotel", JSON.stringify(hotel));
    navigate(`/hotels/booking?id=${hotel.id}&city=${location.city}&cityCode=${location.code}&checkInDate=${checkin}&checkOutDate=${checkout}&guests=${guests}`, {
       state: { hotel, checkIn: checkin, checkOut: checkout, pax: guests }
    });
  };

  const collections = [
    { name: "Beach Paradise", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80", desc: "For the beach lovers" },
    { name: "Luxury Retreats", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=150&q=80", desc: "Indulge in grandeur" },
    { name: "Party Central", img: "https://images.unsplash.com/photo-1566417713940-fe7c737d9ef2?auto=format&fit=crop&w=150&q=80", desc: "Nightlife at its best" },
    { name: "Private Pool Villas", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=150&q=80", desc: "Secluded sanctuary" },
    { name: "Family Fun Stays", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=150&q=80", desc: "Perfect for everyone" }
  ];

  return (
    <div className="min-h-screen bg-[#f2f2f2] font-sans pb-20">
      
      {/* Sticky Premium Search Bar (Dark Theme like Flight Page) */}
      <section className="bg-[#031b34] pt-16 md:pt-20 pb-4 px-4 md:px-6 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center gap-1.5 mb-2 relative">
             <div className="flex bg-white/10 p-0.5 rounded-lg text-white/40 group shrink-0">
                <Hotel size={12} className="ml-1 text-blue-400" />
                <span className="px-2 py-1 text-[10px] font-black uppercase whitespace-nowrap text-white">Stays & Villas</span>
             </div>
             
             <div className="flex bg-white/10 p-1 rounded-lg gap-1 flex-1 overflow-visible">
                <SearchField label="City / Area" value={location.city} icon={MapPin} onClick={() => setActiveModal('location')} />
                
                <div className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-1.5 cursor-pointer hover:border-blue-500 transition-all flex flex-col justify-center h-14 relative group">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-0.5 leading-none italic">Check-in</p>
                    <div className="flex items-center gap-2 mt-0.5">
                       <Calendar size={14} className="text-slate-400 shrink-0" />
                       <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className="bg-transparent text-sm font-black text-slate-800 outline-none w-full cursor-pointer" />
                    </div>
                </div>

                <div className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-1.5 cursor-pointer hover:border-blue-500 transition-all flex flex-col justify-center h-14 relative group">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-0.5 leading-none italic">Check-out</p>
                    <div className="flex items-center gap-2 mt-0.5">
                       <Calendar size={14} className="text-slate-400 shrink-0" />
                       <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} className="bg-transparent text-sm font-black text-slate-800 outline-none w-full cursor-pointer" />
                    </div>
                </div>

                <SearchField label="Rooms & Guests" value={`${guests} Adults`} icon={Users} onClick={() => setActiveModal('guests')} />

                {/* Interactive Modals */}
                <AnimatePresence>
                   {activeModal === 'location' && (
                     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-[130px] mt-2 w-[400px] bg-white rounded-2xl shadow-2xl border border-slate-200 z-[110] p-6">
                        <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 mb-6 border border-slate-100 group focus-within:border-blue-500 transition-all">
                           <Search size={18} className="text-slate-400" />
                           <input 
                             autoFocus 
                             className="bg-transparent outline-none text-sm font-bold text-slate-800 w-full placeholder:text-slate-400" 
                             placeholder="Where are you going?"
                             value={locationQuery}
                             onChange={(e) => setLocationQuery(e.target.value)}
                           />
                        </div>
                        <div className="space-y-1 max-h-[300px] overflow-y-auto no-scrollbar">
                           {isFetching ? (
                              <div className="py-8 text-center text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Searching cities...</div>
                           ) : suggestions?.data?.length > 0 ? (
                              suggestions.data.map((l, i) => (
                                 <button key={i} onClick={() => { setLocation({city: l.city, code: l.iataCode}); setActiveModal(null); }} className="w-full flex items-center gap-4 p-3.5 rounded-xl hover:bg-blue-50 transition-all text-left group">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                       <MapPin size={20} />
                                    </div>
                                    <div>
                                       <p className="text-sm font-black text-slate-900 leading-none">{l.city}</p>
                                       <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{l.country || "India"}</p>
                                    </div>
                                 </button>
                              ))
                           ) : (
                             <div className="py-4 px-2 space-y-4">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Popular Cities</p>
                                {["Goa", "Mumbai", "Delhi", "Bangalore", "Jaipur"].map(c => (
                                  <button key={c} onClick={() => setLocationQuery(c)} className="w-full flex items-center gap-4 p-2 rounded-lg hover:bg-slate-50 text-left">
                                     <MapPin size={14} className="text-slate-300" />
                                     <span className="text-sm font-bold text-slate-700">{c}</span>
                                  </button>
                                ))}
                             </div>
                           )}
                        </div>
                     </motion.div>
                   )}

                   {activeModal === 'guests' && (
                     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full right-[150px] mt-2 w-[320px] bg-white rounded-2xl shadow-2xl border border-slate-200 z-[110] p-6">
                        <div className="flex items-center justify-between mb-6">
                           <div className="flex flex-col">
                              <p className="text-sm font-black text-slate-900 leading-none">Adults</p>
                              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight">Ages 12+</p>
                           </div>
                           <div className="flex items-center gap-4">
                              <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 hover:bg-blue-500 hover:text-white transition-all">-</button>
                              <span className="text-sm font-black w-4 text-center">{guests}</span>
                              <button onClick={() => setGuests(guests + 1)} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 hover:bg-blue-500 hover:text-white transition-all">+</button>
                           </div>
                        </div>
                        <button onClick={() => setActiveModal(null)} className="w-full py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-colors">Apply Selection</button>
                     </motion.div>
                   )}
                </AnimatePresence>
             </div>
             
             <button onClick={handleUpdateSearch} className="bg-gradient-to-r from-[#7c3aed] to-[#f97316] hover:saturate-150 text-white px-10 h-14 rounded-lg font-black text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95 shrink-0 ml-1">Update</button>
          </div>

          <div className="flex items-center gap-6 mt-3 px-1 text-[11px] font-bold text-white/70">
            <span className="text-blue-300 uppercase tracking-widest text-[9px] font-black">Trending Filters:</span>
            {['Free Cancellation', 'Breakfast Included', 'Couple Friendly', '5 Star', 'Villas'].map(f => (
              <button key={f} className="hover:text-white transition-colors">{f}</button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        {/* Breadcrumbs & Location Info */}
        <div className="flex items-center gap-2 mb-4">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Home / {location.city} / Hotels in {location.city}</p>
        </div>

        <div className="flex items-baseline justify-between mb-6">
           <h1 className="text-2xl font-black text-slate-900 tracking-tight">{results.length} Properties in {location.city}</h1>
           <div className="flex items-center gap-6">
              <span className="text-xs font-black text-blue-600 cursor-pointer flex items-center gap-1"><Map size={14} /> Explore Travel Tips</span>
           </div>
        </div>

        {/* Sorting Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 flex items-center px-6">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mr-8">Sort By:</span>
           {["Popular", "Price (Low to High)", "User Rating", "Price (High to Low)"].map((s) => (
             <button 
               key={s} 
               onClick={() => setSortBy(s)}
               className={`py-5 px-6 text-[11px] font-black uppercase tracking-widest relative transition-colors ${sortBy === s ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}`}
             >
               {s}
               {sortBy === s && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />}
             </button>
           ))}
        </div>

        <div className="flex gap-6">
          {/* Detailed Sidebar Filters */}
          <aside className="w-72 shrink-0 space-y-6">
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Select Filters</h3>
                   <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest" onClick={() => setActiveFilters({ price: [1000, 50000], starCategory: [], userRating: [], propertyType: [] })}>Clear All</button>
                </div>

                <div className="space-y-8">
                   {/* Suggested For You */}
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Suggested For You</p>
                      <div className="space-y-3">
                         {["Free Breakfast", "Swimming Pool", "Beachfront", "Free Cancellation"].map(f => (
                           <label key={f} className="flex items-center gap-3 cursor-pointer group">
                             <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                             <span className="text-xs font-bold text-slate-600 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{f}</span>
                           </label>
                         ))}
                      </div>
                   </div>

                   {/* Price Filter */}
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Price Per Night</p>
                      <div className="space-y-3">
                        {["₹ 0 - ₹ 2000", "₹ 2001 - ₹ 4000", "₹ 4001 - ₹ 6500", "₹ 6501 - ₹ 9500"].map(p => (
                          <label key={p} className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-3">
                              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                              <span className="text-xs font-bold text-slate-600 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{p}</span>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400">(45)</span>
                          </label>
                        ))}
                      </div>
                   </div>

                   {/* User Rating */}
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">User Rating</p>
                      <div className="space-y-3">
                         {["Excellent (4.5+)", "Very Good (4+)", "Good (3.5+)"].map(r => (
                           <label key={r} className="flex items-center gap-3 cursor-pointer group">
                             <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                             <span className="text-xs font-bold text-slate-600 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{r}</span>
                           </label>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </aside>

          {/* Main Results Listing */}
          <main className="flex-1 space-y-6">
             <p className="text-xl font-black text-slate-900 tracking-tight mb-2">Showing Properties In {location.city}</p>
             
             {/* Result Cards & Specialized Sections Interaction */}
             <div className="space-y-6">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-64 bg-white rounded-2xl animate-pulse shadow-sm border border-slate-200" />
                  ))
                ) : results.length > 0 ? (
                  <>
                    <HotelCard hotel={results[0]} index={0} onBook={handleBookHotel} />
                    
                    {/* Rush Deals Section */}
                    <div className="bg-white rounded-xl shadow-sm border-2 border-orange-100 p-6">
                       <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600"><Zap size={20} /></div>
                            <div>
                               <h3 className="text-lg font-black text-slate-900 leading-none">Rush Deals</h3>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Exclusive limited time offers</p>
                            </div>
                          </div>
                          <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-4 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">View All Deals</button>
                       </div>
                       <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                          {results.slice(1, 4).map((h, i) => (
                            <div key={i} className="min-w-[280px] bg-slate-50 rounded-xl overflow-hidden border border-slate-100 group cursor-pointer hover:shadow-lg transition-all">
                               <div className="h-32 relative">
                                  <img src={h.images?.[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                  <div className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white text-[9px] font-black rounded-lg">SALE</div>
                               </div>
                               <div className="p-3">
                                  <h4 className="font-black text-slate-800 text-sm truncate">{h.name}</h4>
                                  <div className="flex items-center justify-between mt-2">
                                     <span className="text-[10px] font-bold text-slate-400 capitalize">{h.city}</span>
                                     <div className="text-right">
                                        <p className="text-xs font-black text-slate-900">₹{h.price}</p>
                                        <p className="text-[8px] font-bold text-slate-400">per night</p>
                                     </div>
                                  </div>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>

                    <HotelCard hotel={results[1]} index={1} onBook={handleBookHotel} />
                    
                    {/* Collections Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                       <div className="flex items-center justify-center gap-4 mb-8">
                          <div className="h-px bg-slate-200 flex-1" />
                          <h3 className="text-sm font-black text-slate-950 uppercase tracking-[0.3em] flex items-center gap-3"><Sparkles size={16} className="text-orange-500" /> Collections <Sparkles size={16} className="text-orange-500" /></h3>
                          <div className="h-px bg-slate-200 flex-1" />
                       </div>
                       <div className="flex justify-between gap-4">
                          {collections.map(c => (
                            <div key={c.name} className="flex flex-col items-center text-center group cursor-pointer">
                               <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg mb-3 group-hover:scale-110 group-hover:border-blue-500 transition-all duration-300">
                                  <img src={c.img} alt="" className="w-full h-full object-cover" />
                               </div>
                               <p className="text-[11px] font-black text-slate-800 mb-1 leading-none">{c.name}</p>
                               <p className="text-[9px] font-bold text-slate-400 max-w-[100px] leading-tight">{c.desc}</p>
                            </div>
                          ))}
                       </div>
                    </div>

                    {results.slice(2).map((h, i) => (
                      <HotelCard key={h.id} hotel={h} index={i + 2} onBook={handleBookHotel} />
                    ))}
                  </>
                ) : (
                  <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-200">
                     <Hotel size={48} className="mx-auto mb-4 text-slate-200" />
                     <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">No Properties Found</h3>
                     <p className="text-xs font-bold text-slate-400 mt-2">Try adjusting your filters or search criteria</p>
                  </div>
                )}
             </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// Reuse Map icon from Lucide
const Map = ({ size = 20 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M14.106 5.553a2 2 0 0 0 1.788 0l2.211-1.106a2 2 0 0 1 1.789 0V17.5a2 2 0 0 1-1.105 1.79l-2.895 1.447a2 2 0 0 1-1.788 0l-4.422-2.21a2 2 0 0 0-1.788 0l-2.895 1.447A2 2 0 0 1 3 17.5V5.5a2 2 0 0 1 1.105-1.79l2.895-1.447a2 2 0 0 1 1.788 0l4.422 2.21Z"/>
    <path d="M15 5.5v15"/><path d="M9 3v15"/>
  </svg>
);
