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

import { formatInr, getBookings, cancelBooking } from "../../utils/bookingStore";

const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?background=cf3425&color=fff&name=Traveller&size=240";

const COVER_GRADIENT =
  "linear-gradient(135deg, #1f2937 0%, #cf3425 55%, #f97316 100%)";

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
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.mobile,
      location: user.location,
      bio: user.bio,
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

  const handleCancelBooking = (id, status) => {
    if (status === "cancelled") return;
    const ok = window.confirm("Cancel this booking?");
    if (!ok) return;
    const updated = cancelBooking(id);
    if (updated) {
      toast.success("Booking cancelled");
      setBookings(getBookings());
    } else {
      toast.error("Unable to cancel booking");
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
        <div className="w-10 h-10 border-4 border-red-200 border-t-red-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (token && isError && error?.status !== 401) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button onClick={refetch} className="text-red-600 font-bold">
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
                    alt="avatar"
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
                  className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#cf3425] hover:bg-[#b82e1f] text-white rounded-xl flex items-center justify-center shadow-md transition-all"
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

                  <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider">
                    {stats.flights} Flights
                  </span>

                  <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider">
                    {stats.trains} Trains
                  </span>

                </div>

              </div>

            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl flex items-center gap-2 text-[11px] font-black uppercase tracking-wider hover:bg-slate-50"
            >
              <LogOut size={16} />
              Logout
            </button>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

            <Stat label="Total" value={stats.total} />
            <Stat label="Upcoming" value={stats.upcoming} />
            <Stat label="Spent" value={formatInr(stats.spent)} />

            <Stat
              label="Member Since"
              value={
                user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                    month: "short",
                    year: "numeric",
                  })
                  : "N/A"
              }
            />

          </div>

        </div>

      </section>

      <section className="max-w-6xl mx-auto px-6 mt-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="p-5 border-b border-slate-200">
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Recent Bookings</p>
          </div>
          <div className="divide-y divide-slate-200">
            {recentBookings.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-slate-500">No bookings yet</p>
              </div>
            ) : (
              recentBookings.map((b) => {
                const isCancelled = b.status === "cancelled";
                return (
                  <div key={b.id} className="p-5 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900">
                          {b.fromCode} • {b.toCode}
                        </span>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${isCancelled ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
                          {isCancelled ? "cancelled" : b.status || "confirmed"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {b.providerName} • {b.departTime} to {b.arriveTime} • {b.travelDate}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-bold text-slate-900">{formatInr(b.totalPrice)}</p>
                      <button
                        onClick={() => handleCancelBooking(b.id, b.status)}
                        disabled={isCancelled}
                        className={`px-3 py-2 rounded-xl text-[11px] font-semibold uppercase tracking-wider transition-all ${isCancelled ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-[#cf3425] text-white hover:bg-[#b82e1f]"}`}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

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
