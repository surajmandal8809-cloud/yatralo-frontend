import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";

export const trainService = createApi({
  reducerPath: "trainApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    searchTrains: builder.query({
      query: ({ from, to, date }) => {
        let url = `/trains/search`;
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

export const { useSearchTrainsQuery } = trainService;
