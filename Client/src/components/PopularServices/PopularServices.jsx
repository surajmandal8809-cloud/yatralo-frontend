import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  Plane,
  Hotel,
  Bus,
  Star,
  ArrowRight,
  ShieldCheck,
  Globe,
  Users,
  Sparkles,
} from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PopularServices = () => {
  const [activeTab, setActiveTab] = useState("airlines");

  const airlines = [
    {
      id: 1,
      name: "Air India",
      rating: 4.8,
      reviews: "15.2k+",
      image:
        "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=2070&q=80",
      description: "Experience the royal Indian hospitality in the skies.",
      features: ["Premium Cabin", "Global Network", "Gourmet Meals"],
      price: "₹4,999",
    },
    {
      id: 2,
      name: "IndiGo",
      rating: 4.6,
      reviews: "28k+",
      image:
        "https://images.unsplash.com/photo-1569154949941-7d2b2a503e0f?auto=format&fit=crop&w=2070&q=80",
      description: "Punctual, affordable, and seamless travel experience.",
      features: ["On-Time", "Wide Coverage", "Lean Clean"],
      price: "₹3,299",
    },
  ];

  const hotels = [
    {
      id: 1,
      name: "Taj Lake Palace",
      rating: 4.9,
      reviews: "2.3k+",
      price: "₹18,999",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2070&q=80",
      description: "A magical palace hotel floating on Lake Pichola.",
      features: ["Royal Butler", "Spa", "Private Boat"],
    },
  ];

  const buses = [
    {
      id: 1,
      name: "VRL Travels",
      rating: 4.6,
      reviews: "15k+",
      price: "₹1,499",
      image:
        "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=2070&q=80",
      description: "Safe, comfortable, and reliable long-distance travel.",
      features: ["AC Sleeper", "WiFi", "Water Bottle"],
    },
  ];

  const currentData =
    activeTab === "airlines"
      ? airlines
      : activeTab === "hotels"
      ? hotels
      : buses;

  const tabConfigs = [
    { id: "airlines", label: "Airlines", icon: Plane },
    { id: "hotels", label: "Hotels", icon: Hotel },
    { id: "buses", label: "Buses", icon: Bus },
  ];

  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-5 shadow-sm">
            <Sparkles size={14} className="text-[#cf3425]" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#cf3425]">
              Premium Collections
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Explore{" "}
            <span className="text-[#cf3425]">
              Popular
            </span>{" "}
            Services
          </h2>

          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto">
            Discover top-rated airlines, luxury stays, and premium travel options curated just for you.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full p-1 shadow">
            {tabConfigs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-3 rounded-full text-xs font-bold flex items-center gap-2 transition ${
                    isActive
                      ? "bg-[#cf3425] text-white"
                      : "text-slate-500"
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={25}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {currentData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                <div className="relative h-56">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">
                    {item.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <Star size={12} className="text-[#cf3425]" />
                    <span className="text-xs font-semibold">
                      {item.rating}
                    </span>
                    <span className="text-[9px] text-slate-400">
                      {item.reviews} reviews
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {item.features.map((feat, i) => (
                      <span
                        key={i}
                        className="text-[9px] bg-[#cf3425]/10 text-[#cf3425] px-2 py-1 rounded-md"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-400 block">
                        Starting From
                      </span>
                      <span className="text-2xl font-bold text-black">
                        {item.price}
                      </span>
                    </div>

                    <button className="w-10 h-10 bg-[#cf3425] text-white rounded-xl flex items-center justify-center hover:opacity-90 transition">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            { label: "Partner Coverage", value: "250+", icon: Globe },
            { label: "Happy Travelers", value: "2M+", icon: Users },
            { label: "Trust Score", value: "99.9%", icon: ShieldCheck },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow text-center">
              <stat.icon className="mx-auto mb-4 text-black" size={28} />
              <div className="text-3xl font-bold text-black">
                {stat.value}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularServices;