import React, { useEffect, useState } from "react";
import EmptyCart from "../components/EmptyCart";
import styled from "styled-components";
import { tabletBig, tablet, mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductService from "../services/product.service";
import { updateUser } from "../redux/apiCall";
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
const Block = styled.div`
  display: flex;
  gap: 10px;
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
  justify-content: space-around;
  padding: 20px;
  ${tabletBig({ flexDirection: "row", margin: "30px 0" })}
  ${mobile({ flexDirection: "column", margin: "5px 0" })}
`;

const ProductPrice = styled.span`
  font-size: 20px;
  ${tabletBig({ marginTop: "0", marginLeft: "50px" })}
  ${mobile({ margin: "15px 0" })}
`;

const ActionBtn = styled.button`
  font-size: 16px;
  border: none;
  background-color: ${(props) => (props.color === "action" ? "teal" : "#eee")};
  color: ${(props) => (props.color === "action" ? "white" : "black")};
  letter-spacing: 1px;
  padding: 5px 7px;
  border-radius: 5px;
  cursor: pointer;
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

const SummaryImg = styled.img`
  height: 50%;
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
  ${tablet({ height: "60px", fontSize: "24px" })}
`;
const Wish = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const wishIds = useSelector((state) => state.user.currentUser.like);
  const accessToken = useSelector((state) => state.user.accessToken);
  const [wishProducts, setWishProducts] = useState([]);
  useEffect(() => {
    wishIds.forEach(async (id) => {
      const res = await ProductService.get(id);
      setWishProducts((prev) => [...prev, res.data]);
    });
  }, []);

  const handleRemove = (e) => {
    const updateLike = wishIds.filter((id) => id !== e.target.id);
    const newUser = { _id: user._id, like: updateLike };
    updateUser(dispatch, newUser, accessToken);
    setWishProducts((prev) =>
      prev.filter((product) => updateLike.includes(product._id))
    );
  };

  const handleClearup = (e) => {
    e.preventDefault();
    const newUser = { _id: user._id, like: [] };
    updateUser(dispatch, newUser, accessToken);
    setWishProducts([]);
  };

  return (
    <Container>
      <Helmet>
        <title>我的願望清單 | 墊一店</title>
        <meta name="description" content="願望清單中的商品。"></meta>
      </Helmet>
      <Wrapper>
        <Title>我的願望清單</Title>
        <Top>
          <TopButton>
            <CustomLink to="/products/all">繼續購物</CustomLink>
          </TopButton>
          <TopTextContainer>
            <TopText>
              <Link to="/cart" style={{ color: "black" }}>
                購物車中商品({cart.quantity})
              </Link>
            </TopText>
            <TopText>我的願望清單({user.like.length})</TopText>
          </TopTextContainer>
          <TopButton type="filled" onClick={(e) => handleClearup(e)}>
            清空願望清單
          </TopButton>
        </Top>
        {wishProducts?.length > 0 ? (
          <>
            <Bottom>
              <Info>
                {wishProducts.map((product, index) => (
                  <div key={index}>
                    <Product>
                      <ProductDetail>
                        <Image src={product?.imgs && product?.imgs[0].src} />
                        <Details>
                          <Name title={product?.title}>
                            <b>商品：</b>
                            {product.title}
                          </Name>
                          {product?.colors?.length > 0 && (
                            <Block>
                              {product.colors.map((color) => (
                                <Color
                                  key={color._id}
                                  color={color.code}
                                  title={color.name}
                                ></Color>
                              ))}
                            </Block>
                          )}
                          {product?.patterns?.length > 0 && (
                            <Block>
                              {product.patterns.map((pattern, index) => (
                                <Pattern title={pattern} key={index}>
                                  {pattern}
                                </Pattern>
                              ))}
                            </Block>
                          )}
                        </Details>
                      </ProductDetail>
                      <PriceDetail>
                        <ProductPrice>價格：NT$ {product.price}</ProductPrice>
                        <ActionBtn color="action">
                          <Link
                            style={{ color: "white", textDecoration: "none" }}
                            to={`/product/${product._id}`}
                          >
                            查看商品
                          </Link>
                        </ActionBtn>
                        <ActionBtn id={product._id} onClick={handleRemove}>
                          移除商品
                        </ActionBtn>
                      </PriceDetail>
                    </Product>
                    <Hr />
                  </div>
                ))}
              </Info>
              <Summary>
                <SummaryTitle>遇見傾心的商品了嗎</SummaryTitle>
                <SummaryImg src="https://res.cloudinary.com/dh2splieo/image/upload/v1641550242/shop_website/imgs/undraw_cookie_love_ulvn_fpjody.svg" />
                <Button>
                  <Link
                    to="/products"
                    style={{ color: "white", textDecoration: "white" }}
                  >
                    尋找更多商品
                  </Link>
                </Button>
              </Summary>
            </Bottom>
          </>
        ) : (
          <EmptyCart content="wish" />
        )}
      </Wrapper>
    </Container>
  );
};

export default Wish;
