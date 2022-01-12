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
import CartService from "../services/cart.service";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

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

// useful function
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
      return {
        ...product,
        quantity: newQuantity,
        subtotal: newQuantity * product.price,
      };
    } else {
      return product;
    }
  });

  return [repeat, newProducts];
};
