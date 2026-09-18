import { createApi } from "@reduxjs/toolkit/query/react";
import { supabaseBaseQuery } from "./supabaseBaseQuery";

export const supabaseApi = createApi({
    reducerPath: "supabaseApi",
    baseQuery: supabaseBaseQuery(),
    tagTypes: ["Categories", "Products", "Orders"],
    endpoints: () => ({}),
});
