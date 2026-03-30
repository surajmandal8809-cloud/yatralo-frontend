import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiChevronDown, FiLogOut, FiSettings, FiCreditCard, FiShoppingBag, FiActivity, FiLock } from "react-icons/fi";
import { useGetUserQuery } from "../../services/userService";
import toast from "react-hot-toast";
import Logo from "../common/Logo";
import AuthModal from "../Auth/AuthModal";

const DEFAULT_AVATAR = "https://ui-avatars.com/api/?background=7c3aed&color=fff&name=Traveller&size=100";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const location = useLocation();
  const navigate = useNavigate();

  const { data, error, isLoading, refetch } = useGetUserQuery(token, {
    skip: !token,
    refetchOnMountOrArgChange: true,
  });
  const user = data?.data;

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
    if (t) refetch();
  }, [location, refetch]);

  useEffect(() => {
    const h = (e) => { if (e.key === "token") setToken(e.newValue); };
    window.addEventListener("storage", h);
    return () => window.removeEventListener("storage", h);
  }, []);

  useEffect(() => {
    if (error?.status === 401) {
      toast.error("Session expired. Please login again.");
      localStorage.removeItem("token");
      setToken(null);
      // setIsAuthModalOpen(true); // Optionally show modal on session expire
    }
  }, [error]);

  const isUserPage = ['/profile', '/wallet', '/bookings', '/settings', '/activity', '/account'].includes(location.pathname);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logged out successfully");
    // Hard redirect to clear all Redux/App state as requested
    window.location.replace("/");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Flights", path: "/flights" },
    { name: "Hotels", path: "/hotels" },
    { name: "Trains", path: "/trains" },
    { name: "Buses", path: "/buses" },
    { name: "Destinations", path: "/destinations" },
    { name: "Offers", path: "/deals" }
  ];

  const isHomePage = location.pathname === "/";
  const scrolled = isScrolled || !isHomePage || isUserPage;

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-sm border-b border-gray-100 py-2" : "bg-gradient-to-b from-black/50 to-transparent py-4"
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        <Link to="/" className="flex items-center gap-2 group">
          <span className={`text-2xl font-black tracking-tighter ${scrolled ? "text-violet-600" : "text-white"}`}>
            Yatra<span className="text-[#f97316]">lo</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.name} to={item.path}
                className={`relative text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-200 hover:text-[#7C3AED] group/nav ${scrolled ? "text-slate-600" : "text-white/90"
                  }`}
              >
                {item.name}
                <span className={`absolute -bottom-1.5 left-0 h-0.5 bg-gradient-to-r from-[#7C3AED] to-[#f97316] rounded-full transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover/nav:w-full"
                  }`} />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isLoading ? (
            <div className="w-40 h-10 rounded-xl bg-gray-200 animate-pulse" />
          ) : !user ? (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className={`flex items-center gap-3 px-5 py-2.5 rounded-full transition-all duration-300 group ${
                scrolled 
                ? "bg-gradient-to-r from-[#7C3AED] to-[#f97316] text-white shadow-lg shadow-violet-200" 
                : "bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/30"
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                <FiUser size={12} className="text-[#7C3AED]" />
              </div>
              <div className="text-left leading-tight">
                <p className="text-[9px] uppercase font-black opacity-80">Login or</p>
                <p className="text-xs font-black">Create Account</p>
              </div>
              <FiChevronDown size={14} className="opacity-80 group-hover:rotate-180 transition-transform" />
            </button>
          ) : (
            <div className={`relative group ${scrolled && isHomePage ? 'opacity-0 invisible scale-90 translate-x-4' : 'opacity-100 visible scale-100 translate-x-0'} transition-all duration-300`}>
              {/* Note: User requested that if logined it should remove when scrolled (maybe?) 
                  "make a login button which will get scrooled if logined it should remove like refer make my trip"
                  Actually, MMT keeps the profile but hides the "Logout" or other items until hover.
                  If the user wants the profile to remove on scroll, I'll add that logic here.
              */}
              <div className="flex items-center gap-3 px-1 py-1 rounded-2xl cursor-pointer group/profile">
                <div className="relative">
                    {user?.avatar ? (
                    <img src={user.avatar} alt="avatar" referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full border-2 border-[#7c3aed] object-cover ring-4 ring-violet-500/5" />
                    ) : (
                    <div className="w-10 h-10 rounded-full border-2 border-[#7c3aed] bg-violet-50 flex items-center justify-center text-xs font-black text-[#7c3aed] ring-4 ring-violet-500/5">
                        {user?.first_name?.[0] || user?.email?.[0]}
                    </div>
                    )}
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                
                <div className="hidden lg:block">
                  <p className={`text-[10px] uppercase font-black opacity-60 leading-none mb-1 ${scrolled ? "text-slate-500" : "text-white/70"}`}>Hey,</p>
                  <p className={`text-sm font-black transition-colors ${scrolled ? "text-slate-800" : "text-white"} group-hover/profile:text-[#7C3AED]`}>
                    {user?.first_name || "Traveler"}
                  </p>
                </div>
                <FiChevronDown size={14} className={`opacity-40 transition-transform group-hover/profile:rotate-180 ${scrolled ? "text-slate-800" : "text-white"}`} />

                <div className="absolute top-full right-0 mt-3 w-72 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-slate-100 opacity-0 invisible group-hover/profile:opacity-100 group-hover/profile:visible transition-all duration-300 translate-y-2 group-hover/profile:translate-y-0 z-[60] overflow-hidden">
                    {/* MMT Style Header */}
                    <div className="p-6 bg-gradient-to-br from-slate-900 to-[#1b1b1b] text-white">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden">
                              <img src={user?.avatar || DEFAULT_AVATAR} alt="" className="w-full h-full object-cover" />
                           </div>
                           <div className="flex-1 overflow-hidden">
                              <p className="text-sm font-black truncate">{user?.first_name} {user?.last_name}</p>
                              <p className="text-[10px] font-bold text-white/50 truncate tracking-tight">{user?.email}</p>
                           </div>
                        </div>
                    </div>
                    
                    <div className="p-3 bg-white">
                        <ul className="space-y-0.5">
                            <DropdownItem to="/profile" icon={<FiUser />} label="My Profile" desc="Manage profile and settings" />
                            <DropdownItem to="/bookings" icon={<FiShoppingBag />} label="My Trips" desc="Manage bookings & history" />
                            <DropdownItem to="/wallet" icon={<FiCreditCard />} label="YatraLo Wallet" desc="Balance: ₹450" />
                            <DropdownItem to="/settings" icon={<FiSettings />} label="Manage Settings" desc="2FA, Login & Security" />
                            <DropdownItem to="/activity" icon={<FiActivity />} label="Security Activity" desc="Login history & IP logs" />
                            <DropdownItem to="/account" icon={<FiLock />} label="My Account" desc="VIP Status & Identity" />
                        </ul>
                        <div className="h-px bg-slate-50 my-2 mx-2" />
                        <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-800 transition-all group/item">
                            <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center group-hover/item:bg-red-500 group-hover/item:text-white transition-all">
                               <FiLogOut size={16} />
                            </div>
                            <div className="text-left">
                               <p className="text-xs font-black uppercase tracking-widest">Logout</p>
                            </div>
                        </button>
                    </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <button onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden w-10 h-10 flex items-center justify-center rounded-xl transition ${scrolled ? "bg-gray-100 text-gray-700" : "bg-white/10 text-white"
            }`}>
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg fixed inset-x-0 top-[60px] max-h-[calc(100vh-60px)] overflow-y-auto drawer-in">
          <div className="flex flex-col px-6 py-4 space-y-4">
            {user ? (
              <div className="py-4 border-b border-gray-100 mb-2">
                <div className="flex items-center gap-4">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="avatar" referrerPolicy="no-referrer" className="w-12 h-12 rounded-full border-2 border-[#7c3aed] object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full border-2 border-[#7c3aed] bg-violet-50 flex items-center justify-center text-sm font-black text-[#7c3aed]">
                      {user?.first_name?.[0] || user?.email?.[0]}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold text-gray-800">{user?.first_name ? `${user.first_name} ${user.last_name || ""}`.trim() : "Traveler"}</p>
                    <p className="text-xs text-gray-400 truncate max-w-[200px]">{user?.email}</p>
                  </div>
                </div>
              </div>
            ) : (
                <button 
                    onClick={() => { setIsAuthModalOpen(true); setIsOpen(false); }}
                    className="w-full py-4 bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-violet-100"
                >
                    Login / Create Account
                </button>
            )}

            <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                <Link key={item.name} to={item.path}
                    className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-600 bg-gray-50 hover:text-[#7c3aed] transition p-3 rounded-xl border border-gray-100">
                    {item.name}
                </Link>
                ))}
            </div>

            {user && (
              <div className="space-y-2 pt-4">
                <Link to="/profile" className="block text-sm font-bold text-gray-700 py-2">Account Settings</Link>
                <button onClick={handleLogout}
                  className="w-full text-left text-red-600 text-sm font-black py-4 flex items-center gap-2">
                  <FiLogOut size={18} />
                  LOGOUT
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onAuthSuccess={(newToken) => {
          localStorage.setItem("token", newToken);
          setToken(newToken);
          setIsAuthModalOpen(false);
          refetch();
        }}
      />
    </header>
  );
};

const DropdownItem = ({ to, icon, label, desc }) => (
  <li>
    <Link to={to} className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 transition-all group/item">
      <div className="text-slate-400 group-hover/item:text-[#7C3AED] transition-colors">{React.cloneElement(icon, { size: 18 })}</div>
      <div className="text-left">
        <p className="text-xs font-black text-slate-800 group-hover/item:text-[#7C3AED] transition-colors">{label}</p>
        <p className="text-[10px] font-bold text-slate-400 leading-none mt-1">{desc}</p>
      </div>
    </Link>
  </li>
);

export default Header;

