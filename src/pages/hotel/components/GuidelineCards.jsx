import React from "react";
import { ShieldCheck, CalendarCheck, Clock, PhoneCall, ChevronRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GuidelineCards = () => {
    const navigate = useNavigate();

    const guidelines = [
        {
            title: "Safe Hotel Stays",
            desc: "Updated hygiene and guest guidelines",
            icon: ShieldCheck,
            color: "text-blue-600",
            bg: "bg-blue-50",
            link: "/travel-guidelines"
        },
        {
            title: "Online Check-in",
            desc: "Skip the lobby wait, check-in online",
            icon: CalendarCheck,
            color: "text-[#7c3aed]",
            bg: "bg-indigo-50",
            link: "/web-checkin"
        },
        {
            title: "My Safety",
            desc: "Health protocols for all property stays",
            icon: Sparkles,
            color: "text-orange-600",
            bg: "bg-orange-50",
            link: "/safety"
        },
        {
            title: "24/7 Concierge",
            desc: "Always here for all your booking needs",
            icon: PhoneCall,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            link: "/support"
        }
    ];

    return (
        <section className="bg-slate-50 py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {guidelines.map((item, i) => (
                        <div 
                            key={i} 
                            onClick={() => navigate(item.link)}
                            className="group bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl transition-all cursor-pointer"
                        >
                            <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                                <item.icon size={28} />
                            </div>
                            <h3 className="text-xl font-black mb-3 text-slate-900 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                            <p className="text-slate-500 font-medium text-xs leading-relaxed mb-6 italic">{item.desc}</p>
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#7c3aed] group-hover:gap-3 transition-all">
                                Know More <ChevronRight size={14} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GuidelineCards;
