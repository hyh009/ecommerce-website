import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    isFetching: false,
    error: null,
  },
  reducers: {
    cleanupCartTemp: (state) => {
      state.products = [];
      state.total = 0;
      state.quantity = 0;
    },

    updateCartStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateCartSuccess: (state, action) => {
      state.products = action.payload.products;
      state.total = action.payload.total;
      state.quantity = action.payload.quantity; // this is quantity of items in the cart
      state.isFetching = false;
      state.error = false;
    },
    updateCartFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  updateCartStart,
  updateCartSuccess,
  updateCartFailure,
  cleanupCartTemp,
} = cartSlice.actions; //export action
export default cartSlice.reducer; // to use in store.js
