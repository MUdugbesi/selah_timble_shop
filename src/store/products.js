import { createSlice } from "@reduxjs/toolkit";
import { handleApi } from "../api/timbleApi";


const ProductSlice = createSlice({
    name: 'product',
    initialState: {
        products: await handleApi(),
        menuBar: false,
        searchBar: false,

    },

    reducers: {
        toggleMenuBar(state) {
            if (state.menuBar === false) {
                state.menuBar = true;
            } else {
                state.menuBar = false
            }
        },
        toggleSearchBar(state) {
            if (state.searchBar === false) {
                state.searchBar = true;
            } else {
                state.searchBar = false
            }
        },

    }
})

export const { toggleMenuBar, toggleSearchBar } = ProductSlice.actions;
export default ProductSlice.reducer;