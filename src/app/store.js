import { configureStore } from "@reduxjs/toolkit";
import { supabaseApi } from "@/services/supabase/supabaseApi";
import authReducer from "@/features/auth/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [supabaseApi.reducerPath]: supabaseApi.reducer,
    },
    middleware: (getDefault) => getDefault().concat(supabaseApi.middleware),
});
