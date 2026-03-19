import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plane, 
  ChevronLeft, 
  ArrowRight, 
  Check, 
  Wifi, 
  Coffee, 
  Zap, 
  ShieldCheck, 
  Sparkles,
  Armchair,
  Utensils,
  Info,
  X,
  Clock,
  Briefcase,
  Layers,
  ChevronDown,
  Gift,
  Plus,
  Minus,
  ChevronRight
} from "lucide-react";
import toast from "react-hot-toast";

const BookingSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedFlight, setSelectedFlight] = useState(null);
  
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [extraBaggage, setExtraBaggage] = useState(0);
  const [insurance, setInsurance] = useState(true);
  
  const [showSeatModal, setShowSeatModal] = useState(false);
  const [showFareBreakup, setShowFareBreakup] = useState(false);

  useEffect(() => {
    const flight = localStorage.getItem("yatralo-selected-flight");
    const info = localStorage.getItem("yatralo-booking-info");
    if (flight) {
      setSelectedFlight(JSON.parse(flight));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const generateSeats = () => {
    const seats = [];
    const rows = 12;
    const cols = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (let r = 1; r <= rows; r++) {
      cols.forEach(c => {
        const id = `${r}${c}`;
        const isOccupied = Math.random() < 0.3;
        const isPremium = r < 4;
        const price = isPremium ? 800 : (r > 8 ? 150 : 350);
        seats.push({ id, isOccupied, isPremium, price });
      });
    }
    return seats;
  };

  const seatGrid = useMemo(() => generateSeats(), []);

  if (!selectedFlight) return null;

  const pax = Number(selectedFlight.pax) || 1; 
  const baseFare = Number(selectedFlight.price) || 0; 
  const fuelSurcharge = 850 * pax;
  const airportTax = 420 * pax;
  const convenienceFee = 300;
  const seatPrice = selectedSeat.reduce((acc, s) => acc + (Number(s.price) || 0), 0);
  const mealPrice = selectedMeal ? (Number(selectedMeal.price) || 0) * pax : 0;
  const baggagePrice = (Number(extraBaggage) || 0) * 450;
  const insurancePrice = insurance ? 249 * pax : 0;

  const totalPayable = baseFare + fuelSurcharge + airportTax + convenienceFee + seatPrice + mealPrice + baggagePrice + insurancePrice;

  const mealOptions = [
    { id: 'veg-sandwich', name: 'Veg Sandwich', price: 250, icon: '🥪', category: 'Veg' },
    { id: 'chicken-tikka', name: 'Chicken Tikka', price: 450, icon: '🍗', category: 'Non-Veg' },
    { id: 'jain-meal', name: 'Jain Meal', price: 300, icon: '🥗', category: 'Jain' },
  ];

  const handleContinue = () => {
    const addOns = {
      seats: selectedSeat.map(s => s.id),
      meals: selectedMeal ? [selectedMeal.id] : [],
      baggage: extraBaggage,
      insurance: insurance,
      totalPrice: totalPayable
    };
    localStorage.setItem("yatralo-addons", JSON.stringify(addOns));
    navigate("/checkout");
  };

  return (
    <>
      <div className="min-h-screen bg-[#f2f2f2] font-sans pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Progress (MMT Style) */}
          <div className="flex items-center gap-4 mb-8 text-[12px] font-bold">
             <span className="text-[#008cff]">Flight Search</span>
             <ChevronRight size={14} className="text-[#4a4a4a]" />
             <span className="text-[#222]">Review Your Booking</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            
            <main className="space-y-6">
               {/* Itinerary */}
               <section className="bg-white rounded shadow-sm border border-[#e7e7e7] overflow-hidden">
                  <div className="p-4 border-b border-[#f2f2f2] flex items-center justify-between bg-[#f9f9f9]">
                     <h3 className="text-[16px] font-bold text-[#222]">Review Your Itinerary</h3>
                  </div>
                  
                  <div className="p-6">
                     <div className="flex items-center gap-4 mb-6">
                        <img src={`https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/${selectedFlight.code}.png`} className="w-6" alt="" />
                        <span className="text-[14px] font-bold text-[#222]">{selectedFlight.airline}</span>
                        <span className="text-[12px] text-[#4a4a4a] px-2 py-0.5 bg-[#f2f2f2] rounded">{selectedFlight.flightNo} • ECONOMY</span>
                     </div>

                     <div className="flex items-center justify-between bg-[#f4f4f4] p-6 rounded">
                        <div className="text-center md:text-left">
                           <p className="text-[24px] font-black text-[#222]">{selectedFlight.dep}</p>
                           <p className="text-[14px] font-bold text-[#222] mt-1">{selectedFlight.originCity} ({selectedFlight.origin})</p>
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
                        </div>
                     </div>
                  </div>
               </section>

               {/* Add-ons */}
               <div className="space-y-4">
                  <h4 className="text-[16px] font-bold text-[#222]">Add-ons & More</h4>
                  
                  <div className="bg-white rounded shadow-sm border border-[#e7e7e7] p-5 flex items-center justify-between group cursor-pointer" onClick={() => setShowSeatModal(true)}>
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded bg-blue-50 text-[#008cff] flex items-center justify-center">
                           <Armchair size={22} />
                        </div>
                        <div>
                           <p className="text-[14px] font-bold text-[#222]">Select Seats</p>
                           <p className="text-[11px] text-[#4a4a4a]">Choose your preferred seat from the map</p>
                        </div>
                     </div>
                     {selectedSeat.length > 0 ? (
                        <span className="text-[12px] font-bold text-[#008cff]">Seats: {selectedSeat.map(s => s.id).join(", ")} • ₹{seatPrice}</span>
                     ) : (
                        <Plus size={18} className="text-[#008cff]" />
                     )}
                  </div>

                  <div className="bg-white rounded shadow-sm border border-[#e7e7e7] p-5">
                     <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded bg-orange-50 text-[#f26722] flex items-center justify-center">
                           <Utensils size={22} />
                        </div>
                        <div>
                           <p className="text-[14px] font-bold text-[#222]">Gourmet Meals</p>
                           <p className="text-[11px] text-[#4a4a4a]">Pre-book meals and save on airport prices</p>
                        </div>
                     </div>
                     <div className="flex gap-2">
                        {mealOptions.map(meal => (
                          <button 
                            key={meal.id}
                            onClick={() => setSelectedMeal(meal)}
                            className={`flex-1 flex items-center gap-2 p-3 rounded border transition-all ${selectedMeal?.id === meal.id ? 'bg-orange-50 border-[#f26722]' : 'bg-white border-[#e7e7e7] hover:border-[#f26722]'}`}
                          >
                             <span className="text-xl">{meal.icon}</span>
                             <div className="text-left">
                                <p className="text-[11px] font-bold text-[#222] truncate">{meal.name}</p>
                                <p className="text-[10px] text-[#f26722]">₹{meal.price}</p>
                             </div>
                          </button>
                        ))}
                     </div>
                  </div>

                  <div className="bg-white rounded shadow-sm border border-[#e7e7e7] p-5 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded bg-indigo-50 text-[#4f46e5] flex items-center justify-center">
                           <Briefcase size={22} />
                        </div>
                        <div>
                           <p className="text-[14px] font-bold text-[#222]">Extra Baggage</p>
                           <p className="text-[11px] text-[#4a4a4a]">Need more space? Add extra kilos.</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <button onClick={() => setExtraBaggage(Math.max(0, extraBaggage - 5))} className="w-8 h-8 rounded border border-[#e7e7e7] text-[#4a4a4a] font-bold">-</button>
                        <span className="text-[14px] font-bold text-[#222] min-w-[50px] text-center">{extraBaggage} KG</span>
                        <button onClick={() => setExtraBaggage(Math.min(30, extraBaggage + 5))} className="w-8 h-8 rounded bg-[#008cff] text-white font-bold">+</button>
                     </div>
                  </div>

                  <div className={`p-5 rounded border-2 transition-all ${insurance ? 'bg-blue-50 border-[#008cff]' : 'bg-white border-[#e7e7e7]'}`}>
                     <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                           <div className={`w-10 h-10 rounded flex items-center justify-center ${insurance ? 'bg-[#008cff] text-white' : 'bg-green-50 text-green-600'}`}>
                              <ShieldCheck size={22} />
                           </div>
                           <div>
                              <p className="text-[14px] font-bold text-[#222]">Secure Your Journey</p>
                              <p className="text-[11px] text-[#4a4a4a]">Comprehensive protection for just ₹249</p>
                           </div>
                        </div>
                        <div onClick={() => setInsurance(!insurance)} className={`w-10 h-5 rounded-full p-1 cursor-pointer transition-all ${insurance ? 'bg-[#008cff]' : 'bg-[#e7e7e7]'}`}>
                           <div className={`w-3 h-3 bg-white rounded-full transition-transform ${insurance ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                     </div>
                  </div>
               </div>
            </main>

            <aside className="lg:block">
               <div className="sticky top-24 bg-white rounded shadow-sm border border-[#e7e7e7] overflow-hidden">
                  <div className="p-4 bg-[#f9f9f9] border-b border-[#f2f2f2]">
                     <h3 className="text-[14px] font-bold text-[#222]">Fare Summary</h3>
                  </div>
                  
                  <div className="p-5 space-y-4">
                     <div className="flex justify-between text-[12px] text-[#4a4a4a]">
                        <span>Base Fare ({pax} Traveller)</span>
                        <span className="font-bold text-[#222]">₹{baseFare.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between text-[12px] text-[#4a4a4a]">
                        <span>Fee & Surcharges</span>
                        <span className="font-bold text-[#222]">₹{(fuelSurcharge + airportTax + convenienceFee).toLocaleString()}</span>
                     </div>
                     
                     {(seatPrice > 0 || mealPrice > 0 || baggagePrice > 0 || insurancePrice > 0) && (
                        <div className="pt-4 border-t border-[#f2f2f2] space-y-3">
                           {seatPrice > 0 && <div className="flex justify-between text-[11px] text-[#008cff] font-bold"><span>Seats</span> <span>₹{seatPrice}</span></div>}
                           {mealPrice > 0 && <div className="flex justify-between text-[11px] text-[#f26722] font-bold"><span>Meals</span> <span>₹{mealPrice}</span></div>}
                           {baggagePrice > 0 && <div className="flex justify-between text-[11px] text-[#4f46e5] font-bold"><span>Baggage</span> <span>₹{baggagePrice}</span></div>}
                           {insurancePrice > 0 && <div className="flex justify-between text-[11px] text-green-600 font-bold"><span>Insurance</span> <span>₹{insurancePrice}</span></div>}
                        </div>
                     )}

                     <div className="pt-4 border-t border-[#f2f2f2] flex justify-between items-center">
                        <span className="text-[14px] font-bold text-[#222]">Total Amount</span>
                        <span className="text-[20px] font-black text-[#222]">₹{totalPayable.toLocaleString()}</span>
                     </div>

                     <button 
                      onClick={handleContinue}
                      className="w-full mt-6 py-3 bg-[#008cff] hover:bg-[#007ad9] text-white rounded font-bold text-[14px] uppercase shadow-lg shadow-blue-100 transition-colors"
                     >
                        Proceed to Checkout
                     </button>
                  </div>
               </div>
            </aside>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSeatModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSeatModal(false)} className="absolute inset-0 bg-black/60 shadow-inner" />
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden">
                <div className="p-4 border-b border-[#f2f2f2] flex items-center justify-between">
                   <h3 className="text-[18px] font-bold text-[#222]">Select Seats</h3>
                   <button onClick={() => setShowSeatModal(false)} className="text-[#4a4a4a]"><X size={20}/></button>
                </div>

                <div className="flex-1 overflow-y-auto p-12 bg-[#f2f2f2] flex justify-center">
                   <div className="bg-white rounded-[50px] p-10 border border-[#e7e7e7] shadow-lg w-fit">
                      <div className="grid grid-cols-7 gap-y-4 gap-x-2">
                         {seatGrid.map((s, i) => (
                           <React.Fragment key={s.id}>
                              {i % 6 === 3 && <div className="w-8 flex items-center justify-center text-[10px] font-bold text-[#4a4a4a]">{Math.floor(i/6)+1}</div>}
                              <button 
                                disabled={s.isOccupied}
                                onClick={() => {
                                   if (selectedSeat.find(ss => ss.id === s.id)) {
                                      setSelectedSeat(selectedSeat.filter(ss => ss.id !== s.id));
                                   } else {
                                      if (selectedSeat.length >= pax) {
                                         toast.error(`You can only select up to ${pax} seats`);
                                         return;
                                      }
                                      setSelectedSeat([...selectedSeat, s]);
                                   }
                                }}
                                className={`w-8 h-8 rounded border transition-all text-[10px] font-bold ${s.isOccupied ? 'bg-[#e7e7e7] text-[#4a4a4a]' : selectedSeat.find(ss => ss.id === s.id) ? 'bg-[#008cff] text-white border-[#008cff]' : 'bg-white border-[#008cff] text-[#008cff] hover:bg-blue-50'}`}
                              >
                                 {s.id}
                              </button>
                           </React.Fragment>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="p-4 bg-white border-t border-[#f2f2f2] flex justify-between items-center">
                   <div className="flex gap-4 text-[11px] text-[#4a4a4a] font-bold uppercase">
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-white border border-[#008cff]"/> Available</div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[#008cff]"/> Selected</div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[#e7e7e7]"/> Occupied</div>
                   </div>
                   <button onClick={() => setShowSeatModal(false)} className="bg-[#008cff] text-white px-8 py-2 rounded font-bold text-[14px]">DONE</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <FareBreakupModal isOpen={showFareBreakup} onClose={() => setShowFareBreakup(false)} fares={{ base: baseFare, taxes: fuelSurcharge+airportTax+convenienceFee, addons: seatPrice+mealPrice+baggagePrice+insurancePrice, total: totalPayable }} />
    </>
  );
};

function FareBreakupModal({ isOpen, onClose, fares }) {
   if (!isOpen) return null;
   return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
         <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-md p-10 overflow-hidden">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Detailed Breakup</h3>
            <div className="space-y-6">
               <div className="flex justify-between items-center"><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Fare</span> <span className="font-black text-slate-900">₹{fares.base.toLocaleString()}</span></div>
               <div className="flex justify-between items-center"><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Convenience Fee</span> <span className="font-black text-slate-900">₹300</span></div>
               <div className="flex justify-between items-center"><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fuel & Airport Tax</span> <span className="font-black text-slate-900">₹{(fares.taxes - 300).toLocaleString()}</span></div>
               {fares.addons > 0 && <div className="flex justify-between items-center"><span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Special Services</span> <span className="font-black text-indigo-600">₹{fares.addons.toLocaleString()}</span></div>}
               <div className="pt-8 border-t-2 border-slate-50 flex justify-between items-end">
                  <span className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Total</span>
                  <span className="text-4xl font-black text-slate-900 tracking-tighter">₹{fares.total.toLocaleString()}</span>
               </div>
            </div>
            <button onClick={onClose} className="w-full mt-10 py-4 bg-slate-50 text-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-100 transition-all">Close</button>
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/50 rounded-full -mr-12 -mt-12" />
         </motion.div>
      </div>
   )
}

export default BookingSelectionPage;
