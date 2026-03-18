import {fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const BASE_URL = "http://127.0.0.1:5000";

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
