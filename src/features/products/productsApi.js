import { supabaseApi } from "@/services/supabase/supabaseApi";

const PRODUCT_SELECT = `*, product_images(*), product_variants(*, color:colors(*)), brand:brands(*), category:categories(*)`;

export const productsApi = supabaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNewProducts: builder.query({
            query: () => ({
                table: "products",
                method: "select",
                query: PRODUCT_SELECT,
                orderBy: { column: "created_at", ascending: false },
                limit: 4,
            }),
            providesTags: ["Products"],
        }),
    }),
});

export const { useGetNewProductsQuery } = productsApi;
