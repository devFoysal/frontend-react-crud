import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../api";

export const productAdapter = createEntityAdapter({
  selectId: (product) => product.id,
});

export const productApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["products"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getProducts: builder.query({
        query: (page) => `products?page=${page}`,
        providesTags: (result, error, arg) => {
          return result
            ? [
                ...result?.ids?.map((id) => ({ type: "products", id })),
                "products",
              ]
            : ["products"];
        },
        transformResponse: (response) => {
          return productAdapter.setAll(
            productAdapter.getInitialState({
              hasMorePages: true,
              totalProducts: Math.floor(response?.count / 5),
            }),
            response.rows
          );
        },
        async onQueryStarted(page, { queryFulfilled, dispatch }) {
          if (!page) {
            return;
          }
          const { data, error } = await queryFulfilled;

          if (data) {
            // Add product On Current Request To Page 1
            dispatch(
              productApiSlice.util.updateQueryData(
                "getProducts",
                1,
                (draft) => {
                  // productAdapter.addMany(draft, productSelectors.selectAll(data));
                  productAdapter.setAll(
                    draft,
                    productSelectors.selectAll(data)
                  );
                  // draft.hasMorePages;
                }
              )
            );

            if (page > 1) {
              // Remove Cached Data From State Since We Already Added It To Page 1
              dispatch(
                productApiSlice.util.updateQueryData(
                  "getProducts",
                  page,
                  (draft) => {
                    draft = productAdapter.getInitialState();
                  }
                )
              );
            }
          }
        },
      }),

      getProduct: builder.query({
        query: (id) => `products/${id}`,
        providesTags: (result, error, id) => [{ type: "products", id }],
        transformResponse: (response) => response,
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
            url: `products/${body.get('id')}`,
            method: "PUT",
            body: body,
            headers: { file: true },
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
      deleteMultipleProduct: builder.mutation({
        query: (ids) => {
          return {
            url: `products/multiple/delete`,
            method: "DELETE",
            body: ids,
          };
        },
      }),
    }),
    overrideExisting: true,
  });

export const {
  useLazyGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useDeleteMultipleProductMutation,
} = productApiSlice;

export const productSelectors = productAdapter.getSelectors((state) => state);
