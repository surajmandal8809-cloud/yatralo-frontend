import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Camera,
  Edit3,
  LogOut,
  Save,
  Ticket,
  Train,
  Plane,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  X,
  RefreshCw,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  useGetUserQuery,
  useUpdateAvatarMutation,
  useUpdateUserMutation,
} from "../../services/userService";
import { useCancelBookingMutation, useGetMyBookingsQuery } from "../../services/bookingService";
import { getBookings, cancelBooking as localCancelBooking, formatInr } from "../../utils/bookingUtils";


const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?background=7c3aed&color=fff&name=Traveller&size=240";

const COVER_GRADIENT =
  "linear-gradient(135deg, #4c1d95 0%, #7c3aed 55%, #f97316 100%)";

const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const bookingIcon = (type) => (type === "train" ? Train : Plane);

export default function ProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const token = localStorage.getItem("token");

  const { data, isLoading, isError, error, refetch } = useGetUserQuery(token, {
    skip: !token,
  });

  const [updateUser, { isLoading: isSaving }] = useUpdateUserMutation();
  const [updateAvatar, { isLoading: isUploadingAvatar }] =
    useUpdateAvatarMutation();
  const [cancelApiBooking] = useCancelBookingMutation();
  const { refetch: refetchBookings } = useGetMyBookingsQuery();

  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [bookings, setBookings] = useState(() => getBookings());

  const user = data?.data;

  /* ---------------- LOGIN CHECK ---------------- */

  useEffect(() => {
    if (!token) {
      toast.error("Please login");
      navigate("/auth/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (error?.status === 401) {
      localStorage.removeItem("token");
      navigate("/auth/login");
    }
  }, [error, navigate]);

  /* ---------------- LOAD USER DATA ---------------- */

  useEffect(() => {
    if (!user) return;

    setFormData({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      phone: user.mobile || "",
      location: user.location || "",
      bio: user.bio || "",
    });

    setAvatarPreview(user.avatar || null);
  }, [user]);

  /* ---------------- BOOKINGS SYNC ---------------- */

  useEffect(() => {
    const refresh = () => setBookings(getBookings());

    window.addEventListener("bookings-updated", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("bookings-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  /* ---------------- STATS ---------------- */

  const stats = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);

    return {
      total: bookings.length,
      upcoming: bookings.filter((b) => b.travelDate >= today).length,
      spent: bookings.reduce((a, b) => a + (Number(b.totalPrice) || 0), 0),
      flights: bookings.filter((b) => b.type === "flight").length,
      trains: bookings.filter((b) => b.type === "train").length,
    };
  }, [bookings]);

  const recentBookings = useMemo(() => bookings.slice(0, 5), [bookings]);

  /* ---------------- USER INFO ---------------- */

  const displayName =
    `${formData.first_name} ${formData.last_name}`.trim() || "Traveller";

  const initials =
    `${formData.first_name?.[0] || ""}${formData.last_name?.[0] || ""}` ||
    formData.email?.[0] ||
    "T";

  /* ---------------- FORM ---------------- */

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      await updateUser(formData).unwrap();
      toast.success("Profile updated");
      setIsEditing(false);
      refetch();
    } catch {
      toast.error("Update failed");
    }
  };

  const handleCancel = () => {
    if (!user) return;
    setIsEditing(false);
    setFormData({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      phone: user.mobile || "",
      location: user.location || "",
      bio: user.bio || "",
    });
  };

  /* ---------------- AVATAR ---------------- */

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Max size 2MB");
      return;
    }

    const reader = new FileReader();

    reader.onload = async (event) => {
      const base64 = event.target.result;

      setAvatarPreview(base64);

      try {
        await updateAvatar({ avatar: base64 }).unwrap();
        toast.success("Avatar updated");
      } catch {
        toast.error("Upload failed");
        setAvatarPreview(user?.avatar);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleCancelBooking = async (id, status) => {
    if (status === "cancelled") return;
    const ok = window.confirm("Cancel this booking?");
    if (!ok) return;

    try {
      // 1. Cancel in DB
      const bookingToCancel = bookings.find(b => b.id === id || b._id === id);
      const dbId = bookingToCancel?._id || id;
      await cancelApiBooking(dbId).unwrap();
      
      // 2. Local fallback
      localCancelBooking(id);
      setBookings(getBookings());
      refetchBookings();
      toast.success("Booking cancelled");
    } catch (err) {
      toast.error("Failed to cancel booking in database");
    }
  };

  /* ---------------- LOGOUT ---------------- */

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
    toast.success("Logged out");
  };

  /* ---------------- LOADING ---------------- */

  if (token && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-violet-100 border-t-[#7c3aed] rounded-full animate-spin" />
      </div>
    );
  }

  if (token && isError && error?.status !== 401) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button onClick={refetch} className="text-[#7c3aed] font-bold">
          Retry Loading Profile
        </button>
      </div>
    );
  }

  /* ---------------- PAGE ---------------- */

  return (
    <div className="min-h-screen bg-slate-50 pb-16">

      {/* COVER */}
      <section
        className="h-56"
        style={{ background: COVER_GRADIENT }}
      />

      {/* PROFILE CARD */}
      <section className="max-w-6xl mx-auto px-6 -mt-20">

        <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-200">

          {/* HEADER */}
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="relative">

                <div className="w-28 h-28 rounded-2xl overflow-hidden relative">
                  <img
                    src={avatarPreview || DEFAULT_AVATAR}
                    alt=""
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-opacity ${isUploadingAvatar ? "opacity-30" : "opacity-100"}`}
                  />
                  {isUploadingAvatar && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <RefreshCw className="animate-spin text-white" size={24} />
                    </div>
                  )}
                </div>

                <button
                  onClick={() => fileInputRef.current.click()}
                  className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl flex items-center justify-center shadow-md transition-all"
                >
                  <Camera size={16} />
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleAvatarChange}
                />

              </div>

              <div>

                <h2 className="text-xl md:text-2xl font-black text-slate-900">{displayName}</h2>

                <p className="text-slate-500 text-xs md:text-sm font-medium">{formData.email}</p>

                <div className="flex gap-2 mt-2">

                  <span className="bg-slate-100 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider text-slate-700">
                    {stats.total} Bookings
                  </span>

                  <span className="bg-violet-50 text-[#7c3aed] border border-violet-100 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider">
                    {stats.flights} Flights
                  </span>

                  <span className="bg-orange-50 text-[#f97316] border border-orange-200 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider">
                    {stats.trains} Trains
                  </span>

                </div>

              </div>

            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveTab("settings");
                  setIsEditing(true);
                }}
                className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl flex items-center gap-2 text-[11px] font-black uppercase tracking-wider hover:bg-slate-50 transition-all"
              >
                <Edit3 size={16} />
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-slate-200 text-[#7c3aed] border-[#7c3aed]/20 bg-violet-50/30 rounded-xl flex items-center gap-2 text-[11px] font-black uppercase tracking-wider hover:bg-violet-50 transition-all"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>

          </div>

          {/* TABS */}
          <div className="flex items-center gap-6 mt-8 border-b border-slate-100">
            {["overview", "settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[11px] font-black uppercase tracking-widest transition-all relative ${
                  activeTab === tab ? "text-[#7c3aed]" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#7c3aed] rounded-full" />
                )}
              </button>
            ))}
          </div>

        </div>

      </section>

      <section className="max-w-6xl mx-auto px-6 mt-6">
        {activeTab === "overview" ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 px-1">About Me</h3>
                <p className="text-slate-600 text-sm leading-relaxed px-1">
                  {formData.bio || "No bio added yet. Tell us about your travel preferences!"}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                  <InfoItem icon={<Mail size={16}/>} label="Email Address" value={formData.email} />
                  <InfoItem icon={<Phone size={16}/>} label="Phone Number" value={formData.phone || "Not provided"} />
                  <InfoItem icon={<MapPin size={16}/>} label="Location" value={formData.location || "Earth"} />
                  <InfoItem icon={<Calendar size={16}/>} label="Birthday" value="Jan 15, 1995" />
                </div>
              </div>
               <div className="bg-[#1e1b4b] rounded-3xl p-6 text-white relative overflow-hidden shadow-xl">
                 <div className="relative z-10">
                   <h3 className="text-sm font-black uppercase tracking-widest mb-6 opacity-60 text-white">Travel Status</h3>
                   <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                      <Plane size={32} className="text-[#f97316]" />
                   </div>
                   <p className="text-2xl font-black mb-1">Explorer</p>
                   <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-8">Level 4 Member</p>
                   <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                           <span>Progress to Gold</span>
                           <span>75%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full">
                           <div className="h-full bg-gradient-to-r from-[#7c3aed] to-[#f97316] rounded-full" style={{ width: '75%' }} />
                        </div>
                      </div>
                      <p className="text-[10px] font-bold text-white/40 leading-relaxed">
                        Complete 2 more trips to unlock Premium Lounge access and priority boarding.
                      </p>
                   </div>
                 </div>
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#7c3aed]/20 blur-3xl rounded-full" />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-black text-slate-900">Personal Information</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Update your account details and preferences</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full bg-[#7c3aed] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-violet-100 hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  {isSaving ? <RefreshCw className="animate-spin" size={14} /> : <Save size={14} />}
                  Save Changes
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                <input
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#7c3aed]/30 outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                <input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#7c3aed]/30 outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <input
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full bg-slate-100 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-400 cursor-not-allowed outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 00000 00000"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#7c3aed]/30 outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#7c3aed]/30 outline-none transition-all resize-none"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-6">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900">Recent Bookings</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Manage your upcoming and past trips</p>
            </div>
            <Ticket className="text-[#f97316]" size={24} />
          </div>
          <div className="divide-y divide-slate-100">
            {recentBookings.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <Ticket size={32} />
                </div>
                <p className="text-sm text-slate-500 font-bold">No bookings found</p>
                <Link to="/flights" className="text-[#7c3aed] text-xs font-black uppercase tracking-widest mt-4 inline-block hover:underline">Book your first trip</Link>
              </div>
            ) : (
              recentBookings.map((b) => {
                const isCancelled = b.status === "cancelled";
                const isFlight = b.type === "flight";
                const TypeIcon = isFlight ? Plane : (b.type === "train" ? Train : Ticket);
                
                return (
                  <div key={b.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isCancelled ? "bg-slate-100 text-slate-400" : "bg-violet-50 text-[#7c3aed]"}`}>
                        <TypeIcon size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-sm font-black text-slate-900">
                            {b.fromCode} → {b.toCode}
                          </span>
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                            isCancelled 
                              ? "bg-slate-100 text-slate-500 border-slate-200" 
                              : "bg-emerald-50 text-emerald-700 border-emerald-100"
                          }`}>
                            {isCancelled ? "cancelled" : b.status || "confirmed"}
                          </span>
                        </div>
                        <p className="text-[11px] font-bold text-slate-500">
                          {b.providerName} • {b.departTime} - {b.arriveTime} • {new Date(b.travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                        {b.class && (
                          <p className="text-[10px] font-black text-[#f97316] uppercase tracking-tighter mt-1">
                            {b.class} Class • {b.meal || "No Meal"}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0">
                      <div className="text-left md:text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Total Paid</p>
                        <p className="text-lg font-black text-slate-900">{formatInr(b.totalPrice)}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCancelBooking(b.id, b.status)}
                          disabled={isCancelled}
                          className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            isCancelled 
                              ? "bg-slate-100 text-slate-300 cursor-not-allowed" 
                              : "bg-white border-2 border-slate-200 text-slate-700 hover:border-violet-200 hover:text-[#7c3aed]"
                          }`}
                        >
                          {isCancelled ? "Cancelled" : "Cancel trip"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {recentBookings.length > 0 && (
            <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
              <Link to="/bookings" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-[#7c3aed] transition-colors">View All Bookings</Link>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-0.5">{label}</p>
        <p className="text-sm font-black text-slate-800">{value}</p>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{label}</p>
      <p className="text-lg md:text-xl font-black text-slate-900">{value}</p>
    </div>
  );
}
