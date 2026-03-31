import React, { useState } from "react";
import { Plus, Minus, HelpCircle, ArrowRight } from "lucide-react";

const HotelFAQ = () => {
    const questions = [
        {
            q: "How do I book a hotel on Yatralo?",
            a: "Booking a hotel is simple. Enter your destination, check-in and check-out dates, and number of guests. Choose from our wide range of properties, compare prices, and complete your payment securely."
        },
        {
            q: "Are there any exclusive hotel offers for members?",
            a: "Yes! Yatralo members get access to exclusive 'Member-only Deals' with up to 50% discount on select 5-star properties. Look for the 'Member Deat' tag on the hotel listings."
        },
        {
            q: "Can I pay for my hotel booking upon arrival?",
            a: "Many of our partner hotels offer the 'Pay at Hotel' option. You can search for this feature in the filters section on our search results page. No advance payment is required for these bookings."
        },
        {
            q: "What is your hotel cancellation policy?",
            a: "Cancellation policies vary by property. You can find the specific policy for each hotel on the booking details page. Many hotels offer free cancellation up to 24 hours before check-in."
        }
    ];

    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="bg-[#f8f9fa] py-20 md:py-32 px-6 border-t border-slate-100">
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-start gap-12 md:gap-24">
                
                <div className="lg:w-2/5">
                    <div className="bg-[#f97316] w-20 h-20 rounded-[2rem] flex items-center justify-center text-white mb-10 shadow-2xl shadow-orange-200">
                        <HelpCircle size={36} />
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8 uppercase">
                        Hotel <br />
                        Booking <br />
                        Concierge
                    </h2>
                    <p className="text-slate-500 font-medium text-xs leading-relaxed mb-10 italic max-w-sm">
                        Everything you need to know about secure and comfortable stays with Yatralo's premium network.
                    </p>
                    <button className="flex items-center gap-4 text-[#7c3aed] font-black text-[11px] uppercase tracking-[0.3em] border-b-2 border-indigo-200 pb-2 hover:gap-6 transition-all">
                        Support Center <ArrowRight size={18} />
                    </button>
                </div>

                <div className="lg:w-3/5 space-y-6">
                    {questions.map((item, i) => (
                        <div key={i} className={`bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden transition-all duration-700 ${openIndex === i ? 'shadow-2xl shadow-indigo-100' : 'hover:shadow-lg'}`}>
                            <button 
                                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                                className="w-full h-full p-6 md:p-8 flex items-center justify-between group transition-colors"
                            >
                                <span className={`text-lg md:text-2xl font-black tracking-tight text-left transition-colors duration-500 ${openIndex === i ? 'text-[#7c3aed]' : 'text-slate-900'}`}>
                                    {item.q}
                                </span>
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-700 ${openIndex === i ? 'bg-[#7c3aed] text-white rotate-180 shadow-xl' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-900'}`}>
                                    {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                                </div>
                            </button>
                            
                            <div className={`transition-all duration-700 ease-in-out border-t border-slate-50 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-6 md:p-10 pt-0 text-slate-500 font-medium text-sm leading-relaxed italic max-w-2xl">
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

export default HotelFAQ;
