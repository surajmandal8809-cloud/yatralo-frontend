import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Bus,
  MapPin,
  Calendar,
  ChevronRight,
  Filter,
  Sparkles,
  Clock,
  Wifi,
  Zap,
} from "lucide-react";
import toast from "react-hot-toast";

function BusCard({ bus, index, onBook }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden hover:border-[#7c3aed]/40 transition-all group p-2"
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-64 relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#7c3aed]/10 to-[#f97316]/10 flex items-center justify-center min-h-[180px]">
          <Bus size={64} className="text-[#7c3aed]/30" />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
            <span className="text-xs font-black text-[#7c3aed]">{bus.type}</span>
          </div>
        </div>

        <div className="flex-1 p-6 md:p-8 flex flex-col">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
            <div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight mb-2 tracking-tight">
                {bus.from} → {bus.to}
              </h3>
              <p className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <Bus size={13} className="text-[#7c3aed]" />
                {bus.operator}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Per Seat</p>
              <p className="text-3xl font-black text-[#f97316]">₹{bus.price.toLocaleString()}</p>
              <p className="text-[10px] font-bold text-slate-500">Taxes Included</p>
            </div>
          </div>

          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-slate-600">
              <Clock size={14} className="text-[#7c3aed]" />
              <span className="text-sm font-bold">{bus.departure}</span>
            </div>
            <div className="flex-1 border-t-2 border-dashed border-slate-200 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                {bus.duration}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Clock size={14} className="text-[#f97316]" />
              <span className="text-sm font-bold">{bus.arrival}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {bus.amenities.map((amt, i) => (
              <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-500">
                {amt === "WiFi" ? <Wifi size={12} className="text-[#7c3aed]" /> : <Sparkles size={12} className="text-[#f97316]" />}
                {amt}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
            <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
              {bus.seats} seats available
            </div>
            <button
              onClick={() => onBook(bus)}
              className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-violet-100 flex items-center gap-2"
            >
              Book Now <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const MOCK_BUSES = [
  {
    id: 1,
    from: "Delhi",
    to: "Jaipur",
    operator: "Raj Travels",
    type: "AC Sleeper",
    price: 799,
    departure: "22:00",
    arrival: "05:30",
    duration: "7h 30m",
    seats: 18,
    amenities: ["WiFi", "Charging Point", "Blanket", "Water Bottle"],
  },
  {
    id: 2,
    from: "Delhi",
    to: "Jaipur",
    operator: "IntraCITY",
    type: "Volvo AC",
    price: 499,
    departure: "06:00",
    arrival: "11:00",
    duration: "5h 00m",
    seats: 32,
    amenities: ["WiFi", "Snacks"],
  },
  {
    id: 3,
    from: "Delhi",
    to: "Jaipur",
    operator: "Neeta Tours",
    type: "Non-AC Seater",
    price: 299,
    departure: "08:30",
    arrival: "14:30",
    duration: "6h 00m",
    seats: 45,
    amenities: ["Water Bottle"],
  },
  {
    id: 4,
    from: "Delhi",
    to: "Jaipur",
    operator: "RSRTC Express",
    type: "AC Semi-Sleeper",
    price: 620,
    departure: "15:00",
    arrival: "21:30",
    duration: "6h 30m",
    seats: 22,
    amenities: ["WiFi", "Charging Point"],
  },
];

export default function BusSearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const from = searchParams.get("from") || "Origin";
  const to = searchParams.get("to") || "Destination";
  const date = searchParams.get("date") || "Select Date";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Header / Top Search Info */}
      <section className="bg-white border-b border-slate-200 py-6 px-6 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px] bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 flex items-center gap-4">
            <Bus size={20} className="text-[#7c3aed]" />
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Route</p>
              <p className="text-sm font-black text-slate-900">{from} → {to}</p>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 flex items-center gap-4">
            <Calendar size={18} className="text-[#f97316]" />
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</p>
              <p className="text-sm font-black text-slate-900">{date}</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/buses")}
            className="ml-auto px-10 py-4 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white font-black text-xs rounded-2xl uppercase tracking-widest shadow-xl shadow-violet-100 hover:scale-105 transition-all"
          >
            Modify Search
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-8">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 border-4 border-dashed border-violet-200 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center text-[#7c3aed]"
              >
                <Bus size={48} />
              </motion.div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Finding best buses...</h3>
              <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-xs">Searching from 1,000+ operators</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Available Buses
                <span className="text-base text-slate-400 font-bold ml-3">{MOCK_BUSES.length} results</span>
              </h2>
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-[#7c3aed] transition-all">
                <Filter size={14} /> Filter Results
              </button>
            </div>
            {MOCK_BUSES.map((bus, i) => (
              <BusCard
                key={bus.id}
                bus={bus}
                index={i}
                onBook={(b) => {
                  const token = localStorage.getItem("token");
                  if (!token) {
                    toast.error("Please login to book a bus");
                    navigate("/auth/login");
                    return;
                  }
                  navigate("/booking-selection", {
                    state: {
                      type: "bus",
                      bus: b,
                      from,
                      to,
                      date,
                    },
                  });
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
