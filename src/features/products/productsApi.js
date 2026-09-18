import { supabaseBaseQuery } from "@/services/supabase/supabaseBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

const PRODUCT_SELECT = `*, product_images(*), product_variants(*, color:colors(*)), brand:brands(*), category:categories(*), reviews(rating)`;

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: supabaseBaseQuery(),
    tagTypes: ["Products"],
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
