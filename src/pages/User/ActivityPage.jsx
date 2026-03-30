import React from "react";
import UserLayout from "./UserLayout";
import { Activity, ShieldCheck, MapPin, Tablet, Laptop, Smartphone, AlertTriangle, ChevronRight, History } from "lucide-react";
import { useGetUserQuery } from "../../services/userService";

const ActivityPage = () => {
    const token = localStorage.getItem("token");
    const { data } = useGetUserQuery(token, { skip: !token });
    const user = data?.data;

    const deviceMap = {
        'desktop': Laptop,
        'mobile': Smartphone,
        'tablet': Tablet
    };

    return (
        <UserLayout activeTab="activity">
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom duration-700">
                
                {/* Security Activity Header */}
                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                   <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                         <Activity size={28} />
                      </div>
                      <div>
                         <h2 className="text-3xl font-black italic uppercase tracking-tight">Security Activity</h2>
                         <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-1">Track your logins and account events in real-time</p>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                   {/* Session Status Overview */}
                   <section className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-sm relative group overflow-hidden hover:shadow-xl transition-all duration-700">
                      <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500" />
                      <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                         Session Status
                      </h3>
                      <div className="space-y-10">
                         <div className="text-center bg-slate-50 p-8 rounded-[2rem] border border-slate-100 group-hover:bg-emerald-50/50 transition-colors">
                            <h4 className="text-4xl font-black text-slate-950 italic mb-2 tracking-tighter">14</h4>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Logins (30 Days)</p>
                         </div>
                         <div className="space-y-6">
                            <div className="flex justify-between items-center bg-white p-6 border border-slate-100 rounded-3xl group shadow-sm hover:border-emerald-200 transition-all">
                               <div className="flex items-center gap-3">
                                  <ShieldCheck className="text-emerald-500" size={18} />
                                  <span className="text-xs font-black text-slate-800 uppercase italic">Primary Device</span>
                               </div>
                               <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">TRUSTED</span>
                            </div>
                            <div className="flex justify-between items-center bg-white p-6 border border-slate-100 rounded-3xl group shadow-sm hover:border-emerald-200 transition-all">
                               <div className="flex items-center gap-3">
                                  <AlertTriangle className="text-orange-500" size={18} />
                                  <span className="text-xs font-black text-slate-800 uppercase italic">Alerts</span>
                               </div>
                               <span className="text-[9px] font-black text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">0 ACTIVE</span>
                            </div>
                         </div>
                      </div>
                   </section>

                   {/* Login History Timeline */}
                   <section className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-sm lg:col-span-2 relative group overflow-hidden hover:shadow-xl transition-all duration-700">
                      <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600" />
                      <div className="flex items-center justify-between mb-8">
                         <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                            Recent Activity Logs
                         </h3>
                         <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View History Report</button>
                      </div>

                      <div className="space-y-4">
                         {[
                           { device: 'desktop', os: 'Windows 11', browser: 'Chrome 122', ip: '192.168.1.45', loc: 'Mumbai, India', date: 'Just now', current: true },
                           { device: 'mobile', os: 'iOS 17.2', browser: 'Safari 17', ip: '152.16.82.11', loc: 'Delhi, India', date: 'Mar 24, 2024 (14:32)' },
                           { device: 'tablet', os: 'iPadOS 17', browser: 'Brave 1.6', ip: '10.0.0.122', loc: 'Bangalore, India', date: 'Mar 21, 2024 (09:12)' },
                         ].map((l, i) => (
                           <div key={i} className="flex flex-col md:flex-row items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-[2rem] gap-6 group hover:bg-white hover:border-blue-200 hover:shadow-lg transition-all">
                              <div className="flex items-center gap-5">
                                 <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-all shadow-sm group-hover:scale-110">
                                    {React.createElement(deviceMap[l.device], { size: 22 })}
                                 </div>
                                 <div className="text-left">
                                    <div className="flex items-center gap-3"><p className="text-sm font-black text-slate-900 uppercase italic leading-none">{l.os} • {l.browser}</p>{l.current && <span className="text-[8px] font-black bg-blue-600 text-white rounded px-1.5 py-0.5">CURRENT SESSION</span>}</div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5 flex items-center gap-2"><MapPin size={10} className="text-blue-500" /> {l.loc} | IP: {l.ip}</p>
                                 </div>
                              </div>
                              <div className="flex flex-col md:items-end gap-1">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{l.date}</p>
                                 <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-[0.1em]">Successful Auth</p>
                              </div>
                           </div>
                         ))}
                      </div>
                   </section>
                </div>

                {/* Account Events Integration Filter */}
                <div className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-sm relative group overflow-hidden hover:shadow-xl transition-all duration-700">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                       Transactional Account Events
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                          { title: 'Password Reset', date: 'Jan 15, 2024', status: 'Completed' },
                          { title: '2FA Enrollment', date: 'Feb 12, 2024', status: 'Active' },
                          { title: 'Booking Authorization', date: 'Mar 10, 2024', status: 'Verified' },
                          { title: 'Wallet Recharge', date: 'Mar 24, 2024', status: 'Success' },
                        ].map(e => (
                           <div key={e.title} className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] group hover:bg-white hover:border-indigo-200 transition-all text-center">
                              <p className="text-xs font-black text-slate-950 uppercase italic mb-1">{e.title}</p>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">{e.date}</p>
                              <span className="text-[8px] font-black bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg uppercase">{e.status}</span>
                           </div>
                        ))}
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default ActivityPage;
