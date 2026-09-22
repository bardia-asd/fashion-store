import { supabaseApi } from "@/services/supabase/supabaseApi";

const PRODUCT_SELECT = `*, product_images(*), product_variants(*, color:colors(*)), brand:brands(*), category:categories(*), reviews(*)`;

export const productsApi = supabaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                table: "products",
                method: "select",
                query: PRODUCT_SELECT,
                filters: [],
                orderBy: { column: "created_at", ascending: false },
            }),
            providesTags: ["Products"],
        }),
        getNewProducts: builder.query({
            query: () => ({
                table: "products",
                method: "select",
                query: PRODUCT_SELECT,
                filters: [{ column: "is_active", operator: "eq", value: true }],
                orderBy: { column: "created_at", ascending: false },
                limit: 4,
            }),
            providesTags: ["Products"],
        }),
        getTrendingProducts: builder.query({
            query: () => ({
                table: "products",
                method: "select",
                query: PRODUCT_SELECT,
                filters: [
                    { column: "is_active", operator: "eq", value: true },
                    { column: "is_trending", operator: "eq", value: true },
                ],
                orderBy: { column: "created_at", ascending: false },
                limit: 8,
            }),
            providesTags: ["Products"],
        }),
        getBestSellerProducts: builder.query({
            query: () => ({
                table: "products",
                method: "select",
                query: PRODUCT_SELECT,
                filters: [
                    { column: "is_active", operator: "eq", value: true },
                    { column: "is_best_seller", operator: "eq", value: true },
                ],
                orderBy: { column: "created_at", ascending: false },
                limit: 8,
            }),
            providesTags: ["Products"],
        }),
        getProductBySlug: builder.query({
            query: ({ slug }) => ({
                table: "products",
                method: "select",
                query: PRODUCT_SELECT,
                filters: [{ column: "slug", operator: "eq", value: slug }],
                single: true,
            }),
            providesTags: ["Products"],
        }),
        getRelatedProducts: builder.query({
            query: ({ id, categoryId }) => ({
                table: "products",
                method: "select",
                query: PRODUCT_SELECT,
                filters: [
                    { column: "is_active", operator: "eq", value: true },
                    {
                        column: "category_id",
                        operator: "eq",
                        value: categoryId,
                    },
                    {
                        column: "id",
                        operator: "neq",
                        value: id,
                    },
                ],
                limit: 4,
            }),
            providesTags: ["Products"],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetNewProductsQuery,
    useGetTrendingProductsQuery,
    useGetBestSellerProductsQuery,
    useGetProductBySlugQuery,
    useGetRelatedProductsQuery,
} = productsApi;
