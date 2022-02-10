import { useState, useEffect } from "react";
import styled from "styled-components";
import AuthService from "../services/auth.service";
import { tabletBig, mobile } from "../responsive";

const Container = styled.div`
  padding: 20px;
  grid-column: 2/6;
  display: flex;
  flex-direction: column;
  gap: 20px;
  ${tabletBig({
    minHeight: "calc(100vh - 80px)",
    gridColumn: "1/2",
    marginTop: "10px",
  })}
`;
const PageTitle = styled.h3`
  font-size: 22px;
  letter-spacing: 2px;
  color: black;
`;

const UserInfo = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  ${mobile({
    gridTemplateColumns: "repeat(1,1fr)",
    gap: "5px",
  })}
`;

const InputContainer = styled.div`
  display: flex;
  margin: 5px 0;
  flex-direction: column;
`;
const Label = styled.label`
  font-size: 14px;
  padding-bottom: 10px;
`;
const Input = styled.input`
  padding: 7px 5px;
  letter-spacing: 1px;
  border-radius: 5px;
  border: 1px solid gray;
`;

const Select = styled.select`
  padding: 7px 5px;
  letter-spacing: 1px;
  border-radius: 5px;
  border: 1px solid gray;
  background-color: white;
`;

const CreateButton = styled.button`
  border: none;
  padding: 5px;
  width: 15vw;
  border-radius: 10px;
  letter-spacing: 2px;
  color: white;
  background-color: teal;
  cursor: pointer;
  align-self: flex-end;
  box-shadow: 1px 5px 0 lightgray;
  &:active {
    box-shadow: 3px 5px 0 white;
    transform: translateY(5px);
  }
  ${mobile({
    width: "100%",
  })}
`;
const Error = styled.span`
  font-size: 2.5vmin;
  color: red;
  background-color: lightpink;
  padding: 2px;
  width: max-content;
`;
const AdminNewUser = () => {
  const [inputs, setInputs] = useState({});
  const [registerError, setRegisterError] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    //clear error message after 5 seconds
    let timer = setTimeout(() => setRegisterError(""), 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [registerError]);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFetching(true);
    try {
      await AuthService.register(inputs);
      setInputs({});
      setIsFetching(false);
      window.alert("成功新增用戶");
    } catch (err) {
      if (err.response?.data) {
        setRegisterError(err.response.data);
        setIsFetching(false);
      } else {
        setRegisterError("新增用戶失敗，請稍候再試");
        setIsFetching(false);
      }
      console.log(err);
    }
  };

  return (
    <Container>
      <PageTitle>新增用戶</PageTitle>
      {registerError && <Error>{registerError}</Error>}
      <UserInfo>
        <InputContainer>
          <Label htmlFor="username">用戶名稱</Label>
          <Input
            id="username"
            name="username"
            placeholder="輸入用戶名稱"
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="email">電子信箱</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="輸入電子信箱"
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="password">密碼</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="on"
            placeholder="輸入密碼"
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="passwordConfirmation">確認密碼</Label>
          <Input
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            autoComplete="on"
            placeholder="再次輸入密碼"
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="name">姓名</Label>
          <Input
            id="name"
            name="name"
            placeholder="輸入真實姓名"
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="gender">性別</Label>
          <Select name="gender" onChange={handleChange}>
            <option value="">請選擇性別</option>
            <option>男</option>
            <option>女</option>
            <option>其他</option>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="phone">電話</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="輸入聯絡電話"
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="address">地址</Label>
          <Input
            id="address"
            name="address"
            placeholder="輸入聯絡地址"
            onChange={handleChange}
          />
        </InputContainer>
      </UserInfo>
      <CreateButton disabled={isFetching} onClick={handleSubmit}>
        {isFetching ? "正在新增" : "新增用戶"}
      </CreateButton>
    </Container>
  );
};

export default AdminNewUser;
