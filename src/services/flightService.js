import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";

export const flightService = createApi({
  reducerPath: "flightApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    searchFlights: builder.query({
      query: ({ from, to, date, time }) => {
        let url = `/flights/search`;
        const params = [];
        if (from) params.push(`from=${from}`);
        if (to) params.push(`to=${to}`);
        if (date) params.push(`date=${date}`);
        if (time) params.push(`time=${time}`);
        if (params.length > 0) url += `?${params.join("&")}`;
        return { url, method: "GET" };
      },
    }),
    searchAirports: builder.query({
      query: (keyword) => ({
        url: `/airports/search?keyword=${keyword}`,
        method: "GET",
      }),
    }),
    getAirports: builder.query({
      query: () => ({
        url: `/airports`,
        method: "GET",
      }),
    }),
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: `/bookings/create`,
        method: "POST",
        body: bookingData,
      }),
    }),
    verifyPayment: builder.mutation({
      query: (paymentData) => ({
        url: `/bookings/verify`,
        method: "POST",
        body: paymentData,
      }),
    }),
  }),
});

export const { 
  useSearchFlightsQuery, 
  useLazySearchAirportsQuery,
  useGetAirportsQuery,
  useGetRealtimeFlightsQuery,
  useCreateBookingMutation,
  useVerifyPaymentMutation
} = flightService;