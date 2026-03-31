import React from "react";
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

const CategoryBar = () => {
    const categories = [
        { icon: Plane, label: "Flights", active: true },
        { icon: Hotel, label: "Hotels" },
        { icon: Home, label: "Homestays" },
        { icon: Sparkles, label: "Holidays" },
        { icon: Train, label: "Trains" },
        { icon: Bus, label: "Buses" },
        { icon: Car, label: "Cabs" },
        { icon: Globe, label: "Visa" },
        { icon: Heart, label: "Insurance" },
    ];

    return (
        <div className="bg-white rounded-t-[2rem] md:rounded-t-[2.5rem] p-4 flex items-center justify-start md:justify-center gap-4 md:gap-6 overflow-x-auto no-scrollbar shadow-sm border-b border-slate-50 flex-nowrap">
            {categories.map((cat, i) => (
                <button
                    key={i}
                    className={`flex flex-col items-center gap-1 min-w-[70px] flex-shrink-0 transition-all group ${
                        cat.active ? "text-[#7c3aed]" : "text-slate-400 hover:text-slate-600"
                    }`}
                >
                    <div className={`p-2 rounded-xl transition-all ${
                        cat.active ? "bg-indigo-50" : "bg-transparent group-hover:bg-slate-50"
                    }`}>
                        <cat.icon size={22} strokeWidth={cat.active ? 2.5 : 2} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                        cat.active ? "opacity-100" : "opacity-60"
                    }`}>
                        {cat.label}
                    </span>
                    {cat.active && (
                        <div className="w-1 h-1 rounded-full bg-[#7c3aed] mt-0.5" />
                    )}
                </button>
            ))}
        </div>
    );
};

export default CategoryBar;
