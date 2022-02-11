import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
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
import { tabletBig, mobile } from "../responsive";

const Container = styled.div`
  grid-column: 2/6;
  padding: 20px;
  position: relative;
  ${tabletBig({
    minHeight: "calc(100vh - 80px)",
    gridColumn: "1/2",
    marginTop: "10px",
  })}
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PageTitle = styled.h3`
  font-size: 22px;
  letter-spacing: 2px;
  color: black;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  ${tabletBig({
    flexDirection: "column",
  })}
`;
const InfoContainer = styled.div`
  flex: 1;
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  padding: 20px;
  border-radius: 5px;
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
  filter: drop-shadow(0 0 2px gray);
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
const EditWrapper = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column", gap: "20px" })}
`;
const EditArea = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
  width: 90%;
  ${mobile({ width: "100%" })}
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
  &:focus {
    border: none;
  }
`;

const Select = styled.select`
  padding: 2px;
  border: none;
  border-bottom: 1px solid gray;
  &:focus {
    border: none;
  }
`;
const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${mobile({ gap: "20px" })}
`;
const UpdatePicContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  filter: drop-shadow(0 0 2px gray);
`;

const UpdateButton = styled.button`
  border: none;
  background-color: teal;
  color: white;
  width: 40%;
  padding: 7px 0;
  border-radius: 10px;
  box-shadow: 1px 5px 0 lightgray;
  cursor: pointer;
  letter-spacing: 2px;
  &:active {
    box-shadow: 3px 5px 0 white;
    transform: translateY(5px);
    border: none;
  }
  &:focus {
    border: none;
  }
`;
const Error = styled.span`
  font-size: 2.5vmin;
  color: red;
  background-color: lightpink;
  padding: 2px;
  width: max-content;
`;

const CreateLink = styled(Link)`
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  letter-spacing: 2px;
  color: white;
  background-color: teal;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
  text-decoration: none;
  font-size: 2.5vmin;
  ${tabletBig({ marginTop: "10px" })}
  ${mobile({ fontSize: "3vmin" })}
`;
const AdminUser = () => {
  const [editUser, setEditUser] = useState({});
  const [inputs, setInputs] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [uploadImage, setUploadImage] = useState(null);
  const accessToken = useSelector((state) => state.user.accessToken);
  const { pathname } = useLocation();
  const userId = pathname.split("/")[3];

  useEffect(() => {
    // get edit user info when page load
    const getUserData = async () => {
      try {
        const res = await UserService.get(userId, accessToken);
        setEditUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    //clear error message after 5 seconds
    let timer = setTimeout(() => setUpdateError(""), 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [updateError]);

  const handlePreview = (e) => {
    const acceptFileTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (!acceptFileTypes.includes(e.target.files[0].type)) {
      return window.alert("不支援此檔案格式。(可上傳.png .jpg .jepg檔)");
    }
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener("loadend", () => {
      const fileSize = (e.target.files[0].size / (1024 * 1024)).toFixed(4);

      if (fileSize > 10) {
        return window.alert("照片不能超過100mb");
        //or resize image
      } else {
        setUploadImage({
          name: e.target.files[0].name,
          type: e.target.files[0].type,
          size: e.target.files[0].size,
          src: reader.result,
        });
      }
    });
  };

  const handleUploadPic = async () => {
    try {
      const res = await UserService.uploadImage(
        uploadImage.src,
        editUser._id,
        accessToken
      );
      return res.data;
    } catch (err) {
      window.alert("照片上傳失敗，請稍後再試");
      console.log(err);
    }
  };

  const onSubmit = async () => {
    setIsFetching(true);
    let imgUrl = editUser.img;
    try {
      if (uploadImage) {
        imgUrl = await handleUploadPic();
      }
      const updatedUser = await UserService.patch(
        { _id: editUser._id, ...inputs, img: imgUrl },
        accessToken
      );
      setEditUser(updatedUser.data);
      window.alert("用戶資訊更新成功");
      window.scrollTo(0, 0);
      setIsFetching(false);
      setUploadImage(null);
    } catch (err) {
      console.log(err);

      if (err.response?.data) {
        setUpdateError(err.response.data);
      } else {
        setUpdateError("資訊尚未更新，請稍後再試");
      }
      setIsFetching(false);
      setUploadImage(null);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Container>
      <TopContainer>
        <PageTitle>編輯用戶</PageTitle>
        <CreateLink to="/admin/users">回用戶列表</CreateLink>
      </TopContainer>
      <Wrapper>
        <InfoContainer>
          <UserInfo>
            <Header>
              <UserImg src={editUser.img} />
              <Detail>
                <UserName>{editUser.username}</UserName>
                <CreatedDate>
                  加入日期：{editUser.createdAt?.split("T")[0]}
                </CreatedDate>
              </Detail>
            </Header>
            <Subtitle>用戶資訊</Subtitle>
            <ListItem>
              <Person />
              <Content>{editUser.name}</Content>
            </ListItem>
            <ListItem>
              <Android />
              <Content>{editUser.gender}</Content>
            </ListItem>
            <Subtitle>聯絡資訊</Subtitle>
            <ListItem>
              <Mail />
              <Content>{editUser.email}</Content>
            </ListItem>
            <ListItem>
              <PhoneAndroid />
              <Content>{editUser.phone || "未填寫"}</Content>
            </ListItem>
            <ListItem>
              <LocationOn />
              <Content>{editUser.address || "未填寫"}</Content>
            </ListItem>
          </UserInfo>
        </InfoContainer>
        <EditContainer>
          <EditTitle>編輯</EditTitle>
          <EditWrapper>
            <EditArea>
              {updateError && <Error>{updateError}</Error>}
              <InputContainer>
                <Label htmlFor="username">用戶名稱</Label>
                <Input
                  name="username"
                  id="username"
                  placeholder="輸入用戶名稱"
                  defaultValue={editUser.username}
                  onChange={handleChange}
                />
              </InputContainer>
              <InputContainer>
                <Label htmlFor="name">姓名</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="輸入姓名"
                  defaultValue={editUser.name}
                  onChange={handleChange}
                />
              </InputContainer>
              <InputContainer>
                <Label htmlFor="email">電子信箱</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="輸入電子信箱"
                  defaultValue={editUser.email}
                  onChange={handleChange}
                  type="email"
                />
              </InputContainer>
              <InputContainer>
                <Label htmlFor="gender">性別</Label>
                <Select
                  name="gender"
                  defaultValue={editUser.gender}
                  onChange={handleChange}
                >
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
                  placeholder="輸入電話"
                  defaultValue={editUser.phone || "未填寫"}
                  onChange={handleChange}
                />
              </InputContainer>
              <InputContainer>
                <Label htmlFor="address">地址</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="輸入地址"
                  defaultValue={editUser.address || "未填寫"}
                  onChange={handleChange}
                />
              </InputContainer>
            </EditArea>

            <RightContainer>
              <UpdatePicContainer>
                <ProfileImg
                  src={uploadImage?.src || editUser.img}
                  alt="用戶圖片"
                />
                <Label htmlFor="photo">
                  <Upload />
                  <input
                    type="file"
                    name="photo"
                    id="photo"
                    onChange={handlePreview}
                    style={{ display: "none" }}
                  />
                </Label>
              </UpdatePicContainer>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  marginBottom: "20px",
                }}
              >
                <UpdateButton type="reset">捨棄更新</UpdateButton>
                <UpdateButton type="submit" onClick={onSubmit}>
                  {isFetching ? "更新中" : "確定更新"}
                </UpdateButton>
              </div>
            </RightContainer>
          </EditWrapper>
        </EditContainer>
      </Wrapper>
    </Container>
  );
};

export default AdminUser;
