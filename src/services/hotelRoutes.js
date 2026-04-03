const API_URL = 'http://localhost:5000';

export const searchHotels = async (params) => {
  const searchParams = new URLSearchParams(params);
  const res = await fetch(`${API_URL}/api/hotels/search?${searchParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return res.json();
};

export const getHotelDetails = async ({ hotelId, checkInDate, checkOutDate, adults }) => {
  const searchParams = new URLSearchParams({ checkInDate, checkOutDate, adults });
  const res = await fetch(`${API_URL}/api/hotels/${hotelId}/offers?${searchParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return res.json();
};

export const searchHotelsCities = async (keyword) => {
  const res = await fetch(`${API_URL}/api/hotels/cities/suggest?keyword=${keyword}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return res.json();
};

export const createBooking = async (bookingData) => {
  const res = await fetch(`${API_URL}/api/hotels/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bookingData)
  });
  return res.json();
};

export const verifyPayment = async (paymentData) => {
  const res = await fetch(`${API_URL}/api/hotels/verify-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(paymentData)
  });
  return res.json();
};
