import React from "react";
import { Plane, Hotel, Bus, Train, Tag, Globe, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HotelCategoryBar = () => {
    const navigate = useNavigate();

    const categories = [
        { id: "flights", label: "Flights", icon: Plane, link: "/flights" },
        { id: "hotels", label: "Hotels", icon: Hotel, link: "/hotels" },
        { id: "buses", label: "Buses", icon: Bus, link: "/buses" },
        { id: "trains", label: "Trains", icon: Train, link: "/trains" },
        { id: "destinations", label: "Explore", icon: Globe, link: "/destinations" },
        { id: "offers", label: "Offers", icon: Tag, link: "/deals" }
    ];

    return (
        <div className="flex items-center justify-center px-4 md:px-0 w-full overflow-x-auto no-scrollbar py-6">
            <div className="flex items-center gap-10 md:gap-20">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => navigate(cat.link)}
                        className={`group flex flex-col items-center gap-2.5 transition-all duration-500 relative py-3 ${
                            cat.id === "hotels" ? "scale-110" : "opacity-60 hover:opacity-100 hover:scale-105"
                        }`}
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700 ${
                            cat.id === "hotels" 
                            ? "bg-gradient-to-br from-[#7c3aed] to-[#f97316] text-white shadow-2xl shadow-indigo-500/50 rotate-[360deg]" 
                            : "bg-white/10 text-white group-hover:bg-white/20 group-hover:rotate-12 group-hover:shadow-xl group-hover:shadow-white/5"
                        }`}>
                            <cat.icon size={26} strokeWidth={cat.id === "hotels" ? 2.5 : 2} />
                        </div>
                        <span className={`text-[10px] md:text-xs font-black tracking-[0.2em] uppercase transition-all ${
                            cat.id === "hotels" ? "text-white" : "text-white/60 group-hover:text-white"
                        }`}>
                            {cat.label}
                        </span>
                        
                        {/* Active Indicator Pin as in image */}
                        {cat.id === "hotels" && (
                            <div className="absolute -bottom-1">
                                <MapPin size={12} className="text-[#f97316] fill-[#f97316] animate-bounce" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HotelCategoryBar;
