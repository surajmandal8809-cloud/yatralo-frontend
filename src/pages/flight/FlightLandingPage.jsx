import React from "react";
import { motion } from "framer-motion";
import FlightSearchWidget from "./FlightSearchWidget";
import CategoryBar from "./components/CategoryBar";
import FlightOffers from "./components/FlightOffers";
import GuidelineCards from "./components/GuidelineCards";
import AppPromotion from "./components/AppPromotion";
import PopularRoutes from "./components/PopularRoutes";
import FlightFAQ from "./components/FlightFAQ";

const FlightLandingPage = () => {
    return (
        <div className="min-h-screen bg-white pt-20">
            
            {/* HERO SECTION WITH VIDEO */}
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
                        <h1 className="text-white text-4xl sm:text-5xl md:text-8xl font-black mb-6 md:mb-8 tracking-tighter leading-tight md:leading-none">
                            Seamless Travel <br />
                            <span className="relative inline-block">
                                <span className="relative z-10 text-white italic">Starts Here</span>
                                <div className="absolute top-[0.4em] left-0 w-full h-[0.55em] bg-gradient-to-r from-[#7c3aed] to-[#f97316] -z-0 opacity-80 rounded-sm"></div>
                            </span>
                        </h1>

                        <p className="text-white/80 text-xs sm:text-sm md:text-xl max-w-3xl mx-auto font-medium mb-8 md:mb-12 tracking-wide uppercase italic">
                            Book domestic & international flights at the lowest guaranteed prices.
                        </p>
                    </motion.div>

                    {/* Integrated Search Box as in image */}
                    <div className="relative w-full max-w-7xl mx-auto">
                        <div className="bg-white rounded-[3rem] shadow-2xl shadow-black/20 overflow-hidden border border-white/20">
                            <CategoryBar />
                            <div className="p-2 md:p-6 pb-12">
                                <FlightSearchWidget />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* OFFERS SECTION */}
            <FlightOffers />

            {/* INFO GRID */}
            <GuidelineCards />

            {/* APP PROMO */}
            <AppPromotion />

            {/* POPULAR ROUTES */}
            <PopularRoutes />

            {/* FAQ SECTION */}
            <FlightFAQ />

            {/* FOOTER */}

        </div>
    );
};

export default FlightLandingPage;
