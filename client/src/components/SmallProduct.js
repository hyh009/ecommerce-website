import React from "react";
import styled, { keyframes } from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";

const animation = keyframes`
    0% {opacity:0.8;transform:translateY(0%); }
    30% {opacity:1;transform:translateY(0%); }
    50% {opacity:1;transform:translateY(-30%); }
    100% {transform:translateY(-100% );}
`;

const Container = styled.div`
  display: ${(props) => (props.showSmallProduct ? "flex" : "none")};
  width: 210px;
  align-items: center;
  position: fixed;
  top: 60px;
  right: 5px;
  background-color: #eee;
  flex-direction: column;
  animation: ${animation};
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  animation-timing-function: ease;
  z-index: 2;
  ${mobile({ display: "none" })}
`;
const Product = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2px;
  border: 1px solid white;
`;
const Info = styled.div`
  grid-column: 3/6;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
const Image = styled.img`
  aspect-ratio: 1/1;
  object-fit: cover;
  overflow: hidden;
  width: 100%;
  grid-column: 1/3;
  align-self: center;
`;
const Title = styled.p`
  font-size: 0.625rem;
  display: block;
  grid-column: 1/5;
  align-self: center;
`;
const Color = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 1px solid lightgray;
  display: inline-block;
  grid-column: 1/3;
  align-self: center;
  justify-self: center;
`;
const Pattern = styled.span`
  font-size: 0.625rem;
  grid-column: 1/3;
  align-self: center;
  justify-self: center;
  color: navy;
`;

const Quantity = styled.span`
  font-size: 0.625rem;
  grid-column: 3/4;
  align-self: center;
  justify-self: center;
`;

const Price = styled.span`
  font-size: 0.625rem;
  font-weight: bold;
  color: teal;
  grid-column: 4/5;
  align-self: center;
  justify-self: center;
`;
const SmallProduct = ({ setShowSmallProduct, showSmallProduct }) => {
  const cartProducts = useSelector((state) => state.cart.products);
  return (
    <Container
      onAnimationEnd={() => setShowSmallProduct(false)}
      showSmallProduct={showSmallProduct}
    >
      {cartProducts?.slice(-5)?.map((product, index) => (
        <Product key={index}>
          <Image src={product.img} alt={product.title} />
          <Info>
            <Title>{product.title}</Title>
            {product?.color?.code && <Color color={product.color.code} />}
            {product?.pattern?.length > 0 && (
              <Pattern>{product.pattern}</Pattern>
            )}
            <Quantity>{product.quantity} ???</Quantity>
            <Price>NT${product.subtotal}</Price>
          </Info>
        </Product>
      ))}
    </Container>
  );
};

export default SmallProduct;
