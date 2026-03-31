import React from "react";
import { motion } from "framer-motion";
import SearchForm from "./SearchForm";

const HeroSection = () => {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12 md:pt-16">

      {/* Background Video with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src="/assets/video/Destination.mp4" type="video/mp4" />
        </video>
        {/* Dark Premium Overlays */}
      </div>

      {/* Ambient Luxury Glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#7c3aed]/20 blur-[160px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-400/10 blur-[160px] rounded-full animate-pulse delay-700" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-10 text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >


          {/* Heading */}
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-8 leading-tight tracking-tight">
            Get Closer to the Dream: {" "}
            <span className="relative inline-block">
              <span className="relative z-10">Your Tour</span>
              <div className="absolute top-[0.4em] left-0 w-full h-[0.55em] bg-gradient-to-r from-[#7c3aed] to-[#f97316] -z-0 opacity-80 rounded-sm"></div>
            </span>
            <br />
            Essentials Await
          </h1>

          {/* Subtext */}
          <p className="text-white/90 text-sm md:text-xl max-w-4xl mx-auto font-semibold mb-12">
            Your ultimate destination for all things help you celebrate & remember tour experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full mt-30 md:mt-45"
        >
          <div className="relative">
            <SearchForm />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
