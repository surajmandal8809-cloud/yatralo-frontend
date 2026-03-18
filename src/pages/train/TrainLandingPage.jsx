import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Train, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  Award, 
  Compass, 
  Sparkles,
  ArrowRight,
  ChevronRight,
  TrendingDown,
  Clock,
  Coffee,
  Heart
} from "lucide-react";
import SearchForm from "../../components/HeroSection/SearchForm";

const TrainLandingPage = () => {
    const navigate = useNavigate();

    const offers = [
        {
            title: "Super Saver Rail",
            desc: "Use code RAILNEW to get flat ₹150 OFF on your first train booking.",
            code: "RAILNEW",
            bg: "from-blue-700 to-indigo-800",
            icon: Train
        },
        {
            title: "Zero Service Fee",
            desc: "Book your tickets with zero service charges this month.",
            code: "NOSERVICE",
            bg: "from-[#f97316] to-orange-700",
            icon: Zap
        },
        {
            title: "TATKAL Support",
            desc: "Expert assistance for your urgent Tatkal bookings.",
            code: "TATKAL24",
            bg: "from-emerald-600 to-teal-700",
            icon: ShieldCheck
        }
    ];

    const popularRoutes = [
        { from: "Delhi", to: "Mumbai", price: "₹1,250", img: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800", count: "12+ Trains" },
        { from: "Bangalore", to: "Chennai", price: "₹650", img: "https://images.unsplash.com/photo-1582510003544-2d095665039b?q=80&w=800", count: "25+ Trains" },
        { from: "Kolkata", to: "Delhi", price: "₹1,450", img: "https://images.unsplash.com/photo-1558431382-bb7218352691?q=80&w=800", count: "8+ Trains" },
        { from: "Mumbai", to: "Pune", price: "₹350", img: "https://images.unsplash.com/photo-1541410945396-a9b3d14b8222?q=80&w=800", count: "45+ Trains" }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-24">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1474487022132-581338690e0c?q=80&w=2000" 
                        alt="Train Hero" 
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b]/80 via-[#7c3aed]/40 to-slate-50"></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <h1 className="text-white text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-tight">
                            Journey through <br />
                            the <span className="text-yellow-400">Heart of India</span>
                        </h1>
                        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                            Book IRCTC train tickets instantly. Check PNR status, live train tracking,
                            and enjoy zero service fees on your first booking.
                        </p>
                    </motion.div>

                    <div className="w-full mt-10">
                        <SearchForm defaultTab="train" />
                    </div>
                </div>
            </section>

            {/* Rail Offers */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Best Rail Deals</h2>
                        <p className="text-slate-500 font-bold text-sm mt-1 uppercase tracking-widest">Savings for every passenger</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {offers.map((offer, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -8 }}
                            className={`p-1 rounded-[2.5rem] bg-gradient-to-br ${offer.bg} shadow-2xl shadow-slate-200`}
                        >
                            <div className="bg-white/10 backdrop-blur-md h-full rounded-[2.3rem] p-8 text-white relative overflow-hidden group">
                                <offer.icon className="absolute -top-4 -right-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
                                <div className="relative z-10">
                                    <div className="bg-white/20 w-fit p-4 rounded-3xl mb-6 shadow-lg border border-white/20">
                                        <offer.icon size={28} />
                                    </div>
                                    <h3 className="text-2xl font-black mb-2">{offer.title}</h3>
                                    <p className="text-white/80 text-sm font-medium mb-8 leading-relaxed">{offer.desc}</p>
                                    <div className="flex items-center justify-between pt-6 border-t border-white/20">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Coupon Code</p>
                                            <p className="text-xl font-black tracking-widest leading-none mt-1">{offer.code}</p>
                                        </div>
                                        <button className="w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-xl">
                                            <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Trending Routes */}
            <section className="bg-slate-900 py-32 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#7c3aed]/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/10 blur-[150px] rounded-full" />
                
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                             <span className="text-yellow-400 text-xs font-black uppercase tracking-[0.4em] mb-4 block">Popular Routes</span>
                             <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Connecting People</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {popularRoutes.map((route, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -12 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative h-80 rounded-[3rem] overflow-hidden shadow-2xl mb-4 border border-white/5">
                                    <img src={route.img} alt={route.to} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <p className="text-xs font-black text-yellow-400 uppercase tracking-widest mb-1">{route.count}</p>
                                        <h3 className="text-xl font-black tracking-tight mb-2 leading-none">{route.from} → {route.to}</h3>
                                        <p className="text-lg font-black text-white/90">Starting {route.price}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Book with Yatralo */}
            <section className="max-w-7xl mx-auto px-6 py-32">
                <div className="grid md:grid-cols-3 gap-16">
                    {[
                        { title: "PNR Assurance", desc: "Instant PNR status updates and waitlist prediction.", icon: Clock, color: "bg-blue-50 text-blue-600" },
                        { title: "In-Train Meals", desc: "Order your favorite meals directly to your train seat.", icon: Coffee, color: "bg-orange-50 text-orange-600" },
                        { title: "Easy Returns", desc: "100% refund on cancellations for select ticket classes.", icon: Heart, color: "bg-rose-50 text-rose-600" }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center group">
                            <div className={`w-24 h-24 ${item.color} rounded-[2.5rem] flex items-center justify-center mb-10 shadow-sm group-hover:scale-110 transition-all duration-500 ring-4 ring-transparent group-hover:ring-slate-50`}>
                                <item.icon size={40} />
                            </div>
                            <h3 className="text-2xl font-black mb-4 text-slate-900 tracking-tight">{item.title}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed max-w-xs">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TrainLandingPage;
