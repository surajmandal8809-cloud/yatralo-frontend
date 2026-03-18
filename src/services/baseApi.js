import {fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const BASE_URL = "https://api.yatralo.online";

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
