import React from "react";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";

const Logo = ({ className = "", showText = true, variant = "dark" }) => {
  const isLight = variant === "light";

  return (
    <div className={`flex items-center gap-2 group cursor-pointer ${className}`}>
        <span className={`text-2xl md:text-3xl font-black tracking-tighter ${variant === 'light' ? 'text-white' : 'text-slate-900'}`}>
            Yatra<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#f97316]">Lo</span>
        </span>
    </div>
  );
};

export default Logo;
