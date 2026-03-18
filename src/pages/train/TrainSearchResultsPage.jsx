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
  ArrowRightLeft
} from "lucide-react";
import toast from "react-hot-toast";

const TrainCard = ({ t, index, onBook }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-6 hover:border-[#7c3aed]/30 transition-all group"
  >
    <div className="flex flex-wrap items-center justify-between gap-6">
      <div className="flex items-center gap-4 min-w-[200px]">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600">
           <Train size={28} />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900 leading-tight">{t.name}</h3>
          <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">#{t.trainNo} • {t.class}</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center gap-10">
        <div className="text-center">
          <p className="text-2xl font-black text-slate-900">{t.depTime}</p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{t.from}</p>
        </div>
        <div className="flex flex-col items-center flex-1 max-w-[120px]">
          <p className="text-[10px] font-black text-slate-400 mb-2">{t.duration}</p>
          <div className="w-full h-px bg-slate-100 relative">
             <div className="absolute top-1/2 left-0 w-1 h-1 rounded-full bg-slate-300 -translate-y-1/2" />
             <div className="absolute top-1/2 right-0 w-1 h-1 rounded-full bg-slate-300 -translate-y-1/2" />
             <Train size={12} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#7c3aed]" />
          </div>
          <p className="text-[10px] font-black text-emerald-500 mt-2">DLY</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-black text-slate-900">{t.arrTime}</p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{t.to}</p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="text-right">
          <p className="text-3xl font-black text-[#f97316]">₹{t.price}</p>
          <div className="flex items-center justify-end gap-1 mt-1">
             <Star size={12} className="fill-amber-400 text-amber-400" />
             <span className="text-xs font-black text-slate-600">{t.rating}</span>
          </div>
        </div>
        <button 
          onClick={() => onBook(t)}
          className="px-8 py-4 bg-slate-900 hover:bg-black text-white font-black text-sm rounded-2xl uppercase tracking-widest shadow-xl shadow-slate-200 hover:scale-105 transition-all"
        >
          Book Now
        </button>
      </div>
    </div>

    <div className="flex items-center gap-6 mt-6 pt-6 border-t border-slate-50">
       <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
          <Coffee size={12} className="text-[#f97316]" /> Catering Available
       </div>
       <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
          <ShieldCheck size={12} className="text-[#7c3aed]" /> Verified Express
       </div>
       <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
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

  const from = searchParams.get("from") || "DEL";
  const to = searchParams.get("to") || "BOM";
  const date = searchParams.get("date") || "Today";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Sticky Filter Header */}
      <section className="bg-white border-b border-slate-200 py-6 px-6 sticky top-20 z-40 shadow-sm">
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

      <div className="max-w-7xl mx-auto px-6 py-10">
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
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Tracking live trains...</h3>
                <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-xs">Finding matches for your journey</p>
             </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-5xl mx-auto">
             <div className="flex items-center justify-between mb-8">
                <div>
                   <h2 className="text-3xl font-black text-slate-900 tracking-tight">Available Trains</h2>
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Confirmed availability for {date}</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-[#7c3aed] transition-all">
                   <Filter size={14} /> Refine List
                </button>
             </div>
             {MOCK_TRAINS.map((t, i) => (
                <TrainCard 
                  key={i} 
                  t={{...t, from, to}} 
                  index={i} 
                  onBook={(train) => {
                    toast.success("Proceeding to passenger details");
                    navigate("/booking-selection", {
                      state: {
                        type: "train",
                        train: train,
                        from,
                        to,
                        fromName: from,
                        toName: to,
                        date,
                        pax: Number(searchParams.get("pax")) || 1,
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
