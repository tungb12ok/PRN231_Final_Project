import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const productPersistConfig = {
    key: "product",
    storage,
};

const initialState = {
    products: [],
    total: 0, 
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            const { products, total } = action.payload.data;
            state.products = products;
            state.total = total;
        },
    },
});

export const { setProducts } = productSlice.actions;

export const selectProducts = (state) => state.product;

export default persistReducer(productPersistConfig, productSlice.reducer);
