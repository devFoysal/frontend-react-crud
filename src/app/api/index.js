import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders(headers) {
    headers.set("Access-Control-Allow-Origin", "http://localhost:8000");
    headers.set("Accept", "application/json");
    if (!headers.get("file")) {
      headers.set("Content-Type", "application/json");
    }
    return headers;
  },
  credentials: "include",
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  keeUnusedDataFor: 180,
  refreshOnFocus: false,
  endpoints: (builder) => ({}),
});
