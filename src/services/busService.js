import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";

export const busService = createApi({
  reducerPath: "busApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    searchBuses: builder.query({
      query: ({ from, to, date }) => {
        let url = `/buses/search/keyword=${from}&to=${to}&date=${date}  `;
        const params = [];
        if (from) params.push(`from=${from}`);
        if (to) params.push(`to=${to}`);
        if (date) params.push(`date=${date}`);
        if (params.length > 0) url += `?${params.join("&")}`;
        return { url, method: "GET" };
      },
    }),
  }),
});

export const { useSearchBusesQuery } = busService;
