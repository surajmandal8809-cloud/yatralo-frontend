import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { 
  useLoginMutation, 
  useRegisterMutation, 
  useVerifyMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} from "../../services/authService";
import toast from "react-hot-toast";
import SocialAuth from "./SocialAuth";
import { FiX, FiMail, FiPhone, FiLock, FiUser, FiChevronDown, FiArrowLeft, FiLoader } from "react-icons/fi";

const AuthModal = ({ isOpen, onClose, onAuthSuccess, initialMode = "login" }) => {
  const [mode, setMode] = useState(initialMode); // 'login', 'register', 'verify', 'forgot', 'reset'
  const [activeTab, setActiveTab] = useState("email");
  const [authData, setAuthData] = useState(null); // To store userId, type etc for verification
  const [resetToken, setResetToken] = useState("");

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [verifyOTP, { isLoading: isVerifyLoading }] = useVerifyMutation();
  const [forgotPassword, { isLoading: isForgotLoading }] = useForgotPasswordMutation();
  const [resetPassword, { isLoading: isResetLoading }] = useResetPasswordMutation();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
    otp: "",
  });

  // Handle initialization and body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setMode(initialMode);
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        password: "",
        confirm_password: "",
        otp: "",
      });
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen, initialMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = activeTab === "email" 
      ? { email: form.email, password: form.password }
      : { mobile: form.mobile, password: form.password };

    try {
      const res = await login(payload).unwrap();
      if (res.status) {
        toast.success(res.message);
        if (res.data?.token) {
          onAuthSuccess(res.data.token);
        } else if (res.data?.userId) {
          setAuthData({ ...res.data, flow: "login" });
          setMode("verify");
        }
      }
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name) return toast.error("Name is required");
    if (activeTab === "email" && !form.email) return toast.error("Email is required");
    if (activeTab === "mobile" && !form.mobile) return toast.error("Mobile is required");
    if (!form.password) return toast.error("Password is required");

    try {
      const { otp, confirm_password, ...payload } = form;
      const res = await register(payload).unwrap();
      if (res.status) {
        toast.success(res.message);
        setAuthData({ ...res.data, flow: "register" });
        setMode("verify");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!form.otp) return toast.error("OTP is required");

    try {
      const res = await verifyOTP({ 
        userId: authData.userId, 
        otp: form.otp, 
        type: authData.type 
      }).unwrap();
      
      if (res.status) {
        toast.success(res.message);
        if (res.data?.token) {
          if (authData.flow === "forgot") {
            setResetToken(res.data.token);
            setMode("reset");
          } else {
            onAuthSuccess(res.data.token);
          }
        }
      }
    } catch (err) {
      toast.error(err?.data?.message || "Verification failed");
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    const payload = activeTab === "email" ? { email: form.email } : { mobile: form.mobile };
    
    try {
      const res = await forgotPassword(payload).unwrap();
      if (res.status) {
        toast.success(res.message);
        if (activeTab === "mobile") {
          setAuthData({ ...res.data, flow: "forgot" });
          setMode("verify");
        }
      }
    } catch (err) {
      toast.error(err?.data?.message || "Request failed");
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm_password) return toast.error("Passwords do not match");
    
    try {
      const res = await resetPassword({ body: { password: form.password }, token: resetToken }).unwrap();
      if (res.status) {
        toast.success(res.message);
        setMode("login");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Reset failed");
    }
  };

  if (!isOpen) return null;

  const renderHeader = (title, subtitle) => (
    <div className="mb-5 relative">
        {(mode === "forgot" || mode === "reset" || mode === "verify") && (
            <button onClick={() => setMode("login")} className="absolute -left-2 -top-2 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black">
                <FiArrowLeft size={18} />
            </button>
        )}
        <h3 className="text-3xl font-black text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-500 font-medium text-sm leading-relaxed">{subtitle}</p>
    </div>
  );

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md transition-all duration-300 overflow-y-auto p-4 md:p-10" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      
      <div className="relative w-full max-w-[820px] flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-300 pointer-events-auto">
        
        {/* Close Button (Outside) */}
        <button 
          onClick={onClose}
          className="absolute -top-12 md:-top-10 -right-0 md:-right-10 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:scale-110 transition-transform shadow-lg z-[110]"
        >
          <FiX size={24} />
        </button>

        {/* Left Side: Banner Image */}
        <div className="hidden md:block w-[42%] relative overflow-hidden rounded-l-3xl">
          <img 
            src="/travel_sale_banner.png" 
            alt="Promotion" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* Right Side: Auth Forms */}
        <div className="flex-1 bg-white rounded-3xl md:rounded-l-none md:rounded-r-3xl p-6 md:p-8 relative flex flex-col min-h-[460px]">
          
          {mode === "verify" ? (
             <div className="flex-1 flex flex-col justify-center">
                {renderHeader("Verify OTP", `We've sent a 6-digit code to your ${authData?.type}.`)}

                <form onSubmit={handleVerify} className="space-y-6 max-w-sm mx-auto w-full">
                    <div className="flex justify-center">
                        <input
                            type="text"
                            name="otp"
                            maxLength={6}
                            required
                            value={form.otp}
                            onChange={handleChange}
                            placeholder="· · · · · ·"
                            className="w-full px-4 py-4 rounded-2xl bg-gray-50 border-2 border-gray-100 focus:border-[#7c3aed] focus:bg-white outline-none text-center text-4xl font-black tracking-[0.2em] transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isVerifyLoading}
                        className="w-full bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-violet-100 disabled:opacity-50"
                    >
                        {isVerifyLoading ? <FiLoader className="animate-spin mx-auto" /> : "VERIFY & CONTINUE"}
                    </button>
                    <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                        No code? <button type="button" className="text-[#7c3aed] hover:underline ml-1">RESEND OTP</button>
                    </p>
                </form>
             </div>
          ) : mode === "forgot" ? (
            <div className="flex-1 flex flex-col justify-center">
                {renderHeader("Forgot Password?", "Enter your details to receive recovery instructions.")}

                <div className="flex bg-gray-50 border border-gray-200 rounded-xl p-1 mb-6">
                    <button onClick={() => setActiveTab("email")} className={`flex-1 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all ${activeTab === 'email' ? 'bg-white text-[#7c3aed] shadow-sm' : 'text-gray-400'}`}>EMAIL</button>
                    <button onClick={() => setActiveTab("mobile")} className={`flex-1 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all ${activeTab === 'mobile' ? 'bg-white text-[#7c3aed] shadow-sm' : 'text-gray-400'}`}>MOBILE</button>
                </div>

                <form onSubmit={handleForgot} className="space-y-5">
                    <div className="relative group">
                        {activeTab === "email" ? (
                             <>
                             <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#7c3aed] transition-colors" size={18} />
                             <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="Enter your email" className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-gray-200 focus:border-[#7c3aed] outline-none transition-all text-sm font-semibold" />
                           </>
                        ) : (
                            <>
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-gray-400 font-bold text-sm">
                              <span>+91</span>
                              <FiChevronDown size={14} />
                              <div className="w-[1px] h-4 bg-gray-200 ml-1" />
                            </div>
                            <input type="tel" name="mobile" required value={form.mobile} onChange={handleChange} placeholder="Mobile number" className="w-full pl-[76px] pr-4 py-3.5 rounded-2xl bg-white border border-gray-200 focus:border-[#7c3aed] outline-none transition-all text-sm font-semibold" />
                          </>
                        )}
                    </div>
                    <button type="submit" disabled={isForgotLoading} className="w-full bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-violet-100 disabled:opacity-50">
                        {isForgotLoading ? <FiLoader className="animate-spin mx-auto" /> : "SEND RESET LINK"}
                    </button>
                </form>
            </div>
          ) : mode === "reset" ? (
            <div className="flex-1 flex flex-col justify-center">
                {renderHeader("Set New Password", "Almost there! Create a new secure password for your account.")}

                <form onSubmit={handleReset} className="space-y-5">
                    <div className="relative group">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#7c3aed] transition-colors" size={18} />
                        <input type="password" name="password" required value={form.password} onChange={handleChange} placeholder="New password" className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-gray-200 focus:border-[#7c3aed] outline-none transition-all text-sm font-semibold" />
                    </div>
                    <div className="relative group">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#7c3aed] transition-colors" size={18} />
                        <input type="password" name="confirm_password" required value={form.confirm_password} onChange={handleChange} placeholder="Confirm password" className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-gray-200 focus:border-[#7c3aed] outline-none transition-all text-sm font-semibold" />
                    </div>
                    <button type="submit" disabled={isResetLoading} className="w-full bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-violet-100 disabled:opacity-50">
                        {isResetLoading ? <FiLoader className="animate-spin mx-auto" /> : "RESET PASSWORD"}
                    </button>
                </form>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              {/* Account Type Tabs (Pill Style) */}
              <div className="flex items-center justify-center mb-6">
                <div className="flex bg-gray-50 border border-gray-200 rounded-full p-1 w-full max-w-md shadow-inner">
                  <button 
                    onClick={() => setMode("login")}
                    className={`flex-1 py-2.5 px-4 rounded-full text-[11px] font-black tracking-widest transition-all ${mode === 'login' ? 'bg-[#7c3aed] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    LOGIN
                  </button>
                  <button 
                    onClick={() => setMode("register")}
                    className={`flex-1 py-2.5 px-4 rounded-full text-[11px] font-black tracking-widest transition-all ${mode === 'register' ? 'bg-[#7c3aed] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    CREATE ACCOUNT
                  </button>
                </div>
              </div>

              {/* Form Label */}
              <div className="mb-4">
                <p className="text-sm font-bold text-gray-700">
                    {mode === 'login' ? 'Login via' : 'Register via'} {activeTab === 'email' ? 'Email ID' : 'Mobile Number'}
                </p>
              </div>

              <form onSubmit={mode === "login" ? handleLogin : handleRegister} className="space-y-4">
                {mode === "register" && (
                    <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-300">
                         <div className="relative group">
                            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#7c3aed] transition-colors" />
                            <input
                                type="text"
                                name="first_name"
                                required
                                value={form.first_name}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-gray-200 focus:border-[#7c3aed] focus:ring-4 focus:ring-violet-50 outline-none transition-all text-sm font-semibold"
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                name="last_name"
                                required
                                value={form.last_name}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="w-full px-4 py-3.5 rounded-2xl bg-white border border-gray-200 focus:border-[#7c3aed] focus:ring-4 focus:ring-violet-50 outline-none transition-all text-sm font-semibold"
                            />
                        </div>
                    </div>
                )}

                <div className="relative group">
                  {activeTab === "email" ? (
                    <>
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#7c3aed] transition-colors" size={18} />
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-gray-200 focus:border-[#7c3aed] focus:ring-4 focus:ring-violet-50 outline-none transition-all text-sm font-semibold"
                      />
                    </>
                  ) : (
                    <>
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-gray-400 font-bold text-sm">
                        <span>+91</span>
                        <FiChevronDown size={14} />
                        <div className="w-[1px] h-4 bg-gray-200 ml-1" />
                      </div>
                      <input
                        type="tel"
                        name="mobile"
                        required
                        value={form.mobile}
                        onChange={handleChange}
                        placeholder="Enter mobile number"
                        className="w-full pl-[76px] pr-4 py-3.5 rounded-2xl bg-white border border-gray-200 focus:border-[#7c3aed] focus:ring-4 focus:ring-violet-50 outline-none transition-all text-sm font-semibold"
                      />
                    </>
                  )}
                </div>

                <div className="relative group">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#7c3aed] transition-colors" size={18} />
                  <input
                    type="password"
                    name="password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-gray-200 focus:border-[#7c3aed] focus:ring-4 focus:ring-violet-50 outline-none transition-all text-sm font-semibold"
                  />
                  {mode === "login" && (
                    <button type="button" onClick={() => setMode("forgot")} className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#7c3aed] hover:underline uppercase tracking-tighter">
                        FORGOT?
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoginLoading || isRegisterLoading}
                  className="relative w-full bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white py-4 rounded-full font-black text-sm uppercase tracking-widest hover:shadow-xl hover:shadow-violet-200 transition-all disabled:opacity-80 mt-2 overflow-hidden group"
                >
                  {isLoginLoading || isRegisterLoading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>SECURELY LOGGING IN...</span>
                    </div>
                  ) : (
                    <span className="group-hover:tracking-[0.15em] transition-all duration-300">CONTINUE</span>
                  )}
                </button>
              </form>

              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 h-[1px] bg-gray-100" />
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Or Login/Signup With</span>
                <div className="flex-1 h-[1px] bg-gray-100" />
              </div>

              {/* Social Login Circles */}
              <div className="flex justify-center items-center gap-6 mb-6">
                  <button onClick={() => setActiveTab(activeTab === 'email' ? 'mobile' : 'email')} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm group">
                    {activeTab === 'email' ? <FiPhone className="text-gray-500 group-hover:text-[#7c3aed]" /> : <FiMail className="text-gray-500 group-hover:text-[#7c3aed]" />}
                  </button>
                  <SocialAuth variant="circles" />
              </div>

              <div className="mt-auto text-center px-4">
                <p className="text-[10px] leading-relaxed text-gray-400 font-medium">
                  By proceeding, you agree to Yatralo's <span className="font-bold text-[#7c3aed] hover:underline cursor-pointer">Privacy Policy</span>, <span className="font-bold text-[#7c3aed] hover:underline cursor-pointer">User Agreement</span> and <span className="font-bold text-[#7c3aed] hover:underline cursor-pointer">T&Cs</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AuthModal;
