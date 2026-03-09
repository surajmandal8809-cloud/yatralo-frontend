import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import { useGetUserQuery } from "../../services/userService";
import toast from "react-hot-toast";
import Logo from "../common/Logo";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
      navigate("/auth/login");
    }
  }, [error, navigate]);

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
    navigate("/auth/login");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Flights", path: "/flights" },
    { name: "Trains", path: "/trains" },
    { name: "Bookings", path: "/bookings" },
    { name: "Destinations", path: "/destinations" },
    { name: "Deals", path: "/deals" },
    { name: "Benefits", path: "/benefits" },
  ];

  const isHomePage = location.pathname === "/";
  const scrolled = isScrolled || !isHomePage;

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100 py-3" : "bg-transparent py-5"
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        <Link to="/" className="flex items-center">
          <Logo variant={scrolled ? "dark" : "light"} />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.name} to={item.path}
                className={`relative text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-200 hover:text-[#C1372A] group/nav ${scrolled ? "text-slate-700" : "text-white/90"
                  }`}
              >
                {item.name}
                <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 bg-[#C1372A] rounded-full transition-all duration-300 ${isActive ? "w-4" : "w-0 group-hover/nav:w-4"
                  }`} />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isLoading ? (
            <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
          ) : !user ? (
            <>
              <Link to="/auth/login"
                className={`px-4 py-2 text-sm font-semibold rounded-xl border transition ${scrolled ? "border-gray-200 text-gray-700 hover:bg-gray-50" : "border-white/30 text-white hover:bg-white/10"
                  }`}>
                Sign In
              </Link>
              <Link to="/auth/register"
                className="px-4 py-2 text-sm font-semibold rounded-xl bg-[#C1372A] text-white hover:bg-[#a02e24] transition shadow-sm hover:shadow-md">
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="flex items-center gap-2 group">
                {user?.avatar ? (
                  <img src={user.avatar} alt="avatar"
                    className="w-9 h-9 rounded-full border-2 border-[#C1372A] object-cover" />
                ) : (
                  <div className="w-9 h-9 rounded-full border-2 border-[#C1372A] bg-red-50 flex items-center justify-center text-xs font-black text-[#C1372A]">
                    {user?.first_name?.[0] || user?.email?.[0]}
                  </div>
                )}
                <span className={`text-sm font-semibold group-hover:text-[#C1372A] transition ${scrolled ? "text-gray-800" : "text-white"}`}>
                  {user?.first_name || "Account"}
                </span>
              </Link>
              <button onClick={handleLogout}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border transition ${scrolled ? "border-gray-200 text-gray-500 hover:bg-gray-50" : "border-white/30 text-white hover:bg-white/10"
                  }`}>
                <LuLogOut size={13} />
                Logout
              </button>
            </>
          )}
        </div>

        <button onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden w-10 h-10 flex items-center justify-center rounded-xl transition ${scrolled ? "bg-gray-100 text-gray-700" : "bg-white/10 text-white"
            }`}>
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="flex flex-col px-6 py-4 space-y-4">
            {user && (
              <div className="py-2 border-b border-gray-100 mb-1">
                <div className="flex items-center gap-3">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full border-2 border-[#C1372A] object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full border-2 border-[#C1372A] bg-red-50 flex items-center justify-center text-sm font-black text-[#C1372A]">
                      {user?.first_name?.[0] || user?.email?.[0]}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold text-gray-800">{user?.first_name || "Account"}</p>
                    <p className="text-xs text-gray-400 truncate max-w-[160px]">{user?.email}</p>
                  </div>
                </div>
              </div>
            )}
            {navItems.map((item) => (
              <Link key={item.name} to={item.path}
                className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-[#C1372A] transition py-1">
                {item.name}
              </Link>
            ))}
            {!user ? (
              <>
                <Link to="/auth/login" className="text-sm font-semibold text-gray-700 py-1">Sign In</Link>
                <Link to="/auth/register"
                  className="bg-[#C1372A] text-white px-4 py-2.5 rounded-xl text-sm text-center font-semibold hover:bg-[#a02e24] transition">
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="text-sm font-semibold text-[#C1372A] py-1">My Profile</Link>
                <button onClick={handleLogout}
                  className="text-left text-gray-500 text-sm font-semibold py-1 flex items-center gap-2 hover:text-gray-700">
                  <LuLogOut size={15} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
