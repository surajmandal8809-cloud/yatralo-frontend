import React from "react";
import { Check } from "lucide-react";

export default function CheckoutStepper({ currentStep, steps }) {
    const renderStepIcon = (index) => {
        if (currentStep > index) return <Check size={16} className="text-white" />;
        return <span className="text-sm font-bold">{index + 1}</span>;
    };

    return (
        <div className="flex items-center justify-center mb-10">
            {steps.map((step, index) => (
                <React.Fragment key={step}>
                    <div className="flex flex-col items-center">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep >= index ? "bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] text-white shadow-lg shadow-violet-200" : "bg-white text-slate-400 border border-slate-200"
                                }`}
                        >
                            {renderStepIcon(index)}
                        </div>
                        <span className={`text-[13px] font-bold mt-2 ${currentStep >= index ? "text-slate-900" : "text-slate-400"}`}>
                            {step}
                        </span>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`w-16 md:w-32 h-[2px] mx-2 -mt-6 transition-all duration-300 ${currentStep > index ? "bg-[#7c3aed]" : "bg-slate-200"}`} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
