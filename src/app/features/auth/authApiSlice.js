import { apiSlice } from "../../api";

export const authApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["Authentication"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      signIn: builder.mutation({
        query: (body) => {
          return {
            url: `auth/sign-in`,
            method: "POST",
            body: body,
          };
        },
      }),
      signUp: builder.mutation({
        query: (body) => {
          return {
            url: `auth/sign-up`,
            method: "POST",
            body: body,
          };
        },
      }),
      signOut: builder.mutation({
        query: () => {
          return {
            url: `auth/sign-out`,
            method: "POST",
          };
        },
      }),
    }),
    overrideExisting: true,
  });

export const { useSignInMutation, useSignUpMutation, useSignOutMutation } =
  authApiSlice;
