import React from "react";
import Announcement from "../components/Announcement";
import Nav from "../components/Nav";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import ScrollToTopBtn from "../components/ScrollToTopBtn";
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
