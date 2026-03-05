import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseQuery = fetchBaseQuery({
  baseUrl: "https://yatralo-backend.onrender.com",
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("token")
    if (token) {
      headers.set('authorization', `${token}`)
    }

    return headers
  },
})