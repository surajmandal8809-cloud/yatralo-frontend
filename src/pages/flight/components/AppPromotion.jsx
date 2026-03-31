import React, { useState } from "react";
import { Smartphone, Zap, ShieldCheck, Heart, Sparkles, Send } from "lucide-react";

const AppPromotion = () => {
    const [phone, setPhone] = useState("");

    return (
        <section className="bg-gradient-to-br from-[#7733ff] to-[#f97316] py-24 px-6 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-white/10 blur-[100px] rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-white/10 blur-[100px] rounded-full -ml-32 -mb-32" />
            
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
                <div className="md:w-1/2 text-white">
                    <div className="inline-flex items-center gap-2 bg-white/20 border border-white/25 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
                        <Sparkles size={14} className="text-yellow-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">More Features In Your Pocket</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter leading-none">
                        Download Yatralo <br />
                        App Now & Save More!
                    </h2>
                    <p className="text-white/80 font-medium text-lg leading-relaxed mb-12 max-w-xl">
                        Get exclusive in-app offers, the fastest booking experience, and 24/7 priority support. Over 10M downloads across India!
                    </p>

                    <div className="grid grid-cols-2 gap-8 mb-12 border-t border-white/10 pt-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-2xl backdrop-blur-md shadow-lg border border-white/10">
                                <Zap className="text-yellow-400" size={24} />
                            </div>
                            <span className="text-sm font-black tracking-tight">Super Fast Bookings</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-2xl backdrop-blur-md shadow-lg border border-white/10">
                                <ShieldCheck className="text-emerald-400" size={24} />
                            </div>
                            <span className="text-sm font-black tracking-tight">Safe Journeys Always</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="flex-1 w-full bg-white/10 backdrop-blur-xl p-1 rounded-2xl flex items-center shadow-lg border border-white/20">
                            <div className="px-4 py-4 border-r border-white/20 text-white font-black text-sm uppercase tracking-widest">+91</div>
                            <input 
                                type="tel" 
                                placeholder="Enter Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-transparent p-4 outline-none text-white placeholder:text-white/50 font-black text-sm uppercase tracking-widest"
                            />
                            <button className="flex items-center justify-center gap-2 p-3 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform min-w-[120px]">
                                Get Link <Send size={14} />
                            </button>
                        </div>
                        
                        <div className="flex-shrink-0 flex items-center gap-4">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-10 hover:scale-110 transition-transform cursor-pointer shadow-lg" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10 hover:scale-110 transition-transform cursor-pointer shadow-lg" />
                        </div>
                    </div>
                </div>

                {/* iPhone Pro Mockup or QR code area */}
                <div className="md:w-1/2 flex items-center justify-center relative">
                    <div className="relative z-20 hover:scale-105 transition-transform duration-1000">
                        <div className="bg-white/10 backdrop-blur-3xl border border-white/30 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-[60px] rounded-full group-hover:bg-white/30 transition-colors" />
                           
                           <div className="bg-white p-6 rounded-[2rem] shadow-2xl relative z-10 group-hover:rotate-6 transition-transform duration-500">
                               <img 
                                   src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1024px-QR_code_for_mobile_English_Wikipedia.svg.png" 
                                   alt="QR" 
                                   className="w-48 h-48 opacity-90 group-hover:opacity-100 transition-opacity" 
                                   onError={(e) => {
                                       e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://yatralo.online";
                                   }}
                               />
                           </div>
                           
                           <div className="mt-8 text-center text-white/80 font-black text-[10px] uppercase tracking-widest group-hover:text-white transition-colors leading-relaxed">
                               Scan to Download <br />
                               Yatralo App Now
                           </div>
                        </div>
                    </div>
                    
                    {/* Ambient Glow behind QR */}
                    <div className="absolute inset-0 bg-white/20 blur-[100px] rounded-full animate-pulse" />
                </div>
            </div>
        </section>
    );
};

export default AppPromotion;
