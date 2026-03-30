import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Hotel,
  ShieldCheck,
  Zap,
  Award,
  Compass,
  Sparkles,
  ArrowRight,
  ChevronRight,
  MapPin,
  Star,
  Coffee,
  Waves
} from "lucide-react";
import HotelSearchWidget from "./HotelSearchWidget";

const HotelLandingPage = () => {
  const navigate = useNavigate();

  const offers = [
    {
      title: "Luxury Retreats",
      desc: "Get up to 35% OFF on 5-star properties worldwide.",
      code: "LUXE35",
      bg: "from-amber-600 to-orange-600",
      icon: Award
    },
    {
      title: "Workations",
      desc: "Stay longer & save more. Special weekly & monthly rates.",
      code: "WORK20",
      bg: "from-blue-600 to-indigo-600",
      icon: Coffee
    },
    {
      title: "Beach Escapes",
      desc: "Flat ₹5000 OFF on premium beach resorts.",
      code: "BEACH5K",
      bg: "from-emerald-500 to-teal-500",
      icon: Waves
    }
  ];

  const popularStays = [
    {
      name: "Taj Palace",
      location: "New Delhi",
      price: "₹12,500",
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      rating: 4.9
    },
    {
      name: "The Oberoi",
      location: "Mumbai",
      price: "₹15,900",
      img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      rating: 4.8
    },
    {
      name: "JW Marriott",
      location: "Bangalore",
      price: "₹10,200",
      img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      rating: 4.7
    },
    {
      name: "ITC Grand Chola",
      location: "Chennai",
      price: "₹11,150",
      img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      rating: 4.9
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      
      {/* HERO SECTION WITH VIDEO */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden py-24">
        
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-resort-swimming-pool-area-at-night-4433-large.mp4" type="video/mp4" />
          </video>

          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/80 via-[#1e293b]/60 to-slate-50"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-500/20 backdrop-blur-md rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              Exclusive Hotel Stays
            </span>
            <h1 className="text-white text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
              Find your <br />
              <span className="text-blue-400">Perfect Stay.</span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Book from over 1.2 Million hotels worldwide. <br />
              Trusted by 5M+ travelers for business & leisure.
            </p>
          </motion.div>

          <div className="w-full mt-10">
            <HotelSearchWidget />
          </div>

        </div>
      </section>

      {/* OFFERS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
             <p className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2">Exclusive Deals</p>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              Best Hotel Offers
            </h2>
          </div>

          <button className="flex items-center gap-2 text-blue-600 font-black text-[11px] uppercase tracking-widest group">
            View All Stays <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`p-1 rounded-[2.5rem] bg-gradient-to-br shadow-xl ${offer.bg}`}
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-[2.3rem] p-10 text-white relative h-full flex flex-col justify-between">
                <offer.icon className="absolute -top-6 -right-6 w-40 h-40 opacity-5 pointer-events-none" />

                <div>
                  <div className="bg-white/20 w-fit p-4 rounded-3xl mb-8">
                    <offer.icon size={28} />
                  </div>

                  <h3 className="text-2xl font-black mb-3">
                    {offer.title}
                  </h3>

                  <p className="text-white/70 text-sm font-medium leading-relaxed mb-10">
                    {offer.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div>
                    <p className="text-[10px] uppercase font-black opacity-50 tracking-widest mb-1.5">
                      Coupon Code
                    </p>
                    <p className="text-xl font-black tracking-widest">
                      {offer.code}
                    </p>
                  </div>

                  <button className="w-12 h-12 bg-white text-slate-900 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TRENDING STAYS */}
      <section className="bg-slate-900 py-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-[120px] -mr-32 -mt-32"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <h2 className="text-5xl font-black mb-4 tracking-tighter">
                Premium Getaways
              </h2>
              <p className="text-white/40 font-bold max-w-lg text-lg">
                Handpicked luxury escapes for an unforgettable experience.
              </p>
            </div>
            <div className="flex gap-4">
               <div className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-2xl border border-white/10">
                  <Star className="text-amber-400 fill-amber-400" size={16} />
                  <span className="text-sm font-black">4.8+ Avg Rating</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularStays.map((stay, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -12 }}
                className="group cursor-pointer"
              >
                <div className="relative h-[480px] rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <img
                    src={stay.img}
                    alt={stay.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                  <div className="absolute bottom-10 left-10 right-10">
                    <div className="flex items-center gap-2 mb-3">
                       <MapPin size={14} className="text-blue-400" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{stay.location}</span>
                    </div>
                    <h3 className="text-2xl font-black mb-2 tracking-tight group-hover:text-blue-400 transition-colors">
                      {stay.name}
                    </h3>
                    <div className="flex items-center justify-between">
                       <p className="text-lg font-black text-white">
                         {stay.price}
                       </p>
                       <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                          <Star size={12} className="text-amber-400 fill-amber-400" />
                          <span className="text-[10px] font-bold">{stay.rating}</span>
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-3 gap-16">
          {[
            {
              title: "Pay at Hotel",
              desc: "Don't pay anything until you arrive at the property.",
              icon: ShieldCheck,
              color: "text-blue-600",
              bg: "bg-blue-50"
            },
            {
              title: "Free Upgrades",
              desc: "Exclusive room upgrades for our premium members.",
              icon: Sparkles,
              color: "text-amber-600",
              bg: "bg-amber-50"
            },
            {
              title: "Instant Support",
              desc: "24/7 concierge service for all your travel needs.",
              icon: Zap,
              color: "text-purple-600",
              bg: "bg-purple-50"
            }
          ].map((item, i) => (
            <div key={i} className="text-center group">
              <div className={`w-20 h-20 ${item.bg} ${item.color} rounded-[2rem] flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform shadow-sm`}>
                 <item.icon size={36} />
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900">{item.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default HotelLandingPage;
