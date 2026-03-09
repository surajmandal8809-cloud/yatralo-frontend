import React from "react";
import { Star, Quote, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Business Traveler",
      content:
        "The most seamless flight booking experience I've encountered in the luxury segment. The attention to detail is remarkable.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Frequent Flyer",
      content:
        "Incredible white-glove service. They didn't just book a room; they curated a complete heritage experience in Udaipur.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Amit Kumar",
      role: "Vacation Planner",
      content:
        "The Elite benefits are game-changing. Access to exclusive airport lounges made my family trip stress-free.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "Solo Traveler",
      content:
        "Finally, a travel platform that understands modern luxury. Every interaction feels premium and personalized.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/63.jpg",
    },
  ];

  const stats = [
    { value: "50K+", label: "Elite Members" },
    { value: "4.9", label: "Average Rating" },
    { value: "1.2K+", label: "Luxury Partners" },
    { value: "125+", label: "Bespoke Hubs" },
  ];

  return (
    <section className="py-32 bg-gray-100 overflow-hidden">

      {/* Background pattern */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#c1372a 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full mb-6 shadow-sm border border-slate-100"
          >
            <Quote size={14} className="text-[#c1372a]" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-400">
              Member Voices
            </span>
          </motion.div>

          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-8 tracking-tight">
            The <span className="text-[#c1372a]">Elite</span> Verdict
          </h2>

          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Discover why the world's most discerning travelers choose Yatralo for their prestige voyages.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-xl transition-all duration-500 flex flex-col h-full"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-8">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-[#c1372a] fill-[#c1372a]"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-600 text-base font-medium leading-relaxed mb-10 italic flex-grow">
                “{t.content}”
              </p>

              {/* User */}
              <div className="flex items-center gap-4 pt-8 border-t border-slate-100">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-lg"
                />

                <div>
                  <h4 className="text-sm font-black text-slate-900">
                    {t.name}
                  </h4>
                  <p className="text-[10px] font-black uppercase text-[#c1372a] tracking-widest mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-32 pt-20 border-t border-slate-200/60">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <h3 className="text-3xl font-black text-[#c1372a] tracking-tight mb-2">
                  {stat.value}
                </h3>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <button className="group px-10 py-5 bg-[#c1372a] text-white rounded-3xl font-black uppercase text-xs tracking-[0.3em] hover:opacity-90 transition-all shadow-xl">
            Join the Elite Circle
            <ArrowRight
              size={18}
              className="inline ml-3 group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;