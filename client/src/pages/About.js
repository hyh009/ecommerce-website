import styled from "styled-components";
import { categories } from "../data";
import { Video, CategoryInfo } from "../components";
import { mobile, tabletBig } from "../responsive";
import { Helmet } from "react-helmet";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SubTitle = styled.h2`
  padding: 25px 0px 10px 25px;
  font-weight: 100;
  width: 100%;
  align-self: left;
  font-size: 5vmin;
`;

const Hr = styled.hr`
  height: 2px;
  background-color: #eee;
  width: calc(100% - 40px);
  margin-bottom: 10px;
  border: none;
`;
const Session = styled.div`
  display: flex;
  height: 70vh;
  ${tabletBig({ height: "40vh" })}
  ${mobile({ height: "30vh" })}
`;

const AboutImg = styled.img`
  width: 100%;

  object-fit: cover;
  overflow: hidden;
  opacity: 0.8;
`;
const IntroContainer = styled.div`
  background-color: #fffeff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='%23d6d4d9' fill-opacity='0.18' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 1 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/svg%3E");
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  height: 70vh;
  gap: 40px;
  margin-bottom: 25px;
  ${tabletBig({ height: "60vh" })}
`;
const Title = styled.h2`
  font-size: 5vmin;
  text-align: center;
  letter-spacing: 5px;
  width: 100%;
`;
const Intro = styled.p`
  font-size: 3.5vmin;
  letter-spacing: 2px;
  line-height: 200%;
  text-align: center;
  width: 60%;
  ${tabletBig({ width: "80%" })}
`;

const SessionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  padding: 20px;
  gap: 20px;
  margin-bottom: 25px;
  ${tabletBig({ gridTemplateColumns: "repeat(1,1fr)", gap: "50px" })}
`;

const SmallImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
  height: 70vh;
  ${tabletBig({ height: "40vh" })}
`;
const SmallImg = styled.img`
  height: 50%;
  ${mobile({ height: "40%" })}
`;

const ImgTitle = styled.span`
  font-size: 4vmin;
  ${mobile({ fontSize: "5vmin" })}
`;
const ImgText = styled.span`
  font-size: 3vmin;
  width: 80%;
  line-height: 150%;
  text-align: center;
  ${tabletBig({ width: "60%" })}
  ${mobile({ fontSize: "4vmin" })}
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  padding: 20px;
  gap: 5px;
  ${tabletBig({ gridTemplateColumns: "repeat(3, 1fr)" })}
  margin-bottom:25px;
`;

const About = () => {
  return (
    <Container>
      <Helmet>
        <title>關於我們 | 墊一店</title>
        <meta
          name="description"
          content="我們是來自台灣的液態矽膠製造專家 -
          墊一店。我們擁有30年世界級液態矽膠射出設備的製造經驗，我們所設計出的產品，90%以上為液態矽膠製成。希望透過安全環保又獨特的液態矽膠商品，
          照顧你的生活，照顧環境，讓我們擁有更好的每一天。"
        ></meta>
      </Helmet>
      <Session>
        <AboutImg src="https://res.cloudinary.com/dh2splieo/image/upload/v1640706197/shop_website/imgs/cover/cover2_kqrkda.jpg" />
      </Session>
      <IntroContainer>
        <Title>我們是來自台灣的液態矽膠製造專家 - 墊一店</Title>
        <Intro>
          我們擁有30年世界級液態矽膠射出設備的製造經驗，我們所設計出的產品，90%以上為液態矽膠製成。希望透過安全環保又獨特的液態矽膠商品，
          照顧你的生活，照顧環境，讓我們擁有更好的每一天。
        </Intro>
      </IntroContainer>

      <SubTitle>為何我們選用液態矽膠？</SubTitle>
      <Hr />
      <SessionGrid>
        <SmallImgContainer>
          <ImgTitle>無毒無味</ImgTitle>
          <SmallImg src="https://res.cloudinary.com/dh2splieo/image/upload/v1640854028/shop_website/imgs/undraw_nature_m5ll_pbckis.svg" />
          <ImgText>
            普遍使用於嬰兒奶嘴及醫療用品，沒有濃烈的化學氣味，不含塑化劑重金屬，耐酸耐鹼耐高低溫。
          </ImgText>
        </SmallImgContainer>
        <SmallImgContainer>
          <ImgTitle>環保安全</ImgTitle>
          <SmallImg src="https://res.cloudinary.com/dh2splieo/image/upload/v1640854890/shop_website/imgs/undraw_wind_turbine_x-2-k4_x7v6kv.svg" />
          <ImgText>
            柔軟富彈性，能任意凹折耐啃咬，使用不怕受傷，商品壽命結束後可再次回收。
          </ImgText>
        </SmallImgContainer>
        <SmallImgContainer>
          <ImgTitle>清洗方便</ImgTitle>
          <SmallImg src="https://res.cloudinary.com/dh2splieo/image/upload/v1640854432/shop_website/imgs/undraw_wash_hands_nwl2_epqjde.svg" />
          <ImgText>
            擁有高彈性，清洗不變形，平常清水清洗，若殘留味道用小蘇打水浸泡或熱水煮即可消除。
          </ImgText>
        </SmallImgContainer>
      </SessionGrid>
      <SubTitle>主要產品</SubTitle>
      <Hr />
      <CategoryGrid>
        {categories.map((item) => (
          <CategoryInfo key={item.id} item={item} />
        ))}
      </CategoryGrid>
      <SubTitle>相關影片</SubTitle>
      <Hr />
      <Video />
    </Container>
  );
};

export default About;
