import { supabaseApi } from "@/services/supabase/supabaseApi";

export const colorsApi = supabaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getColors: builder.query({
            query: () => ({
                table: "colors",
                method: "select",
            }),
            providesTags: ["Colors"],
        }),
    }),
});

export const { useGetColorsQuery } = colorsApi;
