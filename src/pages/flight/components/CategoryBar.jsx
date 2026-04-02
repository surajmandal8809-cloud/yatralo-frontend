import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Plane, 
  Hotel, 
  Home, 
  Briefcase, 
  Train, 
  Bus, 
  Car, 
  Globe, 
  Sparkles, 
  Heart 
} from "lucide-react";

const CategoryBar = ({ activeCategory = "Flights" }) => {
    const navigate = useNavigate();
    const categories = [
        { icon: Plane, label: "Flights", path: "/flights" },
        { icon: Hotel, label: "Hotels", path: "/hotels" },
        { icon: Home, label: "Homestays", path: "/hotels" },
        { icon: Sparkles, label: "Holidays", path: "/destinations" },
        { icon: Train, label: "Trains", path: "/trains" },
        { icon: Bus, label: "Buses", path: "/buses" },
        { icon: Car, label: "Cabs", path: "/" },
        { icon: Globe, label: "Visa", path: "/travel-guidelines" },
        { icon: Heart, label: "Insurance", path: "/safety" },
    ];

    return (
        <div className="bg-white rounded-t-[2rem] md:rounded-t-[2.5rem] p-4 flex items-center justify-start md:justify-center gap-4 md:gap-6 overflow-x-auto no-scrollbar shadow-sm border-b border-slate-50 flex-nowrap">
            {categories.map((cat, i) => {
                const isActive = cat.label === activeCategory;
                return (
                    <button
                        key={i}
                        onClick={() => navigate(cat.path)}
                        className={`flex flex-col items-center gap-1 min-w-[70px] flex-shrink-0 transition-all group ${
                            isActive ? "text-[#7c3aed]" : "text-slate-400 hover:text-slate-600"
                        }`}
                    >
                        <div className={`p-2 rounded-xl transition-all ${
                            isActive ? "bg-indigo-50" : "bg-transparent group-hover:bg-slate-50"
                        }`}>
                            <cat.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${
                            isActive ? "opacity-100" : "opacity-60"
                        }`}>
                            {cat.label}
                        </span>
                        {isActive && (
                            <div className="w-1 h-1 rounded-full bg-[#7c3aed] mt-0.5" />
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default CategoryBar;
