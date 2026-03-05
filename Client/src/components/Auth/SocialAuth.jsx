import React from "react";

const SocialAuth = () => {

  const handleSocial = (provider) => {
    const baseURL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
    window.location.href = `${baseURL}/auth/${provider}`;
  };

  return (
    <div className="mt-8">

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Buttons */}
      <div className="mt-6 grid grid-cols-3 gap-4">

        {/* GOOGLE */}
        <button
          onClick={() => handleSocial("google")}
          className="flex justify-center items-center py-3 rounded-xl border border-gray-200 bg-white hover:shadow-md hover:scale-105 transition-all"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path fill="#EA4335" d="M12 10.2v3.8h5.3c-.2 1.2-1.4 3.5-5.3 3.5-3.2 0-5.8-2.6-5.8-5.8S8.8 5.9 12 5.9c1.8 0 3 .8 3.7 1.5l2.5-2.4C16.7 3.5 14.6 2.6 12 2.6 6.8 2.6 2.6 6.8 2.6 12S6.8 21.4 12 21.4c6.9 0 9.6-4.8 9.6-7.3 0-.5 0-.9-.1-1.2H12z"/>
          </svg>
        </button>

        {/* FACEBOOK */}
        <button
          onClick={() => handleSocial("facebook")}
          className="flex justify-center items-center py-3 rounded-xl border border-gray-200 bg-white hover:shadow-md hover:scale-105 transition-all"
        >
          <svg
            className="w-5 h-5 text-[#1877F2]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.3V12h2.3V9.8c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.5.7-1.5 1.4V12h2.6l-.4 2.9h-2.2v7A10 10 0 0 0 22 12z"/>
          </svg>
        </button>

        {/* TWITTER / X */}
        <button
          onClick={() => handleSocial("twitter")}
          className="flex justify-center items-center py-3 rounded-xl border border-gray-200 bg-white hover:shadow-md hover:scale-105 transition-all"
        >
          <svg
            className="w-5 h-5 text-black"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M18.244 2H21l-6.5 7.43L22 22h-6.828l-4.267-5.57L5.93 22H3l6.96-7.96L2 2h6.9l3.77 5.05L18.244 2z"/>
          </svg>
        </button>

      </div>
    </div>
  );
};

export default SocialAuth;