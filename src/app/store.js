import { configureStore } from "@reduxjs/toolkit";
import { categoriesApi } from "@/features/categories/categoriesApi";
import { productsApi } from "@/features/products/productsApi";

export const store = configureStore({
    reducer: {
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefault) =>
        getDefault()
            .concat(categoriesApi.middleware)
            .concat(productsApi.middleware),
});
