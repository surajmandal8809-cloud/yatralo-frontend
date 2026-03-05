import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Zap, Star, Layout, Crown, Sparkles, ArrowRight } from "lucide-react";

const BenefitsPage = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-white pt-24 pb-20 overflow-hidden">
            {/* Hero */}
            <div className="max-w-7xl mx-auto px-6 pt-24 mb-32 relative">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[150px] -mr-96 -mt-96" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] -ml-96 mb-[-400px]" />

                <div className="relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-10 border border-white/10"
                    >
                        <Crown className="text-orange-500" size={16} />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Membership Tiers</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-none">
                        Elevate Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-indigo-400">Voyage</span>
                    </h1>

                    <p className="text-white/40 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed mb-16">
                        Unlock a world of prestigious advantages, from secret member rates to 24/7 personalized concierge services.
                    </p>

                    <button className="px-12 py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-3xl font-black uppercase text-xs tracking-[0.3em] transition-all shadow-2xl shadow-orange-500/20">
                        Become a Member
                    </button>
                </div>
            </div>

            {/* Benefits Grid */}
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-40">
                {[
                    { label: "Insider Rates", desc: "Access to private pricing not available on the public market.", icon: ShieldCheck, color: "from-orange-500 to-orange-600" },
                    { label: "Elite Upgrades", desc: "Complimentary room and cabin upgrades at check-in when available.", icon: Award, color: "from-indigo-500 to-indigo-600" },
                    { label: "Priority Access", desc: "Skip the queues with priority boarding and express check-in.", icon: Zap, color: "from-slate-700 to-slate-800" },
                    { label: "Luxury Lounge", desc: "Unlimited access to over 1,200 airport lounges globally.", icon: Layout, color: "from-indigo-600 to-indigo-700" },
                    { label: "Concierge 24/7", desc: "Your personal travel icon for bookings, events, and assistance.", icon: Crown, color: "from-orange-600 to-orange-700" },
                    { label: "Carbon Neutral", desc: "We offset the carbon footprint for every Elite voyage booked.", icon: Sparkles, color: "from-emerald-500 to-emerald-600" },
                ].map((benefit, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -10, rotate: 1 }}
                        className="bg-white/5 backdrop-blur-xl p-12 rounded-[3.5rem] border border-white/10 relative overflow-hidden group"
                    >
                        <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity animate-pulse`} />

                        <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mb-10 shadow-2xl`}>
                            <benefit.icon size={32} />
                        </div>

                        <h3 className="text-3xl font-black mb-4 tracking-tight">{benefit.label}</h3>
                        <p className="text-white/40 font-medium leading-relaxed text-lg">{benefit.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-gradient-to-br from-indigo-600 to-orange-500 rounded-[4rem] p-12 md:p-24 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48" />
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                        <div className="max-w-2xl text-center lg:text-left">
                            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-none">Ready to Begin <br /> Your Legacy?</h2>
                            <p className="text-white/80 text-xl font-medium leading-relaxed">Join over 2 million Elite members today and start experiencing travel as it was meant to be.</p>
                        </div>
                        <button className="px-12 py-6 bg-white text-slate-900 rounded-3xl font-black uppercase text-xs tracking-[0.4em] hover:scale-105 transition-all shadow-2xl">
                            Join Now <ArrowRight className="inline ml-3" size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BenefitsPage;
