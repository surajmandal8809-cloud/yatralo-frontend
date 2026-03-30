import React from "react";
import UserLayout from "./UserLayout";
import { User, ShieldCheck, MapPin, Calendar, Heart, Share2, MoreVertical, Star, Key, FileText } from "lucide-react";
import { useGetUserQuery } from "../../services/userService";

const AccountPage = () => {
    const token = localStorage.getItem("token");
    const { data } = useGetUserQuery(token, { skip: !token });
    const user = data?.data;

    return (
        <UserLayout activeTab="account">
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom duration-700">
                
                {/* Account Settings Header */}
                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                   <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                         <Key size={28} />
                      </div>
                      <div>
                         <h2 className="text-3xl font-black italic uppercase tracking-tight">Security & Account</h2>
                         <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-1">Manage your identity and privacy across YatraLo</p>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                   {/* Saved Travelers */}
                   <section className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-sm hover:shadow-xl transition-all duration-700">
                      <div className="flex items-center justify-between mb-10">
                         <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                            Saved Travelers
                         </h3>
                         <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest border border-blue-100 px-4 py-2 rounded-xl hover:bg-blue-50 transition-all">+ Add New</button>
                      </div>
                      
                      <div className="space-y-4">
                         {[
                           { name: 'Self - Traveler', role: 'Primary', status: 'Verified' },
                           { name: 'Aditi Singhania', role: 'Family', status: 'Pending' }
                         ].map(t => (
                           <div key={t.name} className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-between group hover:bg-white hover:border-blue-200 transition-all">
                              <div className="flex items-center gap-5">
                                 <div className="w-11 h-11 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors shadow-sm"><User size={20} /></div>
                                 <div className="text-left">
                                    <p className="text-sm font-black text-slate-900 uppercase italic tracking-tight">{t.name}</p>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{t.role} Member</p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-6">
                                 <span className={`text-[9px] font-black uppercase ${t.status === 'Verified' ? 'text-emerald-500 bg-emerald-50' : 'text-orange-500 bg-orange-50'} px-2 py-1 rounded-lg`}>{t.status}</span>
                                 <button className="p-2 text-slate-300 hover:text-slate-900 transition-all"><MoreVertical size={16} /></button>
                              </div>
                           </div>
                         ))}
                      </div>
                   </section>

                   {/* Privacy Settings */}
                   <section className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-sm hover:shadow-xl transition-all duration-700">
                      <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                         Privacy Preferences
                      </h3>
                      <div className="space-y-8">
                         {[
                           { label: 'Profile Visibility', desc: 'Allow others to see my travel history and reviews', active: true },
                           { label: 'CloudSync Sync', desc: 'Sync my data across all platforms immediately', active: true },
                           { label: 'Ad Personalization', desc: 'Use my travel patterns to show relevant offers', active: false },
                         ].map(p => (
                            <div key={p.label} className="flex items-center justify-between gap-6 group">
                               <div className="flex-1">
                                  <p className="text-sm font-black text-slate-900 uppercase italic tracking-tight mb-1">{p.label}</p>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">{p.desc}</p>
                               </div>
                               <button className={`w-12 h-6 rounded-full p-1 transition-all ${p.active ? 'bg-blue-600' : 'bg-slate-200'}`}>
                                  <div className={`w-4 h-4 bg-white rounded-full transition-all ${p.active ? 'translate-x-6' : 'translate-x-0'}`} />
                               </button>
                            </div>
                         ))}
                      </div>
                   </section>

                   {/* Legal & Documents */}
                   <section className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-sm lg:col-span-2 hover:shadow-xl transition-all duration-700">
                      <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                         Documents & Legal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         {[
                            { label: 'Identity Proof', desc: 'Passport ending in 4521', icon: FileText, color: 'text-indigo-600' },
                            { label: 'Visa Records', desc: '3 Active visas found', icon: MapPin, color: 'text-emerald-600' },
                            { label: 'Terms of Service', desc: 'Updated Mar 2024', icon: ShieldCheck, color: 'text-blue-600' },
                         ].map(d => (
                           <div key={d.label} className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] flex flex-col items-center justify-center text-center group hover:bg-white hover:border-blue-200 hover:shadow-xl transition-all">
                              <div className={`w-14 h-14 bg-white border border-slate-100 rounded-3xl flex items-center justify-center ${d.color} shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all mb-6`}><d.icon size={24} /></div>
                              <h5 className="text-sm font-black text-slate-900 uppercase italic leading-none mb-2">{d.label}</h5>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{d.desc}</p>
                           </div>
                         ))}
                      </div>
                   </section>
                </div>
            </div>
        </UserLayout>
    );
};

export default AccountPage;
