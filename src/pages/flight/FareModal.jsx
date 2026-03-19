import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Minus, ShieldCheck } from "lucide-react";

export default function FareModal({ isOpen, onClose, selectedFlight, onBook }) {
  if (!isOpen || !selectedFlight) return null;

  const getAirlineLogo = (code) => {
    return `https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/${code}.png`;
  };

  const logoUrl = getAirlineLogo(selectedFlight.code);

  const fares = [
    { 
      type: 'VALUE', 
      price: selectedFlight.perPax, 
      baggage: ['7 Kgs Cabin Baggage', '15 Kgs Check-in Baggage'],
      flexibility: ['Cancellation fee starts at ₹ 4,300', 'Date Change fee starts at ₹ 3,000'],
      flexibilityIcons: ['minus', 'minus'],
      seats: ['Chargeable Seats', 'Chargeable Meals'],
      seatsIcons: ['minus', 'minus'],
      promo: 'Get Flat ₹ 314 OFF using code YATRALO',
      promoType: 'discount'
    },
    { 
      type: 'CLASSIC', 
      price: Math.round(selectedFlight.perPax * 1.2), 
      bgColor: 'bg-[#fffaf2]', 
      baggage: ['7 Kgs Cabin Baggage', '15 Kgs Check-in Baggage'],
      flexibility: ['Lower Cancellation fee ₹ 3,000', 'Lower Date Change fee ₹ 1,000'],
      flexibilityIcons: ['minus', 'minus'],
      seats: ['Free Seats', 'Complimentary Meals'],
      seatsIcons: ['check', 'check'],
      promo: 'Travel Insurance included',
      promoHeader: 'BENEFITS WORTH ₹ 2,000 INCLUDED',
      promoType: 'insurance'
    },
    { 
      type: 'FLEX', 
      price: Math.round(selectedFlight.perPax * 1.5), 
      baggage: ['7 Kgs Cabin Baggage', '20 Kgs Check-in Baggage'],
      flexibility: ['Zero Cancellation fee', 'Zero Date Change fee'],
      flexibilityIcons: ['check', 'check'],
      seats: ['Free Seats', 'Complimentary Premium Meals'],
      seatsIcons: ['check', 'check'],
      promo: 'Flat 10% OFF with Axis Bank',
      promoType: 'discount'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="relative w-full max-w-7xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
          >
            <div className="px-10 py-6 flex items-center justify-between border-b border-slate-100 bg-white">
              <div>
                 <h2 className="text-2xl font-black text-slate-900 tracking-tight">Select Fare Option</h2>
                 <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest">{selectedFlight.origin} → {selectedFlight.destination} • {selectedFlight.depDate}</p>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-slate-50 rounded-full transition-colors"><X/></button>
            </div>

            <div className="p-10 overflow-x-auto bg-slate-50 flex-1">
              <div className="flex gap-6 min-w-[1000px] h-full items-stretch pb-4">
                {fares.map((fare, idx) => (
                  <div key={fare.type} className={`flex-1 min-w-[300px] rounded-[2.5rem] border-2 ${fare.bgColor ? 'bg-amber-50/30 border-amber-100' : 'bg-white border-slate-100'} flex flex-col transition-all group overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02]`}>
                    
                    <div className={`p-8 border-b ${fare.bgColor ? 'bg-amber-50 border-amber-100' : 'bg-white border-slate-50'} relative`}>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-3xl font-black text-slate-900">₹ {fare.price.toLocaleString()}</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase">per Traveller</span>
                      </div>
                      <p className="text-[11px] font-black text-indigo-600 uppercase mt-2 tracking-widest leading-none">
                        {fare.type} FARE
                      </p>
                    </div>

                    <div className="p-8 flex-1 flex flex-col space-y-8">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Baggage Details</p>
                        <ul className="space-y-3">
                          {fare.baggage.map((b, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs font-bold text-slate-700">
                              <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" strokeWidth={3} /> {b}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Flexibility</p>
                        <ul className="space-y-3">
                          {fare.flexibility.map((b, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs font-bold text-slate-700">
                              {fare.flexibilityIcons[i] === 'check' 
                                ? <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" strokeWidth={3} />
                                : <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5"><Minus size={10} className="text-slate-400" strokeWidth={4} /></div>
                              }
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex-1" />

                      {fare.promo && (
                        <div className={`p-4 rounded-2xl flex gap-3 items-start text-xs ${fare.promoType === 'insurance' ? 'bg-amber-100/50 text-amber-900 border border-amber-100' : 'bg-indigo-50 text-indigo-900 border border-indigo-100'}`}>
                          <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 shadow-sm ${fare.promoType === 'insurance' ? 'bg-amber-500 text-white' : 'bg-indigo-600 text-white'}`}>
                            {fare.promoType === 'insurance' ? <ShieldCheck size={12} strokeWidth={3} /> : <span className="text-[9px] font-black">%</span>}
                          </div>
                          <div>
                            {fare.promoHeader && <p className="font-black text-[9px] uppercase tracking-widest mb-1">{fare.promoHeader}</p>}
                            <p className="font-bold leading-tight">{fare.promo}</p>
                          </div>
                        </div>
                      )}
                      
                      <button 
                        onClick={() => onBook(selectedFlight, fare.type)}
                        className={`w-full py-4 rounded-2xl font-black text-xs tracking-widest uppercase shadow-xl transition-all active:scale-[0.98] ${fare.type === 'CLASSIC' ? 'bg-indigo-600 text-white shadow-indigo-100 hover:bg-slate-900' : 'bg-slate-900 text-white shadow-slate-100 hover:bg-indigo-600'}`}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
