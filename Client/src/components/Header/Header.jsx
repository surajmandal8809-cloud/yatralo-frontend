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
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { data, isSuccess, error } = useGetUserQuery({}, { skip: !token });

  /* ================= USER FETCH ================= */
  useEffect(() => {
    if (isSuccess && data) setUser(data?.data);

    if (error) {
      toast.error(error?.data?.message || "Session expired");
      localStorage.removeItem("token");
      navigate("/auth/login");
    }
  }, [data, isSuccess, error, navigate]);

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= CLOSE MENUS ON ROUTE CHANGE ================= */
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location]);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Flights", path: "/flights" },
    { name: "Hotels", path: "/hotels" },
    { name: "Destinations", path: "/destinations" },
    { name: "Deals", path: "/deals" },
    { name: "Benefits", path: "/benefits" },
  ];

  const isHomePage = location.pathname === "/";
  const shouldShowHeaderScrolled = isScrolled || !isHomePage;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        shouldShowHeaderScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <Logo variant={shouldShowHeaderScrolled ? "dark" : "light"} />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                  shouldShowHeaderScrolled
                    ? "text-slate-800"
                    : "text-white/90"
                } hover:text-[#cf3425] group/nav`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-[#cf3425] rounded-full transition-all duration-500 ${
                    isActive ? "w-4" : "w-0 group-hover/nav:w-4"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link
                to="/auth/login"
                className={`px-4 py-2 text-sm rounded-lg border transition ${
                  shouldShowHeaderScrolled
                    ? "border-gray-300 text-gray-700 hover:bg-gray-100"
                    : "border-white/30 text-white hover:bg-white/10"
                }`}
              >
                Sign In
              </Link>

              <Link
                to="/auth/register"
                className="px-4 py-2 text-sm font-medium rounded-lg bg-[#cf3425] text-white shadow-md hover:bg-[#b82d1f] transition"
              >
                Get Started
              </Link>
            </>
          ) : (
            <div className="relative">
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  src={user?.avatar}
                  alt="avatar"
                  className="w-9 h-9 rounded-full border-2 border-[#cf3425] object-cover"
                />
                <span
                  className={`text-sm font-medium ${
                    shouldShowHeaderScrolled
                      ? "text-gray-800"
                      : "text-white"
                  }`}
                >
                  {user?.first_name}
                </span>
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border overflow-hidden">
                  <Link
                    to="/profile"
                    className="block px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 border-b border-slate-50 text-[#cf3425]"
                  >
                    Account Dashboard
                  </Link>

                  <Link
                    to="/profile"
                    className="block px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 text-slate-600"
                  >
                    Personal Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LuLogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden w-10 h-10 flex items-center justify-center rounded-lg ${
            shouldShowHeaderScrolled
              ? "bg-gray-100 text-gray-700"
              : "bg-white/10 text-white"
          }`}
        >
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t mt-3">
          <div className="flex flex-col px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-700 hover:text-[#cf3425] transition py-2"
              >
                {item.name}
              </Link>
            ))}

            {user && (
              <Link
                to="/profile"
                className="text-[11px] font-black uppercase tracking-[0.2em] text-[#cf3425] py-2"
              >
                Account Dashboard
              </Link>
            )}

            {!user ? (
              <>
                <Link to="/auth/login" className="text-sm">
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-[#cf3425] text-white px-4 py-2 rounded-lg text-sm text-center hover:bg-[#b82d1f] transition"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-left text-red-500 text-sm flex items-center gap-2"
              >
                <LuLogOut size={16} />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;