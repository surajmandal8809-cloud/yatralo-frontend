import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  Bus, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Filter, 
  Search,
  ArrowRight,
  TrendingDown,
  Clock,
  Zap,
  Coffee,
  ShieldCheck,
  ChevronDown,
  ArrowRightLeft,
  X
} from "lucide-react";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const OPERATORS = [
  { name: "SRM Travels", type: "AC Sleeper", rating: "4.5", bg: "#7c3aed" },
  { name: "Zingbus", type: "Bharat Benz AC", rating: "4.8", bg: "#f97316" },
  { name: "Orange Travels", type: "Scania AC Multi-Axle", rating: "4.2", bg: "#ea580c" },
  { name: "VRL Travels", type: "Non-AC Sleeper", rating: "3.9", bg: "#4b5563" },
  { name: "IntrCity SmartBus", type: "Luxury AC Sleeper", rating: "4.9", bg: "#6d28d9" }
];

const BusCard = ({ bus, onBook }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-4 md:p-6 hover:border-[#7c3aed]/30 transition-all group"
  >
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0" style={{ background: bus.bg }}>
           <Bus size={24} className="md:w-7 md:h-7" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight">{bus.operator}</h3>
          <p className="text-[10px] md:text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">{bus.type}</p>
        </div>
        <div className="md:hidden text-right">
           <p className="text-xl font-black text-[#f97316]">₹{bus.price}</p>
           <div className="flex items-center justify-end gap-1 mt-0.5">
              <Star size={10} className="fill-amber-400 text-amber-400" />
              <span className="text-[10px] font-black text-slate-600">{bus.rating}</span>
           </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-between md:justify-center gap-4 md:gap-10 py-4 md:py-0 border-y md:border-y-0 border-slate-50">
        <div className="text-left md:text-center">
          <p className="text-xl md:text-2xl font-black text-slate-900">{bus.depTime}</p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{bus.from}</p>
        </div>
        <div className="flex flex-col items-center flex-1 max-w-[80px] md:max-w-[120px]">
          <p className="text-[8px] md:text-[10px] font-black text-slate-400 mb-2">{bus.duration}</p>
          <div className="w-full h-px bg-slate-100 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-200" />
          </div>
          <p className="text-[9px] md:text-[10px] font-black text-emerald-500 mt-2">DIRECT</p>
        </div>
        <div className="text-right md:text-center">
          <p className="text-xl md:text-2xl font-black text-slate-900">{bus.arrTime}</p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{bus.to}</p>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-8">
        <div className="hidden md:block text-right">
          <p className="text-3xl font-black text-[#f97316]">₹{bus.price}</p>
          <div className="flex items-center justify-end gap-1 mt-1">
             <Star size={12} className="fill-amber-400 text-amber-400" />
             <span className="text-xs font-black text-slate-600">{bus.rating}</span>
          </div>
        </div>
        <button 
          onClick={() => onBook(bus)}
          className="w-full md:w-auto px-10 py-4 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-black text-xs md:text-sm rounded-2xl uppercase tracking-[0.2em] shadow-xl shadow-violet-100 active:scale-95 transition-all"
        >
          Select
        </button>
      </div>
    </div>

    <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-slate-50">
       <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">
          <Zap size={12} className="text-[#f97316]" /> Tracking
       </div>
       <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">
          <Coffee size={12} className="text-[#7c3aed]" /> Snacks
       </div>
       <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">
          <ShieldCheck size={12} className="text-emerald-500" /> Sanitized
       </div>
       <span className="ml-auto text-[8px] md:text-[10px] font-black text-rose-500 bg-rose-50 px-2 py-1 rounded-lg">ONLY {bus.seats} SEATS LEFT</span>
    </div>
  </motion.div>
);

export default function BusSearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const from = searchParams.get("from") || "Delhi";
  const to = searchParams.get("to") || "Jaipur";
  const date = searchParams.get("date") || new Date().toISOString().split('T')[0];

  const mockBuses = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const op = OPERATORS[i % OPERATORS.length];
      const h = 10 + Math.floor(i * 1.5);
      return {
        id: i,
        operator: op.name,
        type: op.type,
        rating: op.rating,
        bg: op.bg,
        depTime: `${h}:00`,
        arrTime: `${(h + 5) % 24}:30`,
        duration: "5h 30m",
        from,
        to,
        price: 499 + (i * 150),
        seats: Math.floor(Math.random() * 15) + 2
      };
    });
  }, [from, to]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-16 md:pt-20 pb-20">
      
      {/* Mobile Sticky Summary */}
      <div className="md:hidden sticky top-16 z-40 bg-[#1a2232] px-4 py-3 border-b border-white/5 flex items-center justify-between shadow-lg" onClick={() => setShowMobileSearch(true)}>
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-lg">
               <Bus size={20} />
            </div>
            <div>
               <p className="text-sm font-black text-white leading-none tracking-tight">{from} → {to}</p>
               <p className="text-[10px] font-bold text-white/50 mt-1.5 uppercase tracking-widest">{date} • 1 Traveler</p>
            </div>
         </div>
         <button className="text-white/40 p-2"><Search size={18} /></button>
      </div>

      {/* Premium Loader Overlay */}


      {/* Desktop Sticky Header Filter */}
      <section className="hidden md:block bg-white border-b border-slate-200 py-6 px-6 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px] bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-3">
             <MapPin size={16} className="text-[#7c3aed]" />
             <div>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Route</p>
               <p className="text-sm font-black text-slate-900">{from} → {to}</p>
             </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-3">
             <Calendar size={16} className="text-[#f97316]" />
             <div>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Travel Date</p>
               <p className="text-sm font-black text-slate-900">{date}</p>
             </div>
          </div>
          <button className="bg-violet-50 text-[#7c3aed] px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-violet-100 transition-all">
             <Filter size={14} /> Filter Buses
          </button>
          <button onClick={() => navigate("/buses")} className="ml-auto px-8 py-3 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white font-black text-xs rounded-xl uppercase tracking-widest shadow-lg shadow-violet-100">
             Modify Search
          </button>
        </div>
      </section>

      {/* Mobile Search Drawer */}
      <AnimatePresence>
        {showMobileSearch && (
          <div className="fixed inset-0 z-[60] flex flex-col md:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowMobileSearch(false)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="relative mt-auto bg-white rounded-t-[2.5rem] p-6 pb-10">
               <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-8" />
               <h3 className="text-2xl font-black text-slate-950 italic uppercase mb-8">Refine Search</h3>
               
               <div className="space-y-6">
                  <div className="flex flex-col gap-1.5 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Selected Route</p>
                     <p className="text-lg font-black text-slate-900">{from} <span className="text-slate-300 mx-2">→</span> {to}</p>
                  </div>
                  <div className="flex flex-col gap-1.5 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Journey Date</p>
                     <p className="text-lg font-black text-slate-900">{date}</p>
                  </div>
                  <button onClick={() => navigate("/buses")} className="w-full h-16 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-2xl text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-violet-100 mt-4">Redefine Route</button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-8">
             <div className="relative">
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                   className="w-32 h-32 border-4 border-dashed border-violet-200 rounded-full"
                />
                <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 1.5, repeat: Infinity }}
                   className="absolute inset-0 flex items-center justify-center text-[#7c3aed]"
                >
                   <Bus size={48} />
                </motion.div>
             </div>
             <div className="text-center">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Scanning Road Networks...</h3>
                <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-xs">Comparing 100+ bus operators</p>
             </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-5xl mx-auto">
             <div className="flex items-center justify-between mb-4 md:mb-8 px-2">
                <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight italic uppercase">Premium Buses</h2>
                <button onClick={() => setShowFilters(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-slate-200 text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500 hover:border-[#7c3aed] hover:text-[#7c3aed] transition-all bg-white">
                   <Filter size={14} /> <span className="hidden md:inline">Sort & Filter</span><span className="md:hidden">Filter</span>
                </button>
             </div>

             <div className="grid grid-cols-1 gap-4 md:gap-6">
                {mockBuses.map((bus) => (
                   <BusCard 
                     key={bus.id} 
                     bus={bus} 
                     onBook={(b) => {
                        toast.success(`Redirecting to seat selection for ${b.operator}`);
                        navigate("/buses/booking", {
                          state: {
                            bus: b,
                            pax: 1
                          }
                        });
                     }}
                   />
                ))}
             </div>
          </div>
        )}
      </div>

      {/* Mobile Filter Sheet */}
      <AnimatePresence>
        {showFilters && (
          <div className="fixed inset-0 z-[60] flex flex-col md:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFilters(false)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="relative mt-auto bg-white rounded-t-[2.5rem] p-8 pb-10">
               <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-8" />
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-black text-slate-950 italic uppercase">Filter Matrix</h3>
                  <button onClick={() => setShowFilters(false)} className="p-2 text-slate-400 hover:text-slate-950 transition-colors"><X size={24} /></button>
               </div>
               
               <div className="space-y-8">
                  <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Sort Parameters</p>
                     <div className="grid grid-cols-2 gap-3">
                        {["Price: Low First", "Rating: Top First", "Earlier Drops", "Later Drops"].map(c => (
                           <button key={c} className="h-14 rounded-2xl border-2 border-slate-100 px-4 flex items-center justify-center text-center text-[9px] font-black uppercase tracking-widest text-slate-600 hover:border-[#7c3aed] hover:text-[#7c3aed] transition-all">{c}</button>
                        ))}
                     </div>
                  </div>
                  
                  <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Bus Amenities</p>
                     <div className="flex flex-wrap gap-2">
                        {["AC", "Sleeper", "WiFi", "Water", "Snacks"].map(t => (
                           <button key={t} className="px-5 py-3 rounded-xl bg-slate-50 text-[10px] font-black uppercase tracking-widest border border-slate-100">{t}</button>
                        ))}
                     </div>
                  </div>

                  <button onClick={() => setShowFilters(false)} className="w-full h-16 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl mt-4">Execute Calibrations</button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
