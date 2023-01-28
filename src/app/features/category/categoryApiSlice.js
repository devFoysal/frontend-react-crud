import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../api";

export const categoryAdapter = createEntityAdapter({
    selectId: (category) => category.id,
});
const initialState = categoryAdapter.getInitialState({ hasMorePages: true });

export const categoryApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ["Category"] }).injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: ([filter]) => `categories?${filter}`,
            providesTags: (result, error, id) => [{ type: "Category", id: "LIST" }],
        }),
    }),
    overrideExisting: true,
});

export const { useGetCategoriesQuery } = categoryApiSlice;

export const categorySelectors = categoryAdapter.getSelectors((state) => state);
