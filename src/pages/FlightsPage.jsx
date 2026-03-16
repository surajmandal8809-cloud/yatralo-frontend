import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSearchFlightsQuery, useLazySearchAirportsQuery, useGetAirportsQuery } from "../services/flightService";

import {
  ArrowRight,
  ArrowRightLeft,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Compass,
  Filter,
  MapPin,
  Plane,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Users,
  Wifi,
  Coffee,
  Timer,
  AlertCircle,
  Zap,
  X,
  Check,
  Award,
  ShieldCheck,
  TrendingDown,
  Wind,
} from "lucide-react";




/* -----------------------------
   Static Cities
--------------------------------*/


/* -----------------------------
   Helpers
--------------------------------*/

const resolveCityCode = (code) => {
  if (!code) return null;
  return code.toUpperCase();
};

const formatDuration = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h ? `${h}h ` : ""}${m}m`;
};

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
        className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl text-left transition-all hover:border-[#CF3425]/40"
      >
        <MapPin size={16} className="text-[#CF3425] flex-shrink-0" />
        {value ? (
          <div>
            <p className="text-xl font-black text-slate-900 leading-none tracking-tight">{value}</p>
            <p className="text-[10px] text-slate-400 truncate max-w-[140px] mt-0.5">{sel.city || value}</p>
          </div>
        ) : (
          <p className="text-slate-500 text-sm">Select city</p>
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
              className="w-full text-sm px-3 py-2 rounded-xl bg-slate-50 outline-none border border-transparent focus:border-[#CF3425]/20"
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
                <span className="text-xs font-black bg-slate-50 text-[#CF3425] px-1.5 py-0.5 rounded min-w-[36px] text-center">{c.iata}</span>
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


function FlightCard({ flight, pax, onBook }) {
    const [expanded, setExpanded] = useState(false);
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#CF3425]/20 transition-all overflow-hidden group"
        >
            {/* Status Ribbon if Delayed/Cancelled */}
            {flight.status !== 'scheduled' && (
                <div className={`py-1.5 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-center ${
                    flight.status === 'delayed' ? 'bg-amber-500 text-white' : 'bg-slate-900 text-white'
                }`}>
                    Flight Status: {flight.status}
                </div>
            )}

            <div className="p-6">
                <div className="flex flex-wrap items-center gap-6">
                    {/* Airline Info */}
                    <div className="flex items-center gap-4 min-w-[180px]">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg font-black shadow-lg shadow-[#CF3425]/20" style={{ background: flight.bg }}>
                            {flight.code}
                        </div>
                        <div>
                            <p className="text-sm font-black text-slate-900">{flight.airline}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{flight.flightNo}</p>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="flex-1 flex items-center justify-center gap-8 min-w-[280px]">
                        <div className="text-center group">
                            <p className="text-2xl font-black text-slate-900 group-hover:text-[#CF3425] transition-colors">{flight.dep}</p>
                            <div className="flex flex-col items-center mt-1">
                                <span className="text-[10px] font-bold text-slate-100 bg-[#CF3425] px-1.5 py-0.5 rounded uppercase tracking-widest leading-none mb-1">{flight.origin}</span>
                                <span className="text-[9px] font-black text-[#CF3425]/60 uppercase tracking-tighter">{flight.depDate}</span>
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 block mt-0.5 max-w-[80px] truncate mx-auto" title={flight.originName}>{flight.originCity}</p>
                            <p className="text-[8px] font-medium text-slate-300 truncate max-w-[80px] mx-auto uppercase">{flight.originName}</p>
                        </div>

                        <div className="flex-1 max-w-[150px] flex flex-col items-center relative">
                            <p className="text-[10px] font-black text-slate-400 mb-1.5 uppercase tracking-tighter">{formatDuration(flight.duration)}</p>
                            <div className="w-full flex items-center gap-2">
                                <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-slate-200 to-slate-200 rounded-full" />
                                <Plane size={16} className="text-[#CF3425] transform rotate-90" />
                                <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-slate-200 to-slate-200 rounded-full" />
                            </div>
                            <p className="text-[9px] font-black text-emerald-600 mt-1.5 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full">Non-stop</p>
                        </div>

                        <div className="text-center group">
                            <p className="text-2xl font-black text-slate-900 group-hover:text-slate-700 transition-colors">{flight.arr}</p>
                            <div className="flex flex-col items-center mt-1">
                                <span className="text-[10px] font-bold text-slate-100 bg-slate-800 px-1.5 py-0.5 rounded uppercase tracking-widest leading-none mb-1">{flight.destination}</span>
                                <div className="h-[13px]" /> {/* Spacer to match departure date height */}
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 block mt-0.5 max-w-[80px] truncate mx-auto" title={flight.destinationName}>{flight.destinationCity}</p>
                            <p className="text-[8px] font-medium text-slate-300 truncate max-w-[80px] mx-auto uppercase">{flight.destinationName}</p>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="text-right min-w-[140px]">
                        <p className="text-2xl font-black text-[#CF3425]">₹{flight.price.toLocaleString()}</p>
                        <p className="text-[10px] font-bold text-slate-400">Total for {pax} traveler{pax > 1 ? 's' : ''}</p>
                        <div className="flex items-center justify-end gap-1 mt-1">
                            <Star size={10} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-[10px] font-bold text-slate-600">{flight.rating}</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 relative pl-6 border-l border-dashed border-slate-200">
                        <button 
                            onClick={() => onBook(flight)}
                            className="px-8 py-3 bg-[#CF3425] hover:bg-[#b82e1f] text-white text-[11px] font-black rounded-2xl transition-all shadow-xl shadow-[#CF3425]/20 uppercase tracking-widest active:scale-95"
                        >
                            Select Flight
                        </button>
                        <button 
                            onClick={() => setExpanded(!expanded)}
                            className="py-2 text-[10px] font-black text-slate-400 hover:text-slate-900 transition-colors flex items-center justify-center gap-1 uppercase tracking-widest"
                        >
                            {expanded ? 'Hide Details' : 'View Details'}
                            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600">
                        <Zap size={10} className="text-yellow-500 fill-yellow-500" /> 
                        {flight.status === 'scheduled' ? 'On Time' : flight.status.toUpperCase()}
                    </span>
                    {flight.wifi && <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600"><Wifi size={10} className="text-indigo-500" /> Free Wifi</span>}
                    {flight.meal && <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600"><Coffee size={10} className="text-orange-500" /> Meal Included</span>}
                    {flight.refundable && <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-lg text-[10px] font-bold text-emerald-600"><CheckCircle2 size={10} /> Refundable</span>}
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 ml-auto">
                        <Users size={10} /> Only {flight.seats} seats left
                    </span>
                </div>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-slate-50 bg-slate-50/50 overflow-hidden"
                    >
                        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Baggage</p>
                                <p className="text-xs font-bold text-slate-700">7kg Cabin, 15kg Check-in</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Cabin</p>
                                <p className="text-xs font-bold text-slate-700">Economy Class</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Aircraft</p>
                                <p className="text-xs font-bold text-slate-700">Airbus A320-200</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Cancellation</p>
                                <p className={`text-xs font-bold ${flight.refundable ? 'text-emerald-600' : 'text-slate-400'}`}>
                                    {flight.refundable ? 'Free before 24h' : 'Non-refundable'}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* -----------------------------
   Flights Page
--------------------------------*/

export default function FlightsPage() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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
  const [searchParamsState, setSearchParamsState] = useState(null);

  const [sortBy, setSortBy] = useState("price");
  const [maxPrice, setMaxPrice] = useState(60000);
  const [nonstop, setNonstop] = useState(false);

  const didAutoSearch = useRef(false);

  const { data: response, isLoading, error } = useSearchFlightsQuery(
      searchParamsState || { from: "", to: "", date: "" },
      // { skip: !searched }
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

        // Derive code from flightNumber (e.g., "6E 123" -> "6E") or fallback to airline first letters
        const derivedCode = flight.flightNumber?.split(' ')[0]?.substring(0, 2).toUpperCase() || 
                            flight.airline?.substring(0, 2).toUpperCase() || "FL";

        return {
          id: flight._id,
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
          bg: ["#1e293b", "#CF3425", "#0284c7", "#4f46e5", "#7c3aed"][Math.floor(Math.random() * 5)],
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
    setSearched(true);
  }, [from, to, date]);


  useEffect(() => {
    const shouldAutoSearch = searchParams.get("autoSearch") === "1";
    if (!shouldAutoSearch || didAutoSearch.current) return;

    didAutoSearch.current = true;
    handleSearch();
  }, [handleSearch, searchParams]);


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


  /* -----------------------------
     Booking Flow
  --------------------------------*/
  /* -----------------------------
     Booking Flow
  --------------------------------*/
  const handleBookFlight = (flight) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to book");
      navigate("/auth/login");
      return;
    }

    navigate("/booking-selection", {
      state: {
        type: "flight",
        flight: flight,
        from,
        to,
        fromName: fromCity?.name || flight.originCity,
        toName: toCity?.name || flight.destinationCity,
        date,
        pax,
      },
    });
  };






  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Hero Banner with Centered Aesthetic */}
      <section className="relative h-[55vh] min-h-[450px] flex items-center justify-center overflow-hidden">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-105"
          >
              <source src="/assets/Banner.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-900/40 to-slate-900/60" />
          
          <div className="relative z-10 text-center px-6 -mt-10">
              <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-1.5 rounded-full inline-flex items-center gap-2 mb-8"
              >
                  <Sparkles size={14} className="text-amber-400" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">The Art of Elite Aviation</span>
              </motion.div>
              <motion.h1 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[0.9]"
              >
                  Beyond
                  <span className="text-[#CF3425]">Horizon</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-white/70 text-sm font-medium tracking-wide uppercase"
              >
                Curated schedules for the modern explorer
              </motion.p>
          </div>
      </section>

      {/* Search Bar Float */}
      <div className="relative z-20 -mt-12 max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr_160px_180px_auto] gap-4 items-end">
                  <CityBox label="From" value={from} onChange={setFrom} />
                  
                  <div className="flex justify-center mb-1">
                      <button 
                        onClick={() => { setFrom(to); setTo(from); }}
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-[#CF3425] hover:bg-red-50 transition-all hover:rotate-180 duration-500 shadow-sm border border-slate-100"
                      >
                          <ArrowRightLeft size={16} />
                      </button>
                  </div>

                  <CityBox label="To" value={to} onChange={setTo} />

                  <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Departure</p>
                      <div className="relative">
                          <Calendar size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CF3425]" />
                          <input 
                              type="date" 
                              value={date} 
                              min={today}
                              onChange={(e) => setDate(e.target.value)}
                              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black outline-none focus:bg-white focus:border-[#CF3425]/30 focus:ring-4 focus:ring-[#CF3425]/5 transition-all text-slate-800"
                          />
                      </div>
                  </div>

                  <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Travelers</p>
                      <div className="relative">
                          <Users size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CF3425]" />
                          <select 
                            value={pax}
                            onChange={(e) => setPax(Number(e.target.value))}
                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black outline-none appearance-none focus:bg-white focus:border-[#CF3425]/30 focus:ring-4 focus:ring-[#CF3425]/5 transition-all text-slate-800"
                          >
                              {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Traveler{n>1?'s':''}</option>)}
                          </select>
                          <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                  </div>

                  <button 
                    onClick={handleSearch}
                    className="h-[56px] px-10 bg-[#CF3425] hover:bg-[#b82e1f] text-white font-black text-xs rounded-2xl transition-all shadow-xl shadow-[#CF3425]/30 flex items-center gap-3 mb-0.5 uppercase tracking-[0.2em] active:scale-95"
                  >
                      <Search size={20} />
                      Search
                  </button>
              </div>
          </div>
      </div>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-16">
          
          {isLoading ? (
              <div className="space-y-6">
                  {[1,2,3].map(i => (
                      <div key={i} className="h-40 bg-white rounded-3xl border border-slate-200 animate-pulse" />
                  ))}
              </div>
          ) : searched ? (
              <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] gap-10">
                  {/* Sidebar Filters */}
                  <aside className="space-y-8">
                      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm sticky top-24">
                          <div className="flex items-center gap-2 mb-8 pb-4 border-b border-slate-100">
                              <Filter size={16} className="text-[#CF3425]" />
                              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Filters</h3>
                          </div>

                          <div className="space-y-10">
                              <div>
                                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex justify-between">
                                    Price Range 
                                    <span className="text-[#CF3425]">₹{maxPrice.toLocaleString()}</span>
                                  </p>
                                  <input 
                                      type="range" 
                                      min="3000" 
                                      max="100000" 
                                      step="1000"
                                      value={maxPrice}
                                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                                      className="w-full accent-[#CF3425] h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                                  />
                                  <div className="flex justify-between mt-3 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                                      <span>₹3,000</span>
                                      <span>₹1,00,000+</span>
                                  </div>
                              </div>

                              <div className="pt-6 border-t border-slate-50">
                                  <label className="flex items-center justify-between cursor-pointer group">
                                      <span className="text-xs font-black text-slate-700">Non-stop Flights</span>
                                      <div className={`w-10 h-5 rounded-full transition-all relative ${nonstop ? 'bg-[#CF3425]' : 'bg-slate-200'}`}>
                                          <input 
                                            type="checkbox" 
                                            className="hidden" 
                                            checked={nonstop}
                                            onChange={() => setNonstop(!nonstop)}
                                          />
                                          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${nonstop ? 'left-6' : 'left-1'}`} />
                                      </div>
                                  </label>
                              </div>
                          </div>
                      </div>
                  </aside>

                  {/* Results List */}
                  <div className="space-y-6">
                      <div className="flex items-end justify-between mb-4 px-2">
                          <div>
                            <h2 className="text-2xl font-black text-slate-900 leading-tight">
                                {fromCity?.city || initialFrom} to {toCity?.city || initialTo}
                            </h2>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                {results.length} results found • {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 bg-slate-100/50 p-1 rounded-xl border border-slate-200">
                              <select 
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent text-[10px] font-black text-slate-600 px-3 py-1.5 outline-none cursor-pointer uppercase tracking-wider"
                              >
                                  <option value="price">Cheapest</option>
                                  <option value="duration">Fastest</option>
                                  <option value="dep">Earliest</option>
                                  <option value="rating">Best Rated</option>
                              </select>
                          </div>
                      </div>

                      <div className="space-y-4">
                          {results.length > 0 ? (
                              results.map((flight) => (
                                  <FlightCard 
                                    key={flight.id} 
                                    flight={flight} 
                                    pax={pax}
                                    onBook={handleBookFlight}
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
                  <div className="w-24 h-24 bg-red-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-[#CF3425]">
                      <Compass size={48} />
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Start Your Elite Journey</h2>
                  <p className="text-slate-400 font-bold text-lg max-w-md mx-auto">Enter your route above to explore curated flight options with premium hospitality.</p>
              </div>
          )}

      </section>

    </div>
  );
}