import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { Star, ArrowRight, Sparkles, Globe, Compass } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const DestinationSection = () => {
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  const destinations = [
    {
      id: 1,
      name: "Turkey",
      img: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80",
      rating: 4.8,
      tag: "Cultural Hub",
      reviews: "452",
      flights: "21",
      hotels: "15",
    },
    {
      id: 2,
      name: "Thailand",
      img: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=1200&q=80",
      rating: 4.9,
      tag: "Exotic Escape",
      reviews: "400",
      flights: "18",
      hotels: "12",
    },
    {
      id: 3,
      name: "Australia",
      img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
      rating: 4.7,
      tag: "Adventure Land",
      reviews: "410",
      flights: "24",
      hotels: "18",
    },
    {
      id: 4,
      name: "France",
      img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
      rating: 4.9,
      tag: "Romantic City",
      reviews: "520",
      flights: "30",
      hotels: "20",
    },
    {
      id: 5,
      name: "Japan",
      img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
      rating: 4.9,
      tag: "Land of Rising Sun",
      reviews: "612",
      flights: "27",
      hotels: "22",
    },
    {
      id: 6,
      name: "Italy",
      img: "https://images.unsplash.com/photo-1516488428257-8bf2dc91b004?auto=format&fit=crop&w=1200&q=80",
      rating: 4.8,
      tag: "Historical Haven",
      reviews: "534",
      flights: "32",
      hotels: "25",
    },
    {
      id: 7,
      name: "India",
      img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
      rating: 4.9,
      tag: "Spiritual Saga",
      reviews: "723",
      flights: "35",
      hotels: "28",
    },
  ];

  return (
    <section id="destinations" className="py-32 bg-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="text-left max-w-2xl">

            {/* Badge — same style as BenefitSection & Testimonials */}
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-6 shadow-sm">
              <Compass size={14} className="text-[#cf3425]" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#cf3425]">
                Global Expeditions
              </span>
            </div>

            {/* Heading — same size / weight / accent as other sections */}
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Icons of the{" "}
              <span className="text-[#cf3425]">Global Map</span>
            </h2>

            {/* Subtext — slate-500 like other sections */}
            <p className="text-slate-500 text-base md:text-lg max-w-xl mt-4">
              Curated destinations that define the art of travel, from ancient
              wonders to modern marvels.
            </p>
          </div>

          {/* Nav arrows */}
          <div className="hidden md:flex gap-4">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-14 h-14 rounded-2xl border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all group bg-white shadow-sm"
              aria-label="Previous slide"
            >
              <ArrowRight size={22} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:bg-[#cf3425] transition-all group shadow-lg"
              aria-label="Next slide"
            >
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* ── Swiper ── */}
        <Swiper
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={28}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-16"
        >
          {destinations.map((destination) => (
            <SwiperSlide key={destination.id}>
              <DestinationCard {...destination} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ── CTA — brand red like other sections ── */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/destinations")}
            className="px-8 py-4 bg-[#cf3425] text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-[#b82e1f] transition-all group"
          >
            Discover All Destinations
            <Globe
              size={16}
              className="inline ml-2 group-hover:rotate-180 transition-transform duration-700"
            />
          </button>
        </div>

      </div>
    </section>
  );
};

/* ─── Card ─── */
const DestinationCard = ({ img, name, rating, tag, flights, hotels }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onClick={() => navigate(`/hotels?location=${name}`)}
      className="relative h-[32rem] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] group cursor-pointer"
    >
      <img
        src={img}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80";
        }}
      />
      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

      {/* Top badges */}
      <div className="absolute top-8 left-8 flex flex-col gap-3">
        {/* Tag — glass pill */}
        <div className="bg-white/10 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/20 flex items-center gap-2">
          <Sparkles size={11} className="text-[#cf3425]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white">
            {tag}
          </span>
        </div>
        {/* Rating — brand red */}
        <div className="bg-[#cf3425] px-3 py-1.5 rounded-xl flex items-center gap-1.5 w-fit shadow-lg">
          <Star size={10} className="fill-white text-white" />
          <span className="text-[10px] font-black text-white">{rating}</span>
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-8 left-8 right-8 text-white">
        <h3 className="text-4xl font-black mb-6 tracking-tighter leading-none">
          {name}
        </h3>

        <div className="flex items-center gap-6 border-t border-white/10 pt-6">
          <div className="flex flex-col">
            <span className="text-xl font-black text-[#cf3425] leading-none">
              {flights}
            </span>
            <span className="text-[9px] font-black uppercase tracking-widest text-white/50 mt-1">
              Flights
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-white leading-none">
              {hotels}
            </span>
            <span className="text-[9px] font-black uppercase tracking-widest text-white/50 mt-1">
              Stays
            </span>
          </div>
          {/* Arrow button — brand red on hover */}
          <div className="group/btn ml-auto w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-[#cf3425] group-hover:text-white transition-all duration-300 shadow-lg">
            <ArrowRight
              size={20}
              className="group-hover/btn:translate-x-1 transition-transform"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationSection;