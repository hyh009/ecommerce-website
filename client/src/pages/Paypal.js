import styled from "styled-components";
import { tabletBig, mobile } from "../responsive";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import NotFound from "./NotFound";
import PaymentService from "../services/payment.service";
import OrderService from "../services/order.service";
import { Helmet } from "react-helmet";
import { updateCart } from "../redux/apiCall";

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  padding: 20px;
  height: max-content;
  ${tabletBig({ minHeight: "calc(100vh - 80px)", padding: "50px" })}
  ${mobile({ minHeight: "60vh", padding: "20px" })};
`;
const Title = styled.h1`
  font-weight: normal;
  font-size: 5vmin;
  letter-spacing: 1px;
  text-decoration: underline;
  text-underline-offset: 3px;
  ${mobile({ height: "7vmin" })}
`;

const ImageContainer = styled.div`
  overflow: hidden;
  height: 30vh;
  aspect-ratio: 1/1;
`;
const Image = styled.img`
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1/1;
`;

const ButtonContainer = styled.div`
  width: 40%;
  ${tabletBig({ width: "75%" })}
  ${mobile({ width: "100%" })};
  min-height: max-content;
  position: relative;
  z-index: 1;
`;
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

const Paypal = () => {
  const { state } = useLocation();
  const order = state?.order;
  const user = useSelector((state) => state.user.currentUser);
  const accessToken = useSelector((state) => state.user.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createOrder = async (data, actions) => {
    try {
      const res = await PaymentService.paypalRequest(
        user._id,
        order,
        accessToken
      );
      return res.data.id;
    } catch (err) {
      console.log(err);
    }
  };

  const onApprove = (data, actions) => {
    return actions.order
      .capture()
      .then(function (details) {
        const updateOrder = {
          _id: order._id,
          status: "訂單處理中",
          payment: {
            method: "paypal",
            status: "已付款",
          },
        };
        OrderService.updateOrder(user._id, updateOrder, accessToken).then(() =>
          // clear up cart
          {
            const newProducts = [];
            updateCart(dispatch, user, newProducts, accessToken).then(
              function () {
                return navigate({
                  pathname: "/payment/confirm",
                  search: `?orderId=${order._id}&method=paypal&success=true`,
                });
              }
            );
          }
        );
      })
      .catch((err) => {
        const updateOrder = {
          _id: order._id,
          status: "訂單取消",
          payment: {
            method: "paypal",
            status: "付款失敗",
          },
        };
        OrderService.updateOrder(user._id, updateOrder, accessToken).then(
          function () {
            return navigate({
              pathname: "/payment/confirm",
              search: `?orderId=${order._id}&method=paypal&success=false`,
            });
          }
        );
      });
  };
  return (
    <div>
      {order ? (
        <Container>
          <Helmet>
            <title>信用卡或PayPal付款 | 墊一店</title>
            <meta
              name="description"
              content="選擇付款方式並填入付款資訊"
            ></meta>
          </Helmet>
          <Title>選擇支付方式前往結帳</Title>
          <ImageContainer>
            <Image
              alt="App"
              src="https://res.cloudinary.com/dh2splieo/image/upload/v1643386020/shop_website/imgs/undraw_mobile_pay_re_sjb8_cvefzh.svg"
            />
          </ImageContainer>
          <ButtonContainer>
            <PayPalButton
              createOrder={(data, actions) => createOrder(data, actions)}
              onApprove={(data, actions) => onApprove(data, actions)}
            />
          </ButtonContainer>
        </Container>
      ) : (
        <NotFound content="page" />
      )}
    </div>
  );
};

export default Paypal;
