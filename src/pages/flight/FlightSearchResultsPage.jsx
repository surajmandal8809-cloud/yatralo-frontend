import React, { useState, useMemo, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  Filter, 
  ChevronDown, 
  Search, 
  Plane, 
  Clock, 
  FilterX, 
  TrendingDown, 
  Zap, 
  Sparkles, 
  Coffee, 
  Compass, 
  ArrowRightLeft, 
  X,
  Calendar,
  Users,
  Timer,
  Table
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchFlightsQuery } from "../../services/flightService";
import FlightCard from "./FlightCard";
import FareModal from "./FareModal";
import AuthModal from "../../components/Auth/AuthModal";

// Sub-component for Search Box in Sticky Header
function CityBox({ label, value, onChange }) {
  const [showPicker, setShowPicker] = useState(false);
  const cities = [
    { name: "Delhi", iata: "DEL", airport: "Indira Gandhi Intl" },
    { name: "Mumbai", iata: "BOM", airport: "Chhatrapati Shivaji Intl" },
    { name: "Bangalore", iata: "BLR", airport: "Kempegowda Intl" },
    { name: "Chennai", iata: "MAA", airport: "Chennai Intl" },
    { name: "Kolkata", iata: "CCU", airport: "Netaji Subhash Chandra Bose" },
    { name: "Hyderabad", iata: "HYD", airport: "Rajiv Gandhi Intl" },
  ];

  return (
    <div className="relative group flex-1">
      <div 
        onClick={() => setShowPicker(!showPicker)}
        className="bg-white/10 border border-white/10 rounded-xl px-4 py-2 cursor-pointer hover:bg-white/20 transition-all"
      >
        <p className="text-[9px] font-black text-indigo-200 uppercase tracking-widest leading-none mb-1">{label}</p>
        <div className="flex items-center justify-between">
           <p className="text-xs font-black text-white">{value}</p>
           <ChevronDown size={14} className="text-indigo-400" />
        </div>
      </div>

      <AnimatePresence>
        {showPicker && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 p-4"
          >
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2 mb-4">
               <Search size={14} className="text-slate-400" />
               <input type="text" placeholder="Search City..." className="bg-transparent text-xs font-bold outline-none w-full" />
            </div>
            <div className="space-y-1">
              {cities.map(c => (
                <button 
                  key={c.iata} 
                  onClick={() => { onChange(c.iata); setShowPicker(false); }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 transition-all text-left group"
                >
                  <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded min-w-[36px] text-center">{c.iata}</span>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{c.name}</p>
                    <p className="text-[9px] text-slate-400">{c.airport}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FlightSearchResultsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const today = new Date().toISOString().split("T")[0];

  const initialFrom = searchParams.get("from")?.toUpperCase() || "DEL";
  const initialTo = searchParams.get("to")?.toUpperCase() || "BOM";
  const initialDate = searchParams.get("date") || today;
  const initialPax = Math.max(1, Math.min(6, Number(searchParams.get("pax")) || 1));

  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [date, setDate] = useState(initialDate);
  const [pax, setPax] = useState(initialPax);

  const [searched, setSearched] = useState(true);
  const [searchParamsState, setSearchParamsState] = useState({ from: initialFrom, to: initialTo, date: initialDate });

  const [sortBy, setSortBy] = useState("price"); // price, duration, dep
  const [maxPrice, setMaxPrice] = useState(50000);
  const [stops, setStops] = useState([]); // [], [0], [1], [2]
  const [airlines, setAirlines] = useState([]);
  const [depTime, setDepTime] = useState([]); // ['morning', 'afternoon', 'evening', 'night']
  const [refundableOnly, setRefundableOnly] = useState(false);

  const [selectedFlightForFare, setSelectedFlightForFare] = useState(null);
  const [showFareModal, setShowFareModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
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
        const duration = Math.round((arr - dep) / 60000);
        const derivedCode = flight.flightNumber?.split(' ')[0]?.substring(0, 2).toUpperCase() || "FL";

        const hour = dep.getHours();
        let timeBucket = 'night';
        if (hour >= 6 && hour < 12) timeBucket = 'morning';
        else if (hour >= 12 && hour < 18) timeBucket = 'afternoon';
        else if (hour >= 18 && hour < 24) timeBucket = 'evening';

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
          stops: Math.floor(Math.random() * 2), // Mock stops
          price: flight.price * pax,
          perPax: flight.price,
          seats: flight.seatsAvailable || 10,
          status: 'scheduled',
          bg: ["#4f46e5", "#7c3aed", "#ec4899", "#f59e0b", "#10b981"][Math.floor(Math.random() * 5)],
          refundable: Math.random() > 0.5,
          timeBucket
        };
      });
  }, [response, pax]);

  const results = useMemo(() => {
    let filtered = [...mappedFlights].filter(f => f.price <= maxPrice);
    
    if (stops.length > 0) filtered = filtered.filter(f => stops.includes(f.stops));
    if (airlines.length > 0) filtered = filtered.filter(f => airlines.includes(f.airline));
    if (depTime.length > 0) filtered = filtered.filter(f => depTime.includes(f.timeBucket));
    if (refundableOnly) filtered = filtered.filter(f => f.refundable);

    return filtered.sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "dep") return a.depMins - b.depMins;
      return 0;
    });
  }, [mappedFlights, sortBy, maxPrice, stops, airlines, depTime, refundableOnly]);

  const handleSearch = useCallback(() => {
    setSearchParamsState({ from, to, date });
    setSearchParams({ from, to, date, pax });
    setSearched(true);
  }, [from, to, date, pax, setSearchParams]);

  const handleBookWithFare = (flight, fareType) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthModalOpen(true);
      return;
    }

    const bookingData = { pax, tripType: "oneway", timestamp: Date.now() };
    localStorage.setItem("yatralo-booking-info", JSON.stringify(bookingData));

    const priceMultiplier = fareType === 'FLEX' ? 1.5 : (fareType === 'CLASSIC' ? 1.2 : 1);
    const updatedFlight = {
      ...flight,
      price: Math.round(flight.perPax * priceMultiplier * pax),
      fareType: fareType,
      pax
    };

    localStorage.setItem("yatralo-selected-flight", JSON.stringify(updatedFlight));
    navigate("/booking-selection");
  };

  const toggleFilter = (list, item, setter) => {
    if (list.includes(item)) {
      setter(list.filter(i => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  const airlineLogoCodes = { "IndiGo": "6E", "Air India": "AI", "Vistara": "UK", "SpiceJet": "SG" };

  return (
    <div className="min-h-screen bg-[#f2f2f2] font-sans pb-20">
      
      {/* Top Search Sticky Bar (MMT Style) */}
      <section className="bg-[#031b34] pt-20 pb-4 px-6 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
           <div className="flex bg-white/10 rounded-lg p-1 flex-1">
              <div className="px-4 py-1 border-r border-white/10 flex-1">
                 <p className="text-[10px] text-blue-300 font-bold uppercase">From</p>
                 <p className="text-sm font-bold text-white">{from}</p>
              </div>
              <div className="px-4 py-1 border-r border-white/10 flex-1">
                 <p className="text-[10px] text-blue-300 font-bold uppercase">To</p>
                 <p className="text-sm font-bold text-white">{to}</p>
              </div>
              <div className="px-4 py-1 border-r border-white/10 flex-1">
                 <p className="text-[10px] text-blue-300 font-bold uppercase">Departure Date</p>
                 <p className="text-sm font-bold text-white">{date}</p>
              </div>
              <div className="px-4 py-1 flex-1">
                 <p className="text-[10px] text-blue-300 font-bold uppercase">Travellers</p>
                 <p className="text-sm font-bold text-white">{pax} Adult{pax>1?'s':''}</p>
              </div>
           </div>
           <button onClick={() => navigate("/")} className="text-[12px] font-bold text-white bg-[#008cff] px-6 py-2 rounded-full uppercase tracking-wide">Edit Search</button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col lg:grid lg:grid-cols-[250px_1fr] gap-6">
          
          {/* Sidebar Filter Panel (MMT Style) */}
          <aside className="space-y-4">
             <div className="bg-white rounded shadow-sm border border-[#e7e7e7] p-5">
                <div className="flex items-center justify-between mb-6 border-b border-[#f2f2f2] pb-2">
                   <h3 className="text-[14px] font-bold text-[#222]">Filters</h3>
                   <button onClick={() => { setMaxPrice(50000); setStops([]); setAirlines([]); setDepTime([]); setRefundableOnly(false); }} className="text-[12px] text-[#008cff] hover:underline">CLEAR ALL</button>
                </div>

                <div className="space-y-8">
                   {/* Stops */}
                   <div>
                      <p className="text-[12px] font-bold text-[#222] mb-3">Popular Filters</p>
                      <div className="space-y-2">
                         {[
                           { val: 0, label: "Non Stop" },
                           { val: 1, label: "1 Stop" },
                         ].map(s => (
                           <label key={s.val} className="flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" checked={stops.includes(s.val)} onChange={() => toggleFilter(stops, s.val, setStops)} className="w-4 h-4 rounded border-[#e7e7e7]" />
                              <span className="text-[12px] text-[#4a4a4a]">{s.label}</span>
                           </label>
                         ))}
                         <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={refundableOnly} onChange={() => setRefundableOnly(!refundableOnly)} className="w-4 h-4 rounded border-[#e7e7e7]" />
                            <span className="text-[12px] text-[#4a4a4a]">Refundable</span>
                         </label>
                      </div>
                   </div>

                   {/* Price Slider */}
                   <div>
                      <p className="text-[12px] font-bold text-[#222] mb-3">One Way Price</p>
                      <input type="range" min="3000" max="50000" step="1000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full h-1 bg-[#e7e7e7] appearance-none cursor-pointer accent-[#008cff]" />
                      <div className="flex justify-between mt-2 text-[10px] text-[#4a4a4a] font-bold">
                         <span>₹ 3,000</span>
                         <span>₹ {maxPrice.toLocaleString()}</span>
                      </div>
                   </div>

                   {/* Time Windows */}
                   <div>
                      <p className="text-[12px] font-bold text-[#222] mb-3">Departure From {from}</p>
                      <div className="grid grid-cols-2 gap-2">
                         {[
                           { id: 'morning', label: 'Before 11 AM', icon: Clock },
                           { id: 'afternoon', label: '11 AM - 6 PM', icon: Coffee },
                           { id: 'evening', label: '6 PM - 11 PM', icon: Compass },
                           { id: 'night', label: 'After 11 PM', icon: Sparkles },
                         ].map(t => {
                           const active = depTime.includes(t.id);
                           return (
                             <button key={t.id} onClick={() => toggleFilter(depTime, t.id, setDepTime)} className={`flex flex-col items-center gap-1 p-2 rounded border transition-all ${active ? 'bg-blue-50 border-[#008cff]' : 'bg-white border-[#e7e7e7] hover:border-[#008cff]'}`}>
                                <t.icon size={14} className={active ? 'text-[#008cff]' : 'text-[#4a4a4a]'} />
                                <span className={`text-[9px] font-bold ${active ? 'text-[#008cff]' : 'text-[#4a4a4a]'}`}>{t.label}</span>
                             </button>
                           );
                         })}
                      </div>
                   </div>

                   {/* Airlines */}
                   <div>
                      <p className="text-[12px] font-bold text-[#222] mb-3">Airlines</p>
                      <div className="space-y-2">
                         {["IndiGo", "Air India", "Vistara", "SpiceJet"].map(air => (
                           <label key={air} className="flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" checked={airlines.includes(air)} onChange={() => toggleFilter(airlines, air, setAirlines)} className="w-4 h-4 rounded border-[#e7e7e7]" />
                              <span className="text-[12px] text-[#4a4a4a]">{air}</span>
                           </label>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </aside>

          {/* Results Area */}
          <main className="space-y-4">
             <h2 className="text-xl font-bold text-[#222]">Flights from {from} to {to}</h2>
             
             {/* Date Price Strip (MMT Style) */}
             <div className="bg-white rounded shadow-sm border border-[#e7e7e7] overflow-hidden flex items-center">
                <div className="flex-1 flex overflow-x-auto no-scrollbar shadow-inner">
                   {Array.from({ length: 7 }).map((_, i) => {
                     const d = new Date(searchParamsState.date);
                     d.setDate(d.getDate() + i - 3);
                     if (d < new Date(today)) return <div key={i} className="flex-1 min-w-[100px] bg-slate-50 opacity-10" />;
                     const active = d.toISOString().split("T")[0] === searchParamsState.date;
                     return (
                       <button
                         key={i}
                         onClick={() => { setDate(d.toISOString().split("T")[0]); handleSearch(); }}
                         className={`flex-1 min-w-[100px] py-2 text-center transition-all border-r border-[#f2f2f2] ${active ? 'bg-blue-50 border-b-2 border-b-[#008cff]' : 'hover:bg-slate-50'}`}
                       >
                          <p className="text-[10px] text-[#4a4a4a] font-bold uppercase">{d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</p>
                          <p className={`text-[12px] font-black ${active ? 'text-[#008cff]' : 'text-[#222]'}`}>₹{(4500 + i * 200).toLocaleString()}</p>
                       </button>
                     );
                   })}
                </div>
             </div>

             {/* Top Sort (MMT Style) */}
             <div className="bg-[#f4f4f4] rounded flex flex-col md:flex-row items-center border border-[#e7e7e7]">
                <div className="p-3 text-[12px] font-bold text-[#4a4a4a] flex-1">SORT BY:</div>
                <div className="flex flex-1 w-full">
                  {[
                    { id: 'dep', label: 'Departure' },
                    { id: 'duration', label: 'Duration' },
                    { id: 'arr', label: 'Arrival' },
                    { id: 'price', label: 'Price' },
                  ].map(s => {
                    const active = sortBy === s.id;
                    return (
                      <button key={s.id} onClick={() => setSortBy(s.id)} className={`flex-1 py-3 px-4 text-[12px] font-bold transition-all border-l border-[#e7e7e7] ${active ? 'bg-white text-[#008cff] border-t-2 border-t-[#008cff]' : 'text-[#222] hover:bg-white'}`}>
                        {s.label} {active && (sortBy === 'price' ? '↑' : '↓')}
                      </button>
                    );
                  })}
                </div>
             </div>

             {/* Flight List */}
             <div className="space-y-4">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-32 bg-white rounded shadow-sm border border-[#e7e7e7] animate-pulse" />
                  ))
                ) : results.length > 0 ? (
                  results.map((f) => (
                    <FlightCard key={f.id} flight={f} pax={pax} onViewPrices={(fl) => { setSelectedFlightForFare(fl); setShowFareModal(true); }} />
                  ))
                ) : (
                  <div className="text-center py-20 bg-white rounded shadow-sm border border-[#e7e7e7]">
                    <Plane size={40} className="mx-auto mb-4 text-[#e7e7e7]" />
                    <h3 className="text-lg font-bold text-[#222]">No Flights Found</h3>
                    <p className="text-[12px] text-[#4a4a4a] mt-1">Try resetting your filters or changing dates.</p>
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

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={() => setIsAuthModalOpen(false)}
      />

    </div>
  );
}
