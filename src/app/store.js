import { configureStore } from "@reduxjs/toolkit";
import { supabaseApi } from "@/services/supabase/supabaseApi";

export const store = configureStore({
    reducer: {
        [supabaseApi.reducerPath]: supabaseApi.reducer,
    },
    middleware: (getDefault) => getDefault().concat(supabaseApi.middleware),
});
