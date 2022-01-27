import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { tabletBig, mobile } from "../responsive";
import { Helmet } from "react-helmet";

const NotFoundContainer = styled.div`
  width: 100%;
  height: calc(100vh - 90px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  ${tabletBig({ flexDirection: "column", height: "calc(100vh - 80px)" })}
  ${mobile({ height: "60vh" })};
`;
const NotFoundImg = styled.img`
  height: 60%;
  ${tabletBig({ height: "auto", width: "50%" })}
`;
const NotFoundInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
`;
const NotFoundText = styled.span`
  font-size: 5vmin;
  letter-spacing: 2px;
`;
const NavBtn = styled(Link)`
  text-decoration: none;
  color: white;
  background-color: teal;
  letter-spacing: 1px;
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 3vmin;
  width: max-content;
`;

const GoBackBtn = styled.button`
  text-decoration: none;
  color: white;
  background-color: teal;
  letter-spacing: 1px;
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 3vmin;
  width: max-content;
  border: none;
  cursor: pointer;
`;

const NotFound = ({ content, grid }) => {
  const navigate = useNavigate();
  return (
    <div style={{ gridColumn: grid }}>
      <Helmet>
        <title>404-查詢的頁面不存在 | 墊一店</title>
        <meta name="description" content="404-查詢的頁面不存在。"></meta>
      </Helmet>
      <NotFoundContainer>
        <NotFoundImg
          title="此頁面不存在"
          src="https://res.cloudinary.com/dh2splieo/image/upload/v1641477877/shop_website/imgs/undraw_page_not_found_re_e9o6_1_g4b9jw.svg"
        />
        <NotFoundInfo>
          {content === "page" && (
            <NotFoundText>查找的頁面不存在...</NotFoundText>
          )}
          {content === "product" && (
            <NotFoundText>沒有此商品資訊...</NotFoundText>
          )}
          {content === "page" && <NavBtn to="/">返回首頁</NavBtn>}
          {content === "category" && (
            <NotFoundText>目前沒有此類商品...</NotFoundText>
          )}
          {content === "order" && (
            <NotFoundText>沒有此筆訂單資料...</NotFoundText>
          )}
          {content === "product" && (
            <GoBackBtn
              onClick={(e) => {
                e.preventDefault();
                navigate("/products/all");
              }}
            >
              看其他商品
            </GoBackBtn>
          )}
          {content === "order" && (
            <GoBackBtn
              onClick={(e) => {
                e.preventDefault();
                navigate("/profile/order");
              }}
            >
              回訂單一覽
            </GoBackBtn>
          )}
        </NotFoundInfo>
      </NotFoundContainer>
    </div>
  );
};

export default NotFound;
