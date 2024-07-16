import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleApi } from "../api/timbleApi";

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await handleApi();
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        menuBar: false,
        searchBar: false,
        status: 'idle',
        error: null
    },
    reducers: {
        toggleMenuBar(state) {
            state.menuBar = !state.menuBar;
        },
        toggleSearchBar(state) {
            state.searchBar = !state.searchBar;
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
                state.error = action.payload || action.error.message;
            });
    }
});

export const { toggleMenuBar, toggleSearchBar } = productSlice.actions;
export default productSlice.reducer;
