// LoginSuccessPage.jsx
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginSuccessPage = () => {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(true);

  const params = new URLSearchParams(window.location.search);
  const userSession = params.get("token");

  useEffect(() => {
    if (userSession) {
      localStorage.setItem("token", userSession);
      toast.success("Login Successful! 🎉");

      const timer = setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setProcessing(false);
      toast.error("Invalid login session");
    }
  }, [userSession, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 relative overflow-hidden">

      {/* Background Gradient Blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden">

          {/* Top Gradient Bar */}
          <div className="h-1.5 bg-gradient-to-r from-orange-500 to-indigo-600"></div>

          <div className="p-8 text-center">

            {/* Spinner / Icon */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative w-20 h-20 mx-auto bg-gradient-to-r from-orange-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                {processing ? (
                  <svg
                    className="animate-spin h-10 w-10 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                ) : (
                  <span className="text-4xl text-white">❌</span>
                )}
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-2">
              {processing ? (
                <span className="bg-gradient-to-r from-orange-500 to-indigo-600 bg-clip-text text-transparent">
                  Processing...
                </span>
              ) : (
                <span className="text-red-500">Login Failed</span>
              )}
            </h2>

            {/* Message */}
            <p className="text-gray-600 text-sm mb-6">
              {processing
                ? "Please wait while we securely redirect you."
                : "Invalid login session. Please try again."}
            </p>

            {/* Progress Bar */}
            {processing && (
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 to-indigo-600 rounded-full animate-progress"></div>
              </div>
            )}

            {/* Retry Button */}
            {!processing && (
              <button
                onClick={() => navigate("/auth/login")}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-all font-semibold shadow-md hover:shadow-xl"
              >
                Back to Login
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              Secured by{" "}
              <span className="bg-gradient-to-r from-orange-500 to-indigo-600 bg-clip-text text-transparent font-semibold">
                Yatralo
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-blob {
          animation: blob 7s infinite ease-in-out;
        }
        .animate-progress {
          animation: progress 2s ease-out forwards;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default LoginSuccessPage;