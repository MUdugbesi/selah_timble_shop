import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    statusTab: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addTocart(state, action) {
            const { productId, quantity } = action.payload;
            const indexProductId = state.items.findIndex(item => item.productId === productId);
            if (indexProductId >= 0) {
                state.items[indexProductId].quantity += quantity;
            } else {
                state.items.push({ productId, quantity })
            }
            // localStorage.setItem('cart', JSON.stringify(state.items))
        },
        changeQuantity(state, action) {
            const { productId, quantity } = action.payload;
            const indexProductId = state.items.findIndex(item => item.productId === productId);
            if (quantity > 0) {
                state.items[indexProductId].quantity = quantity
            } else {
                state.items = state.items.filter((item) => item.productId !== productId)
            }
            // localStorage.setItem('cart', JSON.stringify(state.items))

        },

        emptyCart(state) {
            state.items = []
        },

        toggleStatusBar(state) {
            if (state.statusTab === false) {
                state.statusTab = true;
            } else {
                state.statusTab = false
            }
        }
    }
})


export const { addTocart, changeQuantity, toggleStatusBar, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;