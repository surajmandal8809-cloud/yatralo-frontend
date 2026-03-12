import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Sparkles,
    ArrowRight,
    Compass,
    MapPin,
    Star,
    Plane,
    Building2,
    Mountain,
    Waves,
    Landmark,
    Zap,
    Globe,
    Heart,
    TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────── data ─────────────────────────────── */
const CATEGORIES = [
    { id: "all", label: "All", icon: <Globe size={15} /> },
    { id: "beach", label: "Beach", icon: <Waves size={15} /> },
    { id: "mountains", label: "Mountains", icon: <Mountain size={15} /> },
    { id: "culture", label: "Culture", icon: <Landmark size={15} /> },
    { id: "adventure", label: "Adventure", icon: <Zap size={15} /> },
    { id: "trending", label: "Trending", icon: <TrendingUp size={15} /> },
];

const DESTINATIONS = [
    {
        id: 1,
        name: "Goa",
        country: "India",
        img: "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?auto=format&fit=crop&w=1200&q=80",
        rating: 4.8,
        reviews: 1452,
        tag: "Sun & Sand",
        flights: 32,
        hotels: 48,
        price: "₹8,999",
        categories: ["beach", "trending"],
    },
    {
        id: 2,
        name: "Manali",
        country: "India",
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
        rating: 4.9,
        reviews: 980,
        tag: "Snow Peak",
        flights: 18,
        hotels: 35,
        price: "₹6,499",
        categories: ["mountains", "adventure"],
    },
    {
        id: 3,
        name: "Rajasthan",
        country: "India",
        img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
        rating: 4.7,
        reviews: 1210,
        tag: "Royal Heritage",
        flights: 24,
        hotels: 42,
        price: "₹7,299",
        categories: ["culture", "trending"],
    },
    {
        id: 4,
        name: "Kerala",
        country: "India",
        img: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1200&q=80",
        rating: 4.9,
        reviews: 1100,
        tag: "God's Own Country",
        flights: 20,
        hotels: 30,
        price: "₹9,199",
        categories: ["beach", "culture"],
    },
    {
        id: 5,
        name: "Darjeeling",
        country: "India",
        img: "https://images.unsplash.com/photo-1566837497312-7be7830ae9b5?auto=format&fit=crop&w=1200&q=80",
        rating: 4.7,
        reviews: 740,
        tag: "Tea & Mist",
        flights: 14,
        hotels: 22,
        price: "₹5,799",
        categories: ["mountains"],
    },
    {
        id: 6,
        name: "Andaman",
        country: "India",
        img: "https://images.unsplash.com/photo-1601919051950-bb9f3ffb3fee?auto=format&fit=crop&w=1200&q=80",
        rating: 4.9,
        reviews: 860,
        tag: "Crystal Waters",
        flights: 12,
        hotels: 18,
        price: "₹14,499",
        categories: ["beach", "adventure"],
    },
    {
        id: 7,
        name: "Varanasi",
        country: "India",
        img: "https://images.unsplash.com/photo-1567156271-cbb95282af20?auto=format&fit=crop&w=1200&q=80",
        rating: 4.6,
        reviews: 920,
        tag: "Spiritual City",
        flights: 16,
        hotels: 28,
        price: "₹4,999",
        categories: ["culture"],
    },
    {
        id: 8,
        name: "Leh Ladakh",
        country: "India",
        img: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80",
        rating: 4.9,
        reviews: 650,
        tag: "High Altitude",
        flights: 10,
        hotels: 20,
        price: "₹12,999",
        categories: ["mountains", "adventure", "trending"],
    },
    {
        id: 9,
        name: "Thailand",
        country: "Thailand",
        img: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=1200&q=80",
        rating: 4.8,
        reviews: 2300,
        tag: "Exotic Escape",
        flights: 28,
        hotels: 55,
        price: "₹22,999",
        categories: ["beach", "culture", "trending"],
    },
    {
        id: 10,
        name: "Bali",
        country: "Indonesia",
        img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=80",
        rating: 4.9,
        reviews: 3100,
        tag: "Island Paradise",
        flights: 22,
        hotels: 60,
        price: "₹25,499",
        categories: ["beach", "adventure", "trending"],
    },
    {
        id: 11,
        name: "France",
        country: "France",
        img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
        rating: 4.9,
        reviews: 4200,
        tag: "Romantic City",
        flights: 40,
        hotels: 80,
        price: "₹55,000",
        categories: ["culture", "trending"],
    },
    {
        id: 12,
        name: "Switzerland",
        country: "Switzerland",
        img: "https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?auto=format&fit=crop&w=1200&q=80",
        rating: 4.9,
        reviews: 1850,
        tag: "Alpine Dream",
        flights: 18,
        hotels: 35,
        price: "₹72,000",
        categories: ["mountains", "adventure"],
    },
];

/* ─────────────────────────────── component ─────────────────────────── */
const DestinationsPage = () => {
    const destinationVideo = `${import.meta.env.BASE_URL}assets/video/Destination.mp4`;
    const destinationPoster = `${import.meta.env.BASE_URL}assets/flight-banner.jpg`;
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [liked, setLiked] = useState({});

    const filtered = useMemo(() => {
        return DESTINATIONS.filter((d) => {
            const matchSearch = d.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchCat =
                activeCategory === "all" || d.categories.includes(activeCategory);
            return matchSearch && matchCat;
        });
    }, [searchTerm, activeCategory]);

    const toggleLike = (e, id) => {
        e.stopPropagation();
        setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="min-h-screen bg-slate-50">

            {/* ── HERO ── */}
            <section className="relative h-[80vh] min-h-[520px] flex items-center justify-center overflow-hidden">
                <video
                    autoPlay loop muted playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src={destinationVideo} type="video/mp4" />
                </video>

                {/* gradient overlays */}
                <div className="absolute inset-0 bg-black/35" />

                {/* Hero content */}
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-xl border border-white/25 px-5 py-2.5 rounded-full mb-8"
                    >
                        <Compass size={15} className="text-yellow-400" />
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white">
                            Explore The World
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6"
                    >
                        Discover{" "}
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                            Incredible
                        </span>{" "}
                        Destinations
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
                    >
                        From snow-capped peaks to sun-kissed beaches — find your perfect
                        escape among {DESTINATIONS.length}+ handpicked destinations.
                    </motion.p>

                    {/* Stat pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        {[
                            { icon: <MapPin size={13} />, label: "12+ Countries" },
                            { icon: <Plane size={13} />, label: "300+ Flights" },
                            { icon: <Star size={13} />, label: "4.8 Avg Rating" },
                        ].map((s, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 bg-white/15 backdrop-blur-xl border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full"
                            >
                                {s.icon}
                                {s.label}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── SEARCH + FILTER BAR ── */}
            <div className="relative z-20 -mt-10 md:-mt-14">
                <div className="max-w-6xl mx-auto px-4 md:px-6">
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-900/10 p-4 md:p-5 flex flex-col md:flex-row items-center gap-3">

                    {/* Search */}
                    <div className="relative w-full md:max-w-sm">
                        <Search
                            size={15}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                        <input
                            type="text"
                            placeholder="Search destination..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                    </div>

                    {/* Category pills */}
                    <div className="flex gap-2 overflow-x-auto scrollbar-none pb-0.5 w-full md:w-auto">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-black uppercase tracking-wide transition-all ${activeCategory === cat.id
                                    ? "bg-slate-900 text-white"
                                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                    }`}
                            >
                                {cat.icon}
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
                </div>
            </div>

            {/* ── DESTINATIONS GRID ── */}
            <section className="max-w-7xl mx-auto px-6 py-10">

                {/* Result count */}
                <motion.div
                    layout
                    className="flex items-center justify-between mb-10"
                >
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">
                            {activeCategory === "all"
                                ? "All Destinations"
                                : CATEGORIES.find((c) => c.id === activeCategory)?.label}
                        </h2>
                        <p className="text-slate-400 text-sm mt-1">
                            {filtered.length} destination{filtered.length !== 1 ? "s" : ""} found
                        </p>
                    </div>
                </motion.div>

                {/* Grid */}
                <AnimatePresence mode="popLayout">
                    {filtered.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-32"
                        >
                            <Globe size={56} className="mx-auto text-slate-200 mb-4" />
                            <p className="text-slate-400 font-bold text-lg">No destinations found</p>
                            <p className="text-slate-300 text-sm mt-1">Try a different search or category</p>
                            <button
                                onClick={() => { setSearchTerm(""); setActiveCategory("all"); }}
                                className="mt-6 px-6 py-3 bg-[#cf3425] hover:bg-[#b82e1f] text-white rounded-xl font-semibold text-sm transition"
                            >
                                Clear Filters
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {filtered.map((dest, i) => (
                                <DestinationCard
                                    key={dest.id}
                                    dest={dest}
                                    index={i}
                                    liked={!!liked[dest.id]}
                                    onLike={(e) => toggleLike(e, dest.id)}
                                    onClick={() => navigate(`/hotels?location=${dest.name}`)}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* ── BOTTOM CTA ── */}
            <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-24 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-8">
                        <Sparkles size={12} className="text-yellow-400" />
                        Can't decide?
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">
                        Let us plan your{" "}
                        <span className="text-yellow-400">dream trip</span>
                    </h2>
                    <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                        Our travel experts will craft a personalised itinerary just for you
                        — flights, hotels, and experiences included.
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="inline-flex items-center gap-3 bg-[#cf3425] hover:bg-[#b82e1f] text-white font-semibold px-10 py-5 rounded-xl text-sm uppercase tracking-widest transition-all shadow-2xl shadow-red-500/20 group"
                    >
                        Start Planning
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </section>
        </div>
    );
};

/* ─────────────────────────────── card ─────────────────────────────── */
const DestinationCard = ({ dest, index, liked, onLike, onClick }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.35, delay: index * 0.05 }}
        whileHover={{ y: -8 }}
        onClick={onClick}
        className="group relative bg-white rounded-[2rem] overflow-hidden shadow-lg shadow-slate-200/60 border border-slate-100 cursor-pointer"
    >
        {/* Image */}
        <div className="relative h-60 overflow-hidden">
            <img
                src={dest.img}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                    e.target.src =
                        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80";
                }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Heart */}
            <button
                onClick={onLike}
                className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
            >
                <Heart
                    size={15}
                    className={liked ? "fill-rose-500 text-rose-500" : "text-slate-400"}
                />
            </button>

            {/* Tag badge */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/15 backdrop-blur-xl border border-white/25 px-3 py-1.5 rounded-xl">
                <Sparkles size={10} className="text-yellow-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white">
                    {dest.tag}
                </span>
            </div>

            {/* Rating */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-orange-500 px-2.5 py-1 rounded-xl shadow-lg">
                <Star size={10} className="fill-white text-white" />
                <span className="text-[10px] font-black text-white">{dest.rating}</span>
            </div>
        </div>

        {/* Body */}
        <div className="p-5">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h3 className="text-xl font-black text-slate-900 leading-tight">
                        {dest.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-0.5">
                        <MapPin size={11} className="text-slate-400" />
                        <span className="text-xs text-slate-400 font-semibold">
                            {dest.country}
                        </span>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-lg font-black text-indigo-600">{dest.price}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">per person</p>
                </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-4 border-t border-slate-100 pt-3">
                <div className="flex items-center gap-1">
                    <Plane size={11} className="text-indigo-400" />
                    <span className="text-xs font-bold text-slate-500">
                        {dest.flights} Flights
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <Building2 size={11} className="text-orange-400" />
                    <span className="text-xs font-bold text-slate-500">
                        {dest.hotels} Hotels
                    </span>
                </div>
                <div className="ml-auto flex items-center gap-1">
                    <span className="text-[10px] text-slate-400">
                        ({dest.reviews.toLocaleString()})
                    </span>
                </div>
            </div>

            {/* Explore button */}
            <button className="mt-4 w-full py-3 bg-[#cf3425] hover:bg-[#b82e1f] text-white rounded-2xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors duration-300">
                Explore
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    </motion.div>
);

export default DestinationsPage;
