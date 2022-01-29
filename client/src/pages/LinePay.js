import styled from "styled-components";
import { tabletBig, mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import NotFound from "./NotFound";
import { Helmet } from "react-helmet";

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  overflow: hidden;
  height: calc(100vh - 90px);
  ${tabletBig({
    flexDirection: "column",
    height: "max-content",
    padding: "50px 0",
  })}
`;
const Title = styled.h1`
  font-weight: normal;
  font-size: 5vmin;
  letter-spacing: 1px;
  text-decoration: underline;
  text-underline-offset: 3px;
  ${mobile({ height: "7vmin" })}
`;
const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  position: relative;
  height: max-content;
  height: 100%;
`;
const LinkContainer = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-around;
  height: max-content;
  ${tabletBig({
    flexDirection: "column",
    justifyContent: "center",
    gap: "50px",
  })}
`;

const Temp = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 3.5vmin;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: white;
  letter-spacing: 1px;
  display: none;
  ${mobile({ fontSize: "5vmin" })}
`;

const MethodContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  position: relative;
  transition: 0.5s all ease;
  ${tabletBig({ gap: "30px" })}
  &:hover ${Temp} {
    display: flex;
  }
  &:hover {
    transform: scale(1.05);
  }
`;

const Subtitle = styled.span`
  font-size: 3.5vmin;
  ${mobile({ fontSize: "5vmin" })}
`;
const ImageContainer = styled.div`
  overflow: hidden;
`;
const Image = styled.img`
  height: 30vh;
  object-fit: cover;
  aspect-ratio: 4/3;
  ${mobile({ height: "50vw" })};
`;

const ALink = styled.a`
  text-decoration: none;
  background-color: teal;
  padding: 2px 10px;
  color: white;
  border-radius: 10px;
  letter-spacing: 1px;
  font-size: 4vmin;
  height: max-content;
`;

const CircleRight = styled.div`
  position: absolute;
  top: -30%;
  right: -10%;
  z-index: -1;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background-color: rgba(159, 245, 125, 0.8);
  ${tabletBig({ top: "-10%" })}
  ${mobile({ height: "250px", width: "250px" })}
`;

const CircleLeft = styled.div`
  position: absolute;
  bottom: -30%;
  left: -10%;
  z-index: -1;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background-color: rgba(186, 138, 240, 0.8);
  ${tabletBig({ bottom: "-10%" })}
  ${mobile({ height: "250px", width: "250px" })}
`;

const LinePay = () => {
  const { state } = useLocation();

  return (
    <Container>
      {state ? (
        <ContentContainer>
          <Helmet>
            <title>{`LINE Pay付款 | 墊一店`}</title>
            <meta name="description" content="前往LINE Pay付款連結。"></meta>
          </Helmet>
          <CircleRight />
          <CircleLeft />
          <Title>LINE Pay 點選下方按鈕前往結帳</Title>
          <LinkContainer>
            <MethodContainer>
              <Subtitle>用網頁開啟</Subtitle>
              <ImageContainer>
                <Image
                  alt="網頁"
                  src="https://res.cloudinary.com/dh2splieo/image/upload/v1643386013/shop_website/imgs/undraw_site_stats_re_ejgy_txeybk.svg"
                />
              </ImageContainer>
              <ALink href={state.web}>網頁版</ALink>
            </MethodContainer>
            <MethodContainer>
              <Temp>測試版目前無法使用</Temp>
              <Subtitle>用App開啟</Subtitle>
              <ImageContainer>
                <Image
                  alt="App"
                  src="https://res.cloudinary.com/dh2splieo/image/upload/v1643386020/shop_website/imgs/undraw_mobile_pay_re_sjb8_cvefzh.svg"
                />
              </ImageContainer>
              <ALink href={state.app}>App版</ALink>
            </MethodContainer>
          </LinkContainer>
        </ContentContainer>
      ) : (
        <NotFound content="page" />
      )}
    </Container>
  );
};

export default LinePay;
