import { supabaseApi } from "@/services/supabase/supabaseApi";

const ordersApi = supabaseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                table: "orders",
                method: "insert",
                values: order,
            }),
            invalidatesTags: ["Order"],
        }),

        createOrderItems: builder.mutation({
            query: (items) => ({
                table: "order_items",
                method: "insert",
                values: items,
            }),
            invalidatesTags: ["Order"],
        }),
    }),
});

export const { useCreateOrderMutation, useCreateOrderItemsMutation } =
    ordersApi;
