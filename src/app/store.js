import { configureStore } from "@reduxjs/toolkit";
import { supabaseApi } from "@/services/supabase/supabaseApi";
import authReducer from "@/features/auth/authSlice";
import guestCartReducer, { STORAGE_KEY } from "@/features/cart/guestCartSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        guestCart: guestCartReducer,
        [supabaseApi.reducerPath]: supabaseApi.reducer,
    },
    middleware: (getDefault) => getDefault().concat(supabaseApi.middleware),
});

store.subscribe(() => {
    try {
        const { items } = store.getState().guestCart;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
});
