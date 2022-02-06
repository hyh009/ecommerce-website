import { useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GlobalStyle from "./GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import { MainLayout } from "./components";
import {
  About,
  Cart,
  Checkout,
  Contact,
  Home,
  LinePay,
  Login,
  NotFound,
  PaymentCancel,
  PaymentConfirm,
  Paypal,
  Product,
  ProductList,
  Profile,
  ProfileEdit,
  ProfileOrders,
  Register,
  SingleOrder,
  Wish,
  AdminLogin,
  AdminHome,
  AdminNewProduct,
  AdminProduct,
  AdminProductList,
  AdminUser,
  AdminUserList,
  AdminNewUser,
  AdminOrderList,
  AdminOrderEdit,
} from "./pages";
import ScrollToTop from "./ScrollToTop";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import { getUser, userLogout, getCartData } from "./redux/apiCall";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const accessToken = useSelector((state) => state.user.accessToken);

  useEffect(() => {
    //handle jwt expire
    if (user) {
      const lastLogin = new Date(user.updatedAt);
      const expiredDate = new Date(lastLogin.setDate(lastLogin.getDate() + 3));
      const today = new Date();

      if (expiredDate < today) {
        window.alert("登入期限到期，若有需求請重新登入帳號");
        userLogout(dispatch);
      } else {
        // when refresh, update redux user and cart data from db
        // to prevent different user information in different device (or browser) after update user info
        getUser(dispatch, user._id, accessToken);
        getCartData(dispatch, user, accessToken);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <ScrollToTop>
        <Routes>
          <Route
            path="/register"
            element={
              (user && <Navigate replace to="/profile" />) || <Register />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute isLogged={Boolean(user)} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/profile/order" element={<ProfileOrders />} />
            <Route path="/profile/order/:id" element={<SingleOrder />} />
          </Route>

          {user?.isAdmin && (
            <Route path="/admin/login" element={<AdminLogin />} />
          )}
          {
            <Route element={<AdminRoute isLogged={Boolean(user?.isAdmin)} />}>
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/admin/users" element={<AdminUserList />} />
              <Route path="/admin/users/:id" element={<AdminUser />} />
              <Route path="/admin/users/newuser" element={<AdminNewUser />} />
              <Route path="/admin/products" element={<AdminProductList />} />
              <Route path="/admin/products/:id" element={<AdminProduct />} />
              <Route path="/admin/newproduct" element={<AdminNewProduct />} />
              <Route path="/admin/orders" element={<AdminOrderList />} />
              <Route path="/admin/orders/:id" element={<AdminOrderEdit />} />
            </Route>
          }

          <Route path="/" element={<Home />} />
          <Route element={<MainLayout />}>
            <Route path="/About" element={<About />} />
            <Route path="/products/:category" element={<ProductList />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/wish"
              element={(!user && <Navigate replace to="/login" />) || <Wish />}
            />
            <Route
              path="/payment"
              element={
                (!user && <Navigate replace to="/login" />) || <Outlet />
              }
            >
              <Route path="/payment" element={<Checkout />} />
              <Route path="/payment/linepay" element={<LinePay />} />
              <Route path="/payment/paypal" element={<Paypal />} />
              <Route path="/payment/confirm" element={<PaymentConfirm />} />
              <Route path="/payment/cancel" element={<PaymentCancel />} />
            </Route>
            <Route path="/404" element={<NotFound content="page" />} />
            <Route path="*" element={<NotFound content="page" />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default App;
