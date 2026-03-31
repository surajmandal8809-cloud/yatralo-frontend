import React, { useState } from "react";
import { User, Plus, Phone, Mail, Calendar, UserCheck, ShieldCheck, ArrowRight, X as CloseIcon, Info, ChevronRight, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAddSavedTravellerMutation, useDeleteSavedTravellerMutation } from "../../../services/userService";
import toast from "react-hot-toast";

const TITLES = ["Mr", "Mrs", "Ms", "Miss", "Dr"];
const NATIONALITIES = ["India", "United Arab Emirates", "Singapore", "United Kingdom", "USA", "Canada", "Australia"];

export default function PassengerDetailsComponent({ passengers, setPassengers, pax, userData, onNext, contactInfo, setContactInfo }) {
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [addSavedTraveller] = useAddSavedTravellerMutation();
  const [deleteSavedTraveller] = useDeleteSavedTravellerMutation();

  const handleInputChange = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index] = { ...newPassengers[index], [field]: value };
    setPassengers(newPassengers);
  };

  const handleSaveTraveller = async (p) => {
    if (!userData) return toast.error("Please login to save travellers");
    if (!p.firstName || !p.lastName) return toast.error("Please fill name first");
    try {
      await addSavedTraveller({
        first_name: p.firstName,
        last_name: p.lastName,
        gender: p.gender?.toUpperCase() || 'MALE',
        type: 'ADULT'
      }).unwrap();
      toast.success("Traveller saved successfully!");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save traveller");
    }
  };

  const handleDeleteSaved = async (id) => {
    try {
      await deleteSavedTraveller(id).unwrap();
      toast.success("Traveller deleted!");
    } catch (err) {
      toast.error("Failed to delete traveller");
    }
  };

  const selectSaved = (t) => {
    const emptyIndex = passengers.findIndex(p => !p.firstName);
    const targetIndex = emptyIndex !== -1 ? emptyIndex : 0;
    
    handleInputChange(targetIndex, 'title', t.gender === 'FEMALE' ? 'Mrs' : 'Mr');
    handleInputChange(targetIndex, 'firstName', t.first_name);
    handleInputChange(targetIndex, 'lastName', t.last_name);
    handleInputChange(targetIndex, 'gender', t.gender === 'MALE' ? 'Male' : 'Female');
    setShowSavedModal(false);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
         <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#f97316] text-white flex items-center justify-center shadow-lg shadow-orange-100">
               <User size={28} strokeWidth={2.5} />
            </div>
            <div>
               <h3 className="text-2xl font-black text-slate-900 tracking-tight">Traveller Details</h3>
               <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Please enter details as per your government ID</p>
            </div>
         </div>
         <button 
          onClick={() => setShowSavedModal(true)}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-orange-50 text-[#f97316] rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-orange-100 transition-all border border-orange-100"
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
             className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
           >
              <div className="px-8 py-4 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">
                       {i + 1}
                    </span>
                    <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest">
                       Adult Traveller
                    </p>
                 </div>
                 <div className="flex items-center gap-2 px-2 py-1 bg-white border border-slate-100 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Primary ID Required</span>
                 </div>
              </div>
              
              <div className="p-8 space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="relative group">
                       <label className="absolute -top-2 left-4 bg-white px-2 text-[9px] font-black text-slate-400 group-focus-within:text-blue-600 uppercase tracking-[0.2em] transition-all z-10">Title</label>
                       <select 
                         value={passengers[i]?.title || "Mr"}
                         onChange={(e) => handleInputChange(i, 'title', e.target.value)}
                         className="w-full bg-white border border-slate-200 p-4 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all font-black text-slate-900 text-sm appearance-none"
                       >
                          {TITLES.map(t => <option key={t} value={t}>{t}</option>)}
                       </select>
                       <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 rotate-90 pointer-events-none" size={16} />
                    </div>
                    <div className="md:col-span-1.5 relative group">
                       <label className="absolute -top-2 left-4 bg-white px-2 text-[9px] font-black text-slate-400 group-focus-within:text-blue-600 uppercase tracking-[0.2em] transition-all z-10">First & Middle Name</label>
                       <input 
                         type="text" 
                         placeholder="As per Passport"
                         value={passengers[i]?.firstName || ""}
                         onChange={(e) => handleInputChange(i, 'firstName', e.target.value)}
                         className="w-full bg-white border border-slate-200 p-4 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all font-black text-slate-900 text-sm placeholder:text-slate-200"
                       />
                    </div>
                    <div className="md:col-span-1.5 relative group">
                       <label className="absolute -top-2 left-4 bg-white px-2 text-[9px] font-black text-slate-400 group-focus-within:text-blue-600 uppercase tracking-[0.2em] transition-all z-10">Last Name</label>
                       <input 
                         type="text" 
                         placeholder="As per Passport"
                         value={passengers[i]?.lastName || ""}
                         onChange={(e) => handleInputChange(i, 'lastName', e.target.value)}
                         className="w-full bg-white border border-slate-200 p-4 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all font-black text-slate-900 text-sm placeholder:text-slate-200"
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="relative group">
                       <label className="absolute -top-2 left-4 bg-white px-2 text-[9px] font-black text-slate-400 group-focus-within:text-blue-600 uppercase tracking-[0.2em] transition-all z-10">Date of Birth</label>
                       <div className="relative">
                          <input 
                            type="date" 
                            value={passengers[i]?.dob || ""}
                            onChange={(e) => handleInputChange(i, 'dob', e.target.value)}
                            className="w-full bg-white border border-slate-200 p-4 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all font-black text-slate-900 text-sm"
                          />
                       </div>
                    </div>

                    <div className="relative group">
                       <label className="absolute -top-2 left-4 bg-white px-2 text-[9px] font-black text-slate-400 group-focus-within:text-blue-600 uppercase tracking-[0.2em] transition-all z-10">Gender</label>
                       <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                          {["Male", "Female", "Other"].map(g => (
                            <button 
                              key={g}
                              type="button"
                              onClick={() => handleInputChange(i, 'gender', g)}
                              className={`flex-1 py-3 text-[10px] font-black rounded-lg transition-all ${passengers[i]?.gender === g ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                               {g}
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className="md:col-span-1.2 relative group flex-1">
                       <label className="absolute -top-2 left-4 bg-white px-2 text-[9px] font-black text-slate-400 group-focus-within:text-blue-600 uppercase tracking-[0.2em] transition-all z-10">Nationality</label>
                       <select 
                         value={passengers[i]?.nationality || "India"}
                         onChange={(e) => handleInputChange(i, 'nationality', e.target.value)}
                         className="w-full bg-white border border-slate-200 p-4 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all font-black text-slate-900 text-sm appearance-none"
                       >
                          {NATIONALITIES.map(n => <option key={n} value={n}>{n}</option>)}
                       </select>
                       <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 rotate-90 pointer-events-none" size={16} />
                    </div>
                 </div>

                 <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                    <button 
                      onClick={() => handleSaveTraveller(passengers[i])}
                      className="flex items-center gap-3 group/save cursor-pointer"
                    >
                      <div className="w-5 h-5 rounded-lg border-2 border-slate-200 flex items-center justify-center transition-all group-hover/save:border-blue-600 group-hover/save:bg-blue-50">
                        <UserCheck size={12} className="text-blue-600 scale-0 group-hover/save:scale-110 transition-transform" />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover/save:text-blue-600 transition-colors">Save this traveller for future use</span>
                    </button>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50/50 rounded-lg">
                      <ShieldCheck size={12} className="text-blue-500" />
                      <span className="text-[9px] font-black text-blue-400 uppercase tracking-tighter">Your details are safe with us</span>
                    </div>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>

      {/* Contact Details Section */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all duration-300">
         <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
               <Phone size={20} />
            </div>
            <div>
               <h3 className="text-lg font-black text-slate-900 tracking-tight">Contact Information</h3>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Updates will be sent to the primary contact</p>
            </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="relative group">
               <label className="absolute -top-2 left-4 bg-white px-2 text-[9px] font-black text-slate-400 group-focus-within:text-blue-600 uppercase tracking-[0.2em] transition-all z-10">Email Address</label>
               <input 
                 type="email" 
                 placeholder="e.g. rahul.sharma@example.com"
                 value={contactInfo.email}
                 onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                 className="w-full bg-white border border-slate-200 p-5 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all font-black text-slate-900 text-sm"
               />
            </div>
            <div className="flex gap-4">
               <div className="relative group w-32 shrink-0">
                  <label className="absolute -top-2 left-4 bg-white px-2 text-[9px] font-black text-slate-400 group-focus-within:text-blue-600 uppercase tracking-[0.2em] transition-all z-10">Code</label>
                  <select 
                    value={contactInfo.countryCode}
                    onChange={(e) => setContactInfo({ ...contactInfo, countryCode: e.target.value })}
                    className="w-full bg-white border border-slate-200 p-5 rounded-xl outline-none font-black text-slate-900 text-sm appearance-none"
                  >
                     {["+91", "+1", "+44", "+65", "+971"].map(c => <option key={c}>{c}</option>)}
                  </select>
               </div>
               <div className="relative group flex-1">
                  <label className="absolute -top-2 left-4 bg-white px-2 text-[9px] font-black text-slate-400 group-focus-within:text-blue-600 uppercase tracking-[0.2em] transition-all z-10">Mobile Number</label>
                  <input 
                    type="tel" 
                    placeholder="10-digit number"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    className="w-full bg-white border border-slate-200 p-5 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all font-black text-slate-900 text-sm"
                  />
               </div>
            </div>
         </div>

         <div className="mt-8 p-5 bg-blue-50/30 border border-blue-100 rounded-2xl flex items-center gap-4">
            <ShieldCheck className="text-blue-500 shrink-0" size={20} />
            <p className="text-[10px] font-bold text-blue-600 leading-relaxed uppercase tracking-wider">Your data is secured using industry-standard TLS encryption.</p>
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
          className="px-10 py-5 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-2xl font-black uppercase tracking-[0.15em] shadow-xl flex items-center gap-4 group/btn transition-all hover:saturate-150 shadow-orange-100"
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
                   {userData?.saved_travellers?.length > 0 ? (
                      userData.saved_travellers.map((t, idx) => (
                        <div key={idx} className="relative group/card">
                          <button 
                            onClick={() => selectSaved(t)}
                            className="w-full flex items-center gap-6 p-6 rounded-[2rem] bg-white border-2 border-slate-100 hover:border-blue-600/30 hover:bg-blue-50/30 transition-all text-left group"
                          >
                            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-sm transition-all group-hover:bg-blue-600 group-hover:text-white">
                                <User size={32} />
                            </div>
                            <div className="flex-1">
                                <p className="text-lg font-black text-slate-900 uppercase tracking-tight">{t.first_name} {t.last_name}</p>
                                <p className="text-[11px] font-black text-slate-400 mt-2 uppercase tracking-[0.2em] flex items-center gap-3">
                                  {t.gender} <span className="w-1 h-1 rounded-full bg-slate-300" /> {t.type}
                                </p>
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-slate-100 flex items-center justify-center text-slate-200 group-hover:border-blue-600 group-hover:text-blue-600">
                                <ChevronRight size={20} strokeWidth={3} />
                            </div>
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleDeleteSaved(t._id); }}
                            className="absolute top-2 right-2 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 hover:scale-110 transition-all border border-slate-100 opacity-0 group-hover/card:opacity-100 z-10"
                            title="Delete Saved Traveller"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="py-20 text-center space-y-4">
                         <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                            <User size={40} />
                         </div>
                         <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No saved travellers found</p>
                      </div>
                    )}
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
