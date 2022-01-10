import React, { useState } from "react";
import styled from "styled-components";
import EmptyCart from "../components/EmptyCart";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ShoppingCart,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 0 10px;
`;
const Title = styled.h3`
  margin-left: 5px;
  letter-spacing: 2px;
  font-size: 16px;
  font-weight: normal;
  display: flex;
  align-items: center;
  svg {
    font-size: 20px;
    color: teal;
  }
`;

const ShowMoreBtn = styled(Link)`
  text-decoration: none;
  color: black;
  background-color: #ffa122;
  font-size: 14px;
  letter-spacing: 1px;
  border-radius: 10px;
  padding: 2px 5px;
  margin-right: 5px;
`;

const CardContainer = styled.div`
  --length: ${(props) => props.length};
  position: relative;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(var(--length), calc((100%) / 3));
  padding: 10px;
  transform: translateX(
    calc(${(props) => props.index} * -100% + 20px * ${(props) => props.index})
  );
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 10px;
  gap: 10px;
  display: none;
  user-select: none;
  margin: 5px;
`;

const Product = styled.div`
  padding: 5px;
  position: relative;
  &:hover ${Info} {
    display: flex;
  }
`;

const Image = styled.img`
  aspect-ratio: 1/1;
  object-fit: cover;
  overflow: hidden;
  border-radius: 10px;
  width: 100%;
`;
const ProductTitle = styled.p`
  font-size: 12px;
  display: block;
  grid-column: 1/5;
  align-self: center;
  color: white;
  letter-spacing: 2px;
  text-align: center;
`;
const ProductDesc = styled.p`
  font-size: 12px;
  color: #ff9b3d;
  font-weight: bold;
  letter-spacing: 1px;
`;

const CustomArrowLeftOutlined = styled(ArrowLeftOutlined)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  cursor: pointer;
  z-index: 1;
  color: rgba(0, 0, 0, 0.7);
  background-color: rgba(122, 122, 122, 0.3);
  border-radius: 50%;

  &.css-i4bv87-MuiSvgIcon-root {
    font-size: 35px;
    display: ${(props) => (props.index <= 0 ? "none" : "inline-block")};
  }
`;
const CustomArrowRightOutlined = styled(ArrowRightOutlined)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  cursor: pointer;
  z-index: 1;
  color: rgba(0, 0, 0, 0.7);
  background-color: rgba(122, 122, 122, 0.3);
  border-radius: 50%;

  &.css-i4bv87-MuiSvgIcon-root {
    font-size: 35px;
    display: ${(props) =>
      props.index >= props.length / 3 - 1 ? "none" : "inline-block"};
  }
`;

const ProfileCart = () => {
  const cart = useSelector((state) => state.cart);
  const [index, setIndex] = useState(0);

  const handleSlide = (direction) => {
    if (direction === "left") {
      setIndex((prev) => prev - 1);
    } else if (direction === "right") {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <Container>
      <Header>
        <Title>
          <ShoppingCart />
          購物車中商品
        </Title>
        {cart.products?.length > 3 && (
          <ShowMoreBtn to="/cart">顯示全部</ShowMoreBtn>
        )}
      </Header>
      <CustomArrowLeftOutlined
        index={index}
        onClick={() => handleSlide("left")}
      />
      {cart.products?.length > 0 ? (
        <CardContainer index={index} length={cart.products?.length || 0}>
          {cart.products?.map((product, index) => (
            <Product key={index}>
              <Image src={product.img} />
              <Info>
                <ProductTitle>{product.title}</ProductTitle>
                {product?.color?.name && (
                  <ProductDesc>顏色：{product.color.name}</ProductDesc>
                )}
                {product?.pattern?.length > 0 && (
                  <ProductDesc>樣式：{product.pattern}</ProductDesc>
                )}
              </Info>
            </Product>
          ))}
        </CardContainer>
      ) : (
        <EmptyCart place="profile" content="cart" />
      )}
      <CustomArrowRightOutlined
        index={index}
        length={cart.products?.length || 0}
        onClick={() => handleSlide("right")}
      />
    </Container>
  );
};

export default ProfileCart;
