import React, { useState, useEffect, useRef } from "react";
import {
  Android,
  Mail,
  Person,
  PhoneAndroid,
  LocationOn,
  Edit,
} from "@mui/icons-material";
import styled from "styled-components";
import { tabletBig, mobile } from "../responsive";
import { updateUser } from "../redux/apiCall";
import { useDispatch, useSelector } from "react-redux";

const InfoContainer = styled.div`
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  padding: 20px;
  border-radius: 5px;
  margin-right: 10px;
  position: relative;
  margin: 10px;
  grid-column: ${(props) => (props.edit ? "" : "2/3")};
  ${tabletBig({ gridColumn: "1/2", gridRow: "1/2", marginTop: "50px" })}
`;
const ColorInput = styled.input`
  display: none;
  cursor: pointer;
`;
const CoverImg = styled.div`
  background-color: ${(props) => props.color || "#eee3d4"};
  background-image: url(${(props) => props.imgs});
  width: 100%;
  aspect-ratio: 5/1;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  ${mobile({ aspectRatio: "4/1" })}

  &:hover ${ColorInput} {
    display: ${(props) => (props.edit ? "flex" : "none")};
  }
`;

const ChangeColorBtn = styled.button`
  border: none;
  position: absolute;
  bottom: 2px;
  z-index: 0;
  right: 0;
  border: 1px solid lightgray;
  border-radius: 10px;
  color: white;
  background-color: black;
  letter-spacing: 1px;
  padding: 0 5px;
  cursor: pointer;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const EditBtn = styled.button`
  background-color: #ffa122;
  height: max-content;
  padding: 2px 5px;
  border: none;
  border-radius: 10px;
  letter-spacing: 2px;
  cursor: pointer;
`;
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  ${tabletBig({ marginTop: "50px" })}
  ${mobile({ marginTop: "0" })}
`;
const Detail = styled.div`
  display: flex;
  gap: 5px;
  padding: 10px 0;
  align-items: ${(props) => (props.edit ? "flex-start" : "center")};
  width: ${(props) => (props.edit ? "max-content" : "100%")};
  justify-content: space-between;
  flex-direction: ${(props) => (props.edit ? "column" : "row")};
`;

const IconContainer = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  cursor: pointer;
  display: none;
`;

const ImageContainer = styled.div`
  height: 100px;
  width: 100px;
  position: relative;
`;
const UserImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  overflow: hidden;
  border-radius: 50%;
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
  letter-spacing: 2px;
  border-bottom: 2px dashed lightgray;
`;
const ListItem = styled.li`
  list-style-type: none;
  font-size: 14px;
  padding: 10px 0;
  display: flex;
  align-items: center;
  letter-spacing: 1px;
  border-bottom: 1px dotted lightgray;
  &:hover {
    background-color: #eee;
  }
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
const UserInfo = ({ edit, showEditInfo, setShowEditInfo }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const accessToken = useSelector((state) => state.user.accessToken);
  const [coverColor, setCoverColor] = useState(user?.coverColor || "#eee3d4");
  const [showChangeBtn, setShowChangeBtn] = useState(false);
  const colorImgRef = useRef();

  //onChange (track color change)
  const trackColorChange = (e) => {
    e.preventDefault();
    setCoverColor(e.target.value);
    setShowChangeBtn(true);
  };

  //update database user coverColor
  const handleChangeColor = async (e) => {
    if (window.confirm("確定更換顏色嗎？")) {
      const updateduser = await updateUser(
        dispatch,
        { _id: user._id, coverColor: coverColor },
        accessToken
      );
      setCoverColor(updateduser[0].coverColor);
      setShowChangeBtn(false);
    } else {
      setShowChangeBtn(false);
    }
  };

  //Click ouside cancel onChange color changed
  useEffect(() => {
    const ClickOutsideClose = (e) => {
      if (!colorImgRef?.current?.contains(e.target)) {
        setShowChangeBtn(false);
        setCoverColor(user.coverColor);
      }
    };
    document.addEventListener("mousedown", ClickOutsideClose);
    return () => {
      document.removeEventListener("mousedown", ClickOutsideClose);
    };
  }, []);

  return (
    <InfoContainer edit={edit}>
      <Header>
        <CoverImg ref={colorImgRef} color={coverColor} edit={edit}>
          <ColorInput
            value={coverColor}
            type="color"
            onChange={trackColorChange}
          />
          <ChangeColorBtn
            style={{ display: showChangeBtn ? "block" : "none" }}
            onClick={handleChangeColor}
          >
            確定變更
          </ChangeColorBtn>
        </CoverImg>
        <ImageContainer edit={edit}>
          <UserImg src={user.img} />
        </ImageContainer>
        <Info>
          <Detail edit={edit}>
            <UserName>{user.username}</UserName>
            <CreatedDate>加入日期：{user.createdAt.split("T")[0]}</CreatedDate>
          </Detail>
          <EditBtn
            style={{
              display: edit ? (showEditInfo ? "none" : "block") : "none",
            }}
            onClick={() => setShowEditInfo((prev) => !prev)}
          >
            編輯
          </EditBtn>
          <EditBtn
            style={{
              display: edit ? (showEditInfo ? "block" : "none") : "none",
            }}
            onClick={() => setShowEditInfo((prev) => !prev)}
          >
            取消編輯
          </EditBtn>
        </Info>
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
        <Content>{user.phone || "未填寫"}</Content>
      </ListItem>
      <ListItem>
        <Mail />
        <Content>{user.email}</Content>
      </ListItem>
      <ListItem>
        <LocationOn />
        <Content>{user.address || "未填寫"}</Content>
      </ListItem>
    </InfoContainer>
  );
};

export default UserInfo;
