import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Train, ChevronRight, X, ShieldCheck, Coffee, Armchair 
} from "lucide-react";
import toast from "react-hot-toast";

const TrainBookingSelectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTrain, setSelectedTrain] = useState(null);

  useEffect(() => {
    if (location.state?.train) {
      setSelectedTrain(location.state.train);
    } else {
      navigate("/trains");
    }
  }, [location.state, navigate]);

  if (!selectedTrain) return null;

  const pax = location.state?.pax || 1;
  const baseFare = selectedTrain.price * pax;
  const convenienceFee = 60 * pax;
  const totalPayable = baseFare + convenienceFee;

  const handleContinue = () => {
    const addOns = {
      totalPrice: totalPayable
    };
    navigate("/trains/checkout", {
      state: { train: selectedTrain, pax, addOns, totalAmount: totalPayable }
    });
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] font-sans pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="flex items-center gap-4 mb-8 text-[12px] font-bold">
            <span className="text-[#eab308]">Train Search</span>
            <ChevronRight size={14} className="text-[#4a4a4a]" />
            <span className="text-[#222]">Review Selection</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <main className="space-y-6">
              <section className="bg-white rounded shadow-sm border border-[#e7e7e7] overflow-hidden">
                <div className="p-4 border-b border-[#f2f2f2] bg-[#f9f9f9]">
                    <h3 className="text-[16px] font-bold text-[#222]">Review Your Train</h3>
                </div>
                
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <Train size={24} className="text-[#eab308]" />
                      <span className="text-[14px] font-bold text-[#222]">{selectedTrain.name}</span>
                      <span className="text-[12px] text-[#4a4a4a] px-2 py-0.5 bg-[#f2f2f2] rounded">{selectedTrain.trainNo} • {selectedTrain.class}</span>
                    </div>

                    <div className="flex items-center justify-between bg-[#f4f4f4] p-6 rounded">
                      <div>
                          <p className="text-[24px] font-black text-[#222]">{selectedTrain.depTime}</p>
                          <p className="text-[14px] font-bold text-[#222] mt-1">{selectedTrain.from}</p>
                      </div>
                      <div className="flex-1 flex flex-col items-center">
                          <p className="text-[11px] text-[#4a4a4a] mb-1">{selectedTrain.duration}</p>
                          <div className="w-1/2 h-[2px] bg-[#e7e7e7] relative" />
                      </div>
                      <div className="text-right">
                          <p className="text-[24px] font-black text-[#222]">{selectedTrain.arrTime}</p>
                          <p className="text-[14px] font-bold text-[#222] mt-1">{selectedTrain.to}</p>
                      </div>
                    </div>
                </div>
              </section>
          </main>

          <aside>
              <div className="sticky top-24 bg-white rounded shadow-sm border border-[#e7e7e7] overflow-hidden">
                <div className="p-4 bg-[#f9f9f9] border-b border-[#f2f2f2]">
                    <h3 className="text-[14px] font-bold text-[#222]">Fare Summary</h3>
                </div>
                <div className="p-5 space-y-4">
                    <div className="flex justify-between text-[12px] text-[#4a4a4a]"><span>Base Fare</span><span className="font-bold text-[#222]">₹{baseFare}</span></div>
                    <div className="flex justify-between text-[12px] text-[#4a4a4a]"><span>Fees</span><span className="font-bold text-[#222]">₹{convenienceFee}</span></div>
                    
                    <div className="pt-4 border-t border-[#f2f2f2] flex justify-between items-center">
                      <span className="text-[14px] font-bold text-[#222]">Total Amount</span>
                      <span className="text-[20px] font-black text-[#222]">₹{totalPayable}</span>
                    </div>

                    <button onClick={handleContinue} className="w-full mt-6 py-3 bg-[#eab308] hover:bg-[#ca8a04] text-white rounded font-bold text-[14px] uppercase shadow-lg shadow-yellow-100 transition-colors">
                      Proceed to Checkout
                    </button>
                </div>
              </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
export default TrainBookingSelectionPage;
