import React from "react";
import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";

const HotelCard = ({ hotel, onClick }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-white rounded-2xl shadow-md border hover:border-blue-300 hover:shadow-xl transition-all overflow-hidden flex flex-col md:flex-row cursor-pointer"
            onClick={onClick}
        >
            {/* Image Gallery Side */}
            <div className="w-full md:w-1/3 relative h-64 md:h-auto overflow-hidden">
                <img 
                    src={hotel.images[0] || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"} 
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black text-blue-800 shadow-sm flex items-center">
                    {hotel.rating} <Star size={12} fill="currentColor" className="text-orange-400 ml-1" />
                </div>
            </div>

            {/* Hotel Info Side */}
            <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                    <h3 className="text-2xl font-black text-gray-800 group-hover:text-blue-700 transition-colors">
                        {hotel.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 flex items-center">
                        <MapPin size={14} className="text-blue-500 mr-2" />
                        {hotel.address}, {hotel.city}
                    </p>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                        {hotel.amenities?.slice(0, 4).map((amenity, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-600 text-[10px] uppercase font-black px-2 py-1 rounded">
                                {amenity}
                            </span>
                        ))}
                        {hotel.amenities?.length > 4 && (
                            <span className="text-[10px] text-blue-500 font-bold self-center">+{hotel.amenities.length - 4} more</span>
                        )}
                    </div>

                    <p className="mt-4 text-sm text-gray-600 line-clamp-2 italic">
                        "{hotel.description}"
                    </p>
                </div>

                <div className="mt-6 pt-6 border-t flex items-end justify-between">
                    <div>
                        <div className="text-xs text-gray-500 line-through">₹ {Math.round(hotel.price * 1.4).toLocaleString()}</div>
                        <div className="flex items-center space-x-2">
                            <span className="text-3xl font-black text-gray-800 tracking-tight">₹ {hotel.price.toLocaleString()}</span>
                            <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded border border-green-100 uppercase">+ ₹ {Math.round(hotel.price * 0.12).toLocaleString()} Taxes</span>
                        </div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">Per Night (Excluding Taxes)</div>
                    </div>
                    
                    <button className="bg-[#7c3aed] text-white px-8 py-3 rounded-full font-black text-sm uppercase tracking-tighter shadow-lg shadow-purple-200 group-hover:scale-105 transition-transform group-hover:bg-purple-700 active:scale-95">
                        View Details
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default HotelCard;
