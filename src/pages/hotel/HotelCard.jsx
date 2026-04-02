import React from "react";
import { 
  Star, 
  MapPin, 
  ChevronRight,
  Image as ImageIcon,
  ThumbsUp,
  ShieldCheck,
  Heart,
  Camera
} from "lucide-react";
import { motion } from "framer-motion";

const HotelCard = ({ hotel, index = 0, onBook }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row h-auto md:h-[260px] group transition-all hover:shadow-md"
    >
      {/* Hotel Image Section */}
      <div className="w-full md:w-72 h-52 md:h-full relative overflow-hidden shrink-0">
        <img 
          src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80'} 
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-[9px] font-black text-slate-800 uppercase italic border border-slate-100">Recommended</div>
        <div className="absolute bottom-3 left-3 flex gap-2">
           <div className="p-1.5 bg-black/40 backdrop-blur-sm rounded-lg text-white hover:bg-black/60 transition-colors cursor-pointer">
              <Camera size={14} />
           </div>
        </div>
      </div>

      {/* Main Content Info */}
      <div className="flex-1 p-5 md:p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-1">
             <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">{hotel.name}</h3>
             <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                   <Star key={i} size={10} className={i < (hotel.rating || 4) ? "fill-amber-500" : "fill-slate-100 text-slate-100"} />
                ))}
             </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-bold text-blue-500 mb-3 cursor-pointer hover:underline">
             <span className="text-slate-400 font-bold uppercase tracking-tight italic">Central {hotel.city || "Goa"} | {hotel.address || "Main Beach Road"}</span>
             <ChevronRight size={14} />
          </div>

          <div className="flex flex-wrap gap-2 mt-auto">
             <div className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-1.5">
                <Heart size={10} className="fill-emerald-700" /> Couple Friendly
             </div>
             <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[9px] font-black uppercase tracking-widest border border-blue-100 flex items-center gap-1.5">
                <ShieldCheck size={10} /> Sanitized Stay
             </div>
          </div>

          <p className="mt-4 text-[10px] font-bold text-emerald-600 flex items-center gap-1.5 uppercase tracking-widest leading-none">
             Complimentary Breakfast Included
          </p>
        </div>

        {/* User Rating & Pricing Section */}
        <div className="w-full md:w-52 border-t md:border-t-0 md:border-l border-slate-100 p-0 md:pl-6 flex flex-row md:flex-col justify-between items-center md:items-end">
           <div className="text-right flex flex-col items-end">
              <div className="flex items-center gap-3">
                 <div>
                    <p className="text-[11px] font-black text-slate-900 leading-none">Very Good</p>
                    <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tight">2148 Ratings</p>
                 </div>
                 <div className="w-10 h-10 bg-blue-900 text-white rounded-lg flex items-center justify-center text-sm font-black italic shadow-lg">4.0</div>
              </div>
           </div>

           <div className="text-right mt-auto">
              <p className="text-[10px] font-bold text-slate-400 line-through">₹{(hotel.price * 1.3).toFixed(0)}</p>
              <h4 className="text-2xl font-black text-slate-900 leading-none flex items-baseline gap-1 animate-pulse"><span className="text-sm">₹</span>{hotel.price.toLocaleString()}</h4>
              <p className="text-[10px] font-bold text-slate-400 mt-1 tracking-tight">+ ₹{(hotel.price * 0.12).toFixed(0)} taxes & fees</p>
              <button 
                onClick={() => onBook?.(hotel)}
                className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-800 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-100/50 transition-all active:scale-95"
              >
                Select Room
              </button>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HotelCard;


