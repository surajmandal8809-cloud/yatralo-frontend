import React from "react";
import { User } from "lucide-react";

export default function PassengerDetailsComponent({ passengers, setPassengers, isGlobal, pax, userData, onNext }) {
    return (
        <div className="lg:col-span-2 space-y-6">
            {/* Passenger Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <User className="text-[#f97316]" size={20} />
                        <h3 className="text-lg font-black text-slate-900">Passenger Details</h3>
                    </div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{pax} Traveller{pax > 1 ? 's' : ''}</span>
                </div>

                <div className="p-6 space-y-6">
                    {!userData && (
                        <div className="bg-violet-50/50 border border-violet-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#7c3aed] shadow-sm border border-violet-50">
                                    <User size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900">Log in to view your saved traveler list</p>
                                    <p className="text-[10px] font-bold text-[#7c3aed] uppercase tracking-widest">Unlock amazing deals & faster checkout</p>
                                </div>
                            </div>
                            <button className="px-8 py-3 bg-white text-[#7c3aed] border border-violet-100 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-violet-50 transition-all">Login Now</button>
                        </div>
                    )}

                    {passengers.map((p, i) => (
                        <div key={i} className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-[#f97316]/20 transition-all">
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#f97316]" />
                                ADULT {i + 1}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                                <div className="md:col-span-3">
                                    <label className="text-[11px] font-black text-slate-500 uppercase mb-1.5 block">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Same as passport/ID"
                                        value={p.name}
                                        onChange={(e) => {
                                            const newP = [...passengers];
                                            newP[i].name = e.target.value;
                                            setPassengers(newP);
                                        }}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:border-violet-400 outline-none text-sm font-bold transition-all"
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <label className="text-[11px] font-black text-slate-500 uppercase mb-1.5 block">Age</label>
                                    <input
                                        type="number"
                                        placeholder="Age"
                                        value={p.age}
                                        onChange={(e) => {
                                            const newP = [...passengers];
                                            newP[i].age = e.target.value;
                                            setPassengers(newP);
                                        }}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:border-violet-400 outline-none text-sm font-bold transition-all"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-[11px] font-black text-slate-500 uppercase mb-1.5 block">Gender</label>
                                    <select
                                        value={p.gender}
                                        onChange={(e) => {
                                            const newP = [...passengers];
                                            newP[i].gender = e.target.value;
                                            setPassengers(newP);
                                        }}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:border-violet-400 outline-none text-sm font-bold transition-all appearance-none bg-no-repeat bg-[right_1rem_center]"
                                    >
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>
                                {isGlobal && (
                                    <div className="md:col-span-6">
                                        <label className="text-[11px] font-black text-slate-500 uppercase mb-1.5 block">Passport Number</label>
                                        <input
                                            type="text"
                                            placeholder="Passport ID (Required for International)"
                                            value={p.passport}
                                            onChange={(e) => {
                                                const newP = [...passengers];
                                                newP[i].passport = e.target.value;
                                                setPassengers(newP);
                                            }}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:border-violet-400 outline-none text-sm font-bold transition-all"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="flex justify-end pt-4">
                <button
                    onClick={onNext}
                    className="px-10 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-black rounded-2xl shadow-xl hover:opacity-90 transition-all uppercase tracking-widest"
                >
                    Review Details
                </button>
            </div>
        </div>
    );
}
