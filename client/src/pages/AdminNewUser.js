import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 0 50px;
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const PageTitle = styled.h3`
  font-size: 22px;
  letter-spacing: 2px;
  margin-bottom: 20px;
  color: black;
`;

const UserInfo = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const InputContainer = styled.div`
  display: flex;
  margin: 5px 20px 5px 0;
  flex-direction: column;
  width: 400px;
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
  padding: 5px 2px;
  border-radius: 5px;
  border: 1px solid gray;
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
  margin-top: 30px;
  box-shadow: 1px 5px 0 lightgray;
  &:active {
    box-shadow: 3px 5px 0 white;
    transform: translateY(5px);
  }
`;

const AdminNewUser = () => {
  return (
    <Container>
      <PageTitle>新增用戶</PageTitle>
      <UserInfo>
        <InputContainer>
          <Label for="username">用戶名稱</Label>
          <Input id="username" placeholder="輸入用戶名稱" />
        </InputContainer>
        <InputContainer>
          <Label for="email">電子信箱</Label>
          <Input id="email" type="email" placeholder="輸入電子信箱" />
        </InputContainer>
        <InputContainer>
          <Label for="password">密碼</Label>
          <Input
            id="password"
            type="password"
            autoComplete="off"
            placeholder="輸入密碼"
          />
        </InputContainer>
        <InputContainer>
          <Label for="passwordConfirmation">確認密碼</Label>
          <Input id="passwordConfirmation" placeholder="再次輸入密碼" />
        </InputContainer>
        <InputContainer>
          <Label for="name">姓名</Label>
          <Input id="name" placeholder="輸入真實姓名" />
        </InputContainer>
        <InputContainer>
          <Label for="gender">性別</Label>
          <Select>
            <option>請選擇性別</option>
            <option>男</option>
            <option>女</option>
            <option>其他</option>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label for="phone">電話</Label>
          <Input id="phone" placeholder="輸入聯絡電話" />
        </InputContainer>
        <InputContainer>
          <Label for="address">地址</Label>
          <Input id="address" placeholder="輸入聯絡地址" />
        </InputContainer>
        <CreateButton>新增用戶</CreateButton>
      </UserInfo>
    </Container>
  );
};

export default AdminNewUser;
