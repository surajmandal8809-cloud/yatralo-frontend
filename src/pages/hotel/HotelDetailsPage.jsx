import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  MapPin, 
  ChevronRight, 
  Wifi, 
  Check, 
  Expand, 
  Bed, 
  CheckCircle, 
  ShieldCheck, 
  Clock, 
  LogOut, 
  IdCard,
  Share2,
  Heart,
  Image as ImageIcon,
  Wind,
  Coffee,
  Tv,
  Car,
  Utensils,
  Smartphone,
  Info,
  ChevronDown,
  Navigation,
  ChevronLeft,
  X,
  Plane
} from "lucide-react";
import { getHotelDetails } from "../../services/hotelRoutes";

const HotelDetailsPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    const hotelId = searchParams.get("hotelId");
    const checkInDate = searchParams.get("checkInDate");
    const checkOutDate = searchParams.get("checkOutDate");
    const adults = searchParams.get("adults");

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const result = await getHotelDetails({
                    hotelId,
                    checkInDate,
                    checkOutDate,
                    adults
                });
                if (result.status) {
                    setHotel(result.data);
                }
            } catch (err) {
                console.error("Failed to fetch hotel details:", err);
            } finally {
                setLoading(false);
            }
        };

        if (hotelId) fetchDetails();
        window.scrollTo(0, 0);
    }, [hotelId, checkInDate, checkOutDate, adults]);

    const handleSelectRoom = (room, typeName) => {
        const params = new URLSearchParams({
            hotelId,
            hotelName: hotel.name,
            roomType: `${room.roomType} (${typeName})`,
            price: room.price,
            checkInDate,
            checkOutDate,
            adults
        });
        navigate(`/hotels/review?${params.toString()}`);
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex flex-col pt-32 px-4 items-center">
            <div className="w-[800px] h-96 bg-white rounded-3xl animate-pulse shadow-sm border mb-6"/>
            <div className="w-[800px] h-48 bg-white rounded-3xl animate-pulse shadow-sm border"/>
        </div>
    );

    if (!hotel) return (
        <div className="min-h-screen flex items-center justify-center font-sans">
             Property not found.
        </div>
    );

    return (
        <div className="min-h-screen bg-[#e7ebee] pb-24 pt-16 font-sans antialiased text-slate-900">
            
            {/* SUB-HEADER BREADCRUMBS */}
            <div className="bg-white border-b sticky top-16 z-40 h-10 flex items-center">
                <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
                    <div className="flex items-center text-[11px] text-[#008cff] font-bold">
                        <span className="hover:underline cursor-pointer">Home</span>
                        <ChevronRight size={10} className="mx-1 text-slate-300" />
                        <span className="hover:underline cursor-pointer">Hotels in {hotel.city}</span>
                        <ChevronRight size={10} className="mx-1 text-slate-300" />
                        <span className="text-slate-400">{hotel.name}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-4">
                
                {/* HERO AREA: Identity + Images + Sticky Price Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-4">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
                                {hotel.name}
                                <div className="flex gap-0.5">
                                    {[...Array(Math.floor(hotel.rating))].map((_, i) => <Star key={i} size={14} fill="#ffb400" stroke="#ffb400" />)}
                                </div>
                            </h1>
                            <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-2">
                                <MapPin size={16} className="text-[#008cff]" />
                                {hotel.address}
                                <span className="text-[#008cff] font-bold hover:underline cursor-pointer">View on Map</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-3 text-slate-400">
                            <button className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider hover:text-[#008cff]"><Share2 size={16}/> Share</button>
                            <div className="w-[1px] h-4 bg-slate-200"/>
                            <button className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider hover:text-pink-500"><Heart size={16}/> Save</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-3 h-[450px]">
                        {/* Main Image */}
                        <div className="col-span-5 rounded-xl overflow-hidden relative group cursor-pointer" onClick={() => setShowAllPhotos(true)}>
                            <img src={hotel.images[0]} alt="Hero" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        
                        {/* Small Images */}
                        <div className="col-span-3 grid grid-rows-2 gap-3">
                            <div className="rounded-xl overflow-hidden cursor-pointer group" onClick={() => setShowAllPhotos(true)}>
                                <img src={hotel.images[1] || hotel.images[0]} alt="Side 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="rounded-xl overflow-hidden cursor-pointer group relative" onClick={() => setShowAllPhotos(true)}>
                                <img src={hotel.images[2] || hotel.images[0]} alt="Side 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-xs font-black uppercase tracking-widest">+ 15 Photos</div>
                            </div>
                        </div>

                        {/* Sticky Booking Card (Desktop Style) */}
                        <div className="col-span-4 bg-[#f2f8ff] rounded-xl border border-[#c3d8f1] p-6 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-black tracking-tight mb-4">Select Room Type</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600"><Check size={14}/></div>
                                        <p className="text-[11px] font-bold uppercase tracking-tight text-slate-600">Free Cancellation till check-in</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Coffee size={14}/></div>
                                        <p className="text-[11px] font-bold uppercase tracking-tight text-slate-600">Breakfast Included</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600"><ShieldCheck size={14}/></div>
                                        <p className="text-[11px] font-bold uppercase tracking-tight text-slate-600">Property Confirmed</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-[#c3d8f1] mt-6">
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Starting at</span>
                                    <span className="text-5xl font-black tracking-tighter">₹ {hotel.price.toLocaleString()}</span>
                                </div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">+ ₹ {Math.round(hotel.price * 0.12).toLocaleString()} Taxes & Fees</p>
                                <button className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:scale-[1.02] active:scale-95 transition-all italic">Book This Now</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TAB NAVIGATION (About, Amenities, Rooms, Location) */}
                <div className="flex items-center gap-8 bg-white px-8 py-4 rounded-xl shadow-sm border border-slate-200 mb-6">
                    {["overview", "amenities", "rooms", "location"].map(t => (
                        <button 
                            key={t}
                            onClick={() => document.getElementById(t)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                            className="text-[11px] font-black uppercase tracking-[0.2em] text-[#008cff] hover:text-[#005bb7] transition-all"
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {/* ABOUT SECTION */}
                <div id="overview" className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-6">
                    <h2 className="text-xl font-black uppercase tracking-widest mb-6">About Property</h2>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6 italic">
                        "{hotel.description}"
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="bg-blue-50 border border-blue-100 px-4 py-2 rounded-lg text-xs font-black text-blue-600 uppercase tracking-widest">Verified by YatraLo</div>
                        <div className="bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-lg text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2"><Smartphone size={14}/> Contactless Check-in</div>
                    </div>
                </div>

                {/* AMENITIES SECTION */}
                <div id="amenities" className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-6">
                    <h2 className="text-xl font-black uppercase tracking-widest mb-8">Amenities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
                        {[
                            { icon: Wifi, label: "Wifi" },
                            { icon: Coffee, label: "Breakfast" },
                            { icon: Wind, label: "AirCon" },
                            { icon: Tv, label: "TV" },
                            { icon: Car, label: "Parking" },
                            { icon: SplashScreen, label: "Pool" },
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-3">
                                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-blue-600 transition-colors hover:bg-blue-600 hover:text-white">
                                    <item.icon size={18} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ROOMS MATRIX (HIGH FIDELITY MMT STYLE) */}
                <div id="rooms" className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-6">
                    <h2 className="text-xl font-black uppercase tracking-widest mb-8 italic">Choose Your Stay Point</h2>
                    
                    <div className="space-y-12">
                        {hotel.allOffers?.map((room, idx) => (
                            <div key={idx} className="border rounded-2xl overflow-hidden hover:border-blue-400 transition-all group">
                                <div className="bg-slate-50 px-6 py-4 border-b flex items-center justify-between">
                                    <h3 className="text-lg font-black tracking-tighter uppercase italic">{room.roomType}</h3>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">Matrix Index #{idx + 1}</span>
                                </div>
                                
                                <div className="grid grid-cols-12 gap-0">
                                    {/* Room Image Carousel Placeholder */}
                                    <div className="col-span-12 md:col-span-4 p-6 relative">
                                        <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                                            <img src={hotel.images[idx % hotel.images.length]} className="w-full h-full object-cover" />
                                            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-white"/>
                                                <div className="w-2 h-2 rounded-full bg-white/40"/>
                                                <div className="w-2 h-2 rounded-full bg-white/40"/>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Options Table */}
                                    <div className="col-span-12 md:col-span-8">
                                        <div className="h-full divide-y md:divide-y-0 md:divide-x flex flex-col md:flex-row">
                                            
                                            {/* Option 1: Breakfast */}
                                            <div className="flex-1 p-6 flex flex-col justify-between hover:bg-blue-50/30 transition-colors">
                                                <div>
                                                    <div className="bg-[#ffedd5] text-[#9a3412] px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest inline-block mb-4">Super Package</div>
                                                    <h4 className="text-sm font-black mb-4 uppercase tracking-tight">Room with Breakfast</h4>
                                                    <ul className="space-y-2 mb-8">
                                                        <li className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-tight"><Check size={12} className="text-green-500"/> Breakfast Included</li>
                                                        <li className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-tight"><Check size={12} className="text-green-500"/> Free Cancellation</li>
                                                        <li className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-tight"><Check size={12} className="text-green-500"/> High Floor Matrix</li>
                                                    </ul>
                                                </div>
                                                <div className="pt-6 border-t">
                                                    <div className="flex items-baseline gap-2 mb-4">
                                                        <span className="text-2xl font-black">₹ {room.price.toLocaleString()}</span>
                                                        <span className="text-[10px] font-bold text-slate-400">/ night</span>
                                                    </div>
                                                    <button onClick={() => handleSelectRoom(room, "Breakfast")} className="w-full h-10 bg-[#008cff] text-white rounded-lg font-black uppercase text-[10px] tracking-widest shadow-lg shadow-blue-100">Select Package</button>
                                                </div>
                                            </div>

                                            {/* Option 2: Meal Plan */}
                                            <div className="flex-1 p-6 flex flex-col justify-between hover:bg-blue-50/30 transition-colors">
                                                <div>
                                                    <div className="bg-[#dcfce7] text-[#166534] px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest inline-block mb-4">Value Offer</div>
                                                    <h4 className="text-sm font-black mb-4 uppercase tracking-tight">Room + Lunch/Dinner</h4>
                                                    <ul className="space-y-2 mb-8">
                                                        <li className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-tight"><Check size={12} className="text-green-500"/> Any 2 Meals Included</li>
                                                        <li className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-tight"><Check size={12} className="text-green-500"/> Free Cancellation</li>
                                                        <li className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-tight"><Check size={12} className="text-green-500"/> Premium Amenities</li>
                                                    </ul>
                                                </div>
                                                <div className="pt-6 border-t">
                                                    <div className="flex items-baseline gap-2 mb-4">
                                                        <span className="text-2xl font-black">₹ {Math.round(room.price * 1.5).toLocaleString()}</span>
                                                        <span className="text-[10px] font-bold text-slate-400">/ night</span>
                                                    </div>
                                                    <button onClick={() => handleSelectRoom(room, "Meal Plan")} className="w-full h-10 bg-indigo-600 text-white rounded-lg font-black uppercase text-[10px] tracking-widest shadow-lg shadow-indigo-100">Book Meal Matrix</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* LOCATION AREA */}
                <div id="location" className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6 flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3 p-8 border-r">
                        <h2 className="text-xl font-black uppercase tracking-widest mb-6">Location</h2>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight mb-8">{hotel.address}</p>
                        
                        <div className="space-y-6">
                            {[
                                { l: "Panjim Market", d: "0.5 KM" },
                                { l: "Miramar Beach", d: "2.5 KM" },
                                { l: "Goa Airport", d: "28 KM" },
                                { l: "Casino Point", d: "1.2 KM" },
                            ].map((loc, i) => (
                                <div key={i} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <span className="text-[10px] font-black uppercase tracking-widest">{loc.l}</span>
                                    <span className="text-[10px] font-bold text-blue-600">{loc.d}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 min-h-[400px] bg-slate-100 relative grayscale">
                        <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover opacity-50" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/80 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/50 flex items-center gap-3 shadow-xl">
                                <MapPin className="text-red-500" fill="currentColor" />
                                <span className="text-xs font-black uppercase tracking-widest text-slate-800 italic">Static Map Vector active</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* POLICIES AREA */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-6">
                    <h2 className="text-xl font-black uppercase tracking-widest mb-8">Property Policies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <Clock size={24} className="text-slate-400" />
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Check-in Sequence</p>
                                    <p className="text-lg font-black tracking-tight italic uppercase">12:00 PM</p>
                                </div>
                                <div className="w-[1px] h-10 bg-slate-200 mx-4"/>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Check-out Sequence</p>
                                    <p className="text-lg font-black tracking-tight italic uppercase">11:00 AM</p>
                                </div>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0"><X size={12}/></div>
                                    <p className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">Passport, Voter ID and Driving License are not accepted as ID proof.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0"><X size={12}/></div>
                                    <p className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">Pets are not allowed.</p>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight italic leading-relaxed">
                                "Guest safety and absolute comfort are our primary operational metrics. Please ensure all ID certifications are finalized before check-in initialization."
                            </p>
                            <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
                                <p className="text-[10px] font-black text-yellow-800 uppercase tracking-widest mb-2 flex items-center gap-2"> <Info size={14}/> Important Notice</p>
                                <p className="text-[10px] font-bold text-yellow-700/80 uppercase tracking-tight italic">Swimming pool is currently closed for maintenance sequence optimization.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* FULL PHOTO GALLERY OVERLAY */}
            <AnimatePresence>
                {showAllPhotos && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col p-6"
                    >
                        <div className="flex items-center justify-between text-white mb-8 max-w-7xl mx-auto w-full">
                            <h2 className="text-2xl font-black uppercase tracking-tighter italic">{hotel.name} Photo Index</h2>
                            <button onClick={() => setShowAllPhotos(false)} className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex-1 max-w-7xl mx-auto w-full overflow-y-auto no-scrollbar scroll-smooth">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                                {hotel.images.concat(hotel.images).map((img, i) => (
                                    <div key={i} className="aspect-video bg-slate-800 rounded-3xl overflow-hidden hover:scale-[1.02] transition-all cursor-pointer shadow-2xl">
                                        <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const SplashScreen = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h20"></path>
        <path d="M12 2v20"></path>
        <path d="M4.93 4.93l14.14 14.14"></path>
        <path d="M19.07 4.93L4.93 19.07"></path>
    </svg>
);

export default HotelDetailsPage;
