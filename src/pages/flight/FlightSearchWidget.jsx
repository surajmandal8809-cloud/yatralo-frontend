import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Plane, 
  Search, 
  ChevronRight, 
  X, 
  ChevronDown, 
  ArrowRightLeft,
  Briefcase,
  History,
  TrendingUp,
  CreditCard,
  ShieldCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLazySearchAirportsQuery, useGetAirportsQuery } from "../../services/flightService";
import toast from "react-hot-toast";

const FlightSearchWidget = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState("one-way"); // one-way, round-trip, multi-city
  const [activeModal, setActiveModal] = useState(null); // 'from', 'to', 'date', 'travellers'
  
  const [from, setFrom] = useState({ iata: "DEL", city: "Delhi", name: "Indira Gandhi Intl Airport" });
  const [to, setTo] = useState({ iata: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Intl Airport" });
  const [departureDate, setDepartureDate] = useState(new Date().toISOString().split("T")[0]);
  const [returnDate, setReturnDate] = useState("");
  const [travellers, setTravellers] = useState({ adults: 1, children: 0, infants: 0, class: "Economy" });

  const [searchQuery, setSearchQuery] = useState("");
  const [trigger, { data: searchData, isFetching }] = useLazySearchAirportsQuery();
  const { data: defaultAirports } = useGetAirportsQuery();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length >= 2) {
      trigger(e.target.value);
    }
  };

  const handleSelectAirport = (airport) => {
    if (activeModal === "from") {
      setFrom(airport);
    } else {
      setTo(airport);
    }
    setActiveModal(null);
    setSearchQuery("");
  };

  const swapCities = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearchFlights = () => {
    const params = new URLSearchParams();
    params.append("from", from.iata);
    params.append("to", to.iata);
    params.append("date", departureDate);
    if (tripType === "round-trip" && returnDate) {
      params.append("returnDate", returnDate);
    }
    params.append("pax", travellers.adults + travellers.children + travellers.infants);
    params.append("class", travellers.class);
    params.append("autoSearch", "1");
    
    navigate(`/flights/results?${params.toString()}`);
  };

  const recentSearches = [
    { iata: "BLR", city: "Bengaluru", name: "Kempegowda Intl Airport" },
    { iata: "DXB", city: "Dubai", name: "Dubai Intl Airport" },
  ];

  const popularCities = defaultAirports?.data?.slice(0, 5) || [
    { iata: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Intl Airport" },
    { iata: "DEL", city: "Delhi", name: "Indira Gandhi Intl Airport" },
    { iata: "BLR", city: "Bengaluru", name: "Kempegowda Intl Airport" },
    { iata: "MAA", city: "Chennai", name: "Chennai Intl Airport" },
    { iata: "CCU", city: "Kolkata", name: "Netaji Subhash Chandra Bose Intl Airport" },
  ];

  const airportResults = searchQuery.length >= 2 ? (searchData?.data || []) : popularCities;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 -mt-24 relative z-20">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-200/50 p-1 md:p-2 border border-slate-100">
        
        {/* Trip Type Tabs */}
        <div className="flex items-center gap-2 p-3 pb-0">
          {[
            { id: "one-way", label: "One-way", icon: Plane },
            { id: "round-trip", label: "Round trip", icon: ArrowRightLeft },
            { id: "multi-city", label: "Multi-city", icon: MapPin },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTripType(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                tripType === tab.id 
                ? "bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white shadow-lg shadow-orange-100" 
                : "bg-transparent text-slate-500 hover:bg-slate-50"
              }`}
            >
              <tab.icon size={14} strokeWidth={3} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Search Panel */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 gap-1 mt-2 p-1 md:p-2 bg-slate-50 rounded-[2rem]">
          {/* FROM */}
          <div className="lg:col-span-2 relative group md:border-r border-slate-200/50">
            <button
              onClick={() => setActiveModal("from")}
              className="w-full h-24 p-5 text-left bg-white hover:bg-indigo-50/30 transition-all rounded-l-[1.8rem] flex flex-col justify-center"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">From</p>
              <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors uppercase">{from.city}</h3>
              <p className="text-[10px] font-black text-slate-500 truncate mt-0.5">{from.iata}, {from.name}</p>
            </button>
            <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-10">
              <button 
                onClick={swapCities}
                className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:rotate-180 transition-all duration-500"
              >
                <ArrowRightLeft size={14} />
              </button>
            </div>
          </div>

          {/* TO */}
          <div className="lg:col-span-2 relative group md:border-r border-slate-200/50">
            <button
              onClick={() => setActiveModal("to")}
              className="w-full h-24 p-5 text-left bg-white hover:bg-indigo-50/30 transition-all flex flex-col justify-center"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">To</p>
              <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors uppercase">{to.city}</h3>
              <p className="text-[10px] font-black text-slate-500 truncate mt-0.5">{to.iata}, {to.name}</p>
            </button>
          </div>

          {/* DEPARTURE */}
          <div className="lg:col-span-2 relative group md:border-r border-slate-200/50">
            <button
              onClick={() => setActiveModal("date")}
              className="w-full h-24 p-5 text-left bg-white hover:bg-indigo-50/30 transition-all flex flex-col justify-center"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Departure</p>
              <h3 className="text-2xl font-black text-slate-900 leading-tight flex items-baseline gap-1">
                {new Date(departureDate).getDate()}{" "}
                <span className="text-sm font-bold text-slate-500">{new Date(departureDate).toLocaleDateString(undefined, { month: 'short', year: '2-digit' })}</span>
              </h3>
              <p className="text-[10px] font-black text-slate-500 mt-0.5 uppercase tracking-widest">{new Date(departureDate).toLocaleDateString(undefined, { weekday: 'long' })}</p>
            </button>
          </div>

          {/* RETURN */}
          <div className="lg:col-span-2 relative group md:border-r border-slate-200/50">
            <button
              onClick={() => {
                setTripType("round-trip");
                setActiveModal("date");
              }}
              className={`w-full h-24 p-5 text-left bg-white hover:bg-indigo-50/30 transition-all flex flex-col justify-center ${tripType === "one-way" ? "opacity-60" : ""}`}
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Return</p>
              {tripType === "one-way" ? (
                <p className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em] mt-1">Book a Round Trip for Savings</p>
              ) : (
                <>
                  <h3 className="text-2xl font-black text-slate-900 leading-tight flex items-baseline gap-1">
                    {returnDate ? new Date(returnDate).getDate() : "--"}{" "}
                    <span className="text-sm font-bold text-slate-500">{returnDate ? new Date(returnDate).toLocaleDateString(undefined, { month: 'short', year: '2-digit' }) : ""}</span>
                  </h3>
                  <p className="text-[10px] font-black text-slate-500 mt-0.5 uppercase tracking-widest">{returnDate ? new Date(returnDate).toLocaleDateString(undefined, { weekday: 'long' }) : "Select date"}</p>
                </>
              )}
            </button>
          </div>

          {/* TRAVELLERS */}
          <div className="lg:col-span-2 relative group">
            <button
              onClick={() => setActiveModal("travellers")}
              className="w-full h-24 p-5 text-left bg-white hover:bg-indigo-50/30 transition-all md:rounded-r-[1.8rem] flex flex-col justify-center"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Travellers & Class</p>
              <h3 className="text-2xl font-black text-slate-900 leading-tight">
                {travellers.adults + travellers.children + travellers.infants} <span className="text-sm font-bold text-slate-500">Traveler</span>
              </h3>
              <p className="text-[10px] font-black text-slate-500 mt-0.5 truncate uppercase tracking-widest">{travellers.class}</p>
            </button>
          </div>
        </div>

        {/* Search CTA */}
        <div className="flex justify-center -mb-8 relative z-30">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearchFlights}
            className="px-12 py-5 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-full font-black text-lg uppercase tracking-[0.2em] shadow-2xl shadow-orange-200 flex items-center gap-3"
          >
            Search Flights <Search size={24} strokeWidth={3} />
          </motion.button>
        </div>
      </div>

      {/* Autocomplete Modal */}
      <AnimatePresence>
        {(activeModal === "from" || activeModal === "to") && (
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
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Select Origin City</h3>
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
                    onChange={handleSearchChange}
                    placeholder="Search by city or airport..."
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
                      {recentSearches.map((city) => (
                        <button
                          key={city.iata}
                          onClick={() => handleSelectAirport(city)}
                          className="w-full flex items-center gap-4 group text-left"
                        >
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            <Plane size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-800 tracking-tight">{city.city}</p>
                            <p className="text-[10px] font-bold text-slate-400">{city.iata}, {city.name}</p>
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
                      {airportResults.map((city) => (
                        <button
                          key={city.iata}
                          onClick={() => handleSelectAirport(city)}
                          className="w-full flex items-center gap-4 group text-left"
                        >
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            <MapPin size={18} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-black text-slate-800 tracking-tight">{city.city}</p>
                              <span className="text-[10px] font-black bg-slate-50 text-indigo-600 px-2 py-0.5 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all">{city.iata}</span>
                            </div>
                            <p className="text-[10px] font-bold text-slate-400">{city.name}</p>
                          </div>
                        </button>
                      ))}
                      {isFetching && <div className="text-center py-4 text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Searching Airports...</div>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-6 flex items-center gap-6 overflow-x-auto no-scrollbar">
                 <div className="flex-shrink-0 flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-200 pr-6">
                    Special Fares Available
                 </div>
                 {["Student", "Senior Citizen", "Armed Forces", "Doctors"].map((fare) => (
                   <button key={fare} className="flex-shrink-0 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-all uppercase tracking-widest">
                     {fare}
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
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Select Dates</h3>
                  <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mt-1">Found lowest fares for next 30 days</p>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-indigo-50 border-2 border-indigo-600 rounded-2xl">
                  <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">Departure</p>
                  <p className="text-lg font-black text-slate-900">{new Date(departureDate).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div className={`p-4 rounded-2xl border-2 transition-all ${tripType === 'round-trip' ? 'bg-white border-slate-200 cursor-pointer' : 'bg-slate-50 border-slate-100 opacity-50'}`}>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Return</p>
                  <p className="text-lg font-black text-slate-900">{returnDate ? new Date(returnDate).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }) : "Select Return"}</p>
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
                         const isSelected = day === new Date(departureDate).getDate();
                         const randomPrice = 4000 + (day * 150);
                         return (
                           <button
                             key={day}
                             onClick={() => {
                               const d = new Date();
                               d.setDate(day);
                               setDepartureDate(d.toISOString().split("T")[0]);
                             }}
                             className={`relative h-14 flex flex-col items-center justify-center rounded-xl transition-all ${
                               isSelected ? "bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white shadow-lg shadow-orange-100" : "bg-white hover:bg-indigo-50"
                             }`}
                           >
                             <span className="text-sm font-black">{day}</span>
                             <span className={`text-[8px] font-bold ${isSelected ? "text-indigo-100" : "text-green-500"}`}>₹{randomPrice}</span>
                           </button>
                         );
                       })}
                    </div>
                 </div>

                 <button 
                  onClick={() => setActiveModal(null)}
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-100"
                 >
                   Done
                 </button>
              </div>
            </motion.div>
          </>
        )}

        {/* Travellers Modal */}
        {activeModal === "travellers" && (
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
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Travellers & Class</h3>
                <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { id: 'adults', label: 'Adults', desc: '12+ Years' },
                    { id: 'children', label: 'Children', desc: '2-12 Years' },
                    { id: 'infants', label: 'Infants', desc: 'Below 2 Years' },
                  ].map((type) => (
                    <div key={type.id} className="text-center">
                      <p className="text-sm font-black text-slate-800">{type.label}</p>
                      <p className="text-[10px] font-bold text-slate-400 block mb-3">{type.desc}</p>
                      <div className="flex items-center justify-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <button 
                          onClick={() => setTravellers(p => ({ ...p, [type.id]: Math.max(type.id === 'adults' ? 1 : 0, p[type.id] - 1) }))}
                          className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-900 shadow-sm disabled:opacity-30"
                          disabled={type.id === 'adults' ? travellers.adults <= 1 : travellers[type.id] <= 0}
                        >-</button>
                        <span className="text-lg font-black text-slate-900 min-w-4">{travellers[type.id]}</span>
                        <button 
                          onClick={() => setTravellers(p => ({ ...p, [type.id]: Math.min(9, p[type.id] + 1) }))}
                          className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#f97316] flex items-center justify-center text-white shadow-lg shadow-orange-100"
                        >+</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-slate-100">
                   <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Choose Cabin Class</p>
                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                     {["Economy", "Premium Economy", "Business", "First Class"].map((cls) => (
                       <button
                         key={cls}
                         onClick={() => setTravellers(p => ({ ...p, class: cls }))}
                         className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                           travellers.class === cls 
                           ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" 
                           : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-transparent"
                         }`}
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
                    <p className="text-sm font-black text-slate-900">Group Booking</p>
                    <p className="text-[10px] font-bold text-slate-500">Book for more than 9 travellers</p>
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

export default FlightSearchWidget;
