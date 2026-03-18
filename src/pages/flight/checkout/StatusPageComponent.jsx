import React from "react";
import { CheckCircle2, Plane, Train, Hotel, Download, Share2, Calendar, Info } from "lucide-react";

export default function StatusPageComponent({ bookingResult, passengers, type, fromName, toName }) {
    if (!bookingResult) return null;

    const isFlight = type === "flight";
    const isTrain = type === "train";
    const Icon = isFlight ? Plane : (isTrain ? Train : Hotel);

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500 pb-20">
            {/* Success Hero */}
            <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100">
                <div className={`bg-gradient-to-br ${bookingResult.status === "confirmed" ? "from-emerald-500 to-teal-600" : "from-rose-500 to-pink-600"} p-10 text-white text-center relative overflow-hidden`}>
                    {/* Decorative Background Icon */}
                    <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
                        <Icon size={240} />
                    </div>
                    
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white/30 scale-110 relative z-10 shadow-xl">
                        <CheckCircle2 size={48} />
                    </div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight relative z-10">Booking {bookingResult.status === "confirmed" ? "Confirmed!" : "Pending"}</h1>
                    <p className="text-emerald-50 font-bold opacity-90 relative z-10">
                        {bookingResult.status === "confirmed" 
                            ? "Your journey is locked in. Get ready to fly!" 
                            : "We are confirming your payment. Please wait."}
                    </p>
                    
                    <div className="mt-8 inline-flex items-center gap-6 bg-black/20 p-6 rounded-3xl backdrop-blur-md border border-white/20 relative z-10 shadow-2xl">
                        <div className="text-left">
                            <p className="text-[10px] uppercase font-black tracking-[0.2em] opacity-60 mb-1">PNR NUMBER</p>
                            <p className="text-2xl font-black tracking-tighter text-white">{bookingResult.bookingRef}</p>
                        </div>
                        <div className="w-px h-10 bg-white/20" />
                        <div className="text-left font-mono">
                            <p className="text-[10px] uppercase font-black tracking-[0.2em] opacity-60 mb-1">Status</p>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <p className="text-lg font-black uppercase text-emerald-100 tracking-widest">{bookingResult.status}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Ticket Section */}
                <div className="p-8 md:p-12 bg-[#f8fafc] flex flex-col items-center">
                    <div className="w-full max-w-3xl bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden relative">
                        {/* Cutout Circles for Ticket Look */}
                        <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-8 h-8 rounded-full bg-[#f8fafc] border border-slate-200 z-10 shadow-inner" />
                        <div className="absolute top-1/2 -translate-y-1/2 -right-4 w-8 h-8 rounded-full bg-[#f8fafc] border border-slate-200 z-10 shadow-inner" />

                        {/* Ticket Header */}
                        <div className="bg-slate-900 px-10 py-8 flex items-center justify-between text-white relative">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-[#7c3aed] to-[#f97316] rounded-2xl flex items-center justify-center shadow-xl transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                                    <Icon size={28} />
                                </div>
                                <div>
                                    <p className="text-xl font-black tracking-tighter">{bookingResult.providerName}</p>
                                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mt-0.5">{bookingResult.providerCode}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 mb-1">Transaction Total</p>
                                <p className="text-2xl font-black text-[#f97316] tracking-tighter leading-none">₹{bookingResult.totalPrice?.toLocaleString('en-IN')}</p>
                            </div>
                        </div>

                        <div className="p-10">
                            {/* Route & Journey Details */}
                            <div className="flex justify-between items-center mb-12 relative">
                                <div className="flex-1">
                                    <p className="text-5xl font-black text-slate-900 leading-none tracking-tighter">{bookingResult.fromCode}</p>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-3 truncate max-w-[150px]">{fromName}</p>
                                    <div className="mt-4 flex items-center gap-2">
                                        <div className="px-3 py-1 bg-violet-50 rounded-full">
                                            <p className="text-sm font-black text-[#7c3aed]">{bookingResult.departTime}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center px-10 relative">
                                    <div className="w-48 flex items-center gap-2 mb-3">
                                        <div className="w-2 h-2 rounded-full bg-[#7c3aed]" />
                                        <div className="flex-1 h-px bg-slate-200 border-t-2 border-dashed relative">
                                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                                                <Icon size={20} className="text-[#f97316]" />
                                            </div>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-[#f97316]" />
                                    </div>
                                    <span className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
                                        {bookingResult.type === 'flight' ? 'Premium Cabin' : 'Standard Coach'}
                                    </span>
                                </div>

                                <div className="flex-1 text-right">
                                    <p className="text-5xl font-black text-slate-900 leading-none tracking-tighter">{bookingResult.toCode}</p>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-3 truncate max-w-[150px] ml-auto">{toName}</p>
                                    <div className="mt-4 flex items-center gap-2 justify-end">
                                        <div className="px-3 py-1 bg-orange-50 rounded-full">
                                            <p className="text-sm font-black text-[#f97316]">{bookingResult.arriveTime}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-10 py-8 border-y border-dashed border-slate-200">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Travel Date</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#7c3aed]">
                                            <Calendar size={20} />
                                        </div>
                                        <p className="text-base font-black text-slate-900">
                                            {new Date(bookingResult.travelDate).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Booking ID</p>
                                    <div className="flex items-center gap-3 justify-end">
                                        <p className="text-base font-mono font-black text-slate-900">#{bookingResult._id?.slice(-8).toUpperCase()}</p>
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#f97316]">
                                            <Info size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 space-y-4">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-2 h-4 bg-[#7c3aed] rounded-full" /> Passenger Manifesto
                                    </h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">{passengers.length} Adult{passengers.length > 1 ? 's' : ''}</p>
                                </div>
                                
                                {passengers.map((p, i) => {
                                    const seatLabel = bookingResult.seats ? bookingResult.seats.split(",")[i]?.trim() : `${String.fromCharCode(65 + i)}12`;
                                    return (
                                        <div key={i} className="group flex justify-between items-center bg-white hover:bg-slate-50 p-6 rounded-3xl border border-slate-100 transition-all hover:shadow-lg hover:border-violet-100 hover:-translate-y-0.5">
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 bg-gradient-to-br from-violet-100 to-orange-100 text-[#7c3aed] rounded-2xl flex items-center justify-center font-black text-sm shadow-sm transition-transform group-hover:scale-110">
                                                    {i + 1}
                                                </div>
                                                <div>
                                                    <p className="text-lg font-black text-slate-900 tracking-tight">{p.name}</p>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 py-0.5 bg-slate-100 rounded-md">{p.gender}</span>
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 py-0.5 bg-slate-100 rounded-md">{p.age} Yrs</span>
                                                        {p.passport && <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest px-2 py-0.5 bg-blue-50 rounded-md">ID: {p.passport}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Seat Number</p>
                                                <div className="px-4 py-2 bg-slate-900 text-white rounded-xl font-mono text-lg font-black tracking-widest shadow-lg group-hover:bg-[#7c3aed] transition-colors">
                                                    {seatLabel}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Ticket Footer with QR */}
                            <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-10 pt-10 border-t border-dashed border-slate-200">
                                <div className="flex items-center gap-6">
                                    <div className="w-32 h-32 bg-white rounded-3xl border-2 border-slate-100 flex items-center justify-center p-3 shadow-2xl relative group">
                                        <div className="w-full h-full bg-slate-50 flex flex-wrap gap-1 p-1">
                                            {Array.from({ length: 144 }).map((_, i) => (
                                                <div key={i} className={`w-[6%] h-[6%] ${Math.random() > 0.4 ? 'bg-slate-900' : 'bg-transparent'}`}></div>
                                            ))}
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm rounded-3xl">
                                             <p className="text-[8px] font-black uppercase text-[#7c3aed]">Verified Ticket</p>
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-black text-slate-800 uppercase tracking-widest mb-1">Boarding Pass QR</p>
                                        <p className="text-[10px] font-bold text-slate-400 max-w-[140px] leading-relaxed">Present this code at the terminal for fast boarding.</p>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-[2rem] text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95">
                                        <Download size={16} /> Download PDF
                                    </button>
                                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-slate-100 text-slate-900 rounded-[2rem] text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm active:scale-95">
                                        <Share2 size={16} /> Share Ticket
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Decorative Barcode Background */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7c3aed] via-[#f97316] to-[#7c3aed] opacity-20" />
                    </div>
                </div>
            </div>
        </div>
    );
}
