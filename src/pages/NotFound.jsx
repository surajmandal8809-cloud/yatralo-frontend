import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center relative">
                {/* Decorative Background Elements */}
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse delay-700"></div>

                <p className="text-9xl font-black text-slate-200 select-none">404</p>

                <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                    Page Not Found
                </h1>

                <p className="mt-6 text-lg leading-7 text-slate-600 max-w-md mx-auto">
                    Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="flex items-center gap-2 rounded-xl bg-[#cf3425] px-8 py-4 text-sm font-semibold text-white shadow-xl hover:bg-[#b82e1f] transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        <Home className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-300 hover:ring-slate-400 hover:bg-slate-50 transition-all duration-300 active:scale-95"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                </div>

                {/* Support Link */}
                <div className="mt-12">
                    <Link to="/contact" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                        Contact Support <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
