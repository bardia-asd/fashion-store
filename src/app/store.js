import { configureStore } from "@reduxjs/toolkit";
import { categoriesApi } from "@/features/categories/categoriesApi";

export const store = configureStore({
    reducer: {
        [categoriesApi.reducerPath]: categoriesApi.reducer,
    },

    middleware: (getDefault) => getDefault().concat(categoriesApi.middleware),
});
