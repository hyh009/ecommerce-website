import React from "react";
import styled, { keyframes } from "styled-components";
import { tabletBig, tablet, mobile } from "../responsive";
import EmptyCart from "../components/EmptyCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateCart } from "../redux/apiCall";
import { Helmet } from "react-helmet";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
`;
const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  letter-spacing: 2px;
  margin-bottom: 10px;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
  ${mobile({ flexDirection: "column", marginBottom: "0" })}
`;
const TopTextContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
  ${mobile({
    margin: "20px 10px",
    fontSize: "16px",
    textAlign: "center",
  })}
`;
const CustomLink = styled(Link)`
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: black;
  display: block;
`;
const TopButton = styled.button`
  width: 10%;
  padding: 5px;
  letter-spacing: 2px;
  cursor: pointer;
  background: ${(props) => (props.type === "filled" ? "black" : "transparent")};
  border: ${(props) =>
    props.type === "filled" ? "none" : "1.5px solid black"};
  color: ${(props) => props.type === "filled" && "white"};
  transition: all 0.25s ease;

  ${tabletBig({ width: "20%" })}
  ${mobile({ width: "50%" })}
  
  &:hover {
    background: ${(props) => (props.type === "filled" ? "black" : "#fafaf2")};
    color: ${(props) => props.type === "filled" && "#fafaf2"};
  }
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${tablet({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  background: #fafaf2;
  ${tabletBig({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 3;
  display: flex;
  ${mobile({ flexDirection: "column", alignItems: "center" })}
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 10px;
  padding: 10px;
  font-size: 16px;
  ${mobile({ margin: "10px" })}
`;
const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  padding: 5px;
`;
const Name = styled.span`
  ${mobile({ margin: "5px 0" })}
`;

const Color = styled.div`
  background: ${(props) => props.color};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 1px solid lightgray;
  ${mobile({ margin: "5px 0" })}
`;
const Pattern = styled.span`
  background-color: black;
  color: white;
  border-radius: 10px;
  padding: 2px 5px;
  max-width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  letter-spacing: 1px;
  ${tabletBig({
    maxWidth: "80px",
    fontSize: "14px",
  })}
`;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${tabletBig({ flexDirection: "row", margin: "30px 0" })}
  ${mobile({ flexDirection: "column", margin: "5px 0" })}
`;

const ProductAmountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProductAmount = styled.div`
  border: 1px solid lightgray;
  width: 45px;
  height: 45px;
  margin: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
`;

const Amount = styled.span`
  font-size: 20px;
`;

const CustomAddIcon = styled(AddIcon)`
  cursor: pointer;
  &:hover {
    color: #545454;
  }
`;

const CustomRemoveIcon = styled(RemoveIcon)`
  cursor: pointer;
  &:hover {
    color: #545454;
  }
`;

const ProductPrice = styled.span`
  font-size: 20px;
  margin-top: 20px;
  ${tabletBig({ marginTop: "0", marginLeft: "50px" })}
  ${mobile({ margin: "15px 0" })}
`;

const Hr = styled.hr`
  background: #eee;
  border: none;
  height: 1px;
`;
const Summary = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 60vh;
  border: 0.5px solid lightgray;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
  filter: drop-shadow(0px 0px 5px rgba(122, 122, 122, 0.5));
  margin-left: 5px;
  justify-content: space-between;
  ${tabletBig({ minHeight: "300px", height: "30vh" })}
  ${tablet({ marginTop: "20px" })}
`;

const SummaryTitle = styled.span`
  font-size: 28px;
  letter-spacing: 2px;
  align-self: center;
`;
const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  &:hover {
    background-color: #eee;
  }
`;
const SummaryItemText = styled.span`
  color: ${(props) => (props.type === "total" ? "teal" : "black")};
  font-size: ${(props) => (props.type === "total" ? "22px" : "18px")};
  font-weight: ${(props) => (props.type === "total" ? "600" : "400")};
`;
const SummaryItemPrice = styled.span`
  color: ${(props) => (props.type === "total" ? "teal" : "black")};
  font-size: ${(props) => (props.type === "total" ? "22px" : "18px")};
  font-weight: ${(props) => (props.type === "total" ? "600" : "400")};
`;

const scaleupndown = keyframes`
    0% {
    transform: scale(1);
  }
  50% {

    transform: scale(1.2);
  }
  100% {

    transform: scale(1);
  }
`;

const CustomShoppingCartIcon = styled(ShoppingCartIcon)`
  visibility: hidden;
  transition: all 1s ease-in-out;
  color: #ffa122;
  position: absolute;
  left: 70%;
`;
const Button = styled.button`
  font-size: 18px;
  border: none;
  padding: 5px;
  cursor: pointer;
  background-color: black;
  color: white;
  letter-spacing: 2px;
  position: relative;
  &:hover ${CustomShoppingCartIcon} {
    visibility: visible;
    animation: ${scaleupndown} 2s linear infinite;
  }
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const accessToken = useSelector((state) => state.user.accessToken);
  const dispatch = useDispatch();

  const handleAmount = (mode, product) => {
    if (mode === "add") {
      const uniqueString = `${product._id}${product?.color?.name}${product.pattern}`;
      const newQuantity = product.quantity + 1;
      const newProducts = cart.products.map((p) => {
        if (`${p._id}${p?.color?.name}${p.pattern}` === uniqueString) {
          return {
            ...p,
            quantity: newQuantity,
            subtotal: newQuantity * p.price,
          };
        } else {
          return p;
        }
      });

      updateCart(dispatch, user, newProducts, accessToken);
    } else if (mode === "remove") {
      const uniqueString = `${product._id}${product?.color?.name}${product.pattern}`;
      const newQuantity = product.quantity - 1;
      if (newQuantity === 0) {
        const newProducts = cart.products.filter(
          (p) => `${p._id}${p?.color?.name}${p.pattern}` !== uniqueString
        );
        updateCart(dispatch, user, newProducts, accessToken);
      } else {
        const newProducts = cart.products.map((p) => {
          if (`${p._id}${p?.color?.name}${p.pattern}` === uniqueString) {
            return {
              ...p,
              quantity: newQuantity,
              subtotal: newQuantity * p.price,
            };
          } else {
            return p;
          }
        });
        updateCart(dispatch, user, newProducts, accessToken);
      }
    }
  };
  const handleClearup = (e) => {
    e.preventDefault();
    const newProducts = [];
    updateCart(dispatch, user, newProducts, accessToken);
  };

  return (
    <Container>
      <Helmet>
        <title>我的購物車|墊一店</title>
        <meta name="description" content="購物車中的商品。"></meta>
      </Helmet>
      <Wrapper>
        <Title>我的購物車</Title>
        <Top>
          <TopButton>
            <CustomLink to="/products/all">繼續購物</CustomLink>
          </TopButton>
          <TopTextContainer>
            <TopText>購物車中商品({cart.quantity || 0})</TopText>
            <TopText>
              <Link to="/wish" style={{ color: "black" }}>
                我的願望清單({user?.like.length || 0})
              </Link>
            </TopText>
          </TopTextContainer>
          <TopButton type="filled" onClick={(e) => handleClearup(e)}>
            清空購物車
          </TopButton>
        </Top>
        {cart?.products?.length > 0 ? (
          <>
            <Bottom>
              <Info>
                {cart.products.map((product, index) => (
                  <div key={index}>
                    <Product>
                      <ProductDetail>
                        <Image src={product.img} />
                        <Details>
                          <Name title={product?.title}>
                            <b>商品：</b>
                            {product.title}
                          </Name>
                          {product?.color &&
                            Object.keys(product.color).length > 0 && (
                              <Color
                                color={product.color.code}
                                title={product.color.name}
                              ></Color>
                            )}
                          {product.pattern.length > 0 && (
                            <Pattern title={product.pattern}>
                              {product.pattern}
                            </Pattern>
                          )}
                        </Details>
                      </ProductDetail>
                      <PriceDetail>
                        <ProductAmountContainer>
                          <CustomRemoveIcon
                            onClick={() => handleAmount("remove", product)}
                          />
                          <ProductAmount>
                            <Amount>{product.quantity}</Amount>
                          </ProductAmount>
                          <CustomAddIcon
                            onClick={() => handleAmount("add", product)}
                          />
                        </ProductAmountContainer>
                        <ProductPrice>NT$ {product.subtotal}</ProductPrice>
                      </PriceDetail>
                    </Product>
                    <Hr />
                  </div>
                ))}
              </Info>
              <Summary>
                <SummaryTitle>價格明細</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>小計</SummaryItemText>
                  <SummaryItemPrice>$NT {cart.total}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>運費</SummaryItemText>
                  <SummaryItemPrice>$NT 60</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>折扣</SummaryItemText>
                  <SummaryItemPrice>
                    $NT {Math.floor(cart.total * 0.2)}
                  </SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText type="total">總計</SummaryItemText>
                  <SummaryItemPrice type="total">
                    $NT {cart.total + 60 - Math.floor(cart.total * 0.2)}
                  </SummaryItemPrice>
                </SummaryItem>
                <Button>
                  結帳去
                  <CustomShoppingCartIcon />
                </Button>
              </Summary>
            </Bottom>
          </>
        ) : (
          <EmptyCart content="cart" />
        )}
      </Wrapper>
    </Container>
  );
};

export default Cart;
