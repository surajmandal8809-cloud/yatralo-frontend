import React from "react";
import { 
  CheckCircle2, 
  Hotel, 
  Download, 
  Printer, 
  Mail, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Users,
  ChevronRight,
  Info
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function HotelStatusSection({ bookingResult, guests, fromName, toName }) {
    if (!bookingResult) return null;

    const handleDownload = () => {
       toast.success("Downloading E-Ticket PDF...");
    };

    const handleEmail = () => {
       toast.success("Hotel Voucher sent to your email!");
    };

    const handlePrint = () => {
       window.print();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-32 animate-in fade-in zoom-in duration-700 pt-10 px-4">
            
            {/* Header / Success Message */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-[#e7e7e7] p-10 text-center bg-gradient-to-r from-orange-50 to-white relative overflow-hidden">
               <div className="relative z-10 space-y-6">
                  <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl">
                     <CheckCircle2 size={48} strokeWidth={3} />
                  </div>
                  <div className="space-y-2">
                     <h1 className="text-3xl font-black text-slate-900 italic uppercase tracking-tight">Booking Confirmed!</h1>
                     <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Your premium stay at {toName} is locked in.</p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-6 pt-4">
                     <div className="px-8 py-3 bg-white border border-[#e7e7e7] rounded-2xl shadow-sm text-xs font-black text-slate-900 uppercase tracking-widest">
                        Booking ID: <span className="text-[#f97316] ml-1">{bookingResult.bookingId || "YTR-12345678"}</span>
                     </div>
                     <div className="px-8 py-3 bg-white border border-[#e7e7e7] rounded-2xl shadow-sm text-xs font-black text-green-600 uppercase tracking-widest">
                        Status: <span className="ml-1">Confirmed</span>
                     </div>
                  </div>
               </div>
               <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/30 rounded-full blur-[80px] -mr-32 -mt-32" />
            </div>

            {/* Hotel Voucher (MMT Style) */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-[#e7e7e7] overflow-hidden printable-content group">
               <div className="p-6 border-b border-[#f2f2f2] flex items-center justify-between bg-[#f9f9f9]">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Electronic Hotel Voucher</h3>
                  <div className="flex gap-4">
                     <button onClick={handlePrint} className="text-[#f97316] hover:text-blue-700 transition-colors"><Printer size={18} /></button>
                     <button onClick={handleDownload} className="text-[#f97316] hover:text-blue-700 transition-colors"><Download size={18} /></button>
                  </div>
               </div>

               <div className="p-10">
                  {/* Property Header */}
                  <div className="flex flex-col md:flex-row items-center gap-8 mb-12 pb-8 border-b border-[#f2f2f2]">
                     <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-lg border border-slate-100">
                        <img src={bookingResult.hotelDetails?.image || bookingResult.hotelDetails?.images?.[0] || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                     </div>
                     <div className="text-center md:text-left flex-1">
                        <h4 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight mb-2">{toName}</h4>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                           <p className="flex items-center gap-1.5 text-xs font-black text-slate-400 uppercase tracking-widest"><MapPin size={14} className="text-[#f97316]" /> {fromName} | View on Map</p>
                           <div className="h-1 w-1 rounded-full bg-slate-300"></div>
                           <p className="flex items-center gap-1.5 text-xs font-black text-slate-400 uppercase tracking-widest"><ShieldCheck size={14} className="text-emerald-500" /> Sanitized Stay</p>
                        </div>
                     </div>
                  </div>

                  {/* Summary Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-6">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#f97316]"><Calendar size={18} /></div>
                            <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</p><p className="text-sm font-black text-slate-800 italic uppercase">{bookingResult.checkIn} - {bookingResult.checkOut} <span className="text-[#f97316] ml-1">({bookingResult.nights} {bookingResult.nights > 1 ? 'Nights' : 'Night'})</span></p></div>
                         </div>
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#f97316]"><Users size={18} /></div>
                           <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Occupancy</p><p className="text-sm font-black text-slate-800 italic uppercase">{guests.length} Adults | 1 Room</p></div>
                        </div>
                     </div>

                     <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Registered Guests</p>
                        <div className="space-y-4">
                           {guests.map((p, i) => (
                              <div key={i} className="flex items-center gap-4 group">
                                 <div className="w-8 h-8 rounded-full bg-white text-[#f97316] flex items-center justify-center font-black text-xs shadow-sm group-hover:bg-[#f97316] group-hover:text-white transition-all">{i + 1}</div>
                                 <p className="text-sm font-black text-slate-800 uppercase italic tracking-tight">{p.title}. {p.firstName} {p.lastName}</p>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Policy Summary */}
                  <div className="mt-12 p-8 bg-orange-50/50 rounded-[2rem] border border-[#f97316]/50 flex items-start gap-4">
                     <Info size={20} className="text-[#f97316] shrink-0 mt-0.5" />
                     <div>
                        <p className="text-xs font-black text-slate-900 uppercase tracking-tight mb-1">Important Information</p>
                        <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest italic">Check-in at 14:00 • Check-out at 11:00 • Standard photo ID required for all guests during check-in. Cancellation policies apply as per booking type.</p>
                     </div>
                  </div>
               </div>
               
               {/* Paper Cut-out Effect */}
               <div className="relative h-4 bg-slate-50 overflow-hidden flex justify-center gap-1">
                  {Array.from({ length: 40 }).map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-white rounded-full -mt-2 shadow-inner" />
                  ))}
               </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-center gap-6">
               <button onClick={handleEmail} className="px-12 py-4 bg-white border-2 border-[#f97316] text-[#f97316] rounded-[2rem] font-black text-[12px] uppercase tracking-widest flex items-center gap-3 hover:bg-blue-50 transition-all shadow-xl shadow-orange-50">
                  <Mail size={18} /> Send to Email
               </button>
               <button onClick={() => navigate("/")} className="px-12 py-4 bg-gradient-to-r from-[#7c3aed] to-[#f97316] hover:saturate-150 text-white rounded-[2rem] font-black text-[12px] uppercase tracking-widest shadow-2xl shadow-orange-200 transition-all flex items-center gap-3">
                  STAY SOMEWHERE ELSE <ChevronRight size={18} />
               </button>
            </div>
        </div>
    );
}
