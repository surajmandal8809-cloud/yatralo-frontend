import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Navigation, 
    Tag, 
    Plane, 
    Hotel, 
    Bus, 
    MapPin, 
    ChevronRight, 
    Star, 
    Zap, 
    Briefcase,
    ShieldCheck,
    Clock,
    ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ========================================================================
   ⭐ PRE-DEFINED PREMIUM DEALS DATA (YATRALO EXCLUSIVE)
   ======================================================================== */
const DEALS_DATA = [
    // Flights
    {
        id: 1,
        category: "flights",
        title: "Business Class Upgrade",
        desc: "Fly like royalty. Flat 40% OFF on all domestic business class routes.",
        code: "FLYLUXE",
        img: "/assets/offers/flight_offer.png",
        originalPrice: 45000,
        discountedPrice: 27000,
        rating: 4.9,
        tag: "Premium",
        airline: "YatraLo Exclusive"
    },
    {
        id: 2,
        category: "flights",
        title: "International Escape",
        desc: "Explore the world. Special student & senior citizen discounts on global flights.",
        code: "GLOBE20",
        img: "/assets/offers/flight_offer.png",
        originalPrice: 78000,
        discountedPrice: 62400,
        rating: 4.8,
        tag: "Global",
        airline: "International"
    },
    // Hotels
    {
        id: 3,
        category: "hotels",
        title: "Luxury Infinity Retreat",
        desc: "Book a suite at our partner boutique hotels and get a free spa voucher.",
        code: "SPA700",
        img: "/assets/offers/hotel_offer.png",
        originalPrice: 12500,
        discountedPrice: 8999,
        rating: 5.0,
        tag: "Best Seller",
        location: "Maldives & Bali"
    },
    {
        id: 4,
        category: "hotels",
        title: "Heritage Fort Stays",
        desc: "Stay in 500-year-old forts across Rajasthan with breakfast & dinner included.",
        code: "ROYALTY",
        img: "/assets/offers/hotel_offer.png",
        originalPrice: 22000,
        discountedPrice: 16500,
        rating: 4.7,
        tag: "Heritage",
        location: "Rajasthan, India"
    },
    // Buses
    {
        id: 5,
        category: "buses",
        title: "Sleeper Class Sale",
        desc: "Flat ₹500 OFF on multi-axle Volvo & Scania sleeper buses for overnight journeys.",
        code: "NIGHTFLY",
        img: "/assets/offers/bus_offer.png",
        originalPrice: 1800,
        discountedPrice: 1300,
        rating: 4.6,
        tag: "Comfort",
        operator: "YatraLo Gold"
    },
    {
        id: 6,
        category: "buses",
        title: "Inter-City Express",
        desc: "Quick travels. Save 15% on semi-sleeper buses across all major Indian cities.",
        code: "CITY15",
        img: "/assets/offers/bus_offer.png",
        originalPrice: 850,
        discountedPrice: 720,
        rating: 4.5,
        tag: "Express",
        operator: "SuperFast"
    },
    // Trains
    {
        id: 7,
        category: "trains",
        title: "Executive Chair Car",
        desc: "Exclusive 25% cashback on Shatabdi & Vande Bharat executive class bookings.",
        code: "RAPID25",
        img: "/assets/offers/train_offer.png",
        originalPrice: 2400,
        discountedPrice: 1800,
        rating: 4.9,
        tag: "Speed",
        trainType: "Premium Class"
    },
    {
        id: 8,
        category: "trains",
        title: "Tourist Special Trains",
        desc: "Discover India by rail. Priority booking for Buddhist & Heritage special circuits.",
        code: "TRAIN20",
        img: "/assets/offers/train_offer.png",
        originalPrice: 35000,
        discountedPrice: 28000,
        rating: 4.8,
        tag: "Luxury Rail",
        trainType: "Heritage Tour"
    }
];

const CATEGORIES = [
    { id: "all", label: "All Offers", icon: <Tag size={16} /> },
    { id: "flights", label: "Flights", icon: <Plane size={16} /> },
    { id: "hotels", label: "Hotels", icon: <Hotel size={16} /> },
    { id: "buses", label: "Buses", icon: <Bus size={16} /> },
    { id: "trains", label: "Trains", icon: <ShieldCheck size={16} /> },
];

const OffersPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredDeals = useMemo(() => {
        return DEALS_DATA.filter(deal => {
            const matchesTab = activeTab === "all" || deal.category === activeTab;
            const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                deal.desc.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesTab && matchesSearch;
        });
    }, [activeTab, searchTerm]);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* ── HERO SECTION ── */}
            <section className="bg-gradient-to-br from-slate-900 via-[#1e1e1e] to-slate-900 pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-30">
                   <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-violet-600/20 blur-[100px] rounded-full" />
                   <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-orange-600/10 blur-[100px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
                            <Zap size={14} className="text-yellow-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">YatraLo Exclusive Savings</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6">
                            Unbeatable Travel <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-orange-400">Deals & Offers</span>
                        </h1>
                        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed italic">
                            Handpicked luxury experiences, budget escapes, and priority transit across India and beyond.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── FILTER BAR ── */}
            <div className="sticky top-[72px] z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`flex flex-shrink-0 items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                                    activeTab === cat.id 
                                    ? "bg-slate-900 text-white shadow-xl shadow-slate-200" 
                                    : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-100"
                                }`}
                            >
                                {cat.icon}
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-80">
                        <input 
                            type="text" 
                            placeholder="Search deals, cities, or codes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-100 border-none rounded-2xl px-6 py-3 text-xs font-black text-slate-900 placeholder:text-slate-400 outline-none ring-2 ring-transparent focus:ring-violet-500/20 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* ── DEALS GRID ── */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <AnimatePresence mode="popLayout">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredDeals.map((deal, i) => (
                            <DealCard key={deal.id} deal={deal} index={i} />
                        ))}
                    </div>
                </AnimatePresence>

                {filteredDeals.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-32"
                    >
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Clock size={32} className="text-slate-300" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-2">No Deals Found</h3>
                        <p className="text-slate-400 text-sm italic">Try adjusting your filters or search terms.</p>
                    </motion.div>
                )}
            </section>
        </div>
    );
};

const DealCard = ({ deal, index }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ delay: index * 0.05 }}
        className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-indigo-100 transition-all flex flex-col h-full"
    >
        <div className="relative h-64 overflow-hidden">
            <img 
                src={deal.img} 
                alt={deal.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-5 left-5">
                <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] text-[#7c3aed] shadow-lg">
                    {deal.category}
                </div>
            </div>
            <div className="absolute top-5 right-5">
                <div className="bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-[10px] font-black shadow-lg ring-4 ring-orange-500/20">
                    {Math.round((1 - deal.discountedPrice / deal.originalPrice) * 100)}%
                </div>
            </div>
            <div className="absolute bottom-5 left-5 right-5">
                <div className="flex items-center gap-1.5 bg-slate-900/40 backdrop-blur-md px-3 py-1.5 rounded-xl w-fit">
                    <Star size={10} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-[10px] font-black text-white">{deal.rating} Rating</span>
                </div>
            </div>
        </div>

        <div className="p-8 flex flex-col flex-1">
            <div className="flex-1">
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3">
                    <MapPin size={12} />
                    {deal.airline || deal.location || deal.operator || deal.trainType}
                </div>
                <h3 className="text-xl font-black text-slate-900 leading-tight mb-3 group-hover:text-[#7c3aed] transition-colors line-clamp-2">
                    {deal.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium mb-8 italic line-clamp-3">
                    {deal.desc}
                </p>
            </div>

            <div className="pt-6 border-t border-slate-50 mt-auto">
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest line-through mb-1">
                            ₹{deal.originalPrice.toLocaleString()}
                        </p>
                        <p className="text-2xl font-black text-slate-900">
                            ₹{deal.discountedPrice.toLocaleString()}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-none">Code</p>
                        <div className="bg-slate-50 border border-dashed border-slate-200 px-3 py-1.5 rounded-xl font-black text-xs tracking-widest text-[#7c3aed] group-hover:bg-indigo-50 group-hover:border-indigo-200 transition-all">
                            {deal.code}
                        </div>
                    </div>
                </div>

                <button className="w-full bg-gradient-to-r from-slate-900 to-[#1e1e1e] group-hover:from-[#7c3aed] group-hover:to-[#f97316] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-lg hover:shadow-indigo-500/20 transition-all">
                    Unlock Exclusive Access
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
    </motion.div>
);

export default OffersPage;
