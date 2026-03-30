import React from "react";
import { Check } from "lucide-react";

/**
 * Premium checkout stepper component for hotel booking flow.
 * Steps: Guests -> Review & Pay -> Confirmation
 */
const HotelCheckoutStepper = ({ currentStep, steps }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-xl mx-auto relative px-4">
      {/* Background Line */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-200 -translate-y-1/2 z-0" />
      
      {/* Active Line Progress */}
      <div 
        className="absolute top-1/2 left-0 h-[2.5px] bg-blue-600 -translate-y-1/2 z-0 transition-all duration-700 ease-in-out" 
        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
      />

      {steps.map((step, index) => {
        const isActive = index <= currentStep;
        const isCompleted = index < currentStep;
        
        return (
          <div key={step} className="relative z-10 flex flex-col items-center group">
            <div 
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 scale-[0.85] group-hover:scale-100 border-4 border-[#f5f7fa] shadow-sm ${
                isCompleted 
                  ? "bg-blue-600 text-white" 
                  : isActive 
                    ? "bg-white text-blue-600 ring-4 ring-blue-100" 
                    : "bg-slate-200 text-slate-400"
              }`}
            >
              {isCompleted ? <Check size={20} strokeWidth={3} /> : <span className="text-[12px] font-black">{index + 1}</span>}
            </div>
            
            <div className="absolute top-[120%] whitespace-nowrap text-center">
              <p className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                isActive ? "text-slate-900" : "text-slate-400 opacity-50"
              }`}>
                {step}
              </p>
              {isActive && (
                <div className="h-1 w-4 bg-blue-600 mx-auto mt-1 rounded-full animate-pulse" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HotelCheckoutStepper;
