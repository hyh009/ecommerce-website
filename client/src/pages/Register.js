import styled from "styled-components";
import { tabletBig, tablet, mobile } from "../responsive";
import { useState, useRef } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import ReCAPTCHA from "react-google-recaptcha";
import { reCaptcha, axiosInstance } from "../services/config";

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
  font-size: 1.5rem;
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
  ${mobile({ alignItems: "flex-start" })};
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  background: rgba(255, 255, 255, 0.6);
  border: none;
  margin: 5px 10px;
  padding: 8px 5px;
  ${tablet({ width: "95%", fontSize: "1.25rem", margin: "8px 5px" })}
  ${mobile({ width: "100%", fontSize: "1.125rem", margin: "5px 0" })}
`;
const Select = styled.select`
  flex: 1;
  min-width: 40%;
  background: rgba(255, 255, 255, 0.6);
  border: none;
  margin: 5px 10px;
  padding: 8px 5px;
  cursor: pointer;
  ${tablet({ width: "95%", fontSize: "1.25rem", margin: "8px 5px" })}
  ${mobile({ width: "100%", fontSize: "1.125rem", margin: "5px 0" })}
`;

const Agreement = styled.span`
  font-size: 0.75rem;
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
const ReCAPTCHAContainer = styled.div`
  margin: 10px 0;

  ${mobile({ transform: "scale(0.77)", transformOrigin: "0 0" })};
`;
const Error = styled.div`
  color: #545454;
  font-size: 0.875rem;
  color: red;
  letter-spacing: 2px;
  padding: 5px;
  width: 95%;
`;

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");
  const recaptchaRef = useRef(null);

  const handleInput = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!token) {
        return setErrorMessage("???????????????????????????");
      }

      const res = await axiosInstance.post("/recaptcha", { captcha: token });
      if (res.data === true) {
        await AuthService.register(input);
        window.alert(`???????????????????????????????????????`);
        recaptchaRef.current.reset();
        return navigate("/login");
      } else if (res.data === false) {
        recaptchaRef.current.reset();
        return window.alert("????????????????????????????????????????????????????????????");
      }
    } catch (err) {
      setErrorMessage(err.response?.data);
    }
  };
  return (
    <Container>
      <Helmet>
        <title>???????????? | ?????????</title>
        <meta
          name="description"
          content="?????????????????????????????????????????????????????????"
        ></meta>
      </Helmet>
      <Wrapper>
        <Title>??????????????????</Title>

        <Form>
          {errorMessage && <Error>{errorMessage}</Error>}
          <Input name="name" placeholder="??????" onChange={handleInput} />
          <Select name="gender" placeholder="??????" onChange={handleInput}>
            <option value="???">???</option>
            <option value="???">???</option>
            <option value="??????">??????</option>
          </Select>
          <Input
            name="username"
            placeholder="????????????"
            onChange={handleInput}
          />
          <Input name="email" placeholder="Email" onChange={handleInput} />
          <Input
            name="password"
            type="password"
            placeholder="??????"
            onChange={handleInput}
          />
          <Input
            name="passwordConfirmation"
            type="password"
            placeholder="????????????"
            onChange={handleInput}
          />
          <ReCAPTCHAContainer>
            <ReCAPTCHA
              sitekey={reCaptcha.key}
              onChange={(token) => setToken(token)}
              onExpired={() => setToken("")}
              ref={recaptchaRef}
            />
          </ReCAPTCHAContainer>
          <Agreement>
            ??????????????????????????????????????????????????????????????????????????????????????????????????????
            ????????? ???????????????????????????????????????
          </Agreement>
          <Button onClick={handleRegister}>??????</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
