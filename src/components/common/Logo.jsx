import React from "react";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";

const Logo = ({ className = "", showText = true, variant = "dark" }) => {
  const isLight = variant === "light";

  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      <div className="relative">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          className="relative w-11 h-11 md:w-12 md:h-12 flex items-center justify-center"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            <defs>
              <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#cf3425" />
                <stop offset="100%" stopColor="#8b1e16" />
              </linearGradient>
            </defs>

            <motion.path
              d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
              fill="none"
              stroke="url(#logo-grad)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8 }}
            />

            <path
              d="M50 15 L80 30 L80 70 L50 85 L20 70 L20 30 Z"
              fill="url(#logo-grad)"
              opacity="0.15"
            />

            <motion.g
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Plane
                x="35"
                y="35"
                width="28"
                height="28"
                className="text-white"
              />
            </motion.g>
          </svg>

          <div className="absolute inset-0 bg-[#cf3425]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`text-2xl md:text-3xl font-black tracking-tight ${
              isLight ? "text-white" : "text-slate-900"
            }`}
          >
            Yatra
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cf3425] to-[#8b1e16]">
              lo
            </span>
          </span>
          <span
            className={`text-[9px] uppercase tracking-[0.4em] mt-1 ${
              isLight ? "text-white/60" : "text-slate-400"
            }`}
          >
            Luxury Travel
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
