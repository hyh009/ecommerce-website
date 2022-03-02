import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { mobile, tabletBig } from "../responsive";
import ReCAPTCHA from "react-google-recaptcha";
import { reCaptcha, axiosInstance } from "../services/config";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Title = styled.h1`
  padding: 20px;
  font-weight: 400;
  font-size: 5vmin;
`;

const Bottom = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  width: 100%;
  gap: 20px;
  ${tabletBig({ gridTemplateColumns: "repeat(1,minmax(0, 1fr))" })}
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  max-width: 100%;
  width: 100%;
  ${mobile({ padding: "10px" })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  height: 100%;
`;
const Input = styled.input`
  padding: 5px 2px;
  border: none;
  border-bottom: 1px solid gray;
  ${tabletBig({ fontSize: "3vmin" })}
  ${mobile({ fontSize: "4vmin" })}
`;

const Select = styled.select`
  padding: 5px 2px;
  border: none;
  border-bottom: 1px solid gray;
  background-color: white;
  ${tabletBig({ fontSize: "3vmin" })}
  ${mobile({ fontSize: "4vmin" })}
`;

const TextArea = styled.textarea`
  border: 1px solid gray;
  border-radius: 5px;
  padding: 2px;
  ${tabletBig({ fontSize: "3vmin" })}
  ${mobile({ fontSize: "4vmin" })}
`;
const Submit = styled.button`
  cursor: pointer;
  background-color: teal;
  border: none;
  color: white;
  border-radius: 5px;
  padding: 5px 0;
  ${tabletBig({ fontSize: "3vmin" })}
  ${mobile({ fontSize: "4vmin" })}
`;
const Error = styled.span`
  font-size: 2.5vmin;
  color: red;
  background-color: lightpink;
  padding: 2px;
  ${tabletBig({ fontSize: "3vmin" })}
  ${mobile({ fontSize: "4vmin" })}
`;

const Text = styled.span`
  font-size: 3vmin;
  padding: 0 20px;
  letter-spacing: 1px;
  ${tabletBig({ padding: "0 30px" })}
  ${mobile({ padding: "0 20px", fontSize: "4vmin" })}
`;

const MapContainer = styled.div`
  flex: 1;
`;

const Card = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  gap: 20px;
  max-width: 100%;
  background-color: rgba(238, 238, 238, 0.5);
  ${tabletBig({ flexDirection: "column-reverse" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const IconContaniner = styled.div`
  display: flex;
  justify-content: space-around;
`;
const ReCAPTCHAContainer = styled.div`
  margin: 10px 0;
  ${mobile({ transform: "scale(0.77)", transformOrigin: "0 0" })};
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
`;

const Contact = () => {
  const [token, setToken] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const recaptchaRef = useRef(null);
  // use hook form for validation
  const {
    register,
    reset,
    formState: { errors },
  } = useForm();

  // error message only show 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCaptchaError("");
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [captchaError]);

  const handleSubmit = async (e) => {
    setIsFetching(true);
    e.preventDefault();
    if (!token) {
      setIsFetching(false);
      return setCaptchaError("請勾選我不是機器人");
    }
    try {
      const res = await axiosInstance.post("/recaptcha", { captcha: token });
      if (res.data === true) {
        await emailjs.sendForm(
          "service_wpqgqx7",
          "template_c0gls7u",
          e.target,
          "user_8DfhmetmZJgRGMgzYl8Pe"
        );
        reset();
        recaptchaRef.current.reset();
        setIsFetching(false);
        return window.alert("感謝您的填寫，我們會盡快回覆您的訊息。");
      } else if (res.data === false) {
        recaptchaRef.current.reset();
        setIsFetching(false);
        return window.alert("機器人驗證未通過，請重新勾選我不是機器人");
      }
    } catch (err) {
      console.log(err);
      return window.alert("發生錯誤，請稍候再試。");
    }
  };

  return (
    <Container>
      <Helmet>
        <title>{`聯繫我們 | 墊一店`}</title>
        <meta name="description" content="填寫表單資訊聯繫我們。"></meta>
      </Helmet>
      <Title>聯繫我們</Title>
      <Text>
        有想詢問我們的事嗎？請填寫下方表單並提交，我們會將會透過Email跟您聯繫。
      </Text>
      <Bottom>
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            {errors.name && <Error>{errors.name.message}</Error>}
            <Input
              {...register("name", {
                required: "請填入姓名",
                maxLength: { value: 20, message: "姓名不能超過20字" },
                minLength: { value: 2, message: "姓名必須大於2個字" },
              })}
              type="text"
              placeholder="請輸入姓名"
              name="name"
            />
            {errors.email && <Error>{errors.email.message}</Error>}
            <Input
              type="email"
              placeholder="請輸入聯絡Email"
              name="email"
              {...register("email", {
                required: "請填入電子郵件",
              })}
            />
            {errors.subject && <Error>{errors.subject.message}</Error>}
            <Select
              name="subject"
              {...register("subject", {
                required: "請選擇訊息主旨",
              })}
            >
              <option value="">訊息主旨</option>
              <option>產品詢問</option>
              <option>購買產品</option>
              <option>合作洽談</option>
              <option>其它</option>
            </Select>
            {errors.message && <Error>{errors.message.message}</Error>}
            <TextArea
              rows="4"
              cols="50"
              placeholder="請輸入給我們的訊息"
              name="message"
              {...register("message", {
                required: "請輸入訊息內容",
              })}
            ></TextArea>
            <ReCAPTCHAContainer>
              <ReCAPTCHA
                sitekey={reCaptcha.key}
                onChange={(token) => setToken(token)}
                onExpired={() => setToken("")}
                ref={recaptchaRef}
              />
            </ReCAPTCHAContainer>
            {captchaError && <Error>{captchaError}</Error>}
            <Submit type="submit" disabled={isFetching}>
              確定提交
            </Submit>
          </Form>
        </FormContainer>
        <Card>
          <InfoContainer>
            <TextContainer>
              <Text>地址：33552桃園市大溪區月湖路128號2F</Text>
              <Text>電話：03 388 5688</Text>
              <Text>Email：info@pad-pad.com</Text>
            </TextContainer>
            <IconContaniner>
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
            </IconContaniner>
          </InfoContainer>
          <MapContainer>
            <iframe
              title="墊一店位置"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3619.2419265821673!2d121.2877846!3d24.8897282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468183d2e30c5a3%3A0xbebe3263ff84f24b!2zMzM1LCBUYW95dWFuIENpdHksIERheGkgRGlzdHJpY3QsIOaciOa5lui3rzEyOOiZnw!5e0!3m2!1sen!2stw!4v1643314926097!5m2!1sen!2stw"
              width="100%"
              loading="lazy"
              style={{ border: "none", aspectRatio: "1/1" }}
            ></iframe>
          </MapContainer>
        </Card>
      </Bottom>
    </Container>
  );
};

export default Contact;
