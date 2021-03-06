import { Link } from "react-router-dom";
import styled from "styled-components";
import { Logout } from "@mui/icons-material";
import { tabletBig } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../redux/apiCall";
import { useNavigate } from "react-router-dom";

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
  font-size: 1.125rem;
  font-weight: bold;
  letter-spacing: 3px;
  margin-left: 5px;
  color: lightgray;
  ${tabletBig({ fontSize: "3vmin", letterSpacing: "0px" })}
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
    font-size: 1.375rem;
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
    font-size: 0.75rem;
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    userLogout(dispatch);
    return navigate("/login");
  };
  return (
    <Top>
      <Wrapper>
        <TopLeft>
          <Link to="/admin">
            <Logo
              src={
                "https://res.cloudinary.com/dh2splieo/image/upload/v1640706199/shop_website/imgs/logo/name_jzjdfr.jpg"
              }
              alt="LOGO"
            />
          </Link>
          <Desc>??????????????????</Desc>
        </TopLeft>
        <TopRight>
          <IconContainer title="??????" onClick={handleLogout}>
            <Logout />
          </IconContainer>
          <PhotoContainer>
            <Photo src={user.img} alt={user.username} />
            <div className="userinfo">
              <span>???????????????{user.username}</span>
              <span>Email???{user.email}</span>
            </div>
          </PhotoContainer>
        </TopRight>
      </Wrapper>
    </Top>
  );
};

export default Topbar;
