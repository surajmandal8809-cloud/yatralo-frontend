import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaSquareXTwitter } from "react-icons/fa6";

const SocialAuth = ({ variant = "default" }) => {
  const handleSocial = (name) => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
    window.location.href = `${apiUrl}/auth/${name}`;
  };

  if (variant === "circles") {
    return (
      <>
        <button
          onClick={() => handleSocial("google")}
          className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm group"
          title="Login with Google"
        >
          <FcGoogle size={24} />
        </button>
        <button
          onClick={() => handleSocial("facebook")}
          className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm group"
          title="Login with Facebook"
        >
          <FaFacebook size={24} className="text-[#1877F2]" />
        </button>
        <button
          onClick={() => handleSocial("twitter")}
          className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm group"
          title="Login with X"
        >
          <FaSquareXTwitter size={24} className="text-black" />
        </button>
      </>
    );
  }

  return (
    <div className="mt-8">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500 font-bold uppercase tracking-wider text-[10px]">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Buttons */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <button
          onClick={() => handleSocial("google")}
          className="flex justify-center items-center py-3.5 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md hover:border-gray-200 transition-all group"
        >
          <FcGoogle size={20} />
        </button>

        <button
          onClick={() => handleSocial("facebook")}
          className="flex justify-center items-center py-3.5 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md hover:border-gray-200 transition-all group"
        >
          <FaFacebook size={20} className="text-[#1877F2]" />
        </button>

        <button
          onClick={() => handleSocial("twitter")}
          className="flex justify-center items-center py-3.5 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md hover:border-gray-200 transition-all group"
        >
          <FaSquareXTwitter size={20} className="text-black" />
        </button>
      </div>
    </div>
  );
};

export default SocialAuth;