import React from "react";
import { motion } from "framer-motion";
import { Star, MapPin, ChevronRight, TrendingUp } from "lucide-react";

const HotelTrendingStays = () => {
    const popularStays = [
        {
            name: "Taj Palace Hotel",
            location: "New Delhi",
            price: "₹12,500/night",
            img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            rating: 4.9,
            type: "Palatial Stay"
        },
        {
            name: "The Oberoi Grand",
            location: "Mumbai",
            price: "₹15,900/night",
            img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            rating: 4.8,
            type: "Signature Luxury"
        },
        {
            name: "JW Marriott Resort",
            location: "Bangalore",
            price: "₹10,200/night",
            img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            rating: 4.7,
            type: "Modern Haven"
        },
        {
            name: "ITC Grand Chola Retreat",
            location: "Chennai",
            price: "₹11,150/night",
            img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            rating: 4.9,
            type: "Heritage Gem"
        }
    ];

    return (
        <section className="bg-[#F3F4F6] py-20 md:py-32 text-slate-900 relative overflow-hidden">
            {/* Subtle Accent Glows for Light Mode */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-[120px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#7c3aed]/5 rounded-full blur-[100px] -ml-32 -mb-32" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
                <div>
                  <div className="flex items-center gap-3 mb-6 md:mb-8 bg-blue-50 w-fit px-5 py-2 rounded-full border border-blue-100 italic">
                      <TrendingUp size={14} className="text-[#f97316] md:w-4 md:h-4" />
                      <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-blue-600/80">Premium Getaways</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight text-slate-900">
                    Escape Into <br />
                    Pure Luxury
                  </h2>
                </div>
                <div className="flex flex-col items-end gap-6 text-right">
                   <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <Star className="text-amber-400 fill-amber-400" size={18} />
                      <span className="text-sm font-black text-slate-600">4.8+ Avg User Rating</span>
                   </div>
                   <button className="flex items-center gap-3 text-slate-900 font-black text-xs uppercase tracking-[0.3em] border-b-2 border-[#7c3aed] pb-2 group transition-all">
                      Explore All Stays <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                   </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {popularStays.map((stay, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                    <div className="relative h-[450px] md:h-[520px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-white/5">
                      <img
                        src={stay.img}
                        alt={stay.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 origin-center"
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800";
                        }}
                      />

                      {/* Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-transparent transition-opacity duration-500 opacity-90 group-hover:opacity-100" />
                      
                      <div className="absolute top-10 right-10">
                         <div className="bg-white/10 backdrop-blur-3xl px-5 py-2.5 rounded-2xl border border-white/10 rotate-3 group-hover:rotate-0 transition-transform shadow-2xl">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#f97316]">{stay.type}</span>
                         </div>
                      </div>

                      <div className="absolute bottom-12 left-10 right-10">
                        <div className="flex items-center gap-3 mb-4">
                           <MapPin size={16} className="text-[#f97316]" />
                           <span className="text-[11px] font-black uppercase tracking-widest text-white/60">{stay.location}</span>
                        </div>
                        <h3 className="text-3xl font-black mb-3 text-white tracking-tighter leading-none group-hover:text-[#f97316] transition-colors">
                          {stay.name}
                        </h3>
                        <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-6">
                           <p className="text-xl font-black text-white italic tracking-tight">
                             {stay.price}
                           </p>
                           <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-lg text-white">
                              <Star size={14} className="text-amber-400 fill-amber-400" />
                              <span className="text-[11px] font-black">{stay.rating}</span>
                           </div>
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

export default HotelTrendingStays;
