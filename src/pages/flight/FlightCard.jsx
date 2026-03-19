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
    <div className="bg-white rounded-lg border border-[#e7e7e7] shadow-sm hover:shadow-md transition-shadow overflow-hidden font-sans">
      
      {/* Main Card Content */}
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          
          {/* Airline Info */}
          <div className="flex items-center gap-3 min-w-[140px]">
            <img 
              src={getAirlineLogo(flight.code)} 
              alt={flight.airline} 
              className="w-8 h-8 object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/6E.png";
              }}
            />
            <div>
               <p className="text-[14px] font-bold text-[#222] leading-tight">{flight.airline}</p>
               <p className="text-[11px] text-[#4a4a4a]">{flight.flightNo}</p>
            </div>
          </div>

          {/* Time & Route Info */}
          <div className="flex-1 flex items-center justify-between gap-4 md:gap-10">
             <div className="text-center md:text-left">
                <p className="text-[22px] font-black text-[#222] tracking-tighter">{flight.dep}</p>
                <p className="text-[12px] font-bold text-[#222] mt-1">{flight.origin}</p>
             </div>

             <div className="flex-1 flex flex-col items-center">
                <p className="text-[11px] text-[#4a4a4a] mb-1">{Math.floor(flight.duration / 60)}h {flight.duration % 60}m</p>
                <div className="w-full h-[2px] bg-[#e7e7e7] relative">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#e7e7e7]" />
                </div>
                <p className={`text-[11px] mt-1 ${flight.stops === 0 ? 'text-[#00a69a]' : 'text-[#f26722]'}`}>
                   {flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
                </p>
             </div>

             <div className="text-center md:text-right">
                <p className="text-[22px] font-black text-[#222] tracking-tighter">{flight.arr}</p>
                <p className="text-[12px] font-bold text-[#222] mt-1">{flight.destination}</p>
             </div>
          </div>

          {/* Pricing & CTA */}
          <div className="flex items-center md:flex-col md:items-end gap-4 md:pl-8 md:border-l md:border-[#e7e7e7]">
             <div className="text-right">
                <p className="text-[22px] font-black text-[#222] tracking-tight">₹{flight.price.toLocaleString()}</p>
                <p className="text-[10px] text-[#4a4a4a]">per adult</p>
             </div>
             <button 
              onClick={() => onViewPrices(flight)}
              className="bg-[#008cff] hover:bg-[#007ad9] text-white px-6 py-2 rounded-full font-bold text-[14px] uppercase tracking-wide transition-colors shadow-lg shadow-blue-100"
             >
                View Prices
             </button>
          </div>
        </div>

        {/* Footer info & Toggle */}
        <div className="mt-6 pt-4 border-t border-[#f2f2f2] flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[#4a4a4a]">
                 <span className="text-[10px] bg-[#f2f2f2] px-2 py-0.5 rounded text-[#4a4a4a] font-bold">Free Meal</span>
                 <span className="text-[10px] bg-[#f2f2f2] px-2 py-0.5 rounded text-[#4a4a4a] font-bold">Emissions: 104kg CO₂</span>
              </div>
           </div>
           <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[12px] font-bold text-[#008cff] flex items-center gap-1 hover:underline"
           >
              {isExpanded ? 'Hide' : 'Flight'} Details {isExpanded ? <ChevronUp size={14}/> : <ChevronDown size={14} />}
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
