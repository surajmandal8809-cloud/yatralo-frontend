import { Plane, Compass } from "lucide-react";
import "./Loader.css";

const Loader = ({ message = "Preparing your journey..." }) => {
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#fdfdfd] font-sans overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-400/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-400/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Main Loader Container */}
      <div className="relative z-10 flex flex-col items-center loader-fade-in py-10 px-24 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] shadow-2xl">
        {/* Animated Icon */}
        <div className="relative w-32 h-32 flex items-center justify-center mb-8">
          <div className="absolute inset-0 border-4 border-slate-100 rounded-[2rem] rotate-12" />
          <div className="absolute inset-0 border-4 border-slate-100 rounded-[2rem] -rotate-12" />
          <div className="absolute inset-0 border-[3px] border-[#7c3aed] border-t-transparent border-r-transparent rounded-full animate-spin" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-0 border-[3px] border-[#f97316] border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "2.5s" }} />
          
          {/* Inner circle */}
          <div className="w-20 h-20 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center relative z-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-50 to-orange-50 opacity-50" />
            <Plane size={32} className="text-[#7c3aed] fill-[#7c3aed]/20 animate-plane relative z-30" />
            <Compass size={64} className="text-slate-200/50 absolute z-10" />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-3xl font-black text-slate-800 tracking-tighter flex items-center gap-1 drop-shadow-sm">
          Yatra<span className="text-[#f97316]">lo</span>
        </h2>
        
        <p className="mt-3 text-[11px] font-black text-slate-400 uppercase tracking-widest">
          {message}
        </p>

        {/* Progress bar effect */}
        <div className="mt-8 w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
          <div className="h-full bg-gradient-to-r from-[#7c3aed] via-[#f97316] to-[#7c3aed] rounded-full animated-progress bg-[length:200%_auto]" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
