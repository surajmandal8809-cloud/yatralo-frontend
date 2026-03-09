// DealsPage.jsx
import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* ============================= */
/* ⭐ Reusable Slider Component  */
/* ============================= */

const DealsSlider = ({ deals }) => {
  // Ensure slider updates when deals change
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.start();
    }
  }, [deals]);

  return (
    <Swiper
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      modules={[Navigation, Autoplay, Pagination]}
      spaceBetween={24}
      slidesPerView={1}
      navigation
      autoplay={{ 
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }}
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="pb-12"
    >
      {deals.map((deal) => (
        <SwiperSlide key={deal.id}>
          <DealCard deal={deal} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

/* ============================= */
/* ⭐ Deal Card                  */
/* ============================= */

const DealCard = ({ deal }) => {
  const navigate = useNavigate();

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={
          i < Math.floor(rating) ? "text-orange-500" : "text-gray-200"
        }
      >
        ★
      </span>
    ));

  const handleBooking = () => {
    navigate(`/payment?type=${deal.category}&id=${deal.id}`);
  };

  return (
    <div className="bg-slate-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-56 overflow-hidden">
        <img
          src={deal.image}
          alt={deal.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />
        <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 text-xs font-bold rounded-lg">
          {deal.discount}
        </div>
        {deal.badge && (
          <div className="absolute top-4 left-4 bg-white text-gray-800 px-3 py-1 text-xs font-bold rounded-lg shadow">
            {deal.badge}
          </div>
        )}
      </div>

      <div className="p-5">
        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          {deal.category}
        </span>

        <div className="flex justify-between items-start mt-3">
          <div>
            <h3 className="text-lg font-bold">{deal.title}</h3>
            <p className="text-sm text-gray-500">
              {deal.airline || deal.location || deal.operator}
            </p>
          </div>
          <div className="flex">{renderStars(deal.rating)}</div>
        </div>

        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <div>
            <p className="text-sm text-gray-400 line-through">
              ₹{deal.originalPrice.toLocaleString()}
            </p>
            <p className="text-xl font-bold">
              ₹{deal.discountedPrice.toLocaleString()}
            </p>
          </div>
          <button
            onClick={handleBooking}
            className="px-5 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

/* ============================= */
/* 🔥 Main Page                  */
/* ============================= */

const DealsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortOption, setSortOption] = useState("none");

  const categories = ["all", "flights", "hotels", "buses", "holiday-packages", "cruises", "experiences", "cars"];

  const deals = [
    // Flights
    {
      id: 1,
      category: "flights",
      title: "Mumbai to Dubai",
      airline: "Emirates",
      originalPrice: 45999,
      discountedPrice: 32999,
      discount: "28% OFF",
      image:
        "https://images.unsplash.com/photo-1542296333-7e8473a7b13c?w=500",
      rating: 4.8,
      badge: "Popular",
    },
    {
      id: 2,
      category: "flights",
      title: "Delhi to Bangkok",
      airline: "Thai Airways",
      originalPrice: 28999,
      discountedPrice: 18999,
      discount: "35% OFF",
      image:
        "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?w=500",
      rating: 4.7,
      badge: "Direct",
    },
    {
      id: 3,
      category: "flights",
      title: "Chennai to Singapore",
      airline: "Singapore Airlines",
      originalPrice: 32999,
      discountedPrice: 24999,
      discount: "24% OFF",
      image:
        "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=500",
      rating: 4.9,
      badge: "Best Price",
    },
    {
      id: 4,
      category: "flights",
      title: "Bangalore to London",
      airline: "British Airways",
      originalPrice: 65999,
      discountedPrice: 49999,
      discount: "24% OFF",
      image:
        "https://images.unsplash.com/photo-1528962862199-7c26110ee28b?w=500",
      rating: 4.6,
      badge: "Weekend Special",
    },

    // Hotels
    {
      id: 5,
      category: "hotels",
      title: "Taj Lake Palace",
      location: "Udaipur",
      originalPrice: 25999,
      discountedPrice: 15999,
      discount: "38% OFF",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500",
      rating: 4.9,
      badge: "Luxury",
    },
    {
      id: 6,
      category: "hotels",
      title: "The Oberoi Amarvilas",
      location: "Agra",
      originalPrice: 32999,
      discountedPrice: 22999,
      discount: "30% OFF",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500",
      rating: 4.9,
      badge: "Taj View",
    },
    {
      id: 7,
      category: "hotels",
      title: "JW Marriott",
      location: "Mumbai",
      originalPrice: 18999,
      discountedPrice: 12999,
      discount: "32% OFF",
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500",
      rating: 4.7,
      badge: "Sea View",
    },
    {
      id: 8,
      category: "hotels",
      title: "The Leela Palace",
      location: "New Delhi",
      originalPrice: 22999,
      discountedPrice: 16999,
      discount: "26% OFF",
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500",
      rating: 4.8,
      badge: "Heritage",
    },

    // Buses
    {
      id: 9,
      category: "buses",
      title: "Mumbai to Goa",
      operator: "VRL Travels",
      originalPrice: 1899,
      discountedPrice: 1299,
      discount: "32% OFF",
      image:
        "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=500",
      rating: 4.6,
      badge: "AC Sleeper",
    },
    {
      id: 10,
      category: "buses",
      title: "Delhi to Manali",
      operator: "Himachal Transport",
      originalPrice: 2499,
      discountedPrice: 1799,
      discount: "28% OFF",
      image:
        "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?w=500",
      rating: 4.5,
      badge: "Volvo AC",
    },
    {
      id: 11,
      category: "buses",
      title: "Bangalore to Chennai",
      operator: "KPN Travels",
      originalPrice: 1299,
      discountedPrice: 899,
      discount: "31% OFF",
      image:
        "https://images.unsplash.com/photo-1580674285054-bed31f145992?w=500",
      rating: 4.4,
      badge: "Non-stop",
    },

    // Holiday Packages
    {
      id: 12,
      category: "holiday-packages",
      title: "Kerala Backwaters",
      location: "Alleppey, Kerala",
      originalPrice: 45999,
      discountedPrice: 32999,
      discount: "28% OFF",
      image:
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=500",
      rating: 4.8,
      badge: "Houseboat Stay",
    },
    {
      id: 13,
      category: "holiday-packages",
      title: "Goa Beach Getaway",
      location: "North Goa",
      originalPrice: 28999,
      discountedPrice: 19999,
      discount: "31% OFF",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500",
      rating: 4.7,
      badge: "5* Resort",
    },
    {
      id: 14,
      category: "holiday-packages",
      title: "Manali Adventure",
      location: "Himachal Pradesh",
      originalPrice: 32999,
      discountedPrice: 23999,
      discount: "27% OFF",
      image:
        "https://images.unsplash.com/photo-1626621448379-2def816f2a4b?w=500",
      rating: 4.6,
      badge: "Snow Package",
    },

    // Cruises
    {
      id: 15,
      category: "cruises",
      title: "Caribbean Cruise",
      operator: "Royal Caribbean",
      originalPrice: 189999,
      discountedPrice: 139999,
      discount: "26% OFF",
      image:
        "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=500",
      rating: 4.9,
      badge: "All Inclusive",
    },
    {
      id: 16,
      category: "cruises",
      title: "Mediterranean Cruise",
      operator: "MSC Cruises",
      originalPrice: 159999,
      discountedPrice: 119999,
      discount: "25% OFF",
      image:
        "https://images.unsplash.com/photo-1581579536737-fbddd7afdb23?w=500",
      rating: 4.8,
      badge: "Luxury",
    },
    // Experiences (Google-hosted sample images)
    {
      id: 17,
      category: "experiences",
      title: "Desert Safari Dubai",
      operator: "Local Partner",
      originalPrice: 7999,
      discountedPrice: 4999,
      discount: "37% OFF",
      image: "https://www.gstatic.com/webp/gallery/1.jpg",
      rating: 4.6,
      badge: "Top Pick",
    },
    {
      id: 18,
      category: "experiences",
      title: "Singapore Night Safari",
      operator: "Wildlife Reserves",
      originalPrice: 6999,
      discountedPrice: 4499,
      discount: "35% OFF",
      image: "https://www.gstatic.com/webp/gallery/2.jpg",
      rating: 4.7,
      badge: "Family",
    },
    // Cars (Google-hosted sample images)
    {
      id: 19,
      category: "cars",
      title: "Self-drive SUV",
      operator: "Hertz",
      originalPrice: 4999,
      discountedPrice: 3299,
      discount: "34% OFF",
      image: "https://www.gstatic.com/webp/gallery/3.jpg",
      rating: 4.5,
      badge: "Unlimited KM",
    },
    {
      id: 20,
      category: "cars",
      title: "Luxury Sedan Chauffeur",
      operator: "Avis",
      originalPrice: 8999,
      discountedPrice: 6299,
      discount: "30% OFF",
      image: "https://www.gstatic.com/webp/gallery/4.jpg",
      rating: 4.8,
      badge: "Premium",
    },
  ];

  const filteredDeals = useMemo(() => {
    let result =
      activeCategory === "all"
        ? deals
        : deals.filter((d) => d.category === activeCategory);

    if (sortOption === "low") {
      result = [...result].sort(
        (a, b) => a.discountedPrice - b.discountedPrice
      );
    }

    if (sortOption === "high") {
      result = [...result].sort(
        (a, b) => b.discountedPrice - a.discountedPrice
      );
    }

    return result;
  }, [activeCategory, sortOption]);

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">🔥 Travel Deals</h1>
          <p className="text-gray-600 mt-2">
            Amazing discounts on flights, hotels, buses & holiday packages
          </p>
        </div>

        <div className="flex justify-between flex-wrap gap-4 mb-8">
          <div className="flex gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm transition ${
                  activeCategory === cat
                    ? "bg-[#cf3425] text-white"
                    : "bg-white border hover:bg-gray-100"
                }`}
              >
                {cat === "holiday-packages" ? "Holidays" : 
                 cat === "cruises" ? "Cruises" : 
                 cat === "experiences" ? "Experiences" :
                 cat === "cars" ? "Cars" :
                 cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <select
            className="px-4 py-2 rounded-lg border bg-white"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="none">Sort By</option>
            <option value="low">Price Low → High</option>
            <option value="high">Price High → Low</option>
          </select>
        </div>

        {filteredDeals.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No deals found in this category
          </div>
        ) : (
          <DealsSlider deals={filteredDeals} />
        )}
      </div>
    </div>
  );
};

export default DealsPage;
