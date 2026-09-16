import { configureStore } from "@reduxjs/toolkit";

const temporaryReducer = (state = {}) => state;

export const store = configureStore({
    reducer: temporaryReducer,
});
