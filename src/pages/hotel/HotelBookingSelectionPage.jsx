import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronRight, Calendar, Users } from "lucide-react";
import HotelReviewDetails from "./HotelReviewDetails";
import HotelPriceBreakdown from "./HotelPriceBreakdown";
import HotelDetailsHeader from "./HotelDetailsHeader";
import HotelImageGallery from "./HotelImageGallery";

const HotelBookingSelectionPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedHotel, setSelectedHotel] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (location.state?.hotel) {
            setSelectedHotel(location.state.hotel);
        } else {
            navigate("/hotels");
        }
    }, [location.state, navigate]);

    if (!selectedHotel) return null;

    const nights = 1; 
    const rooms = 1;
    const baseFare = selectedHotel.price * nights * rooms;
    const taxesAndFees = Math.round(baseFare * 0.18);
    const totalPayable = baseFare + taxesAndFees;

    const handleContinue = () => {
        navigate("/hotels/checkout", {
            state: { 
                hotel: selectedHotel, 
                pax: location.state.pax || 2, 
                totalAmount: totalPayable, 
                nights, 
                checkIn: location.state.checkIn, 
                checkOut: location.state.checkOut 
            }
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">
            <HotelDetailsHeader hotel={selectedHotel} />
            
            <div className="max-w-6xl mx-auto px-4 mt-8">
                {/* Search Summary Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between mb-8">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                                <Calendar size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dates</p>
                                <p className="text-xs font-black text-slate-900">{location.state?.checkIn || "20 Apr"} - {location.state?.checkOut || "21 Apr"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                                <Users size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Guests</p>
                                <p className="text-xs font-black text-slate-900">{location.state?.pax || 2} Adults | {rooms} Room</p>
                            </div>
                        </div>
                    </div>
                    <button className="text-sm font-black text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">Modify Search</button>
                </div>

                <HotelImageGallery hotel={selectedHotel} />

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 items-start">
                    <main>
                        <HotelReviewDetails 
                            hotel={selectedHotel} 
                            checkIn={location.state?.checkIn} 
                            checkOut={location.state?.checkOut} 
                        />
                    </main>
                    <aside className="sticky top-24">
                        <HotelPriceBreakdown 
                            baseFare={baseFare} 
                            taxesAndFees={taxesAndFees} 
                            totalPayable={totalPayable} 
                            onContinue={handleContinue} 
                        />
                        <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                             <p className="text-xs font-bold text-emerald-800 flex items-center gap-2">
                                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span> 
                                High Demand! 12 people are looking at this property.
                             </p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};
export default HotelBookingSelectionPage;

