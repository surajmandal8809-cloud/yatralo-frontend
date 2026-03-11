import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, CircleDot, Plane, Search, Ticket, Train, XCircle } from "lucide-react";
import { formatInr, getBookings, cancelBooking } from "../utils/bookingStore";
import toast from "react-hot-toast";

const TYPE_STYLES = {
  flight: {
    icon: Plane,
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    cardAccent: "from-blue-600 to-indigo-700",
  },
  train: {
    icon: Train,
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cardAccent: "from-emerald-600 to-teal-700",
  },
};

const formatDate = (value) => {
  if (!value) return "N/A";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState(() => getBookings());
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    const refresh = () => setBookings(getBookings());
    window.addEventListener("bookings-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("bookings-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings.filter((b) => {
      if (typeFilter !== "all" && b.type !== typeFilter) return false;
      if (!q) return true;
      return (
        b.bookingRef?.toLowerCase().includes(q) ||
        b.fromCode?.toLowerCase().includes(q) ||
        b.toCode?.toLowerCase().includes(q) ||
        b.providerName?.toLowerCase().includes(q)
      );
    });
  }, [bookings, query, typeFilter]);

  const totalSpent = useMemo(
    () => filtered.reduce((acc, item) => acc + (Number(item.totalPrice) || 0), 0),
    [filtered]
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16">
      <section className="max-w-6xl mx-auto px-6">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-white p-7 md:p-10 shadow-xl">
          <p className="text-xs tracking-[0.28em] uppercase text-white/70 font-black">Booking Center</p>
          <h1 className="text-3xl md:text-4xl font-black mt-2">Your Confirmed Trips</h1>
          <p className="text-white/75 mt-2 text-sm md:text-base">
            Track every flight and train reservation in one place.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-black">Total Bookings</p>
            <p className="text-3xl font-black text-slate-900 mt-2">{filtered.length}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-black">Total Spent</p>
            <p className="text-3xl font-black text-slate-900 mt-2">{formatInr(totalSpent)}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-black">Latest Reference</p>
            <p className="text-xl font-black text-slate-900 mt-3">{filtered[0]?.bookingRef || "No bookings yet"}</p>
          </div>
        </div>

        <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-sm">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="flex-1 relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by booking reference, route or provider"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold outline-none focus:border-indigo-400"
              />
            </div>
            <div className="flex items-center gap-2">
              {["all", "flight", "train"].map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${typeFilter === type ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {filtered.length === 0 && (
            <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center">
              <Ticket size={34} className="mx-auto text-slate-300" />
              <p className="text-lg font-black text-slate-700 mt-3">No bookings found</p>
              <p className="text-slate-400 text-sm mt-1">Book a trip from Flights or Trains to see it here.</p>
              <div className="mt-5 flex justify-center gap-3">
                <Link to="/flights" className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold">
                  Explore Flights
                </Link>
                <Link to="/trains" className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold">
                  Explore Trains
                </Link>
              </div>
            </div>
          )}

          {filtered.map((booking) => {
            const style = TYPE_STYLES[booking.type] || TYPE_STYLES.flight;
            const Icon = style.icon;
            return (
              <div
                key={booking.id}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
              >
                <div className={`h-1 bg-gradient-to-r ${style.cardAccent}`} />
                <div className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className={`inline-flex items-center gap-1.5 border px-2.5 py-1 rounded-full text-xs font-black uppercase ${style.badge}`}>
                        <Icon size={11} />
                        {booking.type}
                      </div>
                      <p className="text-2xl font-black text-slate-900 mt-2">
                        {booking.fromCode} <CircleDot size={13} className="inline text-slate-300" /> {booking.toCode}
                      </p>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {booking.fromName} to {booking.toName}
                      </p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Reference</p>
                        <p className="text-lg font-black text-slate-900">{booking.bookingRef}</p>
                        <p className={`text-sm font-semibold capitalize ${booking.status === 'cancelled' ? 'text-red-500' : 'text-emerald-600'}`}>
                          {booking.status}
                        </p>
                      </div>
                      {booking.status !== "cancelled" && (
                        <button
                          onClick={() => {
                            if (window.confirm("Are you sure you want to cancel this booking?")) {
                              cancelBooking(booking.id);
                              toast.success("Booking cancelled successfully");
                            }
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-100 text-red-500 text-xs font-black hover:bg-red-50 transition-all"
                        >
                          <XCircle size={13} />
                          Cancel Trip
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-5">
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400">Travel Date</p>
                      <p className="text-sm font-bold text-slate-700 mt-1 flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(booking.travelDate)}
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400">Schedule</p>
                      <p className="text-sm font-bold text-slate-700 mt-1">{booking.departTime} to {booking.arriveTime}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400">Provider</p>
                      <p className="text-sm font-bold text-slate-700 mt-1">{booking.providerName}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400">Passengers</p>
                      <p className="text-sm font-bold text-slate-700 mt-1">{booking.passengers}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400">Paid</p>
                      <p className="text-sm font-bold text-slate-700 mt-1">{formatInr(booking.totalPrice)}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
