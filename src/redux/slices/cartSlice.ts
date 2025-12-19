import { createSlice } from '@reduxjs/toolkit';
import type { IProduct, ICartItem } from '../../types/product.type';

export interface CartState {
    items: ICartItem[];
}

const initialState: CartState = {
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, { payload }: { payload: IProduct }) => {
            const existing = state.items.find((i) => i.id === payload.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...payload, quantity: 1 });
            }
        },
        removeFromCart: (state, { payload }: { payload: IProduct }) => {
            const existing = state.items.find((i) => i.id === payload.id);
            if (existing) {
                if (existing.quantity > 1) {
                    existing.quantity -= 1;
                } else {
                    state.items = state.items.filter((i) => i.id !== payload.id);
                }
            }
        },
        removeItem: (state, { payload }: { payload: IProduct }) => {
            // remove item entirely regardless of quantity
            state.items = state.items.filter((i) => i.id !== payload.id);
        }
    },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, removeItem } = cartSlice.actions

export default cartSlice.reducer