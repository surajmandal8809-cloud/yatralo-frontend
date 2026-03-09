import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Users,
  Plane,
  Train,
  Hotel,
  Search,
  ChevronRight,
  Navigation,
} from "lucide-react";

const SearchForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("flight");

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    dateEnd: "",
    passengers: "1 Traveler",
    guests: "2 Guests",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = formData.to || formData.from || "your destination";
    const pax = Math.max(1, parseInt(formData.passengers, 10) || 1);

    if (activeTab === "flight" || activeTab === "train") {
      const params = new URLSearchParams({
        from: formData.from.trim(),
        to: formData.to.trim(),
        date: formData.date,
        pax: String(pax),
        autoSearch: "1",
      });
      navigate(`/${activeTab === "flight" ? "flights" : "trains"}?${params.toString()}`);
      return;
    }

    toast.success(`Searching ${activeTab}s to ${query}`, {
      icon: "✈️",
      style: { borderRadius: "1rem", background: "#0f172a", color: "#fff" },
    });
  };

  const tabs = [
    { id: "flight", label: "Flights", icon: Plane },
    { id: "train", label: "Trains", icon: Train },
    { id: "hotel", label: "Hotels", icon: Hotel },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto"
    >
      <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/40 overflow-hidden">
        <div className="flex bg-white border-b border-slate-100">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold transition-all ${
                  isActive ? "text-[#cf3425]" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {isActive && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#cf3425]" />}
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-5 md:p-6">
          <form onSubmit={handleSearch}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3"
              >
                {activeTab === "flight" && (
                  <>
                    <Input name="from" label="From" icon={MapPin} value={formData.from} onChange={handleInputChange} placeholder="Delhi (DEL)" />
                    <Input name="to" label="To" icon={Navigation} value={formData.to} onChange={handleInputChange} placeholder="Mumbai (BOM)" />
                    <Input name="date" label="Departure" type="date" icon={Calendar} value={formData.date} onChange={handleInputChange} />
                    <Input name="passengers" label="Passengers" icon={Users} value={formData.passengers} onChange={handleInputChange} />
                    <SearchButton text="Search Flights" />
                  </>
                )}
                {activeTab === "train" && (
                  <>
                    <Input name="from" label="From" icon={MapPin} value={formData.from} onChange={handleInputChange} placeholder="Mumbai" />
                    <Input name="to" label="To" icon={Navigation} value={formData.to} onChange={handleInputChange} placeholder="Pune" />
                    <Input name="date" label="Date" type="date" icon={Calendar} value={formData.date} onChange={handleInputChange} />
                    <Input name="passengers" label="Passengers" icon={Users} value={formData.passengers} onChange={handleInputChange} />
                    <SearchButton text="Search Trains" />
                  </>
                )}
                {activeTab === "hotel" && (
                  <>
                    <Input name="from" label="Destination" icon={MapPin} value={formData.from} onChange={handleInputChange} placeholder="Goa, India" />
                    <Input name="date" label="Check-in" type="date" icon={Calendar} value={formData.date} onChange={handleInputChange} />
                    <Input name="dateEnd" label="Check-out" type="date" icon={Calendar} value={formData.dateEnd} onChange={handleInputChange} />
                    <Input name="guests" label="Guests" icon={Users} value={formData.guests} onChange={handleInputChange} />
                    <SearchButton text="Search Hotels" />
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Popular:</span>
            {["Goa", "Manali", "Dubai", "Bangkok", "Singapore"].map((dest) => (
              <button
                key={dest}
                type="button"
                onClick={() => setFormData((p) => ({ ...p, to: dest }))}
                className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full hover:border-[#cf3425] hover:text-[#cf3425] transition-colors font-medium"
              >
                {dest}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Input = ({ icon: Icon, label, placeholder, type = "text", name, value, onChange }) => (
  <div className="group relative">
    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{label}</label>
    <div className="relative">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#cf3425] transition-colors">
        <Icon size={16} />
      </div>
      <input
        required
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-200 p-3 pl-10 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#cf3425]/20 focus:border-[#cf3425] outline-none transition-all h-12"
      />
    </div>
  </div>
);

const SearchButton = ({ text }) => (
  <div className="flex flex-col">
    <div className="h-[26px]" />
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      type="submit"
      className="h-12 bg-[#cf3425] hover:bg-[#b82e1f] text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg transition-all text-sm group"
    >
      <Search size={16} />
      {text}
      <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
    </motion.button>
  </div>
);

export default SearchForm;
