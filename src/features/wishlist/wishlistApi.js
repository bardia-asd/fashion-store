import { supabaseApi } from "@/services/supabase/supabaseApi";

const wishlistApi = supabaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getWishlist: builder.query({
            query: (userId) => ({
                table: "wishlists",
                method: "select",
                query: `*, product:products(*, product_images(*), product_variants(*, color:colors(*)), brand:brands(*), category:categories(*))`,
                filters: [{ column: "user_id", operator: "eq", value: userId }],
                orderBy: { column: "created_at", ascending: false },
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map((item) => ({
                              type: "Wishlist",
                              id: item.product_id,
                          })),
                          { type: "Wishlist", id: "LIST" },
                      ]
                    : [{ type: "Wishlist", id: "LIST" }],
        }),

        addToWishlist: builder.mutation({
            query: ({ productId, userId }) => ({
                table: "wishlists",
                method: "insert",
                values: {
                    product_id: productId,
                    user_id: userId,
                },
            }),
            invalidatesTags: () => [{ type: "Wishlist", id: "LIST" }],
        }),

        removeFromWishlist: builder.mutation({
            query: ({ productId, userId }) => ({
                table: "wishlists",
                method: "delete",
                match: { user_id: userId, product_id: productId },
            }),
            invalidatesTags: () => [{ type: "Wishlist", id: "LIST" }],
        }),

        clearWishlist: builder.mutation({
            query: (userId) => ({
                table: "wishlists",
                method: "delete",
                match: { user_id: userId },
            }),
            invalidatesTags: () => [{ type: "Wishlist", id: "LIST" }],
        }),
    }),
});

export const {
    useGetWishlistQuery,
    useAddToWishlistMutation,
    useRemoveFromWishlistMutation,
    useClearWishlistMutation,
} = wishlistApi;
