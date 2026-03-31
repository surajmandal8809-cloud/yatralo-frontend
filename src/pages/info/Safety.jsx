import React from "react";
import { Sparkles, ArrowLeft, ShieldCheck, Heart, Zap, Award, Globe, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Safety = () => {
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
                    <div className="bg-orange-50 w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-orange-600 mb-8">
                        <Sparkles size={40} />
                    </div>

                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">
                        Your Safety, Our Priority
                    </h1>
                    <p className="text-slate-500 font-medium italic text-sm mb-12">
                        We’re committed to providing a safe and healthy travel environment for all our passengers and partners.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {[
                            { title: "Safe Travel Insurance", desc: "Covers medical emergencies, trip cancellations & lost baggage.", icon: ShieldCheck, bg: "bg-blue-50", color: "text-blue-600" },
                            { title: "Hygiene Standards", desc: "All our partner airlines & hotels follow strict sanitization protocols.", icon: Heart, bg: "bg-rose-50", color: "text-rose-600" },
                            { title: "Instant Assistance", desc: "Zero-wait customer support for travel safety & emergency needs.", icon: Zap, bg: "bg-orange-50", color: "text-orange-600" },
                            { title: "Quality Partners", desc: "We only work with top-rated operators with 4.5+ safety ratings.", icon: Award, bg: "bg-amber-50", color: "text-amber-600" }
                        ].map((item, i) => (
                            <div key={i} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/30 flex flex-col items-start gap-6 group hover:bg-white transition-all duration-500">
                                <div className={`w-16 h-16 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <item.icon size={30} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-slate-900 mb-2 leading-tight">{item.title}</h4>
                                    <p className="text-xs font-medium text-slate-400 italic leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-br from-[#7733ff] to-[#f97316] rounded-[2rem] p-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-[60px] rounded-full" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/20 blur-[60px] rounded-full" />
                        
                        <div className="relative z-10 text-center">
                            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/25 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
                                <Globe size={14} className="text-yellow-400" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Safe Travel Certificate</span>
                            </div>
                            <h3 className="text-3xl font-black mb-6 tracking-tight">World-Class Travel Insurance</h3>
                            <p className="text-white/80 font-medium text-sm leading-relaxed mb-12 max-w-xl mx-auto italic">
                                Protecting your journey is essential. Get insured with our premium travel protection plan at just ₹199 per person.
                            </p>
                            <button className="px-10 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-black/20 hover:scale-105 transition-transform">
                                View Protection Plans
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Safety;
