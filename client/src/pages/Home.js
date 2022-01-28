import React, { useState } from "react";
import styled from "styled-components";
import {
  Slider,
  Categories,
  Popular,
  LoadAnimation,
  Announcement,
  Newsletter,
  Nav,
  Footer,
  ScrollToTopBtn,
} from "../components";

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
