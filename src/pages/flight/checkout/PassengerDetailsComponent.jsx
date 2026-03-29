import React, { useState } from "react";
import { User, Plus, Phone, Mail, Calendar, UserCheck, ShieldCheck, ArrowRight, X as CloseIcon, Info, ChevronRight } from "lucide-react";
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
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
         <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-100">
               <User size={28} strokeWidth={2.5} />
            </div>
            <div>
               <h3 className="text-2xl font-black text-slate-900 tracking-tight">Traveller Details</h3>
               <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Please enter details as per your government ID</p>
            </div>
         </div>
         <button 
          onClick={() => setShowSavedModal(true)}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-50 text-blue-700 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-100 transition-all border border-blue-100"
         >
            <UserCheck size={18} /> View Saved Travellers
         </button>
      </div>

      {/* Passenger Cards */}
      <div className="space-y-6">
         {Array.from({ length: pax }).map((_, i) => (
           <motion.div 
             key={i} 
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
           >
              <div className="px-8 py-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black">
                       {i + 1}
                    </span>
                    <p className="text-xs font-black text-slate-700 uppercase tracking-[0.15em]">
                       Adult Traveller
                    </p>
                 </div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white border border-slate-200 px-3 py-1.5 rounded-full">Primary Info</span>
              </div>
              
              <div className="p-8 space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1">Title</label>
                       <select 
                         value={passengers[i]?.title || "Mr"}
                         onChange={(e) => handleInputChange(i, 'title', e.target.value)}
                         className="w-full bg-white border-2 border-slate-100 p-4 rounded-2xl outline-none focus:border-blue-600/30 focus:shadow-lg focus:shadow-blue-50 transition-all font-bold text-slate-900 text-sm appearance-none"
                       >
                          {TITLES.map(t => <option key={t} value={t}>{t}</option>)}
                       </select>
                    </div>
                    <div className="md:col-span-4">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1">First & Middle Name</label>
                       <input 
                         type="text" 
                         placeholder="e.g. Rahul"
                         value={passengers[i]?.firstName || ""}
                         onChange={(e) => handleInputChange(i, 'firstName', e.target.value)}
                         className="w-full bg-white border-2 border-slate-100 p-4 rounded-2xl outline-none focus:border-blue-600/30 focus:shadow-lg focus:shadow-blue-50 transition-all font-bold text-slate-900 text-sm"
                       />
                    </div>
                    <div className="md:col-span-5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1">Last Name</label>
                       <input 
                         type="text" 
                         placeholder="e.g. Sharma"
                         value={passengers[i]?.lastName || ""}
                         onChange={(e) => handleInputChange(i, 'lastName', e.target.value)}
                         className="w-full bg-white border-2 border-slate-100 p-4 rounded-2xl outline-none focus:border-blue-600/30 focus:shadow-lg focus:shadow-blue-50 transition-all font-bold text-slate-900 text-sm"
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-4">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1">Date of Birth</label>
                       <div className="relative">
                          <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                           type="date" 
                           value={passengers[i]?.dob || ""}
                           onChange={(e) => handleInputChange(i, 'dob', e.target.value)}
                           className="w-full bg-white border-2 border-slate-100 p-4 pl-12 rounded-2xl outline-none focus:border-blue-600/30 focus:shadow-lg focus:shadow-blue-50 transition-all font-bold text-slate-900 text-sm"
                          />
                       </div>
                    </div>

                    <div className="md:col-span-4">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1">Gender</label>
                       <div className="flex bg-slate-100 p-1.5 rounded-[1.25rem] border border-slate-200">
                          {["Male", "Female"].map(g => (
                            <button 
                              key={g}
                              type="button"
                              onClick={() => handleInputChange(i, 'gender', g)}
                              className={`flex-1 py-3 text-[10px] font-black rounded-xl transition-all ${passengers[i]?.gender === g ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                               {g}
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className="md:col-span-4">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1">Nationality</label>
                       <select 
                         value={passengers[i]?.nationality || "India"}
                         onChange={(e) => handleInputChange(i, 'nationality', e.target.value)}
                         className="w-full bg-white border-2 border-slate-100 p-4 rounded-2xl outline-none focus:border-blue-600/30 focus:shadow-lg focus:shadow-blue-50 transition-all font-bold text-slate-900 text-sm appearance-none"
                       >
                          {NATIONALITIES.map(n => <option key={n} value={n}>{n}</option>)}
                       </select>
                    </div>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>

      {/* Contact Details Section */}
      <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all duration-300">
         <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center animate-pulse">
               <Phone size={22} />
            </div>
            <div>
               <h3 className="text-xl font-black text-slate-900 tracking-tight">Contact Information</h3>
               <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Your ticket will be sent to these details</p>
            </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1 transition-colors group-focus-within:text-blue-600">Email Address</label>
               <div className="relative">
                  <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500" />
                  <input 
                    type="email" 
                    placeholder="e.g. rahul.sharma@gmail.com"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="w-full bg-white border-2 border-slate-100 p-5 pl-14 rounded-2xl outline-none focus:border-blue-600/30 focus:shadow-lg focus:shadow-blue-50 transition-all font-bold text-slate-900 text-sm"
                  />
               </div>
            </div>
            <div className="group">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1 transition-colors group-focus-within:text-blue-600">Mobile Number</label>
               <div className="flex gap-4">
                  <select 
                    value={contactInfo.countryCode}
                    onChange={(e) => setContactInfo({ ...contactInfo, countryCode: e.target.value })}
                    className="w-24 bg-white border-2 border-slate-100 p-5 rounded-2xl outline-none font-bold text-slate-900 text-sm appearance-none"
                  >
                     <option>+91</option>
                     <option>+1</option>
                     <option>+44</option>
                     <option>+65</option>
                  </select>
                  <div className="flex-1 relative">
                     <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500" />
                     <input 
                       type="tel" 
                       placeholder="10-digit number"
                       value={contactInfo.phone}
                       onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                       className="w-full bg-white border-2 border-slate-100 p-5 pl-14 rounded-2xl outline-none focus:border-blue-600/30 focus:shadow-lg focus:shadow-blue-50 transition-all font-bold text-slate-900 text-sm"
                     />
                  </div>
               </div>
            </div>
         </div>

         <div className="mt-8 p-6 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center gap-4 group/info">
            <Info className="text-blue-600 shrink-0 group-hover/info:scale-110 transition-transform" size={20} />
            <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-wider">Note: E-Ticket and flight updates will be sent to the provided email and phone number.</p>
         </div>
      </section>

      {/* Action Button */}
      <div className="flex justify-between items-center bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm border-b-4 border-b-blue-600">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
               <ShieldCheck size={20} />
            </div>
            <div>
               <p className="text-sm font-black text-slate-900">100% Secure Checkout</p>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">TLS 1.2 Encrypted Connection</p>
            </div>
         </div>
         <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.15em] shadow-xl flex items-center gap-4 group/btn transition-all hover:bg-blue-600 hover:shadow-blue-200"
         >
            Continue to Review <ArrowRight size={20} strokeWidth={3} className="group-hover/btn:translate-x-2 transition-transform" />
         </motion.button>
      </div>

      {/* Saved Travellers Modal */}
      <AnimatePresence>
        {showSavedModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSavedModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
             <motion.div initial={{ scale: 0.95, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 30 }} className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-xl overflow-hidden">
                <div className="p-8 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                   <div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">Saved Travellers</h3>
                      <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Choose a traveller to auto-fill details</p>
                   </div>
                   <button onClick={() => setShowSavedModal(false)} className="p-3 hover:bg-slate-200/50 rounded-full transition-colors"><CloseIcon size={24} className="text-slate-400" /></button>
                </div>
                <div className="p-8 space-y-4 max-h-[60vh] overflow-y-auto">
                   {savedTravellers.map((t, idx) => (
                     <button 
                      key={idx} 
                      onClick={() => selectSaved(t)}
                      className="w-full flex items-center gap-6 p-6 rounded-[2rem] bg-white border-2 border-slate-100 hover:border-blue-600/30 hover:bg-blue-50/30 hover:shadow-lg hover:shadow-blue-50/50 transition-all text-left group"
                     >
                        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-sm transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105">
                           <User size={32} />
                        </div>
                        <div className="flex-1">
                           <p className="text-lg font-black text-slate-900">{t.title}. {t.firstName} {t.lastName}</p>
                           <p className="text-[11px] font-black text-slate-400 mt-2 uppercase tracking-[0.2em] leading-none flex items-center gap-3">
                              {t.gender} <span className="w-1 h-1 rounded-full bg-slate-300" /> {t.nationality}
                           </p>
                        </div>
                        <div className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-200 group-hover:border-blue-600 group-hover:text-blue-600 transition-colors">
                           <ChevronRight size={20} strokeWidth={3} />
                        </div>
                     </button>
                   ))}
                </div>
                <div className="p-8 bg-slate-50 border-t border-slate-200 flex justify-center">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck size={14} className="text-emerald-500" /> Powered by Yatralo Security
                   </p>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
