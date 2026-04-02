import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Train,
  MapPin,
  Calendar,
  Users,
  Star,
  Search,
  ArrowRight,
  TrendingDown,
  Clock,
  Zap,
  Coffee,
  ShieldCheck,
  ChevronRight,
  Filter,
  ArrowRightLeft,
  X
} from "lucide-react";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const TrainCard = ({ t, index, onBook }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-4 md:p-6 hover:border-[#7c3aed]/30 transition-all group"
  >
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600 shrink-0">
           <Train size={24} className="md:w-7 md:h-7" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight">{t.name}</h3>
          <p className="text-[10px] md:text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">#{t.trainNo} • {t.class}</p>
        </div>
        <div className="md:hidden text-right">
           <p className="text-xl font-black text-[#f97316]">₹{t.price}</p>
           <div className="flex items-center justify-end gap-1 mt-0.5">
              <Star size={10} className="fill-amber-400 text-amber-400" />
              <span className="text-[10px] font-black text-slate-600">{t.rating}</span>
           </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-between md:justify-center gap-4 md:gap-10 py-4 md:py-0 border-y md:border-y-0 border-slate-50">
        <div className="text-left md:text-center">
          <p className="text-xl md:text-2xl font-black text-slate-900">{t.depTime}</p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{t.from}</p>
        </div>
        <div className="flex flex-col items-center flex-1 max-w-[80px] md:max-w-[120px]">
          <p className="text-[8px] md:text-[10px] font-black text-slate-400 mb-2">{t.duration}</p>
          <div className="w-full h-px bg-slate-100 relative">
             <div className="absolute top-1/2 left-0 w-1 h-1 rounded-full bg-slate-300 -translate-y-1/2" />
             <div className="absolute top-1/2 right-0 w-1 h-1 rounded-full bg-slate-300 -translate-y-1/2" />
             <Train size={12} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#7c3aed]" />
          </div>
          <p className="text-[9px] md:text-[10px] font-black text-emerald-500 mt-2">DLY</p>
        </div>
        <div className="text-right md:text-center">
          <p className="text-xl md:text-2xl font-black text-slate-900">{t.arrTime}</p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{t.to}</p>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-8">
        <div className="hidden md:block text-right">
          <p className="text-3xl font-black text-[#f97316]">₹{t.price}</p>
          <div className="flex items-center justify-end gap-1 mt-1">
             <Star size={12} className="fill-amber-400 text-amber-400" />
             <span className="text-xs font-black text-slate-600">{t.rating}</span>
          </div>
        </div>
        <button 
          onClick={() => onBook(t)}
          className="w-full md:w-auto px-10 py-4 bg-slate-900 hover:bg-black text-white font-black text-xs md:text-sm rounded-2xl uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all"
        >
          Book
        </button>
      </div>
    </div>

    <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-slate-50">
       <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">
          <Coffee size={12} className="text-[#f97316]" /> Catering
       </div>
       <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">
          <ShieldCheck size={12} className="text-[#7c3aed]" /> Verified
       </div>
       <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg ml-auto md:ml-0">
          AVAILABLE • 45 SEATS
       </div>
    </div>
  </motion.div>
);

const MOCK_TRAINS = [
  { name: "Shatabdi Express", trainNo: "12002", depTime: "06:00", arrTime: "11:45", duration: "5h 45m", rating: "4.7", price: 1250, class: "Chair Car" },
  { name: "Rajdhani Express", trainNo: "12423", depTime: "16:30", arrTime: "21:10", duration: "4h 40m", rating: "4.9", price: 2400, class: "3A Sleeper" },
  { name: "Vande Bharat", trainNo: "22436", depTime: "15:00", arrTime: "19:00", duration: "4h 00m", rating: "4.8", price: 1850, class: "Executive CC" },
  { name: "Duronto Express", trainNo: "12259", depTime: "22:15", arrTime: "08:30", duration: "10h 15m", rating: "4.5", price: 3200, class: "2A Sleeper" },
];

export default function TrainSearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const from = searchParams.get("from") || "DEL";
  const to = searchParams.get("to") || "BOM";
  const date = searchParams.get("date") || "Today";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-16 md:pt-20 pb-20">
      
      {/* Mobile Sticky Summary */}
      <div className="md:hidden sticky top-16 z-40 bg-[#1a2232] px-4 py-3 border-b border-white/5 flex items-center justify-between shadow-lg" onClick={() => setShowMobileSearch(true)}>
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-lg">
               <Train size={20} />
            </div>
            <div>
               <p className="text-sm font-black text-white leading-none tracking-tight">{from} → {to}</p>
               <p className="text-[10px] font-bold text-white/50 mt-1.5 uppercase tracking-widest">{date} • 1 Traveler</p>
            </div>
         </div>
         <button className="text-white/40 p-2"><Search size={18} /></button>
      </div>

      {/* Premium Loader Overlay */}


      {/* Desktop Sticky Filter Header */}
      <section className="hidden md:block bg-white border-b border-slate-200 py-6 px-6 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px] bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-3">
             <Train size={18} className="text-[#7c3aed]" />
             <div className="flex items-center gap-4 flex-1">
               <div className="flex-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">From</p>
                  <p className="text-sm font-black text-slate-900">{from}</p>
               </div>
               <ArrowRightLeft size={14} className="text-slate-300" />
               <div className="flex-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">To</p>
                  <p className="text-sm font-black text-slate-900">{to}</p>
               </div>
             </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 flex items-center gap-4">
             <Calendar size={18} className="text-[#f97316]" />
             <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</p>
               <p className="text-sm font-black text-slate-900">{date}</p>
             </div>
          </div>
          <button onClick={() => navigate("/trains")} className="ml-auto px-10 py-4 bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white font-black text-xs rounded-2xl uppercase tracking-widest shadow-xl shadow-violet-100 hover:scale-105 transition-all">
             New Search
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
               <h3 className="text-2xl font-black text-slate-950 italic uppercase mb-8">Modify Search</h3>
               
               <div className="space-y-6">
                  <div className="flex flex-col gap-1.5 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Route Selection</p>
                     <div className="flex items-center gap-4">
                        <p className="text-lg font-black text-slate-900">{from} <span className="text-slate-300 mx-2">→</span> {to}</p>
                     </div>
                  </div>
                  <div className="flex flex-col gap-1.5 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Travel Timeline</p>
                     <p className="text-lg font-black text-slate-900">{date}</p>
                  </div>
                  <button onClick={() => navigate("/trains")} className="w-full h-16 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-2xl text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-violet-100 mt-4">New Exploration</button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-8">
             <div className="relative w-48 h-12">
                <motion.div 
                   initial={{ x: -100 }}
                   animate={{ x: 200 }}
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   className="text-[#7c3aed]"
                >
                   <Train size={48} />
                </motion.div>
                <div className="absolute inset-0 flex items-center">
                   <div className="w-full h-1 bg-slate-200 rounded-full" />
                </div>
             </div>
             <div className="text-center">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Syncing Rail Matrix...</h3>
                <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-xs">Accessing government rail servers</p>
             </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-5xl mx-auto">
             <div className="flex items-center justify-between mb-4 md:mb-8 px-2">
                <div>
                   <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight italic uppercase">Live Trains</h2>
                   <p className="hidden md:block text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Confirmed availability for {date}</p>
                </div>
                <button onClick={() => setShowFilters(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-slate-200 text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500 hover:border-[#7c3aed] hover:text-[#7c3aed] transition-all bg-white">
                   <Filter size={14} /> <span className="hidden md:inline">Refine Matix</span><span className="md:hidden">Refine</span>
                </button>
             </div>

             <div className="grid grid-cols-1 gap-4 md:gap-6">
                {MOCK_TRAINS.map((t, i) => (
                   <TrainCard 
                     key={i} 
                     t={{...t, from, to}} 
                     index={i} 
                     onBook={(train) => {
                       toast.success("Proceeding to passenger details");
                       navigate("/trains/booking", {
                         state: {
                           train: train,
                           pax: Number(searchParams.get("pax")) || 1,
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
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Class Categories</p>
                     <div className="grid grid-cols-2 gap-3">
                        {["Sleeper", "3A AC", "2A AC", "1A AC", "Chair Car"].map(c => (
                           <button key={c} className="h-14 rounded-2xl border-2 border-slate-100 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-slate-600 hover:border-[#7c3aed] hover:text-[#7c3aed] transition-all">{c}</button>
                        ))}
                     </div>
                  </div>
                  
                  <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Departure Timeline</p>
                     <div className="grid grid-cols-4 gap-2">
                        {["6am", "12pm", "6pm", "12am"].map(t => (
                           <button key={t} className="h-12 rounded-xl bg-slate-50 flex flex-col items-center justify-center border border-slate-100">
                              <span className="text-[10px] font-black text-slate-900">{t}</span>
                           </button>
                        ))}
                     </div>
                  </div>

                  <button onClick={() => setShowFilters(false)} className="w-full h-16 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl mt-4">Calibrate Matrix</button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
