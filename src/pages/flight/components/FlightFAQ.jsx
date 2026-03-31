import React, { useState } from "react";
import { Plus, Minus, Search, HelpCircle, ArrowRight } from "lucide-react";

const FlightFAQ = () => {
    const questions = [
        {
            q: "How do I make a flight booking on Yatralo?",
            a: "Booking a flight on Yatralo is extremely simple. Just enter your source, destination, and dates on the search widget, choose from the list of available flights, and proceed to payment. We offer multiple secure payment options for a hassle-free experience."
        },
        {
            q: "Can I avail domestic flight offers on Yatralo?",
            a: "Yes! We regularly update our 'Offers' section with exclusive domestic flight deals. You can use coupon codes like FLYLO or bank-specific cards to get significant discounts on your booking."
        },
        {
            q: "How can I check the status of my flight booking?",
            a: "Once your booking is confirmed, you will receive an E-ticket via email. You can also view and manage your flight status through the 'My Trips' section on our website or app using your PNR or booking ID."
        },
        {
            q: "What documents are required for domestic flight travel?",
            a: "For domestic travel in India, any government-issued ID proof (Aadhar Card, PAN Card, Voter ID, Driving License, or Passport) is required. Ensure your name on the ID matches your flight ticket."
        }
    ];

    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="bg-[#f8f9fa] py-24 px-6 border-t border-slate-100">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start gap-16">
                
                <div className="md:w-1/3">
                    <div className="bg-[#7c3aed] w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white mb-8 shadow-2xl shadow-indigo-200">
                        <HelpCircle size={32} />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-6">
                        Flight <br />
                        Booking <br />
                        FAQs
                    </h2>
                    <p className="text-slate-500 font-medium text-xs leading-relaxed mb-8 italic">
                        Everything you need to know about booking with Yatralo
                    </p>
                    <button className="flex items-center gap-2 text-[#f97316] font-black text-[10px] uppercase tracking-widest border-b-2 border-orange-200 pb-2 hover:gap-3 transition-all">
                        Support Center <ArrowRight size={14} />
                    </button>
                </div>

                <div className="md:w-2/3 space-y-4">
                    {questions.map((item, i) => (
                        <div key={i} className={`bg-white rounded-[1.8rem] border border-slate-100 overflow-hidden transition-all ${openIndex === i ? 'shadow-2xl shadow-indigo-100' : 'hover:shadow-lg'}`}>
                            <button 
                                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                                className="w-full h-full p-6 md:p-8 flex items-center justify-between group transition-colors"
                            >
                                <span className={`text-md md:text-lg font-black tracking-tight text-left transition-colors ${openIndex === i ? 'text-[#7c3aed]' : 'text-slate-900'}`}>
                                    {item.q}
                                </span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === i ? 'bg-[#7c3aed] text-white rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-900'}`}>
                                    {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                                </div>
                            </button>
                            
                            <div className={`transition-all duration-500 ease-in-out border-t border-slate-50 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-6 md:p-8 pt-0 text-slate-500 font-medium text-xs leading-relaxed italic">
                                    {item.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FlightFAQ;
