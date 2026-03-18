import React from "react";
import { Tag, Check } from "lucide-react";
import toast from "react-hot-toast";

export default function FareSummaryComponent({ 
    item, pax, isSecureTrip, appliedCoupon, setAppliedCoupon, promoCode, setPromoCode, couponsData, calculateTotal, formatInr 
}) {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden sticky top-24">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="text-lg font-black text-slate-900 leading-none">Fare Summary</h3>
                </div>
                <div className="p-6 space-y-4">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 font-bold">Base Fare ({pax} Traveller{pax > 1 ? 's' : ''})</span>
                            <span className="text-slate-900 font-black">{formatInr(item.price * 0.85)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 font-bold">Taxes & Surcharges</span>
                            <span className="text-slate-900 font-black">{formatInr(item.price * 0.15)}</span>
                        </div>
                        {isSecureTrip && (
                            <div className="flex justify-between items-center text-sm text-emerald-600">
                                <span className="font-bold">Trip Secure Fee</span>
                                <span className="font-black">+{formatInr(199 * pax)}</span>
                            </div>
                        )}
                        {appliedCoupon && (
                            <div className="flex justify-between items-center text-sm text-emerald-600">
                                <span className="font-bold">Coupon ({appliedCoupon.code})</span>
                                <span className="font-black">-{formatInr(item.price - (item.price * (appliedCoupon.discountType === 'percentage' ? (1 - appliedCoupon.discountValue / 100) : (item.price - appliedCoupon.discountValue) / item.price)))}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                            <span className="text-sm font-bold text-slate-900">Total Amount</span>
                            <span className="text-xl font-black text-slate-900">{formatInr(calculateTotal())}</span>
                        </div>

                        {/* Offers Section */}
                        <div className="mt-8 pt-8 border-t border-slate-100">
                            <div className="flex items-center gap-2 mb-6 text-[#f97316]">
                                <Tag size={16} fill="currentColor" className="opacity-20" />
                                <h3 className="text-sm font-black uppercase tracking-widest">OFFERS & PROMOS</h3>
                            </div>
                            
                            <div className="relative mb-6">
                                <input 
                                    type="text" 
                                    placeholder="Enter Promo Code"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    className="w-full pl-4 pr-20 py-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 outline-none text-xs font-black uppercase tracking-widest focus:bg-white focus:border-[#f97316] transition-all"
                                />
                                <button 
                                    onClick={() => {
                                        const coupon = couponsData?.data?.find(c => c.code === promoCode.toUpperCase());
                                        if (coupon) {
                                            setAppliedCoupon(coupon);
                                            toast.success("Coupon Applied!");
                                        } else {
                                            toast.error("Invalid coupon code");
                                        }
                                    }}
                                    className="absolute right-2 top-1.5 bottom-1.5 px-4 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-[#f97316] transition-colors"
                                >
                                    Apply
                                </button>
                            </div>

                            <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                                {couponsData?.data?.map((coupon) => (
                                    <div 
                                        key={coupon._id}
                                        onClick={() => {
                                            setAppliedCoupon(appliedCoupon?.code === coupon.code ? null : coupon);
                                            if (appliedCoupon?.code !== coupon.code) toast.success(`${coupon.code} Applied!`);
                                        }}
                                        className={`p-4 border rounded-2xl relative group cursor-pointer transition-all ${appliedCoupon?.code === coupon.code ? "border-emerald-300 bg-emerald-50/20" : "border-slate-100 bg-slate-50/50 hover:border-[#f97316]/30"}`}
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <p className={`text-xs font-black ${appliedCoupon?.code === coupon.code ? "text-emerald-600" : "text-slate-900"}`}>{coupon.code}</p>
                                            {appliedCoupon?.code === coupon.code ? <Check size={14} className="text-emerald-500" /> : <button className="text-[10px] font-black text-[#f97316] uppercase tracking-widest">Apply</button>}
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-500">{coupon.description}</p>
                                        {appliedCoupon?.code === coupon.code && <div className="absolute inset-y-0 right-0 w-1 bg-emerald-500 rounded-r-lg" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
