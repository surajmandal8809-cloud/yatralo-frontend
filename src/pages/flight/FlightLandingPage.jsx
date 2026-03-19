import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Plane,
  ShieldCheck,
  Zap,
  Award,
  Compass,
  Sparkles,
  ArrowRight,
  ChevronRight,
  TrendingDown
} from "lucide-react";
import SearchForm from "../../components/HeroSection/SearchForm";
import FlightSearchWidget from "./FlightSearchWidget";


const FlightLandingPage = () => {
  const navigate = useNavigate();

  const offers = [
    {
      title: "Domestic Flights",
      desc: "Get up to ₹2500 OFF on your first booking.",
      code: "FLYNEW",
      bg: "from-violet-600 to-indigo-600",
      icon: Plane
    },
    {
      title: "International Sale",
      desc: "Flat 15% OFF on flights to Europe & USA.",
      code: "GLOBAL15",
      bg: "from-[#f97316] to-[#ea580c]",
      icon: Compass
    },
    {
      title: "Student Special",
      desc: "Extra baggage & up to 10% student discount.",
      code: "STUDENTFLY",
      bg: "from-violet-500 to-purple-500",
      icon: Award
    }
  ];

  const popularDestinations = [
    {
      name: "Dubai",
      price: "₹24,500",
      img: "/assets/img/img_36383f6609.jpg",
      count: "124+ Flights"
    },
    {
      name: "Singapore",
      price: "₹18,900",
      img: "/assets/img/img_2c0ec1aac4.jpg",
      count: "86+ Flights"
    },
    {
      name: "London",
      price: "₹56,200",
      img: "/assets/img/img_469a93f070.jpg",
      count: "42+ Flights"
    },
    {
      name: "Paris",
      price: "₹48,150",
      img: "/assets/img/img_4cb6a307e4.jpg",
      count: "55+ Flights"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      
      {/* HERO SECTION WITH VIDEO */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-24">
        
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/assets/Banner.mp4" type="video/mp4" />
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b]/80 via-[#7c3aed]/40 to-slate-50"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-white text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-tight">
              Explore the world <br />
              with <span className="text-[#f97316]">Confidence</span>
            </h1>

            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              Search and book from over 400+ airlines worldwide.
              Exclusive deals, easy cancellations, and 24/7 support.
            </p>
          </motion.div>

          <div className="w-full mt-10">
            <FlightSearchWidget />
          </div>

        </div>
      </section>

      {/* OFFERS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900">
              Exclusive Flight Offers
            </h2>
            <p className="text-slate-500 font-bold text-sm mt-1 uppercase tracking-widest">
              Handpicked deals just for you
            </p>
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
              className={`p-1 rounded-[2rem] bg-gradient-to-br ${offer.bg}`}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-[1.8rem] p-8 text-white relative">
                <offer.icon className="absolute -top-4 -right-4 w-32 h-32 opacity-10" />

                <div>
                  <div className="bg-white/20 w-fit p-3 rounded-2xl mb-6">
                    <offer.icon size={24} />
                  </div>

                  <h3 className="text-xl font-black mb-2">
                    {offer.title}
                  </h3>

                  <p className="text-white/80 text-sm mb-8">
                    {offer.desc}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <div>
                      <p className="text-xs uppercase opacity-60">
                        Use Code
                      </p>
                      <p className="text-lg font-black">
                        {offer.code}
                      </p>
                    </div>

                    <button className="w-10 h-10 bg-white text-slate-900 rounded-full flex items-center justify-center">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">
              Trending Destinations
            </h2>
            <p className="text-white/50">
              Explore top international hotspots
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((dest, i) => (
              <motion.div key={i} whileHover={{ y: -10 }}>
                <div className="relative h-96 rounded-3xl overflow-hidden">
                  <img
                    src={dest.img}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold">
                      {dest.name}
                    </h3>
                    <p className="text-[#f97316]">
                      {dest.price}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              title: "Price Lock",
              desc: "Lock fares now and book later",
              icon: ShieldCheck
            },
            {
              title: "24/7 Support",
              desc: "We’re always here to help",
              icon: Zap
            },
            {
              title: "Free Cancellation",
              desc: "Flexible booking options",
              icon: Sparkles
            }
          ].map((item, i) => (
            <div key={i} className="text-center">
              <item.icon className="mx-auto mb-4" size={32} />
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default FlightLandingPage;