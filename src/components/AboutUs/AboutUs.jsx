import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Globe, 
  Clock, 
  Users, 
  Rocket, 
  Heart 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  const stats = [
    { label: "Happy Travelers", value: "1M+", icon: <Users className="w-6 h-6" /> },
    { label: "Global Destinations", value: "500+", icon: <Globe className="w-6 h-6" /> },
    { label: "Support Hours", value: "24/7", icon: <Clock className="w-6 h-6" /> },
    { label: "Years of Trust", value: "10+", icon: <ShieldCheck className="w-6 h-6" /> },
  ];

  const values = [
    {
      title: "Our Mission",
      description: "To make global travel accessible, seamless, and memorable for everyone through innovative technology and empathetic service.",
      icon: <Rocket className="text-orange-500 w-10 h-10" />,
      gradient: "from-orange-50 to-orange-100"
    },
    {
      title: "Our Vision",
      description: "To become the world's most trusted travel companion, bridging cultures and connecting people through the joy of exploration.",
      icon: <Globe className="text-purple-500 w-10 h-10" />,
      gradient: "from-purple-50 to-purple-100"
    },
    {
      title: "Our Core Heart",
      description: "We believe travel is more than just movement; it's about the connections we make and the stories we bring back home.",
      icon: <Heart className="text-pink-500 w-10 h-10" />,
      gradient: "from-pink-50 to-pink-100"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-purple-600 to-orange-500 opacity-90 -skew-y-6 origin-top-left scale-150 -z-10" />
        <div className="max-w-7xl mx-auto px-6 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
          >
            Redefining Your <br />
            <span className="text-orange-200">Travel Experience</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto font-medium"
          >
            YatraLo is more than just a booking platform. We are your dedicated travel partners, 
            committed to turning every journey into a masterpiece of memories.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 -mt-16 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-3xl shadow-xl shadow-purple-100 border border-purple-50 text-center"
              >
                <div className="inline-flex p-3 rounded-2xl bg-purple-50 text-purple-600 mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">{stat.value}</h3>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story / Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Why We Exist</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Behind every ticket and hotel booking is a dream. We exist to protect those dreams and make them a reality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className={`p-10 rounded-[40px] bg-gradient-to-br ${item.gradient} border border-white/50 relative overflow-hidden group hover:shadow-2xl transition-all duration-500`}
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {item.description}
                </p>
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  {React.cloneElement(item.icon, { size: 120 })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl text-left">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">The Minds Behind YatraLo</h2>
              <p className="text-slate-500 text-lg">
                Our diverse team of travel enthusiasts, engineers, and customer advocates work tirelessly to ensure your next trip is your best one yet.
              </p>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-orange-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-purple-200 transition-all">
              Join Our Team
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-4 rounded-[32px] group cursor-pointer"
              >
                <div className="h-64 rounded-[24px] bg-slate-200 mb-6 overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                   <img 
                    src={`https://i.pravatar.cc/300?img=${i + 10}`} 
                    alt="Team Member" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                   />
                </div>
                <h4 className="text-xl font-bold text-slate-900 px-2">Member Name</h4>
                <p className="text-slate-500 font-medium px-2">Travel Visionary</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[50px] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/20 rounded-full blur-[100px]" />
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 relative z-10">
              Ready to start your next adventure?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button 
                onClick={() => navigate("/flights")}
                className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black hover:scale-105 transition-transform"
              >
                Explore Flights
              </button>
              <button 
                onClick={() => navigate("/support")}
                className="bg-purple-600 text-white px-10 py-5 rounded-2xl font-black hover:scale-105 transition-transform"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
