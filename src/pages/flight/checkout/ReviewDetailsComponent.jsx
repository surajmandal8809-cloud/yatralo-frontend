import React from "react";
import { 
  Check, 
  Plane, 
  User, 
  Phone, 
  ChevronRight, 
  ShieldCheck, 
  Briefcase, 
  Mail,
  Zap,
  MapPin,
  ArrowRight,
  Info
} from "lucide-react";
import { motion } from "framer-motion";

export default function ReviewDetailsComponent({ 
  selectedFlight, 
  passengers, 
  contactInfo, 
  addOns, 
  onNext,
  onBack,
  isLoading 
}) {
  const getAirlineLogo = (code) => {
    return `https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/${code}.png`;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20 max-w-4xl mx-auto">
      
      {/* Flight Summary Card (MMT Style) */}
      <div className="bg-white rounded shadow-sm border border-[#e7e7e7] overflow-hidden">
        <div className="p-4 border-b border-[#f2f2f2] flex items-center justify-between bg-[#f9f9f9]">
           <h3 className="text-[16px] font-bold text-[#222]">Review Flight Details</h3>
           <span className="text-[11px] font-bold text-[#008cff] px-2 py-0.5 bg-blue-50 rounded uppercase">REFUNDABLE</span>
        </div>

        <div className="p-6">
           <div className="flex items-center gap-4 mb-6">
              <img src={getAirlineLogo(selectedFlight.code)} className="w-6" alt="" />
              <span className="text-[14px] font-bold text-[#222]">{selectedFlight.airline}</span>
              <span className="text-[12px] text-[#4a4a4a] px-2 py-0.5 bg-[#f2f2f2] rounded">{selectedFlight.flightNo} • ECONOMY</span>
           </div>

           <div className="flex items-center justify-between bg-[#f4f4f4] p-6 rounded mb-6">
              <div className="text-center md:text-left">
                 <p className="text-[24px] font-black text-[#222]">{selectedFlight.dep}</p>
                 <p className="text-[14px] font-bold text-[#222] mt-1">{selectedFlight.originCity} ({selectedFlight.origin})</p>
                 <p className="text-[11px] text-[#4a4a4a] mt-1">{selectedFlight.depDate}</p>
              </div>

              <div className="flex-1 flex flex-col items-center">
                 <p className="text-[11px] text-[#4a4a4a] mb-1">{Math.floor((selectedFlight?.duration || 0)/60)}h {(selectedFlight?.duration || 0)%60}m</p>
                 <div className="w-1/2 h-[1px] bg-[#e7e7e7] relative">
                    <Plane size={14} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#4a4a4a]" />
                 </div>
                 <p className="text-[11px] text-[#4a4a4a] mt-1">Non-stop</p>
              </div>

              <div className="text-center md:text-right">
                 <p className="text-[24px] font-black text-[#222]">{selectedFlight.arr}</p>
                 <p className="text-[14px] font-bold text-[#222] mt-1">{selectedFlight.destinationCity} ({selectedFlight.destination})</p>
                 <p className="text-[11px] text-[#4a4a4a] mt-1">{selectedFlight.depDate}</p>
              </div>
           </div>

           <div className="flex flex-wrap gap-4 pt-4 border-t border-[#f2f2f2]">
              <div className="flex items-center gap-2">
                 <Briefcase size={14} className="text-[#4a4a4a]" />
                 <span className="text-[12px] text-[#4a4a4a]">Check-in Bag: 15 KG</span>
              </div>
              <div className="flex items-center gap-2">
                 <Zap size={14} className="text-[#4a4a4a]" />
                 <span className="text-[12px] text-[#4a4a4a]">Cabin Bag: 7 KG</span>
              </div>
              {addOns.seats.length > 0 && (
                <div className="flex items-center gap-2 text-[#008cff]">
                   <MapPin size={14} />
                   <span className="text-[12px] font-bold">Seats: {addOns.seats.join(', ')}</span>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* Travellers Details (MMT Style) */}
      <div className="bg-white rounded shadow-sm border border-[#e7e7e7] overflow-hidden">
         <div className="p-4 border-b border-[#f2f2f2] flex items-center justify-between">
            <h4 className="text-[16px] font-bold text-[#222]">Traveller Details</h4>
            <button onClick={onBack} className="text-[12px] font-bold text-[#008cff] uppercase">Edit</button>
         </div>
         <div className="p-6 divide-y divide-[#f2f2f2]">
            {passengers.map((p, i) => (
               <div key={i} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-8 h-8 rounded-full bg-blue-50 text-[#008cff] flex items-center justify-center font-bold text-[12px]">
                        {i + 1}
                     </div>
                     <div>
                        <p className="text-[14px] font-bold text-[#222]">{p.title}. {p.firstName} {p.lastName}</p>
                        <p className="text-[11px] text-[#4a4a4a] uppercase">{p.gender} • ADULT</p>
                     </div>
                  </div>
                  <Check size={18} className="text-green-500" />
               </div>
            ))}
         </div>
      </div>

      {/* Contact Details (MMT Style) */}
      <div className="bg-white rounded shadow-sm border border-[#e7e7e7] overflow-hidden">
         <div className="p-4 border-b border-[#f2f2f2]">
            <h4 className="text-[16px] font-bold text-[#222]">Contact Information</h4>
         </div>
         <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded bg-[#f2f2f2] flex items-center justify-center text-[#4a4a4a]">
                  <Mail size={18} />
               </div>
               <div>
                  <p className="text-[11px] text-[#4a4a4a] uppercase font-bold">Email Address</p>
                  <p className="text-[14px] font-bold text-[#222]">{contactInfo.email}</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded bg-[#f2f2f2] flex items-center justify-center text-[#4a4a4a]">
                  <Phone size={18} />
               </div>
               <div>
                  <p className="text-[11px] text-[#4a4a4a] uppercase font-bold">Mobile Number</p>
                  <p className="text-[14px] font-bold text-[#222]">{contactInfo.countryCode} {contactInfo.phone}</p>
               </div>
            </div>
         </div>
         <div className="px-6 py-3 bg-blue-50/50 flex items-center gap-3">
            <Info size={14} className="text-[#008cff]" />
            <p className="text-[11px] text-[#4a4a4a]">E-ticket will be sent to this email and mobile number.</p>
         </div>
      </div>

      {/* Final Action (MMT Style) */}
      <div className="flex justify-between items-center p-6 bg-white rounded shadow-md border border-[#e7e7e7] sticky bottom-4 z-50">
         <div className="hidden md:block">
            <p className="text-[11px] text-[#4a4a4a]">By clicking Continue, you agree to the <span className="text-[#008cff]">Terms & Conditions</span></p>
         </div>
         <button 
           onClick={onNext}
           disabled={isLoading}
           className={`px-12 py-3 bg-[#008cff] hover:bg-[#007ad9] text-white rounded font-bold text-[16px] uppercase shadow-lg transition-all flex items-center gap-3 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
         >
            {isLoading ? 'Processing...' : 'Proceed to Payment'}
            {!isLoading && <ArrowRight size={18} />}
         </button>
      </div>
    </div>
  );
}
