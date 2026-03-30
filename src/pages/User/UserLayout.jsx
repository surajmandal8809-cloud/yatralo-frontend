import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  CreditCard,
  ShoppingBag,
  Activity,
  Lock,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  useGetUserQuery,
  useUpdateAvatarMutation,
} from "../../services/userService";
import { getBookings } from "../../utils/bookingUtils";

const DEFAULT_AVATAR = "https://ui-avatars.com/api/?background=7c3aed&color=fff&name=Traveller&size=240";
const COVER_GRADIENT = "linear-gradient(135deg, #4c1d95 0%, #7c3aed 55%, #f97316 100%)";

const UserLayout = ({ children, activeTab }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");

  const { data, isLoading, isError, error, refetch } = useGetUserQuery(token, {
    skip: !token,
  });

  const [updateAvatar, { isLoading: isUploadingAvatar }] = useUpdateAvatarMutation();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [bookings, setBookings] = useState(() => getBookings());

  const user = data?.data;

  useEffect(() => {
    if (!token) navigate("/auth/login");
  }, [token, navigate]);

  useEffect(() => {
    if (user) setAvatarPreview(user.avatar || null);
  }, [user]);

  const stats = useMemo(() => {
    return {
      total: bookings.length,
      flights: bookings.filter((b) => b.type === "flight").length,
      trains: bookings.filter((b) => b.type === "train").length,
    };
  }, [bookings]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target.result;
      setAvatarPreview(base64);
      try {
        await updateAvatar({ avatar: base64 }).unwrap();
        toast.success("Avatar updated");
      } catch {
        toast.error("Upload failed");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
    toast.success("Logged out");
  };

  const tabs = [
    { id: "overview", label: "overview", path: "/profile", icon: User },
    { id: "wallet", label: "wallet", path: "/wallet", icon: CreditCard },
    { id: "bookings", label: "bookings", path: "/bookings", icon: ShoppingBag },
    { id: "settings", label: "settings", path: "/settings", icon: Edit3 },
    { id: "activity", label: "activity", path: "/activity", icon: Activity },
    { id: "account", label: "account", path: "/account", icon: Lock },
  ];

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-violet-100 border-t-[#7c3aed] rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#f2f2f2] pb-16">
      {/* MMT Style Header Gap */}
      <div className="h-20 bg-slate-900" /> 
      
      <section className="max-w-6xl mx-auto px-4 -mt-10">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-slate-200 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden relative border-4 border-white shadow-md">
                  <img src={avatarPreview || DEFAULT_AVATAR} alt="" className={`w-full h-full object-cover ${isUploadingAvatar ? "opacity-30" : "opacity-100"}`} />
                  {isUploadingAvatar && <div className="absolute inset-0 flex items-center justify-center"><RefreshCw className="animate-spin text-[#7c3aed]" /></div>}
                </div>
                <button onClick={() => fileInputRef.current.click()} className="absolute bottom-0 right-0 w-8 h-8 bg-white text-[#7c3aed] rounded-full flex items-center justify-center shadow-lg border border-slate-100 hover:scale-110 transition-all"><Camera size={14} /></button>
                <input ref={fileInputRef} type="file" className="hidden" onChange={handleAvatarChange} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-950">{user?.first_name} {user?.last_name}</h2>
                <div className="flex items-center gap-4 mt-1 text-slate-500 font-bold text-sm">
                   <p>{user?.email}</p>
                   <span>•</span>
                   <p>{user?.mobile || "No mobile added"}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
               <button onClick={handleLogout} className="px-6 py-2 border-2 border-slate-100 rounded-full flex items-center gap-2 text-xs font-black uppercase text-slate-600 hover:bg-slate-50 transition-all">
                  <LogOut size={16} /> Logout
               </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-8 overflow-hidden">
           <div className="flex overflow-x-auto no-scrollbar">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <Link 
                    key={tab.id}
                    to={tab.path}
                    className={`flex items-center gap-3 px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em] transition-all border-b-4 ${
                      isActive 
                      ? "text-blue-600 border-blue-600 bg-blue-50/30" 
                      : "text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <tab.icon size={16} strokeWidth={isActive ? 3 : 2} />
                    {tab.label}
                  </Link>
                );
              })}
           </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
           {children}
        </div>
      </section>
    </div>
  );
};

export default UserLayout;
