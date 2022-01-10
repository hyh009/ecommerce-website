import React from "react";
import { tabletBig, mobile } from "../responsive";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import UserInfo from "../components/UserInfo";
import { useForm } from "react-hook-form";
import {
  Android,
  Mail,
  Person,
  PhoneAndroid,
  LocationOn,
  Edit,
} from "@mui/icons-material";

const Container = styled.div`
  grid-column: 2/6;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  ${tabletBig({ gridColumn: "1/2", gridTemplateColumns: "repeat(1,1fr)" })}
`;

const EditContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`;
const EditInfoContainer = styled.form`
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  border-radius: 5px;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  border-bottom: 2px dashed lightgray;
  padding: 10px 0;
  margin-bottom: 10px;
`;
const EditTitle = styled.span`
  letter-spacing: 2px;
  font-weight: bold;
`;
const Subtitle = styled.ul`
  color: gray;
  padding: 0;
  font-size: 14px;
  padding: 5px;
  letter-spacing: 2px;
  background-color: #fff9e8;
  border-radius: 5px;
  margin: 5px 0;
  color: black;
`;
const ListItem = styled.li`
  list-style-type: none;
  font-size: 14px;
  padding: 10px 0;
  display: grid;
  grid-template-columns: 1fr 4fr;
  align-items: center;
  letter-spacing: 1px;
  border-bottom: 1px dotted lightgray;
  gap: 5px;
  svg {
    font-size: 20px;
    path {
      color: black;
    }
  }
`;
const Label = styled.label`
  width: 100%;
`;
const Input = styled.input`
  border: none;
  padding: 5px 2px;
  width: 100%;
`;
const Error = styled.span`
  font-size: 2.5vmin;
  color: red;
  background-color: lightpink;
  padding: 2px;
`;
const Submit = styled.button`
  background-color: #ffa122;
  height: max-content;
  padding: 2px 5px;
  border: none;
  border-radius: 10px;
  letter-spacing: 2px;
  cursor: pointer;
  margin: 10px 0;
  align-self: flex-end;
`;
const ProfileEdit = () => {
  const user = useSelector((state) => state.user.currentUser);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (input) => {
    reset({
      username: user.username,
      name: user.name,
      gender: user.gender,
      email: user.email,
      phone: user.phone,
      address: user.address,
    });
  };

  return (
    <Container>
      <UserInfo user={user} edit={true} />
      <EditContainer>
        <EditInfoContainer onSubmit={handleSubmit(onSubmit)}>
          <Header>
            <EditTitle>編輯</EditTitle>
          </Header>
          <Subtitle>用戶資訊</Subtitle>
          {errors.username && <Error>{errors.username.message}</Error>}
          <ListItem>
            <Label>用戶名稱：</Label>
            <Input
              name="username"
              defaultValue={user.username}
              placeholder={user.username}
              {...register("username", {
                required: "請填入用戶名稱",
                maxLength: { value: 20, message: "用戶名稱不能超過20字" },
                minLength: { value: 2, message: "用戶名稱必須大於2個字" },
              })}
            />
          </ListItem>
          {errors.name && <Error>{errors.name.message}</Error>}
          <ListItem>
            <Label>姓名：</Label>
            <Input
              name="name"
              defaultValue={user.name}
              placeholder={user.name}
              {...register("name", {
                required: "請填入姓名",
                maxLength: { value: 20, message: "姓名不能超過20字" },
                minLength: { value: 2, message: "姓名必須大於2個字" },
              })}
            />
          </ListItem>
          {errors.gender && <Error>{errors.gender.message}</Error>}
          <ListItem>
            <Label>性別：</Label>
            <Input
              name="gender"
              defaultValue={user.gender}
              placeholder={user.gender}
              {...register("gender", {
                required: "請選澤性別",
              })}
            />
          </ListItem>
          <Subtitle>聯絡資訊</Subtitle>
          <ListItem>
            <Label>電話：</Label>
            <Input
              name="phone"
              defaultValue={user.phone || "未填寫"}
              placeholder={user.phone || "未填寫"}
              {...register("phone")}
            />
          </ListItem>
          {errors.email && <Error>{errors.email.message}</Error>}
          <ListItem>
            <Label>電子郵件：</Label>
            <Input
              name="email"
              defaultValue={user.email}
              placeholder={user.email}
              {...register("email", {
                required: "請填入電子郵件",
              })}
            />
          </ListItem>
          <ListItem>
            <Label>地址：</Label>
            <Input
              name="address"
              defaultValue={user.address || "未填寫"}
              placeholder={user.address || "未填寫"}
              {...register("address")}
            />
          </ListItem>
          <Submit type="submit">確定更改</Submit>
        </EditInfoContainer>
      </EditContainer>
    </Container>
  );
};

export default ProfileEdit;
