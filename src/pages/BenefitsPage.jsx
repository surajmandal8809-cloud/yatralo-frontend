import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Zap, Star, Layout, Crown, Sparkles, ArrowRight } from "lucide-react";

const BenefitsPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 pt-16 mb-16 relative">
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-violet-100 rounded-full blur-3xl opacity-50 -z-10" />
                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-orange-100 rounded-full blur-3xl opacity-50 -z-10" />

                <div className="relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-white border border-slate-200 px-5 py-2 rounded-full mb-6 shadow-sm"
                    >
                        <Crown className="text-[#7c3aed]" size={14} />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">Membership Tiers</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter leading-tight">
                        Elevate Your <span className="text-[#f97316]">Voyage</span>
                    </h1>

                    <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed mb-8">
                        Unlock prestigious advantages, from member rates to 24/7 personalized concierge.
                    </p>

                    <button className="px-8 py-3 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-xl font-semibold uppercase text-[11px] tracking-wider transition-all shadow-lg hover:opacity-90">
                        Join Membership
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {[
                    { label: "Insider Rates", desc: "Private pricing not available publicly.", icon: ShieldCheck, bg: "bg-orange-50", iconColor: "text-[#f97316]" },
                    { label: "Elite Upgrades", desc: "Complimentary upgrades when available.", icon: Award, bg: "bg-violet-50", iconColor: "text-[#7c3aed]" },
                    { label: "Priority Access", desc: "Priority boarding and express check-in.", icon: Zap, bg: "bg-slate-50", iconColor: "text-slate-600" },
                    { label: "Luxury Lounge", desc: "Access 1,200+ airport lounges globally.", icon: Layout, bg: "bg-violet-50", iconColor: "text-[#7c3aed]" },
                    { label: "Concierge 24/7", desc: "Personal assistance for bookings and events.", icon: Crown, bg: "bg-orange-50", iconColor: "text-[#f97316]" },
                    { label: "Carbon Neutral", desc: "We offset every Elite voyage footprint.", icon: Sparkles, bg: "bg-emerald-50", iconColor: "text-emerald-600" },
                ].map((benefit, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -6 }}
                        className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden"
                    >
                        <div className={`w-12 h-12 ${benefit.bg} rounded-xl flex items-center justify-center mb-4`}>
                            <benefit.icon size={18} className={`${benefit.iconColor}`} />
                        </div>

                        <h3 className="text-lg font-black mb-1 tracking-tight">{benefit.label}</h3>
                        <p className="text-slate-600 font-medium leading-relaxed text-sm">{benefit.desc}</p>
                    </motion.div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden shadow-xl">
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="max-w-2xl text-center lg:text-left">
                            <h2 className="text-2xl md:text-3xl font-black mb-2 tracking-tight text-white">Ready to Begin Your Legacy?</h2>
                            <p className="text-white/80 text-sm font-medium leading-relaxed">Join Elite members and experience travel as it should be.</p>
                        </div>
                        <button className="px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold uppercase text-[11px] tracking-wider hover:scale-105 transition-all shadow-lg">
                            Join Now <ArrowRight className="inline ml-2" size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BenefitsPage;
