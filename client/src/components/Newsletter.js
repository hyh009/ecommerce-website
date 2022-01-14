import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import { mobile, tabletBig } from "../responsive";
import { useState } from "react";
import MailService from "../services/mail.service";

const Container = styled.div`
  height: 50vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 0;
  align-items: center;
  background-color: #faf6b9;
  ${mobile({ padding: "0", height: "auto" })}
  ${tabletBig({ padding: "50px", height: "auto" })}
`;

const Title = styled.h3`
  font-size: 1.75rem;
  letter-spacing: 8px;
  font-weight: 800;
  ${mobile({ padding: "15px", fontSize: "1.5rem" })}
`;
const Description = styled.p`
  font-size: 20px;
  margin: 20px;
  font-weight: 550;
  ${mobile({ fontSize: "14px", textAlign: "center" })}
`;
const InputContainer = styled.form`
  background-color: white;
  height: 40px;
  width: 40%;
  display: flex;
  justify-content: center;
  border: 1px solid lightgrey;
  ${mobile({ width: "auto", margin: "10px" })}
`;
const Input = styled.input`
  flex: 8;
  border: none;
  padding: 2px 5px;
  ${mobile({ padding: "2px" })}
`;
const Button = styled.button`
  border: none;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffa122;
  transition: all 0.5s ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const Newsletter = () => {
  const [email, setEmail] = useState("");
  // check if email is valid by regex
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (validateEmail(email)) {
      try {
        await MailService.signup(email);
        window.alert("成功訂閱電子報");
        setEmail("");
      } catch (err) {
        window.alert(err.response.data);
        setEmail("");
      }
    } else {
      console.log("not");
      return window.alert("請輸入正確email");
    }
  };

  return (
    <Container>
      <Title>訂閱電子報</Title>
      <Description>
        訂閱我們的電子報，優先掌握最新商品及促銷活動資訊。
      </Description>
      <InputContainer onSubmit={handleSubscribe}>
        <Input
          type="email"
          placeholder="請輸入Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit">
          <SendIcon style={{ fontSize: 32 }} />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
