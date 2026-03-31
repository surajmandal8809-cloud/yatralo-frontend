import React, { useState } from "react";
import { CalendarCheck, ArrowLeft, Plane, HelpCircle, Briefcase, Zap, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WebCheckin = () => {
    const [pnr, setPnr] = useState("");
    const [lastn, setLastn] = useState("");
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-[#7c3aed] transition-colors mb-8 font-black uppercase text-[10px] tracking-widest"
                >
                    <ArrowLeft size={16} /> Back to Search
                </button>

                <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-2xl shadow-slate-200/50">
                    <div className="bg-indigo-50 w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-[#7c3aed] mb-8">
                        <CalendarCheck size={40} />
                    </div>

                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">
                        Instant Web Check-in
                    </h1>
                    <p className="text-slate-500 font-medium italic text-sm mb-12">
                        Skip the airport queues & select your preferred seats by checking-in online.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                            <h3 className="text-xl font-black text-slate-900 mb-6">Enter Details</h3>
                            <div className="space-y-6">
                                <div className="p-4 bg-white rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Booking ID / PNR</p>
                                    <input 
                                        type="text" 
                                        placeholder="ABC123"
                                        value={pnr}
                                        onChange={(e) => setPnr(e.target.value)}
                                        className="w-full bg-transparent outline-none text-slate-900 font-black text-sm uppercase tracking-widest"
                                    />
                                </div>
                                <div className="p-4 bg-white rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Last Name / Email</p>
                                    <input 
                                        type="text" 
                                        placeholder="KUMAR"
                                        value={lastn}
                                        onChange={(e) => setLastn(e.target.value)}
                                        className="w-full bg-transparent outline-none text-slate-900 font-black text-sm uppercase tracking-widest"
                                    />
                                </div>
                                <button className="w-full py-4 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-100 flex items-center justify-center gap-2">
                                    Proceed to Check-in <Search size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { title: "Save Time", desc: "Check-in up to 48 hours early.", icon: Zap, bg: "bg-orange-50", color: "text-orange-600" },
                                { title: "Select Seats", desc: "Choose your favorite seats online.", icon: Plane, bg: "bg-blue-50", color: "text-blue-600" },
                                { title: "Baggage Tags", desc: "Download & print tags at home.", icon: Briefcase, bg: "bg-emerald-50", color: "text-emerald-600" }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/30 flex items-center gap-6">
                                    <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center shrink-0`}>
                                        <item.icon size={26} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{item.title}</h4>
                                        <p className="text-[10px] font-medium text-slate-400 italic">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-[2rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-white/60">
                                <HelpCircle size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black mb-1">Need help with Check-in?</h3>
                                <p className="text-white/40 text-[10px] font-medium uppercase tracking-widest">Our customer support is available 24/7</p>
                            </div>
                        </div>
                        <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-white/10">
                            Visit Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebCheckin;
