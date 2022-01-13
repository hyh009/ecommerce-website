import React, { useState } from "react";
import styled from "styled-components";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Popular from "../components/Popular";
import LoadAnimation from "../components/LoadAnimation";
import Announcement from "../components/Announcement";
import Nav from "../components/Nav";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import ScrollToTopBtn from "../components/ScrollToTopBtn";
import { Helmet } from "react-helmet";

const SubTitle = styled.h2`
  padding: 50px 0px 10px 25px;
  font-size: 5vmin;
  font-weight: 100;
`;

const Hr = styled.hr`
  height: 2px;
  background-color: #eee;
  width: calc(100% - 40px);
  margin: auto;
  border: none;
`;
const Home = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  return (
    <div>
      <Helmet>
        <title>矽膠產品專家|墊一店</title>
        <meta name="description" content="本網站資訊來源自網路。"></meta>
      </Helmet>
      <LoadAnimation
        showAnimation={showAnimation}
        setShowAnimation={setShowAnimation}
      />
      {showAnimation && (
        <>
          <Nav position="sticky" />
          <Announcement />
          <Slider />
          <SubTitle>商品分類</SubTitle>
          <Hr />
          <Categories />
          <SubTitle>最新商品</SubTitle>
          <Hr />
          <Popular />
          <Newsletter />
          <Footer />
          <ScrollToTopBtn />
        </>
      )}
    </div>
  );
};

export default Home;
