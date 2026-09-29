import { createSlice } from "@reduxjs/toolkit";

export const STORAGE_KEY = "dby-guest-cart";

const loadGuestCart = () => {
    try {
        const items = localStorage.getItem(STORAGE_KEY);

        return items ? JSON.parse(items) : [];
    } catch {
        return [];
    }
};

const initialState = {
    items: loadGuestCart(),
};

const guestCartSlice = createSlice({
    name: "guestCart",
    initialState,
    reducers: {
        addItem: (
            state,
            { payload: { productId, variantId, quantity = 1 } },
        ) => {
            const existing = state.items.find((i) => i.variantId === variantId);

            if (existing) existing.quantity += quantity;
            else state.items.push({ productId, variantId, quantity });
        },

        removeItem: (state, action) => {
            state.items = state.items.filter(
                (i) => i.variantId !== action.payload,
            );
        },

        updateQuantity: (state, action) => {
            const { variantId, quantity } = action.payload;

            const item = state.items.find(
                (item) => item.variantId === variantId,
            );

            if (!item) return;

            if (quantity <= 0) {
                state.items = state.items.filter(
                    (item) => item.variantId !== variantId,
                );
                return;
            }

            item.quantity = quantity;
        },

        clearGuestCard: (state) => (state.items = []),
    },
});

export const { addItem, removeItem, updateQuantity, clearGuestCard } =
    guestCartSlice.actions;
export default guestCartSlice.reducer;
