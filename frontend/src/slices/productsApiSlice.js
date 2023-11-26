import { PRODUCT_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getProducts: builder.query({
            query : () => ({
                url: PRODUCT_URL
            }),
            keepUnusedDataFor:5,
            providesTags: ['Products'],
        }),
        getProductDetails : builder.query ({
            query : (productId) => ({
                url : `${PRODUCT_URL}/${productId}`
            }),
            keepUnusedDataFor:5
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCT_URL,
                method: 'POST',
            }),
            invalidatesTags: ['Products'],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/${data.productId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Products'],
        })
    }),
});


export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation } =  productsApiSlice;