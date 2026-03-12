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
  Plane,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Users,
  Wifi,
  Coffee,
} from "lucide-react";
import { addBooking } from "../utils/bookingStore";
import { getBaseURL } from "../services/baseApi";

const CITIES = [
  { code: "DEL", name: "New Delhi", airport: "Indira Gandhi International" },
  { code: "BOM", name: "Mumbai", airport: "Chhatrapati Shivaji Maharaj Intl" },
  { code: "BLR", name: "Bengaluru", airport: "Kempegowda International" },
  { code: "MAA", name: "Chennai", airport: "Chennai International" },
  { code: "CCU", name: "Kolkata", airport: "Netaji Subhas Chandra Bose Intl" },
  { code: "HYD", name: "Hyderabad", airport: "Rajiv Gandhi International" },
  { code: "PNQ", name: "Pune", airport: "Pune Airport" },
  { code: "AMD", name: "Ahmedabad", airport: "Sardar Vallabhbhai Patel Intl" },
  { code: "JAI", name: "Jaipur", airport: "Jaipur International" },
  { code: "GOI", name: "Goa", airport: "Dabolim Airport" },
  { code: "COK", name: "Kochi", airport: "Cochin International" },
  { code: "LKO", name: "Lucknow", airport: "Chaudhary Charan Singh Intl" },
  { code: "IXC", name: "Chandigarh", airport: "Chandigarh International" },
  { code: "SXR", name: "Srinagar", airport: "Srinagar Airport" },
  { code: "GAU", name: "Guwahati", airport: "Lokpriya Gopinath Bordoloi Intl" },
];

const AIRLINES = [
  { name: "IndiGo", code: "6E", bg: "#1e3766" },
  { name: "Air India", code: "AI", bg: "#C8102E" },
  { name: "SpiceJet", code: "SG", bg: "#b22222" },
  { name: "Vistara", code: "UK", bg: "#5c0057" },
  { name: "AirAsia India", code: "I5", bg: "#d0112b" },
  { name: "Akasa Air", code: "QP", bg: "#f97316" },
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

function generateFlights(from, to, date, pax) {
  const seed = [...(from + to + date)].reduce((a, c) => a + c.charCodeAt(0), 0);
  const r = seededRand(seed);
  return Array.from({ length: Math.floor(r() * 6) + 6 }, (_, i) => {
    const airline = AIRLINES[Math.floor(r() * AIRLINES.length)];
    const dep = Math.floor(r() * 18 * 60) + 5 * 60;
    const dur = Math.floor(r() * 180) + 60;
    const base = Math.floor(r() * 10000) + 3000;
    return {
      id: `F${i}-${seed}`,
      airline: airline.name,
      code: airline.code,
      bg: airline.bg,
      flightNo: `${airline.code}${Math.floor(r() * 900) + 100}`,
      dep: toTime(dep),
      arr: toTime(dep + dur),
      depMins: dep,
      duration: dur,
      stops: r() < 0.55 ? 0 : 1,
      price: Math.round((base * pax) / 100) * 100,
      perPax: Math.round(base / 100) * 100,
      seats: Math.floor(r() * 60) + 2,
      wifi: r() > 0.5,
      meal: r() > 0.45,
      refundable: r() > 0.5,
      rating: (3.5 + r() * 1.5).toFixed(1),
    };
  }).sort((a, b) => a.price - b.price);
}

async function fetchAmadeusFlights({ from, to, date, pax, nonstop }) {
  const params = new URLSearchParams({
    from,
    to,
    date,
    adults: String(pax),
    nonstop: String(Boolean(nonstop)),
    max: "25",
    currency: "INR",
  });

  const response = await fetch(`${getBaseURL()}/flights/search?${params.toString()}`);
  const payload = await response.json();

  if (!response.ok || !payload?.status) {
    throw new Error(payload?.message || "Unable to fetch flights from Amadeus.");
  }

  return Array.isArray(payload.data) ? payload.data : [];
}

function CityBox({ value, onChange, label }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [list, setList] = useState(CITIES);
  const [loading, setLoading] = useState(false);
  const sel = list.find((c) => c.code === value) || CITIES.find((c) => c.code === value);

  useEffect(() => {
    if (!q || q.length < 2) {
      setList(CITIES);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`${getBaseURL()}/flights/cities?keyword=${q}`);
        const payload = await res.json();
        if (payload.status && payload.data.length > 0) {
          setList(payload.data);
        }
      } catch (err) {
        console.error("City search failed:", err);
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [q]);

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
        {sel ? (
          <div>
            <p className="text-xl font-black text-slate-900 leading-none tracking-tight">{sel.code}</p>
            <p className="text-xs text-slate-400 truncate max-w-[140px] mt-0.5">{sel.name}</p>
          </div>
        ) : (
          <p className="text-slate-500 text-sm">Select city</p>
        )}
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl z-40 overflow-hidden border border-slate-100">
          <div className="p-2.5 border-b border-slate-100 flex items-center gap-2">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search city or airport..."
              className="w-full text-sm px-3 py-2 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-300 border border-transparent focus:border-indigo-300"
            />
            {loading && <RefreshCw size={14} className="animate-spin text-slate-400 mr-2" />}
          </div>
          <div className="max-h-52 overflow-y-auto">
            {list.map((c) => (
              <button
                key={`${c.code}-${c.airport}`}
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
                  <p className="text-xs text-slate-400">{c.airport}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FlightCard({ f, index, onBook }) {
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
          <div className="flex items-center gap-3 min-w-[130px]">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-black shadow flex-shrink-0" style={{ background: f.bg }}>
              {f.code}
            </div>
            <div>
              <p className="text-sm font-black text-slate-800">{f.airline}</p>
              <p className="text-xs text-slate-400 font-mono">{f.flightNo}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-1 justify-center min-w-[200px]">
            <p className="text-2xl font-black text-slate-900">{f.dep}</p>
            <div className="flex-1 flex flex-col items-center">
              <p className="text-xs text-slate-400 font-semibold mb-1">{durLabel(f.duration)}</p>
              <div className="w-full flex items-center gap-1.5">
                <div className="flex-1 h-px bg-slate-200" />
                <Plane size={13} className="text-indigo-600" />
                <div className="flex-1 h-px bg-slate-200" />
              </div>
              <p className={`text-xs font-bold mt-1 ${f.stops === 0 ? "text-emerald-600" : "text-amber-600"}`}>
                {f.stops === 0 ? "Non-stop" : `${f.stops} stop`}
              </p>
            </div>
            <p className="text-2xl font-black text-slate-900">{f.arr}</p>
          </div>

          <div className="text-right min-w-[110px]">
            <p className="text-2xl font-black text-indigo-700">Rs {f.price.toLocaleString()}</p>
            <p className="text-xs text-slate-400">Rs {f.perPax.toLocaleString()} / person</p>
            <div className="flex items-center justify-end gap-0.5 mt-1">
              <Star size={10} className="fill-amber-400 text-amber-400" />
              <span className="text-xs text-slate-500 font-semibold">{f.rating}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <button
              onClick={() => onBook(f)}
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
          {f.seats <= 9 && <span className="text-xs font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">Only {f.seats} left</span>}
          {f.refundable && (
            <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 size={9} /> Refundable
            </span>
          )}
          {f.wifi && (
            <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200 flex items-center gap-1">
              <Wifi size={9} /> Wi-Fi
            </span>
          )}
          {f.meal && (
            <span className="text-xs font-bold bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full border border-orange-200 flex items-center gap-1">
              <Coffee size={9} /> Meal
            </span>
          )}
        </div>
      </div>

      {open && (
        <div className="border-t border-dashed border-slate-100 bg-slate-50/80 p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-xs font-black uppercase text-slate-400 mb-1 tracking-wider">Check-in</p>
              <p className="font-semibold text-slate-700">15 kg included</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-slate-400 mb-1 tracking-wider">Cabin</p>
              <p className="font-semibold text-slate-700">7 kg included</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-slate-400 mb-1 tracking-wider">Aircraft</p>
              <p className="font-semibold text-slate-700">Airbus A320neo</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-slate-400 mb-1 tracking-wider">Cancellation</p>
              <p className={`font-semibold ${f.refundable ? "text-emerald-600" : "text-red-500"}`}>
                {f.refundable ? "Free (24h before)" : "Non-refundable"}
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function FlightsPage() {
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
  const [tripType, setTripType] = useState("oneway");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [sortBy, setSortBy] = useState("price");
  const [maxPrice, setMaxPrice] = useState(60000);
  const [nonstop, setNonstop] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const didAutoSearch = useRef(false);

  const fromCity = CITIES.find((c) => c.code === from);
  const toCity = CITIES.find((c) => c.code === to);

  const handleSearch = useCallback(async () => {
    if (!from || !to || from === to) return;
    setLoading(true);
    try {
      const apiFlights = await fetchAmadeusFlights({
        from,
        to,
        date,
        pax,
        nonstop,
      });
      setFlights(apiFlights);
      if (apiFlights.length === 0) {
        toast("No live offers found for selected route/date.");
      }
    } catch (error) {
      toast.error(error.message || "Live search failed, showing sample fares.");
      setFlights(generateFlights(from, to, date, pax));
    } finally {
      setLoading(false);
      setSearched(true);
    }
  }, [from, to, date, pax, nonstop]);

  const handleBookFlight = useCallback(
    (flight) => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to book your flight");
        navigate("/auth/login");
        return;
      }
      navigate("/checkout", {
        state: {
          flight,
          type: "flight",
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
      [...flights]
        .filter((f) => f.price <= maxPrice && (!nonstop || f.stops === 0))
        .sort((a, b) =>
          sortBy === "price"
            ? a.price - b.price
            : sortBy === "duration"
              ? a.duration - b.duration
              : sortBy === "dep"
                ? a.depMins - b.depMins
                : parseFloat(b.rating) - parseFloat(a.rating)
        ),
    [flights, maxPrice, nonstop, sortBy]
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative h-[72vh] min-h-[520px] flex items-center justify-center overflow-hidden">
        <video
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/assets/Banner.mp4" type="video/mp4" />
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
            <span className="text-xs font-black tracking-[0.3em] uppercase text-white">Flight Discovery</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6"
          >
            Discover{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Better
            </span>{" "}
            Flights
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Search, compare, and book with clear fares and fast confirmations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              { icon: <Plane size={13} />, label: "100+ Airlines" },
              { icon: <Sparkles size={13} />, label: "Best Price Picks" },
              { icon: <Star size={13} />, label: "Top Rated Routes" },
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
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-900/10 p-4 md:p-5 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              {[["oneway", "One Way"], ["roundtrip", "Round Trip"]].map(([v, l]) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setTripType(v)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${tripType === v ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                >
                  {l}
                </button>
              ))}
            </div>

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
                  <span className="font-semibold text-slate-600">{results.length} flights found</span>
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
                    <button onClick={() => { setMaxPrice(60000); setNonstop(false); }} className="text-xs text-indigo-700 font-semibold hover:underline">
                      Reset
                    </button>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                      Max Price: <span className="text-slate-700 normal-case">Rs {maxPrice.toLocaleString()}</span>
                    </p>
                    <input
                      type="range"
                      min={2000}
                      max={60000}
                      step={500}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>Rs 2,000</span>
                      <span>Rs 60,000</span>
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={nonstop} onChange={(e) => setNonstop(e.target.checked)} className="accent-indigo-600 w-4 h-4" />
                    <span className="text-sm font-semibold text-slate-700">Non-stop only</span>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              {results.length > 0 ? (
                results.map((f, i) => <FlightCard key={f.id} f={f} index={i} onBook={handleBookFlight} />)
              ) : (
                <div className="text-center py-24">
                  <Plane size={48} className="mx-auto mb-3 text-slate-300" />
                  <p className="font-bold text-slate-500">No flights match your filters</p>
                </div>
              )}
            </div>
          </>
        )}

        {!searched && !loading && (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-5">
              <Plane size={36} className="text-indigo-700" />
            </div>
            <p className="text-lg font-black text-slate-700">Search for available flights</p>
            <p className="text-sm text-slate-400 mt-1">Select origin, destination and date above</p>
          </div>
        )}
      </section>
    </div>
  );
}
