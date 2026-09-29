import { supabaseApi } from "@/services/supabase/supabaseApi";

export const cartApi = supabaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getVariantDetails: builder.query({
            query: (variantIds) => ({
                table: "product_variants",
                method: "select",
                query: `*, colors ( hex_code ), product:products(id, slug, name_fa, price, old_price, product_images(url, is_thumbnail), brand:brands(name_fa))`,
                filters: [{ column: "id", operator: "in", value: variantIds }],
            }),
            providesTags: ["Products"],
        }),
    }),
});

export const { useGetVariantDetailsQuery } = cartApi;
