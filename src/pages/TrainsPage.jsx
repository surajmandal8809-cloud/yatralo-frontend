import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowRight,
  ArrowRightLeft,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Compass,
  Filter,
  MapPin,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Train,
  Users,
  Coffee,
} from "lucide-react";
import { addBooking } from "../utils/bookingStore";

const CITIES = [
  { code: "DEL", name: "New Delhi", station: "New Delhi Railway Station" },
  { code: "BOM", name: "Mumbai", station: "Mumbai Central" },
  { code: "BLR", name: "Bengaluru", station: "KSR Bengaluru" },
  { code: "MAA", name: "Chennai", station: "Chennai Central" },
  { code: "CCU", name: "Kolkata", station: "Howrah Junction" },
  { code: "HYD", name: "Hyderabad", station: "Secunderabad Junction" },
  { code: "PNQ", name: "Pune", station: "Pune Junction" },
  { code: "AMD", name: "Ahmedabad", station: "Ahmedabad Junction" },
  { code: "JAI", name: "Jaipur", station: "Jaipur Junction" },
  { code: "LKO", name: "Lucknow", station: "Lucknow Charbagh" },
];

const TRAIN_TYPES = [
  { name: "Vande Bharat", code: "VB", bg: "#1d4ed8" },
  { name: "Rajdhani Express", code: "RJ", bg: "#b91c1c" },
  { name: "Shatabdi Express", code: "SH", bg: "#0f766e" },
  { name: "Duronto Express", code: "DR", bg: "#ea580c" },
  { name: "Garib Rath", code: "GR", bg: "#4f46e5" },
];

const resolveCityCode = (value) => {
  if (!value) return null;
  const q = value.trim().toLowerCase();
  if (!q) return null;
  const exact = CITIES.find((c) => c.code.toLowerCase() === q || c.name.toLowerCase() === q);
  if (exact) return exact.code;
  const partial = CITIES.find((c) => c.name.toLowerCase().includes(q));
  return partial ? partial.code : null;
};

const toTime = (m) => `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
const durLabel = (m) => {
  const h = Math.floor(m / 60);
  const mn = m % 60;
  return mn ? `${h}h ${mn}m` : `${h}h`;
};

function seededRand(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return Math.abs(s) / 0x7fffffff;
  };
}

function generateTrains(from, to, date, pax) {
  const seed = [...(from + to + date + "train")].reduce((a, c) => a + c.charCodeAt(0), 0);
  const r = seededRand(seed);
  return Array.from({ length: Math.floor(r() * 7) + 5 }, (_, i) => {
    const type = TRAIN_TYPES[Math.floor(r() * TRAIN_TYPES.length)];
    const dep = Math.floor(r() * 16 * 60) + 4 * 60;
    const dur = Math.floor(r() * 700) + 240;
    const base = Math.floor(r() * 1800) + 600;
    return {
      id: `T${i}-${seed}`,
      name: type.name,
      code: type.code,
      bg: type.bg,
      trainNo: `${Math.floor(r() * 8000) + 12000}`,
      dep: toTime(dep),
      arr: toTime(dep + dur),
      depMins: dep,
      duration: dur,
      stops: r() < 0.65 ? 0 : r() < 0.9 ? 1 : 2,
      price: Math.round((base * pax) / 50) * 50,
      perPax: Math.round(base / 50) * 50,
      seats: Math.floor(r() * 130) + 3,
      pantry: r() > 0.4,
      ac: r() > 0.35,
      refundable: r() > 0.5,
      rating: (3.8 + r() * 1.1).toFixed(1),
    };
  }).sort((a, b) => a.price - b.price);
}

function CityBox({ value, onChange, label }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCities = useCallback(async (keyword) => {
    if (keyword.length < 2) return;
    setLoading(true);
    try {
      const res = await fetch(`${getBaseURL()}/flights/cities?keyword=${keyword}`);
      const data = await res.json();
      if (data.status) {
        setList(data.data.map(item => ({
          code: item.iataCode,
          name: item.name,
          station: item.detailedName || "Central Station"
        })));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (q) fetchCities(q);
    }, 400);
    return () => clearTimeout(timer);
  }, [q, fetchCities]);

  const sel = useMemo(() => {
    return list.find(c => c.code === value) || { code: value, name: value, station: "" };
  }, [value, list]);

  return (
    <div className="relative">
      <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5">{label}</p>
      <button
        type="button"
        onClick={() => {
          setOpen(!open);
          setQ("");
        }}
        className="w-full flex items-center gap-2 px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-left transition-all hover:border-indigo-300"
      >
        <MapPin size={14} className="text-slate-400 flex-shrink-0" />
        {value ? (
          <div>
            <p className="text-xl font-black text-slate-900 leading-none tracking-tight">{value}</p>
            <p className="text-xs text-slate-400 truncate max-w-[140px] mt-0.5">{sel.name}</p>
          </div>
        ) : (
          <p className="text-slate-500 text-sm">Select city</p>
        )}
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl z-40 overflow-hidden border border-slate-100">
          <div className="p-2.5 border-b border-slate-100">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search city or station..."
              className="w-full text-sm px-3 py-2 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-300 border border-transparent focus:border-indigo-300"
            />
          </div>
          <div className="max-h-52 overflow-y-auto">
            {loading && <div className="p-4 text-center"><RefreshCw className="animate-spin mx-auto text-indigo-400" size={16} /></div>}
            {list.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  onChange(c.code);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-indigo-50 text-left transition-colors"
              >
                <span className="text-xs font-black bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded min-w-[36px] text-center">{c.code}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{c.name}</p>
                  <p className="text-xs text-slate-400">{c.station}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TrainCard({ t, index, onBook }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="bg-white rounded-[1.75rem] border border-slate-100 shadow-lg shadow-slate-200/60 hover:border-indigo-200 transition-all overflow-hidden"
    >
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 min-w-[150px]">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-black shadow flex-shrink-0" style={{ background: t.bg }}>
              {t.code}
            </div>
            <div>
              <p className="text-sm font-black text-slate-800">{t.name}</p>
              <p className="text-xs text-slate-400 font-mono">{t.trainNo}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-1 justify-center min-w-[200px]">
            <p className="text-2xl font-black text-slate-900">{t.dep}</p>
            <div className="flex-1 flex flex-col items-center">
              <p className="text-xs text-slate-400 font-semibold mb-1">{durLabel(t.duration)}</p>
              <div className="w-full flex items-center gap-1.5">
                <div className="flex-1 h-px bg-slate-200" />
                <Train size={13} className="text-indigo-600" />
                <div className="flex-1 h-px bg-slate-200" />
              </div>
              <p className={`text-xs font-bold mt-1 ${t.stops === 0 ? "text-emerald-600" : "text-amber-600"}`}>
                {t.stops === 0 ? "Direct" : `${t.stops} stop`}
              </p>
            </div>
            <p className="text-2xl font-black text-slate-900">{t.arr}</p>
          </div>

          <div className="text-right min-w-[110px]">
            <p className="text-2xl font-black text-indigo-700">Rs {t.price.toLocaleString()}</p>
            <p className="text-xs text-slate-400">Rs {t.perPax.toLocaleString()} / person</p>
            <div className="flex items-center justify-end gap-0.5 mt-1">
              <Star size={10} className="fill-amber-400 text-amber-400" />
              <span className="text-xs text-slate-500 font-semibold">{t.rating}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <button
              onClick={() => onBook(t)}
              className="px-5 py-2.5 bg-[#cf3425] hover:bg-[#b82e1f] text-white text-sm font-semibold rounded-xl transition-all shadow"
            >
              Book Now
            </button>
            <button onClick={() => setOpen(!open)} className="text-xs text-slate-400 hover:text-indigo-700 flex items-center gap-0.5 transition-colors">
              Details {open ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {t.seats <= 20 && <span className="text-xs font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">Only {t.seats} seats left</span>}
          {t.refundable && (
            <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 size={9} /> Refundable
            </span>
          )}
          {t.pantry && (
            <span className="text-xs font-bold bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full border border-orange-200 flex items-center gap-1">
              <Coffee size={9} /> Pantry
            </span>
          )}
          {t.ac && <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">AC coach</span>}
        </div>
      </div>

      {open && (
        <div className="border-t border-dashed border-slate-100 bg-slate-50/80 p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-xs font-black uppercase text-slate-400 mb-1 tracking-wider">Boarding</p>
              <p className="font-semibold text-slate-700">30 min before departure</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-slate-400 mb-1 tracking-wider">Classes</p>
              <p className="font-semibold text-slate-700">CC, 3A, 2A</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-slate-400 mb-1 tracking-wider">Travel Time</p>
              <p className="font-semibold text-slate-700">{durLabel(t.duration)}</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-slate-400 mb-1 tracking-wider">Cancellation</p>
              <p className={`font-semibold ${t.refundable ? "text-emerald-600" : "text-red-500"}`}>
                {t.refundable ? "Free before 24h" : "Non-refundable"}
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function TrainsPage() {
  const today = new Date().toISOString().split("T")[0];
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialFrom = resolveCityCode(searchParams.get("from")) || "DEL";
  const initialTo = resolveCityCode(searchParams.get("to")) || "BOM";
  const initialDate = searchParams.get("date") || today;
  const initialPax = Math.max(1, Math.min(6, Number(searchParams.get("pax")) || 1));

  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [date, setDate] = useState(initialDate);
  const [pax, setPax] = useState(initialPax);
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [sortBy, setSortBy] = useState("price");
  const [maxPrice, setMaxPrice] = useState(12000);
  const [directOnly, setDirectOnly] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const didAutoSearch = useRef(false);

  const fromCity = CITIES.find((c) => c.code === from);
  const toCity = CITIES.find((c) => c.code === to);

  const handleSearch = useCallback(() => {
    if (!from || !to || from === to) return;
    setLoading(true);
    setTimeout(() => {
      setTrains(generateTrains(from, to, date, pax));
      setLoading(false);
      setSearched(true);
    }, 1100);
  }, [from, to, date, pax]);

  const handleBookTrain = useCallback(
    (train) => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to book your train ticket");
        navigate("/auth/login");
        return;
      }
      navigate("/checkout", {
        state: {
          train,
          type: "train",
          from,
          to,
          fromName: fromCity?.name || from,
          toName: toCity?.name || to,
          date,
          pax,
        },
      });
    },
    [date, from, fromCity?.name, navigate, pax, to, toCity?.name]
  );

  useEffect(() => {
    const shouldAutoSearch = searchParams.get("autoSearch") === "1";
    if (!shouldAutoSearch || didAutoSearch.current) return;
    didAutoSearch.current = true;
    handleSearch();
  }, [handleSearch, searchParams]);

  const results = useMemo(
    () =>
      [...trains]
        .filter((t) => t.price <= maxPrice && (!directOnly || t.stops === 0))
        .sort((a, b) =>
          sortBy === "price"
            ? a.price - b.price
            : sortBy === "duration"
              ? a.duration - b.duration
              : sortBy === "dep"
                ? a.depMins - b.depMins
                : parseFloat(b.rating) - parseFloat(a.rating)
        ),
    [trains, maxPrice, directOnly, sortBy]
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative h-[72vh] min-h-[520px] flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline preload="auto" poster={bannerPoster} className="absolute inset-0 w-full h-full object-cover">
          <source src="/assets/video/Train.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-xl border border-white/25 px-5 py-2.5 rounded-full mb-8"
          >
            <Compass size={15} className="text-yellow-400" />
            <span className="text-xs font-black tracking-[0.3em] uppercase text-white">Rail Discovery</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6"
          >
            Discover{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Better
            </span>{" "}
            Trains
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Compare routes, durations, and fares with instant booking options.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              { icon: <Train size={13} />, label: "Nationwide Routes" },
              { icon: <Sparkles size={13} />, label: "Best Fare Picks" },
              { icon: <Star size={13} />, label: "Top Rated Trains" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/15 backdrop-blur-xl border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full">
                {s.icon}
                {s.label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="relative z-20 -mt-10 md:-mt-14">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-900/10 p-4 md:p-5">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr_140px_130px_auto] gap-2.5 items-end">
              <CityBox value={from} onChange={setFrom} label="From" />
              <button
                onClick={() => {
                  setFrom(to);
                  setTo(from);
                }}
                className="self-end mb-0.5 w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all hover:rotate-180 duration-300"
              >
                <ArrowRightLeft size={15} />
              </button>
              <CityBox value={to} onChange={setTo} label="To" />
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5">Date</p>
                <div className="relative">
                  <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    value={date}
                    min={today}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold outline-none focus:border-indigo-400"
                  />
                </div>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5">Passengers</p>
                <div className="relative">
                  <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    value={pax}
                    onChange={(e) => setPax(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold outline-none appearance-none focus:border-indigo-400"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} Adult{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={handleSearch}
                disabled={loading || from === to}
                className="self-end h-[48px] flex items-center justify-center gap-2 px-5 bg-[#cf3425] text-white text-sm font-semibold rounded-xl hover:bg-[#b82e1f] transition-all disabled:opacity-50"
              >
                {loading ? <RefreshCw size={17} className="animate-spin" /> : <Search size={17} />}
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-10">
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-[1.75rem] border border-slate-100 p-5 animate-pulse">
                <div className="flex gap-4 items-center">
                  <div className="w-11 h-11 bg-slate-100 rounded-xl" />
                  <div className="flex-1 h-5 bg-slate-100 rounded-lg" />
                  <div className="w-28 h-10 bg-slate-100 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        )}

        {searched && !loading && (
          <>
            <motion.div layout className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-7">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  {fromCity?.name} <ArrowRight size={16} className="inline text-indigo-700" /> {toCity?.name}
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  {new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  | {pax} {pax === 1 ? "adult" : "adults"} |{" "}
                  <span className="font-semibold text-slate-600">{results.length} trains found</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
                  <SlidersHorizontal size={13} className="text-slate-400" />
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm font-semibold text-slate-700 outline-none bg-transparent">
                    <option value="price">Cheapest</option>
                    <option value="duration">Fastest</option>
                    <option value="dep">Earliest</option>
                    <option value="rating">Best Rated</option>
                  </select>
                </div>
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-semibold transition-all shadow-sm ${showFilter ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200 text-slate-700 hover:border-indigo-300"
                    }`}
                >
                  <Filter size={13} /> Filters
                </button>
              </div>
            </motion.div>

            <AnimatePresence>
              {showFilter && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-[1.5rem] border border-slate-200 p-5 mb-5 shadow-sm space-y-4"
                >
                  <div className="flex justify-between">
                    <p className="font-black text-slate-800">Filters</p>
                    <button onClick={() => { setMaxPrice(12000); setDirectOnly(false); }} className="text-xs text-indigo-700 font-semibold hover:underline">
                      Reset
                    </button>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                      Max Price: <span className="text-slate-700 normal-case">Rs {maxPrice.toLocaleString()}</span>
                    </p>
                    <input
                      type="range"
                      min={500}
                      max={12000}
                      step={250}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>Rs 500</span>
                      <span>Rs 12,000</span>
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={directOnly} onChange={(e) => setDirectOnly(e.target.checked)} className="accent-indigo-600 w-4 h-4" />
                    <span className="text-sm font-semibold text-slate-700">Direct routes only</span>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              {results.length > 0 ? (
                results.map((t, i) => <TrainCard key={t.id} t={t} index={i} onBook={handleBookTrain} />)
              ) : (
                <div className="text-center py-24">
                  <Train size={48} className="mx-auto mb-3 text-slate-300" />
                  <p className="font-bold text-slate-500">No trains match your filters</p>
                </div>
              )}
            </div>
          </>
        )}

        {!searched && !loading && (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-5">
              <Train size={36} className="text-indigo-700" />
            </div>
            <p className="text-lg font-black text-slate-700">Search for available trains</p>
            <p className="text-sm text-slate-400 mt-1">Select source, destination and date above</p>
          </div>
        )}
      </section>
    </div>
  );
}
