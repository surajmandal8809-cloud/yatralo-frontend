import React from "react";
import { motion } from "framer-motion";
import HotelSearchWidget from "./components/HotelSearchWidget";
import CategoryBar from "../flight/components/CategoryBar";
import HotelOffers from "./components/HotelOffers";
import GuidelineCards from "../flight/components/GuidelineCards";
import AppPromotion from "../flight/components/AppPromotion";
import PopularHotels from "./components/PopularHotels";
import HotelFAQ from "./components/HotelFAQ";

const HotelLandingPage = () => {
    return (
        <div className="min-h-screen bg-white pt-20">
            
            {/* HERO SECTION WITH VIDEO (Same as Flight) */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-24 px-4">
                
                {/* Premium Background Video */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover scale-105"
                    >
                        <source src="/assets/Banner.mp4" type="video/mp4" />
                    </video>
                    {/* Dark Overlay for readability */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8 md:mb-16 mt-12 md:mt-0"
                    >
                        <h1 className="text-white text-4xl sm:text-5xl md:text-8xl font-black mb-6 md:mb-8 tracking-tighter leading-tight md:leading-none uppercase italic">
                            Luxury Stays <br />
                            <span className="relative inline-block">
                                <span className="relative z-10 text-white italic capitalize">Redefined Here</span>
                                <div className="absolute top-[0.4em] left-0 w-full h-[0.55em] bg-gradient-to-r from-blue-600 to-cyan-500 -z-0 opacity-80 rounded-sm"></div>
                            </span>
                        </h1>

                        <p className="text-white/80 text-xs sm:text-sm md:text-xl max-w-3xl mx-auto font-black mb-8 md:mb-12 tracking-wide uppercase italic">
                            Book the finest hotels and resorts at the lowest guaranteed prices.
                        </p>
                    </motion.div>

                    {/* Integrated Search Box - Same visual container as Flight */}
                    <div className="relative w-full max-w-7xl mx-auto">
                        <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-black/30 overflow-hidden border border-white/20">
                            <CategoryBar activeCategory="Hotels" />
                            <div className="p-2 md:p-6 pb-14">
                                <HotelSearchWidget />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* OFFERS SECTION (Hotel Specific) */}
            <HotelOffers />

            {/* INFO GRID */}
            <GuidelineCards />

            {/* APP PROMO */}
            <AppPromotion />

            {/* POPULAR LOCALES (Hotel Specific) */}
            <PopularHotels />

            {/* FAQ SECTION (Hotel Specific) */}
            <HotelFAQ />

        </div>
    );
};

export default HotelLandingPage;
