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
  Bus,
  Navigation
} from "lucide-react";

const SearchForm = ({ defaultTab = "flight" }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(defaultTab);

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: today,
    dateEnd: tomorrow,
    passengers: "1 Traveler",
    guests: "2 Guests",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (activeTab === "flight" || activeTab === "train" || activeTab === "bus") {
      params.append("from", formData.from.trim());
      params.append("to", formData.to.trim());
      params.append("date", formData.date);
      params.append("pax", activeTab === "bus" ? "1" : (formData.passengers?.split(" ")[0] || "1"));
      params.append("autoSearch", "1");
      
      const route = activeTab === "flight" ? "flights/results" : 
                    activeTab === "train" ? "trains/results" : "buses/results";
      navigate(`/${route}?${params.toString()}`);
      return;
    }

    if (activeTab === "hotel") {
      params.append("location", formData.from.trim());
      params.append("checkInDate", formData.date);
      params.append("checkOutDate", formData.dateEnd);
      params.append("guests", formData.guests?.split(" ")[0] || "2");
      params.append("autoSearch", "1");
      navigate(`/hotels/results?${params.toString()}`);
      return;
    }

    toast.success(`Searching ${activeTab}s to ${formData.to || formData.from}`, {
      icon: "✈️",
      style: { borderRadius: "1rem", background: "#0f172a", color: "#fff" },
    });
  };

  const tabs = [
    { id: "flight", label: "Flights", icon: Plane },
    { id: "train", label: "Trains", icon: Train },
    { id: "hotel", label: "Hotels", icon: Hotel },
    { id: "bus", label: "Buses", icon: Bus },
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
                className={`relative flex-1 flex items-center justify-center gap-2 px-6 py-4 text-xs font-black uppercase tracking-[0.15em] transition-all ${
                  isActive ? "text-[#7c3aed]" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {isActive && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7c3aed]" />}
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
                    <HotelCityAutocomplete name="from" value={formData.from} onChange={(val) => setFormData(p => ({...p, from: val}))} />
                    <Input name="date" label="Check-in" type="date" icon={Calendar} value={formData.date} onChange={handleInputChange} />
                    <Input name="dateEnd" label="Check-out" type="date" icon={Calendar} value={formData.dateEnd} onChange={handleInputChange} />
                    <Input name="guests" label="Guests" icon={Users} value={formData.guests} onChange={handleInputChange} />
                    <SearchButton text="Search Hotels" />
                  </>
                )}
                {activeTab === "bus" && (
                  <>
                    <Input name="from" label="From" icon={MapPin} value={formData.from} onChange={handleInputChange} placeholder="Mumbai" />
                    <Input name="to" label="To" icon={Bus} value={formData.to} onChange={handleInputChange} placeholder="Pune" />
                    <Input name="date" label="Date" type="date" icon={Calendar} value={formData.date} onChange={handleInputChange} />
                    <Input name="passengers" label="Passengers" icon={Users} value={formData.passengers} onChange={handleInputChange} />
                    <SearchButton text="Search Buses" />
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
                onClick={() => setFormData((p) => ({ ...p, to: activeTab === 'hotel' ? p.to : dest, from: activeTab === 'hotel' ? dest : p.from }))}
                className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full hover:border-[#7c3aed] hover:text-[#7c3aed] transition-colors font-medium"
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

const HotelCityAutocomplete = ({ name, value, onChange }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    
    React.useEffect(() => {
        if (!value || value.length < 2) {
            setSuggestions([]);
            return;
        }
        const fetchCities = async () => {
             try {
                const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
                const res = await fetch(`${apiUrl}/hotels/cities/suggest?keyword=${value}`);
                const result = await res.json();
                if (result.status) {
                    setSuggestions(result.data);
                }
             } catch (error) {
                console.error("Cities suggest error", error);
             }
        };
        const timeoutId = setTimeout(fetchCities, 300);
        return () => clearTimeout(timeoutId);
    }, [value]);

    return (
        <div className="group relative">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Destination</label>
            <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#7c3aed] transition-colors">
                    <MapPin size={16} />
                </div>
                <input
                    required
                    name={name}
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    type="text"
                    placeholder="E.g. Dubai, New York or London"
                    className="w-full bg-slate-50 border border-slate-100 p-3 pl-10 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#7c3aed] outline-none transition-all h-12"
                />
                
                {showSuggestions && suggestions.length > 0 && (
                    <ul className="absolute z-50 top-[110%] left-0 w-full bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto overflow-x-hidden">
                        {suggestions.map((c, i) => (
                            <li 
                                key={i}
                                onClick={() => {
                                    onChange(c.city);
                                    setShowSuggestions(false);
                                }}
                                className="px-4 py-3 hover:bg-slate-50 cursor-pointer flex flex-col border-b border-slate-50 last:border-none"
                            >
                                <span className="font-bold text-slate-800 text-sm">{c.city}</span>
                                <span className="text-[10px] font-black tracking-widest text-[#7c3aed] uppercase mt-0.5">{c.iataCode} - {c.country}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

const Input = ({ icon: Icon, label, placeholder, type = "text", name, value, onChange }) => (
  <div className="group relative">
    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{label}</label>
    <div className="relative">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#7c3aed] transition-colors">
        <Icon size={16} />
      </div>
      <input
        required
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-100 p-3 pl-10 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#7c3aed] outline-none transition-all h-12"
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
      className="h-14 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-2xl font-black uppercase tracking-[0.1em] flex items-center justify-center gap-3 shadow-lg shadow-violet-100 transition-all text-[12px] group"
    >
      <Search size={16} />
      {text}
      <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
    </motion.button>
  </div>
);

export default SearchForm;
