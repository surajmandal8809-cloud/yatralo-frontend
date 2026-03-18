import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Hotel, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  Award, 
  Compass, 
  Sparkles,
  ArrowRight,
  ChevronRight,
  TrendingDown,
  Star,
  Coffee,
  Waves
} from "lucide-react";
import SearchForm from "../../components/HeroSection/SearchForm";

const HotelLandingPage = () => {
    const navigate = useNavigate();

    const offers = [
        {
            title: "First Booking Deals",
            desc: "Get up to ₹2000 OFF on your first hotel stay.",
            code: "WELCOMESTAY",
            bg: "from-blue-600 to-indigo-600",
            icon: Hotel
        },
        {
            title: "Summer Retreat",
            desc: "Flat 25% OFF on luxury beach resorts.",
            code: "SUMMERSTAY",
            bg: "from-orange-500 to-red-500",
            icon: Waves
        },
        {
            title: "Member Exclusive",
            desc: "Extra benefits & early check-in for members.",
            code: "YATRAPLUS",
            bg: "from-violet-600 to-purple-700",
            icon: Star
        }
    ];

    const popularProperties = [
        { name: "The Taj Palace", location: "Mumbai", price: "₹18,500", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800", rating: "4.9" },
        { name: "Oceanic Resort", location: "Goa", price: "₹9,200", img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800", rating: "4.8" },
        { name: "Mountain View", location: "Manali", price: "₹5,400", img: "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=800", rating: "4.7" },
        { name: "Royal Plaza", location: "Delhi", price: "₹7,800", img: "https://images.unsplash.com/photo-1551882547-ff43c69e5cf2?q=80&w=800", rating: "4.6" }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-24">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000" 
                        alt="Hotel Hero" 
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
                            Your Perfect <br />
                            <span className="text-orange-400 font-black">Getaway</span> Starts Here
                        </h1>
                        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                            Book from 1M+ hotels and vacation rentals worldwide.
                            Lowest prices guaranteed. Verified guest reviews.
                        </p>
                    </motion.div>

                    <div className="w-full mt-10">
                        <SearchForm defaultTab="hotel" />
                    </div>
                </div>
            </section>

            {/* Featured Offers */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Handpicked Hotel Deals</h2>
                        <p className="text-slate-500 font-bold text-sm mt-1 uppercase tracking-widest">Exclusive savings for your next stay</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {offers.map((offer, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -8 }}
                            className={`p-1 rounded-[2.5rem] bg-gradient-to-br ${offer.bg} shadow-2xl shadow-indigo-100`}
                        >
                            <div className="bg-white/10 backdrop-blur-md h-full rounded-[2.3rem] p-8 text-white relative overflow-hidden group">
                                <offer.icon className="absolute -top-4 -right-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
                                <div className="relative z-10">
                                    <div className="bg-white/20 w-fit p-4 rounded-3xl mb-6 shadow-xl border border-white/20">
                                        <offer.icon size={28} />
                                    </div>
                                    <h3 className="text-2xl font-black mb-2">{offer.title}</h3>
                                    <p className="text-white/80 text-sm font-medium mb-8 leading-relaxed">{offer.desc}</p>
                                    <div className="flex items-center justify-between pt-6 border-t border-white/20">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Promo Code</p>
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

            {/* Luxury stays Section */}
            <section className="bg-slate-900 py-32 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#7c3aed]/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 blur-[150px] rounded-full" />
                
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                             <span className="text-[#f97316] text-xs font-black uppercase tracking-[0.4em] mb-4 block">Luxury Stays</span>
                             <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Most Gifted Properties</h2>
                        </div>
                        <p className="text-white/40 max-w-sm text-right font-medium hidden md:block">Experience world-class hospitality at our most popular destinations.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {popularProperties.map((prop, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -12 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative h-96 rounded-[3rem] overflow-hidden shadow-2xl mb-4 border border-white/5">
                                    <img src={prop.img} alt={prop.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                    <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-black border border-white/20 flex items-center gap-1.5">
                                        <Star size={12} className="text-yellow-400 fill-yellow-400" /> {prop.rating}
                                    </div>
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <p className="text-xs font-black text-[#f97316] uppercase tracking-widest mb-1">{prop.location}</p>
                                        <h3 className="text-2xl font-black tracking-tight mb-2 leading-none">{prop.name}</h3>
                                        <p className="text-xl font-black text-white/90">{prop.price}<span className="text-[10px] font-bold text-white/40 ml-1">/ Night</span></p>
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
                        { title: "Safe & Clean", desc: "Properties follow strict hygiene and safety protocols.", icon: ShieldCheck, color: "bg-indigo-50 text-indigo-600" },
                        { title: "24/7 Concierge", desc: "Dedicated support team for a hassle-free stay experience.", icon: Zap, color: "bg-amber-50 text-amber-600" },
                        { title: "Price Assurance", desc: "Find the same room cheaper? We'll match the price.", icon: Award, color: "bg-emerald-50 text-emerald-600" }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center group">
                            <div className={`w-24 h-24 ${item.color} rounded-[2.5rem] flex items-center justify-center mb-10 shadow-sm group-hover:scale-110 transition-all duration-500 ring-4 ring-transparent group-hover:ring-slate-50`}>
                                <item.icon size={40} />
                            </div>
                            <h3 className="text-2xl font-black mb-4 text-slate-900 tracking-tight">{item.title}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed max-xs">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HotelLandingPage;
