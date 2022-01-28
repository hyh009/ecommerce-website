import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { tabletBig } from "../responsive";
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
`;

const Subtotal = styled.span`
  text-align: right;
  color: #404040;
  font-size: 2.75vmin;
`;
const Total = styled.span`
  text-align: right;
  font-size: 3.5vmin;
  color: teal;
  padding: 5px 5px;
  background-color: #fafaec;
`;

const Shipping = styled.span`
  font-size: 2.75vmin;
  text-align: right;
  padding: 5px 5px;
  background-color: #fafaec;
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
`;

const Label = styled.label`
  font-size: 2.5vmin;
  color: black;
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
`;
const Method = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
const PayImg = styled.img`
  width: 100px;
  aspect-ratio: 4/3;
  object-fit: cover;
`;
const PayName = styled.span`
  font-size: bold;
  background-color: #e3f5e1;
  padding: 2px 5px;
  border-radius: 5px;
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
  ${tabletBig({ width: "100%" })}
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
      window.alert("請先將商品加入購物車");
      navigate("/products/all");
    }
  }, [cart.products]);

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
    if (!inputs.recevier) return window.alert("請填寫收件人姓名。");
    if (!inputs.phone) return window.alert("請填寫聯絡電話。");
    if (!inputs.address) return window.alert("請填寫收件地址。");
    if (!payment) return window.alert("請選擇付款方式。");
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
        // save transactionId and paymentAccessToken to DB
        const updateOrder = {
          ...orderDetail,
          payment: {
            method: "linepay",
            transactionId: resPay.data.transactionId,
            paymentAccessToken: resPay.data.paymentAccessToken,
            status: "待付款",
          },
        };
        await OrderService.updateOrder(user._id, updateOrder, accessToken);
        window.open(resPay.data.paymentUrl, "_blank");
      } else if (payment === "creditCard") {
        //stripe
      }
    } catch (err) {
      return window.alert("購買失敗，請稍後再嘗試或直接聯繫我們。");
    }
  };

  return (
    <Container>
      <Helmet>
        <title>確認選購商品 | 墊一店</title>
        <meta name="description" content="確認選購商品並填入寄送資訊"></meta>
      </Helmet>
      <Top>
        <MiddleContainer>
          <Title>確認選購商品</Title>
          {cart.products &&
            cart.products.slice(0, displayPackages).map((product, index) => (
              <Details key={index}>
                <List>{index + 1}</List>
                <SubProduct key={index}>
                  <Image src={product.img} alt={product.title} />
                  <Desc>
                    <List>
                      商品名稱：
                      {`${product.title} - ${
                        product?.color?.name
                          ? product.color?.name
                          : product?.pattern
                      }`}
                    </List>
                    <List>數量：{product.quantity}</List>
                    <List>單價：NT$ {product.price}</List>
                  </Desc>
                </SubProduct>
                <Subtotal>{`小計：NT$ ${product.subtotal}`}</Subtotal>
              </Details>
            ))}
          {cart.products.length > 3 && (
            <ShowMore onClick={handleShowMore}>
              {displayPackages === 3 ? "顯示全部" : "顯示部分"}
            </ShowMore>
          )}

          <div
            style={{ borderBottom: "1px solid lightgray", margin: "5px 0" }}
          />
          <Shipping>運費：NT$ {shippingFee}</Shipping>
          <Total>總計：NT$ {cart.total + shippingFee}</Total>
        </MiddleContainer>
        <PaymentContainer>
          <ContactForm>
            <Title>聯絡資訊</Title>
            <InputContainer>
              <Label>姓名：</Label>
              <Input
                name="recevier"
                placeholder="請輸入收件人姓名"
                value={inputs.recevier}
                onChange={handleInputs}
              />
            </InputContainer>
            <InputContainer>
              <Label>收件地址：</Label>
              <Input
                name="address"
                placeholder="請輸入收送地址"
                value={inputs.address}
                onChange={handleInputs}
              />
            </InputContainer>
            <InputContainer>
              <Label>聯絡電話：</Label>
              <Input
                name="phone"
                placeholder="請輸入聯絡電話"
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
                同用戶資料
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
                清除填入內容
              </Label>
            </InputContainer>
          </ContactForm>
          <PayArea>
            <Title>選擇付款方式</Title>
            <MethodContainer>
              <Method>
                <PayName>Cridit Card</PayName>
                <PayImg src="https://res.cloudinary.com/dh2splieo/image/upload/v1643046176/shop_website/imgs/credit-card-methods-v2_yiwdqj.jpg" />
                <Checkbox
                  type="radio"
                  name="payment"
                  value="creditCard"
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
            {isFetching ? "處理中..." : "前往付款"}
          </Submit>
        </PaymentContainer>
      </Top>
    </Container>
  );
};

export default Checkout;
