import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { tabletBig, mobile } from "../responsive";
import PaymentService from "../services/payment.service";
import OrderService from "../services/order.service";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 20px;
  ${tabletBig({ padding: "0 10px" })}
`;
const Top = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  ${tabletBig({ gridTemplateColumns: "repeat(1,1fr)" })}
`;

const Title = styled.h3`
  font-weight: normal;
  margin: 10px 0;
  border-bottom: 1px solid lightgray;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Details = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  border: 1px solid white;
  padding: 5px;
  background-color: #eee;
`;
const Desc = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const List = styled.li`
  font-size: 2.5vmin;
  ${mobile({ fontSize: "3vmin" })};
`;

const Subtotal = styled.span`
  text-align: right;
  color: #404040;
  font-size: 2.75vmin;
  ${mobile({ fontSize: "3.25vmin" })};
`;
const Total = styled.span`
  text-align: right;
  font-size: 3.5vmin;
  color: teal;
  padding: 5px 5px;
  background-color: #fafaec;
  ${mobile({ fontSize: "3.75vmin" })};
`;

const Shipping = styled.span`
  font-size: 2.75vmin;
  text-align: right;
  padding: 5px 5px;
  background-color: #fafaec;
  ${mobile({ fontSize: "3.25vmin" })};
`;

const SubProduct = styled.div`
  display: flex;
  gap: 10px;
`;
const Image = styled.img`
  width: 100px;
  aspect-ratio: 1/1;
  border-radius: 10px;
`;

const ShowMore = styled.button`
  border: none;
  cursor: pointer;
  letter-spacing: 1px;
  padding: 5px;
  background-color: #ffa122;
  border-radius: 5px;
  letter-spacing: 1px;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-direction: ${(props) => (props.direction === "row" ? "row" : "column")};
  justify-content: ${(props) =>
    props.direction === "row" ? "space-between" : "center"};
`;
const Input = styled.input`
  width: 100%;
  padding: 2px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid gray;
  font-size: 2.75vmin;
  ${mobile({ fontSize: "3.25vmin" })};
`;

const Label = styled.label`
  font-size: 2.5vmin;
  color: black;
  ${mobile({ fontSize: "3vmin" })};
`;
const PayArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const MethodContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 10px;
  user-select: none;
  gap: 10px;
  ${mobile({ gridTemplateColumns: "repeat(1,1fr)", gap: "15px" })}
`;
const PayImg = styled.img`
  width: 150px;
  aspect-ratio: 24/9;
  object-fit: cover;
`;

const PayName = styled.span`
  font-size: bold;
  padding: 2px 5px;
  width: 100%;
  text-align: center;
  background-color: #e3f5e1;
`;

const Method = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  transition: 0.3s all ease;
  &:hover ${PayImg} {
    transform: scale(1.05);
  }
  &:hover ${PayName} {
    background-color: #b7f5b0;
  }
`;

const Checkbox = styled.input``;

const Submit = styled.button`
  border: none;
  background-color: teal;
  border-radius: 5px;
  color: white;
  letter-spacing: 1px;
  padding: 5px;
  cursor: pointer;
  min-width: max-content;
  width: 20%;
  align-self: flex-end;
  font-size: 3vmin;
  ${tabletBig({ width: "100%", marginBottom: "20px" })}
  ${mobile({ fontSize: "3.5vmin" })};
`;
const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const accessToken = useSelector((state) => state.user.accessToken);
  const navigate = useNavigate();
  const [displayPackages, setDisplayPackages] = useState(3);
  const [inputs, setInputs] = useState({
    recevier: "",
    address: "",
    phone: "",
  });
  const [orderProducts, setOrderProducts] = useState([]);
  const [payment, setPayment] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const shippingFee = 60; // need to update

  useEffect(() => {
    if (cart.products.length > 0) {
      setOrderProducts(() =>
        cart.products.map((product) => ({
          _id: product._id,
          color: product?.color?.name || "",
          pattern: product?.pattern,
          quantity: product?.quantity,
          amount: product?.subtotal,
        }))
      );
    } else {
      window.alert("??????????????????????????????");
      navigate("/products/all");
    }
  }, [cart.products, navigate]);

  // handle show more button
  const handleShowMore = (e) => {
    e.preventDefault();
    if (displayPackages === 3) {
      setDisplayPackages(cart.products.length);
    } else {
      setDisplayPackages(3);
    }
  };
  // handle form input
  const handleInputs = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // handle pay
  const handlePay = async (e) => {
    e.preventDefault();
    // simple validation
    if (!inputs.recevier) return window.alert("???????????????????????????");
    if (!inputs.phone) return window.alert("????????????????????????");
    if (!inputs.address) return window.alert("????????????????????????");
    if (!payment) return window.alert("????????????????????????");
    // create new order and save to DB
    const order = {
      user: user._id,
      products: orderProducts,
      shipping: shippingFee,
      amount: cart.total,
      ...inputs,
    };
    setIsFetching(true);
    try {
      const res = await OrderService.addOrder(user._id, order, accessToken);
      const order_id = res.data._id;
      const res_order = await OrderService.getOrderById(order_id);
      const orderDetail = res_order.data;
      if (payment === "linepay") {
        const resPay = await PaymentService.linepayPost(
          orderDetail,
          accessToken
        );

        navigate("/payment/linepay", {
          state: {
            web: resPay.data.paymentUrl,
            app: resPay.data.paymentUrlApp,
          },
        });
      } else if (payment === "paypal") {
        // credit card
        navigate("/payment/paypal", {
          state: {
            order: orderDetail,
          },
        });
      }
    } catch (err) {
      return window.alert("?????????????????????????????????????????????????????????");
    }
  };

  return (
    <Container>
      <Helmet>
        <title>?????????????????? | ?????????</title>
        <meta name="description" content="???????????????????????????????????????"></meta>
      </Helmet>
      <Top>
        <MiddleContainer>
          <Title>??????????????????</Title>
          {cart.products &&
            cart.products.slice(0, displayPackages).map((product, index) => (
              <Details key={index}>
                <List>{index + 1}</List>
                <SubProduct key={index}>
                  <Image src={product.img} alt={product.title} />
                  <Desc>
                    <List>
                      ???????????????
                      {`${product.title} - ${
                        product?.color?.name
                          ? product.color?.name
                          : product?.pattern
                      }`}
                    </List>
                    <List>?????????{product.quantity}</List>
                    <List>?????????NT$ {product.price}</List>
                  </Desc>
                </SubProduct>
                <Subtotal>{`?????????NT$ ${product.subtotal}`}</Subtotal>
              </Details>
            ))}
          {cart.products.length > 3 && (
            <ShowMore onClick={handleShowMore}>
              {displayPackages === 3 ? "????????????" : "????????????"}
            </ShowMore>
          )}

          <div
            style={{ borderBottom: "1px solid lightgray", margin: "5px 0" }}
          />
          <Shipping>?????????NT$ {shippingFee}</Shipping>
          <Total>?????????NT$ {cart.total + shippingFee}</Total>
        </MiddleContainer>
        <PaymentContainer>
          <ContactForm>
            <Title>????????????</Title>
            <InputContainer>
              <Label>?????????</Label>
              <Input
                name="recevier"
                placeholder="????????????????????????"
                value={inputs.recevier}
                onChange={handleInputs}
              />
            </InputContainer>
            <InputContainer>
              <Label>???????????????</Label>
              <Input
                name="address"
                placeholder="?????????????????????"
                value={inputs.address}
                onChange={handleInputs}
              />
            </InputContainer>
            <InputContainer>
              <Label>???????????????</Label>
              <Input
                name="phone"
                placeholder="?????????????????????"
                value={inputs.phone}
                onChange={handleInputs}
              />
            </InputContainer>
            <InputContainer direction="row">
              <Label>
                <Checkbox
                  style={{ marginRight: "5px" }}
                  type="radio"
                  name="fill"
                  onChange={() => {
                    setInputs(() => ({
                      recevier: user.name,
                      address: user.address,
                      phone: user.phone,
                    }));
                  }}
                />
                ???????????????
              </Label>
              <Label>
                <Checkbox
                  style={{ marginRight: "5px" }}
                  type="radio"
                  name="fill"
                  onChange={() => {
                    setInputs(() => ({
                      recevier: "",
                      address: "",
                      phone: "",
                    }));
                  }}
                />
                ??????????????????
              </Label>
            </InputContainer>
          </ContactForm>
          <PayArea>
            <Title>??????????????????</Title>
            <MethodContainer>
              <Method>
                <PayName>????????? ??? PayPal</PayName>
                <PayImg src="https://res.cloudinary.com/dh2splieo/image/upload/v1643554630/shop_website/imgs/paypal-credit-card_exf5dm.png" />
                <Checkbox
                  type="radio"
                  name="payment"
                  value="paypal"
                  onChange={(e) => setPayment(e.target.value)}
                />
              </Method>
              <Method>
                <PayName>Line Pay</PayName>
                <PayImg src="https://res.cloudinary.com/dh2splieo/image/upload/v1643043199/shop_website/imgs/linepay-logo-jp-gl_gqotc9.png" />
                <Checkbox
                  type="radio"
                  name="payment"
                  value="linepay"
                  onChange={(e) => setPayment(e.target.value)}
                />
              </Method>
              <Method>
                <PayName>comming soon</PayName>
                <PayImg src="https://res.cloudinary.com/dh2splieo/image/upload/v1643043199/shop_website/imgs/linepay-logo-jp-gl_gqotc9.png" />
                <Checkbox
                  type="radio"
                  name="payment"
                  value=""
                  onChange={(e) => setPayment(e.target.value)}
                />
              </Method>
            </MethodContainer>
          </PayArea>
          <Submit onClick={handlePay}>
            {isFetching ? "?????????..." : "????????????"}
          </Submit>
        </PaymentContainer>
      </Top>
    </Container>
  );
};

export default Checkout;
