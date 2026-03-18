import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';

export const bookingService = createApi({
    reducerPath: "BookingAPI",
    baseQuery: baseQuery,
    tagTypes: ["Booking"],
    endpoints: builder => ({
        createBooking: builder.mutation({
            query: (body) => ({ url: "/bookings/create", method: "POST", body }),
            invalidatesTags: ["Booking"],
        }),
        verifyPayment: builder.mutation({
            query: (body) => ({ url: "/bookings/verify", method: "POST", body }),
            invalidatesTags: ["Booking"],
        }),
        getMyBookings: builder.query({
            query: () => ({ url: "/bookings/my", method: "GET" }),
            providesTags: ["Booking"],
        }),
        cancelBooking: builder.mutation({
            query: (id) => ({ url: `/bookings/cancel/${id}`, method: "PUT" }),
            invalidatesTags: ["Booking"],
        })
    }),
});

export const {
    useCreateBookingMutation,
    useVerifyPaymentMutation,
    useGetMyBookingsQuery,
    useCancelBookingMutation
} = bookingService;
