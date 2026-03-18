import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";

export const couponService = createApi({
  reducerPath: "couponApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCoupons: builder.query({
      query: (type) => ({
        url: type ? `/coupons?type=${type}` : "/coupons",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCouponsQuery } = couponService;
