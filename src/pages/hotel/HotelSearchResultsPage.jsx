import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import HotelCard from "./HotelCard";
import HotelSearchHeader from "./HotelSearchHeader";
import HotelFilterSidebar from "./HotelFilterSidebar";
import { useSearchHotelsQuery } from "../../services/hotelService";

export default function HotelSearchResultsPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const location = searchParams.get("location") || searchParams.get("destination");
    const checkIn = searchParams.get("checkInDate") || searchParams.get("checkin") || searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOutDate") || searchParams.get("checkout") || searchParams.get("checkOut");
    const guests = searchParams.get("guests") || searchParams.get("adults") || "2";

    const safeCheckIn = useMemo(() => {
        try {
            return new Date(checkIn).toISOString().split("T")[0];
        } catch {
            return "";
        }
    }, [checkIn]);

    const safeCheckOut = useMemo(() => {     
        try {
            return new Date(checkOut).toISOString().split("T")[0];
        }
        catch {
            return "";
        }
    }, [checkOut]);

    const { data: response, isLoading: loading, error } = useSearchHotelsQuery({
        location,
        checkin: safeCheckIn,
        checkout: safeCheckOut,
        guests
    }, {
        skip: !location || !checkIn || !checkOut || !guests
    });

    const hotels = response?.data || [];

    useEffect(() => {
        if (error) {
            console.error("Hotel Search Error:", error);
            toast.error(error.data?.message || "Failed to load hotels. Check your connection or search criteria.");
        }
    }, [error]);

    useEffect(() => {
        if (!location || !checkIn || !checkOut || !guests) {
            toast.error("Missing search parameters. Please modify your search.");
            navigate("/hotels");
        }
    }, [location, checkIn, checkOut, guests, navigate]);    
    return (
        <div className="min-h-screen bg-[#f2f2f2] font-sans pb-20">
            {/* MakeMyTrip Style Header */}
            <div className="pt-20">
                <HotelSearchHeader 
                    location={location} 
                    checkIn={safeCheckIn} 
                    checkOut={safeCheckOut} 
                    guests={guests}
                    onModify={() => navigate("/hotels")}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
                
                {/* Left Sidebar filters */}
                <aside className="hidden lg:block">
                     <HotelFilterSidebar />
                </aside>

                {/* Main Content */}
                <main>
                    {loading ? (
                        <div className="space-y-6">
                            {[1, 2, 3].map(skeleton => (
                                <div key={skeleton} className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col md:flex-row gap-6 animate-pulse">
                                    <div className="w-full md:w-72 h-48 bg-slate-200 rounded-lg"></div>
                                    <div className="flex-1 space-y-4 py-2">
                                        <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                                        <div className="space-y-2 pt-4">
                                            <div className="h-3 bg-slate-200 rounded w-full"></div>
                                            <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                <h1 className="text-xl lg:text-2xl font-black text-slate-800 tracking-tight">
                                    Hotels in {location} <span className="text-sm font-bold text-slate-500 ml-2">({hotels.length} Properties found)</span>
                                </h1>
                                <div className="hidden md:flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sort By:</span>
                                    <select className="border border-slate-200 rounded-lg text-sm font-bold p-2 text-slate-700 outline-none hover:border-blue-400 focus:border-blue-500 transition-colors cursor-pointer bg-slate-50">
                                        <option>Popularity</option>
                                        <option>Price (Low to High)</option>
                                        <option>Price (High to Low)</option>
                                        <option>User Rating</option>
                                    </select>
                                </div>
                            </div>

                            {hotels.length === 0 ? (
                                <div className="text-center py-24 bg-white rounded-xl shadow-sm border border-slate-200">
                                    <img src="https://imgak.mmtcdn.com/flights/assets/media/dt/common/search_empty.webp" alt="No hotels" className="mx-auto w-48 opacity-70 mb-6" />
                                    <h3 className="text-2xl font-black text-slate-800">No properties found</h3>
                                    <p className="text-slate-500 font-medium mt-2">Try adjusting your filters or search destination.</p>
                                </div>
                            ) : (
                                <div className="space-y-0">
                                    {hotels.map((hotel, i) => (
                                        <HotelCard 
                                            key={hotel.id} 
                                            hotel={hotel} 
                                            index={i} 
                                            onBook={(h) => {
                                                navigate("/hotels/booking", {
                                                    state: {
                                                        hotel: h,
                                                        pax: Number(guests),
                                                        checkIn: safeCheckIn,
                                                        checkOut: safeCheckOut,
                                                    }
                                                });
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
