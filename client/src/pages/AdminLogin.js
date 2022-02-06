import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCall";
import { PersonOutline, LockOutlined } from "@mui/icons-material";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;
const Image = styled.img`
  position: absolute;
  bottom: 10%;
  left: 5%;
  z-index: -1;
  width: 45%;
`;

const Circle = styled.div`
  width: 200%;
  height: 200vw;
  background-color: navy;
  position: absolute;
  bottom: -70%;
  left: -130%;
  z-index: -2;
  border-radius: 50%;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 50px;
`;
const Logo = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  margin: 0 10px;
`;

const Title = styled.h1`
  font-size: 3rem;
  letter-spacing: 10px;
  color: white;
  font-weight: bold;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50vh;
  width: 30%;
  align-self: flex-end;
  margin-right: 50px;
  padding: 20px;
`;

const Desc = styled.h3`
  margin-bottom: 10px;
  letter-spacing: 2px;
  font-size: 1.75rem;
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  border-radius: 15px;
  background-color: #eee;
  padding: 5px;
  width: 90%;
  svg {
    font-size: 20px;
    margin: 0 5px;
    path {
      color: lightgray;
    }
  }
`;
const Input = styled.input`
  font-size: 18px;
  padding: 2px;
  border: none;
  width: 95%;
  background-color: inherit;
  letter-spacing: 1px;
`;
const Button = styled.button`
  margin-top: 20px;
  border: none;
  background-color: navy;
  color: white;
  padding: 5px 0;
  width: 30%;
  border-radius: 15px;
  cursor: pointer;
  letter-spacing: 2px;
  transition: 0.5s;
  font-size: 18px;

  &:hover {
    background-color: blue;
  }
`;

const Error = styled.div`
  background-color: pink;
  color: #545454;
  width: 100%;
  border-radius: 10px;
  font-size: 14px;
  color: red;
  letter-spacing: 2px;
  padding: 5px;
  width: 90%;
`;

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error, errMessage } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
    !isFetching && !error && window.confirm("登入成功，將導入管理頁面");
  };
  return (
    <Container>
      <Image src="https://res.cloudinary.com/dh2splieo/image/upload/v1643913568/shop_website/imgs/summer_k5oj6a.svg" />
      <Circle />
      <Header>
        <Logo src="https://res.cloudinary.com/dh2splieo/image/upload/v1640706201/shop_website/imgs/logo/pad_logo_wkibae.png" />
        <Title>ADMIN PLATFORM</Title>
      </Header>
      <Form>
        <Desc>Sing in</Desc>
        {error && <Error>{errMessage ? errMessage : "發生錯誤！"}</Error>}
        <InputContainer>
          <PersonOutline style={{ color: "lightgray" }} />
          <Input
            type="text"
            placeholder="請輸入email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <LockOutlined style={{ color: "lightgray" }} />
          <Input
            type="password"
            placeholder="請輸入密碼"
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputContainer>
        <Button onClick={handleClick} disabled={isFetching}>
          登入
        </Button>
      </Form>
    </Container>
  );
};

export default AdminLogin;
