import { createApi } from "@reduxjs/toolkit/query/react";
import { supabaseBaseQuery } from "@/services/supabase/supabaseBaseQuery";

export const categoriesApi = createApi({
    reducerPath: "categoriesApi",
    baseQuery: supabaseBaseQuery(),
    tagTypes: ["Categories"],
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({ table: "categories", method: "select" }),
            providesTags: ["Categories"],
        }),
    }),
});

export const { useGetCategoriesQuery } = categoriesApi;
