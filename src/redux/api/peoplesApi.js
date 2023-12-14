import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "api/products",
      providesTags: (result) => ["Products"],
    }),
    // createProduct: builder.mutation({
    //   query: (product) => ({
    //     url: 'api/products/',
    //     method: "POST",
    //     body: product
    //   }),
    //   invalidatesTags: ["Products"],
    // }),
    // deleteProduct: builder.mutation<IProduct[], any>({
    //   query: (id) => ({
    //     url: `api/products/${id}`,
    //     method: "DELETE"
    //   }),
    //   invalidatesTags: ["Products"],
    // }),
  }),
});

export const { useGetProductsQuery, useCreateProductMutation } = productsApi;
