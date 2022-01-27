import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import OrderService from "../services/order.service";
import PaymentService from "../services/payment.service";
import { tabletBig, mobile } from "../responsive";
import NotFound from "./NotFound";
import { updateCart } from "../redux/apiCall";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Helmet } from "react-helmet";

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

const PaymentConfirm = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const user = useSelector((state) => state.user.currentUser);
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const [isFetching, setIsFetching] = useState(false);
  const [transactionId, setTransactionId] = useState(
    searchParams.get("transactionId")
  );
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getOrder = async () => {
      try {
        setIsFetching(true);
        const res = await OrderService.getOrderById(orderId);
        // if passthrough this page twice, show 404
        const order = res.data;
        if (order.status !== "待付款") {
          setTransactionId(null);
          setIsFetching(false);
          return;
        }
        await PaymentService.linepayConfirm(transactionId, order, accessToken);
        const updateOrder = {
          _id: orderId,
          status: "訂單處理中",
          payment: {
            ...order.payment,
            status: "已付款",
          },
        };
        await OrderService.updateOrder(order.user, updateOrder, accessToken);
        // clear up cart
        const newProducts = [];
        updateCart(dispatch, user, newProducts, accessToken);
        setSuccess(true);
        setIsFetching(false);
      } catch (err) {
        // fail => cancel order
        const updateOrder = {
          _id: orderId,
          status: "訂單取消",
          payment: {
            status: "付款失敗",
            transactionId: transactionId,
            method: "linepay",
          },
        };
        await OrderService.updateOrder(user._id, updateOrder, accessToken);
        setSuccess(false);
        setIsFetching(false);
      }
    };

    if (transactionId && orderId) {
      getOrder();
    }
  }, []);

  //確認付款是否成功
  //清空購物車
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
      ) : success ? (
        <Block>
          <Helmet>
            <title>付款確認 | 墊一店</title>
            <meta name="description" content="付款成功頁面。"></meta>
          </Helmet>
          <Image
            alt="Thank you"
            src="https://res.cloudinary.com/dh2splieo/image/upload/v1643188994/shop_website/imgs/undraw_appreciation_re_p6rl_qzx0cq.svg"
          />
          <Text>
            感謝您的購買
            <br />
            我們將於3個工作天內將商品寄出。
          </Text>
        </Block>
      ) : (
        <Block>
          <Helmet>
            <title>付款確認|墊一店</title>
            <meta
              name="description"
              content="付款失敗，請重新下單或聯繫我們。"
            ></meta>
          </Helmet>
          <Image
            alt="Paid failed"
            src="https://res.cloudinary.com/dh2splieo/image/upload/v1643191571/shop_website/imgs/undraw_warning_cyit_tsw9qu.svg"
          />
          <TextContainer>
            <Text>付款失敗。請重新下單，或聯繫我們。</Text>
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

export default PaymentConfirm;