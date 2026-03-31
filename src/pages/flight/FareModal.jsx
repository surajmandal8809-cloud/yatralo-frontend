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
            className="relative w-full max-w-3xl bg-white rounded-[1.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-slate-200"
          >
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                    <ShieldCheck size={24} />
                 </div>
                 <div>
                    <h2 className="text-lg font-black text-slate-900 tracking-tight leading-none">Select Fare</h2>
                    <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Multiple options available for your journey</p>
                 </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400"><X size={20}/></button>
            </div>

            <div className="p-4 bg-slate-50/50 flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {fares.map((fare, idx) => (
                  <div key={fare.type} className={`flex flex-col bg-white rounded-xl border ${fare.type === 'CLASSIC' ? 'border-indigo-600 shadow-md ring-4 ring-indigo-50' : 'border-slate-200'} transition-all overflow-hidden relative`}>
                    
                    {fare.type === 'CLASSIC' && (
                      <div className="absolute top-0 right-0 left-0 bg-indigo-600 text-white text-[8px] font-black uppercase tracking-widest text-center py-1">Recommended</div>
                    )}

                    <div className={`p-4 border-b border-slate-50 ${fare.type === 'CLASSIC' ? 'pt-6' : ''}`}>
                      <p className="text-[8px] font-black text-indigo-600 uppercase tracking-widest mb-1">{fare.type}</p>
                      <p className="text-xl font-black text-slate-900 leading-none">₹{fare.price.toLocaleString()}</p>
                    </div>

                    <div className="p-4 flex-1 flex flex-col space-y-4">
                      <div className="space-y-2">
                        {fare.baggage.map((b, i) => (
                          <div key={i} className="flex items-start gap-2 text-[10px] font-bold text-slate-600">
                            <Check size={10} className="text-emerald-500 shrink-0 mt-0.5" strokeWidth={3} /> {b}
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-slate-50 space-y-2">
                        {fare.flexibility.map((b, i) => (
                          <div key={i} className="flex items-start gap-2 text-[10px] font-semibold text-slate-500 leading-tight">
                            {fare.flexibilityIcons[i] === 'check' 
                              ? <Check size={10} className="text-emerald-500 shrink-0 mt-0.5" strokeWidth={3} />
                              : <Minus size={10} className="text-slate-300 shrink-0 mt-0.5" strokeWidth={4} />
                            }
                            {b}
                          </div>
                        ))}
                      </div>

                      <div className="flex-1" />
                      
                      <button 
                        onClick={() => onBook(selectedFlight, fare.type)}
                        className={`w-full py-2.5 rounded-lg font-black text-[9px] tracking-widest uppercase transition-all active:scale-[0.98] ${fare.type === 'CLASSIC' ? 'bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white' : 'bg-slate-100 text-slate-900 hov:hover:bg-slate-800 hover:text-white'}`}
                      >
                       {fare.type === 'CLASSIC' ? 'Select & Book' : 'Select'}
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
