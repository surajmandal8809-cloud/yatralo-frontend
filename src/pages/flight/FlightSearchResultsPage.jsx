import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useSearchFlightsQuery, useLazySearchAirportsQuery, useGetAirportsQuery } from "../../services/flightService";

import {
  ArrowRight,
  ArrowRightLeft,
  Calendar,
  ChevronDown,
  ChevronRight,
  Filter,
  MapPin,
  Plane,
  Search,
  SlidersHorizontal,
  Star,
  X,
  Zap,
  TrendingDown,
  Timer,
  Users,
  Compass,
  Sparkles,
  Check
} from "lucide-react";

import FlightCard from "./FlightCard";
import FareModal from "./FareModal";
import AuthModal from "../../components/Auth/AuthModal";

// --- Components ---

function CityBox({ value, onChange, label }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [trigger, { data: searchData, isFetching }] = useLazySearchAirportsQuery();
  const { data: defaultAirports } = useGetAirportsQuery();

  useEffect(() => {
    if (q.length >= 2) {
      const timer = setTimeout(() => {
        trigger(q);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [q, trigger]);

  const list = q.length >= 2 ? (searchData?.data || []) : (defaultAirports?.data || []);

  const sel = searchData?.data?.find(c => c.iata === value) || 
              defaultAirports?.data?.find(c => c.iata === value) || 
              { iata: value, city: value };

  return (
    <div className="relative">
      <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5">{label}</p>
      <button
        type="button"
        onClick={() => {
          setOpen(!open);
          setQ("");
        }}
        className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl text-left transition-all hover:bg-violet-50/30 hover:border-violet-200"
      >
        <MapPin size={16} className="text-[#7c3aed] flex-shrink-0" />
        {value ? (
          <div>
            <p className="text-xl font-black text-slate-900 leading-none tracking-tight group-hover:text-[#7c3aed] transition-colors">{value}</p>
            <p className="text-[10px] text-slate-400 truncate max-w-[140px] mt-0.5 font-bold">{sel.city || value}</p>
          </div>
        ) : (
          <p className="text-slate-500 text-sm font-bold">Select city</p>
        )}
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl z-40 overflow-hidden border border-slate-100">
          <div className="p-2.5 border-b border-slate-100">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search city or airport..."
              className="w-full text-sm px-3 py-2 rounded-xl bg-slate-50 outline-none border border-transparent focus:border-[#7c3aed]/20"
            />
          </div>
          <div className="max-h-52 overflow-y-auto">
            {isFetching && <div className="p-4 text-center text-xs text-slate-400">Searching...</div>}
            {list.map((c) => (
              <button
                key={c.iata}
                type="button"
                onClick={() => {
                  onChange(c.iata);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-left transition-colors"
              >
                <span className="text-xs font-black bg-slate-50 text-[#7c3aed] px-1.5 py-0.5 rounded min-w-[36px] text-center">{c.iata}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{c.city}</p>
                  <p className="text-[10px] text-slate-400">{c.name}</p>
                </div>
              </button>
            ))}
            {!isFetching && list.length === 0 && q.length >= 2 && (
              <div className="p-4 text-center text-xs text-slate-400">No airports found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const resolveCityCode = (code) => {
  if (!code) return null;
  return code.toUpperCase();
};

export default function FlightSearchResultsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const today = new Date().toISOString().split("T")[0];

  const initialFrom = resolveCityCode(searchParams.get("from")) || "DEL";
  const initialTo = resolveCityCode(searchParams.get("to")) || "BOM";
  const initialDate = searchParams.get("date") || today;
  const initialPax = Math.max(1, Math.min(6, Number(searchParams.get("pax")) || 1));

  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [date, setDate] = useState(initialDate);
  const [pax, setPax] = useState(initialPax);

  const [searched, setSearched] = useState(true);
  const [searchParamsState, setSearchParamsState] = useState({ from: initialFrom, to: initialTo, date: initialDate });

  const [sortBy, setSortBy] = useState("price");
  const [maxPrice, setMaxPrice] = useState(60000);
  const [nonstop, setNonstop] = useState(false);
  const [fareType, setFareType] = useState("Regular");

  const [selectedFlightForFare, setSelectedFlightForFare] = useState(null);
  const [showFareModal, setShowFareModal] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const didAutoSearch = useRef(false);

  const { data: response, isLoading, error } = useSearchFlightsQuery(
      searchParamsState,
      { skip: !searched }
  );

  const { data: airports } = useGetAirportsQuery();
  const fromCity = airports?.data?.find((c) => c.iata === from);
  const toCity = airports?.data?.find((c) => c.iata === to);

  const mappedFlights = useMemo(() => {
    if (!response?.status) return [];

    return (response.data || []).map((flight) => {
        const dep = new Date(flight.departureTime);
        const arr = new Date(flight.arrivalTime);
        const duration = Math.round((arr - dep) / 60000);

        const derivedCode = flight.flightNumber?.split(' ')[0]?.substring(0, 2).toUpperCase() || 
                            flight.airline?.substring(0, 2).toUpperCase() || "FL";

        return {
          id: flight._id,
          _id: flight._id,
          airline: flight.airline,
          code: derivedCode,
          flightNo: flight.flightNumber,
          origin: flight.origin,
          destination: flight.destination,
          originCity: flight.originCity || flight.origin,
          destinationCity: flight.destinationCity || flight.destination,
          originName: flight.originName || flight.origin,
          destinationName: flight.destinationName || flight.destination,
          dep: dep.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
          arr: arr.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
          depDate: dep.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
          depMins: dep.getHours() * 60 + dep.getMinutes(),
          duration,
          stops: 0,
          price: flight.price * pax,
          perPax: flight.price,
          seats: flight.seatsAvailable || 10,
          status: flight.status || 'scheduled',
          rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
          bg: ["#7c3aed", "#f97316", "#6d28d9", "#ea580c", "#5b21b6"][Math.floor(Math.random() * 5)],
          refundable: Math.random() > 0.5,
          wifi: Math.random() > 0.5,
          meal: Math.random() > 0.5,
        };
      });
  }, [response, pax]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "Search failed");
    }
  }, [error]);

  const handleSearch = useCallback(() => {
    if (!from || !to || from === to) {
      toast.error("Please select valid cities");
      return;
    }
    setSearchParamsState({ from, to, date });
    setSearchParams({ from, to, date, pax });
    setSearched(true);
  }, [from, to, date, pax, setSearchParams]);

  const results = useMemo(() => {
    return [...mappedFlights]
      .filter((f) => f.price <= maxPrice && (!nonstop || f.stops === 0))
      .sort((a, b) => {
        if (sortBy === "price") return a.price - b.price;
        if (sortBy === "duration") return a.duration - b.duration;
        if (sortBy === "dep") return a.depMins - b.depMins;
        return parseFloat(b.rating) - parseFloat(a.rating);
      });
  }, [mappedFlights, sortBy, maxPrice, nonstop]);

  const handleViewPrices = (flight) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthModalOpen(true);
      return;
    }
    setSelectedFlightForFare(flight);
    setShowFareModal(true);
  };

  const handleBookWithFare = (flight, fareType) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthModalOpen(true);
      return;
    }

    const priceMultiplier = fareType === "Business" ? 2.5 : (fareType === "Classic" ? 1.2 : (fareType === "Flex" ? 1.5 : 1));
    const updatedFlight = {
      ...flight,
      price: Math.round(flight.perPax * priceMultiplier * pax),
      fareType: fareType
    };

    navigate("/booking-selection", {
      state: {
        type: "flight",
        flight: updatedFlight,
        from,
        to,
        fromName: fromCity?.name || flight.originCity,
        toName: toCity?.name || flight.destinationCity,
        date,
        pax,
      },
    });
  };

  const handleDateTabClick = (dStr) => {
    setDate(dStr);
    setSearchParamsState({ from, to, date: dStr });
    setSearchParams({ from, to, date: dStr, pax });
    setSearched(true);
  };

  const todayObj = new Date(today);
  todayObj.setHours(0, 0, 0, 0);

  const selectedDateObj = new Date(date);
  selectedDateObj.setHours(0, 0, 0, 0);

  let startDateObj = new Date(selectedDateObj);
  startDateObj.setDate(selectedDateObj.getDate() - 2);
  if (startDateObj < todayObj) {
    startDateObj = new Date(todayObj);
  }

  const dateTabs = Array.from({ length: 5 }).map((_, i) => {
    const d = new Date(startDateObj);
    d.setDate(startDateObj.getDate() + i);
    return d;
  });

  const formatDur = (mins) => {
    if (!mins) return "--";
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  const cheapestFlight = [...mappedFlights].sort((a,b) => a.price - b.price)[0] || {};
  const fastestFlight = [...mappedFlights].filter(f => f.stops === 0).sort((a,b) => a.duration - b.duration)[0] || cheapestFlight;
  const preferredFlight = [...mappedFlights].sort((a,b) => parseFloat(b.rating) - parseFloat(a.rating))[0] || cheapestFlight;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <section className="bg-white border-b border-slate-200 pt-24 pb-4 px-6 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto">
          {/* Search Inputs Row */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
               <div className="flex-1 min-w-[200px]">
                  <CityBox label="From" value={from} onChange={setFrom} isCompact />
               </div>
               <button 
                onClick={() => {
                  const temp = from;
                  setFrom(to);
                  setTo(temp);
                }}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#7c3aed] hover:rotate-180 transition-all duration-500 shadow-sm"
               >
                  <ArrowRightLeft size={16} />
               </button>
               <div className="flex-1 min-w-[200px]">
                  <CityBox label="To" value={to} onChange={setTo} isCompact />
               </div>
               <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer transition-all hover:border-[#7c3aed]/30 relative group">
                  <Calendar size={14} className="text-[#7c3aed]" />
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Depart</p>
                    <input 
                      type="date" 
                      value={date} 
                      onChange={(e) => setDate(e.target.value)}
                      className="text-sm font-black text-slate-900 bg-transparent outline-none w-[100px]"
                    />
                  </div>
               </div>
               <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer transition-all hover:border-[#7c3aed]/30">
                  <Users size={14} className="text-[#f97316]" />
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Travelers</p>
                    <select 
                      value={pax} 
                      onChange={(e) => setPax(Number(e.target.value))}
                      className="text-sm font-black text-slate-900 bg-transparent outline-none"
                    >
                      {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
               </div>
               <button onClick={handleSearch} className="ml-auto px-10 py-3.5 bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white font-black text-sm rounded-full uppercase tracking-widest shadow-xl shadow-violet-100 hover:scale-105 transition-all">
                    Search
               </button>
          </div>

          {/* Fare Types Row */}
          <div className="flex items-center gap-6 mt-6">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fare Type:</span>
              <div className="flex items-center gap-5">
                  {["Regular", "Student", "Armed Forces", "Senior Citizen", "Doctor and Nurses"].map(type => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer group">
                          <div className="relative flex items-center justify-center">
                              <input 
                                  type="radio" 
                                  name="fareType" 
                                  checked={fareType === type}
                                  onChange={() => setFareType(type)}
                                  className="peer appearance-none w-4 h-4 rounded-full border-2 border-slate-200 checked:border-[#7c3aed] transition-all"
                              />
                              <div className="absolute w-2 h-2 rounded-full bg-[#7c3aed] scale-0 peer-checked:scale-100 transition-transform" />
                          </div>
                          <span className={`text-[11px] font-black transition-colors ${fareType === type ? "text-[#7c3aed]" : "text-slate-500 group-hover:text-slate-800"}`}>
                              {type}
                          </span>
                      </label>
                  ))}
              </div>
          </div>
        </div>
      </section>


      <div className="max-w-7xl mx-auto px-6 py-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-8">
            <div className="relative w-48 h-48">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  y: [0, -20, 0]
                }}
                transition={{ 
                  rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-40 h-40 rounded-full border-4 border-dashed border-violet-100/50" />
              </motion.div>
              <motion.div
                animate={{ 
                  x: [-100, 100],
                  y: [0, -10, 10, 0],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center text-[#7c3aed]"
              >
                <Plane size={64} className="rotate-90 md:rotate-0" />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-violet-50 rounded-full blur-2xl opacity-50 animate-pulse" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Searching for best flights...</h3>
              <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-xs">Finding matches from 450+ airlines</p>
              <div className="flex items-center justify-center gap-2 mt-6">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        ) : searched ? (
          <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] gap-10">
            <aside className="space-y-6">
              <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm sticky top-24">
                <div className="flex items-center justify-between mb-10">
                   <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Filters</h3>
                   <button 
                    onClick={() => { setMaxPrice(60000); setNonstop(false); }} 
                    className="text-[10px] font-black text-[#7c3aed] uppercase tracking-widest hover:underline"
                   >
                    Clear All
                   </button>
                </div>
                
                <div className="space-y-12">
                  {/* Stops Section */}
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Stops</h4>
                    <div className="space-y-4">
                        <label className="group cursor-pointer flex items-center justify-between px-4 py-3 rounded-2xl border border-transparent hover:bg-slate-50 hover:border-slate-100 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="relative flex items-center justify-center">
                                    <input 
                                        type="checkbox" 
                                        checked={nonstop} 
                                        onChange={(e) => setNonstop(e.target.checked)} 
                                        className="peer appearance-none w-5 h-5 rounded-lg border-2 border-slate-200 checked:bg-[#7c3aed] checked:border-[#7c3aed] transition-all cursor-pointer" 
                                    />
                                    <Check className="absolute text-white w-3 h-3 opacity-0 peer-checked:opacity-100 pointer-events-none" strokeWidth={4} />
                                </div>
                                <span className={`text-xs font-black transition-colors ${nonstop ? 'text-slate-900' : 'text-slate-500'}`}>0 Stop (Non-stop)</span>
                            </div>
                            <span className="text-[10px] font-black text-slate-300">₹7,897</span>
                        </label>
                        
                        <label className="group cursor-pointer flex items-center justify-between px-4 py-3 rounded-2xl border border-transparent hover:bg-slate-50 hover:border-slate-100 transition-all opacity-50">
                            <div className="flex items-center gap-4">
                                <div className="w-5 h-5 rounded-lg border-2 border-slate-200 bg-slate-100" />
                                <span className="text-xs font-black text-slate-500">1 Stop</span>
                            </div>
                            <span className="text-[10px] font-black text-slate-300">₹12,450</span>
                        </label>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="pt-8 border-t border-slate-100">
                    <div className="flex justify-between items-end mb-8">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">One Way Price</h4>
                        <span className="text-xs font-black text-[#7c3aed] bg-violet-50 px-2.5 py-1 rounded-lg">Up to ₹{maxPrice.toLocaleString()}</span>
                    </div>
                    
                    <div className="px-2">
                        <input 
                            type="range" 
                            min="2000" 
                            max="60000" 
                            step="500"
                            value={maxPrice} 
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#7c3aed]"
                        />
                        <div className="flex justify-between mt-4">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">₹2,000</span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">₹60,000</span>
                        </div>
                    </div>
                  </div>

                  {/* Amenities (Visual Only) */}
                  <div className="pt-8 border-t border-slate-100">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Popular Airlines</h4>
                    <div className="grid grid-cols-2 gap-3">
                         {["IndiGo", "Air India", "Vistara", "SpiceJet"].map(air => (
                             <button key={air} className="flex flex-col items-center p-3 rounded-2xl border border-slate-100 hover:border-violet-100 hover:bg-violet-50/10 transition-all group">
                                 <div className="w-8 h-8 rounded-lg bg-slate-50 mb-2 flex items-center justify-center text-[10px] font-black text-slate-300 group-hover:text-violet-400 transition-colors">
                                     {air.slice(0,2).toUpperCase()}
                                 </div>
                                 <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{air}</span>
                             </button>
                         ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <div className="space-y-6">
              {/* Header Title Information */}
              <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8">
                      Flights from {fromCity?.city || from} to {toCity?.city || to}
                  </h2>
              </div>

              {/* Offer Banners Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all group overflow-hidden relative">
                      <div className="w-16 h-10 rounded shrink-0 flex items-center justify-center p-1">
                          <img src="/assets/img/visa.svg" alt="VISA" className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="flex-1">
                          <p className="text-[12px] font-black text-slate-800 leading-tight">VISA Exclusive Offer</p>
                          <p className="text-[10px] font-bold text-slate-500 mt-0.5 line-clamp-1">Free Seat with VISA Signature Cards</p>
                      </div>
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-[#7c3aed] transition-colors shrink-0" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all group">
                      <div className="w-10 h-10 shrink-0">
                          <img src="/assets/img/idfc.svg" alt="IDFC FIRST Bank" className="w-full h-full object-contain rounded-full shadow-sm group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="flex-1">
                          <p className="text-[12px] font-black text-slate-800 leading-tight">Flat 10% Instant Discount</p>
                          <p className="text-[10px] font-bold text-slate-500 mt-0.5 line-clamp-1">on IDFC FIRST Bank Credit Cards</p>
                      </div>
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-[#7c3aed] transition-colors shrink-0" />
                  </div>
                   <div className="hidden lg:flex bg-white border border-slate-200 rounded-2xl p-4 items-center gap-4 cursor-pointer hover:shadow-md transition-all group">
                      <div className="w-10 h-10 shrink-0">
                          <img src="/assets/img/meetgreet.svg" alt="Meet and Greet" className="w-full h-full object-contain rounded-lg shadow-sm group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="flex-1">
                          <p className="text-[12px] font-black text-slate-800 leading-tight">Meet and Greet</p>
                          <p className="text-[10px] font-bold text-slate-500 mt-0.5 line-clamp-1">Elevate your travel experience</p>
                      </div>
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-[#7c3aed] transition-colors shrink-0" />
                  </div>
              </div>

              {/* Date Selector Row */}
              <div className="bg-white border border-slate-200 rounded-xl flex overflow-hidden mb-8 shadow-sm">
                  <div className="w-12 border-r border-slate-100 flex items-center justify-center text-slate-300 cursor-pointer hover:bg-slate-50 transition-all"><ChevronDown className="rotate-90" size={16} /></div>
                  <div className="flex-1 flex overflow-x-auto no-scrollbar">
                      {dateTabs.map((dObj) => {
                          const dStr = dObj.toISOString().split("T")[0];
                          const isActive = dStr === date;
                          const formattedDate = dObj.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' });
                          const randomPrice = 3500 + (dStr.charCodeAt(dStr.length - 1) * 200) + (dStr.charCodeAt(dStr.length - 2) * 10);
                          return (
                          <div 
                            key={dStr} 
                            onClick={() => handleDateTabClick(dStr)}
                            className={`flex-1 min-w-[100px] py-3 text-center cursor-pointer border-r border-slate-50 transition-all hover:bg-slate-50 ${isActive ? "border-b-4 border-b-[#7c3aed] bg-violet-50/10" : ""}`}
                          >
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{formattedDate}</p>
                              <p className={`text-xs font-black mt-1 ${isActive ? "text-[#7c3aed]" : "text-slate-700"}`}>₹{randomPrice.toLocaleString()}</p>
                          </div>
                      )})}
                  </div>
                  <div className="w-12 border-l border-slate-100 flex items-center justify-center text-slate-300 cursor-pointer hover:bg-slate-50 transition-all"><ChevronDown className="-rotate-90" size={16} /></div>
              </div>

              {/* Sorting Bar */}
              <div className="mb-6 overflow-x-auto no-scrollbar pb-2">
                <div className="bg-white border border-slate-200 flex rounded-lg shadow-sm overflow-hidden divide-x divide-slate-100 min-w-[600px]">
                  {[
                    { id: 'price', label: 'CHEAPEST', price: cheapestFlight.price, duration: cheapestFlight.duration, icon: TrendingDown },
                    { id: 'duration', label: 'NON STOP FIRST', price: fastestFlight.price, duration: fastestFlight.duration, icon: Timer },
                    { id: 'rating', label: 'YOU MAY PREFER', price: preferredFlight.price, duration: preferredFlight.duration, icon: Star }
                  ].map(item => {
                    const Icon = item.icon;
                    const isActive = sortBy === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSortBy(item.id)}
                        className={`flex-1 p-3 cursor-pointer transition-all flex flex-col relative group ${
                          isActive 
                          ? "bg-[#e5f3ff]" 
                          : "bg-white hover:bg-slate-50"
                        }`}
                      >
                        {isActive && <div className="absolute top-0 left-0 right-0 h-1 bg-[#008cff]" />}
                        <div className="flex items-center gap-3 w-full pl-2">
                           <div className={`${isActive ? 'text-[#008cff]' : 'text-slate-400 group-hover:text-[#008cff] transition-colors'} shrink-0`}>
                              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                           </div>
                           <div>
                              <p className={`text-[11px] font-bold tracking-widest uppercase ${isActive ? 'text-[#008cff]' : 'text-slate-600'}`}>
                                {item.label}
                              </p>
                              {item.price ? (
                                <p className={`text-xs font-semibold mt-0.5 ${isActive ? "text-[#008cff]" : "text-slate-500"}`}>
                                  ₹{item.price.toLocaleString()} <span className="opacity-50 mx-1">•</span> {formatDur(item.duration)}
                                </p>
                              ) : (
                                <p className="text-xs font-bold mt-0.5 text-slate-400">Loading...</p>
                              )}
                           </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                {results.length > 0 ? (
                  results.map((flight) => (
                    <FlightCard 
                      key={flight.id} 
                      flight={flight} 
                      pax={pax}
                      onViewPrices={handleViewPrices}
                    />
                  ))
                ) : (
                  <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-200">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-200">
                      <Search size={32} />
                    </div>
                    <h3 className="text-xl font-black text-slate-800">No matching flights</h3>
                    <p className="text-slate-400 font-bold text-sm mt-1">Try adjusting your filters or search criteria</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-violet-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-[#7c3aed]">
              <Compass size={48} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Start Your Journey</h2>
            <p className="text-slate-400 font-bold text-lg max-w-md mx-auto">Enter your route above to explore curated flight options.</p>
          </div>
        )}
      </div>

      <FareModal 
        isOpen={showFareModal} 
        onClose={() => setShowFareModal(false)} 
        selectedFlight={selectedFlightForFare} 
        onBook={handleBookWithFare} 
      />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onAuthSuccess={(newToken) => {
          localStorage.setItem("token", newToken);
          window.dispatchEvent(new Event("storage"));
          setIsAuthModalOpen(false);
          toast.success("Successfully logged in!");
          if (selectedFlightForFare) {
            setShowFareModal(true);
          }
        }}
      />
    </div>
  );
}