import React from "react";
import { Link } from "react-router-dom";
import Logo from "../common/Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", href: "#" },
    { name: "Global Destinations", href: "/destinations" },
    { name: "Exclusive Deals", href: "/deals" },
    { name: "Elite Benefits", href: "/benefits" },
    { name: "Terms of Travel", href: "#" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Luxury Concierge", href: "/help" },
    { name: "Cancellation Policy", href: "#" },
    { name: "Privacy Protocol", href: "#" },
    { name: "Member Login", href: "/auth/login" },
  ];

  const destinations = [
    { name: "Goa", desc: "Premium Beaches" },
    { name: "Kerala", desc: "Luxury Backwaters" },
    { name: "Jaipur", desc: "Heritage Stays" },
    { name: "Ladakh", desc: "Luxury Adventure" },
    { name: "Varanasi", desc: "Spiritual Luxury" },
    { name: "Udaipur", desc: "City of Lakes" },
  ];

  return (
    <footer className="relative bg-slate-50 overflow-hidden pt-20">
      {/* Top Border Gradient */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-orange-500 via-indigo-600 to-orange-500" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Newsletter Section - Premium Glassmorphism */}
        <div className="relative -mt-24 mb-16 z-10">
          <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] p-10 md:p-12 border border-white/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                  Join the <span className="text-[#CF3425]">Elite</span> Circle
                </h3>
                <p className="text-slate-500 font-medium text-lg mt-2">
                  Unlock exclusive member rates and luxury travel guides.
                </p>
              </div>

              <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4 md:min-w-[450px]">
                <input
                  type="email"
                  placeholder="Your premium email"
                  className="w-full px-6 py-4 rounded-2xl bg-slate-100 border-none focus:ring-4 focus:ring-orange-500/10 outline-none font-bold text-slate-800 placeholder:text-slate-400"
                />
                <button className="px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black transition-all shadow-xl shadow-slate-900/20 uppercase text-xs tracking-widest whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 py-16">
          {/* Brand */}
          <div className="space-y-8">
            <Logo variant="dark" />
            <p className="text-slate-500 font-medium leading-relaxed">
              Crafting unforgettable luxury voyages and seamless high-end travel experiences across the globe.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" /></svg>
                </div>
                <span className="text-sm font-bold text-slate-700">Chandigarh, Luxury District</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.27 11.74 11.74 0 0 0 .59 3.69 1 1 0 0 1-.27 1.11l-2.2 2.2z" /></svg>
                </div>
                <span className="text-sm font-bold text-slate-700">+91 90400 27584</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 mb-8">
              Explore
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-slate-500 hover:text-orange-500 font-bold text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-orange-500 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Experience */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 mb-8">
              Experience
            </h4>
            <ul className="space-y-4">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-slate-500 hover:text-indigo-600 font-bold text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 mb-8">
              Featured
            </h4>
            <ul className="space-y-4">
              {destinations.map((d, index) => (
                <li
                  key={index}
                  className="group flex flex-col cursor-pointer"
                >
                  <span className="text-slate-900 font-bold text-sm group-hover:text-orange-500 transition-colors uppercase tracking-widest">{d.name}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{d.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-10 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
          <div>© {currentYear} Yatralo Collective.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-900 transition-colors">Instagram</a>
            <a href="#" className="hover:text-slate-900 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Twitter</a>
          </div>
          <div className="text-orange-500">
            Handcrafted in India
          </div>
        </div>
      </div>

      {/* Accents */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
    </footer>
  );
};

export default Footer;
