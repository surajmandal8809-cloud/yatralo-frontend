import React from "react";
import { Hotel, Wifi, Coffee, Wind, ShieldCheck, MapPin } from "lucide-react";

export default function HotelReviewDetails({ hotel, checkIn, checkOut }) {
    const amenities = [
        { icon: Wifi, label: "Free High Speed Internet" },
        { icon: Coffee, label: "Fresh Breakfast Included" },
        { icon: Wind, label: "Fully Air Conditioned" },
        { icon: ShieldCheck, label: "Sanitized & Safe Stay" }
    ];

    return (
        <section className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                     <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest border-l-4 border-blue-600 pl-4 leading-none">About the Property</h3>
                </div>
                <p className="text-sm font-medium text-slate-500 leading-relaxed mb-6">
                    {hotel.description || "Experience premium comfort and luxury. This property offers world-class hospitality and exceptional amenities for your stay."}
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {(hotel.amenities || []).slice(0, 9).map((amenity, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-blue-600 border border-slate-100/50">
                                <ShieldCheck size={16} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-700 leading-tight uppercase tracking-tight">{amenity.replace(/_/g, " ")}</span>
                        </div>
                    ))}
                </div>

                {hotel.contact && hotel.contact.phone && (
                    <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shadow-inner">
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Hotel Contact</p>
                            <p className="text-sm font-black text-slate-900 mt-1">{hotel.contact.phone}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest border-l-4 border-blue-600 pl-4 leading-none mb-6">Select Room Options</h3>
                <div className="space-y-4">
                    {hotel.allOffers && hotel.allOffers.length > 0 ? hotel.allOffers.map((offer, i) => (
                        <div key={i} className={`p-5 rounded-xl border-2 transition-all ${i === 0 ? "border-blue-100 bg-blue-50/20" : "border-slate-100 hover:border-blue-100"} relative group overflow-hidden`}>
                            {i === 0 && <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 rounded-bl-xl text-[10px] font-black uppercase tracking-widest">Recommended</div>}
                            <div className="flex justify-between items-center gap-4">
                                <div className="flex-1">
                                     <h4 className="text-base font-black text-slate-900 mb-1 uppercase tracking-tight">{offer.roomType}</h4>
                                     <p className="text-xs font-medium text-slate-500 mb-3">{offer.roomDescription}</p>
                                     <div className="flex flex-wrap gap-3">
                                        <span className="text-[10px] font-black text-emerald-600 flex items-center gap-1 uppercase tracking-widest">
                                            <ShieldCheck size={12} /> {offer.policies?.cancellation?.description || "Free Cancellation till 24h"}
                                        </span>
                                        <span className="text-[10px] font-black text-blue-600 flex items-center gap-1 uppercase tracking-widest">
                                            <Coffee size={12} /> {offer.policies?.paymentPolicy === "DEPOSIT" ? "Refundable Deposit" : "Room Only"}
                                        </span>
                                     </div>
                                </div>
                                <div className="text-right min-w-[120px]">
                                     <p className="text-xl font-black text-slate-900">₹{offer.price}</p>
                                     <p className="text-[10px] font-bold text-slate-400">+ ₹{Math.round(offer.price * 0.18)} taxes & fees</p>
                                     <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] rounded-lg font-black uppercase transition-all shadow-md shadow-blue-100">Select Room</button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="p-10 text-center border-2 border-dashed border-slate-100 rounded-2xl">
                             <h4 className="text-slate-400 font-bold">No standard room data available from Amadeus for these dates.</h4>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

