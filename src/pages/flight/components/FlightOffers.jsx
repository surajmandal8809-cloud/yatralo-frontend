import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Plane, Hotel, Bus, Train, Tag, ArrowRight } from "lucide-react";

const FlightOffers = () => {
    const tabs = [
        { id: "all", label: "All Offers", icon: Tag },
        { id: "flights", label: "Flights", icon: Plane },
        { id: "hotels", label: "Hotels", icon: Hotel },
        { id: "buses", label: "Buses", icon: Bus },
        { id: "trains", label: "Trains", icon: Train }
    ];

    const [activeTab, setActiveTab] = useState("all");

    const offers = [
        {
            category: "flights",
            title: "Domestic Luxury Escape",
            desc: "Experience pure comfort with up to 40% OFF on business class bookings across India.",
            code: "FLYLUXE",
            img: "/assets/offers/flight_offer.png",
            bg: "from-blue-600 to-indigo-600"
        },
        {
            category: "hotels",
            title: "Royal Villa Retreats",
            desc: "Book ultra-luxury pool villas at 50% discount. Limited summer member-only offer.",
            code: "ROYALTY",
            img: "/assets/offers/hotel_offer.png",
            bg: "from-[#7c3aed] to-[#f97316]"
        },
        {
            category: "buses",
            title: "Premium Sleeper SALE",
            desc: "Flat ₹500 OFF on all multi-axle luxury sleeper buses. Travel in ultimate comfort.",
            code: "SLEEP24",
            img: "/assets/offers/bus_offer.png",
            bg: "from-orange-500 to-red-500"
        },
        {
            category: "trains",
            title: "Executive Class Deals",
            desc: "Get 20% cashback on all luxury tourist train and executive class bookings.",
            code: "RAPID20",
            img: "/assets/offers/train_offer.png",
            bg: "from-blue-700 to-blue-900"
        }
    ];

    const filteredOffers = activeTab === "all" ? offers : offers.filter(o => o.category === activeTab);

    return (
        <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6 md:gap-8 border-b border-slate-100 pb-8">
                <div>
                    <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 px-3 py-1 rounded-full mb-4">
                        <Tag size={12} className="text-[#f97316]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#f97316]">Curated For You</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-4">
                        Premium Travel Deals
                    </h2>
                    
                    {/* Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                    activeTab === tab.id 
                                    ? "bg-slate-900 text-white shadow-xl" 
                                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                }`}
                            >
                                <tab.icon size={14} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-shrink-0">
                    <button className="flex items-center gap-2 text-[#7c3aed] font-black text-sm uppercase tracking-[0.2em] group transition-all">
                        View All Offers 
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            <ChevronRight size={18} />
                        </div>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {filteredOffers.map((offer, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group flex flex-col sm:flex-row bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-100 transition-all cursor-pointer h-full"
                    >
                        <div className="sm:w-2/5 relative h-56 sm:h-auto overflow-hidden">
                            <img
                                src={offer.img}
                                alt={offer.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?q=80&w=800";
                                }}
                            />
                            <div className="absolute top-4 left-4">
                               <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-[#7c3aed] shadow-lg border border-white/20">
                                  {offer.category.toUpperCase()}
                               </div>
                            </div>
                        </div>

                        <div className="sm:w-3/5 p-6 md:p-8 flex flex-col justify-between group">
                            <div>
                                <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight mb-3 group-hover:text-[#7c3aed] transition-colors">
                                    {offer.title}
                                </h3>
                                <p className="text-slate-500 font-medium text-[10px] md:text-xs leading-relaxed mb-6 italic">
                                    {offer.desc}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Use Code</p>
                                    <div className="bg-slate-50 px-4 py-1.5 rounded-xl border border-dashed border-slate-200 group-hover:bg-indigo-50 group-hover:border-indigo-200 transition-all">
                                        <p className="text-xs md:text-sm font-black text-slate-900 tracking-widest">{offer.code}</p>
                                    </div>
                                </div>
                                <div className="text-[#f97316] font-black text-[9px] uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Book Now <ArrowRight size={14} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

        </section>
    );
};

export default FlightOffers;
