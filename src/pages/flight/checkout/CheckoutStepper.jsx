import React from "react";
import { Check } from "lucide-react";

export default function CheckoutStepper({ currentStep, steps }) {
  return (
    <div className="flex items-center gap-6">
      {steps.map((step, idx) => (
        <React.Fragment key={step}>
          <div className="flex items-center gap-3">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-all duration-500 ${
                idx < currentStep 
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100" 
                  : idx === currentStep 
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-200" 
                    : "bg-white border-2 border-slate-100 text-slate-300"
              }`}
            >
              {idx < currentStep ? <Check size={20} strokeWidth={3} /> : idx + 1}
            </div>
            <span 
              className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                idx <= currentStep ? "text-slate-900" : "text-slate-300"
              }`}
            >
              {step}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div className={`w-12 h-px transition-all duration-700 ${idx < currentStep ? "bg-emerald-500" : "bg-slate-200"}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
