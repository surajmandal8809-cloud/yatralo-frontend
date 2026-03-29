import React from "react";

export default function HotelCheckoutSummary({ hotel, checkIn, checkOut, totalAmount }) {
    return (
        <div className="sticky top-24 bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Booking Summary</h3>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <p className="text-xl font-black">{hotel?.name}</p>
                    <p className="text-xs text-slate-500">{hotel?.city}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-2">{checkIn || "Today"} to {checkOut || "Tomorrow"}</p>
                </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex justify-between">
                <span className="font-bold">Total Payable</span>
                <span className="text-2xl font-black text-blue-600">₹{totalAmount}</span>
            </div>
        </div>
    );
}
