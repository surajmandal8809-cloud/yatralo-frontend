import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Minus } from "lucide-react";

export default function FareModal({ isOpen, onClose, selectedFlight, onBook }) {
  if (!isOpen || !selectedFlight) return null;

  // Re-use logic for logo or simple name
  const getAirlineLogo = (airlineName) => {
    const map = {
      "Air India": "AI",
      "IndiGo": "6E",
      "Indigo": "6E",
      "Vistara": "UK",
      "SpiceJet": "SG",
      "Spicejet": "SG",
      "Akasa Air": "QP",
      "Air Connect": "FL",
      "AirAsia India": "I5",
      "Alliance Air": "9I"
    };
    const code = map[airlineName] || map[airlineName?.trim()];
    if (code && code !== "FL") return `/assets/img/${code}.png`;
    return null;
  };

  const logoUrl = getAirlineLogo(selectedFlight.airline);

  // MMT style data
  const fares = [
    { 
      type: 'VALUE', 
      price: selectedFlight.perPax, 
      baggage: ['7 Kgs Cabin Baggage', '15 Kgs Check-in Baggage'],
      flexibility: ['Cancellation fee starts at ₹ 4,300 (up to 2 hours before departure)', 'Date Change fee starts at ₹ 3,000 up to 2 hrs before departure'],
      flexibilityIcons: ['minus', 'minus'],
      seats: ['Chargeable Seats', 'Chargeable Meals'],
      seatsIcons: ['minus', 'minus'],
      promo: 'Get Flat ₹ 314 OFF using code MMTSUPER | FLAT 600 OFF on ICICI Bank Credit Cards',
      promoType: 'discount'
    },
    { 
      type: 'FARE BY MAKEMYTRIP', 
      price: Math.round(selectedFlight.perPax * 1.05), 
      badge: 'MMTSPECIAL',
      badgeColor: 'bg-slate-800 text-yellow-500',
      bgColor: 'bg-[#fffaf2]', 
      baggage: ['7 Kgs Cabin Baggage', '15 Kgs Check-in Baggage'],
      flexibility: ['Cancellation fee starts at ₹ 4,300 (up to 2 hours before departure)', 'Date Change fee starts at ₹ 3,000 up to 2 hrs before departure'],
      flexibilityIcons: ['minus', 'minus'],
      seats: ['Chargeable Seats', 'Chargeable Meals'],
      seatsIcons: ['minus', 'minus'],
      promo: 'Travel Insurance included\nFree Date Change',
      promoHeader: 'BENEFITS WORTH ₹ 2,000 INCLUDED',
      promoType: 'insurance'
    },
    { 
      type: 'CLASSIC', 
      price: Math.round(selectedFlight.perPax * 1.2), 
      baggage: ['7 Kgs Cabin Baggage', '15 Kgs Check-in Baggage'],
      flexibility: ['Lower Cancellation fee of ₹ 3,000 (up to 2 hours before departure)', 'Lower Date Change fee ₹ 1,000 up to 2 hrs before departure'],
      flexibilityIcons: ['minus', 'minus'],
      seats: ['Free Seats', 'Complimentary Meals'],
      seatsIcons: ['check', 'check'],
      promo: 'Get ₹ 314 OFF using code MMTSUPER | Flat 10% OFF with SBI Debit Cards',
      promoType: 'discount'
    },
    { 
      type: 'FLEX', 
      price: Math.round(selectedFlight.perPax * 1.5), 
      baggage: ['7 Kgs Cabin Baggage', '20 Kgs Check-in Baggage'],
      flexibility: ['Zero Cancellation fee (up to 2 hours before departure)', 'Zero Date Change fee (up to 2 hrs before departure)'],
      flexibilityIcons: ['check', 'check'],
      seats: ['Free Seats', 'Complimentary Premium Meals'],
      seatsIcons: ['check', 'check'],
      promo: 'Get ₹ 314 OFF using code MMTSUPER | Flat 10% OFF with SBI Debit Cards',
      promoType: 'discount'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          className="relative w-full max-w-7xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-slate-200 bg-white">
            <h2 className="text-xl font-bold text-slate-800">Flight Details and Fare Options available for you!</h2>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1"
            >
              <X size={24} strokeWidth={1} />
            </button>
          </div>

          {/* Sub Header */}
          <div className="px-6 py-3 border-b border-slate-200 bg-[#f9f9f9] flex items-center gap-2 text-sm font-medium text-slate-700 font-sans flex-wrap">
             <span>{selectedFlight.originCity} → {selectedFlight.destinationCity}</span>
             {logoUrl && <img src={logoUrl} alt="logo" className="w-5 h-5 object-contain ml-2" />}
             <span>{selectedFlight.airline}</span>
             <span className="text-slate-400 text-[10px] mx-1">●</span>
             <span>{selectedFlight.depDate}</span>
             <span className="text-slate-400 text-[10px] mx-1">●</span>
             <span>Departure at {selectedFlight.dep} - Arrival at {selectedFlight.arr}</span>
          </div>

          {/* Body */}
          <div className="p-6 overflow-x-auto custom-scrollbar bg-white flex-1 relative">
            <div className="flex gap-4 min-w-[1100px] h-full items-stretch pb-2">
              {fares.map((fare, idx) => (
                <div key={fare.type} className={`flex-1 min-w-[270px] rounded-lg border ${fare.bgColor ? 'border-[#f2e5d1]' : 'border-slate-200'} flex flex-col transition-all group overflow-hidden`}>
                  
                  {/* Card Header */}
                  <div className={`p-4 border-b ${fare.bgColor ? 'bg-[#fffaf2] border-[#f2e5d1]' : 'bg-slate-50 border-slate-200'} relative`}>
                    {fare.badge && (
                      <div className={`absolute top-0 right-0 px-2.5 py-1 text-[9px] font-black tracking-widest rounded-bl-lg uppercase ${fare.badgeColor}`}>
                        {fare.badge}
                      </div>
                    )}
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xl font-black text-slate-900">₹ {fare.price.toLocaleString()}</span>
                      <span className="text-xs font-medium text-slate-500">per adult</span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase mt-1 tracking-wide">
                      {fare.type}
                    </p>
                  </div>

                  {/* Card Body */}
                  <div className={`p-5 flex-1 flex flex-col space-y-5 ${fare.bgColor ? 'bg-[#fffdf9]' : 'bg-white'}`}>
                    
                    {/* Baggage */}
                    <div>
                      <p className="text-[13px] font-bold text-slate-900 mb-2.5">Baggage</p>
                      <ul className="space-y-2.5">
                        {fare.baggage.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs font-medium text-slate-700 leading-snug">
                            <Check size={14} className="text-[#00a19c] shrink-0 mt-0.5" strokeWidth={3} /> {b}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Flexibility */}
                    <div>
                      <p className="text-[13px] font-bold text-slate-900 mb-2.5">Flexibility</p>
                      <ul className="space-y-2.5">
                        {fare.flexibility.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs font-medium text-slate-700 leading-snug">
                            {fare.flexibilityIcons[i] === 'check' 
                              ? <Check size={14} className="text-[#00a19c] shrink-0 mt-0.5" strokeWidth={3} />
                              : <div className="w-3.5 h-3.5 rounded-full bg-[#f2e2c4] flex items-center justify-center shrink-0 mt-0.5"><Minus size={10} className="text-[#b58b45]" strokeWidth={4} /></div>
                            }
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Seats & Meals */}
                    <div>
                      <p className="text-[13px] font-bold text-slate-900 mb-2.5">Seats, Meals & More</p>
                      <ul className="space-y-2.5">
                        {fare.seats.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs font-medium text-slate-700 leading-snug">
                            {fare.seatsIcons[i] === 'check' 
                              ? <Check size={14} className="text-[#00a19c] shrink-0 mt-0.5" strokeWidth={3} />
                              : <div className="w-3.5 h-3.5 rounded-full bg-[#f2e2c4] flex items-center justify-center shrink-0 mt-0.5"><Minus size={10} className="text-[#b58b45]" strokeWidth={4} /></div>
                            }
                            <span dangerouslySetInnerHTML={{ __html: b.replace('Free', '<span class="text-[#00a19c] font-bold">Free</span>').replace('Complimentary', '<span class="text-[#00a19c] font-bold">Complimentary</span>') }} />
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex-1" />

                    {/* Promo Box */}
                    {fare.promo && (
                      <div className={`p-3 rounded-lg flex gap-2.5 items-start text-xs mt-4 ${fare.promoType === 'insurance' ? 'bg-[#fdf3e1] border border-[#f5e4c6]' : 'bg-[#fdf7e5] border border-[#f5eed6]'}`}>
                        <div className="w-4 h-4 rounded-full bg-[#e2b04a]/20 text-[#b58b45] flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[10px] font-black">%</span>
                        </div>
                        <div>
                          {fare.promoHeader && <p className="font-bold text-slate-800 text-[10px] mb-1">{fare.promoHeader}</p>}
                          <p className="text-slate-600 font-medium leading-snug whitespace-pre-wrap">{fare.promo}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Book Button */}
                    <button 
                      onClick={() => onBook(selectedFlight, fare.type)}
                      className="mt-5 w-full py-3.5 bg-[#008cff] text-white rounded-full font-bold text-sm tracking-wide shadow-md hover:bg-[#007ce6] hover:shadow-lg transition-all active:scale-[0.98]"
                    >
                      BOOK NOW
                    </button>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
