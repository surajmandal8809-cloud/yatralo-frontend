import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Hotel, Train, Bus, MapPin, Sparkles, Compass, ShieldCheck } from "lucide-react";

/**
 * A Premium, High-Fidelity Loader for the YatraLo platform.
 * Features:
 * - Dynamic icon based on mode (flight, hotel, etc.)
 * - Glassmorphism UI
 * - Multiple animated background blobs
 * - Premium typography and micro-animations
 */
const Loader = ({ 
  mode = "general", // "flight", "hotel", "train", "bus", "general"
  message = "Syncing with global servers...",
  isVisible = true
}) => {
  const getIcon = () => {
    switch (mode) {
      case "flight": return <Plane size={48} className="text-white transform -rotate-45" />;
      case "hotel": return <Hotel size={48} className="text-white" />;
      case "train": return <Train size={48} className="text-white" />;
      case "bus": return <Bus size={48} className="text-white" />;
      default: return <Compass size={48} className="text-white" />;
    }
  };

  const getLabel = () => {
    switch (mode) {
      case "flight": return "Scanning Airline Matrix";
      case "hotel": return "Checking Room Availability";
      case "train": return "Syncing Railway Databases";
      case "bus": return "Connecting to Road Network";
      default: return "Initializing Travel Sequence";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100000] bg-[#f8fafc]/80 backdrop-blur-md flex flex-col items-center justify-center font-sans overflow-hidden"
        >
          {/* Animated Background Blobs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [-20, 20, -20],
              y: [-20, 20, -20],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-violet-400/20 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              x: [20, -20, 20],
              y: [20, -20, 20],
              rotate: [90, 0, 90]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-orange-400/20 rounded-full blur-[120px]" 
          />

          {/* Loader Card */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="relative z-10 w-[min(90vw,480px)] bg-white/60 backdrop-blur-2xl border border-white rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(31,38,135,0.15)] p-12 flex flex-col items-center overflow-hidden"
          >
             {/* Progress Rings Anim */}
             <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 w-32 h-32 border-[20px] border-slate-100 rounded-full -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-48 h-48 border-[30px] border-slate-100 rounded-full -ml-24 -mb-24" />
             </div>

             {/* Main Animated Circle */}
             <div className="relative w-40 h-40 flex items-center justify-center mb-10">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-[2.5rem] border-[4px] border-slate-100/50"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[8px] rounded-[2rem] border-[4px] border-slate-100/50"
                />
                
                {/* Spinning Gradient Ring */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-[2.5rem] border-[4px] border-transparent border-t-[#7c3aed] border-r-[#f97316] shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                />

                {/* Content Hub */}
                <motion.div 
                  animate={{ 
                    y: [0, -4, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-24 h-24 bg-gradient-to-tr from-[#7c3aed] to-[#f97316] rounded-[2rem] shadow-2xl flex items-center justify-center z-20 overflow-hidden relative group"
                >
                   <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors duration-500" />
                   {getIcon()}
                   
                   {/* Light sweep effect */}
                   <motion.div 
                     animate={{ x: [-100, 200] }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                     className="absolute w-8 h-full bg-white/20 skew-x-[30deg] blur-sm top-0 left-0"
                   />
                </motion.div>
             </div>

             {/* Text Stack */}
             <div className="text-center space-y-3 relative z-10 w-full">
                <div className="flex items-center justify-center gap-1.5 text-3xl font-black text-slate-800 tracking-tighter leading-none italic uppercase">
                   Yatra<span className="text-[#f97316] not-italic">lo</span>
                </div>
                
                <div className="flex flex-col items-center">
                   <p className="text-[12px] font-black text-slate-900 uppercase tracking-[0.25em] bg-slate-100 px-4 py-1.5 rounded-full shadow-sm mb-4">
                      {getLabel()}
                   </p>
                   
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed max-w-[200px]">
                      {message}
                   </p>
                </div>
             </div>

             {/* Bottom Connectivity Bar */}
             <div className="mt-10 w-full h-1 bg-slate-100 rounded-full relative overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute h-full w-2/3 bg-gradient-to-r from-transparent via-[#f97316] to-transparent" 
                />
             </div>

             <div className="mt-6 flex items-center justify-center gap-6 opacity-30">
                <ShieldCheck size={16} className="text-[#7c3aed]" />
                <Sparkles size={16} className="text-[#f97316]" />
                <Compass size={16} className="text-[#7c3aed]" />
             </div>
          </motion.div>
          
          {/* Progress hint */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            className="absolute bottom-12 text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em]"
          >
             Establishing Secured Connection...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
