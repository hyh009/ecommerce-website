import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { tabletBig, mobile } from "../responsive";

const NoContentContainer = styled.div`
  width: 100%;
  height: 55vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
  ${tabletBig({ height: "40vh", gap: "40px" })}
  ${mobile({ flexDirection: "column", height: "50vh", gap: "20px" })}
`;

const NoContentImg = styled.img`
  height: 70%;
  ${tabletBig({ height: "50%" })}
  ${mobile({ height: "40%" })}
`;
const NoContentDescContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  justify-content: space-around;
  align-items: center;
  ${mobile({
    justifyContent: "flex-start",
    gap: "20px",
    height: "max-content",
  })}
`;
const NoContentText = styled.span`
  font-size: 4vmin;
`;
const NoContentBtn = styled(Link)`
  background-color: teal;
  width: max-content;
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 10px;
  letter-spacing: 2px;
  font-size: 3vmin;
`;
const EmptyCart = ({ place, content }) => {
  return (
    <NoContentContainer style={{ height: place === "profile" && "150px" }}>
      {content === "cart" && (
        <NoContentImg
          src="https://res.cloudinary.com/dh2splieo/image/upload/v1640854025/shop_website/imgs/undraw_empty_cart_co35_aivunl.svg"
          alt="空購物車"
        />
      )}
      {content === "wish" && (
        <NoContentImg
          src="https://res.cloudinary.com/dh2splieo/image/upload/v1641545100/shop_website/imgs/undraw_wishes_icyp_uccfiz.svg"
          alt="尚無願望清單"
        />
      )}
      <NoContentDescContainer>
        {content === "cart" && (
          <NoContentText style={{ fontSize: place === "profile" && "3vmin" }}>
            目前購物車內沒商品...
          </NoContentText>
        )}
        {content === "wish" && (
          <NoContentText style={{ fontSize: place === "profile" && "3vmin" }}>
            目前沒有願望清單...
          </NoContentText>
        )}

        {content === "cart" && (
          <NoContentBtn
            style={{
              fontSize: place === "profile" && "3vmin",
              padding: place === "profile" && "2px 5px",
            }}
            to="/products/all"
          >
            購物去
          </NoContentBtn>
        )}
        {content === "wish" && (
          <NoContentBtn
            style={{
              fontSize: place === "profile" && "3vmin",
              padding: place === "profile" && "2px 5px",
            }}
            to="/products/all"
          >
            查看商品
          </NoContentBtn>
        )}
      </NoContentDescContainer>
    </NoContentContainer>
  );
};

export default EmptyCart;
