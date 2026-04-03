import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Percent, ShieldCheck, Zap } from "lucide-react";

const HotelOffers = () => {
    const offers = [
        {
            title: "FLAT 20% OFF",
            desc: "on Luxury Resorts in Goa & Kerala",
            code: "STAYCATION",
            img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=400&q=80",
            category: "DOMESTIC HOTELS"
        },
        {
            title: "STAY 3, PAY 2",
            desc: "Special Festive Offer at Taj & ITC Properties",
            code: "FESTIVEHOTEL",
            img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80",
            category: "PREMIUM STAYS"
        },
        {
            title: "UP TO ₹5000 OFF",
            desc: "on International Hotel Bookings",
            code: "GLOBETROTTER",
            img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80",
            category: "INTERNATIONAL"
        },
        {
            title: "INSTANT 15% OFF",
            desc: "on Boutique Villas & Homestays",
            code: "VILLALOVE",
            img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80",
            category: "VILLAS & HOMES"
        }
    ];

    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4 italic flex items-center gap-2">
                             Exclusive Steal Deals
                        </h2>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                            Best Offers <br />
                            <span className="text-slate-400">For Your Stay</span>
                        </h1>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-all italic">
                        View All Offers <ChevronRight size={14}/>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {offers.map((offer, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100/50 transition-all cursor-pointer"
                        >
                            <div className="h-40 overflow-hidden relative">
                                <img src={offer.img} alt={offer.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black text-blue-600 uppercase tracking-widest shadow-sm border border-blue-50">
                                    {offer.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                                        <Percent size={14} strokeWidth={3}/>
                                    </div>
                                    <h3 className="text-lg font-black text-slate-900 tracking-tight leading-none uppercase italic">{offer.title}</h3>
                                </div>
                                <p className="text-[11px] font-bold text-slate-500 mb-6 uppercase tracking-tight italic line-clamp-2">{offer.desc}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Coupon Code</span>
                                        <span className="text-[11px] font-black text-slate-800 uppercase tracking-[0.1em]">{offer.code}</span>
                                    </div>
                                    <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                        <ChevronRight size={14}/>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HotelOffers;
