import {
  updateCartStart,
  updateCartSuccess,
  updateCartFailure,
  cleanupCartTemp,
} from "./cartRedux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "./userRedux";
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
import CartService from "../services/cart.service";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import ProductService from "../services/product.service";

//AUTH
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await AuthService.login(user);
    const { accessToken, ...currentUser } = res.data;
    dispatch(loginSuccess({ currentUser, accessToken }));
  } catch (err) {
    console.log(err);
    err.response.data && dispatch(loginFailure(err.response.data));
  }
};

export const userLogout = async (dispatch) => {
  dispatch(logout());
  dispatch(cleanupCartTemp());
};

//CART
export const getCartData = async (dispatch, user, TOKEN) => {
  try {
    dispatch(updateCartStart());
    const res = await CartService.get(user._id, TOKEN);
    if (res.data) {
      const { userId, ...savedCart } = res.data;
      dispatch(updateCartSuccess(savedCart));
      return savedCart;
    } else {
      dispatch(updateCartSuccess([]));
    }
  } catch (err) {
    console.log(err);
    dispatch(updateCartFailure());
  }
};

export const updateCart = async (dispatch, user, products, TOKEN) => {
  dispatch(updateCartStart());
  //if not login only add to redux cart
  if (user?._id) {
    try {
      let newTotal = 0;

      products?.forEach((product) => (newTotal += product.subtotal));
      const newQuantity = products?.length || 0;
      const res = await CartService.update(
        user._id,
        products,
        newQuantity,
        newTotal,
        TOKEN
      );

      dispatch(
        updateCartSuccess({
          products: res.data.products,
          quantity: newQuantity,
          total: newTotal,
        })
      );
      return res.data;
    } catch (err) {
      dispatch(updateCartFailure());
    }
  } else {
    let newTotal = 0;

    products?.forEach((product) => (newTotal += product.subtotal));
    const newQuantity = products?.length || 0;

    dispatch(
      updateCartSuccess({ products, quantity: newQuantity, total: newTotal })
    );
  }
};

// USER
export const updateUser = async (dispatch, updateData, TOKEN) => {
  dispatch(updateUserStart());
  try {
    const res = await UserService.patch(updateData, TOKEN);
    dispatch(updateUserSuccess(res.data));
    return [res.data, null];
  } catch (err) {
    dispatch(updateUserFailure());
    return [null, err.response.data];
  }
};

export const getUser = async (dispatch, userId, TOKEN) => {
  dispatch(updateUserStart());
  try {
    const res = await UserService.get(userId, TOKEN);
    dispatch(updateUserSuccess(res.data));
    return res.data;
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

// for cart
// check if same product is already in the cart. if yes return products array with new product quantity,
// if no return same single product
export const checkProductInCart = (cartProducts, newProduct, quantity) => {
  const uniqueString = `${newProduct._id}${newProduct?.color?.name}${newProduct.pattern}`;
  let repeat = false;
  // add quantity if newProduct already in the cart
  const newProducts = cartProducts.map((product) => {
    if (
      `${product._id}${product?.color?.name}${product.pattern}` === uniqueString
    ) {
      repeat = true;
      const newQuantity = product.quantity + quantity;
      //retrun repeat product (added quantity)
      return {
        ...product,
        quantity: newQuantity,
        subtotal: newQuantity * product.price,
      };
    } else {
      //just return origin product;
      return product;
    }
  });

  return [repeat, newProducts];
};

// product
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await ProductService.getAll();
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    err.response.data && dispatch(getProductFailure(err.response.data));
  }
};

export const deleteProduct = async (id, dispatch, accessToken) => {
  dispatch(deleteProductStart());
  try {
    //const res = await ProductService.delete(id,accessToken);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    err.response.data && dispatch(deleteProductFailure(err.response.data));
  }
};

export const updateProduct = async (id, updateData, dispatch, accessToken) => {
  dispatch(updateProductStart());
  try {
    const res = await ProductService.put(id, updateData, accessToken);
    dispatch(updateProductSuccess(res.data));
  } catch (err) {
    err.response.data && dispatch(updateProductFailure(err.response.data));
  }
};

export const updatePartialProduct = async (
  id,
  updateData,
  dispatch,
  accessToken
) => {
  dispatch(updatePartialProductStart());
  try {
    const res = await ProductService.patch(id, updateData, accessToken);
    dispatch(updatePartialProductSuccess({ product: res.data }));
    return [res.data, null];
  } catch (err) {
    console.log(err);
    err.response.data &&
      dispatch(updatePartialProductFailure(err.response.data));
    return [null, err.response?.data];
  }
};

export const createProduct = async (product, dispatch, accessToken) => {
  dispatch(createProductStart());
  try {
    const res = await ProductService.post(product, accessToken);
    dispatch(createProductSuccess(res.data));
  } catch (err) {
    err.response.data && dispatch(createProductFailure(err.response.data));
  }
};
