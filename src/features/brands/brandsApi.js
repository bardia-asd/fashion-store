import { supabaseApi } from "@/services/supabase/supabaseApi";

export const brandsApi = supabaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBrands: builder.query({
            query: () => ({
                table: "brands",
                method: "select",
            }),
            providesTags: ["Brands"],
        }),
    }),
});

export const { useGetBrandsQuery } = brandsApi;
