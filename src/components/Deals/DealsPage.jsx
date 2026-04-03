import React, { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Star, ArrowRight, Tag } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* ============================= */
/* ⭐ REUSABLE DEALS SLIDER      */
/* ============================= */

const DEALS_DATA = [
    {
        id: 1,
        category: "FLIGHTS",
        title: "Domestic Luxury Escape",
        desc: "Up to 40% OFF on business class bookings.",
        code: "FLYLUXE",
        img: "/assets/offers/flight_offer.png",
        discount: "40% OFF",
        rating: 4.8,
        price: 8999
    },
    {
        id: 2,
        category: "HOTELS",
        title: "Royal Villa Retreats",
        desc: "Book 5-star villas at half price.",
        code: "ROYALTY",
        img: "/assets/offers/hotel_offer.png",
        discount: "50% OFF",
        rating: 4.9,
        price: 12500
    },
    {
        id: 3,
        category: "BUSES",
        title: "Premium Sleeper SALE",
        desc: "Flat ₹500 OFF on all luxury sleepers.",
        code: "SLEEP24",
        img: "/assets/offers/bus_offer.png",
        discount: "₹500 OFF",
        rating: 4.6,
        price: 1200
    },
    {
        id: 4,
        category: "TRAINS",
        title: "Executive Class Deals",
        desc: "20% cashback on Vande Bharat class.",
        code: "RAPID20",
        img: "/assets/offers/train_offer.png",
        discount: "20% BACK",
        rating: 4.7,
        price: 1800
    }
];

const DealsPage = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-slate-50 py-16 md:py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 text-center md:text-left">
                <div>
                  <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 px-3 py-1 rounded-full mb-4">
                      <Tag size={12} className="text-[#f97316]" />
                      <span className="text-[12.5px] font-black uppercase tracking-widest text-[#f97316]">Limited Time</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
                      Travel <span className="text-[#7c3aed]">Deals</span>
                  </h2>
                  <p className="text-slate-500 font-medium text-xs md:text-sm mt-3 italic">
                      Amazing discounts on flights, hotels, buses & beyond
                  </p>
                </div>
                <button 
                    onClick={() => navigate("/deals")}
                    className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                >
                    View All Deals <ArrowRight size={14} />
                </button>
            </div>

            <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                spaceBetween={24}
                slidesPerView={1}
                navigation
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="pb-16 deals-swiper"
            >
                {DEALS_DATA.map((deal) => (
                    <SwiperSlide key={deal.id}>
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden group h-full">
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={deal.img}
                                    alt={deal.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                />
                                <div className="absolute top-4 right-4 bg-[#f97316] text-white px-3 py-1 text-[12px] font-black rounded-xl shadow-lg ring-4 ring-orange-500/10">
                                    {deal.discount}
                                </div>
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-black text-[#7c3aed] rounded-xl shadow-lg uppercase tracking-widest">
                                    {deal.category}
                                </div>
                            </div>

                            <div className="p-6 md:p-8">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-[#7c3aed] transition-colors">{deal.title}</h3>
                                    <div className="flex items-center gap-1 bg-indigo-50 px-2 py-0.5 rounded-lg">
                                        <Star size={10} className="fill-[#7c3aed] text-[#7c3aed]" />
                                        <span className="text-[12.5px] font-black text-[#7c3aed]">{deal.rating}</span>
                                    </div>
                                </div>
                                <p className="text-slate-500 font-medium text-[12.5px] mb-6 italic leading-relaxed">{deal.desc}</p>
                                
                                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                    <div>
                                        <p className="text-[11px] font-black uppercase text-slate-300 tracking-widest mb-1">Starting from</p>
                                        <p className="text-xl font-black text-slate-900">₹{deal.price}</p>
                                    </div>
                                    <button 
                                        onClick={() => navigate("/deals")}
                                        className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-[#7c3aed] transition-all"
                                    >
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
            .deals-swiper .swiper-pagination-bullet {
                width: 6px;
                height: 6px;
                background: #cbd5e1;
                opacity: 1;
                transition: all 0.3s ease;
            }
            .deals-swiper .swiper-pagination-bullet-active {
                width: 24px;
                border-radius: 4px;
                background: #7c3aed;
            }
            .deals-swiper .swiper-button-next,
            .deals-swiper .swiper-button-prev {
                width: 40px;
                height: 40px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
                color: #7c3aed;
                transition: all 0.3s;
            }
            .deals-swiper .swiper-button-next:after,
            .deals-swiper .swiper-button-prev:after {
                font-size: 14px;
                font-weight: 900;
            }
            .deals-swiper .swiper-button-next:hover,
            .deals-swiper .swiper-button-prev:hover {
                background: #7c3aed;
                color: white;
            }
        `}} />
    </section>
  );
};

export default DealsPage;
