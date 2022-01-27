import styled from "styled-components";
import { tabletBig, tablet, mobile } from "../responsive";
import { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(122, 122, 122, 0.5)
    ),
    url("https://res.cloudinary.com/dh2splieo/image/upload/v1640706201/shop_website/imgs/cover/cover4_rgq8mt.jpg");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  background-position-y: 50%;
  ${tabletBig({ backgroundPosition: "center" })}
`;
const Wrapper = styled.div`
  width: 50%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.4);
  ${tabletBig({ width: "90%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 1px;
  text-align: center;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ${tablet({ flexDirection: "column", alignItems: "center" })}
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  background: rgba(255, 255, 255, 0.6);
  border: none;
  margin: 5px 10px;
  padding: 8px 5px;
  ${tablet({ width: "95%", fontSize: "20px", margin: "8px 5px" })}
  ${mobile({ width: "95%", fontSize: "18px", margin: "5px 0" })}
`;
const Select = styled.select`
  flex: 1;
  min-width: 40%;
  background: rgba(255, 255, 255, 0.6);
  border: none;
  margin: 5px 10px;
  padding: 8px 5px;
  cursor: pointer;
  ${tablet({ width: "95%", fontSize: "20px", margin: "8px 5px" })}
  ${mobile({ width: "95%", fontSize: "18px", margin: "5px 0" })}
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 10px;
`;
const Button = styled.div`
  width: 30%;
  border: none;
  padding: 5px;
  cursor: pointer;
  background: #ffa211;
  text-align: center;
`;

const Error = styled.div`
  color: #545454;
  font-size: 14px;
  color: red;
  letter-spacing: 2px;
  padding: 5px;
  width: 95%;
`;

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const handleInput = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await AuthService.register(input);
      window.alert(`註冊成功，將導向登入頁面。`);
      navigate("/login");
    } catch (err) {
      setErrorMessage(err.response.data);
    }
  };
  return (
    <Container>
      <Helmet>
        <title>註冊用戶 | 墊一店</title>
        <meta
          name="description"
          content="註冊成為墊一店用戶，購買液態矽膠產品。"
        ></meta>
      </Helmet>
      <Wrapper>
        <Title>註冊成為會員</Title>

        <Form>
          {errorMessage && <Error>{errorMessage}</Error>}
          <Input name="name" placeholder="姓名" onChange={handleInput} />
          <Select name="gender" placeholder="性別" onChange={handleInput}>
            <option value="男">男</option>
            <option value="女">女</option>
            <option value="其他">其他</option>
          </Select>
          <Input
            name="username"
            placeholder="用戶名稱"
            onChange={handleInput}
          />
          <Input name="email" placeholder="Email" onChange={handleInput} />
          <Input
            name="password"
            type="password"
            placeholder="密碼"
            onChange={handleInput}
          />
          <Input
            name="passwordConfirmation"
            type="password"
            placeholder="確認密碼"
            onChange={handleInput}
          />
          <Agreement>
            按下註冊鈕的同時，表示您已詳閱我們的資料使用政策與使用條款，同意使用
            墊一店 所提供的服務並訂閱電子報。
          </Agreement>
          <Button onClick={handleRegister}>註冊</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
