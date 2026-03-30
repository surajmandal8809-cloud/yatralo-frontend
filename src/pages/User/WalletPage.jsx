import React from "react";
import UserLayout from "./UserLayout";
import { RefreshCw } from "lucide-react";

const WalletPage = () => {
  return (
    <UserLayout activeTab="wallet">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-black text-slate-900">YatraLo Wallet</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Manage your credits and digital currency</p>
          </div>
          <div className="flex gap-2">
            <div className="bg-orange-50 border border-orange-100 px-4 py-2 rounded-2xl flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-black text-xs">Y</div>
              <div><p className="text-[9px] font-black text-orange-400 uppercase leading-none">Coins</p><p className="text-sm font-black text-slate-800">1,250</p></div>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-2xl flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-black text-xs">₹</div>
              <div><p className="text-[9px] font-black text-emerald-500 uppercase leading-none">Balance</p><p className="text-sm font-black text-slate-800">₹450.00</p></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="p-8 bg-gradient-to-br from-slate-900 to-indigo-900 rounded-3xl text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-4">Traveler Credit Card</p>
                <div className="flex justify-between items-end">
                  <div><p className="text-3xl font-black mb-1">₹450.00</p><p className="text-[10px] uppercase font-black opacity-50">Available Balance</p></div>
                  <div className="text-right"><p className="text-sm font-black italic opacity-80 mb-1">VISA</p><p className="text-[10px] font-black opacity-40">•••• 4582</p></div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -rotate-45 translate-x-10 -translate-y-10 rounded-full" />
            </div>
            <button className="w-full py-4 bg-[#7c3aed] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-violet-100 hover:opacity-90 transition-all">Add Money to Wallet</button>
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Recent Transactions</h4>
            <div className="space-y-3">
              {[
                { title: "Flight Booking Discount", amount: "+ ₹200", date: "Today", type: "credit" },
                { title: "Coin Reward (Bonus)", amount: "+ 50 coins", date: "Yesterday", type: "credit" },
                { title: "Hotel Checkout", amount: "- ₹1,250", date: "24 Mar", type: "debit" },
              ].map((t, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:bg-white hover:shadow-lg hover:shadow-slate-100 group">
                  <div><p className="text-sm font-black text-slate-800 group-hover:text-[#7c3aed] transition-colors">{t.title}</p><p className="text-[10px] font-bold text-slate-400">{t.date}</p></div>
                  <p className={`text-sm font-black ${t.type === 'credit' ? 'text-emerald-500' : 'text-rose-500'}`}>{t.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default WalletPage;
