import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  ChevronRight, 
  Calendar, 
  Users, 
  Star, 
  MapPin, 
  Wifi, 
  Coffee, 
  Waves, 
  Wind, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ChevronLeft,
  Share2,
  Heart,
  Droplets,
  Tv,
  AirVent,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";

const HotelBookingSelectionPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        window.scrollTo(0, 0);
        // Fallback if location state is missing
        const savedHotel = localStorage.getItem("yatralo-selected-hotel");
        if (location.state?.hotel) {
            setSelectedHotel(location.state.hotel);
        } else if (savedHotel) {
            setSelectedHotel(JSON.parse(savedHotel));
        } else {
            navigate("/hotels");
        }
    }, [location.state, navigate]);

    const rooms = useMemo(() => [
      { id: 'standard', name: 'Standard Deluxe Room', price: 0, perks: ["Free WiFi", "Garden View", "Breakfast Included"], img: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
      { id: 'premium', name: 'Premium King Room', price: 2500, perks: ["Mountain View", "Private Balcony", "Mini Bar"], img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
      { id: 'suite', name: 'Executive Ocean Suite', price: 5500, perks: ["Sea View", "Butler Service", "Living Area"], img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    ], []);

    if (!selectedHotel) return <div className="h-screen bg-slate-50 flex items-center justify-center animate-pulse"><div className="w-20 h-20 bg-blue-100 rounded-full"></div></div>;

    const nights = 1; 
    const guestsCount = location.state?.pax || 2;
    const baseFare = selectedHotel.price;
    const taxesAndFees = Math.round(baseFare * 0.18);
    const totalPayable = baseFare + taxesAndFees;

    const handleContinue = (roomType) => {
        const finalPrice = baseFare + (roomType?.price || 0) + taxesAndFees;
        navigate("/hotels/checkout", {
            state: { 
                hotel: { ...selectedHotel, roomType: roomType?.name || 'Standard' }, 
                pax: guestsCount, 
                totalAmount: finalPrice, 
                nights, 
                checkIn: location.state?.checkIn || "20 Apr 2026", 
                checkOut: location.state?.checkOut || "21 Apr 2026"
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] font-sans pb-20">
            {/* Nav Bar Context */}
            <div className="bg-white border-b border-slate-200 pt-20 px-6 py-4 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-colors"><ChevronLeft size={20} /></button>
                        <div>
                           <h1 className="text-lg font-black text-slate-900 tracking-tight uppercase italic leading-none">{selectedHotel.name}</h1>
                           <div className="flex items-center gap-2 mt-1">
                              <MapPin size={10} className="text-blue-500" />
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{selectedHotel.city || 'India'}</p>
                           </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-blue-600 transition-all border border-slate-200"><Share2 size={18} /></button>
                        <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-rose-500 transition-all border border-slate-200"><Heart size={18} /></button>
                        <div className="h-10 w-[1px] bg-slate-200 mx-2"></div>
                        <div className="text-right">
                           <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">Starting from</p>
                           <p className="text-xl font-black text-slate-900 leading-none">₹ {baseFare.toLocaleString()}</p>
                        </div>
                        <button onClick={() => document.getElementById('rooms')?.scrollIntoView({behavior:'smooth'})} className="px-8 py-3 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-orange-100 hover:saturate-150 transition-all">Select Room</button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-8">
                {/* Visual Showcase */}
                <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[550px] mb-8">
                  <div className="col-span-2 row-span-2 rounded-[2.5rem] overflow-hidden group cursor-pointer">
                     <img src={selectedHotel.image || selectedHotel.images?.[0] || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                  </div>
                  <div className="col-span-2 rounded-[2.5rem] overflow-hidden group cursor-pointer relative">
                     <img src={selectedHotel.images?.[1] || 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                     <div className="absolute inset-0 bg-black/10"></div>
                  </div>
                  <div className="rounded-[2.5rem] overflow-hidden group cursor-pointer">
                     <img src={selectedHotel.images?.[2] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                  </div>
                  <div className="rounded-[2.5rem] overflow-hidden group cursor-pointer relative bg-slate-900">
                     <img src={selectedHotel.images?.[3] || 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'} className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" alt="" />
                     <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                        <p className="text-3xl font-black mb-1">+12</p>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-80">View All Photos</p>
                     </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
                   {/* Main Content */}
                   <div className="space-y-12">
                      {/* Tabs Header */}
                      <div className="flex border-b border-slate-200 sticky top-[152px] bg-[#f8fafc] z-30 pt-4">
                         {['overview', 'rooms', 'amenities', 'reviews'].map(t => (
                           <button key={t} onClick={() => { setActiveTab(t); document.getElementById(t)?.scrollIntoView({behavior:'smooth', block:'center'}) }} className={`px-8 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === t ? 'text-[#f97316] border-b-4 border-b-[#f97316]' : 'text-slate-400 hover:text-slate-600'}`}>{t}</button>
                         ))}
                      </div>

                      <section id="overview" className="space-y-6">
                         <div className="flex items-center gap-4">
                            <div className="flex text-amber-400 bg-white px-3 py-2 rounded-xl shadow-sm border border-slate-100">
                               {[1,2,3,4,5].map(s => <Star key={s} size={14} className={s <= Math.round(selectedHotel.rating) ? 'fill-amber-400' : 'fill-slate-100 text-slate-100'} />)}
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Premium Property Index</span>
                         </div>
                         <h2 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">Property Description</h2>
                         <p className="text-slate-500 font-medium leading-relaxed max-w-3xl">
                            Experience the epitome of luxury at {selectedHotel.name}. Nestled in the heart of {selectedHotel.city}, this property offers breathtaking views and world-class hospitality. Whether you're here for business or pleasure, our dedicated staff ensures a stay you'll never forget. {selectedHotel.description || 'Enjoy modern amenities, signature dining experiences, and pure relaxation in our meticulously designed spaces.'}
                         </p>
                         
                         <div className="grid grid-cols-3 gap-6 pt-6">
                            <div className="bg-white p-6 rounded-3xl border border-slate-200">
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Prime Location</p>
                               <div className="flex items-center gap-3"><MapPin size={24} className="text-blue-600" /><p className="text-sm font-black text-slate-800">Near International Airport & Central Business District</p></div>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-slate-200">
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Stay Clean</p>
                               <div className="flex items-center gap-3"><Droplets size={24} className="text-emerald-600" /><p className="text-sm font-black text-slate-800">100% Sanitized & Hospital Grade Hygiene Protocols</p></div>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-slate-200">
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Guest Safe</p>
                               <div className="flex items-center gap-3"><ShieldCheck size={24} className="text-indigo-600" /><p className="text-sm font-black text-slate-800">24/7 Security & Contactless Check-in Experience</p></div>
                            </div>
                         </div>
                      </section>

                      {/* Rooms Integration */}
                      <section id="rooms" className="space-y-8 scroll-mt-48">
                         <h2 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">Room Availability</h2>
                         <div className="space-y-6">
                            {rooms.map(room => (
                              <div key={room.id} className="bg-white rounded-[2.5rem] border border-slate-200 p-6 flex gap-8 group hover:shadow-xl transition-all">
                                 <div className="w-80 h-56 rounded-[1.8rem] overflow-hidden"><img src={room.img} className="w-full h-full object-cover" alt="" /></div>
                                 <div className="flex-1 flex flex-col justify-between py-2">
                                    <div>
                                       <div className="flex items-center justify-between mb-4">
                                          <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">{room.name}</h3>
                                          <div className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[9px] font-black uppercase tracking-widest">Available Now</div>
                                       </div>
                                       <div className="flex flex-wrap gap-3">
                                          {room.perks.map((p,i) => (
                                            <span key={i} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1.5 rounded-full border border-slate-100"><CheckCircle2 size={12} className="text-blue-500" />{p}</span>
                                          ))}
                                       </div>
                                    </div>
                                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                       <div>
                                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Room Rate</p>
                                          <p className="text-2xl font-black text-slate-900">₹ {(baseFare + room.price).toLocaleString()} <span className="text-[10px] text-slate-400 not-italic uppercase font-bold ml-1">/ Night</span></p>
                                       </div>
                                       <button onClick={() => handleContinue(room)} className="px-10 py-5 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:saturate-150 transition-all shadow-xl shadow-orange-100">Book This Room</button>
                                    </div>
                                 </div>
                              </div>
                            ))}
                         </div>
                      </section>

                      {/* Amenities Section */}
                      <section id="amenities" className="space-y-8 scroll-mt-48">
                         <h2 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">Property Amenities</h2>
                         <div className="grid grid-cols-4 gap-4">
                            {[
                               { label: 'Free High-Speed WiFi', icon: Wifi },
                               { label: 'Signature Breakfast', icon: Coffee },
                               { label: 'Air Conditioning', icon: AirVent },
                               { label: 'Smart Television', icon: Tv },
                               { label: 'Infinity Pool', icon: Waves },
                               { label: 'Climate Control', icon: Wind },
                               { label: 'Pure Beverages', icon: Droplets },
                               { label: 'Fitness Center', icon: Zap },
                            ].map(am => (
                              <div key={am.label} className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col items-center justify-center text-center group hover:bg-blue-50 transition-all cursor-default">
                                 <am.icon size={28} className="text-slate-300 mb-4 group-hover:text-blue-600 group-hover:scale-110 transition-all" />
                                 <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{am.label}</p>
                              </div>
                            ))}
                         </div>
                      </section>
                   </div>

                   {/* Right Sidebar Info */}
                   <aside className="space-y-8 h-fit sticky top-[240px]">
                      {/* Quality Score Card */}
                      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                         <div className="flex items-center gap-6 mb-10">
                            <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-xl shadow-blue-500/20 text-3xl font-black italic">{selectedHotel.rating}</div>
                            <div>
                               <h3 className="text-2xl font-black italic uppercase italic tracking-tight">Exceptional</h3>
                               <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Based on 1,420+ Verified Reviews</p>
                            </div>
                         </div>
                         <div className="space-y-6">
                            {[
                               { label: 'Cleanliness', score: 95 },
                               { label: 'Hospitality', score: 92 },
                               { label: 'Location Accuracy', score: 88 },
                            ].map(s => (
                              <div key={s.label}>
                                 <div className="flex justify-between text-[11px] font-black uppercase tracking-widest mb-2.5"><span>{s.label}</span><span className="text-blue-400">{s.score}%</span></div>
                                 <div className="h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{width: `${s.score}%`}}></div></div>
                              </div>
                            ))}
                         </div>
                         <div className="pt-10 mt-10 border-t border-white/5">
                            <p className="text-xs font-bold text-white/60 leading-relaxed italic">"One of the best stays I've had in the city. The service was impeccable and the room was crystal clean."</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mt-4">- Aman Singhania, Verified Solo Traveler</p>
                         </div>
                      </div>

                      {/* Summary Breakdown Card */}
                      <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
                         <h3 className="text-xl font-black text-slate-900 uppercase italic mb-8">Booking Summary</h3>
                         <div className="space-y-6">
                            <div className="flex items-center gap-4">
                               <Calendar size={18} className="text-blue-600" />
                               <div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</p>
                                  <p className="text-sm font-black text-slate-800 italic uppercase">{location.state?.checkIn || '20 Apr'} - {location.state?.checkOut || '21 Apr'} <span className="text-blue-600">(1 Night)</span></p>
                               </div>
                            </div>
                            <div className="flex items-center gap-4">
                               <Users size={18} className="text-blue-600" />
                               <div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Occupancy</p>
                                  <p className="text-sm font-black text-slate-800 italic uppercase">{guestsCount} Adults | 1 Room</p>
                               </div>
                            </div>
                         </div>
                         
                         <div className="mt-10 pt-10 border-t border-slate-100 space-y-4">
                            <div className="flex justify-between text-sm font-bold text-slate-500"><span>Standard Rate</span><span>₹ {baseFare.toLocaleString()}</span></div>
                            <div className="flex justify-between text-sm font-bold text-slate-500"><span>Taxes & Service Fees</span><span>₹ {taxesAndFees.toLocaleString()}</span></div>
                            <div className="flex justify-between items-center pt-8">
                               <span className="text-sm font-black text-slate-900 uppercase italic">Total Amount</span>
                               <span className="text-3xl font-black text-blue-600 tracking-tighter">₹ {totalPayable.toLocaleString()}</span>
                            </div>
                            <button onClick={() => document.getElementById('rooms')?.scrollIntoView({behavior:'smooth'})} className="w-full mt-6 py-5 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-100">Proceed to Confirmation</button>
                         </div>
                      </div>
                   </aside>
                </div>
            </div>
        </div>
    );
};

export default HotelBookingSelectionPage;
