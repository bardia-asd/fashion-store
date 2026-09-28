import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            const {
                productId,
                variantId,
                quantity = 1,
                name,
                price,
                image,
                size,
                color,
            } = action.payload;

            const existing = state.items.find(
                (i) => i.productId === productId && i.variantId === variantId,
            );

            if (existing) {
                existing.quantity += quantity;
            } else {
                state.items.push({
                    id: nanoid(),
                    productId,
                    variantId,
                    quantity,
                    name,
                    price,
                    image,
                    size,
                    color,
                });
            }
        },

        removeItem: (state, action) => {
            state.items = state.items.filter((i) => i.id !== action.payload);
        },

        updateQuantity: (state, action) => {
            const { id, change } = action.payload;

            const itemIndex = state.items.findIndex((i) => i.id === id);

            if (itemIndex === -1) return null;

            const item = state.items[itemIndex];

            const newQuantity = item.quantity + change;

            if (item.quantity <= 1) {
                state.items.splice(itemIndex, 1);
                return;
            }

            item.quantity = newQuantity;
        },
    },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
