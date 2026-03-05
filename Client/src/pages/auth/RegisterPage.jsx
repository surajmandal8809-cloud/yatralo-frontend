import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRegisterMutation } from "../../services/authService";
import toast from "react-hot-toast";
import SocialAuth from "../../components/Auth/SocialAuth";

const RegisterPage = () => {
const [register, {isLoading,isError,error,isSuccess, data}] = useRegisterMutation();

const [activeTab, setActiveTab] = useState("email");
  const navigate = useNavigate();

  useEffect(() => {

    if(isSuccess && data ){
     console.log("success",data)
     navigate("/auth/verify", {state : data.data})
     toast.success(data.message)

     setForm(null)
    }
    if(error){
      toast.error(error.data.message)
    }

  },[isLoading,isSuccess,isError,error, data])

 

  const [form, setForm] = useState({
    first_name: "",
    last_name:"",
    email: "",
    mobile:"",
    password:""
  });


  const handleChange = (e) => {
    const {name, value} = e.target

    setForm(prev => ({
      ...prev,
      [name]: value
      })
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
     
      if (!form.first_name)
      return toast.error("First name required");
     if (!form.last_name)
      return toast.error("Last name required");

     if (activeTab === "email" && !form.email)
      return toast.error("Email required");

    if (activeTab === "mobile" && !form.mobile)
      return toast.error("Mobile required");

      if (!form.password)
      return toast.error("Password required");
   
    await register(form).unwrap();

  }
    
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Yatra<span className="text-[#cf3425]">lo</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Create your account and start your journey.
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
                : "text-gray-500 hover:text-gray-700"
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
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Mobile
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={form.first_name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#cf3425]/30 focus:border-[#cf3425] outline-none transition"
            />

            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#cf3425]/30 focus:border-[#cf3425] outline-none transition"
            />
          </div>

          {/* Email / Mobile */}
          {activeTab === "email" ? (
            <input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#cf3425]/30 focus:border-[#cf3425] outline-none transition"
            />
          ) : (
            <div className="flex">
              <span className="px-4 flex items-center bg-gray-100 rounded-l-xl border border-r-0 border-gray-300 text-gray-600">
                +91
              </span>
              <input
                type="tel"
                name="mobile"
                placeholder="Enter Mobile Number"
                value={form.mobile}
                onChange={handleChange}
                maxLength={10}
                className="w-full px-4 py-3 rounded-r-xl border border-gray-300 focus:ring-2 focus:ring-[#cf3425]/30 focus:border-[#cf3425] outline-none transition"
              />
            </div>
          )}

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Create a strong password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#cf3425]/30 focus:border-[#cf3425] outline-none transition"
          />

          {/* Terms */}
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              id="agree"
              required
              className="mt-1 accent-[#cf3425]"
            />
            <label htmlFor="agree">
              I agree to the{" "}
              <span className="text-[#cf3425] font-medium hover:underline cursor-pointer">
                Terms of Service
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-[#cf3425] hover:opacity-90 transition shadow-md disabled:opacity-60"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Social Auth */}
        <div className="my-6">
          <SocialAuth />
        </div>

        {/* Login Redirect */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-[#cf3425] font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;