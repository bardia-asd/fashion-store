import { supabaseApi } from "@/services/supabase/supabaseApi";

const profileApi = supabaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: (userId) => ({
                table: "profiles",
                method: "select",
                query: "*",
                match: { id: userId },
                single: true,
            }),
            providesTags: ["Profile"],
        }),

        updateProfile: builder.mutation({
            query: ({ userId, full_name, phone }) => ({
                table: "profiles",
                method: "update",
                match: { id: userId },
                values: {
                    full_name,
                    phone,
                },
                single: true,
            }),
            invalidatesTags: ["Profile"],
        }),
    }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
