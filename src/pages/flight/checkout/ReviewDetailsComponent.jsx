import React from "react";
import { 
  Check, 
  Plane, 
  User, 
  Phone, 
  ChevronRight, 
  ShieldCheck, 
  Briefcase, 
  Mail,
  Zap,
  MapPin,
  ArrowRight,
  Info
} from "lucide-react";
import { motion } from "framer-motion";

export default function ReviewDetailsComponent({ 
  selectedFlight, 
  passengers, 
  contactInfo, 
  addOns, 
  calculateTotal,
  onNext,
  onBack,
  isLoading 
}) {
  const getAirlineLogo = (code) => {
    return `https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/${code}.png`;
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-10 max-w-4xl mx-auto">
      
      {/* Flight Summary Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group">
        <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
           <div className="flex items-center gap-2">
              <Plane size={16} className="text-blue-500" />
              <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest leading-none">Review Flight Details</h3>
           </div>
           <span className="text-[8px] font-black text-blue-600 px-2 py-0.5 bg-white border border-blue-100 rounded-full uppercase tracking-tighter">REFUNDABLE</span>
        </div>

        <div className="p-6">
           <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5">
                 <img src={getAirlineLogo(selectedFlight.code)} className="w-full object-contain" alt="" />
              </div>
              <div>
                 <p className="text-[13px] font-black text-slate-900 leading-tight">{selectedFlight.airline}</p>
                 <p className="text-[9px] font-black text-slate-400 mt-0.5 uppercase tracking-widest">{selectedFlight.flightNo} • ECONOMY</p>
              </div>
           </div>

           <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100/50 mb-6 relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                 <div className="text-center md:text-left">
                    <p className="text-[22px] font-black text-slate-900 tracking-tighter leading-none">{selectedFlight.dep}</p>
                    <p className="text-[11px] font-black text-slate-400 mt-1 uppercase tracking-wide truncate">{selectedFlight.originCity} ({selectedFlight.origin})</p>
                 </div>

                 <div className="flex flex-col items-center justify-center px-4">
                    <div className="w-full flex items-center gap-2">
                       <div className="h-[1px] bg-slate-200 flex-1 relative rounded-full">
                          <Plane size={12} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 -rotate-90" />
                       </div>
                    </div>
                    <p className="text-[9px] font-black text-emerald-500 mt-2 uppercase tracking-widest leading-none">Non-stop • {Math.floor((selectedFlight?.duration || 0)/60)}h {(selectedFlight?.duration || 0)%60}m</p>
                 </div>

                 <div className="text-center md:text-right">
                    <p className="text-[22px] font-black text-slate-900 tracking-tighter leading-none">{selectedFlight.arr}</p>
                    <p className="text-[11px] font-black text-slate-400 mt-1 uppercase tracking-wide truncate">{selectedFlight.destinationCity} ({selectedFlight.destination})</p>
                 </div>
              </div>
           </div>

           <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-2">
                 <div className="w-6 h-6 rounded-md bg-orange-50 text-orange-600 flex items-center justify-center"><Briefcase size={12} /></div>
                 <span className="text-[10px] font-black text-slate-600 uppercase">15 KG</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center"><Zap size={12} /></div>
                 <span className="text-[10px] font-black text-slate-600 uppercase">7 KG</span>
              </div>
           </div>
        </div>
      </div>

      {/* Travellers Details */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
         <div className="p-4 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <User size={16} className="text-blue-500" />
               <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Travellers</h4>
            </div>
            <button onClick={onBack} className="text-[9px] font-black text-blue-500 uppercase tracking-widest hover:underline">Edit</button>
         </div>
         <div className="p-4 space-y-2">
            {passengers.map((p, i) => (
               <div key={i} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl border border-slate-100/50">
                  <div className="flex items-center gap-4">
                     <span className="text-[10px] font-black text-slate-400">#{i + 1}</span>
                     <div>
                        <p className="text-[13px] font-black text-slate-900 tracking-tight leading-none mb-1">{p.title}. {p.firstName} {p.lastName}</p>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{p.gender} • ADULT</p>
                     </div>
                  </div>
                  <Check size={14} strokeWidth={3} className="text-emerald-500" />
               </div>
            ))}
         </div>
      </div>

      {/* Contact Details */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
         <div className="p-4 border-b border-slate-50">
            <div className="flex items-center gap-2">
               <Phone size={16} className="text-blue-500" />
               <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Contact</h4>
            </div>
         </div>
         <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <Mail size={16} />
               </div>
               <p className="text-[12px] font-black text-slate-800 tracking-tight">{contactInfo.email}</p>
            </div>
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Phone size={16} />
               </div>
               <p className="text-[12px] font-black text-slate-800 tracking-tight">{contactInfo.countryCode} {contactInfo.phone}</p>
            </div>
         </div>
      </div>

      {/* Final Action */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-5 bg-white rounded-3xl shadow-xl border-t-4 border-t-blue-600 sticky bottom-4 z-50">
         <div className="flex items-center gap-6">
            <div>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">Payable Amount</p>
               <h4 className="text-2xl font-black text-slate-900 tracking-tighter">₹{calculateTotal().toLocaleString()}</h4>
            </div>
            <div className="hidden md:block w-px h-8 bg-slate-100" />
            <div className="md:max-w-xs">
               <p className="text-[8px] font-bold text-slate-500 leading-tight uppercase tracking-wider">
                  By clicking Proceed, you agree to the <span className="text-blue-600 font-black cursor-pointer hover:underline">Terms & Conditions</span>
               </p>
            </div>
         </div>
         <motion.button 
           whileHover={{ scale: 1.02 }}
           whileTap={{ scale: 0.98 }}
           onClick={onNext}
           disabled={isLoading}
           className={`px-8 py-4 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-xl font-black text-[12px] uppercase tracking-[0.15em] shadow-lg transition-all flex items-center gap-3 group/btn ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:saturate-150 shadow-orange-200'}`}
         >
            {isLoading ? 'Processing...' : 'Proceed to Payment'}
            {!isLoading && <ArrowRight size={16} strokeWidth={3} className="group-hover/btn:translate-x-1 transition-transform" />}
         </motion.button>
      </div>
    </div>
  );
}
