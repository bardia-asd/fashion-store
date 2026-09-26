import { supabaseApi } from "@/services/supabase/supabaseApi";

const PRODUCT_SELECT = `*, product_images(*), product_variants!inner(*, color:colors(*)), brand:brands!inner(*), category:categories!inner(*), reviews(*)`;

const SORT_MAP = {
    newest: { column: "created_at", ascending: false },
    "price-asc": { column: "price", ascending: true },
    "price-desc": { column: "price", ascending: false },
};

export const productsApi = supabaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({
                category,
                brands,
                colors,
                sizes,
                minPrice,
                maxPrice,
                sort,
                search,
            } = {}) => ({
                table: "products",
                method: "select",
                query: PRODUCT_SELECT,
                filters: [
                    brands?.length && {
                        column: "brand.slug",
                        operator: "in",
                        value: brands,
                    },
                    category &&
                        category !== "all" && {
                            column: "category.slug",
                            operator: "eq",
                            value: category,
                        },
                    colors?.length && {
                        column: "product_variants.color_id",
                        operator: "in",
                        value: colors,
                    },
                    sizes?.length && {
                        column: "product_variants.size",
                        operator: "in",
                        value: sizes,
                    },
                    minPrice != null && {
                        column: "price",
                        operator: "gte",
                        value: minPrice,
                    },
                    maxPrice != null && {
                        column: "price",
                        operator: "lte",
                        value: maxPrice,
                    },
                    search.trim() && {
                        column: "name_fa",
                        operator: "ilike",
                        value: `%${search.trim()}%`,
                    },
                ].filter(Boolean),
                orderBy: SORT_MAP[sort] ?? SORT_MAP.newest,
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
