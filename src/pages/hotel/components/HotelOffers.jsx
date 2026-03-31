import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Hotel, Waves, Coffee, Zap, Tag, ArrowRight } from "lucide-react";

const HotelOffers = () => {
    const tabs = [
        { id: "all", label: "All Stays", icon: Tag },
        { id: "luxury", label: "Luxury", icon: Waves },
        { id: "workations", label: "Workations", icon: Coffee },
        { id: "budget", label: "Budget", icon: Zap }
    ];

    const [activeTab, setActiveTab] = useState("all");

    const offers = [
        {
            category: "luxury",
            title: "Private Villa Retreats",
            desc: "Up to 35% OFF on 5-star properties worldwide. Experience royalty.",
            code: "LUXE35",
            img: "/assets/offers/hotel_offer.png",
            bg: "from-amber-600 to-orange-600"
        },
        {
            category: "workations",
            title: "Remote Work Special",
            desc: "Stay longer & save more. Special weekly & monthly rates for digital nomads.",
            code: "WORK20",
            img: "/assets/offers/hotel_offer.png",
            bg: "from-[#7c3aed] to-[#f97316]"
        },
        {
            category: "luxury",
            title: "Beachside Bliss",
            desc: "Flat ₹5000 OFF on premium beach resorts. Limited time offer.",
            code: "BEACH5K",
            img: "/assets/offers/hotel_offer.png",
            bg: "from-emerald-500 to-teal-500"
        },
        {
            category: "budget",
            title: "Weekend Getaways",
            desc: "Flat 25% OFF on curated weekend stays near your city.",
            code: "WEEKEND25",
            img: "/assets/offers/hotel_offer.png",
            bg: "from-blue-600 to-indigo-600"
        }
    ];

    const filteredOffers = activeTab === "all" ? offers : offers.filter(o => o.category === activeTab);

    return (
        <section className="max-w-7xl mx-auto px-6 py-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-10 border-b border-slate-100 pb-10">
                <div>
                  <div className="flex items-center gap-3 mb-6 bg-[#f97316]/5 w-fit px-4 py-1.5 rounded-full border border-orange-100">
                      <Tag size={14} className="text-[#f97316]" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f97316]">Members Only Deals</span>
                  </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">
                        Exclusive Hotel Deals
                    </h2>
                    
                    {/* Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                                    activeTab === tab.id 
                                    ? "bg-slate-900 text-white shadow-2xl shadow-slate-900/40 scale-105" 
                                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                }`}
                            >
                                <tab.icon size={16} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-shrink-0">
                    <button className="flex items-center gap-4 text-[#7c3aed] font-black text-xs uppercase tracking-[0.2em] group transition-all">
                        View All Offers 
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-xl group-hover:shadow-indigo-200">
                            <ChevronRight size={22} />
                        </div>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {filteredOffers.map((offer, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group flex flex-col lg:flex-row bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50 hover:shadow-indigo-100/50 transition-all cursor-pointer h-full"
                    >
                        <div className="lg:w-2/5 relative h-56 lg:h-auto overflow-hidden">
                            <img
                                src={offer.img}
                                alt={offer.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800";
                                }}
                            />
                            <div className="absolute top-6 left-6">
                               <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#7c3aed] shadow-2xl border border-white/20">
                                  {offer.category.toUpperCase()}
                               </div>
                            </div>
                        </div>

                        <div className="lg:w-3/5 p-6 md:p-8 lg:p-10 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 leading-tight mb-4 group-hover:text-[#7c3aed] transition-colors">
                                    {offer.title}
                                </h3>
                                <p className="text-slate-400 font-medium text-xs leading-relaxed mb-8 italic">
                                    {offer.desc}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Use Code</p>
                                    <div className="bg-slate-50 px-6 py-2.5 rounded-2xl border border-dashed border-slate-200 group-hover:bg-indigo-50 group-hover:border-indigo-200 transition-all">
                                        <p className="text-sm font-black text-slate-900 tracking-[0.2em]">{offer.code}</p>
                                    </div>
                                </div>
                                <div className="text-[#f97316] font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 group-hover:gap-4 transition-all">
                                    Book Stay <ArrowRight size={18} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default HotelOffers;
