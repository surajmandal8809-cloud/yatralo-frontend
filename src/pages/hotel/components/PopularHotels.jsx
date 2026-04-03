import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Star, Building, Home, Bed } from "lucide-react";

const PopularHotels = () => {
    const destinations = [
        {
            name: "Goa Beach Resorts",
            desc: "Sun, Sand & Luxury Stays",
            price: "₹3,499",
            img: "https://images.unsplash.com/photo-1512918766671-560011161397?auto=format&fit=crop&w=600&q=80",
            category: "Resorts & Villas",
            rating: 4.8
        },
        {
            name: "Munnar Hill ViewVillas",
            desc: "Breathtaking Tea Garden Views",
            price: "₹4,999",
            img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
            category: "Nature Escapes",
            rating: 4.9
        },
        {
            name: "Jaipur Heritage Palaces",
            desc: "Experience Royal Rajputana",
            price: "₹8,999",
            img: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e84?auto=format&fit=crop&w=600&q=80",
            category: "Heritage Collection",
            rating: 5.0
        },
        {
            name: "Manali Snow Cabins",
            desc: "Cozy Stays in the Himalayas",
            price: "₹2,799",
            img: "https://images.unsplash.com/photo-1518005020250-685945330982?auto=format&fit=crop&w=600&q=80",
            category: "Snow Retreats",
            rating: 4.7
        },
        {
            name: "Varanasi Ganges Views",
            desc: "Spiritual Stays by the River",
            price: "₹1,599",
            img: "https://images.unsplash.com/photo-1561461841-47492cc3fba9?auto=format&fit=crop&w=600&q=80",
            category: "Cultural Stays",
            rating: 4.6
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
                    <div>
                        <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-4 italic flex items-center gap-2">
                             World-Class Destinations
                        </h2>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                            Popular <br />
                            <span className="text-slate-400">Locales</span>
                        </h1>
                    </div>
                    <div className="mt-8 md:mt-0 flex gap-4 overflow-x-auto no-scrollbar py-2">
                        {["All", "Resorts", "Villas", "Heritage", "Hill Stations", "Beaches"].map((tag, i) => (
                           <button key={i} className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all italic border ${i === 0 ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-500 border-slate-100 hover:border-slate-300"}`}>
                               {tag}
                           </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {destinations.map((dest, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative h-[400px] rounded-[2.5rem] overflow-hidden cursor-pointer"
                        >
                            <img src={dest.img} alt={dest.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-all" />
                            
                            <div className="absolute top-6 left-6 flex items-center gap-2">
                                <div className="bg-white px-3 py-1 rounded-full text-[9px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-1.5 shadow-xl">
                                    <Star size={10} fill="currentColor" className="text-orange-400"/> {dest.rating}
                                </div>
                            </div>

                            <div className="absolute bottom-8 left-8 right-8">
                                <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-2 italic flex items-center gap-2">
                                    <MapPin size={10}/> {dest.category}
                                </p>
                                <h3 className="text-xl font-black text-white leading-none uppercase italic tracking-tighter mb-4 pr-10">{dest.name}</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-black text-white tracking-widest italic">{dest.price}</span>
                                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tight">Starting Price</span>
                                    </div>
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-slate-900 transition-all border border-white/10">
                                        <ArrowRight size={16}/>
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

export default PopularHotels;
