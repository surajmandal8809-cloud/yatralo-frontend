import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CITIES } from "../utils/bookingUtils";
import {
    Search,
    MapPin,
    Calendar,
    Users,
    Star,
    Coffee,
    Wifi,
    Wind,
    ChevronRight,
    RefreshCw,
    Filter,
    Compass,
    Sparkles
} from "lucide-react";
import toast from "react-hot-toast";
import { getBaseURL } from "../services/baseApi";


const CityBox = ({ label, value, onChange }) => {
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState("");
    const [list, setList] = useState(CITIES);
    const [loading, setLoading] = useState(false);

    const fetchCities = useCallback(async (keyword) => {
        if (keyword.length < 2) return;
        setLoading(true);
        try {
            const res = await fetch(`${getBaseURL()}/flights/cities?keyword=${keyword}`);
            const data = await res.json();
            if (data.status) {
                setList(data.data.map(item => ({
                    code: item.iataCode,
                    name: item.name,
                })));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!q) {
            setList(CITIES);
            return;
        }
        const timer = setTimeout(() => {
            fetchCities(q);
        }, 400);
        return () => clearTimeout(timer);
    }, [q, fetchCities]);


    const sel = useMemo(() => {
        return list.find(c => c.code === value) || { code: value, name: "Selected City" };
    }, [value, list]);

    return (
      <div className="relative w-full">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">{label}</p>
            <button
                type="button"
                onClick={() => {
                    setOpen(!open);
                    setQ("");
                }}
                className="w-full flex items-center gap-3 px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-left transition-all hover:border-[#CF3425]/40"
            >
                <MapPin size={18} className="text-[#CF3425] flex-shrink-0" />
                {value ? (
                    <div>
                        <p className="text-lg font-black text-slate-900 leading-none">{value}</p>
                        <p className="text-xs text-slate-400 truncate max-w-[140px] mt-1">{sel.name}</p>
                    </div>
                ) : (
                    <p className="text-slate-500 text-sm font-bold">Where are you going?</p>
                )}
            </button>
            {open && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl z-40 overflow-hidden border border-slate-100">
                    <div className="p-3 border-b border-slate-100">
                        <input
                            autoFocus
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Enter city name..."
                            className="w-full text-sm font-bold px-4 py-3 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-[#CF3425]/10 border border-transparent focus:border-[#CF3425]/40"
                        />
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                        {loading && <div className="p-6 text-center"><RefreshCw className="animate-spin mx-auto text-[#CF3425]" size={24} /></div>}
                        {list.map((c) => (
                            <button
                                key={c.code}
                                type="button"
                                onClick={() => {
                                    onChange(c.code);
                                    setOpen(false);
                                }}
                                className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 text-left transition-colors"
                            >
                                <span className="text-xs font-black bg-rose-50 text-[#CF3425] px-2 py-1 rounded min-w-[40px] text-center">{c.code}</span>
                                <p className="text-sm font-black text-slate-800">{c.name}</p>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function HotelCard({ hotel, index, onBook }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden hover:border-[#CF3425]/40 transition-all group"
        >
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 relative overflow-hidden">
                    <img
                        src={hotel.images && hotel.images.length > 0 ? hotel.images[0] : "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60"}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 aspect-[4/3] md:aspect-auto"
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60";
                        }}
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs font-black text-slate-800">{hotel.rating}</span>
                    </div>
                </div>

                <div className="flex-1 p-6 md:p-8 flex flex-col">
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                        <div>
                            <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight mb-1">{hotel.name}</h3>
                            <p className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                <MapPin size={13} className="text-[#CF3425]" />
                                {hotel.address}, {hotel.city}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Starting from</p>
                            <p className="text-3xl font-black text-[#CF3425]">₹{hotel.price ? hotel.price.toLocaleString() : "N/A"}</p>
                            <p className="text-[10px] font-bold text-slate-500">Per Night + Taxes</p>
                        </div>
                    </div>

                    <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-2">
                        {hotel.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {hotel.amenities && hotel.amenities.slice(0, 4).map((amt, i) => (
                            <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[11px] font-bold text-slate-600">
                                {amt.toLowerCase().includes('wifi') ? <Wifi size={12} /> :
                                    amt.toLowerCase().includes('pool') ? <Sparkles size={12} /> :
                                        amt.toLowerCase().includes('breakfast') ? <Coffee size={12} /> : <Wind size={12} />}
                                {amt}
                            </span>
                        ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                            ))}
                            <div className="w-8 h-8 rounded-full border-2 border-white bg-rose-50 text-[#CF3425] text-[10px] font-black flex items-center justify-center">+12k booked</div>
                        </div>
                        <button
                            onClick={() => onBook(hotel)}
                            className="bg-[#cf3425] hover:bg-[#b82e1f] text-white px-8 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg flex items-center gap-2"
                        >
                            View Details <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function HotelsPage() {
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const [city, setCity] = useState(searchParams.get("cityCode") || searchParams.get("location") || "DEL");
    const [checkIn, setCheckIn] = useState(today);
    const [checkOut, setCheckOut] = useState(tomorrow);
    const [guests, setGuests] = useState(2);
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [priceRange, setPriceRange] = useState(50000);

    const filteredHotels = useMemo(() => {
        return hotels.filter(h => h.price <= priceRange);
    }, [hotels, priceRange]);


    useEffect(() => {
        const location = searchParams.get("location");
        const cityCode = searchParams.get("cityCode");
        if (location || cityCode) {
            handleSearch();
        }
    }, [searchParams]);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                cityCode: city,
                checkInDate: checkIn,
                checkOutDate: checkOut,
                adults: String(guests),
            });
            const res = await fetch(`${getBaseURL()}/hotels/search?${params.toString()}`);
            const payload = await res.json();
            if (payload.status) {
                setHotels(payload.data);
            } else {
                toast.error(payload.message || "Failed to search hotels");
            }
        } catch (err) {
            toast.error("An error occurred while searching");
        } finally {
            setLoading(false);
            setSearched(true);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
           <section className="relative h-[70vh] min-h-[520px] flex items-center justify-center overflow-hidden">

  {/* Background Video */}
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/assets/video/hotel.mp4" type="video/mp4" />
  </video>

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

  {/* Content */}
  <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight mb-6"
    >
      Discover Luxury <br />
      <span className="text-orange-400">Hotels Worldwide</span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8"
    >
      Find exclusive deals on premium hotels, resorts and stays.
    </motion.p>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-8 py-4 bg-[#cf3425] hover:bg-[#b82e1f] text-white font-semibold rounded-xl shadow-xl"
    >
      Explore Hotels
    </motion.button>

  </div>

</section>

            {/* Search Bar */}
            <div className="relative z-20 -mt-16 max-w-6xl mx-auto px-6">
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 w-full">
                        <CityBox label="Destination" value={city} onChange={setCity} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Check In</p>
                            <div className="relative">
                                <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CF3425]" />
                                <input
                                    type="date"
                                    value={checkIn}
                                    min={today}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 font-bold outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Check Out</p>
                            <div className="relative">
                                <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CF3425]" />
                                <input
                                    type="date"
                                    value={checkOut}
                                    min={checkIn || today}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 font-bold outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className="w-full md:w-auto px-10 py-4 bg-[#cf3425] hover:bg-[#b82e1f] text-white font-semibold rounded-xl shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {loading ? <RefreshCw className="animate-spin" size={20} /> : <Search size={20} />}
                        Search
                    </button>
                </div>
            </div>

            {/* Results */}
            <section className="max-w-6xl mx-auto px-6 py-20">
                {loading && (
                    <div className="space-y-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 bg-white rounded-[2rem] animate-pulse border border-slate-100" />
                        ))}
                    </div>
                )}

                {searched && !loading && (
                    <>
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900">Available Properties</h2>
                                <p className="text-slate-400 font-bold text-sm mt-1">Found {filteredHotels.length} hotels in {city}</p>
                            </div>
                            <button 
                                onClick={() => setShowFilter(!showFilter)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase transition-all ${
                                    showFilter ? "bg-[#cf3425] text-white border-[#cf3425]" : "bg-white border border-slate-200 text-slate-600 hover:bg-[#cf3425] hover:text-white hover:border-[#cf3425]"
                                }`}
                            >
                                <Filter size={14} /> {showFilter ? "Hide Filter" : "Filter"}
                            </button>
                        </div>

                        <AnimatePresence>
                            {showFilter && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden mb-10"
                                >
                                    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                                        <div className="max-w-md">
                                            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Max Price Per Night: <span className="text-[#CF3425]">₹{priceRange.toLocaleString()}</span></p>
                                            <input
                                                type="range"
                                                min="1000"
                                                max="100000"
                                                step="1000"
                                                value={priceRange}
                                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                                className="w-full accent-[#cf3425]"
                                            />
                                            <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
                                                <span>₹1,000</span>
                                                <span>₹1,00,000</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="grid grid-cols-1 gap-8">
                            <AnimatePresence mode="popLayout">
                                {filteredHotels.length > 0 ? (
                                    filteredHotels.map((h, i) => (
                                        <HotelCard 
                                            key={h.id} 
                                            hotel={h} 
                                            index={i} 
                                            onBook={(hotel) => {
                                                const token = localStorage.getItem("token");
                                                if (!token) {
                                                    toast.error("Please login to book a hotel");
                                                    navigate("/auth/login");
                                                    return;
                                                }
                                                navigate("/booking-selection", {
                                                    state: {
                                                        type: "hotel",
                                                        hotel: hotel,
                                                        from: city,
                                                        to: city,
                                                        fromName: city,
                                                        toName: city,
                                                        date: checkIn,
                                                        pax: guests,
                                                    },
                                                });
                                            }} 
                                        />
                                    ))
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-20"
                                    >
                                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                                            <Search size={32} />
                                        </div>
                                        <h3 className="text-xl font-black text-slate-800">No matching hotels found</h3>
                                        <p className="text-slate-400 font-bold mt-1">Try increasing your price range or changing location</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </>
                )}

                {!searched && !loading && (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-rose-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-[#CF3425]">
                            <Sparkles size={40} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800">Ready for your next adventure?</h2>
                        <p className="text-slate-400 font-bold text-lg mt-2 max-w-md mx-auto">Enter a destination above to discover hand-picked luxury stays.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
