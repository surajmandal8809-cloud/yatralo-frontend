import React from "react";
import { User, Mail, Phone, ChevronRight, UserPlus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HotelGuestDetails = ({ guests, setGuests, contactInfo, setContactInfo, onNext }) => {
  
  const updateGuest = (index, field, value) => {
    const updated = [...guests];
    updated[index] = { ...updated[index], [field]: value };
    setGuests(updated);
  };

  const updateContact = (field, value) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Primary Traveler Header */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
         <div className="flex items-center gap-6 mb-4">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform">
               <UserCheck size={28} />
            </div>
            <div>
               <h2 className="text-3xl font-black italic uppercase tracking-tight">Guest Details</h2>
               <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-1">Please ensure information matches Guest ID Proofs</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Contact Information Card */}
        <section className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500">
          <h3 className="text-xs font-black text-slate-400 font-black uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
             <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
             Communication Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative">
               <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Email Address</label>
               <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-blue-500 transition-colors" size={18} />
                  <input type="email" value={contactInfo.email} onChange={(e) => updateContact("email", e.target.value)} placeholder="your@email.com" className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl outline-none focus:bg-white focus:border-blue-500 transition-all font-black text-slate-800 text-sm" />
               </div>
               <p className="text-[9px] font-bold text-slate-400 mt-2 italic px-1">Your e-ticket will be sent here.</p>
            </div>
            <div className="group relative">
               <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Contact Number</label>
               <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-blue-500 transition-colors" size={18} />
                  <input type="tel" value={contactInfo.phone} onChange={(e) => updateContact("phone", e.target.value)} placeholder="+91 00000 00000" className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl outline-none focus:bg-white focus:border-blue-500 transition-all font-black text-slate-800 text-sm" />
               </div>
               <p className="text-[9px] font-bold text-slate-400 mt-2 italic px-1">For urgent travel updates.</p>
            </div>
          </div>
        </section>

        {/* Dynamic Guest Forms */}
        <AnimatePresence mode="popLayout">
          {guests.map((guest, i) => (
            <motion.section 
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={i} 
              className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500"
            >
              <div className="absolute top-0 right-0 p-8">
                 <p className="text-[2.5rem] font-black text-slate-50 italic opacity-10 leading-none">{i+1}</p>
              </div>

              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                 Guest {i + 1}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="relative group">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Salutation</label>
                   <select value={guest.title} onChange={(e) => updateGuest(i, "title", e.target.value)} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none focus:bg-white focus:border-blue-500 transition-all font-black text-slate-800 text-sm appearance-none">
                      <option>Mr</option>
                      <option>Ms</option>
                      <option>Mrs</option>
                   </select>
                </div>
                <div className="md:col-span-2 relative group">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">First & Middle Name</label>
                   <input type="text" value={guest.firstName} onChange={(e) => updateGuest(i, "firstName", e.target.value)} placeholder="As per valid ID proof" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none focus:bg-white focus:border-blue-500 transition-all font-black text-slate-800 text-sm" />
                </div>
                <div className="relative group">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Last Name</label>
                   <input type="text" value={guest.lastName} onChange={(e) => updateGuest(i, "lastName", e.target.value)} placeholder="Surname" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none focus:bg-white focus:border-blue-500 transition-all font-black text-slate-800 text-sm" />
                </div>
              </div>
            </motion.section>
          ))}
        </AnimatePresence>
      </div>

      {/* Global Action Footer */}
      <div className="pt-8 flex justify-end">
         <button 
           onClick={onNext} 
           className="px-14 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.25em] shadow-2xl shadow-slate-200 transition-all flex items-center gap-4 hover:bg-blue-600 text-xs active:scale-95 group"
         >
           Review & Pay <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
         </button>
      </div>
    </div>
  );
};

// Internal Mock Icon for completeness
const UserCheck = ({ size }) => <User size={size} />;

export default HotelGuestDetails;
