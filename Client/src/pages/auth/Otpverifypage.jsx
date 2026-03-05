import { useNavigate , useLocation } from "react-router-dom";
import { useVerifyMutation } from "../../services/authService"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const otpverifypage = () => {
   const [verifyOTP, {isLoading, isSuccess, isError, error, data}] = useVerifyMutation();
  const navigate = useNavigate();
  const location = useLocation();

   const {userId, type, expiresAt} = location.state || {};


  const [form, setForm] = useState({
    otp: "",
     
  })

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
    if(!form.otp){
      return toast.error("OTP is required")
    }
    await verifyOTP({userId, otp: form.otp, type})
  } 

  useEffect(() => {
    console.log("verify", userId, type)

    if(isSuccess && data){
      toast.success(data.message  )
      localStorage.setItem("token", data.data.token)
navigate("/auth/resetpassword", {
  state: {
    from: "mobile"
  }
});    }
    if(isError){
      toast.error(error.data.message)
    }
  },[isLoading,isSuccess,isError,error, data])

  return (
  <div className="min-h-screen flex items-center justify-center e px-4">
    
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10">

      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#cf3425]/10">
          <span className="text-2xl font-bold text-[#cf3425]">OTP</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          Verify Your Account
        </h2>

        <p className="mt-3 text-sm text-gray-500 leading-relaxed">
          We emailed you the six digit code to confirm your account.
          Please enter the code below to continue.
        </p>
      </div>

      {/* Form */}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        
        <div>
          <label
            htmlFor="verificationCode"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Verification Code
          </label>

          <input
            type="number"
            id="verificationCode"
            name="otp"
            value={form.otp}
            onChange={handleChange}
            placeholder="Enter 6 digit code"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg tracking-widest text-center focus:border-[#cf3425] focus:ring-2 focus:ring-[#cf3425]/30 outline-none transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-[#cf3425] py-3 text-white font-semibold text-sm uppercase tracking-wide shadow-lg hover:opacity-90 transition"
        >
          Verify Account
        </button>

      </form>

      {/* Resend */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Didn’t receive the code?{" "}
          <span className="text-[#cf3425] font-semibold cursor-pointer hover:underline">
            Resend Code
          </span>
        </p>
      </div>

    </div>
  </div>
);
};

export default otpverifypage;