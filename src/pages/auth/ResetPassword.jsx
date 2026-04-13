import React, { useState, useEffect } from "react";
import { useResetPasswordMutation } from "../../services/authService";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaLock, FaArrowLeft } from "react-icons/fa";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [resetPassword, { isLoading, isError, error, isSuccess, data }] =
    useResetPasswordMutation();

  const [token, setToken] = useState(() => {
    // Prioritise URL token (email reset link), fall back to localStorage (mobile OTP flow)
    const urlToken = new URLSearchParams(window.location.search).get("token");
    if (urlToken) return urlToken;
    return localStorage.getItem("token") || "";
  });

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message);
      navigate("/auth/login");
    }
    if (isError && error) {
      toast.error(error?.data?.message || "Reset failed. Try again.");
    }
  }, [isSuccess, isError, error, data, navigate]);

  const [form, setForm] = useState({
    password: "",
    confirm_password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.password || !form.confirm_password) {
      return toast.error("Please fill all required fields");
    }
    if (form.password !== form.confirm_password) {
      return toast.error("Passwords do not match");
    }
    await resetPassword({ body: form, token }).unwrap().catch(() => {});
  };

  return (
    <div className="flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border">

        {/* Back */}
        <Link
          to="/auth/login"
          className="inline-flex items-center text-sm text-gray-500 hover:text-[#cf3425] transition mb-6"
        >
          <FaArrowLeft className="mr-2 text-xs" />
          Back to Login
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[#cf3425] tracking-wide">
            Reset Password
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Create a new secure password for your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              New Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter new password"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#cf3425]/30 focus:border-[#cf3425] outline-none transition"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                name="confirm_password"
                type="password"
                value={form.confirm_password}
                onChange={handleChange}
                required
                placeholder="Confirm new password"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#cf3425]/30 focus:border-[#cf3425] outline-none transition"
              />
            </div>
          </div>

          {/* Password Hint */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-500">
            Password should be at least 8 characters and include letters & numbers.
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-[#cf3425] hover:bg-[#b82e1f] transition shadow-md disabled:opacity-60"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-400 border-t pt-4">
          🔒 Your password is securely encrypted.
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;
