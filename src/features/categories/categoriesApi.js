// src/features/categories/categoriesApi.js
import { supabaseApi } from "@/services/supabase/supabaseApi";

export const categoriesApi = supabaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({ table: "categories", method: "select" }),
            providesTags: ["Categories"],
        }),
    }),
});

export const { useGetCategoriesQuery } = categoriesApi;
