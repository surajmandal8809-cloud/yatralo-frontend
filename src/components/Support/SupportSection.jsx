import {
  MessageCircle,
  Headphones,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Response Time", value: "< 2 Mins", icon: Sparkles },
  { label: "Global Coverage", value: "125+ Hubs", icon: ShieldCheck },
  { label: "Support Tier", value: "L3 Concierge", icon: Headphones },
  { label: "Trust Score", value: "99.9% Alpha", icon: ShieldCheck },
];

const SupportSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gray-100 py-28">
      {/* Top Decorative Line */}
      <div className="absolute top-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2 shadow-sm"
        >
          <Headphones size={14} className="text-orange-500" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
            24/7 Premium Concierge
          </span>
        </motion.div>

        {/* Heading */}
        <h2 className="mb-6 text-2xl font-black tracking-tight text-slate-900 md:text-4xl">
          Your Private{" "}
          <span className="bg-[#CF3425] bg-clip-text text-transparent">
            Travel Desk
          </span>
        </h2>

        {/* Description */}
        <p className="mx-auto mb-14 max-w-2xl text-base text-slate-600 md:text-lg leading-relaxed">
          Whether it's a last-minute modification or a bespoke request,
          our elite support team ensures every journey remains seamless.
        </p>

        {/* CTA Section */}
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row">

          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => navigate("/help")}
            className="group rounded-xl bg-slate-900 px-10 py-5 text-xs font-semibold uppercase tracking-[0.25em] text-white shadow-xl shadow-slate-900/20 transition-all hover:bg-[#b82e1f]"
          >
            Access Help Center
            <ArrowRight
              size={18}
              className="ml-3 inline transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.button>

          {/* Direct Contact Card */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex items-center gap-6 rounded-3xl border border-slate-200 bg-white px-8 py-5 shadow-lg transition-all hover:shadow-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
              <MessageCircle size={20} />
            </div>

            <div className="text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Direct Line
              </p>
              <p className="text-lg font-bold text-slate-900">
                +91 90400 27584
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-24 border-t border-slate-200/60 pt-16">
          <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
            {stats.map((item, index) => (
              <div key={index} className="text-center">
                <item.icon
                  size={22}
                  className="mx-auto mb-4 text-orange-500"
                />
                <h3 className="mb-2 text-xl font-black text-slate-900">
                  {item.value}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SupportSection;
