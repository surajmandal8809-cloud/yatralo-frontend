import React, { useState, useEffect, useRef } from "react";
import {
  LogOut,
  Edit2,
  Camera,
  Globe,
  Heart,
  Calendar,
  Bell,
  Shield,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateAvatarMutation,
} from "../../services/userService";

const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?background=6366f1&color=fff&name=User&size=128";

const ProfilePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { data, isLoading, isError } = useGetUserQuery();
  const user = data?.data;

  const [updateUser, { isLoading: isSaving }] = useUpdateUserMutation();
  const [updateAvatar, { isLoading: isUploadingAvatar }] =
    useUpdateAvatarMutation();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
    window.location.reload();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateUser(formData).unwrap();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  // When user picks a file, read it as base64 and send to backend
  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be smaller than 2 MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = ev.target.result;
      setAvatarPreview(base64); // instant local preview
      try {
        await updateAvatar({ avatar: base64 }).unwrap();
        toast.success("Profile picture updated!");
      } catch (err) {
        toast.error(err?.data?.message || "Failed to update picture");
        setAvatarPreview(user?.avatar || null); // revert on error
      }
    };
    reader.readAsDataURL(file);
    // clear so same file can be re-selected if needed
    e.target.value = "";
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );

  if (isError)
    return (
      <div className="text-center mt-20 text-red-500">
        Failed to load user data
      </div>
    );

  const quickStats = [
    {
      label: "Bookings",
      value: "12",
      icon: <Calendar size={18} className="text-orange-500" />,
    },
    {
      label: "Miles",
      value: "4,250",
      icon: <Globe size={18} className="text-indigo-500" />,
    },
    {
      label: "Favorites",
      value: "8",
      icon: <Heart size={18} className="text-rose-500" />,
    },
    {
      label: "Spent",
      value: "₹45k",
      icon: <CreditCard size={18} className="text-emerald-500" />,
    },
  ];

  const tabs = ["dashboard", "bookings", "settings"];

  const displayName =
    [formData.first_name, formData.last_name].filter(Boolean).join(" ") ||
    "User";

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">

        {/* LEFT PROFILE CARD */}
        <div className="col-span-12 md:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 text-center">

            {/* Avatar with camera button */}
            <div className="relative w-32 h-32 mx-auto">
              <img
                src={avatarPreview || DEFAULT_AVATAR}
                alt="avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-50"
                onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
              />

              {/* Overlay spinner while uploading */}
              {isUploadingAvatar && (
                <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />

              {/* Camera button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingAvatar}
                title="Change profile picture"
                className="absolute bottom-1 right-1 bg-indigo-600 text-white p-2.5 rounded-full shadow-lg hover:bg-indigo-700 active:scale-95 transition disabled:opacity-60"
              >
                <Camera size={14} />
              </button>
            </div>

            <h2 className="mt-4 text-2xl font-black text-slate-900">
              {displayName}
            </h2>
            <p className="text-slate-400 text-sm mt-1">{formData.email}</p>
            <p className="text-[11px] text-indigo-400 font-semibold mt-1">
              Click the camera icon to change photo
            </p>

            <button
              onClick={handleLogout}
              className="mt-8 w-full bg-rose-50 text-rose-600 py-3 rounded-2xl font-bold flex justify-center items-center gap-2 hover:bg-rose-100 transition"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-span-12 md:col-span-8 bg-white rounded-3xl shadow-sm border border-slate-100 p-8">

          {/* Tabs */}
          <div className="flex border-b mb-8 space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 capitalize text-sm font-bold tracking-wide transition-all relative ${activeTab === tab
                    ? "text-indigo-600"
                    : "text-slate-400 hover:text-slate-600"
                  }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-10">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {quickStats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 p-4 rounded-2xl border border-slate-100"
                  >
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                      {stat.icon}
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        {stat.label}
                      </span>
                    </div>
                    <p className="text-lg font-black text-slate-900">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Personal Info */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-900">
                    Personal Information
                  </h3>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 text-indigo-600 text-sm font-bold hover:text-indigo-800 transition"
                    >
                      <Edit2 size={16} /> Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="text-slate-500 text-sm font-bold px-4 py-2 rounded-xl hover:bg-slate-100 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition disabled:opacity-60"
                      >
                        {isSaving ? "Saving…" : "Save Changes"}
                      </button>
                    </div>
                  )}
                </div>

                {!isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                    <Info
                      label="Full Name"
                      value={`${formData.first_name} ${formData.last_name}`}
                    />
                    <Info label="Email" value={formData.email} />
                    <Info label="Phone" value={formData.phone} />
                    <Info label="Location" value={formData.location} />
                    <Info label="Bio" value={formData.bio} full />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { key: "first_name", label: "First Name" },
                      { key: "last_name", label: "Last Name" },
                      { key: "email", label: "Email" },
                      { key: "phone", label: "Phone" },
                      { key: "location", label: "Location" },
                      { key: "bio", label: "Bio" },
                    ].map(({ key, label }) => (
                      <div
                        key={key}
                        className={`space-y-1 ${key === "bio" ? "md:col-span-2" : ""}`}
                      >
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                          {label}
                        </label>
                        {key === "bio" ? (
                          <textarea
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            rows={3}
                            placeholder={label}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm resize-none"
                          />
                        ) : (
                          <input
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            placeholder={label}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "bookings" && (
            <div className="text-center text-slate-500 py-20">
              Bookings content goes here…
            </div>
          )}
          {activeTab === "settings" && (
            <div className="text-center text-slate-500 py-20">
              Settings content goes here…
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* Reusable display row */
const Info = ({ label, value, full }) => (
  <div className={full ? "md:col-span-2" : ""}>
    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
      {label}
    </p>
    <p className="font-semibold text-slate-800">{value || "—"}</p>
  </div>
);

export default ProfilePage;