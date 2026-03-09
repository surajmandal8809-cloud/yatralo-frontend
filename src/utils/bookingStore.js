const STORAGE_KEY = "yatralo_bookings";
const MAX_BOOKINGS = 100;

const safeParse = (value) => {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const getBookings = () => {
  if (typeof window === "undefined") return [];
  return safeParse(localStorage.getItem(STORAGE_KEY));
};

export const addBooking = (booking) => {
  if (typeof window === "undefined") return null;
  const existing = getBookings();
  const next = [booking, ...existing].slice(0, MAX_BOOKINGS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("bookings-updated"));
  return booking;
};

export const clearBookings = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("bookings-updated"));
};

export const cancelBooking = (id) => {
  if (typeof window === "undefined") return null;
  const existing = getBookings();
  const next = existing.map((b) =>
    b.id === id ? { ...b, status: "cancelled", cancelledAt: new Date().toISOString() } : b
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("bookings-updated"));
  return next.find((b) => b.id === id) || null;
};

export const formatInr = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
