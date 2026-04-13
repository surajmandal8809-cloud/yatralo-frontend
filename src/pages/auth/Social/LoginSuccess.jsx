import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiLoader, FiCheckCircle } from "react-icons/fi";

const LoginSuccessPage = () => {
    const [status, setStatus] = useState("processing"); // processing, success, error

    useEffect(() => {
        const getTokenFromUrl = () => {
            let params = new URLSearchParams(window.location.search);
            let token = params.get("token");
            if (token) return token;

            const hash = window.location.hash;
            const queryStart = hash.indexOf("?");
            if (queryStart !== -1) {
                params = new URLSearchParams(hash.slice(queryStart));
                token = params.get("token");
            }
            return token;
        };

        const token = getTokenFromUrl();
        if (token) {
            localStorage.setItem("token", token);
            setStatus("success");
            toast.success("Login Successful!");
            setTimeout(() => {
                window.location.replace("/");
            }, 1000);
        } else {
            setStatus("error");
            toast.error("Authentication failed");
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-10 text-center animate-in fade-in zoom-in duration-300">
                {status === "processing" && (
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 border-4 border-violet-100 border-t-[#7c3aed] rounded-full animate-spin mb-6" />
                        <h2 className="text-xl font-black text-gray-900">VERIFYING SESSION</h2>
                        <p className="text-gray-500 text-sm mt-2">Please wait while we secure your connection...</p>
                    </div>
                )}

                {status === "success" && (
                    <div className="flex flex-col items-center text-[#f97316]">
                        <FiCheckCircle size={64} className="mb-6 animate-bounce" />
                        <h2 className="text-2xl font-black text-gray-900">WELCOME ABOARD</h2>
                        <p className="text-gray-500 text-sm mt-2 font-bold uppercase tracking-widest">REDIRECTING TO DASHBOARD</p>
                    </div>
                )}

                {status === "error" && (
                    <div className="flex flex-col items-center text-red-500">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
                            <span className="text-3xl">❌</span>
                        </div>
                        <h2 className="text-xl font-black text-gray-900">SESSION EXPIRED</h2>
                        <p className="text-gray-500 text-sm mt-2 mb-8">We couldn't authenticate your request.</p>
                        <button onClick={() => window.location.replace("/")} className="w-full bg-gradient-to-r from-[#7c3aed] to-[#f97316] text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition-opacity">
                            BACK TO HOME
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginSuccessPage;

