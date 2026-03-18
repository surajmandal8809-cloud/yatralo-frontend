import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Headset,
  Calendar,
  Lock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const Benefits = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      id: 1,
      title: "Best Price Guarantee",
      description: "We match any lower price you find on the premium market.",
      icon: ShieldCheck,
    },
    {
      id: 2,
      title: "Elite Concierge",
      description: "Round-the-clock assistance from our travel experts.",
      icon: Headset,
    },
    {
      id: 3,
      title: "Flexible Bookings",
      description: "Free cancellation within 24 hours for all stays.",
      icon: Calendar,
    },
    {
      id: 4,
      title: "Secure Protocol",
      description: "Military-grade 256-bit encrypted transactions.",
      icon: Lock,
    },
  ];

  const statsData = [
    { id: 1, value: 5000000, label: "Elite Members", suffix: "M+" },
    { id: 2, value: 500, label: "Daily Departures", suffix: "+" },
    { id: 3, value: 50, label: "Luxury Hubs", suffix: "+" },
    { id: 4, value: 1000, label: "Curated Stays", suffix: "+" },
  ];

  const [counts, setCounts] = useState(statsData.map(() => 0));
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          statsData.forEach((stat, index) => {
            let start = 0;
            const end = stat.value;
            const duration = 2000;
            const increment = end / (duration / 16);

            const counter = setInterval(() => {
              start += increment;
              if (start >= end) {
                start = end;
                clearInterval(counter);
              }

              setCounts((prev) => {
                const updated = [...prev];
                updated[index] = Math.floor(start);
                return updated;
              });
            }, 16);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const formatNumber = (num, suffix) => {
    if (suffix === "M+") return `${Math.floor(num / 1000000)}M+`;
    return `${num}${suffix}`;
  };

  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-5 shadow-sm">
            <Sparkles size={14} className="text-[#7c3aed]" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#7c3aed]">
              Elite Standard
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
            The{" "}
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#f97316] bg-clip-text text-transparent">
              Yatralo
            </span>{" "}
            Advantage
          </h2>

          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto">
            Experience the pinnacle of travel infrastructure, engineered for your comfort.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl shadow-lg p-8 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#7c3aed]/10 flex items-center justify-center mb-6">
                <benefit.icon size={22} className="text-[#7c3aed]" />
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {benefit.title}
              </h3>

              <p className="text-sm text-slate-500">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div
          ref={sectionRef}
          className="grid md:grid-cols-4 gap-6"
        >
          {statsData.map((stat, index) => (
            <div
              key={stat.id}
              className="bg-white p-8 rounded-3xl shadow-lg text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#7c3aed] mb-2">
                {formatNumber(counts[index], stat.suffix)}
              </div>

              <div className="text-[10px] uppercase tracking-wider text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => navigate("/benefits")}
            className="px-8 py-4 bg-[#7c3aed] text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-[#b82e1f] transition-all"
          >
            Explore Exclusive Benefits
            <ArrowRight size={16} className="inline ml-2" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Benefits;