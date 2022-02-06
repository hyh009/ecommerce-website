import React from "react";
import Announcement from "./Announcement";
import Nav from "./Nav";
import Newsletter from "./Newsletter";
import Footer from "./Footer";
import ScrollToTopBtn from "./ScrollToTopBtn";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Nav position="sticky" />
      <Announcement />
      <Outlet />
      <Newsletter />
      <Footer />
      <ScrollToTopBtn />
    </div>
  );
};

export default MainLayout;
