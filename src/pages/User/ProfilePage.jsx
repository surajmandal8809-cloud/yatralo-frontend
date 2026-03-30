import React, { useState } from "react";
import UserLayout from "./UserLayout";
import { User, Mail, Phone, MapPin, Calendar, ShieldCheck, Edit3 } from "lucide-react";
import { useGetUserQuery } from "../../services/userService";

const ProfilePage = () => {
  const token = localStorage.getItem("token");
  const { data } = useGetUserQuery(token, { skip: !token });
  const user = data?.data;

  return (
    <UserLayout activeTab="overview">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <h3 className="text-xl font-black text-slate-950 uppercase italic tracking-tight mb-8">Personal Information</h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <InfoItem icon={<User size={18} className="text-blue-600" />} label="Full Name" value={`${user?.first_name} ${user?.last_name}`} />
                <InfoItem icon={<Mail size={18} className="text-blue-600" />} label="Email Address" value={user?.email} />
                <InfoItem icon={<Phone size={18} className="text-blue-600" />} label="Mobile Number" value={user?.mobile || "+91 98765 43210"} />
                <InfoItem icon={<Calendar size={18} className="text-blue-600" />} label="Date of Birth" value={user?.dob || "15 Aug 1995"} />
                <InfoItem icon={<MapPin size={18} className="text-blue-600" />} label="Address" value={user?.address || "Mumbai, Maharashtra, India"} />
                <InfoItem icon={<ShieldCheck size={18} className="text-emerald-500" />} label="Identity Status" value="Verified (Passport)" />
             </div>

             <div className="mt-12 pt-10 border-t border-slate-100 flex justify-end">
                <button className="px-8 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-100 flex items-center gap-3 active:scale-95 transition-all"><Edit3 size={14} /> Edit Profile Info</button>
             </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
             <h3 className="text-xl font-black text-slate-950 uppercase italic tracking-tight mb-8">Travel Preferences</h3>
             <div className="flex flex-wrap gap-4">
                {['Direct Flights Only', 'Window Seat Preferred', 'Vegetarian Meal', 'High Floor Hotels'].map(pref => (
                  <span key={pref} className="px-5 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100 shadow-sm">{pref}</span>
                ))}
             </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <aside className="space-y-8">
           <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                 <ShieldCheck size={40} className="mb-6 text-blue-200" />
                 <h4 className="text-xl font-black uppercase italic leading-none mb-3">Premium Member</h4>
                 <p className="text-[10px] font-bold text-blue-100/60 uppercase tracking-widest mb-6">Active since Mar 2024</p>
                 <div className="space-y-4">
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-white rounded-full w-3/4"></div></div>
                    <p className="text-[10px] font-black tracking-[0.15em] opacity-80 uppercase">750 points to Gold Elite</p>
                 </div>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl translate-x-10 translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>
           </div>

           <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Recently Added</p>
              <div className="space-y-6">
                 {[
                   { label: 'Visa Status', value: 'Active', color: 'text-emerald-500' },
                   { label: 'Passport Expiry', value: 'Dec 2028', color: 'text-slate-800' },
                 ].map(i => (
                   <div key={i.label} className="flex justify-between items-center">
                      <span className="text-xs font-black text-slate-900 opacity-60 uppercase">{i.label}</span>
                      <span className={`text-xs font-black uppercase italic ${i.color}`}>{i.value}</span>
                   </div>
                 ))}
              </div>
           </div>
        </aside>
      </div>
    </UserLayout>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="group">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">{icon} {label}</p>
    <p className="text-sm font-black text-slate-800 uppercase italic tracking-tight group-hover:text-blue-600 transition-colors">{value || "Not Set"}</p>
  </div>
);

export default ProfilePage;
