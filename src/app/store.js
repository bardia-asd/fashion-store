import { configureStore } from "@reduxjs/toolkit";
import { supabaseApi } from "@/services/supabase/supabaseApi";
import authReducer from "@/features/auth/authSlice";
import cartReducer from "@/features/cart/cartSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        [supabaseApi.reducerPath]: supabaseApi.reducer,
    },
    middleware: (getDefault) => getDefault().concat(supabaseApi.middleware),
});
