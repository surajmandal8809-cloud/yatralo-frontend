import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Bus,
  MapPin,
  ShieldCheck,
  Zap,
  Award,
  ArrowRight,
  ChevronRight,
  TrendingDown,
  Clock,
  Coffee,
} from "lucide-react";
import SearchForm from "../../components/HeroSection/SearchForm";

const BusLandingPage = () => {
  const navigate = useNavigate();

  const offers = [
    {
      title: "Intercity Special",
      desc: "Get up to ₹200 OFF on your first bus booking.",
      code: "BUSNEW",
      bg: "from-orange-600 to-red-600",
      icon: Bus,
    },
    {
      title: "Weekend Gateway",
      desc: "Flat 10% OFF on all AC Sleeper routes.",
      code: "WEEKEND10",
      bg: "from-violet-600 to-indigo-600",
      icon: Clock,
    },
    {
      title: "Student Discount",
      desc: "Extra 5% OFF for students with valid ID.",
      code: "STUDBUS",
      bg: "from-emerald-500 to-teal-500",
      icon: Award,
    },
  ];

  const popularRoutes = [
    { from: "Delhi", to: "Jaipur", price: "₹499", img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800", count: "45+ Buses" },
    { from: "Mumbai", to: "Pune", price: "₹350", img: "https://images.unsplash.com/photo-1567157577867-05ccb1388e6e?q=80&w=800", count: "120+ Buses" },
    { from: "Bangalore", to: "Chennai", price: "₹650", img: "https://images.unsplash.com/photo-1582510003544-2d095665039b?q=80&w=800", count: "80+ Buses" },
    { from: "Hyderabad", to: "Bangalore", price: "₹899", img: "https://images.unsplash.com/photo-1626139575235-9053ea5a05dd?q=80&w=800", count: "65+ Buses" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-24">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2000"
            alt="Bus Hero"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b]/80 via-[#7c3aed]/40 to-slate-50" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-white text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-tight">
              Travel Smart <br />
              with <span className="text-[#f97316]">Comfort</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              Book AC, Sleeper, and Luxury buses at lowest prices.
              100% Secure bookings with live bus tracking.
            </p>
          </motion.div>

          <div className="w-full mt-10">
            <SearchForm defaultTab="bus" />
          </div>
        </div>
      </section>

      {/* Exclusive Offers */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Top Bus Offers</h2>
            <p className="text-slate-500 font-bold text-sm mt-1 uppercase tracking-widest">Savings on every journey</p>
          </div>
          <button className="flex items-center gap-2 text-[#7c3aed] font-black text-sm uppercase tracking-widest hover:gap-3 transition-all">
            View All Offers <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className={`p-1 rounded-[2rem] bg-gradient-to-br ${offer.bg} shadow-xl shadow-slate-200`}
            >
              <div className="bg-white/10 backdrop-blur-md h-full rounded-[1.8rem] p-8 text-white relative overflow-hidden group">
                <offer.icon className="absolute -top-4 -right-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
                <div className="relative z-10">
                  <div className="bg-white/20 w-fit p-3 rounded-2xl mb-6">
                    <offer.icon size={24} />
                  </div>
                  <h3 className="text-xl font-black mb-2">{offer.title}</h3>
                  <p className="text-white/80 text-sm font-medium mb-8 leading-relaxed">{offer.desc}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Use Code</p>
                      <p className="text-lg font-black tracking-widest">{offer.code}</p>
                    </div>
                    <button className="w-10 h-10 bg-white text-slate-900 rounded-full flex items-center justify-center hover:scale-110 transition-all">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Routes */}
      <section className="bg-slate-900 py-24 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7c3aed]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
              <TrendingDown size={14} className="text-[#f97316]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Top Routes</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">Travel More, Pay Less</h2>
            <p className="text-white/50 max-w-2xl mx-auto font-medium">Daily departures on these top-searched bus routes.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoutes.map((route, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative h-80 rounded-[2.5rem] overflow-hidden shadow-2xl mb-4">
                  <img src={route.img} alt={route.to} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-black tracking-tight">{route.from} → {route.to}</h3>
                      <p className="text-lg font-black text-[#f97316]">{route.price}</p>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-[10px] font-black uppercase tracking-widest">
                      <Bus size={12} />
                      {route.count}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { title: "Safe Journey", desc: "Top rated operators ensuring safety at every step.", icon: ShieldCheck, color: "bg-violet-50 text-[#7c3aed]" },
            { title: "Instant Booking", desc: "Confirm your seat in seconds with live availability.", icon: Zap, color: "bg-orange-50 text-[#f97316]" },
            { title: "Amenities", desc: "Premium coaches with AC, charging points & snacks.", icon: Coffee, color: "bg-emerald-50 text-emerald-600" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className={`w-20 h-20 ${item.color} rounded-[2rem] flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-all duration-500 ring-8 ring-transparent group-hover:ring-slate-50`}>
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-black mb-3 text-slate-900 uppercase tracking-tight">{item.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed max-w-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BusLandingPage;
