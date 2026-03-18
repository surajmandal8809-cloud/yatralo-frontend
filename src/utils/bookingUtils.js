import { AIRPORTS } from "./airportsData";

export const CITIES = [
  { code: "DEL", name: "Delhi", station: "New Delhi Railway Station" },
  { code: "BOM", name: "Mumbai", station: "Mumbai Central" },
  { code: "BLR", name: "Bangalore", station: "KSR Bengaluru City Junction" },
  { code: "MAA", name: "Chennai", station: "Chennai Central" },
  { code: "CCU", name: "Kolkata", station: "Howrah Junction" },
  { code: "HYD", name: "Hyderabad", station: "Secunderabad Junction" },
  { code: "AMD", name: "Ahmedabad", station: "Ahmedabad Junction" },
  { code: "PNQ", name: "Pune", station: "Pune Junction" },
  { code: "GOI", name: "Goa", station: "Madgaon Junction" },
  { code: "JAI", name: "Jaipur", station: "Jaipur Junction" },
  { code: "LKO", name: "Lucknow", station: "Lucknow Charbagh" },
  { code: "COK", name: "Kochi", station: "Ernakulam Junction" },
  { code: "DXB", name: "Dubai", station: "Dubai International", country: "UAE" },
  { code: "LHR", name: "London", station: "Heathrow Airport", country: "UK" },
  { code: "JFK", name: "New York", station: "JFK Airport", country: "USA" },
  { code: "SIN", name: "Singapore", station: "Changi Airport", country: "Singapore" },
];

export const isInternational = (fromCode, toCode) => {
    if (!fromCode || !toCode) return false;
    
    const fromAir = AIRPORTS.find(a => a.iata === fromCode.toUpperCase());
    const toAir = AIRPORTS.find(a => a.iata === toCode.toUpperCase());
    
    // If we have data for both and countries match 'India', it's domestic.
    // If either is found and is not from India, it's international.
    if (fromAir && fromAir.country !== "India") return true;
    if (toAir && toAir.country !== "India") return true;
    
    // Fallback for codes not in our list (though most should be)
    const domesticCodes = ["DEL", "BOM", "BLR", "MAA", "CCU", "HYD", "AMD", "PNQ", "GOI", "JAI", "LKO", "COK"];
    return !domesticCodes.includes(fromCode?.toUpperCase()) || !domesticCodes.includes(toCode?.toUpperCase());
};

export const MEAL_OPTIONS = [
    { id: "None", name: "No Meal", price: 0, icon: "🚫", category: "Standard" },
    { id: "ClassicVeg", name: "Classic Veg Thali", price: 450, icon: "🥦", category: "Veg" },
    { id: "PaneerBento", name: "Paneer Bento Box", price: 550, icon: "🍱", category: "Veg" },
    { id: "VegBiryani", name: "Royal Veg Biryani", price: 600, icon: "🍚", category: "Veg" },
    { id: "PastaV", name: "Alfredo Pasta Veg", price: 500, icon: "🍝", category: "Veg" },
    { id: "ChickenTikka", name: "Chicken Tikka Meal", price: 650, icon: "🍗", category: "Non-Veg" },
    { id: "GrilledFish", name: "Grilled Fish", price: 750, icon: "🐟", category: "Non-Veg" },
    { id: "ButterChicken", name: "Butter Chicken Rice", price: 700, icon: "🥘", category: "Non-Veg" },
    { id: "LambChops", name: "Executive Lamb Chops", price: 850, icon: "🍖", category: "Non-Veg" },
    { id: "FruitPlatter", name: "Fresh Fruit Platter", price: 350, icon: "🍎", category: "Standard" },
];

export const formatInr = (num) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
};

export const getBookings = () => {
    try {
        const bookings = localStorage.getItem("yatralo-bookings");
        return bookings ? JSON.parse(bookings) : [];
    } catch (e) {
        return [];
    }
};

export const addBooking = (booking) => {
    const bookings = getBookings();
    bookings.unshift(booking);
    localStorage.setItem("yatralo-bookings", JSON.stringify(bookings));
    window.dispatchEvent(new Event("bookings-updated"));
};

export const cancelBooking = (id) => {
    const bookings = getBookings();
    const updated = bookings.map(b => b.id === id ? { ...b, status: "cancelled" } : b);
    localStorage.setItem("yatralo-bookings", JSON.stringify(updated));
    window.dispatchEvent(new Event("bookings-updated"));
};

export const clearAllBookings = () => {
    localStorage.removeItem("yatralo-bookings");
    window.dispatchEvent(new Event("bookings-updated"));
};
