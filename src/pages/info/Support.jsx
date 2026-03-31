import React, { useState } from "react";
import { PhoneCall, ArrowLeft, Mail, MessageSquare, Clock, Globe, ChevronRight, HelpCircle, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Support = () => {
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="max-w-5xl mx-auto px-6">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-[#7c3aed] transition-colors mb-8 font-black uppercase text-[10px] tracking-widest"
                >
                    <ArrowLeft size={16} /> Back to Search
                </button>

                <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-2xl shadow-slate-200/50">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-16 mb-20 border-b border-slate-50 pb-20">
                        <div className="md:w-1/2">
                            <div className="bg-emerald-50 w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-emerald-600 mb-8 shadow-sm">
                                <PhoneCall size={40} />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">
                                24/7 Priority <br />
                                Support Center
                            </h1>
                            <p className="text-slate-500 font-medium italic text-sm mb-12 leading-relaxed">
                                Our travel experts are available around the clock to assist you with bookings, refunds, and special requests. Reach out anytime!
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <button className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-slate-200">
                                    <PhoneCall size={18} className="text-emerald-400" />
                                    Talk To Agent
                                </button>
                                <button className="flex items-center gap-3 px-8 py-4 bg-white border border-slate-100 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-lg">
                                    <Mail size={18} className="text-[#f97316]" />
                                    Email Support
                                </button>
                            </div>
                        </div>

                        <div className="md:w-1/2 bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-500/10">
                            <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight">Quick Message</h3>
                            <div className="space-y-6">
                                <div className="p-4 bg-white rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 italic">How can we help you today?</p>
                                    <textarea 
                                        rows="4"
                                        placeholder="Enter your message or issue..."
                                        value={msg}
                                        onChange={(e) => setMsg(e.target.value)}
                                        className="w-full bg-transparent outline-none text-slate-900 font-black text-sm uppercase tracking-widest resize-none"
                                    />
                                </div>
                                <button className="w-full py-4 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-100 flex items-center justify-center gap-2">
                                    Send Message <Send size={16} />
                                </button>
                                <p className="text-center text-[10px] font-medium text-slate-400 uppercase tracking-widest italic pt-2">Typical response time: &lt; 5 minutes</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Global Reach", icon: Globe, bg: "bg-blue-50", color: "text-blue-600", desc: "Support in 40+ countries & 12 languages." },
                            { title: "Live Chat", icon: MessageSquare, bg: "bg-indigo-50", color: "text-[#7c3aed]", desc: "Instant response on our website & mobile app." },
                            { title: "Real-time Status", icon: Clock, bg: "bg-orange-50", color: "text-[#f97316]", desc: "Live flight tracking & refund status updates." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-50 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all group cursor-pointer text-center">
                                <div className={`w-16 h-16 ${item.bg} ${item.color} rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                                    <item.icon size={30} />
                                </div>
                                <h4 className="text-lg font-black text-slate-900 mb-3 tracking-tight">{item.title}</h4>
                                <p className="text-xs font-medium text-slate-400 italic leading-relaxed">{item.desc}</p>
                                <div className="mt-6 flex items-center justify-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#7c3aed] group-hover:gap-2 transition-all">
                                    Learn More <ChevronRight size={14} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 p-10 bg-[#f8f9fa] rounded-[2.5rem] flex items-center justify-between gap-8 border border-slate-100">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-[#7c3aed] shadow-lg">
                                <HelpCircle size={32} />
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-slate-900 tracking-tight">Visit FAQ Center</h4>
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Get answers to the most common questions instantly</p>
                            </div>
                        </div>
                        <button className="px-10 py-4 bg-white text-slate-900 border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-slate-50 transition-colors">
                            View FAQs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
