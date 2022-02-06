import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  Android,
  Mail,
  Person,
  PhoneAndroid,
  LocationOn,
  Upload,
} from "@mui/icons-material";
import UserService from "../services/user.service";
import { useSelector } from "react-redux";

const Container = styled.div`
  flex: 4;
  padding: 20px;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CreateButton = styled.button`
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  letter-spacing: 2px;
  color: white;
  background-color: teal;
  cursor: pointer;
`;

const PageTitle = styled.h3`
  font-size: 22px;
  letter-spacing: 2px;
  color: black;
`;

const Wrapper = styled.div`
  display: flex;
`;
const InfoContainer = styled.div`
  flex: 1;
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  padding: 20px;
  border-radius: 5px;
  margin-right: 10px;
`;

const UserInfo = styled.div``;
const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
const UserImg = styled.img`
  height: 35px;
  width: 35px;
  object-fit: cover;
  overflow: hidden;
  border-radius: 50%;
  margin: 0 10px;
`;
const UserName = styled.span`
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 16px;
`;
const CreatedDate = styled.span`
  color: gray;
  font-size: 14px;
`;
const Subtitle = styled.ul`
  color: gray;
  padding: 0;
  font-size: 14px;
  padding: 10px 0;
  letter-spacing: 1px;
`;
const ListItem = styled.li`
  list-style-type: none;
  font-size: 14px;
  padding: 10px 0;
  display: flex;
  align-items: center;
  letter-spacing: 1px;
  svg {
    font-size: 20px;
    path {
      color: black;
    }
  }
`;
const Content = styled.span`
  margin-left: 10px;
`;

const EditContainer = styled.div`
  flex: 2;
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  padding: 20px;
  border-radius: 5px;
`;

const EditTitle = styled.h4`
  letter-spacing: 2px;
  margin-bottom: 20px;
`;

const EditArea = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
  width: 70%;
`;
const Label = styled.label`
  font-size: 14px;
  padding-bottom: 5px;
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid gray;
  padding: 2px;
  letter-spacing: 1px;
`;

const Select = styled.select`
  padding: 2px;
  border: none;
  border-bottom: 1px solid gray;
`;
const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const UpdatePicContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-left: 15px;
    cursor: pointer;
  }
`;
const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  overflow: hidden;
  border-radius: 10px;
`;
const UpdateButton = styled.button`
  border: none;
  background-color: teal;
  color: white;
  width: 60%;
  padding: 7px 0;
  border-radius: 10px;
  box-shadow: 1px 5px 0 lightgray;
  cursor: pointer;
  letter-spacing: 2px;
  margin-bottom: 20px;
  &:active {
    box-shadow: 3px 5px 0 white;
    transform: translateY(5px);
  }
`;

const AdminUser = () => {
  const [user, setUser] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const accessToken = useSelector((state) => state.user.accessToken);
  const { pathname } = useLocation();
  const userId = pathname.split("/")[3];

  useEffect(() => {
    const getUserData = async () => {
      try {
        setIsFetching(true);
        const res = await UserService.get(userId, accessToken);
        setUser(res.data);
        setIsFetching(false);
      } catch (err) {
        setIsFetching(false);
        console.log(err);
      }
    };
    getUserData();
  }, []);
  return (
    <Container>
      <TopContainer>
        <PageTitle>編輯用戶</PageTitle>
        <Link to="/admin/users/newuser">
          <CreateButton>新增用戶</CreateButton>
        </Link>
      </TopContainer>
      <Wrapper>
        <InfoContainer>
          <UserInfo>
            <Header>
              <UserImg src={user.img} />
              <Detail>
                <UserName>{user.username}</UserName>
                <CreatedDate>
                  加入日期：{user.createdAt?.split("T")[0]}
                </CreatedDate>
              </Detail>
            </Header>
            <Subtitle>用戶資訊</Subtitle>
            <ListItem>
              <Person />
              <Content>{user.name}</Content>
            </ListItem>
            <ListItem>
              <Android />
              <Content>{user.gender}</Content>
            </ListItem>
            <Subtitle>聯絡資訊</Subtitle>
            <ListItem>
              <PhoneAndroid />
              <Content>{user.phone}</Content>
            </ListItem>
            <ListItem>
              <Mail />
              <Content>{user.email}</Content>
            </ListItem>
            <ListItem>
              <LocationOn />
              <Content>{user.address}</Content>
            </ListItem>
          </UserInfo>
        </InfoContainer>
        <EditContainer>
          <EditTitle>編輯</EditTitle>
          <Wrapper>
            <EditArea>
              <InputContainer>
                <Label for="username">用戶名稱</Label>
                <Input id="username" placeholder={user.username} />
              </InputContainer>
              <InputContainer>
                <Label for="fullname">姓名</Label>
                <Input id="fullname" placeholder={user.name} />
              </InputContainer>
              <InputContainer>
                <Label for="email">電子信箱</Label>
                <Input id="email" placeholder={user.email} />
              </InputContainer>
              <InputContainer>
                <Label for="gender">性別</Label>
                <Select defaultValue={user.gender}>
                  <option value="男">男</option>
                  <option value="女">女</option>
                  <option value="其他">其他</option>
                </Select>
              </InputContainer>
              <InputContainer>
                <Label for="phone">電話</Label>
                <Input id="phone" placeholder={user.phone} />
              </InputContainer>
              <InputContainer>
                <Label for="address">地址</Label>
                <Input id="address" placeholder={user.address} />
              </InputContainer>
            </EditArea>

            <RightContainer>
              <UpdatePicContainer>
                <ProfileImg src={user.img} />
                <Upload />
              </UpdatePicContainer>
              <UpdateButton>確定更新</UpdateButton>
            </RightContainer>
          </Wrapper>
        </EditContainer>
      </Wrapper>
    </Container>
  );
};

export default AdminUser;
