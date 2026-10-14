import { supabaseApi } from "@/services/supabase/supabaseApi";

const ordersApi = supabaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: (userId) => ({
                table: "orders",
                method: "select",
                query: `*,order_items (id,quantity,product:products (name_fa),variant:product_variants (size,color:colors (name_fa))`,
                filters: [
                    {
                        column: "user_id",
                        operator: "eq",
                        value: userId,
                    },
                ],
                orderBy: {
                    column: "created_at",
                    ascending: false,
                },
            }),
        }),

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

export const {
    useGetOrdersQuery,
    useCreateOrderMutation,
    useCreateOrderItemsMutation,
} = ordersApi;
