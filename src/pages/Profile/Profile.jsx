import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  LogOut,
  Edit3,
  Save,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Calendar,
  Plane,
  Heart,
  CreditCard,
  Shield,
  Bell,
  Globe,
  ChevronRight,
  Star,
  Award,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateAvatarMutation,
} from "../../services/userService";

const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?background=cf3425&color=fff&name=User&size=200&bold=true";

const COVER_GRADIENT =
  "linear-gradient(135deg, #1a0505 0%, #cf3425 50%, #ff6b35 100%)";

const ProfilePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");

  const { data, isLoading, isError, error, refetch } = useGetUserQuery(token, {
    skip: !token,
    refetchOnMountOrArgChange: true,
  });

  const user = data?.data;

  const [updateUser, { isLoading: isSaving }] = useUpdateUserMutation();
  const [updateAvatar, { isLoading: isUploadingAvatar }] = useUpdateAvatarMutation();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);

  /* ── Auth guard ── */
  useEffect(() => {
    if (!token) {
      toast.error("Please login to view your profile.");
      navigate("/auth/login", { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    if (error?.status === 401) {
      toast.error("Session expired. Please login again.");
      localStorage.removeItem("token");
      navigate("/auth/login", { replace: true });
    }
  }, [error, navigate]);

  /* ── Populate form ── */
  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || user.mobile || "",
        location: user.location || "",
        bio: user.bio || "",
      });
      setAvatarPreview(user.avatar || null);
    }
  }, [user]);

  /* ── Handlers ── */
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/auth/login");
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    try {
      await updateUser(formData).unwrap();
      toast.success("Profile updated!");
      setIsEditing(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  const handleCancelEdit = () => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || user.mobile || "",
        location: user.location || "",
        bio: user.bio || "",
      });
    }
    setIsEditing(false);
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error("Please select an image file");
    if (file.size > 2 * 1024 * 1024) return toast.error("Image must be smaller than 2 MB");

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = ev.target.result;
      setAvatarPreview(base64);
      try {
        await updateAvatar({ avatar: base64 }).unwrap();
        toast.success("Profile picture updated!");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || "Failed to update picture");
        setAvatarPreview(user?.avatar || null);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  /* ── Loading / Error ── */
  if (token && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 border-4 border-red-100 border-t-[#cf3425] rounded-full animate-spin mx-auto" />
          <p className="text-gray-500 text-sm font-medium">Loading your profile…</p>
        </div>
      </div>
    );
  }

  if (token && isError && error?.status !== 401) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-3">
          <p className="text-red-500 font-semibold">Failed to load profile</p>
          <button
            onClick={refetch}
            className="text-sm text-[#cf3425] underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const displayName =
    [formData.first_name, formData.last_name].filter(Boolean).join(" ") || "Traveller";

  const initials =
    (formData.first_name?.[0] || "") + (formData.last_name?.[0] || "") ||
    formData.email?.[0]?.toUpperCase() ||
    "U";

  const quickStats = [
    { label: "Trips Booked", value: "12", icon: Plane, color: "bg-orange-50 text-orange-500", border: "border-orange-100" },
    { label: "Miles Flown", value: "4,250", icon: Globe, color: "bg-blue-50 text-blue-500", border: "border-blue-100" },
    { label: "Saved Routes", value: "8", icon: Heart, color: "bg-rose-50 text-rose-500", border: "border-rose-100" },
    { label: "Total Spent", value: "₹45k", icon: CreditCard, color: "bg-emerald-50 text-emerald-500", border: "border-emerald-100" },
  ];

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "personal", label: "Personal Info" },
    { id: "settings", label: "Settings" },
  ];

  const recentTrips = [
    { from: "DEL", to: "BOM", date: "Feb 18, 2025", status: "Completed", price: "₹4,200", mode: "flight" },
    { from: "BOM", to: "GOI", date: "Jan 05, 2025", status: "Completed", price: "₹1,800", mode: "train" },
    { from: "DEL", to: "BLR", date: "Dec 22, 2024", status: "Completed", price: "₹5,100", mode: "flight" },
    { from: "JAI", to: "AGR", date: "Nov 10, 2024", status: "Completed", price: "₹650", mode: "train" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── HERO COVER ── */}
      <div className="relative h-56 md:h-72 w-full" style={{ background: COVER_GRADIENT }}>
        {/* decorative blobs */}
        <div className="absolute top-6 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
        {/* grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="absolute top-5 right-5 flex gap-2">
          <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 text-white text-xs font-semibold">
            <Award size={13} className="text-yellow-300" />
            Gold Member
          </div>
        </div>
      </div>

      {/* ── MAIN WRAPPER ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── AVATAR + NAME STRIP ── */}
        <div className="relative -mt-20 pb-6 flex flex-col md:flex-row items-center md:items-end gap-4">

          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-36 h-36 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-white">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-white text-4xl font-black"
                  style={{ background: COVER_GRADIENT }}
                >
                  {initials}
                </div>
              )}
            </div>

            {/* Camera button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingAvatar}
              className="absolute -bottom-2 -right-2 w-9 h-9 bg-[#cf3425] text-white rounded-xl shadow-lg flex items-center justify-center hover:bg-[#b02b1e] transition-all hover:scale-110 active:scale-95"
            >
              {isUploadingAvatar ? (
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <Camera size={15} />
              )}
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
          </div>

          {/* Name / email */}
          <div className="flex-1 text-center md:text-left md:pb-2">
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
              {displayName}
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">{formData.email}</p>
            {formData.location && (
              <p className="flex items-center justify-center md:justify-start gap-1 text-gray-400 text-xs mt-1">
                <MapPin size={11} /> {formData.location}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 md:pb-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition-all"
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>

        {/* ── STATS BAR ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {quickStats.map(({ label, value, icon: Icon, color, border }) => (
            <div
              key={label}
              className={`bg-white rounded-2xl border ${border} p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                <Icon size={18} />
              </div>
              <div>
                <p className="text-xl font-black text-gray-900 leading-none">{value}</p>
                <p className="text-[11px] text-gray-400 font-semibold mt-0.5 uppercase tracking-wide">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── TABS ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Tab header */}
          <div className="flex border-b border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setIsEditing(false); }}
                className={`relative flex-1 md:flex-none px-6 py-4 text-sm font-bold transition-all ${activeTab === tab.id
                  ? "text-[#cf3425]"
                  : "text-gray-400 hover:text-gray-700"
                  }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#cf3425] rounded-t-full" />
                )}
              </button>
            ))}
          </div>

          {/* ══ DASHBOARD TAB ══ */}
          {activeTab === "dashboard" && (
            <div className="p-6 space-y-6">

              {/* Level / loyalty card */}
              <div
                className="rounded-2xl p-5 text-white relative overflow-hidden"
                style={{ background: COVER_GRADIENT }}
              >
                <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
                <div className="absolute -bottom-10 -left-4 w-32 h-32 bg-white/10 rounded-full" />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">Loyalty Status</p>
                    <p className="text-2xl font-black">Gold Traveller</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex-1 bg-white/20 rounded-full h-2 w-48">
                        <div className="bg-yellow-300 h-2 rounded-full" style={{ width: "62%" }} />
                      </div>
                      <span className="text-xs text-white/80 font-semibold">62% to Platinum</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Star size={40} className="text-yellow-300 opacity-80" />
                  </div>
                </div>
              </div>

              {/* Recent trips */}
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-3">Recent Trips</h3>
                <div className="space-y-2">
                  {recentTrips.map((trip, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#cf3425]/20 hover:bg-red-50/30 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                          <Plane size={16} className="text-[#cf3425]" />
                        </div>
                        <div>
                          <p className="font-black text-gray-900 text-sm">
                            {trip.from}{" "}
                            <span className="text-gray-400 font-normal">→</span>{" "}
                            {trip.to}
                          </p>
                          <p className="text-xs text-gray-400">{trip.date}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <div>
                          <p className="text-sm font-black text-gray-800">{trip.price}</p>
                          <span className="text-[10px] bg-emerald-100 text-emerald-600 font-bold px-2 py-0.5 rounded-full">
                            {trip.status}
                          </span>
                        </div>
                        <ChevronRight size={15} className="text-gray-300 group-hover:text-[#cf3425] transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══ PERSONAL INFO TAB ══ */}
          {activeTab === "personal" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-black text-gray-900">Personal Information</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Update your personal details here</p>
                </div>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#cf3425] text-white text-sm font-semibold hover:bg-[#b02b1e] transition-all shadow-sm hover:shadow-md"
                  >
                    <Edit3 size={14} />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-all"
                    >
                      <X size={14} />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#cf3425] text-white text-sm font-semibold hover:bg-[#b02b1e] transition-all shadow-sm disabled:opacity-60"
                    >
                      {isSaving ? (
                        <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Save size={14} />
                      )}
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "First Name", name: "first_name", icon: User, placeholder: "Enter first name" },
                  { label: "Last Name", name: "last_name", icon: User, placeholder: "Enter last name" },
                  { label: "Email Address", name: "email", icon: Mail, placeholder: "Enter email", type: "email" },
                  { label: "Phone Number", name: "phone", icon: Phone, placeholder: "Enter phone number", type: "tel" },
                  { label: "Location", name: "location", icon: MapPin, placeholder: "City, Country" },
                ].map(({ label, name, icon: Icon, placeholder, type }) => (
                  <div key={name} className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">{label}</label>
                    <div className="relative">
                      <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
                      <input
                        type={type || "text"}
                        name={name}
                        value={formData[name] || ""}
                        onChange={handleChange}
                        placeholder={placeholder}
                        disabled={!isEditing}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium outline-none transition-all ${isEditing
                          ? "border-gray-200 bg-white focus:border-[#cf3425] focus:ring-2 focus:ring-[#cf3425]/10 text-gray-800"
                          : "border-gray-100 bg-gray-50 text-gray-600 cursor-default"
                          }`}
                      />
                    </div>
                  </div>
                ))}

                {/* Bio - full width */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">Bio</label>
                  <div className="relative">
                    <FileText size={15} className="absolute left-3.5 top-3.5 text-gray-300" />
                    <textarea
                      name="bio"
                      value={formData.bio || ""}
                      onChange={handleChange}
                      placeholder="Tell us about yourself…"
                      disabled={!isEditing}
                      rows={3}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium outline-none transition-all resize-none ${isEditing
                        ? "border-gray-200 bg-white focus:border-[#cf3425] focus:ring-2 focus:ring-[#cf3425]/10 text-gray-800"
                        : "border-gray-100 bg-gray-50 text-gray-600 cursor-default"
                        }`}
                    />
                  </div>
                </div>
              </div>

              {/* Member since */}
              {user?.createdAt && (
                <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-400">
                  <Calendar size={13} />
                  Member since{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-IN", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              )}
            </div>
          )}

          {/* ══ SETTINGS TAB ══ */}
          {activeTab === "settings" && (
            <div className="p-6 space-y-3">
              <h3 className="font-black text-gray-900 mb-5">Account Settings</h3>

              {[
                { icon: Bell, label: "Notifications", desc: "Manage your email & push alerts", color: "text-violet-500 bg-violet-50" },
                { icon: Shield, label: "Security & Password", desc: "Update password and 2FA", color: "text-emerald-500 bg-emerald-50" },
                { icon: Globe, label: "Language & Region", desc: "Set your preferred language", color: "text-blue-500 bg-blue-50" },
                { icon: CreditCard, label: "Payment Methods", desc: "Manage saved cards & UPI", color: "text-orange-500 bg-orange-50" },
              ].map(({ icon: Icon, label, desc, color }) => (
                <button
                  key={label}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#cf3425]/20 hover:bg-red-50/20 transition-all group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={17} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{label}</p>
                      <p className="text-xs text-gray-400">{desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-[#cf3425] transition-colors" />
                </button>
              ))}

              {/* Danger zone */}
              <div className="mt-6 pt-5 border-t border-gray-100">
                <p className="text-xs font-black uppercase tracking-widest text-gray-300 mb-3">Danger Zone</p>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-red-100 bg-red-50/50 hover:bg-red-50 transition-all group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-100 text-red-500 flex items-center justify-center">
                      <LogOut size={17} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-red-600">Sign Out</p>
                      <p className="text-xs text-red-400">Log out of your account</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-red-300 group-hover:text-red-500 transition-colors" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* bottom spacing */}
        <div className="h-12" />
      </div>
    </div>
  );
};

export default ProfilePage;