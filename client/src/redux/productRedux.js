import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: null,
    errMessage: "",
  },
  reducers: {
    //Get all
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //Delete
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //Update (Put)
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      state.errMessage = "";
      state.isFetching = false;
      state.errMessage = "";
      state.error = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
    },
    updateProductFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errMessage = action.payload;
    },
    //Update (Patch)
    updatePartialProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updatePartialProductSuccess: (state, action) => {
      state.errMessage = "";
      state.isFetching = false;
      state.errMessage = "";
      state.error = false;
      state.products[
        state.products.findIndex(
          (item) => item._id === action.payload.product._id
        )
      ] = action.payload.product;
    },
    updatePartialProductFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errMessage = action.payload;
    },
    //Create
    createProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    createProductSuccess: (state, action) => {
      state.errMessage = "";
      state.isFetching = false;
      state.errMessage = "";
      state.error = false;
      state.products.push(action.payload);
    },
    createProductFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errMessage = action.payload;
    },
  },
});

export const {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductSuccess,
  deleteProductStart,
  updateProductFailure,
  updateProductSuccess,
  updateProductStart,
  updatePartialProductStart,
  updatePartialProductSuccess,
  updatePartialProductFailure,
  createProductFailure,
  createProductSuccess,
  createProductStart,
} = productSlice.actions;

export default productSlice.reducer;
