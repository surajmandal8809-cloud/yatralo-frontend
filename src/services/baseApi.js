import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const getBaseURL = () => {
  const envURL = import.meta.env.VITE_API_URL;
  if (envURL) return envURL;

  const hostname = window.location.hostname;
  const isLocal = hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.startsWith("192.168.");

  return isLocal
    ? "http://localhost:5000"
    : "https://yatralo-backend.onrender.com";
};

export const baseQuery = fetchBaseQuery({
  baseUrl: getBaseURL(),
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("token")
    if (token) {
      headers.set('authorization', `${token}`)
    }

    return headers
  },
})