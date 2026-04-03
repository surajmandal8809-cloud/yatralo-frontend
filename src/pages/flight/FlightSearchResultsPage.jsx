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
  Table,
  Calendar,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchFlightsQuery, useLazySearchAirportsQuery } from "../../services/flightService";
import FlightCard from "./FlightCard";
import FareModal from "./FareModal";
import AuthModal from "../../components/Auth/AuthModal";
import Loader from "../../components/Loader/Loader";

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
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const [fromData, setFromData] = useState({ iata: searchParams.get("from")?.toUpperCase() || "DEL", city: "New Delhi" });
  const [toData, setToData] = useState({ iata: searchParams.get("to")?.toUpperCase() || "BOM", city: "Mumbai" });
  const [date, setDate] = useState(searchParams.get("date") || today);
  const [pax, setPax] = useState(Number(searchParams.get("pax")) || 1);
  const [fareType, setFareType] = useState('regular'); 

  const [searchParamsState, setSearchParamsState] = useState({ from: fromData.iata, to: toData.iata, date });
  const [searched, setSearched] = useState(true);

  const [sortBy, setSortBy] = useState("cheapest"); 
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

  // Sync URL params to local state for in-page updates and browser navigation
  useEffect(() => {
    const f = searchParams.get("from") || "DEL";
    const t = searchParams.get("to") || "BOM";
    const d = searchParams.get("date") || today;
    const p = Number(searchParams.get("pax")) || 1;

    setFromData({ city: f, iata: f });
    setToData({ city: t, iata: t });
    setDate(d);
    setPax(p);
    setSearchParamsState({ from: f, to: t, date: d });
    setSearched(true);
   }, [searchParams, today]);

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
    setShowMobileSearch(false);
  }, [fromData, toData, date, pax, setSearchParams]);

  const handleBookWithFare = (flight, fType) => {
    const priceMultiplier = fType === 'FLEX' ? 1.5 : (fType === 'CLASSIC' ? 1.2 : 1);
    const updatedFlight = { ...flight, price: Math.round(flight.perPax * priceMultiplier * pax), fareType: fType, pax };
    localStorage.setItem("yatralo-selected-flight", JSON.stringify(updatedFlight));
    
    // Using origin/destination from the flight object (backend standard)
    const fromCode = flight.origin || fromData.iata || "DEL";
    const toCode = flight.destination || toData.iata || "BOM";
    const bookingToken = `${fromCode}-${toCode}-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
    
    navigate(`/booking-selection?token=${bookingToken}&from=${fromCode}&to=${toCode}&date=${date}&pax=${pax}`);
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
    <div className="min-h-screen bg-[#f2f2f2] font-sans pb-20 pt-16">
      
      {/* Sticky Premium Search Bar (White Style matching Hotel) */}
      <section className="bg-white py-3 px-4 md:px-6 sticky top-14 md:top-16 z-40 shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Search Bar */}
          <div className="hidden md:block">
            <div className="flex items-center gap-1.5 overflow-visible">
              <div className="flex bg-slate-100/50 p-1 rounded-xl gap-1.5 flex-1 items-center">
                  <div className="min-w-[100px] h-[54px] bg-white border border-slate-200 rounded-lg px-4 flex flex-col justify-center shrink-0">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight leading-none mb-1.5">Trip Type</p>
                      <p className="text-sm font-black text-slate-900 leading-none">ONE WAY</p>
                  </div>

                  <AirportSearchBox label="From" value={fromData.city} iata={fromData.iata} onSelect={setFromData} />
                  <div className="w-8 flex items-center justify-center shrink-0 bg-white h-[54px] rounded-lg border border-slate-200 -mx-1.5 z-10 hover:border-blue-400 transition-colors cursor-pointer group">
                      <ArrowRightLeft size={16} className="text-slate-400 group-hover:text-blue-500" />
                  </div>
                  <AirportSearchBox label="To" value={toData.city} iata={toData.iata} onSelect={setToData} />

                  <div className="relative flex-1 group bg-white border border-slate-200 rounded-lg px-4 flex flex-col justify-center h-[54px] hover:border-blue-400 hover:bg-slate-50/50 transition-all cursor-pointer">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight leading-none mb-1.5">Departure Date</p>
                      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-transparent text-sm font-black text-slate-900 outline-none w-full cursor-pointer uppercase" />
                  </div>

                  <div className="relative flex-1 group bg-white border border-slate-200 rounded-lg px-4 flex flex-col justify-center h-[54px] hover:border-blue-400 hover:bg-slate-50/50 transition-all cursor-pointer">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight leading-none mb-1.5">Travellers & Class</p>
                      <div className="flex items-center justify-between">
                         <p className="text-sm font-black text-slate-900 leading-none truncate">{pax} Traveller{pax>1?'s':''}, Economy</p>
                         <ChevronDown size={12} className="text-slate-400" />
                      </div>
                  </div>
              </div>
              
              <button type="button" onClick={handleSearch} className="h-[54px] px-10 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-black text-sm rounded-lg shadow-lg shadow-blue-200/50 transition-all uppercase tracking-widest ml-1 active:scale-95">Search</button>
            </div>

            <div className="flex items-center gap-6 mt-3 px-2 text-[11px] font-bold text-slate-500">
              <span className="text-blue-600 uppercase tracking-widest font-black">Fare type:</span>
              {['Regular', 'Student', 'Armed Forces', 'Senior Citizen', 'Doctor and Nurses'].map(t => (
                <label key={t} className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors uppercase">
                    <input type="radio" checked={fareType === t.toLowerCase()} onChange={() => setFareType(t.toLowerCase())} name="fType" className="w-3.5 h-3.5 accent-blue-600 border-slate-300" />
                    <span>{t}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Mobile Search Summary */}
          <div className="md:hidden flex items-center justify-between bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur-md" onClick={() => setShowMobileSearch(true)}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                <Plane size={20} className="rotate-45" />
              </div>
              <div>
                <p className="text-sm font-black text-white leading-none tracking-tight">{fromData.iata} → {toData.iata}</p>
                <p className="text-[11.5px] font-bold text-white/60 mt-1 uppercase tracking-wider">
                  {new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })} • {pax} Soul{pax>1?'s':''} 
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
      
      {/* Premium Loader Overlay */}


      {/* Mobile Search Edit Drawer */}
      <AnimatePresence>
        {showMobileSearch && (
          <div className="fixed inset-0 z-[60] flex flex-col md:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowMobileSearch(false)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="relative mt-auto bg-white rounded-t-[2.5rem] p-6 max-h-[95vh] overflow-y-auto">
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6" />
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">Modify Search</h3>
                <button onClick={() => setShowMobileSearch(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-900"><X size={20}/></button>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                     <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-1">Origin Point</p>
                     <AirportSearchBox label="From" value={fromData.city} iata={fromData.iata} onSelect={setFromData} />
                  </div>
                  <div className="flex justify-center -my-2 relative z-10">
                     <div className="w-10 h-10 bg-white border border-slate-200 rounded-full shadow-md flex items-center justify-center text-blue-600 rotate-90">
                        <ArrowRightLeft size={16} />
                     </div>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-1">Destination Target</p>
                     <AirportSearchBox label="To" value={toData.city} iata={toData.iata} onSelect={setToData} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Calendar size={12}/> Departure</p>
                      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-transparent text-sm font-black text-slate-900 outline-none w-full" />
                   </div>
                   <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Users size={12}/> Travelers</p>
                      <div className="flex items-center justify-between">
                         <button onClick={() => setPax(Math.max(1, pax-1))} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-900 text-xs font-black">-</button>
                         <span className="text-sm font-black">{pax}</span>
                         <button onClick={() => setPax(pax+1)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-900 text-xs font-black">+</button>
                      </div>
                   </div>
                </div>

                <div className="pt-4">
                   <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-3">Fare Category</p>
                   <div className="flex flex-wrap gap-2">
                      {["Regular", "Student", "Armed Forces", "Senior", "HealthCare"].map(f => (
                         <button key={f} onClick={() => setFareType(f.toLowerCase())} className={`px-4 py-2 rounded-xl text-[12px] font-black uppercase tracking-widest border transition-all ${fareType === f.toLowerCase() ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                            {f}
                         </button>
                      ))}
                   </div>
                </div>

                <button onClick={handleSearch} className="w-full h-16 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-[1.5rem] text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-violet-100 mt-4">Initiate Search</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-4">
        <div className="flex flex-col lg:grid lg:grid-cols-[260px_1fr] gap-6">
          
          {/* Sidebar Filter Panel - Desktop Only */}
          <aside className="hidden lg:block space-y-4">
              <FlightFilterPanel 
                 stops={stops} setStops={setStops} 
                 airlines={airlines} setAirlines={setAirlines}
                 maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                 refundableOnly={refundableOnly} setRefundableOnly={setRefundableOnly}
                 toggleFilter={toggleFilter}
              />
          </aside>

          {/* Results Area */}
          <main className="space-y-4">
             <div className="flex items-center justify-between mb-2">
                <h2 className="text-base md:text-xl font-black text-slate-900 tracking-tight italic uppercase">Flights: {fromData.iata} → {toData.iata}</h2>
                <button onClick={() => setShowFilters(true)} className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 text-[12px] font-black uppercase tracking-widest text-[#7c3aed] shadow-sm">
                  <Filter size={14} /> Refine
                </button>
             </div>

             {/* Offers Carousel */}
             <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 md:mx-0 md:px-0">
                {offers.map((offer, i) => (
                   <div key={i} className="min-w-[300px] md:min-w-[340px] flex gap-4 bg-white p-4 rounded-2xl border border-slate-200 group hover:shadow-lg transition-all cursor-pointer">
                      <div className={`w-14 h-14 rounded-full ${offer.color} flex items-center justify-center text-white shadow-xl overflow-hidden shrink-0`}>
                         <img src={offer.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                      </div>
                      <div className="flex-1">
                         <p className="text-xs font-black text-slate-800 leading-tight mb-1">{offer.title}</p>
                         <p className="text-[11px] font-bold text-slate-400 leading-relaxed uppercase tracking-tighter">{offer.desc}</p>
                      </div>
                      <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 mt-2 shrink-0" />
                   </div>
                ))}
             </div>
             
             {/* Date Ribbon */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex items-center">
                <button className="px-2 md:px-4 text-slate-300 hover:text-blue-500"><ChevronRight className="rotate-180" size={18}/></button>
                <div className="flex-1 flex overflow-x-auto no-scrollbar">
                   {Array.from({ length: 7 }).map((_, i) => {
                     const d = new Date(searchParamsState.date);
                     d.setDate(d.getDate() + i - 1);
                     const active = d.toISOString().split("T")[0] === searchParamsState.date;
                     return (
                       <button
                         key={i}
                         onClick={() => { setDate(d.toISOString().split("T")[0]); handleSearch(); }}
                         className={`flex-1 min-w-[100px] md:min-w-[120px] py-3 md:py-4 text-center transition-all border-r border-slate-50 ${active ? 'bg-blue-50 border-b-4 border-b-blue-600' : 'hover:bg-slate-50'}`}
                       >
                          <p className="text-[10.5px] md:text-[11.5px] text-slate-500 font-black uppercase tracking-widest">{d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                          <p className={`text-[11px] md:text-[13px] font-black mt-1 ${active ? 'text-blue-600' : 'text-slate-800'}`}>₹{(7640 + i * 150).toLocaleString()}</p>
                       </button>
                     );
                   })}
                </div>
                <button className="px-2 md:px-4 text-slate-300 hover:text-blue-500"><ChevronRight size={18}/></button>
             </div>

             {/* Smart Tabs Sorting */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                {[
                  { id: 'cheapest', label: 'CHEAPEST', price: '7,640', icon: Zap },
                  { id: 'fastest', label: 'NON STOP', price: '7,640', icon: Clock },
                  { id: 'preferred', label: 'PREFERRED', price: '7,640', icon: Sparkles },
                  { id: 'others', label: 'SORT', price: '', icon: Table },
                ].map(s => {
                  const active = sortBy === s.id;
                  return (
                    <button key={s.id} onClick={() => setSortBy(s.id)} className={`flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl border-2 transition-all text-left ${active ? 'bg-orange-50 border-orange-500 shadow-md md:shadow-lg' : 'bg-white border-slate-100 hover:border-orange-200'}`}>
                       <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0 ${active ? 'bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                          <s.icon size={s.id === 'others' ? 16 : 18} />
                       </div>
                       <div className="truncate">
                          <p className={`text-[8px] md:text-[9px] font-black uppercase tracking-widest ${active ? 'text-[#7c3aed]' : 'text-slate-400'}`}>{s.label}</p>
                          {s.price && <p className={`text-[10px] md:text-sm font-black ${active ? 'text-slate-900' : 'text-slate-600'}`}>₹ {s.price}</p>}
                       </div>
                    </button>
                  );
                })}
             </div>

             {/* Results List */}
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
                  <div className="text-center py-24 md:py-32 bg-white rounded-2xl shadow-sm border border-slate-200 px-6">
                    <Plane size={64} className="mx-auto mb-6 text-slate-100" />
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 italic uppercase">No Flights Found</h3>
                    <p className="text-[10px] md:text-xs font-bold text-slate-400 mt-2 uppercase tracking-[0.2em]">Adjust parameters to reset the flight core matrix.</p>
                  </div>
                )}
             </div>
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {showFilters && (
          <div className="fixed inset-0 z-[60] flex flex-col md:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFilters(false)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="relative mt-auto bg-white rounded-t-[2.5rem] p-6 pb-12 max-h-[90vh] overflow-y-auto">
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6" />
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">Refine Flights</h3>
                <button onClick={() => setShowFilters(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100"><X size={20}/></button>
              </div>
              <FlightFilterPanel 
                 stops={stops} setStops={setStops} 
                 airlines={airlines} setAirlines={setAirlines}
                 maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                 refundableOnly={refundableOnly} setRefundableOnly={setRefundableOnly}
                 toggleFilter={toggleFilter}
              />
              <button onClick={() => setShowFilters(false)} className="w-full h-16 bg-slate-900 text-white rounded-2xl text-sm font-black uppercase tracking-[0.2em] shadow-xl mt-8">Apply Filters</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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

// Reusable Flight Filter Panel
function FlightFilterPanel({ stops, setStops, airlines, setAirlines, maxPrice, setMaxPrice, refundableOnly, setRefundableOnly, toggleFilter }) {
  return (
    <div className="space-y-6">
       <div className="bg-white md:bg-transparent rounded-xl p-0 md:p-0">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-xs md:text-sm font-black text-slate-800 uppercase tracking-widest">Filter Matrix</h3>
             <button onClick={() => { setStops([]); setAirlines([]); setMaxPrice(50000); setRefundableOnly(false); }} className="text-[12px] text-blue-600 font-black hover:underline uppercase tracking-wider">Reset Matrix</button>
          </div>

          <div className="space-y-8">
             <div>
                <p className="text-[12px] md:text-[13px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5">Flight Sequence</p>
                <div className="space-y-4">
                   {[{v:0, l:"Direct Non-Stop"},{v:1, l:"1 Technical Stop"}].map(s => (
                     <label key={s.v} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-4">
                           <input type="checkbox" checked={stops.includes(s.v)} onChange={() => toggleFilter(stops, s.v, setStops)} className="w-5 h-5 rounded border-slate-300 accent-blue-600 cursor-pointer" />
                           <span className="text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{s.l}</span>
                        </div>
                        <span className="text-[10px] font-black text-slate-300 italic">₹ 7,640</span>
                     </label>
                   ))}
                </div>
             </div>

             <div>
                <p className="text-[12px] md:text-[13px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5">Price Boundary</p>
                <input type="range" min="3000" max="50000" step="1000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                <div className="flex justify-between mt-4">
                   <div className="flex flex-col">
                      <span className="text-[8px] font-black text-slate-400 uppercase">Min Floor</span>
                      <span className="text-xs font-black text-slate-800 tracking-tight">₹ 3,241</span>
                   </div>
                   <div className="flex flex-col items-end">
                      <span className="text-[8px] font-black text-slate-400 uppercase">Max Peak</span>
                      <span className="text-xs font-black text-blue-600 tracking-tight">₹ {maxPrice.toLocaleString()}</span>
                   </div>
                </div>
             </div>

             <div>
                <p className="text-[12px] md:text-[13px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5">Carrier Logic</p>
                <div className="grid grid-cols-1 gap-4">
                   {["IndiGo", "Air India", "Vistara", "SpiceJet", "Akasa Air"].map(air => (
                     <label key={air} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-4">
                           <input type="checkbox" checked={airlines.includes(air)} onChange={() => toggleFilter(airlines, air, setAirlines)} className="w-5 h-5 rounded border-slate-300 accent-blue-600 cursor-pointer" />
                           <span className="text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{air}</span>
                        </div>
                        <span className="text-[10px] font-black text-slate-300 italic">₹ 7,640</span>
                     </label>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
