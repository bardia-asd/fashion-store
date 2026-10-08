import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shippingAddress: null,
    deliveryMethod: "standard",
    paymentMethod: null,
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        setShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
        },

        setDeliveryMethod: (state, action) => {
            state.deliveryMethod = action.payload;
        },

        setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        },
    },
});

export const { setShippingAddress, setDeliveryMethod, setPaymentMethod } =
    checkoutSlice.actions;
export default checkoutSlice.reducer;
