import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../api";

export const productAdapter = createEntityAdapter({
  selectId: (product) => product.id,
});

export const productApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Product"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getProducts: builder.query({
        query: () => `products`,
        providesTags: (result, error, arg) => {
          return result
            ? [
                ...result?.ids?.map((id) => ({ type: "Product", id })),
                "Product",
              ]
            : ["Product"];
        },
        transformResponse: (response) => {
          return productAdapter.addMany(
            productAdapter.getInitialState({
              hasMorePages: true,
            }),
            response
          );
        },
      }),

      getMoreProducts: builder.query({
        query: () => `products`,
      }),

      getProduct: builder.query({
        query: (id) => `products/${id}`,
        providesTags: (result, error, id) => [{ type: "Product", id }],
        // transformResponse: (response) => response?.data,
      }),

      addProduct: builder.mutation({
        query: (body) => {
          return {
            url: `products`,
            method: "POST",
            body: body,
            headers: { file: true },
          };
        },
      }),
      updateProduct: builder.mutation({
        query: (body) => {
          return {
            url: `products/${body?.id}`,
            method: "PUT",
            body: body,
            // headers: { file: true },
          };
        },
      }),
      deleteProduct: builder.mutation({
        query: (id) => {
          return {
            url: `products/${id}`,
            method: "DELETE",
          };
        },
      }),
    }),
    overrideExisting: true,
  });

export const {
  useLazyGetProductsQuery,
  useLazyGetMoreProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;

export const productSelectors = productAdapter.getSelectors((state) => state);
