import React, { useState } from "react";
import UserLayout from "./UserLayout";
import { 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Smartphone, 
  Lock, 
  User, 
  Mail, 
  Phone, 
  Bell, 
  Languages, 
  Eye, 
  EyeOff, 
  Save, 
  X, 
  CheckCircle2 
} from "lucide-react";
import toast from "react-hot-toast";

const SettingsPage = () => {
    const [is2FAEnabled, setIs2FAEnabled] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [passkeyActive, setPasskeyActive] = useState(false);

    const handleSaveSecurity = () => {
        toast.promise(
            new Promise(res => setTimeout(res, 1000)),
            {
                loading: 'Updating security parameters...',
                success: 'Security settings updated!',
                error: 'Update failed'
            }
        );
    };

    return (
        <UserLayout activeTab="settings">
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom duration-700">
                
                {/* Profile & Security Header */}
                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                   <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform">
                         <ShieldCheck size={28} />
                      </div>
                      <div>
                         <h2 className="text-3xl font-black italic uppercase tracking-tight">Account Settings</h2>
                         <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-1">Configure your authentication and privacy preferences</p>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                   {/* Security Section (MMT Premium Style) */}
                   <section className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-sm relative group overflow-hidden hover:shadow-xl transition-all duration-700 flex flex-col">
                      <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600" />
                      <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                         Security & Access
                      </h3>

                      <div className="space-y-10 flex-1">
                         <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                               <div className="w-11 h-11 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-all"><Lock size={20} /></div>
                               <div><p className="text-sm font-black text-slate-950 uppercase italic leading-none mb-1">Passkey Login</p><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">Fast biometric authentication using your device</p></div>
                            </div>
                            <button onClick={() => setPasskeyActive(!passkeyActive)} className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${passkeyActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500 border border-slate-100'}`}>{passkeyActive ? 'ACTIVE' : 'SETUP'}</button>
                         </div>

                         <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                               <div className="w-11 h-11 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-all"><Smartphone size={20} /></div>
                               <div><p className="text-sm font-black text-slate-950 uppercase italic leading-none mb-1">Two-Factor Auth</p><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">Secures logins with a second authentication step</p></div>
                            </div>
                            <div onClick={() => setIs2FAEnabled(!is2FAEnabled)} className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-all ${is2FAEnabled ? 'bg-blue-600' : 'bg-slate-200'}`}><div className={`w-4 h-4 bg-white rounded-full transition-all ${is2FAEnabled ? 'translate-x-6' : 'translate-x-0'}`} /></div>
                         </div>
                      </div>

                      <div className="mt-12 pt-10 border-t border-slate-100">
                         <button onClick={handleSaveSecurity} className="w-full py-5 bg-slate-900 text-white rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-slate-100"><Save size={14} /> Update Security Profile</button>
                      </div>
                   </section>

                   {/* Privacy & Comm Section */}
                   <section className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-sm relative group overflow-hidden hover:shadow-xl transition-all duration-700">
                      <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-600" />
                      <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                         Communications
                      </h3>
                      
                      <div className="space-y-8">
                         {[
                           { label: 'Push Notifications', desc: 'Alerts for booking status and flight changes', icon: Bell, active: true },
                           { label: 'System Language', desc: 'English (United Kingdom)', icon: Languages, active: 'en' },
                         ].map((p,i) => (
                           <div key={i} className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:border-indigo-200 transition-all cursor-pointer">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-all"><p.icon size={18} /></div>
                                 <div><p className="text-xs font-black text-slate-900 uppercase italic leading-none mb-1">{p.label}</p><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{p.desc}</p></div>
                              </div>
                              <ChevronRight size={14} className="text-slate-300" />
                           </div>
                         ))}
                      </div>

                      <div className="mt-10 p-6 bg-blue-50 rounded-[2rem] border border-blue-100 flex items-start gap-4">
                         <CheckCircle2 size={24} className="text-blue-600 shrink-0" />
                         <div>
                            <p className="text-[10px] font-black text-blue-900 uppercase tracking-tight mb-1">Preferences Unified</p>
                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic font-sans leading-relaxed">Your account data is synced across Desktop, Mobile, and TV apps for a seamless booking experience.</p>
                         </div>
                      </div>
                   </section>

                   {/* Delete Account (Extreme Caution) */}
                   <section className="lg:col-span-2 bg-rose-50 rounded-[3rem] border border-rose-100 p-10 shadow-sm relative group overflow-hidden hover:shadow-xl transition-all duration-700">
                      <div className="flex items-center justify-between gap-10">
                         <div className="flex-1">
                            <h3 className="text-sm font-black text-rose-900 uppercase italic tracking-tight mb-2 uppercase">Account Removal</h3>
                            <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest leading-relaxed italic">Once your account is deleted, your travel history and reward points will be permanently lost.</p>
                         </div>
                         <button className="px-10 py-4 bg-white border-2 border-rose-200 text-rose-600 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-xl shadow-rose-100">Delete Account</button>
                      </div>
                   </section>
                </div>
            </div>
        </UserLayout>
    );
};

export default SettingsPage;
