import React from "react";
import { User, Mail, Phone, ShieldCheck, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function HotelGuestForm({ primaryGuest, setPrimaryGuest, contactInfo, setContactInfo }) {
    return (
        <div className="space-y-8 pb-10">
            {/* Primary Guest Details */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 group hover:shadow-md transition-all duration-500"
            >
                <div className="flex items-center gap-5 mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-100 group-hover:scale-105 transition-transform">
                        <User size={28} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Primary Guest Details</h2>
                        <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-widest">Details as per your Government ID</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group/input">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1 group-focus-within/input:text-blue-600 transition-colors">First & Middle Name</label>
                        <div className="relative">
                            <input 
                                type="text"
                                placeholder="e.g. Rahul"
                                value={primaryGuest.firstName} 
                                onChange={(e) => setPrimaryGuest({...primaryGuest, firstName: e.target.value})} 
                                className="w-full p-4 pl-5 bg-white border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:border-blue-600/30 focus:shadow-lg focus:shadow-blue-50 transition-all" 
                            />
                        </div>
                    </div>
                    <div className="group/input">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1 group-focus-within/input:text-blue-600 transition-colors">Last Name</label>
                        <div className="relative">
                            <input 
                                type="text"
                                placeholder="e.g. Sharma"
                                value={primaryGuest.lastName} 
                                onChange={(e) => setPrimaryGuest({...primaryGuest, lastName: e.target.value})} 
                                className="w-full p-4 pl-5 bg-white border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:border-blue-600/30 focus:shadow-lg focus:shadow-blue-50 transition-all" 
                            />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 group hover:shadow-md transition-all duration-500"
            >
                <div className="flex items-center gap-5 mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-50 group-hover:scale-105 transition-transform">
                        <Mail size={28} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Contact Information</h2>
                        <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-widest">Voucher & updates will be sent here</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group/input">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1 group-focus-within/input:text-blue-600 transition-colors">Email Address</label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-blue-600" />
                            <input 
                                type="email"
                                placeholder="e.g. rahul@example.com"
                                value={contactInfo.email} 
                                onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})} 
                                className="w-full p-4 pl-14 bg-white border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:border-blue-600/30 focus:shadow-lg focus:shadow-blue-50 transition-all" 
                            />
                        </div>
                    </div>
                    <div className="group/input">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1 group-focus-within/input:text-blue-600 transition-colors">Mobile Number</label>
                        <div className="relative">
                            <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-blue-600" />
                            <input 
                                type="tel"
                                placeholder="10-digit number"
                                value={contactInfo.phone} 
                                onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})} 
                                className="w-full p-4 pl-14 bg-white border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:border-blue-600/30 focus:shadow-lg focus:shadow-blue-50 transition-all" 
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-10 p-5 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center gap-4">
                    <Info className="text-blue-600 shrink-0" size={20} />
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">Important: Ensure details match your check-in ID to avoid any hassle at the property.</p>
                </div>
            </motion.div>
        </div>
    );
}
