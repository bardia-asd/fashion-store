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
                order: {
                    column: "position",
                    ascending: true,
                },
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

        getPromoCode: builder.query({
            query: (code) => ({
                table: "promo_codes",
                method: "select",
                query: "*",
                filters: [
                    {
                        column: "code",
                        operator: "eq",
                        value: code.toUpperCase(),
                    },
                    {
                        column: "is_active",
                        operator: "eq",
                        value: true,
                    },
                ],
                single: true,
            }),
        }),

        getCartPromoCode: builder.query({
            query: (cartId) => ({
                table: "carts",
                method: "select",
                query: "promo_code",
                filters: [
                    {
                        column: "id",
                        operator: "eq",
                        value: cartId,
                    },
                ],
                single: true,
            }),
            providesTags: ["Cart"],
        }),

        setCartPromoCode: builder.mutation({
            query: ({ cartId, promoCode }) => ({
                table: "carts",
                method: "update",
                match: {
                    id: cartId,
                },
                values: {
                    promo_code: promoCode,
                },
                single: true,
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
    useLazyGetPromoCodeQuery,
    useGetCartPromoCodeQuery,
    useSetCartPromoCodeMutation,
} = cartApi;
