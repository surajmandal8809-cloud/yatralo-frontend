import {fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const BASE_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:5000" 
  : "https://yatralo-backend.onrender.com";

export const getBaseURL = () => BASE_URL;

export const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
     prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("token")
     if (token) {
      headers.set('authorization', `${token}`)
    }

    return headers
  }, 
})
