import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, ChevronDown, ChevronUp, Zap, Wifi, Coffee, CheckCircle2, Users, Star } from "lucide-react";

const formatDuration = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h ? `${h}h ` : ""}${m}m`;
};

export default function FlightCard({ flight, pax, onViewPrices }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all overflow-hidden group"
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
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Airline Identity */}
          <div className="flex items-center gap-4 group cursor-pointer w-[250px]">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-black shadow-lg transform group-hover:rotate-6 transition-all" style={{ background: flight.bg }}>
              {flight.code}
            </div>
            <div>
              <p className="text-sm font-black text-slate-900 group-hover:text-[#7c3aed] transition-colors">{flight.airline}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">{flight.flightNo}</p>
              <button className="text-[10px] font-black text-[#7c3aed] uppercase mt-2 hover:underline">Add to compare +</button>
            </div>
          </div>

          {/* Departure */}
          <div className="text-center w-[100px]">
            <p className="text-2xl font-black text-slate-900 leading-none">{flight.dep}</p>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-2">{flight.originCity}</p>
          </div>

          {/* Route & Duration */}
          <div className="flex flex-col items-center flex-1 max-w-[200px]">
             <p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter mb-2">{formatDuration(flight.duration)}</p>
             <div className="w-full flex items-center gap-2">
                 <div className="h-px bg-slate-200 flex-1 border-t border-dashed" />
                 <Plane size={14} className="text-slate-300 transform rotate-90" />
                 <div className="h-px bg-slate-200 flex-1 border-t border-dashed" />
             </div>
             <p className="text-[9px] font-black text-slate-400 uppercase mt-2 tracking-widest">Non stop</p>
          </div>

          {/* Arrival */}
          <div className="text-center w-[100px]">
            <p className="text-2xl font-black text-slate-900 leading-none">{flight.arr}</p>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-2">{flight.destinationCity}</p>
          </div>

          {/* Price & Action */}
          <div className="flex items-center gap-6 border-l border-slate-100 pl-8 ml-auto">
             <div className="text-right">
                <div className="flex items-center justify-end gap-2 text-emerald-600 mb-1">
                   <Zap size={10} fill="currentColor" />
                   <span className="text-[10px] font-black uppercase tracking-widest">83% on time</span>
                </div>
                <p className="text-2xl font-black text-slate-900 leading-none">₹{flight.price.toLocaleString()}</p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">/adult</p>
             </div>
             <button
              onClick={() => onViewPrices(flight)}
              className="px-8 py-3 bg-white border-2 border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed] hover:text-white text-[11px] font-black rounded-full transition-all shadow-sm uppercase tracking-widest active:scale-95"
            >
              View Prices
            </button>
          </div>
        </div>
      </div>

        <div className="flex flex-wrap gap-2 mt-6">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600">
            <Zap size={10} className="text-yellow-500 fill-yellow-500" />
            {flight.status === 'scheduled' ? 'On Time' : flight.status.toUpperCase()}
          </span>
          {flight.wifi && <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600"><Wifi size={10} className="text-[#7c3aed]" /> Free Wifi</span>}
          {flight.meal && <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600"><Coffee size={10} className="text-orange-500" /> Meal Included</span>}
          {flight.refundable && <span className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-100 rounded-lg text-[10px] font-bold text-orange-600"><CheckCircle2 size={10} /> Refundable</span>}
          <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 ml-auto">
            <Users size={10} /> Only {flight.seats} seats left
          </span>
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
