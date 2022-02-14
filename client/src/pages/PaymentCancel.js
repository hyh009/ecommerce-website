import React from "react";
import { tabletBig, mobile } from "../responsive";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  min-height: calc(100vh - 90px);
  ${tabletBig({ padding: "0 20px", height: "calc(100vh - 80px)" })}
  ${mobile({ minHeight: "60vh" })}
  display: flex;
  align-items: center;
  justify-content: center;
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

const PaymentCancel = () => {
  const navigate = useNavigate();
  return (
    <Container>
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
          訂單未成立，請重新下單。
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
    </Container>
  );
};

export default PaymentCancel;
