import React, { useState, useMemo } from "react";
import {
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  Headphones,
  Lock,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState(null);
  const [search, setSearch] = useState("");

  const faqData = [
    {
      title: "Elite Reservations",
      icon: ShieldCheck,
      items: [
        {
          id: "cancel",
          question: "Can I cancel my premium booking?",
          answer:
            "Elite members can cancel most bookings within 24 hours for a full refund. International partner policies may vary.",
        },
        {
          id: "modify",
          question: "How do I modify my flight itinerary?",
          answer:
            "Modifications can be made via your Elite dashboard or through your dedicated concierge.",
        },
      ],
    },
    {
      title: "Secure Transactions",
      icon: Lock,
      items: [
        {
          id: "payment",
          question: "What payment methods do you accept?",
          answer:
            "We accept major international credit cards, private transfers, and secure digital assets.",
        },
        {
          id: "fees",
          question: "Are there hidden service fees?",
          answer:
            "No. All concierge services and insurance are included transparently in your booking.",
        },
      ],
    },
    {
      title: "Prestige Support",
      icon: Headphones,
      items: [
        {
          id: "pnr",
          question: "How can I access my PNR status?",
          answer:
            "Track your booking in real time via your dashboard with automated secure updates.",
        },
        {
          id: "insurance",
          question: "Is travel insurance included?",
          answer:
            "Yes. All Elite voyages include comprehensive international coverage.",
        },
      ],
    },
  ];

  const filteredData = useMemo(() => {
    return faqData
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          item.question.toLowerCase().includes(search.toLowerCase())
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [search]);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className=" bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-gray-200 mb-6">
            <HelpCircle size={14} className="text-[#7c3aed]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
              Knowledge Base
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
            Frequently Asked <span className="bg-gradient-to-r from-[#7c3aed] to-[#f97316] bg-clip-text text-transparent">Questions</span>
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            Everything you need to confidently manage your premium travel
            experience.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-20 relative">
          <Search
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-4 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:ring-orange-500/20"
          />
        </div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredData.length > 0 ? (
            filteredData.map((category, i) => (
              <div key={i}>
                <div className="flex items-center gap-3 mb-8 border-b pb-4">
                  <category.icon className="text-[#7c3aed]" size={20} />
                  <h3 className="font-bold uppercase tracking-widest text-xs text-gray-900">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.items.map((item) => {
                    const isOpen = openId === item.id;

                    return (
                      <div
                        key={item.id}
                        className={`rounded-2xl transition-all duration-300 ${
                          isOpen
                            ? "bg-gray-900 text-white"
                            : "bg-white border border-gray-200"
                        }`}
                      >
                        <button
                          onClick={() => toggle(item.id)}
                          className="w-full flex justify-between items-center px-6 py-5 text-left"
                        >
                          <span className="font-semibold text-sm">
                            {item.question}
                          </span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${
                              isOpen ? "rotate-180 text-[#7c3aed]" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden px-6 pb-6 text-gray-300 text-sm"
                            >
                              {item.answer}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
              <p className="text-gray-500 font-semibold">
                No matching questions found.
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-28 text-center">
          <button
            onClick={() => navigate("/help")}
            className="px-10 py-5 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-xl text-xs font-semibold uppercase tracking-[0.3em] hover:opacity-90 transition-all shadow-md"
          >
            Contact Concierge
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
