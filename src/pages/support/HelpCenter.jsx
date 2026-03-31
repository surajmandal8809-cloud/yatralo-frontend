import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Book, 
  CreditCard, 
  User, 
  ShieldCheck, 
  MessageCircle, 
  Mail, 
  Phone, 
  ChevronRight,
  LifeBuoy,
  HelpCircle,
  Clock,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HelpCenter = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const helpCategories = [
        { 
            title: "Booking & Reservations", 
            icon: <Book className="text-[#7c3aed]" />, 
            desc: "Managing existing bookings and new reservations.",
            color: "from-purple-50 to-purple-100"
        },
        { 
            title: "Payments & Refunds", 
            icon: <CreditCard className="text-[#f97316]" />, 
            desc: "Payment methods, invoices, and refund statuses.",
            color: "from-orange-50 to-orange-100"
        },
        { 
            title: "Account & Security", 
            icon: <User className="text-blue-500" />, 
            desc: "Login issues, profile settings, and data privacy.",
            color: "from-blue-50 to-blue-100"
        },
        { 
            title: "Safety & Guidelines", 
            icon: <ShieldCheck className="text-emerald-500" />, 
            desc: "Travel insurance, health protocols and safety tips.",
            color: "from-emerald-50 to-emerald-100"
        }
    ];

    const popularQuestions = [
        "How do I cancel my booking?",
        "When will I receive my refund?",
        "Can I change my flight dates?",
        "Where can I find my itinerary?",
        "Is travel insurance mandatory?",
        "How to apply a promo code?"
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* HER0 - SEARCH SECTION */}
            <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
                {/* Background Brand Gradient Shape */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed] to-[#f97316] opacity-90 -skew-y-3 origin-top-left scale-150 md:scale-110 -z-10" />
                <div className="absolute inset-0 bg-black/10 -z-10 backdrop-blur-sm" />
                
                <div className="max-w-4xl mx-auto px-6 text-center text-white">
                    <motion.button 
                        onClick={() => navigate(-1)}
                        whileHover={{ x: -5 }}
                        className="mb-6 md:mb-8 flex items-center gap-2 text-white/80 font-bold uppercase tracking-[0.2em] text-[9px] md:text-[10px] bg-white/10 w-fit mx-auto px-4 py-2 rounded-full backdrop-blur-md"
                    >
                        <ArrowLeft size={14} /> Back to Travel
                    </motion.button>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 md:mb-8 tracking-tighter"
                    >
                        How can we <span className="text-orange-200">help you?</span>
                    </motion.h1>

                    <div className="relative group max-w-2xl mx-auto">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#7c3aed] transition-colors">
                            <Search size={20} className="md:w-6 md:h-6" />
                        </div>
                        <input 
                            type="text"
                            placeholder="Describe your issue..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/95 backdrop-blur-3xl border-2 border-white shadow-2xl p-4 md:p-6 pl-14 md:pl-16 rounded-2xl md:rounded-[2.5rem] outline-none text-slate-900 font-bold text-sm md:text-lg focus:ring-4 focus:ring-white/20 transition-all placeholder:text-slate-400"
                        />
                    </div>
                </div>
            </section>

            {/* CATEGORIES GRID */}
            <section className="py-12 md:py-24 -mt-8 md:-mt-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {helpCategories.map((cat, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className={`p-8 md:p-10 rounded-[30px] md:rounded-[40px] bg-gradient-to-br ${cat.color} border border-white shadow-xl shadow-slate-100 group cursor-pointer`}
                            >
                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-[18px] md:rounded-[20px] bg-white shadow-lg flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform">
                                    {React.cloneElement(cat.icon, { size: 28, strokeWidth: 2.5 })}
                                </div>
                                <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 md:mb-3">{cat.title}</h3>
                                <p className="text-xs md:text-sm font-semibold text-slate-500 leading-relaxed">
                                    {cat.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* POPULAR ARTICLES & SUPPORT CHANNELS */}
            <section className="py-24 bg-slate-50 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-3 gap-16">
                        
                        {/* Popular Questions Column */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-4 mb-12">
                                <HelpCircle className="text-[#f97316]" size={32} strokeWidth={2.5} />
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Popular Questions</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                {popularQuestions.map((q, i) => (
                                    <motion.button
                                        key={i}
                                        whileHover={{ scale: 1.02 }}
                                        className="text-left p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-[#7c3aed]/5 hover:border-[#7c3aed]/20 transition-all flex items-center justify-between group"
                                    >
                                        <span className="font-bold text-slate-800">{q}</span>
                                        <ChevronRight size={18} className="text-slate-300 group-hover:text-[#7c3aed] transition-colors" />
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Direct Contact Column */}
                        <div className="bg-white p-8 md:p-10 rounded-[40px] md:rounded-[50px] shadow-2xl border border-white relative overflow-hidden h-fit">
                            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#7c3aed] to-[#f97316] opacity-10 rounded-bl-[80px] md:rounded-bl-[100px]" />
                            <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-8">Reach Us Directly</h2>
                            
                            <div className="space-y-6 mb-10">
                                <div className="flex items-center gap-5 p-4 rounded-3xl hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#7c3aed] flex items-center justify-center group-hover:bg-[#7c3aed] group-hover:text-white transition-all">
                                        <MessageCircle size={22} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-800">Live Chat</p>
                                        <p className="text-[10px] font-bold text-slate-400">Typical response under 2 mins</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5 p-4 rounded-3xl hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#f97316] flex items-center justify-center group-hover:bg-[#f97316] group-hover:text-white transition-all">
                                        <Mail size={22} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-800">Email Support</p>
                                        <p className="text-[10px] font-bold text-slate-400">care@yatralo.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5 p-4 rounded-3xl hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <Phone size={22} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-800">Call Us 24/7</p>
                                        <p className="text-[10px] font-bold text-slate-400">+1-800-YATRALO</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900 p-6 rounded-[32px] text-center text-white">
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#f97316] mb-2">Service Promise</p>
                                <p className="text-sm font-bold opacity-80 mb-4 italic">Guaranteed resolution within 24 business hours.</p>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[9px] font-black uppercase tracking-wider">Agents Online</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* QUICK LINKS AREA */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 border-t border-slate-100 pt-24 text-center">
                    <LifeBuoy className="text-slate-200 mx-auto mb-8" size={64} />
                    <h2 className="text-2xl font-black text-slate-900 mb-4">Still searching for answers?</h2>
                    <p className="text-slate-500 font-medium mb-10 max-w-2xl mx-auto">
                        Don't worry, our dedicated travel specialist team is ready to help you with anything from detailed flight itineraries to complex hotel rebookings.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-10 py-5 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-orange-100 text-xs">
                            Create a Ticket
                        </button>
                        <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs">
                            Visit Support Portal
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HelpCenter;
