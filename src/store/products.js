import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleApi } from "../api/timbleApi";

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async () => {
        const response = await handleApi();
        return response;
    }
);


const ProductSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        menuBar: false,
        searchBar: false,
        status: 'idle',

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

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
})

export const { toggleMenuBar, toggleSearchBar } = ProductSlice.actions;
export default ProductSlice.reducer;