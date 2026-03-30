import React from "react";
import { 
  Star, 
  MapPin, 
  Wifi, 
  Coffee, 
  ShieldCheck, 
  Waves, 
  ChevronRight,
  Info,
  Calendar,
  Users,
  Zap,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";

const HotelCard = ({ hotel, index = 0, onBook }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden font-sans group cursor-pointer"
      onClick={() => onBook(hotel)}
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Property Image Section */}
        <div className="w-full md:w-[320px] h-[220px] md:h-auto relative overflow-hidden">
          <img 
            src={hotel.image || hotel.images?.[0] || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"} 
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
          <div className="absolute top-4 left-4 flex gap-2">
             <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-black text-slate-900 rounded-full uppercase tracking-widest shadow-lg">YatraLo Verified</span>
          </div>
          {hotel.rating >= 4.5 && (
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-xl flex items-center gap-1.5">
               <Zap size={10} className="fill-white" /> Trending Stay
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
           <div>
              <div className="flex items-center gap-2 mb-2">
                 <div className="flex text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                       <Star key={i} size={12} className={i < Math.floor(hotel.rating) ? "fill-amber-500" : "fill-slate-200 text-slate-200"} />
                    ))}
                 </div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{hotel.rating} / 5.0 Rating</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-tight group-hover:text-blue-600 transition-colors mb-2">{hotel.name}</h3>
              <p className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
                 <MapPin size={12} className="text-blue-500" /> {hotel.city || 'India'} | <span className="text-slate-800">0.5 km from City Center</span>
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                 {["Breakfast Included", "Free Cancellation", "No Prepayment"].map((feat) => (
                    <div key={feat} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-[9px] font-black text-slate-500 rounded-lg uppercase tracking-widest border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-all">
                       <ShieldCheck size={10} /> {feat}
                    </div>
                 ))}
              </div>
           </div>

           <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2">
                    <Wifi size={14} className="text-slate-300" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Free Wifi</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Coffee size={14} className="text-slate-300" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Breakfast</span>
                 </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); onBook(hotel); }}
                className="text-blue-600 font-black text-[11px] uppercase tracking-widest flex items-center gap-2 group/btn"
              >
                View Details <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>

        {/* Pricing Sidebar */}
        <div className="md:w-[220px] p-6 md:p-8 bg-slate-50/50 md:border-l border-slate-100 flex flex-col justify-center items-end text-right">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Starting from</p>
           <h4 className="text-[32px] font-black text-slate-900 tracking-tighter leading-none mb-1 group-hover:text-blue-600 transition-colors italic">₹{hotel.price.toLocaleString()}</h4>
           <div className="flex flex-col items-end gap-1 mb-6">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">+ ₹{Math.round(hotel.price * 0.18)} taxes & fees</p>
              <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest px-2 py-0.5 bg-emerald-50 rounded">Best Price Guarantee</p>
           </div>
           <button 
             onClick={(e) => { e.stopPropagation(); onBook(hotel); }}
             className="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-[0.98]"
           >
             Book Room
           </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HotelCard;
