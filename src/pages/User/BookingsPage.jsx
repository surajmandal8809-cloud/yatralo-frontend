import React, { useState, useMemo } from "react";
import UserLayout from "./UserLayout";
import { Plane, Hotel, Train, Ticket, ShoppingBag, Calendar, MapPin, ChevronRight, Download, MoreVertical, XCircle, Search } from "lucide-react";
import { getBookings, cancelBooking as localCancelBooking, formatInr, clearAllBookings } from "../../utils/bookingUtils";
import { useCancelBookingMutation, useGetMyBookingsQuery } from "../../services/bookingService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const BookingsPage = () => {
  const [filterType, setFilterType] = useState("all");
  const [localBookings, setLocalBookings] = useState(() => getBookings());
  const { data: apiData, isLoading, refetch: refetchBookings } = useGetMyBookingsQuery();
  const [cancelApiBooking] = useCancelBookingMutation();

  const bookings = useMemo(() => {
     const apiList = apiData?.bookings || [];
     const localList = localBookings || [];
     const map = new Map();
     [...localList, ...apiList].forEach(b => {
        const id = b._id || b.id;
        if (id) map.set(id, { ...b, id });
     });
     
     let list = Array.from(map.values()).sort((a, b) => new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now()));
     if (filterType !== "all") list = list.filter(b => b.type === filterType);
     return list;
  }, [apiData, localBookings, filterType]);

  const handleCancelBooking = async (id, status) => {
    if (status === "cancelled") return;
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await cancelApiBooking(id).unwrap();
      localCancelBooking(id);
      setLocalBookings(getBookings());
      refetchBookings();
      toast.success("Booking cancelled successfully");
    } catch (err) {
      toast.error("Failed to cancel booking. Please contact support.");
    }
  };

  const categories = [
    { id: 'all', icon: ShoppingBag, color: 'text-slate-400', bg: 'bg-slate-50' },
    { id: 'flight', icon: Plane, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'hotel', icon: Hotel, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'train', icon: Train, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { id: 'bus', icon: Ticket, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  return (
    <UserLayout activeTab="bookings">
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
        
        {/* Booking Summary Stats */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden group">
           <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-900 text-white relative overflow-hidden">
              <div className="relative z-10">
                 <h3 className="text-xl font-black italic uppercase tracking-tight">Booking History</h3>
                 <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-1">Manage all your travel itineraries in one place</p>
              </div>
              <div className="flex gap-2 relative z-10">
                {categories.map(cat => (
                  <button 
                    key={cat.id} 
                    onClick={() => setFilterType(cat.id)}
                    className={`p-3 rounded-2xl transition-all border ${filterType === cat.id ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-white/10 border-white/10 text-white/60 hover:bg-white/20'}`}
                  >
                    <cat.icon size={18} />
                  </button>
                ))}
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-50">
             {categories.slice(1).map(cat => {
               const count = (localBookings || []).concat(apiData?.bookings || []).filter(b => b.type === cat.id).length;
               return (
                 <div key={cat.id} className="p-10 text-center hover:bg-slate-50 transition-all group/stat">
                   <div className={`w-12 h-12 ${cat.bg} ${cat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover/stat:scale-110 group-hover/stat:rotate-6 transition-all shadow-sm`}><cat.icon size={24} /></div>
                   <p className="text-3xl font-black text-slate-950 italic mb-1 tracking-tighter">{count}</p>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{cat.id}s booked</p>
                 </div>
               );
             })}
           </div>
        </div>

        {/* Main List */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm relative group overflow-hidden hover:shadow-2xl transition-all duration-700">
           <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600" />
           <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-slate-400 focus-within:border-blue-500 focus-within:bg-white transition-all">
                 <Search size={14} />
                 <input type="text" placeholder="Search by ID or destination..." className="bg-transparent text-[11px] font-bold outline-none uppercase w-48 text-slate-800" />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{bookings.length} Results Found</p>
           </div>

           <div className="divide-y divide-slate-100">
             {bookings.length === 0 ? (
               <div className="py-24 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200"><Search size={32} /></div>
                  <h4 className="text-lg font-black text-slate-400 uppercase italic tracking-tight">No Bookings Found</h4>
                  <Link to="/" className="text-blue-600 text-[10px] font-black uppercase tracking-widest mt-4 inline-block hover:underline">Start Exploring</Link>
               </div>
             ) : (
               bookings.map((b, i) => {
                 const isCancelled = b.status === "cancelled";
                 const cat = categories.find(c => c.id === (b.type || 'flight')) || categories[1];
                 const Icon = cat.icon;
                 
                 return (
                   <div key={b.id} className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 group hover:bg-slate-50/50 transition-all relative overflow-hidden">
                      <div className="flex items-center gap-6 flex-1">
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isCancelled ? 'bg-slate-100 text-slate-300' : `${cat.bg} ${cat.color}`} shadow-sm group-hover:scale-110 transition-transform`}><Icon size={28} /></div>
                         <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">ID: {b.id ? b.id.substring(0,10) : 'MMT-' + i}</p>
                               <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${isCancelled ? 'bg-slate-100 text-slate-400' : 'bg-emerald-50 text-emerald-600'}`}>{b.status || 'Confirmed'}</span>
                            </div>
                            <h4 className="text-xl font-black text-slate-900 uppercase italic tracking-tight mb-2">{b.fromCode || 'Search'} <span className="text-slate-300 mx-1 not-italic">→</span> {b.toCode || b.hotelDetails?.name || 'Varanasi'}</h4>
                            <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                               <span className="flex items-center gap-1"><Calendar size={12} className="text-blue-500" /> {b.travelDate}</span>
                               <span className="text-slate-200">|</span>
                               <span className="flex items-center gap-1 uppercase italic">{b.providerName || (b.type === 'hotel' ? 'Luxury Stay' : 'Express')}</span>
                            </div>
                         </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-10">
                         <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Fare Total</p>
                            <p className={`text-2xl font-black tracking-tighter ${isCancelled ? 'text-slate-300 line-through' : 'text-slate-900'}`}>{formatInr(b.totalPrice || b.amount)}</p>
                         </div>
                         <div className="flex items-center gap-3">
                            <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"><Download size={18} /></button>
                            <button 
                              onClick={() => handleCancelBooking(b.id, b.status)}
                              disabled={isCancelled}
                              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isCancelled ? 'bg-slate-50 text-slate-200 cursor-not-allowed border border-slate-100' : 'border border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 active:scale-95'}`}
                            >
                              {isCancelled ? 'Cancelled' : 'Cancel'}
                            </button>
                         </div>
                      </div>
                   </div>
                 );
               })
             )}
           </div>
           
           {bookings.length > 0 && (
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center">
                 <button onClick={() => { if(window.confirm("Purge all booking history?")) clearAllBookings(); }} className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors flex items-center gap-2"><XCircle size={12} /> Clear Entire Travel History</button>
              </div>
           )}
        </div>
      </div>
    </UserLayout>
  );
};

export default BookingsPage;
