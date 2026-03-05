import {fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const baseQuery = fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000",
     prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("token")
     if (token) {
      headers.set('authorization', `${token}`)
    }

    return headers
  }, 
})