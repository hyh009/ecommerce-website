import React, { useEffect, useState } from "react";
import { tabletBig, mobile } from "../responsive";
import styled from "styled-components";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import OrderService from "../services/order.service";
import NotFound from "./NotFound";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Container = styled.div`
  padding: 20px;
  min-height: calc(100vh - 90px);
  ${tabletBig({ padding: "0 20px", height: "calc(100vh - 80px)" })}
  ${mobile({ minHeight: "60vh" })}
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Block = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  ${tabletBig({ flexDirection: "column" })}
`;
const Image = styled.img`
  object-fit: cover;
  width: 35%;
  ${tabletBig({ width: "70%" })}
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  gap: 20px;
`;
const Text = styled.h3`
  font-weight: normal;
  font-size: 5vmin;
  ${tabletBig({ textAlign: "center" })}
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

const PaymentCancel = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const accessToken = useSelector((state) => state.user.accessToken);
  const [searchParams] = useSearchParams();
  const [transactionId, setTransactionId] = useState(
    searchParams.get("transactionId")
  );
  const orderId = searchParams.get("orderId");
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    const updateOrderState = async () => {
      setIsFetching(true);
      const res = await OrderService.getOrderById(orderId);
      // if passthrough this page twice, show 404
      const order = res.data;
      if (order.status !== "待付款") {
        setTransactionId(null);
        setIsFetching(false);
        return;
      }
      const updateOrder = {
        _id: orderId,
        status: "訂單取消",
        payment: {
          status: "已取消",
        },
      };
      await OrderService.updateOrder(user._id, updateOrder, accessToken);
      setIsFetching(false);
    };

    if (transactionId && orderId) {
      updateOrderState();
    }
  }, []);
  return (
    <Container>
      {!transactionId || !orderId ? (
        <NotFound content="page" />
      ) : isFetching ? (
        <ProgressContainer>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
          <span style={{ textAlign: "center", width: "100%" }}>
            資料讀取中...
          </span>
        </ProgressContainer>
      ) : (
        <Block>
          <Helmet>
            <title>取消付款|墊一店</title>
            <meta
              name="description"
              content="付款失敗，訂單已取消，請重新下單。"
            ></meta>
          </Helmet>
          <Image
            alt="Paid failed"
            src="https://res.cloudinary.com/dh2splieo/image/upload/v1641970932/shop_website/imgs/undraw_notify_re_65on_q6oigl.svg"
          />
          <TextContainer>
            <Text>
              付款失敗。
              <br />
              訂單已取消，請重新下單。
            </Text>
            <GoBackBtn
              onClick={(e) => {
                e.preventDefault();
                navigate("/products/all");
              }}
            >
              回產品一覽
            </GoBackBtn>
          </TextContainer>
        </Block>
      )}
    </Container>
  );
};

export default PaymentCancel;
