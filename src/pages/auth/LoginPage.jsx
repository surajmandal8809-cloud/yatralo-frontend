import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/authService";
import toast from "react-hot-toast";
import SocialAuth from "../../components/Auth/SocialAuth";

const Login = () => {
  const [activeTab, setActiveTab] = useState("email");

  const [login, { isLoading, isError, error, isSuccess, data }] =
    useLoginMutation();

    const navigate = useNavigate();
    const query = new URLSearchParams(window.location.search);

  useEffect(() => {
    const errorParam = query.get("error");
    if (errorParam === "google_failed") {
      toast.error("Google authentication failed. Please try again.");
    }
  }, []);

  useEffect(() => {
  if (isSuccess && data?.status === true) {
    toast.success(data.message);

    navigate("/auth/verify", {
      state: {
        userId: data.data.userId,
        type: data.data.type,
      },
    });
  }

  if (isError) {
    toast.error(error?.data?.message || "Login failed");
  }
}, [isSuccess, isError, data, error, navigate]);

  const [form, setForm] = useState({
    email: "",
    mobile: "",
    password: "",
  });

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
        ? { email: form.email, password: form.password }
        : { mobile: form.mobile, password: form.password };

    await login(payload).unwrap().catch(() => {});
  };


  return (
    <div className="px-4 w-full flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl  p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight">
            Yatra<span className="text-[#cf3425]">lo</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Welcome back. Sign in to continue your journey.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("email")}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
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
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === "mobile"
                ? "bg-white shadow text-[#cf3425]"
                : "text-gray-500"
            }`}
          >
            Mobile
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {activeTab === "email" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#cf3425]/30 focus:border-[#cf3425] outline-none"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                name="mobile"
                type="tel"
                required
                value={form.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                maxLength={10}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#cf3425]/30 focus:border-[#cf3425] outline-none"
              />
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#cf3425]/30 focus:border-[#cf3425] outline-none"
              />
             
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="accent-[#cf3425]" />
              Remember me
            </label>

            <Link
              to="/auth/forgotpassword"
              className="text-[#cf3425] hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-[#cf3425] hover:bg-[#b82e1f] transition shadow-md disabled:opacity-60"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Social Auth */}
        <div className="my-6">
          <SocialAuth />
        </div>

        {/* Register */}
        <p className="text-center text-sm text-gray-600">
          New to Yatralo?{" "}
          <Link
            to="/auth/register"
            className="text-[#cf3425] font-semibold hover:underline"
          >
            Create an Account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;