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
  ArrowRightLeft
} from "lucide-react";
import toast from "react-hot-toast";

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
    className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-6 hover:border-[#7c3aed]/30 transition-all group"
  >
    <div className="flex flex-wrap items-center justify-between gap-6">
      <div className="flex items-center gap-4 min-w-[200px]">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg`} style={{ background: bus.bg }}>
           <Bus size={28} />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900 leading-tight">{bus.operator}</h3>
          <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">{bus.type}</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center gap-10">
        <div className="text-center">
          <p className="text-2xl font-black text-slate-900">{bus.depTime}</p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{bus.from}</p>
        </div>
        <div className="flex flex-col items-center flex-1 max-w-[120px]">
          <p className="text-[10px] font-black text-slate-400 mb-2">{bus.duration}</p>
          <div className="w-full h-px bg-slate-100 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-200" />
          </div>
          <p className="text-[10px] font-black text-emerald-500 mt-2">DIRECT</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-black text-slate-900">{bus.arrTime}</p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{bus.to}</p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="text-right">
          <p className="text-3xl font-black text-[#f97316]">₹{bus.price}</p>
          <div className="flex items-center justify-end gap-1 mt-1">
             <Star size={12} className="fill-amber-400 text-amber-400" />
             <span className="text-xs font-black text-slate-600">{bus.rating}</span>
          </div>
        </div>
        <button 
          onClick={() => onBook(bus)}
          className="px-8 py-4 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-black text-sm rounded-2xl uppercase tracking-widest shadow-xl shadow-violet-100 hover:scale-105 transition-all"
        >
          Select Seat
        </button>
      </div>
    </div>

    <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-50">
       <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-wider">
          <Zap size={12} className="text-[#f97316]" /> Live Tracking
       </div>
       <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-wider">
          <Coffee size={12} className="text-[#7c3aed]" /> Snacks Provided
       </div>
       <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-wider">
          <ShieldCheck size={12} className="text-emerald-500" /> Sanitized
       </div>
       <span className="ml-auto text-[10px] font-black text-rose-500 bg-rose-50 px-2 py-1 rounded-lg">ONLY {bus.seats} SEATS LEFT</span>
    </div>
  </motion.div>
);

export default function BusSearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Sticky Header Filter */}
      <section className="bg-white border-b border-slate-200 py-6 px-6 sticky top-20 z-40 shadow-sm">
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

      <div className="max-w-7xl mx-auto px-6 py-10">
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
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Finding top rated buses...</h3>
                <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-xs">Comparing 100+ bus operators</p>
             </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-5xl mx-auto">
             <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Available Buses</h2>
                <div className="flex items-center gap-4">
                   <p className="text-sm font-bold text-slate-400">Sort by:</p>
                   <select className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-black text-slate-700 outline-none">
                      <option>Price: Low to High</option>
                      <option>Rating: High to Low</option>
                      <option>Arrival: Earlier First</option>
                   </select>
                </div>
             </div>
             {mockBuses.map((bus) => (
               <BusCard 
                 key={bus.id} 
                 bus={bus} 
                 onBook={(b) => {
                    toast.success(`Redirecting to seat selection for ${b.operator}`);
                    navigate("/booking-selection", {
                      state: {
                        type: "bus",
                        bus: b,
                        from: b.from,
                        to: b.to,
                        date: date,
                        pax: 1
                      }
                    });
                 }}
               />
             ))}
          </div>
        )}
      </div>
    </div>
  );
}
