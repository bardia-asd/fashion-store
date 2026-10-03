import { supabaseApi } from "@/services/supabase/supabaseApi";

const reviewsApi = supabaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProductReviews: builder.query({
            query: (productId) => ({
                table: "reviews",
                method: "select",
                query: `*`,
                filters: [
                    { column: "product_id", operator: "eq", value: productId },
                ],
                orderBy: { column: "created_at", ascending: false },
            }),
            providesTags: (result, error, productId) => [
                { type: "Reviews", id: productId },
            ],
        }),

        addReview: builder.mutation({
            query: ({ productId, userId, name, comment, rating }) => ({
                table: "reviews",
                method: "insert",
                values: {
                    product_id: productId,
                    user_id: userId,
                    reviewer_name: name,
                    text: comment,
                    rating,
                },
                single: true,
            }),
            invalidatesTags: (result, error, { productId }) => [
                { type: "Reviews", id: productId },
                "Products",
            ],
        }),
    }),
});

export const { useGetProductReviewsQuery, useAddReviewMutation } = reviewsApi;
