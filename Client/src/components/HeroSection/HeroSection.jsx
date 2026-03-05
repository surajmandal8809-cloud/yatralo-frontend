import React from "react";
import { motion } from "framer-motion";
import SearchForm from "./SearchForm";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-110"
        >
          <source src="/assets/Banner.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/90"></div>
      </div>

      {/* Ambient Luxury Glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#c1372a]/20 blur-[160px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/10 blur-[160px] rounded-full animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Heading */}
          <h1 className="text-white text-4xl md:text-6xl font-black mb-8 tracking-tight leading-[0.95]">
            Curated Journeys for the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c1372a] to-yellow-400">
              Global Elite
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-gray-300 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed mb-14">
            Precision-crafted travel experiences, engineered with discretion,
            sophistication, and absolute excellence.
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full"
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