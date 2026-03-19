import React, { useState } from "react";
import { User, Plus, Phone, Mail, Calendar, UserCheck, ShieldCheck, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TITLES = ["Mr", "Mrs", "Ms", "Miss", "Dr"];
const NATIONALITIES = ["India", "United Arab Emirates", "Singapore", "United Kingdom", "USA", "Canada", "Australia"];

export default function PassengerDetailsComponent({ passengers, setPassengers, pax, userData, onNext, contactInfo, setContactInfo }) {
  const [showSavedModal, setShowSavedModal] = useState(false);
  
  const handleInputChange = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index] = { ...newPassengers[index], [field]: value };
    setPassengers(newPassengers);
  };

  const savedTravellers = [
    { title: "Mr", firstName: "Rahul", lastName: "Sharma", gender: "Male", dob: "1990-05-15", nationality: "India" },
    { title: "Mrs", firstName: "Priya", lastName: "Sharma", gender: "Female", dob: "1992-08-20", nationality: "India" },
    { title: "Mr", firstName: "Amit", lastName: "Verma", gender: "Male", dob: "1985-11-10", nationality: "India" },
  ];

  const selectSaved = (t) => {
    const emptyIndex = passengers.findIndex(p => !p.firstName);
    if (emptyIndex !== -1) {
      handleInputChange(emptyIndex, 'title', t.title);
      handleInputChange(emptyIndex, 'firstName', t.firstName);
      handleInputChange(emptyIndex, 'lastName', t.lastName);
      handleInputChange(emptyIndex, 'gender', t.gender);
      handleInputChange(emptyIndex, 'dob', t.dob);
      handleInputChange(emptyIndex, 'nationality', t.nationality);
    }
    setShowSavedModal(false);
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-100">
               <User size={24} />
            </div>
            <div>
               <h3 className="text-2xl font-black text-slate-900 tracking-tight">Traveller Manifesto</h3>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Please enter details as per Govt. ID</p>
            </div>
         </div>
         <button 
          onClick={() => setShowSavedModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-900 text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-slate-100"
         >
            <UserCheck size={16} /> Saved Travellers
         </button>
      </div>

      <div className="space-y-8">
         {Array.from({ length: pax }).map((_, i) => (
           <motion.div 
             key={i} 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-sm group hover:shadow-xl hover:border-indigo-100 transition-all"
           >
              <div className="p-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                 <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-orange-600 flex-shrink-0" />
                    Adult Traveller {i + 1}
                 </p>
                 <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">Mandatory</span>
              </div>
              
              <div className="p-10 grid grid-cols-1 md:grid-cols-12 gap-8">
                 <div className="md:col-span-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Salutation</label>
                    <select 
                      value={passengers[i]?.title || "Mr"}
                      onChange={(e) => handleInputChange(i, 'title', e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl outline-none focus:border-indigo-600/20 focus:bg-white transition-all font-bold text-slate-900 text-sm"
                    >
                       {TITLES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                 </div>
                 <div className="md:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">First & Middle Name</label>
                       <input 
                         type="text" 
                         placeholder="e.g. Rahul"
                         value={passengers[i]?.firstName || ""}
                         onChange={(e) => handleInputChange(i, 'firstName', e.target.value)}
                         className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl outline-none focus:border-indigo-600/20 focus:bg-white transition-all font-bold text-slate-900 text-sm"
                       />
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Last Name</label>
                       <input 
                         type="text" 
                         placeholder="e.g. Sharma"
                         value={passengers[i]?.lastName || ""}
                         onChange={(e) => handleInputChange(i, 'lastName', e.target.value)}
                         className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl outline-none focus:border-indigo-600/20 focus:bg-white transition-all font-bold text-slate-900 text-sm"
                       />
                    </div>
                 </div>

                 <div className="md:col-span-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Date of Birth</label>
                    <div className="relative">
                       <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                       <input 
                        type="date" 
                        value={passengers[i]?.dob || ""}
                        onChange={(e) => handleInputChange(i, 'dob', e.target.value)}
                        className="w-full bg-slate-50 border-2 border-slate-100 p-4 pl-12 rounded-xl outline-none focus:border-indigo-600/20 focus:bg-white transition-all font-bold text-slate-900 text-sm"
                       />
                    </div>
                 </div>

                 <div className="md:col-span-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Gender</label>
                    <div className="flex bg-slate-50 p-1.5 rounded-xl border-2 border-slate-100">
                       {["Male", "Female"].map(g => (
                         <button 
                           key={g}
                           onClick={() => handleInputChange(i, 'gender', g)}
                           className={`flex-1 py-3 text-[10px] font-black rounded-lg transition-all ${passengers[i]?.gender === g ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                         >
                            {g}
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="md:col-span-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Nationality</label>
                    <select 
                      value={passengers[i]?.nationality || "India"}
                      onChange={(e) => handleInputChange(i, 'nationality', e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl outline-none focus:border-indigo-600/20 focus:bg-white transition-all font-bold text-slate-900 text-sm"
                    >
                       {NATIONALITIES.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>

      <section className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-sm group hover:border-indigo-100 transition-all">
         <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center">
               <Phone size={24} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Contact Matrix</h3>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Electronic Mail</label>
               <div className="relative">
                  <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="email" 
                    placeholder="rahul@example.com"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-100 p-5 pl-14 rounded-2xl outline-none focus:border-indigo-600/20 focus:bg-white transition-all font-bold text-slate-900 text-sm"
                  />
               </div>
               <p className="text-[9px] font-black text-slate-400 mt-3 ml-2 uppercase tracking-widest">E-Ticket will be routed to this mail</p>
            </div>
            <div>
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Mobile Terminal</label>
               <div className="flex gap-3">
                  <select 
                    value={contactInfo.countryCode}
                    onChange={(e) => setContactInfo({ ...contactInfo, countryCode: e.target.value })}
                    className="w-28 bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl outline-none font-bold text-slate-900 text-sm"
                  >
                     <option>+91</option>
                     <option>+1</option>
                     <option>+44</option>
                  </select>
                  <div className="flex-1 relative">
                     <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                     <input 
                       type="tel" 
                       placeholder="10-digit number"
                       value={contactInfo.phone}
                       onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                       className="w-full bg-slate-50 border-2 border-slate-100 p-5 pl-14 rounded-2xl outline-none focus:border-indigo-600/20 focus:bg-white transition-all font-bold text-slate-900 text-sm"
                     />
                  </div>
               </div>
            </div>
         </div>
      </section>

      <div className="flex justify-end pt-6">
         <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="px-14 py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-2xl flex items-center gap-4 group/btn transition-colors hover:bg-indigo-600"
         >
            Review Details <ArrowRight size={20} strokeWidth={3} className="group-hover/btn:translate-x-2 transition-transform" />
         </motion.button>
      </div>

      <AnimatePresence>
        {showSavedModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSavedModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
             <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative bg-white rounded-[4rem] shadow-2xl w-full max-w-lg p-10">
                <div className="flex items-center justify-between mb-10">
                   <h3 className="text-2xl font-black text-slate-900 tracking-tight">Saved Network</h3>
                   <button onClick={() => setShowSavedModal(false)} className="p-3 hover:bg-slate-50 rounded-full transition-colors"><X/></button>
                </div>
                <div className="space-y-4">
                   {savedTravellers.map((t, idx) => (
                     <button 
                      key={idx} 
                      onClick={() => selectSaved(t)}
                      className="w-full flex items-center gap-5 p-6 rounded-[2rem] bg-slate-50 border-2 border-slate-50 hover:bg-white hover:border-indigo-600/20 transition-all text-left group"
                     >
                        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-indigo-600 shadow-sm transition-transform group-hover:scale-110">
                           <User size={28} />
                        </div>
                        <div>
                           <p className="text-base font-black text-slate-900">{t.title}. {t.firstName} {t.lastName}</p>
                           <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest leading-none">{t.gender} • {t.nationality}</p>
                        </div>
                        <Plus size={20} className="ml-auto text-slate-200 group-hover:text-indigo-600 transition-colors" />
                     </button>
                   ))}
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="bg-emerald-50 border border-emerald-100 rounded-[2.5rem] p-8 flex items-start gap-5 shadow-sm">
         <ShieldCheck className="text-emerald-600 shrink-0" size={32} />
         <div>
            <p className="text-base font-black text-slate-900 tracking-tight">Military Grade Encryption</p>
            <p className="text-xs font-bold text-emerald-800 mt-1 leading-relaxed">Your PII (Personally Identifiable Information) is secured with AES-256 standards during transit and at rest.</p>
         </div>
      </div>
    </div>
  );
}

function X(props) {
   return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
   )
}
