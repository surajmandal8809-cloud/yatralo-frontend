import { useNavigate, useLocation } from "react-router-dom";
import { useVerifyMutation } from "../../services/authService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiShield, FiArrowLeft, FiLoader } from "react-icons/fi";

const VerifyPage = () => {
  const [verifyOTP, { isLoading, isSuccess, isError, error, data }] = useVerifyMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const { userId, type } = location.state || {};
  const [form, setForm] = useState({ otp: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.otp.length < 6) return toast.error("Please enter the full 6-digit code");
    await verifyOTP({ userId, otp: form.otp, type }).unwrap().catch(() => {});
  };

  useEffect(() => {
    if (!userId) {
      toast.error("Session expired. Please login again.");
      navigate("/auth/login");
    }
  }, [userId, navigate]);

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message);
      localStorage.setItem("token", data.data.token);
      navigate("/");
    }
    if (isError && error) {
      toast.error(error?.data?.message || "Invalid OTP");
    }
  }, [isSuccess, isError, error, data, navigate]);

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center p-4 font-outfit">
      <div className="w-full max-w-md relative group">
        
        {/* Glow Effects */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#cf3425] to-[#0052cc] rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl p-10 border border-white/50">
          
          <button 
            onClick={() => navigate(-1)}
            className="absolute top-8 left-8 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-[#cf3425]"
          >
            <FiArrowLeft size={20} />
          </button>

          <div className="text-center mb-10">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#cf3425]/10 to-[#0052cc]/10 text-[#cf3425] shadow-inner animate-in zoom-in duration-500">
              <FiShield size={36} className="animate-pulse" />
            </div>

            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              One Last <span className="text-[#cf3425]">Step</span>
            </h2>

            <p className="mt-4 text-sm text-gray-500 font-medium leading-relaxed max-w-[250px] mx-auto">
              We've dispatched a secure code to confirm your identity. Check your {type === 'email' ? 'inbox' : 'messages'}.
            </p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                name="otp"
                value={form.otp}
                onChange={handleChange}
                placeholder="· · · · · ·"
                maxLength={6}
                className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50/50 px-4 py-6 text-4xl tracking-[0.3em] font-black text-center focus:border-[#cf3425] focus:bg-white outline-none transition-all duration-300 placeholder:text-gray-200"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full group overflow-hidden rounded-2xl bg-[#cf3425] py-5 text-white font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-red-200 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <FiLoader className="animate-spin" size={20} />
                  <span>VERIFYING...</span>
                </div>
              ) : (
                "AUTHENTICATE"
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              No code received?{" "}
              <button className="text-[#cf3425] hover:underline ml-1 decoration-2 underline-offset-4">
                RESEND NOW
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;