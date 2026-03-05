import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';

export const userService = createApi({
    reducerPath: "UserAPI",
    baseQuery: baseQuery,
    tagTypes: ["User"],
    endpoints: builder => ({
        getUser: builder.query({
            query: () => ({ url: "/user/get", method: "GET" }),
            providesTags: ["User"],
        }),
        updateUser: builder.mutation({
            query: (body) => ({ url: "/user/update", method: "PUT", body }),
            invalidatesTags: ["User"],
        }),
        updateAvatar: builder.mutation({
            query: (body) => ({ url: "/user/avatar", method: "PUT", body }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const {
    useGetUserQuery,
    useUpdateUserMutation,
    useUpdateAvatarMutation,
} = userService;