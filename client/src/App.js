import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
import { Helmet } from "react-helmet";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <Helmet>
        <title>矽膠產品專家|墊一店</title>
        <meta name="description" content=""></meta>
      </Helmet>
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
            <Route path="*" element={<NotFound content="page" />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default App;
