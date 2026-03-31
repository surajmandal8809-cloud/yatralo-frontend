import React from "react";
import { Plane, ChevronRight, TrendingUp } from "lucide-react";

const PopularRoutes = () => {
    const routes = [
        { city: "Mumbai Flights", flights: "230+ Daily Flights", img: "/assets/img/img_11fb8a464f.jpg" },
        { city: "Delhi Flights", flights: "450+ Daily Flights", img: "/assets/img/img_36383f6609.jpg" },
        { city: "Bengaluru Flights", flights: "180+ Daily Flights", img: "/assets/img/img_2c0ec1aac4.jpg" },
        { city: "Chennai Flights", flights: "120+ Daily Flights", img: "/assets/img/img_469a93f070.jpg" },
        { city: "Kolkata Flights", flights: "95+ Daily Flights", img: "/assets/img/img_4cb6a307e4.jpg" },
        { city: "Hyderabad Flights", flights: "140+ Daily Flights", img: "/assets/img/img_55007fab14.jpg" },
        { city: "Goa Flights", flights: "80+ Daily Flights", img: "/assets/img/img_cc0de3e88c.jpg" },
        { city: "Ahmedabad Flights", flights: "75+ Daily Flights", img: "/assets/img/img_3de209caad.jpg" }
    ];

    return (
        <section className="bg-white py-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div>
                   <div className="inline-flex items-center gap-2 bg-[#7c3aed]/10 text-[#7c3aed] px-4 py-2 rounded-full mb-6 border border-[#7c3aed]/20">
                      <TrendingUp size={14} />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">Trending Destinations</span>
                   </div>
                   <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                      Explore Top Cities <br />
                      With Best AirFares
                   </h2>
                </div>
                <button className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-[0.2em] border-b-2 border-[#7c3aed] pb-2 hover:gap-3 transition-all">
                    View All Destinations <ChevronRight size={18} />
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {routes.map((route, i) => (
                    <div key={i} className="group relative h-48 sm:h-56 rounded-[2rem] overflow-hidden cursor-pointer shadow-xl shadow-slate-200/50 hover:shadow-indigo-200 transition-all">
                        <img 
                            src={route.img} 
                            alt={route.city} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                            onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?q=80&w=800";
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <h3 className="text-xl font-black text-white tracking-tight mb-1 group-hover:text-indigo-200 transition-colors">{route.city}</h3>
                            <div className="flex items-center gap-2 text-white/60 text-[10px] font-black uppercase tracking-widest border-t border-white/20 pt-2 group-hover:text-white transition-colors">
                                <Plane size={12} className="text-[#f97316]" />
                                {route.flights}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Popular Route List as in image */}
            <div className="mt-20 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-6 pt-12 border-t border-slate-100 italic font-medium text-slate-400 text-xs">
                {["Delhi to Mumbai Flights", "Mumbai to Goa Flights", "Bangalore to Delhi Flights", "Chennai to Mumbai Flights", "Kolkata to Bangalore Flights", "Hyderabad to Delhi Flights", "Pune to Goa Flights", "Lucknow to Delhi Flights"].map((r, i) => (
                    <div key={i} className="flex items-center gap-2 hover:text-[#7c3aed] cursor-pointer transition-colors group">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-[#7c3aed] transition-colors" />
                        {r}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PopularRoutes;
