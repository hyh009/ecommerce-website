import { Link } from "react-router-dom";
import styled from "styled-components";
import Badge from "@mui/material/Badge";
import { Logout, Settings, NotificationsNone } from "@mui/icons-material";
import { tabletBig } from "../responsive";
import { useSelector } from "react-redux";

const Top = styled.div`
  width: 100%;
  height: 50px;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: white;
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
`;
const Wrapper = styled.div`
  height: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${tabletBig({ padding: "5px" })}
`;
const TopLeft = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled.img`
  height: 30px;
  display: block;
`;
const Desc = styled.span`
  font-size: 18px;
  //font-weight: bold;
  letter-spacing: 3px;
  margin-left: 5px;
  color: lightgray;
`;
const TopRight = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 20px;
  svg {
    color: #404040;
    font-size: 22px;
  }
`;

const PhotoContainer = styled.div`
  width: 40px;
  height: 40px;

  .userinfo {
    visibility: hidden;
    width: 180px;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    padding: 5px;
    border-radius: 5px;
    span {
      color: white;
    }
  }
  &:hover {
    background-color: rgba(200, 200, 200, 0.1);
    .userinfo {
      visibility: visible;
    }
  }
`;
const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  border-radius: 50%;
  cursor: pointer;
`;

const Topbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const handleLogout = () => {};
  return (
    <Top>
      <Wrapper>
        <TopLeft>
          <Link to="/admin">
            <Logo
              src={
                "https://res.cloudinary.com/dh2splieo/image/upload/v1640706199/shop_website/imgs/logo/name_jzjdfr.jpg"
              }
            />
          </Link>
          <Desc>網站管理後台</Desc>
        </TopLeft>
        <TopRight>
          <IconContainer title="登出" onClick={handleLogout}>
            <Logout />
          </IconContainer>
          {/* <><IconContainer title="通知">
            <Badge badgeContent={1} color="primary">
              <NotificationsNone />
            </Badge>
          </IconContainer>
          <IconContainer title="設定">
            <Settings />
          </IconContainer></> */}
          <PhotoContainer>
            <Photo src={user.img} alt={user.username} />
            <div className="userinfo">
              <span>用戶名稱：{user.username}</span>
              <span>Email：{user.email}</span>
            </div>
          </PhotoContainer>
        </TopRight>
      </Wrapper>
    </Top>
  );
};

export default Topbar;
