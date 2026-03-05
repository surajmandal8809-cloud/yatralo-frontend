import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../services/authService";
import toast from "react-hot-toast";
import { FaEnvelope, FaArrowLeft, FaMobileAlt } from "react-icons/fa";

const ForgotPassword = () => {

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("email");

  const [forgotPassword, { isLoading, error, isSuccess, data }] =
    useForgotPasswordMutation();

  const [form, setForm] = useState({
    email: "",
    mobile: "",
  });

  useEffect(() => {
  if (isSuccess && data) {
    toast.success(data.message);

    // If mobile → go to OTP page with userId & type
    if (activeTab === "mobile") {
      navigate("/auth/otp-verify", {
        state: {
          userId: data.data.userId,
          type: data.data.type,
        },
      });
    }
  }

  if (error) {
    toast.error(error?.data?.message || "Something went wrong");
  }
}, [isSuccess, error, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload =
      activeTab === "email"
        ? { email: form.email }
        : { mobile: form.mobile };

    await forgotPassword(payload).unwrap();
  };

  return (
    <div className="flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white border rounded-3xl shadow-xl p-8">

        <Link
          to="/auth/login"
          className="inline-flex items-center text-sm text-gray-500 hover:text-[#cf3425] transition mb-6"
        >
          <FaArrowLeft className="mr-2 text-xs" />
          Back to Login
        </Link>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-[#cf3425] tracking-wide">
            Forgot Password?
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Choose how you want to receive reset instructions.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
          <button
            type="button"
            onClick={() => setActiveTab("email")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "email"
                ? "bg-white shadow text-[#cf3425]"
                : "text-gray-500"
            }`}
          >
            Email
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("mobile")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "mobile"
                ? "bg-white shadow text-[#cf3425]"
                : "text-gray-500"
            }`}
          >
            Mobile
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {activeTab === "email" && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#cf3425]/30 focus:border-[#cf3425] outline-none transition"
                />
              </div>
            </div>
          )}

          {activeTab === "mobile" && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Mobile Number
              </label>
              <div className="relative">
                <FaMobileAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  name="mobile"
                  type="tel"
                  value={form.mobile}
                  onChange={handleChange}
                  required
                  placeholder="Enter mobile number"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#cf3425]/30 focus:border-[#cf3425] outline-none transition"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-[#cf3425] hover:opacity-90 transition shadow-md disabled:opacity-60"
          >
            {isLoading
              ? "Sending..."
              : activeTab === "email"
              ? "Send Email Instructions"
              : "Send OTP"}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-400 border-t pt-4">
          🔒 Reset links expire in 10 minutes for security reasons.
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;