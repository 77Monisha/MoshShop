import { apiSlice } from './apiSlice';
import { ORDER_URL } from '../constant';

export const orderApiSLice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url : ORDER_URL,
                method: 'POST',
                body: {...order}
            })
        })
    })
});

export const { useCreateOrderMutation } = orderApiSLice;