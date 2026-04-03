import React, { useState } from "react";
import { Plus, Minus, HelpCircle, ChevronRight, MessageSquare, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HotelFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const questions = [
        {
            q: "What documents are required for check-in?",
            a: "Usually, a valid Government ID (Aadhaar Card, Passport, Driving License) is required for check-in. For international bookings, your passport is mandatory. Local IDs are allowed at certain properties only."
        },
        {
            q: "How do I cancel my hotel booking?",
            a: "You can cancel your booking directly from the 'My Bookings' section. Cancellation fees vary depending on the hotel's policy and the time of cancellation. Non-refundable bookings do not receive a refund."
        },
        {
            q: "What is 'Pay at Hotel' and how does it work?",
            a: "Pay at Hotel allows you to secure your booking with just a confirmation. You'll only pay the full amount when you arrive at the property. Some hotels might require a small token amount to guarantee the reservation."
        },
        {
            q: "Can I request for an early check-in or late check-out?",
            a: "Early check-in and late check-out are subject to availability and might involve additional charges. We recommend contacting the hotel directly via our support chat after booking."
        },
        {
            q: "Are the prices shown per person or per room?",
            a: "The prices shown are per night per room for the specified number of guests. Taxes and service fees are typically added during the final checkout stage."
        }
    ];

    return (
        <section className="py-24 bg-slate-900 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div>
                        <h2 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-4 italic">
                             Booking Assistance
                        </h2>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none mb-8">
                            Got Questions? <br />
                            <span className="text-slate-500">We Have Answers</span>
                        </h1>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-tight italic max-w-sm mb-12">
                            Everything you need to know about hotel bookings, payments, and property rules.
                        </p>
                        <div className="space-y-4">
                            <div className="p-6 bg-white/5 backdrop-blur border border-white/10 rounded-3xl flex items-center gap-6 group hover:bg-white/10 transition-all cursor-pointer">
                                <div className="w-14 h-14 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><MessageSquare size={24}/></div>
                                <div><p className="text-white font-black uppercase italic tracking-widest text-sm">Chat with Us</p><p className="text-[10px] text-slate-500 font-bold uppercase italic mt-1">Instant Support 24*7</p></div>
                                <ChevronRight size={18} className="text-white/20 ml-auto group-hover:text-white transition-all"/>
                            </div>
                            <div className="p-6 bg-white/5 backdrop-blur border border-white/10 rounded-3xl flex items-center gap-6 group hover:bg-white/10 transition-all cursor-pointer">
                                <div className="w-14 h-14 bg-indigo-600/20 text-indigo-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><PhoneCall size={24}/></div>
                                <div><p className="text-white font-black uppercase italic tracking-widest text-sm">Call Support</p><p className="text-[10px] text-slate-500 font-bold uppercase italic mt-1">+91 080 4719 1234</p></div>
                                <ChevronRight size={18} className="text-white/20 ml-auto group-hover:text-white transition-all"/>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {questions.map((q, i) => (
                            <div key={i} className={`p-8 rounded-[2rem] border transition-all duration-500 cursor-pointer ${activeIndex === i ? "bg-white border-white" : "bg-white/5 border-white/10 hover:border-white/30"}`} onClick={() => setActiveIndex(activeIndex === i ? null : i)}>
                                <div className="flex items-center justify-between">
                                    <h4 className={`text-sm font-black uppercase tracking-widest italic transition-colors ${activeIndex === i ? "text-slate-900" : "text-white"}`}>{q.q}</h4>
                                    {activeIndex === i ? <Minus size={18} className="text-slate-900"/> : <Plus size={18} className="text-white/20"/>}
                                </div>
                                <AnimatePresence>
                                    {activeIndex === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-tight italic mt-6 leading-relaxed max-w-xl">{q.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HotelFAQ;
