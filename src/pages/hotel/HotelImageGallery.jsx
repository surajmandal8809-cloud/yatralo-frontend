import React from "react";

export default function HotelImageGallery({ hotel }) {
    // MakeMyTrip style grid layout
    const images = (hotel.images && hotel.images.length > 0) ? [
        ...hotel.images,
        "/assets/img/hotels/hotel_lobby_2.png",
        "/assets/img/hotels/hotel_pool_3.png",
        "/assets/img/hotels/hotel_facade_4.png",
        "/assets/img/hotels/hotel_luxury_room_1.png"
    ] : [
        hotel.image || "/assets/img/hotels/hotel_luxury_room_1.png",
        "/assets/img/hotels/hotel_lobby_2.png",
        "/assets/img/hotels/hotel_pool_3.png",
        "/assets/img/hotels/hotel_facade_4.png",
        "/assets/img/hotels/hotel_luxury_room_1.png"
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 h-[450px] overflow-hidden rounded-2xl mb-8">
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden">
                <img 
                    src={images[0]} 
                    alt="Main" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>
            {images.slice(1).map((img, i) => (
                <div key={i} className="relative group overflow-hidden">
                    <img 
                        src={img} 
                        alt={`Gallery ${i}`} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {i === 3 && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors">
                            <span className="text-white font-black text-xl">+8 Photos</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
