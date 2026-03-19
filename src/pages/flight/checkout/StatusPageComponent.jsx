import React from "react";
import { 
  CheckCircle2, 
  Plane, 
  Download, 
  Printer, 
  Mail, 
  Smartphone, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Briefcase, 
  ChevronRight,
  ChevronLeft,
  X
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function StatusPageComponent({ bookingResult, passengers, fromName, toName }) {
    if (!bookingResult) return null;

    const handleDownload = () => {
       toast.success("Downloading E-Ticket PDF...");
    };

    const handleEmail = () => {
       toast.success("Electronic Ticket sent to your email!");
    };

    const handlePrint = () => {
       window.print();
    };

    const getAirlineLogo = (code) => {
       return `https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/${code}.png`;
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-32 animate-in fade-in zoom-in duration-700 pt-10 px-4">
            
            {/* Header / Success Message (MMT Style) */}
            <div className="bg-white rounded-lg shadow-sm border border-[#e7e7e7] p-8 text-center bg-gradient-to-r from-blue-50 to-white relative overflow-hidden">
               <div className="relative z-10 space-y-4">
                  <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                     <CheckCircle2 size={40} strokeWidth={3} />
                  </div>
                  <div className="space-y-1">
                     <h1 className="text-[28px] font-black text-[#222]">Booking Confirmed!</h1>
                     <p className="text-[#4a4a4a] text-[14px]">Thank you for booking with Yatralo. Your E-Ticket has been sent.</p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-4 pt-4">
                     <div className="px-6 py-2 bg-white border border-[#e7e7e7] rounded shadow-sm text-[12px] font-bold text-[#222]">
                        Booking ID: <span className="text-[#008cff] uppercase">{bookingResult.bookingId || "MMT12345678"}</span>
                     </div>
                     <div className="px-6 py-2 bg-white border border-[#e7e7e7] rounded shadow-sm text-[12px] font-bold text-[#222]">
                        Status: <span className="text-green-600 uppercase">Confirmed</span>
                     </div>
                  </div>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/30 rounded-full blur-[40px] -mr-16 -mt-16" />
            </div>

            {/* Itinerary Summary (MMT Style Ticket) */}
            <div className="bg-white rounded shadow-sm border border-[#e7e7e7] overflow-hidden printable-content">
               <div className="p-5 border-b border-[#f2f2f2] flex items-center justify-between bg-[#f9f9f9]">
                  <h3 className="text-[16px] font-bold text-[#222]">E-Ticket Itinerary</h3>
                  <div className="flex gap-4">
                     <button onClick={handlePrint} className="text-[#008cff] hover:text-[#007ad9] transition-colors"><Printer size={18} /></button>
                     <button onClick={handleDownload} className="text-[#008cff] hover:text-[#007ad9] transition-colors"><Download size={18} /></button>
                  </div>
               </div>

               <div className="p-8">
                  {/* Flight Route Header */}
                  <div className="flex items-center gap-4 mb-10 pb-6 border-b border-[#f2f2f2]">
                     <img src={getAirlineLogo(bookingResult?.flightDetails?.airlineCode || 'AI')} className="w-10 h-10 object-contain" alt="" />
                     <div>
                        <p className="text-[16px] font-bold text-[#222]">{bookingResult?.flightDetails?.airline || "Air India"} • {bookingResult?.flightDetails?.flightNo || "AI-802"}</p>
                        <p className="text-[12px] text-[#4a4a4a] uppercase">ECONOMY • NON-STOP</p>
                     </div>
                  </div>

                  {/* Route Grid */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                     <div className="text-center md:text-left flex-1">
                        <p className="text-[36px] font-black text-[#222] leading-none mb-2">{bookingResult?.flightDetails?.origin || "DEL"}</p>
                        <p className="text-[14px] font-bold text-[#222] uppercase">{fromName}</p>
                        <p className="text-[12px] text-[#4a4a4a] mt-2 font-bold uppercase tracking-widest">{bookingResult?.flightDetails?.dep || "06:00"}</p>
                     </div>

                     <div className="flex flex-col items-center gap-4">
                        <p className="text-[11px] text-[#4a4a4a] mb-1">02h 45m Journey</p>
                        <div className="w-32 h-[1px] bg-[#e7e7e7] relative">
                           <Plane size={14} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#4a4a4a]" />
                        </div>
                     </div>

                     <div className="text-center md:text-right flex-1">
                        <p className="text-[36px] font-black text-[#222] leading-none mb-2">{bookingResult?.flightDetails?.destination || "BOM"}</p>
                        <p className="text-[14px] font-bold text-[#222] uppercase">{toName}</p>
                        <p className="text-[12px] text-[#4a4a4a] mt-2 font-bold uppercase tracking-widest">{bookingResult?.flightDetails?.arr || "08:45"}</p>
                     </div>
                  </div>

                  {/* Passenger Manifest */}
                  <div className="mt-12 pt-8 border-t border-[#f2f2f2]">
                     <h4 className="text-[14px] font-bold text-[#222] uppercase mb-4 tracking-widest">Passenger Manifest</h4>
                     <div className="space-y-4">
                        {passengers.map((p, i) => (
                           <div key={i} className="flex flex-wrap items-center justify-between p-4 bg-[#f9f9f9] rounded border border-[#f2f2f2]">
                              <div className="flex items-center gap-4">
                                 <div className="w-8 h-8 rounded-full bg-blue-50 text-[#008cff] flex items-center justify-center font-bold text-[12px]">
                                    {i + 1}
                                 </div>
                                 <div>
                                    <p className="text-[14px] font-bold text-[#222]">{p.title}. {p.firstName} {p.lastName}</p>
                                    <p className="text-[11px] text-[#4a4a4a] uppercase">Adult • {p.gender}</p>
                                 </div>
                              </div>
                              <div className="flex gap-4">
                                 <div className="px-4 py-1.5 bg-white rounded border border-[#e7e7e7] text-center min-w-[80px]">
                                    <p className="text-[8px] font-bold uppercase text-[#4a4a4a]">Seat</p>
                                    <p className="text-[12px] font-bold text-[#222]">{String.fromCharCode(65 + i)}12</p>
                                 </div>
                                 <div className="px-4 py-1.5 bg-white rounded border border-[#e7e7e7] text-center min-w-[80px]">
                                    <p className="text-[8px] font-bold uppercase text-[#4a4a4a]">Class</p>
                                    <p className="text-[12px] font-bold text-[#222]">ECONOMY</p>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* QR / Barcode Section */}
                  <div className="mt-12 pt-8 border-t border-[#f2f2f2] flex flex-col md:flex-row items-center gap-8">
                     <div className="w-32 h-32 bg-white border border-[#e7e7e7] p-2 rounded shadow-sm">
                        {/* Mock QR */}
                        <div className="w-full h-full bg-[#f2f2f2] flex flex-wrap gap-0.5 p-1">
                            {Array.from({ length: 400 }).map((_, i) => (
                                <div key={i} className={`w-[4.5%] h-[4.5%] ${Math.random() > 0.5 ? 'bg-[#222]' : 'bg-transparent'}`} />
                            ))}
                        </div>
                     </div>
                     <div className="text-center md:text-left">
                        <p className="text-[10px] font-bold text-[#008cff] uppercase tracking-widest mb-1">Boarding Matrix</p>
                        <p className="text-[12px] text-[#4a4a4a]">Please present this QR code at the check-in counter and boarding gate for a seamless experience.</p>
                     </div>
                  </div>
               </div>
               
               {/* Paper Cut-out Effect */}
               <div className="relative h-4 bg-[#f2f2f2] overflow-hidden flex justify-center gap-1">
                  {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-white rounded-full -mt-2" />
                  ))}
               </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-center gap-6">
               <button onClick={handleEmail} className="px-10 py-3 bg-white border border-[#008cff] text-[#008cff] rounded font-bold text-[14px] uppercase flex items-center gap-3 hover:bg-blue-50 transition-all">
                  <Mail size={18} /> Send to Email
               </button>
               <button onClick={() => window.location.href = '/'} className="px-10 py-3 bg-[#008cff] hover:bg-[#007ad9] text-white rounded font-bold text-[14px] uppercase shadow-lg transition-all flex items-center gap-3">
                  BOOK ANOTHER FLIGHT <ChevronRight size={18} />
               </button>
            </div>
        </div>
    );
}
