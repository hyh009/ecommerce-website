import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductSuccess,
  deleteProductStart,
  updateProductStart,
  updateProductFailure,
  updateProductSuccess,
  updatePartialProductStart,
  updatePartialProductFailure,
  updatePartialProductSuccess,
  createProductFailure,
  createProductSuccess,
  createProductStart,
} from "./productRedux";
import ProductService from "../services/adminproduct.service";
import AuthService from "../services/adminauth.service";

//auth
export const login = async (dispatch, user) => {
  dispatch(loginStart());

  try {
    const res = await AuthService.post(user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    err.response.data && dispatch(loginFailure(err.response.data));
  }
};

//product
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await ProductService.get();
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    err.response.data && dispatch(getProductFailure(err.response.data));
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    //const res = await ProductService.delete(id);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    err.response.data && dispatch(deleteProductFailure(err.response.data));
  }
};

export const updateProduct = async (id, updateData, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await ProductService.put(id, updateData);
    dispatch(updateProductSuccess(res.data));
  } catch (err) {
    err.response.data && dispatch(updateProductFailure(err.response.data));
  }
};

export const updatePartialProduct = async (id, updateData, dispatch) => {
  dispatch(updatePartialProductStart());
  try {
    const res = await ProductService.patch(id, updateData);
    dispatch(updatePartialProductSuccess({ product: res.data }));
    console.log("update", res.data);
  } catch (err) {
    err.response.data &&
      dispatch(updatePartialProductFailure(err.response.data));
  }
};

export const createProduct = async (product, dispatch) => {
  dispatch(createProductStart());
  try {
    const res = await ProductService.post(product);
    dispatch(createProductSuccess(res.data));
  } catch (err) {
    err.response.data && dispatch(createProductFailure(err.response.data));
  }
};
