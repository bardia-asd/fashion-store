import { supabaseApi } from "@/services/supabase/supabaseApi";

export const cartApi = supabaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getVariantDetails: builder.query({
            query: (variantIds) => ({
                table: "product_variants",
                method: "select",
                query: `*, colors ( hex_code ), product:products(
                id,
                slug,
                name_fa,
                price,
                old_price,
                product_images(url, is_thumbnail),
                brand:brands(name_fa)
            )`,
                filters: [
                    {
                        column: "id",
                        operator: "in",
                        value: variantIds,
                    },
                ],
            }),
            providesTags: ["Products"],
        }),

        getServerItems: builder.query({
            query: (cartId) => ({
                table: "cart_items",
                method: "select",
                query: "*",
                filters: [
                    {
                        column: "cart_id",
                        operator: "eq",
                        value: cartId,
                    },
                ],
            }),
            providesTags: ["Cart"],
        }),

        addServerItem: builder.mutation({
            query: ({ cartId, productId, variantId, quantity }) => ({
                table: "cart_items",
                method: "insert",
                values: {
                    cart_id: cartId,
                    product_id: productId,
                    variant_id: variantId,
                    quantity,
                },
                single: true,
            }),
            invalidatesTags: ["Cart"],
        }),

        setServerQuantity: builder.mutation({
            query: ({ itemId, quantity }) => ({
                table: "cart_items",
                method: "update",
                match: {
                    id: itemId,
                },
                values: {
                    quantity,
                },
                single: true,
            }),
            invalidatesTags: ["Cart"],
        }),

        removeServerItem: builder.mutation({
            query: ({ itemId }) => ({
                table: "cart_items",
                method: "delete",
                match: {
                    id: itemId,
                },
            }),
            invalidatesTags: ["Cart"],
        }),
    }),
});

export const {
    useGetVariantDetailsQuery,
    useGetServerItemsQuery,
    useAddServerItemMutation,
    useSetServerQuantityMutation,
    useRemoveServerItemMutation,
} = cartApi;
