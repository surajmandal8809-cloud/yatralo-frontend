import React from "react";
import { ShieldCheck, MapPin, Calendar, Users, Star, Info, ChevronRight, Lock, Gift } from "lucide-react";
import { motion } from "framer-motion";

const HotelReviewSection = ({ hotel, guests, contactInfo, totalAmount, onNext, onBack, isLoading, checkIn = "20 Apr", checkOut = "21 Apr", nights = 1 }) => {
  
  const taxes = Math.round(totalAmount * 0.18);
  const basePrice = totalAmount - taxes;

  return (
    <div className="space-y-10 animate-in slide-in-from-right duration-700">
      
      {/* Review Header */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
         <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-gradient-to-r from-[#7c3aed] to-[#f97316] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-500/20">
               <ShieldCheck size={28} />
            </div>
            <div>
               <h2 className="text-3xl font-black italic uppercase tracking-tight">Review Selection</h2>
               <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-1">Transaction Secured by AES-256 Encryption</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        
        {/* Detailed Property Review */}
        <section className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm relative group overflow-hidden hover:shadow-xl transition-all duration-700">
           <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#7c3aed] to-[#f97316]" />
           <div className="flex flex-col md:flex-row gap-10">
              <div className="w-full md:w-64 h-48 rounded-[1.8rem] overflow-hidden"><img src={hotel.image || hotel.images?.[0] || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" /></div>
              <div className="flex-1 flex flex-col justify-center">
                 <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-amber-500"><Star size={12} className="fill-amber-500" /> <Star size={12} className="fill-amber-500" /> <Star size={12} className="fill-amber-500" /> <Star size={12} className="fill-amber-500" /> <Star size={12} className="fill-slate-200 text-slate-200" /></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">YatraLo Verified Property</span>
                 </div>
                 <h3 className="text-3xl font-black text-slate-900 tracking-tight italic uppercase mb-2">{hotel.name}</h3>
                 <p className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-6"><MapPin size={12} className="text-[#f97316]" /> {hotel.city || 'India'} | <span className="text-[#f97316]">View Policies</span></p>
                 
                 <div className="flex flex-wrap gap-8">
                    <div className="bg-slate-50 p-4 px-6 rounded-2xl border border-slate-100 flex items-center gap-4">
                       <Calendar size={18} className="text-blue-600" />
                       <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Stay Period</p><p className="text-sm font-black text-slate-800 italic uppercase">{checkIn} - {checkOut} <span className="text-blue-600">({nights} {nights > 1 ? 'Nights' : 'Night'})</span></p></div>
                    </div>
                    <div className="bg-slate-50 p-4 px-6 rounded-2xl border border-slate-100 flex items-center gap-4">
                       <Users size={18} className="text-blue-600" />
                       <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Occupancy</p><p className="text-sm font-black text-slate-800 italic uppercase">{guests.length} Adults | 1 Room</p></div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Guest Information Review */}
        <section className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-700 group">
           <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              Confirmation Recipients
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registered Guests</p>
                 <div className="space-y-2">
                    {guests.map((g,i) => (
                       <div key={i} className="flex items-center gap-3 text-sm font-black text-slate-800 uppercase italic"><div className="w-1.5 h-1.5 rounded-full bg-slate-200" /> {g.title}. {g.firstName} {g.lastName}</div>
                    ))}
                 </div>
              </div>
              <div className="space-y-4">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Identity</p>
                 <div className="space-y-1 font-black text-slate-800 uppercase italic text-sm">
                    <p>{contactInfo.email}</p>
                    <p>{contactInfo.phone}</p>
                 </div>
              </div>
           </div>
        </section>

        {/* Action Bar */}
        <section className="flex flex-col md:flex-row items-center justify-between p-10 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-700">
           <div className="text-left mb-8 md:mb-0">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                 <Lock size={12} className="text-emerald-500" /> Grand Total Amount
              </p>
              <h4 className="text-4xl font-black text-slate-900 tracking-tighter">₹ {totalAmount.toLocaleString()}</h4>
              <p className="text-[10px] font-bold text-slate-400 mt-2 italic px-1 uppercase tracking-widest">Includes all taxes & property fees</p>
           </div>
           <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <button onClick={onBack} className="px-10 py-5 bg-slate-50 text-slate-900 rounded-[2rem] font-black uppercase tracking-[0.2em] hover:bg-slate-100 transition-all text-xs border border-slate-200 active:scale-95">Go Back</button>
              <button 
                onClick={onNext} 
                disabled={isLoading}
                className="px-16 py-5 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-[2rem] font-black uppercase tracking-[0.25em] shadow-2xl shadow-orange-200 transition-all flex items-center justify-center gap-4 hover:saturate-150 text-xs active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isLoading ? 'Processing Transaction...' : 'Pay & Confirm'} <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
           </div>
        </section>

      </div>
    </div>
  );
};

export default HotelReviewSection;
