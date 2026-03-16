import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Plane, 
    Train, 
    Hotel, 
    ChevronLeft, 
    ArrowRight, 
    Check, 
    Wifi, 
    Coffee, 
    Zap, 
    Users, 
    ShieldCheck, 
    Sparkles,
    Armchair,
    Utensils,
    Star,
    Info,
    X,
    Clock,
    ChevronDown
} from "lucide-react";
import toast from "react-hot-toast";
import { MEAL_OPTIONS, formatInr } from "../utils/bookingUtils";

const BookingSelectionPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { 
        type, 
        flight, 
        train, 
        bus, 
        hotel, 
        from, 
        to, 
        fromName, 
        toName, 
        date, 
        pax = 1 
    } = location.state || {};

    const [bookingStep, setBookingStep] = useState(1); // 1: Class/Menu, 2: Seat/Room Selection
    const [selectedClass, setSelectedClass] = useState(type === "flight" ? "Economy" : (type === "train" || type === "bus" ? "Standard" : "Standard"));
    const [selectedMeal, setSelectedMeal] = useState(MEAL_OPTIONS[0]);
    const [showMealMenu, setShowMealMenu] = useState(false);
    const [activeCategory, setActiveCategory] = useState("Veg");
    const [selectedItems, setSelectedItems] = useState([]); // Seats or Rooms
    
    // Redirect if no state
    useEffect(() => {
        if (!location.state) {
            navigate("/");
        }
    }, [location.state, navigate]);

    const item = useMemo(() => flight || train || bus || hotel, [flight, train, bus, hotel]);

    // --- Dynamic Pricing ---
    const classExtra = useMemo(() => {
        if (type === "flight") return selectedClass === "Business" ? 2500 : 0;
        if (type === "train") return selectedClass === "2A" ? 800 : (selectedClass === "1A" ? 1800 : 0);
        return 0;
    }, [type, selectedClass]);

    const totalPrice = useMemo(() => {
        if (!item) return 0;
        const base = item.price || 0;
        const mealPrice = (type === "flight" ? (selectedMeal.price || 0) : 0);
        return base + ((classExtra + mealPrice) * pax);
    }, [item, classExtra, pax, selectedMeal, type]);

    // --- Seat/Room Generation ---
    const seatGrid = useMemo(() => {
        if (type === "flight") {
            const grid = [];
            const ROWS = 12;
            const COLS = 6;
            for (let r = 1; r <= ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    const label = `${r}${String.fromCharCode(65 + c)}`;
                    const isOccupied = Math.random() < 0.3;
                    const isPremium = r < 4;
                    grid.push({ label, isOccupied, isPremium, row: r, col: c });
                }
            }
            return grid;
        }
        if (type === "train") {
            const grid = [];
            const CABINS = 8;
            for (let c = 1; c <= CABINS; c++) {
                ["LB", "MB", "UB", "LB", "MB", "UB", "SL", "SU"].forEach((type, i) => {
                    const label = `${c}-${type}${i+1}`;
                    grid.push({ label, type, isOccupied: Math.random() < 0.25 });
                });
            }
            return grid;
        }
        return [];
    }, [type]);

    const toggleSelection = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(i => i !== id));
        } else {
            if (selectedItems.length < pax) {
                setSelectedItems([...selectedItems, id]);
            } else {
                toast.error(`You can only select ${pax} ${type === "hotel" ? "room" : "seat"}${pax > 1 ? 's' : ''}`);
            }
        }
    };

    const handleConfirm = () => {
        if (selectedItems.length < pax && type !== "hotel") {
            toast.error(`Please select ${pax} seat${pax > 1 ? 's' : ''}`);
            return;
        }

        navigate("/checkout", {
            state: {
                ...location.state,
                [type]: {
                    ...item,
                    price: totalPrice,
                    class: selectedClass,
                    meal: selectedMeal.name,
                    selection: selectedItems,
                    seats: selectedItems.join(", "),
                }
            }
        });
    };

    if (!item) return null;

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <button 
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-slate-400 hover:text-[#CF3425] transition-colors mb-4 font-black uppercase text-[10px] tracking-widest"
                        >
                            <ChevronLeft size={16} /> Back to Search
                        </button>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
                            Customize Your <span className="text-[#CF3425]">Experience</span>
                        </h1>
                        <p className="text-slate-400 font-bold text-sm mt-1">
                            {type.charAt(0).toUpperCase() + type.slice(1)} Selection for {fromName} to {toName}
                        </p>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xl shadow-slate-200/50 flex items-center gap-8">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Total Payable</p>
                            <p className="text-3xl font-black text-slate-900 leading-none">₹{totalPrice.toLocaleString()}</p>
                            <p className="text-[10px] font-black text-[#CF3425] mt-1.5 uppercase tracking-tighter">Inclusive of all taxes</p>
                        </div>
                        <button 
                            onClick={handleConfirm}
                            className="bg-[#CF3425] hover:bg-[#b82e1f] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#CF3425]/20 flex items-center gap-3 transition-all active:scale-95"
                        >
                            Confirm Booking <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10">
                    
                    {/* Left: Summary & Options */}
                    <aside className="space-y-6">
                        {/* Summary Card */}
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                {type === "flight" ? <Plane size={120} /> : (type === "train" || type === "bus" ? <Train size={120} /> : <Hotel size={120} />)}
                            </div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg" style={{ background: item.bg || '#CF3425' }}>
                                        {item.code || (type === "hotel" ? <Hotel /> : "T")}
                                    </div>
                                    <div>
                                        <p className="text-lg font-black">{item.airline || item.name}</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.flightNo || item.trainNo || "Premium Est."}</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <div className="text-left">
                                            <p className="text-2xl font-black leading-none">{item.dep || "14:00"}</p>
                                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-2">{fromName}</p>
                                        </div>
                                        <div className="flex-1 px-4 flex flex-col items-center">
                                            <div className="w-full h-px bg-white/10 relative">
                                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#CF3425]" />
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-black leading-none">{item.arr || "18:00"}</p>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{toName}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                                        <div>
                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Date</p>
                                            <p className="text-xs font-black">{new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Travelers</p>
                                            <p className="text-xs font-black">{pax} Adult{pax > 1 ? 's' : ''}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Class & Meal Selection */}
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm space-y-8">
                            <div>
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <Sparkles size={16} className="text-amber-500" /> Choose Class
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {(type === "flight" ? ["Economy", "Business"] : (type === "train" ? ["3A", "2A", "1A"] : ["Standard", "Deluxe", "Suite"])).map(c => (
                                        <button 
                                            key={c}
                                            onClick={() => setSelectedClass(c)}
                                            className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                                                selectedClass === c 
                                                ? "border-[#CF3425] bg-red-50/50 shadow-lg" 
                                                : "border-slate-50 hover:border-slate-200 bg-white"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedClass === c ? "bg-[#CF3425] text-white" : "bg-slate-100 text-slate-400"}`}>
                                                    <Armchair size={18} />
                                                </div>
                                                <div className="text-left">
                                                    <p className={`text-sm font-black ${selectedClass === c ? "text-slate-900" : "text-slate-600"}`}>{c}</p>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Availability: High</p>
                                                </div>
                                            </div>
                                            {selectedClass === c && <Check size={16} className="text-[#CF3425]" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {type !== "hotel" && (
                                <div>
                                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <Utensils size={16} className="text-[#CF3425]" /> Meal Selection
                                    </h3>
                                    
                                    {type === "flight" && selectedClass === "Business" ? (
                                        <div className="space-y-4">
                                            <div className="flex bg-slate-100 p-1 rounded-2xl">
                                                {["Veg", "Non-Veg"].map(cat => (
                                                    <button
                                                        key={cat}
                                                        onClick={() => setActiveCategory(cat)}
                                                        className={`flex-1 py-2 text-[10px] font-black rounded-xl transition-all ${activeCategory === cat ? "bg-white text-[#CF3425] shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                                                    >
                                                        {cat}
                                                    </button>
                                                ))}
                                            </div>
                                            
                                            <div className="relative">
                                                <button 
                                                    onClick={() => setShowMealMenu(!showMealMenu)}
                                                    className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-slate-100 bg-slate-50 hover:bg-white hover:border-[#CF3425]/30 transition-all font-bold text-sm text-slate-800"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span>{selectedMeal.icon}</span>
                                                        <span>{selectedMeal.name}</span>
                                                    </div>
                                                    <ChevronDown size={16} className={`transition-transform ${showMealMenu ? 'rotate-180' : ''}`} />
                                                </button>
                                                
                                                <AnimatePresence>
                                                    {showMealMenu && (
                                                        <motion.div 
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: 10 }}
                                                            className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl z-50 p-2 max-h-[240px] overflow-y-auto custom-scrollbar"
                                                        >
                                                            {MEAL_OPTIONS.filter(m => m.category === activeCategory || m.category === "Standard").map(m => (
                                                                <button
                                                                    key={m.id}
                                                                    onClick={() => {
                                                                        setSelectedMeal(m);
                                                                        setShowMealMenu(false);
                                                                    }}
                                                                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${selectedMeal.id === m.id ? "bg-red-50 text-[#CF3425]" : "hover:bg-slate-50 text-slate-700"}`}
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <span className="text-lg">{m.icon}</span>
                                                                        <div className="text-left">
                                                                            <p className="text-[11px] font-black">{m.name}</p>
                                                                            <p className="text-[9px] font-bold opacity-60 tracking-wider">
                                                                                {m.price > 0 ? `+ ${formatInr(m.price)}` : "COMPLIMENTARY"}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    {selectedMeal.id === m.id && <Check size={14} />}
                                                                </button>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center px-4">
                                                Exclusively curated for our {selectedClass} class travelers
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-3">
                                            {MEAL_OPTIONS.filter(m => m.category === "Standard").map(m => (
                                                <button 
                                                    key={m.id}
                                                    onClick={() => setSelectedMeal(m)}
                                                    className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 ${
                                                        selectedMeal.id === m.id 
                                                        ? "bg-slate-900 text-white border-slate-900 shadow-lg" 
                                                        : "bg-white text-slate-500 border-slate-50 hover:border-slate-200"
                                                    }`}
                                                >
                                                    <span className="text-xl">{m.icon}</span>
                                                    <div className="text-center">
                                                        <p className="text-[10px] font-black uppercase tracking-tight leading-none mb-1">{m.name}</p>
                                                        <p className={`text-[8px] font-bold ${selectedMeal.id === m.id ? "text-white/60" : "text-slate-400"}`}>
                                                            {m.price > 0 ? `+ ${formatInr(m.price)}` : "FREE"}
                                                        </p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* Right: Interactive Seat Map */}
                    <main className="bg-white rounded-[3rem] border border-slate-100 p-8 md:p-12 shadow-sm relative overflow-hidden min-h-[800px]">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                                    {type === "flight" ? "Aircraft Cabin" : "Coach Compartment"}
                                </h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Select your preferred {type === "hotel" ? "room" : "seat"}</p>
                            </div>
                            <div className="flex items-center gap-4 bg-slate-50 px-5 py-2.5 rounded-2xl border border-slate-100">
                                <div className="text-center border-r border-slate-200 pr-5">
                                    <p className="text-[9px] font-black text-slate-400 uppercase mb-0.5">Selected</p>
                                    <p className="text-sm font-black text-slate-900">{selectedItems.length} / {pax}</p>
                                </div>
                                <div className="text-left">
                                     <p className="text-[9px] font-black text-[#CF3425] uppercase mb-0.5">Items</p>
                                     <p className="text-[10px] font-black text-slate-800 truncate max-w-[100px]">{selectedItems.join(", ") || "-"}</p>
                                </div>
                            </div>
                        </div>

                        {type === "flight" && (
                            <div className="relative max-w-[450px] mx-auto bg-slate-50 rounded-[5rem] p-12 shadow-inner border border-slate-200">
                                {/* Plane Nose */}
                                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 h-80 bg-slate-50 border-x-4 border-t-4 border-slate-200 rounded-full z-0 flex flex-col items-center pt-16">
                                    <div className="w-48 h-10 bg-slate-200/50 rounded-full blur-xl" />
                                    <div className="flex gap-4 mt-4">
                                        <div className="w-16 h-8 bg-slate-900/5 rounded-t-lg border-x border-t border-slate-200 flex items-center justify-center">
                                            <div className="w-10 h-1 bg-white/20 rounded-full" />
                                        </div>
                                        <div className="w-16 h-8 bg-slate-900/5 rounded-t-lg border-x border-t border-slate-200 flex items-center justify-center">
                                            <div className="w-10 h-1 bg-white/20 rounded-full" />
                                        </div>
                                    </div>
                                </div>

                                {/* Seat Map Scroll Area */}
                                <div className="relative z-10 grid grid-cols-6 gap-x-4 gap-y-6 pt-10">
                                    {seatGrid.map((s, i) => (
                                        <React.Fragment key={s.label}>
                                            {i % 6 === 3 && <div className="w-8" />} {/* Aisle */}
                                            <button 
                                                disabled={s.isOccupied}
                                                onClick={() => toggleSelection(s.label)}
                                                className={`group relative aspect-square rounded-xl border-2 transition-all flex items-center justify-center ${
                                                    s.isOccupied 
                                                    ? "bg-slate-200 border-slate-300 cursor-not-allowed" 
                                                    : selectedItems.includes(s.label)
                                                    ? "bg-[#CF3425] border-[#CF3425] shadow-lg shadow-[#CF3425]/30 scale-110"
                                                    : s.isPremium 
                                                    ? "bg-amber-50 border-amber-200 hover:border-amber-400"
                                                    : "bg-white border-slate-100 hover:border-slate-300"
                                                }`}
                                            >
                                                <div className={`text-[9px] font-black ${
                                                    selectedItems.includes(s.label) ? "text-white" : "text-slate-400"
                                                }`}>
                                                    {s.label}
                                                </div>
                                                
                                                {/* Seat Arms Decoration */}
                                                {!s.isOccupied && (
                                                    <div className={`absolute -bottom-1 w-2/3 h-1 rounded-full ${
                                                        selectedItems.includes(s.label) ? "bg-white/40" : "bg-slate-100"
                                                    }`} />
                                                )}
                                            </button>
                                        </React.Fragment>
                                    ))}
                                </div>

                                {/* Legend */}
                                <div className="mt-16 flex justify-center gap-6 border-t border-slate-200 pt-8">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-md bg-white border border-slate-200" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-md bg-amber-50 border border-amber-200" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Premium</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-md bg-[#CF3425]" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selected</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-md bg-slate-200" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Occupied</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {type === "train" && (
                            <div className="max-w-[600px] mx-auto space-y-12 pb-20">
                                <p className="text-center font-black text-slate-300 uppercase tracking-[0.4em] text-xs">A-Coach Compartment View</p>
                                
                                <div className="space-y-4">
                                    {Array.from({ length: 4 }).map((_, cabinIdx) => (
                                        <div key={cabinIdx} className="bg-slate-50 border-2 border-slate-100 rounded-[2rem] p-8 grid grid-cols-2 gap-10 relative group hover:border-[#CF3425]/10 transition-colors">
                                           <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-200 -translate-y-1/2 pointer-events-none z-0" />
                                           
                                           {/* Main Cubicle (LB, MB, UB) */}
                                           <div className="grid grid-cols-3 gap-3 relative z-10">
                                                {["LB", "MB", "UB", "LB", "MB", "UB"].slice(0, 3).map((berth, i) => {
                                                    const label = `${cabinIdx + 1}-${berth}${i + 1}`;
                                                    const isOccupied = seatGrid.find(s => s.label === label)?.isOccupied;
                                                    return (
                                                        <button 
                                                            key={label}
                                                            disabled={isOccupied}
                                                            onClick={() => toggleSelection(label)}
                                                            className={`h-24 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                                                                isOccupied 
                                                                ? "bg-slate-200 border-slate-300"
                                                                : selectedItems.includes(label)
                                                                ? "bg-[#CF3425] border-[#CF3425] text-white shadow-xl scale-105"
                                                                : "bg-white border-slate-200 hover:border-[#CF3425]/40"
                                                            }`}
                                                        >
                                                            <div className="w-2 h-8 rounded-full bg-slate-200/20" />
                                                            <span className="text-[9px] font-black uppercase tracking-widest">{berth}</span>
                                                            <span className="text-[8px] opacity-60">{label}</span>
                                                        </button>
                                                    );
                                                })}
                                           </div>

                                           {/* Side Berths (SL, SU) */}
                                           <div className="flex flex-col gap-3 justify-center relative z-10 pl-10 border-l border-dashed border-slate-200">
                                                {["SL", "SU"].map((berth, i) => {
                                                    const label = `${cabinIdx + 1}-${berth}${i + 1}`;
                                                    const isOccupied = seatGrid.find(s => s.label === label)?.isOccupied;
                                                    return (
                                                        <button 
                                                            key={label}
                                                            disabled={isOccupied}
                                                            onClick={() => toggleSelection(label)}
                                                            className={`h-16 w-32 rounded-xl border-2 transition-all flex flex-col items-center justify-center ${
                                                                isOccupied 
                                                                ? "bg-slate-200 border-slate-300"
                                                                : selectedItems.includes(label)
                                                                ? "bg-[#CF3425] border-[#CF3425] text-white shadow-xl scale-105"
                                                                : "bg-white border-slate-200 hover:border-[#CF3425]/40"
                                                            }`}
                                                        >
                                                            <span className="text-[9px] font-black uppercase tracking-widest">{berth}</span>
                                                            <span className="text-[8px] opacity-60">{label}</span>
                                                        </button>
                                                    );
                                                })}
                                           </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {type === "hotel" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { id: "Standard", price: 0, img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&q=80" },
                                    { id: "Deluxe", price: 2500, img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80" },
                                    { id: "Exec Suite", price: 5500, img: "https://images.unsplash.com/photo-1582719478250-c89cae4df85b?w=400&q=80" }
                                ].map(room => (
                                    <button 
                                        key={room.id}
                                        onClick={() => toggleSelection(room.id)}
                                        className={`group rounded-[2rem] border-2 overflow-hidden transition-all text-left ${
                                            selectedItems.includes(room.id) 
                                            ? "border-[#CF3425] bg-white shadow-2xl scale-[1.02]" 
                                            : "border-slate-100 hover:border-slate-200 bg-white"
                                        }`}
                                    >
                                        <div className="h-48 overflow-hidden relative">
                                            <img src={room.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={room.id} />
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                                                <Star size={12} className="text-amber-500 fill-amber-500" />
                                                <span className="text-xs font-black">4.9</span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="text-lg font-black text-slate-800">{room.id} Room</h4>
                                                <p className="text-sm font-black text-[#CF3425]">+ ₹{room.price.toLocaleString()}</p>
                                            </div>
                                            <p className="text-xs text-slate-400 font-bold leading-relaxed mb-6">
                                                Premium bedding, high-speed WiFi, and 24/7 room service included.
                                            </p>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1 text-[10px] font-black text-slate-500 uppercase tracking-widest"><Wifi size={12} /> Wifi</div>
                                                <div className="flex items-center gap-1 text-[10px] font-black text-slate-500 uppercase tracking-widest"><Coffee size={12} /> Breakfast</div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                        
                        {/* Decorative background circle */}
                        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#CF3425]/5 blur-[100px] rounded-full pointer-events-none" />
                    </main>
                </div>
            </div>

            {/* Float Bottom Mobile Action */}
            <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
                <button 
                    onClick={handleConfirm}
                    className="w-full bg-[#CF3425] text-white py-5 rounded-[2rem] font-black uppercase tracking-widest shadow-2xl flex items-center justify-center gap-3"
                >
                    Pay ₹{totalPrice.toLocaleString()} <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default BookingSelectionPage;
