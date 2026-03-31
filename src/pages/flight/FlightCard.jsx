import React, { useState } from "react";
import { 
  Plane, 
  Clock, 
  Briefcase, 
  Coffee, 
  Wifi, 
  Monitor, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  AlertCircle, 
  Wind,
  Zap,
  Luggage
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FlightCard = ({ flight, onViewPrices, pax = 1 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getAirlineLogo = (code) => {
    return `https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/${code}.png`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden font-sans group">
      
      {/* Main Card Content */}
      <div className="p-5 md:p-6 pb-2">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          
          {/* Airline Info */}
          <div className="flex items-center gap-4 min-w-[120px]">
             <div className="w-10 h-10 flex items-center justify-center p-1.5 bg-slate-50 rounded-lg group-hover:bg-slate-100 transition-colors">
                <img 
                  src={getAirlineLogo(flight.code)} 
                  alt={flight.airline} 
                  className="w-full h-full object-contain"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/6E.png"; }}
                />
             </div>
             <div>
                <p className="text-[12px] font-black text-slate-800 leading-tight mb-0.5">{flight.airline}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">{flight.flightNo}</p>
             </div>
          </div>

          {/* Time & Route Info */}
          <div className="flex-1 w-full grid grid-cols-3 gap-0">
             <div className="text-left flex flex-col justify-center">
                <p className="text-[20px] font-black text-slate-900 tracking-tighter leading-none mb-1">{flight.dep}</p>
                <p className="text-[12px] font-bold text-slate-400 truncate uppercase mt-1">{flight.origin}</p>
             </div>

             <div className="flex flex-col items-center justify-center px-4">
                <p className="text-[10px] text-slate-400 font-black mb-1.5 uppercase tracking-widest">{flight.durationStr}</p>
                <div className="w-full flex items-center gap-1.5">
                   <div className="h-[2px] bg-slate-100 flex-1 relative rounded-full">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-200" />
                   </div>
                </div>
                <p className={`text-[10px] mt-1.5 font-bold uppercase tracking-tight ${flight.stops === 0 ? 'text-emerald-500' : 'text-orange-500'}`}>
                   {flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
                </p>
             </div>

             <div className="text-right flex flex-col justify-center">
                <p className="text-[20px] font-black text-slate-900 tracking-tighter leading-none mb-1">{flight.arr}</p>
                <p className="text-[12px] font-bold text-slate-400 truncate uppercase mt-1">{flight.destination}</p>
             </div>
          </div>

          {/* Pricing & CTA */}
          <div className="flex items-center md:flex-col md:items-end gap-6 md:pl-10 md:border-l md:border-slate-100 min-w-[160px]">
             <div className="text-right md:mb-1">
                <div className="flex items-center justify-end gap-1.5 mb-0.5">
                   <span className="text-[18px] font-black text-slate-900 italic">₹{flight.price.toLocaleString()}</span>
                </div>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">per adult</p>
             </div>
             <button 
              onClick={() => onViewPrices(flight)}
              className="bg-gradient-to-r from-[#7c3aed] to-[#f97316] hover:saturate-150 active:scale-[0.98] text-white px-8 py-2.5 rounded-lg font-black text-[11px] uppercase tracking-widest transition-all shadow-md shadow-orange-100"
             >
                View Prices
             </button>
          </div>
        </div>

        {/* Footer Promo Line (from image) */}
        <div className="mt-6 py-2 px-1 border-t border-slate-50 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 italic">
                 <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></div>
                 Get Flat <span className="text-slate-600 font-black">12% off</span> on AXIS Bank Credit Cards using <span className="text-blue-500">MMTAXISFEST</span> | Flat ₹ 261 OFF using <span className="text-blue-500">MMTSUPER</span>
              </p>
           </div>
           <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[11px] font-black text-blue-500 hover:underline uppercase tracking-tight flex items-center gap-1"
           >
              Flight Details {isExpanded ? <ChevronUp size={14}/> : <ChevronDown size={14} />}
           </button>
        </div>
      </div>


      {/* Expanded Details Drawer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#f9f9f9] border-t border-[#e7e7e7] overflow-hidden"
          >
             <div className="p-6">
                <div className="bg-white rounded-lg border border-[#e7e7e7] overflow-hidden">
                   <div className="flex border-b border-[#e7e7e7]">
                      {['FLIGHT DETAILS', 'BAGGAGE', 'CANCELLATION', 'DATE CHANGE'].map((tab, idx) => (
                        <button key={tab} className={`px-6 py-3 text-[11px] font-bold tracking-wider ${idx === 0 ? 'text-[#008cff] border-b-2 border-[#008cff]' : 'text-[#4a4a4a]'}`}>{tab}</button>
                      ))}
                   </div>
                   <div className="p-6">
                      <div className="flex items-start gap-8">
                         <div className="flex flex-col items-center gap-2 text-[#4a4a4a]">
                            <img src={getAirlineLogo(flight.code)} className="w-6" alt="" />
                            <span className="text-[10px] whitespace-nowrap">{flight.airline}</span>
                            <span className="text-[10px]">{flight.flightNo}</span>
                         </div>
                         <div className="flex-1 space-y-6 relative pl-4 border-l-2 border-[#e7e7e7]">
                            <div className="flex items-center gap-12">
                               <div className="flex items-center gap-3">
                                  <span className="text-[14px] font-bold text-[#222]">{flight.dep}</span>
                                  <span className="text-[12px] text-[#4a4a4a]">{flight.origin} • {flight.originCity}</span>
                               </div>
                               <span className="text-[11px] text-[#4a4a4a]">{Math.floor(flight.duration / 60)}h {flight.duration % 60}m</span>
                               <div className="flex items-center gap-3">
                                  <span className="text-[14px] font-bold text-[#222]">{flight.arr}</span>
                                  <span className="text-[12px] text-[#4a4a4a]">{flight.destination} • {flight.destinationCity}</span>
                               </div>
                            </div>
                            <div className="flex gap-4">
                               <div className="bg-[#f2f2f2] px-3 py-2 rounded text-[11px] text-[#4a4a4a]">
                                  <p className="font-bold">Check-in Baggage</p>
                                  <p>15 Kgs (1 piece only)</p>
                               </div>
                               <div className="bg-[#f2f2f2] px-3 py-2 rounded text-[11px] text-[#4a4a4a]">
                                  <p className="font-bold">Cabin Baggage</p>
                                  <p>7 Kgs (1 piece only)</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlightCard;
