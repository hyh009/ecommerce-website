import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { tabletBig, mobile } from "../responsive";
import styled from "styled-components";
import { SmallProduct, Message } from "../components";
import ProductService from "../services/product.service";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useDispatch, useSelector } from "react-redux";
import { updateCart, checkProductInCart } from "../redux/apiCall";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import NotFound from "./NotFound";

import { Helmet } from "react-helmet";

const Container = styled.div``;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 90px);
  gap: 20px;
  ${tabletBig({ height: "50vh" })}
`;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  ${tabletBig({ flexDirection: "column" })}
  ${mobile({ padding: "0" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  flex-direction: column;
`;

const Arrow = styled.div`
  position: absolute;
  top: calc(50%);
  left: ${(props) => props.direction === "left" && "0"};
  right: ${(props) => props.direction === "right" && "0"};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 2px;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  ${tabletBig({ padding: "20px 8px" })}
  ${mobile({ padding: "5px 0" })}
  &:hover {
    filter: brightness(90%);
  }
`;
const CustomArrowIconRight = styled(ArrowForwardIosOutlinedIcon)`
  color: gray;
  ${tabletBig({ transform: "scale(1.5)" })}
  ${mobile({ transform: "scale(1)" })}
  &:hover {
    color: lightgray;
  }
`;

const CustomArrowIconLeft = styled(ArrowBackIosOutlinedIcon)`
  color: gray;
  ${tabletBig({ transform: "scale(1.5)" })}
  ${mobile({ transform: "scale(1)" })}
  &:hover {
    color: lightgray;
  }
`;

const PicContainer = styled.div`
  position: relative;
  aspect-ratio: 1/1;
  overflow: hidden;
  ${tabletBig({ height: "80vw" })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  position: relative;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const ChooserContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  grid-auto-rows: 1fr;
  margin: 10px 0;
  background-color: #eee;
`;

const SmallImg = styled.img`
  width: calc(100%);
  align-self: center;
  justify-self: center;
  overflow: hidden;
  object-fit: cover;
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;
const InfoContainer = styled.div`
  flex: 1;
  width: 100%;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 1.25rem;
  letter-spacing: 1px;
  padding-bottom: 10px;
  border-bottom: 2px solid lightgray;
  ${tabletBig({ fontSize: "1.5rem" })}
`;
const Description = styled.p`
  margin: 10px 0;
  line-height: 30px;
  letter-spacing: 1px;
  ${tabletBig({ fontSize: "1.25rem", lineHeight: "2.5rem" })}
`;

const Notice = styled.span`
  background-color: rgba(170, 240, 209, 0.2);
  padding: 5px 0;
  letter-spacing: 1px;
  ${tabletBig({ fontSize: "1.25rem", lineHeight: "2.5rem" })}
`;

const NoticeContainer = styled.span`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
`;

const Price = styled.span`
  font-size: 30px;
  font-weight: 200;
  color: teal;
  letter-spacing: 1px;
  ${tabletBig({ fontSize: "2rem" })}
`;

const FilterContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;
const Filter = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px 0;
`;

const FilterText = styled.span`
  margin: 0 5px 0 0;
  font-size: 0.9rem;
  ${tabletBig({ fontSize: "1.5rem" })}
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
  border: 1px solid lightgray;
  ${tabletBig({ width: "50px", height: "50px", margin: "8px" })}
  ${mobile({ width: "40px", height: "40px", margin: "10px" })}

  &:hover {
    transform: scale(1.1);
  }
  &.color_active {
    border: 2px solid teal;
    transform: scale(1.2);
    ${tabletBig({ border: "3px solid teal" })}
  }
`;

const Select = styled.select`
  margin-right: 10px;
  cursor: pointer;
  padding: 5px 0;
  border-radius: 5px;
  text-align: center;
  border: 1px solid black;
  background-color: white;

  &:hover {
    border: 2px solid teal;
  }
`;

const Option = styled.option``;

const AddContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${mobile({
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "unset",
  })}
`;
const AmountContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${mobile({
    margin: "20px 0",
  })}
`;

const AmountText = styled.span`
  margin: 0 5px 0 0;
  font-size: 0.9rem;
  ${tabletBig({ fontSize: "1.5rem" })}
`;
const Amount = styled.span`
  padding: 0 10px;
  border: 1.5px solid teal;
  border-radius: 10px;
  margin: 0 5px;
  ${tabletBig({
    fontSize: "2rem",
    padding: "0 15px",
    margin: "0 10px",
    border: "2px solid teal",
  })}
`;

const Button = styled.button`
  background-color: white;
  border: 2px solid teal;
  font-size: 1rem;
  padding: 5px 10px;
  margin-left: 50px;
  transition: all 0.25s ease-in;
  cursor: pointer;
  ${tabletBig({ fontSize: "1.5rem", border: "3px solid teal" })}
  ${mobile({ margin: "20px 0" })}

  &:hover {
    background-color: #fafaf2;
    border: 2px solid #ffa122;
    ${tabletBig({ border: "3px solid #ffa122" })}
  }
`;
const CustomAddIcon = styled(AddIcon)`
  cursor: pointer;
  ${tabletBig({ transform: "scale(1.5)" })}

  &:hover {
    color: #545454;
  }
`;

const CustomRemoveIcon = styled(RemoveIcon)`
  cursor: pointer;
  ${tabletBig({ transform: "scale(1.5)" })}

  &:hover {
    color: #545454;
  }
`;

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [currentImg, setCurrentImg] = useState({});
  const [currentProduct, setCurrentProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState({});
  const [pattern, setPattern] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const colorRef = useRef([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const accessToken = useSelector((state) => state.user.accessToken);

  const [showSmallProduct, setShowSmallProduct] = useState(false);

  useEffect(() => {
    //get single product information
    const getProduct = async () => {
      try {
        const res = await ProductService.get(productId);
        setCurrentProduct(res.data);
        setCurrentImg(res.data.imgs[0]);
        setIsFetching(false);
      } catch (err) {
        console.log(err);
        setIsFetching(false);
      }
    };
    getProduct();
  }, [productId]);

  useEffect(() => {
    setShowSmallProduct(true);
  }, [cart.products]);

  const handleChangePic = (e) => {
    const pic_Id = parseInt(e.target.id);
    setCurrentImg(currentProduct.imgs[pic_Id]);
  };
  // arrow of slider
  const handleArrow = (direction) => {
    if (currentProduct.imgs) {
      const imgLength = parseInt(currentProduct.imgs.length);
      if (direction === "right") {
        const nextIndex = currentProduct.imgs.indexOf(currentImg) + 1;
        nextIndex >= imgLength
          ? setCurrentImg(currentProduct.imgs[0])
          : setCurrentImg(currentProduct.imgs[nextIndex]);
      } else {
        const prevIndex = currentProduct.imgs.indexOf(currentImg) - 1;
        prevIndex < 0
          ? setCurrentImg(currentProduct.imgs[imgLength - 1])
          : setCurrentImg(currentProduct.imgs[prevIndex]);
      }
    }
  };
  // indicate which color is choosed
  const handleColorButton = (e, index) => {
    colorRef.current.forEach((ref) => ref.classList.remove("color_active"));
    colorRef.current[index].classList.add("color_active");
  };

  const handleAmount = (method) => {
    if (method === "add") {
      if (quantity < 100) {
        setQuantity((quantity) => quantity + 1);
      } else {
        return window.alert("購買100個以上請直接透過下方聯絡資訊與我們聯繫。");
      }
    } else {
      quantity > 1 && setQuantity((quantity) => quantity - 1);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!pattern?.length > 0 && !color?.name) {
      return window.alert("請選擇樣式或顏色");
    }
    const newProduct = {
      _id: currentProduct._id,
      title: currentProduct.title,
      img: currentProduct.imgs[0].src,
      price: currentProduct.price,
      quantity,
      color,
      pattern,
      subtotal: quantity * currentProduct.price,
    };
    // if cart is not empty
    if (cart?.products?.length > 0) {
      const [repeat, newProducts] = checkProductInCart(
        cart.products,
        newProduct,
        quantity
      );
      if (!repeat) {
        // if new product is not in the cart, need to push into cart.products
        newProducts.push(newProduct);
        updateCart(dispatch, user, newProducts, accessToken);
      } else {
        // if new product already in the cart, checkProductInCart already return products with new product quantity
        // so just update to redux
        updateCart(dispatch, user, newProducts, accessToken);
      }
    } else {
      //if cart is empty just add new into cart
      updateCart(dispatch, user, [newProduct], accessToken);
    }
    setShowMessage(true);
  };

  return (
    <Container>
      <Helmet>
        <title>{`${currentProduct.title || ""} | 墊一店`}</title>
        <meta name="description" content={`${currentProduct.desc}。`}></meta>
      </Helmet>
      {isFetching ? (
        <ProgressContainer>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
          <span style={{ textAlign: "center", width: "100%" }}>
            資料讀取中...
          </span>
        </ProgressContainer>
      ) : currentProduct?._id ? (
        <>
          {showSmallProduct && (
            <SmallProduct setShowSmallProduct={setShowSmallProduct} />
          )}
          <Wrapper>
            <ImgContainer>
              <PicContainer>
                <Image src={currentImg?.src} />
                <Arrow
                  direction="right"
                  onClick={() => {
                    handleArrow("right");
                  }}
                >
                  <CustomArrowIconRight />
                </Arrow>
                <Arrow
                  direction="left"
                  onClick={() => {
                    handleArrow("left");
                  }}
                >
                  <CustomArrowIconLeft />
                </Arrow>
              </PicContainer>
              {currentProduct.imgs && (
                <ChooserContainer>
                  {currentProduct["imgs"].map((img, index) => (
                    <SmallImg
                      src={img.src}
                      key={index}
                      id={index}
                      onClick={handleChangePic}
                    />
                  ))}
                </ChooserContainer>
              )}
            </ImgContainer>
            <InfoContainer>
              <Title>{currentProduct.title}</Title>
              <Description>{currentProduct.desc}</Description>
              {currentProduct.notice && (
                <NoticeContainer>
                  {currentProduct.notice.map((line, index) => (
                    <Notice key={index}>{line}</Notice>
                  ))}
                </NoticeContainer>
              )}
              <Price>NT${currentProduct.price}</Price>
              <FilterContainer>
                {currentProduct.colors && currentProduct.colors.length > 0 && (
                  <Filter>
                    <FilterText>選擇顏色：</FilterText>
                    {currentProduct.colors.map((color, index) => (
                      <FilterColor
                        key={color._id}
                        ref={(el) => (colorRef.current[index] = el)}
                        title={color.name}
                        color={color.code}
                        onClick={(e) => {
                          handleColorButton(e, index);
                          setColor(color);
                        }}
                      />
                    ))}
                  </Filter>
                )}
                {currentProduct.patterns && currentProduct.patterns.length > 0 && (
                  <Filter>
                    <Select onChange={(e) => setPattern(e.target.value)}>
                      <Option value="">請選擇樣式</Option>
                      {currentProduct.patterns.map((pattern, index) => (
                        <Option key={index}>{pattern}</Option>
                      ))}
                    </Select>
                  </Filter>
                )}
              </FilterContainer>
              <AddContainer>
                <AmountContainer>
                  <AmountText>數量：</AmountText>
                  <CustomRemoveIcon onClick={() => handleAmount("remove")} />
                  <Amount>{quantity}</Amount>
                  <CustomAddIcon onClick={() => handleAmount("add")} />
                </AmountContainer>
                <Button disable={cart.isFetching} onClick={handleClick}>
                  {!cart.isFetching ? "加入購物車" : "進購物車中"}
                </Button>
              </AddContainer>
            </InfoContainer>
          </Wrapper>
          <Message
            message="成功加入購物車"
            showMessage={showMessage}
            setShowMessage={setShowMessage}
          />
        </>
      ) : (
        <NotFound content="product" />
      )}
    </Container>
  );
};

export default Product;
