import React from 'react';
import { Star, MapPin, Wifi, Coffee, ShieldCheck, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
    const navigate = useNavigate();

    return (
        <div 
           className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-[0_20px_50px_rgba(0,140,255,0.15)] transition-all flex flex-col md:flex-row relative"
           onClick={() => navigate(`/hotels/details?id=${hotel.id}`)}
        >
            {/* Image Placeholder */}
            <div className="relative w-full md:w-80 h-64 md:h-auto overflow-hidden shrink-0">
                <img 
                    src={hotel.image || `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop`} 
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#008cff] text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20">
                    Premium Stay
                </div>
                <button className="absolute top-4 right-4 p-2 bg-white/30 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors">
                    <Heart size={20} />
                </button>
            </div>

            <div className="flex-1 p-6 flex flex-col justify-between items-stretch">
                <div className="space-y-3">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-2xl font-black italic tracking-tighter uppercase text-gray-800 leading-tight group-hover:text-[#008cff] transition-colors">{hotel.name || 'Grand Hyatt Residencies'}</h3>
                            <div className="flex items-center gap-1 mt-1">
                                {Array.from({length: 5}).map((_, i) => (
                                    <Star key={i} size={14} className={i < 4 ? 'fill-[#ffc107] text-[#ffc107]' : 'text-gray-200'} />
                                ))}
                                <span className="text-xs font-bold text-gray-400 ml-2 uppercase tracking-widest">4.5 Rating</span>
                            </div>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-black italic uppercase tracking-widest text-[#008cff]">Special Offer</p>
                           <p className="text-2xl font-black italic tracking-tighter text-gray-900 leading-none mt-1">₹{hotel.price || '4,999'}</p>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">+ ₹899 taxes</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400">
                        <MapPin size={14} className="text-gray-300" />
                        <span className="text-sm font-medium tracking-tight">Koramangala, Bangalore • 1.2 Km from City Center</span>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <AmenityBadge icon={<Wifi size={14} />} label="Free Wifi" />
                        <AmenityBadge icon={<Coffee size={14} />} label="Breakfast" />
                        <AmenityBadge icon={<ShieldCheck size={14} />} label="Safe Stay" />
                    </div>
                </div>

                <div className="mt-8 flex justify-between items-center bg-gray-50/50 -mx-6 -mb-6 p-6 rounded-b-3xl border-t border-gray-100 italic">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black italic text-green-600 uppercase tracking-widest">Available Now</p>
                       <p className="text-xs text-gray-400 font-bold uppercase">Free Cancellation till 24h</p>
                    </div>
                    <button className="bg-gradient-to-r from-[#008cff] to-[#00a2ff] text-white px-8 py-3 rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all">
                        SELECT
                    </button>
                </div>
            </div>
        </div>
    );
};

const AmenityBadge = ({ icon, label }) => (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50/50 rounded-xl text-[#008cff] text-[10px] font-black uppercase tracking-widest">
        {icon}
        <span>{label}</span>
    </div>
);

export default HotelCard;
