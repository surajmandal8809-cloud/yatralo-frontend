import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bus, ChevronRight, X, ShieldCheck, Coffee, Armchair 
} from "lucide-react";
import toast from "react-hot-toast";

const BusBookingSelectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [showSeatModal, setShowSeatModal] = useState(false);

  useEffect(() => {
    if (location.state?.bus) {
      setSelectedBus(location.state.bus);
    } else {
      navigate("/buses");
    }
  }, [location.state, navigate]);

  const generateSeats = () => {
    const seats = [];
    const rows = 10;
    const cols = ['A', 'B', ' ', 'C', 'D'];
    for (let r = 1; r <= rows; r++) {
      cols.forEach(c => {
        if (c === ' ') return;
        const id = `${r}${c}`;
        const isOccupied = Math.random() < 0.3;
        seats.push({ id, isOccupied, price: 100 });
      });
    }
    return seats;
  };

  const seatGrid = useMemo(() => generateSeats(), []);

  if (!selectedBus) return null;

  const pax = location.state?.pax || 1;
  const baseFare = selectedBus.price * pax;
  const convenienceFee = 50 * pax;
  const seatPrice = selectedSeat.reduce((acc, s) => acc + s.price, 0);
  const totalPayable = baseFare + convenienceFee + seatPrice;

  const handleContinue = () => {
    if (selectedSeat.length < pax) {
      toast.error(`Please select ${pax} seats.`);
      return;
    }
    const addOns = {
      seats: selectedSeat.map(s => s.id),
      seatPrice,
      totalPrice: totalPayable
    };
    navigate("/buses/checkout", {
      state: { bus: selectedBus, pax, addOns, totalAmount: totalPayable }
    });
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] font-sans pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="flex items-center gap-4 mb-8 text-[12px] font-bold">
            <span className="text-[#f97316]">Bus Search</span>
            <ChevronRight size={14} className="text-[#4a4a4a]" />
            <span className="text-[#222]">Review Selection</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <main className="space-y-6">
              <section className="bg-white rounded shadow-sm border border-[#e7e7e7] overflow-hidden">
                <div className="p-4 border-b border-[#f2f2f2] bg-[#f9f9f9]">
                    <h3 className="text-[16px] font-bold text-[#222]">Review Your Bus</h3>
                </div>
                
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <Bus size={24} className="text-[#f97316]" />
                      <span className="text-[14px] font-bold text-[#222]">{selectedBus.operator}</span>
                      <span className="text-[12px] text-[#4a4a4a] px-2 py-0.5 bg-[#f2f2f2] rounded">{selectedBus.type}</span>
                    </div>

                    <div className="flex items-center justify-between bg-[#f4f4f4] p-6 rounded">
                      <div>
                          <p className="text-[24px] font-black text-[#222]">{selectedBus.depTime}</p>
                          <p className="text-[14px] font-bold text-[#222] mt-1">{selectedBus.from}</p>
                      </div>
                      <div className="flex-1 flex flex-col items-center">
                          <p className="text-[11px] text-[#4a4a4a] mb-1">{selectedBus.duration}</p>
                          <div className="w-1/2 h-[2px] bg-[#e7e7e7] relative" />
                      </div>
                      <div className="text-right">
                          <p className="text-[24px] font-black text-[#222]">{selectedBus.arrTime}</p>
                          <p className="text-[14px] font-bold text-[#222] mt-1">{selectedBus.to}</p>
                      </div>
                    </div>
                </div>
              </section>

              <div className="bg-white rounded shadow-sm border border-[#e7e7e7] p-5 flex justify-between cursor-pointer" onClick={() => setShowSeatModal(true)}>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-orange-50 text-[#f97316] flex items-center justify-center"><Armchair size={22} /></div>
                    <div>
                      <p className="text-[14px] font-bold text-[#222]">Select Seats</p>
                      <p className="text-[11px] text-[#4a4a4a]">Choose from available layout</p>
                    </div>
                </div>
                <div className="text-right">
                    {selectedSeat.length > 0 ? (
                      <span className="text-[12px] font-bold text-[#f97316]">{selectedSeat.map(s => s.id).join(", ")} selected</span>
                    ) : (
                      <span className="text-[12px] font-bold text-[#008cff]">Select</span>
                    )}
                </div>
              </div>
          </main>

          <aside>
              <div className="sticky top-24 bg-white rounded shadow-sm border border-[#e7e7e7] overflow-hidden">
                <div className="p-4 bg-[#f9f9f9] border-b border-[#f2f2f2]">
                    <h3 className="text-[14px] font-bold text-[#222]">Fare Summary</h3>
                </div>
                <div className="p-5 space-y-4">
                    <div className="flex justify-between text-[12px] text-[#4a4a4a]"><span>Base Fare</span><span className="font-bold text-[#222]">₹{baseFare}</span></div>
                    <div className="flex justify-between text-[12px] text-[#4a4a4a]"><span>Fees</span><span className="font-bold text-[#222]">₹{convenienceFee}</span></div>
                    {seatPrice > 0 && <div className="flex justify-between text-[12px] text-[#4a4a4a]"><span>Seat Selection</span><span className="font-bold text-[#222]">₹{seatPrice}</span></div>}
                    
                    <div className="pt-4 border-t border-[#f2f2f2] flex justify-between items-center">
                      <span className="text-[14px] font-bold text-[#222]">Total Amount</span>
                      <span className="text-[20px] font-black text-[#222]">₹{totalPayable}</span>
                    </div>

                    <button onClick={handleContinue} className="w-full mt-6 py-3 bg-[#f97316] hover:bg-[#ea580c] text-white rounded font-bold text-[14px] uppercase shadow-lg shadow-orange-100 transition-colors">
                      Proceed to Checkout
                    </button>
                </div>
              </div>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {showSeatModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/60 shadow-inner" onClick={() => setShowSeatModal(false)} />
             <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-sm h-[80vh] flex flex-col overflow-hidden">
                <div className="p-4 border-b border-[#f2f2f2] flex items-center justify-between">
                   <h3 className="text-[18px] font-bold text-[#222]">Select Seats</h3>
                   <button onClick={() => setShowSeatModal(false)} className="text-[#4a4a4a]"><X size={20}/></button>
                </div>
                <div className="flex-1 overflow-y-auto p-8 bg-[#f2f2f2] flex justify-center">
                   <div className="bg-white rounded-3xl p-6 border border-[#e7e7e7] shadow-lg">
                      <div className="grid grid-cols-5 gap-y-3 gap-x-2">
                         {seatGrid.map((s, i) => {
                            const isSelected = selectedSeat.find(ss => ss.id === s.id);
                            return (
                              s.id ? (
                                <button 
                                  key={s.id}
                                  disabled={s.isOccupied}
                                  onClick={() => {
                                      if (isSelected) {
                                          setSelectedSeat(selectedSeat.filter(ss => ss.id !== s.id));
                                      } else {
                                          if (selectedSeat.length >= pax) {
                                              toast.error(`You can only select ${pax} seats.`);
                                              return;
                                          }
                                          setSelectedSeat([...selectedSeat, s]);
                                      }
                                  }}
                                  className={`w-8 h-8 rounded text-[10px] font-bold transition-all ${s.isOccupied ? "bg-[#e7e7e7] text-[#4a4a4a]" : isSelected ? "bg-[#f97316] text-white" : "border border-[#f97316] text-[#f97316] hover:bg-orange-50"}`}
                                >
                                  {s.id}
                                </button>
                              ) : <div key={`empty-${i}`} className="w-8 h-8" />
                            );
                         })}
                      </div>
                   </div>
                </div>
                <div className="p-4 bg-white border-t border-[#f2f2f2] text-center">
                   <button onClick={() => setShowSeatModal(false)} className="bg-[#f97316] text-white px-8 py-2 rounded font-bold text-[14px]">DONE</button>
                </div>
             </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default BusBookingSelectionPage;
