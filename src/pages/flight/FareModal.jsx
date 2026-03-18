import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Zap } from "lucide-react";

export default function FareModal({ isOpen, onClose, selectedFlight, onBook }) {
  if (!isOpen || !selectedFlight) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
        >
          <div className="p-6 md:p-8 flex items-center justify-between border-b border-slate-100">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Flight Details and Fare Options</h2>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                {selectedFlight.originCity} → {selectedFlight.destinationCity} • {selectedFlight.airline} • {selectedFlight.depDate}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-orange-50 hover:text-[#f97316] transition-all"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-8 overflow-x-auto custom-scrollbar">
            <div className="flex gap-6 min-w-[1000px]">
              {[
                { type: 'Value', price: selectedFlight.perPax, benefits: ['7 Kgs Cabin Baggage', '15 Kgs Check-in Baggage', 'Chargeable Seats', 'Chargeable Meals'], color: 'violet' },
                { type: 'Student', price: Math.round(selectedFlight.perPax * 1.05), benefits: ['7 Kgs Cabin Baggage', '25 Kgs Check-in Baggage', 'Free Student Meals', 'Extra Legroom (if available)'], color: 'orange' },
                { type: 'Classic', price: Math.round(selectedFlight.perPax * 1.2), benefits: ['7 Kgs Cabin Baggage', '15 Kgs Check-in Baggage', 'Lower Cancellation fee', 'Free Seats'], color: 'violet' },
                { type: 'Flex', price: Math.round(selectedFlight.perPax * 1.5), benefits: ['7 Kgs Cabin Baggage', '20 Kgs Check-in Baggage', 'Zero Cancellation fee', 'Free Meals & Seats'], color: 'orange' },
                { type: 'Business', price: Math.round(selectedFlight.perPax * 2.5), benefits: ['12 Kgs Cabin Baggage', '35 Kgs Check-in Baggage', 'Priority Boarding', 'Premium Meals'], color: 'violet' }
              ].map((fare) => (
                <div key={fare.type} className={`flex-1 min-w-[260px] rounded-3xl border-2 p-6 flex flex-col transition-all hover:shadow-xl ${fare.type === 'Value' ? 'border-violet-100 bg-violet-50/20' : 'border-slate-100 bg-white'}`}>
                  <div className="mb-6">
                    <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${fare.color === 'violet' ? 'text-[#7c3aed]' : 'text-[#f97316]'}`}>
                      {fare.type}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900">₹{fare.price.toLocaleString()}</span>
                      <span className="text-[10px] font-bold text-slate-400">/adult</span>
                    </div>
                  </div>

                  <div className="space-y-4 flex-1">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Baggage</p>
                      <ul className="space-y-2">
                        {fare.benefits.slice(0, 2).map((b, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                            <CheckCircle2 size={12} className="text-[#f97316]" /> {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Perks</p>
                      <ul className="space-y-2">
                        {fare.benefits.slice(2).map((b, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                            <Zap size={12} className="text-[#7c3aed]" /> {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button 
                    onClick={() => onBook(selectedFlight, fare.type)}
                    className="mt-8 w-full py-4 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-violet-100 hover:opacity-90 transition-all active:scale-95"
                  >
                    SELECT FARE
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
