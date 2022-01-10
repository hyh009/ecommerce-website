import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  background: ${(props) => props.background};
  ${mobile({ flexDirection: "column", padding: "0" })};
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  ${mobile({ alignItems: "center", textAlign: "center" })}
`;

const Logo = styled.h3`
  font-weight: 600;
  font-size: 24px;
  font-weight: 500;
  text-shadow: 2px 2px lightgray;
`;

const Description = styled.p`
  margin: 20px 0;
  font-weight: 300;
  line-height: 30px;
`;

const SocialContainer = styled.div`
  display: flex;
`;
const SocailIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  cursor: pointer;
  ${mobile({ width: "50px", height: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  justify-content: flex-start;
  align-items: center;
  ${tablet({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 10px;
  font-weight: 400;
`;

const List = styled.ul`
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const CustomLink = styled(Link)`
  width: 100%;
  text-decoration: none;
`;
const ListItem = styled.li`
  width: 100%;
  margin: 5px 0;
  color: black;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  ${mobile({
    backgroundColor: "rgba(230,230,230,0.9)",
    width: "100%",
    padding: "10px",
  })}
`;

const ContactItem = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const Footer = ({ background }) => {
  return (
    <Container background={background}>
      <Left>
        <Logo>墊一店奇想國際有限公司</Logo>
        <Description>
          本網站為練習用網站，資訊來源自網路。
          <br />
        </Description>
        <SocialContainer>
          <a href="https://www.facebook.com/padpadlife/">
            <SocailIcon color="3B5999">
              <FacebookIcon />
            </SocailIcon>
          </a>
          <a href="https://www.instagram.com/padpadlife/">
            <SocailIcon color="E4405F">
              <InstagramIcon />
            </SocailIcon>
          </a>
          <a href="https://www.youtube.com/channel/UCOxa4vGiO0bDKqsMxSE0p3g">
            <SocailIcon color="E4405F">
              <YouTubeIcon color="c4302b" />
            </SocailIcon>
          </a>
        </SocialContainer>
      </Left>
      <Center>
        <Title>商品分類</Title>
        <List>
          <CustomLink to="/products/隨你PAD吸管">
            <ListItem>隨你PAD吸管</ListItem>
          </CustomLink>
          <CustomLink to="/products/無痕窗貼">
            <ListItem>無痕窗貼</ListItem>
          </CustomLink>
          <CustomLink to="/products/蜂巢坐靠墊">
            <ListItem>蜂巢坐靠墊</ListItem>
          </CustomLink>
          <CustomLink to="/products/矽膠小餐墊">
            <ListItem>矽膠小餐墊</ListItem>
          </CustomLink>
          <CustomLink to="/products/不倒翁門擋">
            <ListItem>不倒翁門擋</ListItem>
          </CustomLink>
          <CustomLink to="/products/其它">
            <ListItem>其它商品</ListItem>
          </CustomLink>
        </List>
      </Center>
      <Right>
        <Title>聯絡我們</Title>
        <ContactItem>
          <IconContainer>
            <LocationOnIcon />
          </IconContainer>
          <a
            style={{ textDecoration: "none", color: "black" }}
            href="https://goo.gl/maps/amjBrcRhGJHZHctA9"
            target="_blank"
          >
            33552桃園市大溪區月湖路128號2F
          </a>
        </ContactItem>
        <ContactItem>
          <IconContainer>
            <PhoneIcon />
          </IconContainer>
          03 388 5688
        </ContactItem>
        <ContactItem>
          <IconContainer>
            <EmailIcon />
          </IconContainer>
          info@pad-pad.com
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
