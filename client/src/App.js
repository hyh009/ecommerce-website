import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GlobalStyle from "./GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import PageTop from "./components/PageTop";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Wish from "./pages/Wish";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./ScrollToTop";
import PrivateRoute from "./PrivateRoute";
import { getUser } from "./redux/apiCall";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const accessToken = useSelector((state) => state.user.accessToken);
  useEffect(() => {
    // when refresh, get and update redux user data from db
    // to prevent different user information in different device (or browser) after update user info
    if (user) {
      const getUserData = () => {
        getUser(dispatch, user._id, accessToken);
      };
      getUserData();
    }
  }, []);
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ScrollToTop>
        <Routes>
          <Route
            path="/register"
            element={(user && <Navigate replace to="/" />) || <Register />}
          />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute isLogged={Boolean(user)} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
          </Route>
          <Route path="/" element={<Home />} />

          <Route element={<PageTop />}>
            <Route path="/About" element={<About />} />
            <Route path="/products/:category" element={<ProductList />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/wish"
              element={(!user && <Navigate replace to="/login" />) || <Wish />}
            />
            <Route path="/404" element={<NotFound content="page" />} />
            <Route path="*" element={<NotFound content="page" />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default App;
