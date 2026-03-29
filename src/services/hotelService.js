import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";

export const hotelService = createApi({
  reducerPath: "hotelApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    searchHotels: builder.query({
      query: ({ location, checkin, checkout, guests }) => {
        let url = `/hotels/search`;
        const params = [];
        if (location) params.push(`cityCode=${location}`);
        if (checkin) params.push(`checkInDate=${checkin}`);
        if (checkout) params.push(`checkOutDate=${checkout}`);
        if (guests) params.push(`adults=${guests}`);
        if (params.length > 0) url += `?${params.join("&")}`;
        return { url, method: "GET" };
      },
    }),
    getCitySuggestions: builder.query({
      query: (keyword) => ({
        url: `/hotels/cities/suggest`,
        params: { keyword: keyword
           
         },
        method: "GET",
      }),
    }),
  }), 
});

export const { 
  useSearchHotelsQuery, 
  useLazyGetCitySuggestionsQuery 
} = hotelService;
