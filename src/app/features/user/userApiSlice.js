import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../api";

export const userAdapter = createEntityAdapter({
    selectId: (user) => user.id,
});
const initialState = userAdapter.getInitialState({ hasMorePages: true });

export const userApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ["User"] }).injectEndpoints({
    endpoints: (builder) => ({
        getUserBasicInfo: builder.query({
            query: (id) => `user/${id}`,
            providesTags: (result, error, id) => [{ type: "User", id }],
            transformResponse: (response) => response?.data,
        }),
        getUserDetailsInfo: builder.query({
            query: (id) => `user/${id}/details`,
            providesTags: (result, error, id) => [{ type: "User", id }],
            transformResponse: (response) => response?.data,
        }),
        updateUserBasicInfo: builder.mutation({
            query: (body) => {
                return {
                    url: `user`,
                    method: "PUT",
                    body: body,
                };
            },
            invalidatesTags: ["User"],
        }),
        addUserWorkExp: builder.mutation({
            query: (body) => {
                return {
                    url: `user/work-exp`,
                    method: "POST",
                    body: body,
                };
            },
            invalidatesTags: ["User"],
        }),
        updateUserWorkExp: builder.mutation({
            query: (body) => {
                return {
                    url: `user/work-exp`,
                    method: "PUT",
                    body: body,
                };
            },
            invalidatesTags: ["User"],
        }),
        addUserEduInfo: builder.mutation({
            query: (body) => {
                return {
                    url: `user/edu-info`,
                    method: "POST",
                    body: body,
                };
            },
            invalidatesTags: ["User"],
        }),
        updateUserEduInfo: builder.mutation({
            query: (body) => {
                return {
                    url: `user/edu-info`,
                    method: "PUT",
                    body: body,
                };
            },
            invalidatesTags: ["User"],
        }),
        updateProfilePicture: builder.mutation({
            query: (body) => {
                return {
                    url: "user/change-image",
                    method: "POST",
                    body: body,
                    headers: { file: true },
                };
            },
            invalidatesTags: ["User"],
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetUserBasicInfoQuery,
    useGetUserDetailsInfoQuery,
    useUpdateUserBasicInfoMutation,
    useAddUserWorkExpMutation,
    useUpdateUserWorkExpMutation,
    useAddUserEduInfoMutation,
    useUpdateUserEduInfoMutation,
    useUpdateProfilePictureMutation,
} = userApiSlice;

export const userSelectors = userAdapter.getSelectors((state) => state);