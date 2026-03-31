import React from "react";
import { ShieldCheck, ArrowLeft, Globe, MapPin, ClipboardList, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TravelGuidelines = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-[#7c3aed] transition-colors mb-8 font-black uppercase text-[10px] tracking-widest"
                >
                    <ArrowLeft size={16} /> Back to Search
                </button>

                <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-2xl shadow-slate-200/50">
                    <div className="bg-blue-50 w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-blue-600 mb-8">
                        <ShieldCheck size={40} />
                    </div>

                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">
                        Current Travel Guidelines
                    </h1>
                    <p className="text-slate-500 font-medium italic text-sm mb-12">
                        Stay updated with the latest travel requirements for domestic and international destinations.
                    </p>

                    <div className="space-y-8">
                        <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                            <div className="flex items-center gap-4 mb-6">
                                <MapPin className="text-[#f97316]" size={24} />
                                <h3 className="text-xl font-black text-slate-900">Domestic Guidelines</h3>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                                    <p className="text-slate-600 text-sm italic">Web check-in is mandatory for all airlines at least 48 hours before departure.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                                    <p className="text-slate-600 text-sm italic">Carry a valid government ID proof: Aadhaar, PAN Card, or Passport.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                                    <p className="text-slate-600 text-sm italic">Reach the airport at least 2 hours before your flight.</p>
                                </li>
                            </ul>
                        </div>

                        <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                            <div className="flex items-center gap-4 mb-6">
                                <Globe className="text-[#7c3aed]" size={24} />
                                <h3 className="text-xl font-black text-slate-900">International Guidelines</h3>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                                    <p className="text-slate-600 text-sm italic">A valid passport and destiny-specific visa are essential.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                                    <p className="text-slate-600 text-sm italic">Check for destination health declarations & vaccination certificates.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                                    <p className="text-slate-600 text-sm italic">Arrive 4 hours prior for international departures.</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 p-6 bg-blue-600 rounded-[2rem] text-white flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Info size={24} />
                            <p className="text-sm font-black uppercase tracking-widest">More Details? Consult Experts</p>
                        </div>
                        <button className="bg-white text-blue-600 px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelGuidelines;
