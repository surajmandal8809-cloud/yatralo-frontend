import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { 
  Filter, 
  ChevronDown, 
  Search, 
  Plane, 
  Clock, 
  Zap, 
  Sparkles, 
  Coffee, 
  Compass, 
  ArrowRightLeft, 
  X,
  ChevronRight,
  ShieldCheck,
  Tag,
  Gift,
  MousePointer2,
  Table
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchFlightsQuery, useLazySearchAirportsQuery } from "../../services/flightService";
import FlightCard from "./FlightCard";
import FareModal from "./FareModal";
import AuthModal from "../../components/Auth/AuthModal";

// Dynamic Airport Search Box for the result page
function AirportSearchBox({ label, value, iata, onSelect }) {
  const [showPicker, setShowPicker] = useState(false);
  const [query, setQuery] = useState("");
  const [trigger, { data: searchResults, isFetching }] = useLazySearchAirportsQuery();
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
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{label}</p>
        <div className="flex items-center justify-between">
           <p className="text-sm font-black text-slate-800 truncate">{iata || value}</p>
           <ChevronDown size={14} className="text-slate-400" />
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
                 placeholder="Enter City or Airport code..." 
                 className="bg-transparent text-xs font-bold outline-none w-full text-slate-800" 
               />
            </div>
            <div className="space-y-1 max-h-60 overflow-y-auto no-scrollbar">
              {isFetching ? (
                 <div className="py-4 text-center text-[10px] text-slate-400 uppercase font-black tracking-widest">Scanning Databases...</div>
              ) : searchResults?.data?.length > 0 ? (
                searchResults.data.map(c => (
                  <button 
                    key={c.iata} 
                    onClick={() => { onSelect({ city: c.city, iata: c.iata }); setShowPicker(false); setQuery(""); }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-all text-left"
                  >
                    <span className="text-[10px] font-black bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded min-w-[36px] text-center">{c.iata}</span>
                    <div className="flex-1">
                      <p className="text-[11px] font-bold text-slate-800">{c.city}, {c.country || 'India'}</p>
                      <p className="text-[9px] text-slate-400 truncate">{c.name}</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="py-2 px-2 text-[10px] text-slate-400 font-bold uppercase">Popular: DEL, BOM, BLR, DXB...</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FlightSearchResultsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const today = new Date().toISOString().split("T")[0];

  const [fromData, setFromData] = useState({ iata: searchParams.get("from")?.toUpperCase() || "DEL", city: "New Delhi" });
  const [toData, setToData] = useState({ iata: searchParams.get("to")?.toUpperCase() || "BOM", city: "Mumbai" });
  const [date, setDate] = useState(searchParams.get("date") || today);
  const [pax, setPax] = useState(Number(searchParams.get("pax")) || 1);
  const [fareType, setFareType] = useState('regular'); // regular, student, armed, senior, doctors

  const [searchParamsState, setSearchParamsState] = useState({ from: fromData.iata, to: toData.iata, date });
  const [searched, setSearched] = useState(true);

  const [sortBy, setSortBy] = useState("cheapest"); // cheapest, fastest, preferred
  const [maxPrice, setMaxPrice] = useState(50000);
  const [stops, setStops] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [depTime, setDepTime] = useState([]);
  const [refundableOnly, setRefundableOnly] = useState(false);

  const [selectedFlightForFare, setSelectedFlightForFare] = useState(null);
  const [showFareModal, setShowFareModal] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { data: response, isLoading } = useSearchFlightsQuery(
      searchParamsState,
      { skip: !searched }
  );

  const mappedFlights = useMemo(() => {
    if (!response?.status) return [];
    return (response.data || []).map((flight) => {
        const dep = new Date(flight.departureTime);
        const arr = new Date(flight.arrivalTime);
        const durationMins = Math.round((arr - dep) / 60000);
        const hours = Math.floor(durationMins / 60);
        const mins = durationMins % 60;
        const durationStr = `${hours}h ${mins}m`;

        const hour = dep.getHours();
        let timeBucket = 'night';
        if (hour >= 6 && hour < 12) timeBucket = 'morning';
        else if (hour >= 12 && hour < 18) timeBucket = 'afternoon';
        else if (hour >= 18 && hour < 24) timeBucket = 'evening';

        return {
          ...flight,
          id: flight._id,
          code: flight.flightNumber?.split(' ')[0] || "FL",
          airline: flight.airline,
          flightNo: flight.flightNumber,
          dep: dep.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
          arr: arr.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
          depDate: dep.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
          duration: durationMins,
          durationStr,
          price: flight.price * pax,
          perPax: flight.price,
          timeBucket,
          refundable: Math.random() > 0.5,
          stops: Math.floor(Math.random() * 2) 
        };

      });
  }, [response, pax]);

  const results = useMemo(() => {
    let filtered = mappedFlights.filter(f => f.price <= maxPrice);
    if (stops.length > 0) filtered = filtered.filter(f => stops.includes(f.stops));
    if (airlines.length > 0) filtered = filtered.filter(f => airlines.includes(f.airline));
    if (depTime.length > 0) filtered = filtered.filter(f => depTime.includes(f.timeBucket));
    if (refundableOnly) filtered = filtered.filter(f => f.refundable);

    return filtered.sort((a, b) => {
      if (sortBy === "cheapest") return a.price - b.price;
      if (sortBy === "fastest") return a.durationMins - b.durationMins;
      return 0;
    });
  }, [mappedFlights, sortBy, maxPrice, stops, airlines, depTime, refundableOnly]);

  const handleSearch = useCallback(() => {
    setSearchParamsState({ from: fromData.iata, to: toData.iata, date });
    setSearchParams({ from: fromData.iata, to: toData.iata, date, pax });
    setSearched(true);
  }, [fromData, toData, date, pax, setSearchParams]);

  const handleBookWithFare = (flight, fType) => {
    const priceMultiplier = fType === 'FLEX' ? 1.5 : (fType === 'CLASSIC' ? 1.2 : 1);
    const updatedFlight = { ...flight, price: Math.round(flight.perPax * priceMultiplier * pax), fareType: fType, pax };
    localStorage.setItem("yatralo-selected-flight", JSON.stringify(updatedFlight));
    
    // Generate a professional-looking booking token (MMT style)
    const bookingToken = `${flight.from}-${flight.to}-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
    navigate(`/booking-selection?token=${bookingToken}`);
  };

  const toggleFilter = (list, item, setter) => {
    list.includes(item) ? setter(list.filter(i => i !== item)) : setter([...list, item]);
  };

  const offers = [
    { title: "For Your April Long Weekend", desc: "FLAT 10% OFF* on flights, using MMTCAROUSEL", img: "/images/offers/weekend.png", color: "bg-blue-600" },
    { title: "Flat 10% Instant Discount", desc: "on IDFC FIRST Bank Credit Cards!", img: "/images/offers/bank.png", color: "bg-red-600" },
    { title: "Meet and Greet & Porter Services", desc: "Elevate your travel experience", img: "/images/offers/porter.png", color: "bg-indigo-600" },
  ];

  return (
    <div className="min-h-screen bg-[#f2f2f2] font-sans pb-20">
      
      {/* Sticky Premium Search Bar (MMT Style) */}
      <section className="bg-[#031b34] pt-20 pb-2 px-6 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-1.5 mb-2">
             <div className="flex bg-white/10 p-0.5 rounded-lg">
                <span className="px-3 py-1 text-[10px] text-white font-black uppercase">One Way</span>
             </div>
             <div className="flex bg-white/10 p-1 rounded-lg gap-1 flex-1">
                <AirportSearchBox label="From" value={fromData.city} iata={fromData.iata} onSelect={setFromData} />
                <div className="w-8 flex items-center justify-center"><ArrowRightLeft size={16} className="text-blue-400" /></div>
                <AirportSearchBox label="To" value={toData.city} iata={toData.iata} onSelect={setToData} />
                <div className="relative flex-1 group bg-white border border-slate-200 rounded-lg px-4 py-1.5 hover:border-blue-500 transition-all cursor-pointer flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight leading-none mb-1">Departure</p>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-transparent text-sm font-black text-slate-800 outline-none w-full cursor-pointer" />
                </div>
                <div className="relative flex-1 group bg-white border border-slate-200 rounded-lg px-4 py-1.5 hover:border-blue-500 transition-all cursor-pointer flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight leading-none mb-1">Passengers & Class</p>
                    <p className="text-sm font-black text-slate-800">{pax} Traveller{pax>1?'s':''}, Economy</p>
                </div>
             </div>
             <button onClick={handleSearch} className="bg-[#008cff] hover:bg-[#0070cc] text-white px-10 h-10 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-lg">Search</button>
          </div>

          <div className="flex items-center gap-6 mt-3 px-1 text-[11px] font-bold text-white/70">
             <span className="text-blue-300">Fare type:</span>
             {['Regular', 'Student', 'Armed Forces', 'Senior Citizen', 'Doctor and Nurses'].map(t => (
               <label key={t} className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                  <input type="radio" checked={fareType === t.toLowerCase()} onChange={() => setFareType(t.toLowerCase())} name="fType" className="w-4 h-4 accent-blue-500" />
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
                   <button onClick={() => { setStops([]); setAirlines([]); setDepTime([]); setMaxPrice(50000); }} className="text-[10px] text-blue-500 font-bold hover:underline uppercase">Clear All</button>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                   {stops.includes(0) && <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase border border-blue-100">Non Stop <X size={10} className="cursor-pointer" onClick={() => toggleFilter(stops, 0, setStops)} /></span>}
                </div>

                <div className="space-y-8">
                   <div>
                      <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest mb-4">Popular Filters</p>
                      <div className="space-y-3">
                         {[{v:0, l:"Non Stop"},{v:1, l:"1 Stop"}].map(s => (
                           <label key={s.v} className="flex items-center justify-between group cursor-pointer">
                              <div className="flex items-center gap-3">
                                 <input type="checkbox" checked={stops.includes(s.v)} onChange={() => toggleFilter(stops, s.v, setStops)} className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                                 <span className="text-[12px] font-bold text-slate-600 group-hover:text-blue-600 transition-colors">{s.l}</span>
                              </div>
                              <span className="text-[11px] font-bold text-slate-400 italic">₹ 7,640</span>
                           </label>
                         ))}
                         <label className="flex items-center gap-3 group cursor-pointer">
                             <input type="checkbox" checked={refundableOnly} onChange={() => setRefundableOnly(!refundableOnly)} className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                             <span className="text-[12px] font-bold text-slate-600 group-hover:text-blue-600 transition-colors">Refundable</span>
                         </label>
                      </div>
                   </div>

                   <div>
                      <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest mb-4">One Way Price</p>
                      <input type="range" min="3000" max="50000" step="1000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                      <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-bold">
                         <span>₹ 3,241</span>
                         <span className="text-slate-800">₹ {maxPrice.toLocaleString()}</span>
                      </div>
                   </div>

                   <div>
                      <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest mb-4">Airlines</p>
                      <div className="space-y-3">
                         {["IndiGo", "Air India", "Vistara", "SpiceJet", "Akasa Air"].map(air => (
                           <label key={air} className="flex items-center justify-between group cursor-pointer">
                              <div className="flex items-center gap-3">
                                 <input type="checkbox" checked={airlines.includes(air)} onChange={() => toggleFilter(airlines, air, setAirlines)} className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                                 <span className="text-[12px] font-bold text-slate-600 group-hover:text-blue-600 transition-colors">{air}</span>
                              </div>
                              <span className="text-[11px] font-bold text-slate-400 italic">₹ 7,640</span>
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
                <h2 className="text-xl font-black text-slate-900 tracking-tight italic uppercase">Flights from {fromData.city} to {toData.city}</h2>
             </div>

             {/* Offers Carousel */}
             <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {offers.map((offer, i) => (
                   <div key={i} className="min-w-[340px] flex gap-4 bg-white p-4 rounded-2xl border border-slate-200 group hover:shadow-lg transition-all cursor-pointer">
                      <div className={`w-14 h-14 rounded-full ${offer.color} flex items-center justify-center text-white shadow-xl overflow-hidden`}>
                         <img src={offer.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                      </div>
                      <div className="flex-1">
                         <p className="text-xs font-black text-slate-800 leading-tight mb-1">{offer.title}</p>
                         <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-tighter">{offer.desc}</p>
                      </div>
                      <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 mt-2" />
                   </div>
                ))}
             </div>
             
             {/* Date Ribbon */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex items-center">
                <button className="px-4 text-slate-300 hover:text-blue-500"><ChevronRight className="rotate-180" size={18}/></button>
                <div className="flex-1 flex overflow-x-auto no-scrollbar">
                   {Array.from({ length: 7 }).map((_, i) => {
                     const d = new Date(searchParamsState.date);
                     d.setDate(d.getDate() + i - 1);
                     const active = d.toISOString().split("T")[0] === searchParamsState.date;
                     return (
                       <button
                         key={i}
                         onClick={() => { setDate(d.toISOString().split("T")[0]); handleSearch(); }}
                         className={`flex-1 min-w-[120px] py-4 text-center transition-all border-r border-slate-50 ${active ? 'bg-blue-50 border-b-4 border-b-blue-600' : 'hover:bg-slate-50'}`}
                       >
                          <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                          <p className={`text-[13px] font-black mt-1 ${active ? 'text-blue-600' : 'text-slate-800'}`}>₹{(7640 + i * 150).toLocaleString()}</p>
                       </button>
                     );
                   })}
                </div>
                <button className="px-4 text-slate-300 hover:text-blue-500"><ChevronRight size={18}/></button>
             </div>

             {/* Smart Tabs Sorting */}
             <div className="grid grid-cols-4 gap-4">
                {[
                  { id: 'cheapest', label: 'CHEAPEST', price: '7,640', icon: Zap },
                  { id: 'fastest', label: 'NON STOP FIRST', price: '7,640', icon: Clock },
                  { id: 'preferred', label: 'YOU MAY PREFER', price: '7,640', icon: Sparkles },
                  { id: 'others', label: 'OTHER SORT', price: '', icon: Table },
                ].map(s => {
                  const active = sortBy === s.id;
                  return (
                    <button key={s.id} onClick={() => setSortBy(s.id)} className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${active ? 'bg-blue-50 border-blue-600 shadow-md' : 'bg-white border-slate-100 hover:border-blue-200'}`}>
                       <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${active ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                          <s.icon size={20} />
                       </div>
                       <div>
                          <p className={`text-[9px] font-black uppercase tracking-widest ${active ? 'text-blue-600' : 'text-slate-400'}`}>{s.label}</p>
                          {s.price && <p className={`text-sm font-black ${active ? 'text-slate-900' : 'text-slate-600'}`}>₹ {s.price} <span className="text-[8px] font-bold text-slate-400 ml-1">| 02h 50m</span></p>}
                       </div>
                    </button>
                  );
                })}
             </div>

             <div className="space-y-4">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-40 bg-white rounded-2xl shadow-sm border border-slate-200 animate-pulse" />
                  ))
                ) : results.length > 0 ? (
                  results.map((f) => (
                    <FlightCard key={f.id} flight={f} pax={pax} onViewPrices={(fl) => { setSelectedFlightForFare(fl); setShowFareModal(true); }} />
                  ))
                ) : (
                  <div className="text-center py-32 bg-white rounded-2xl shadow-sm border border-slate-200">
                    <Plane size={64} className="mx-auto mb-6 text-slate-100" />
                    <h3 className="text-2xl font-black text-slate-900 italic uppercase">No Flights Found</h3>
                    <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-[0.2em]">Recalibrate search parameters for node detection.</p>
                  </div>
                )}
             </div>
          </main>
        </div>
      </div>

      <FareModal 
        isOpen={showFareModal} 
        onClose={() => setShowFareModal(false)}
        selectedFlight={selectedFlightForFare}
        onBook={handleBookWithFare}
      />

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onAuthSuccess={() => setIsAuthModalOpen(false)} />
    </div>
  );
}

