import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { tabletBig, mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { userLogout } from "../redux/apiCall";

const Container = styled.div`
  height: 60px;
  display: flex;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid lightgray;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  position: ${(props) => props.position};
  top: 0;
  background-color: white;
  z-index: 4;
  ${tabletBig({ height: "50px", position: "static" })}
`;

const Wrapper = styled.div`
  width: 100%;
  height: 90%;
  padding: 5px 20px;
  display: flex;
  ${mobile({ padding: "10px" })}
`;

const Left = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  ${mobile({ justifyContent: "center", gap: "5px" })};
`;
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CompanySideMenu = styled.ul`
  position: absolute;
  left: 0;
  top: 60px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #292828;
  width: 25%;
  height: calc(100vh - 60px);
  transition: 0.4s;
  padding: 20px;
  list-style-type: none;
  transform: ${(props) =>
    props.show === true ? "translateX(0)" : "translateX(-100%)"};
  ${tabletBig({
    width: "100%",
    top: "50px",
    paddingBottom: "10%",
    justifyContent: "flex-end",
    gap: "2%",
  })}
  ${mobile({
    padding: "100px 20px",
    height: "calc(100vh - 50px)",
  })}
`;

const CompanyMenuItem = styled.li`
  width: 100%;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  &:hover {
    background-color: #3d3c3c;
  }
  .companyMenu {
    color: white;
    letter-spacing: 6px;
    font-weight: 580;
    ${tabletBig({
      fontSize: "4vmin",
    })}
    ${mobile({
      fontSize: "5vmin",
    })}
  }
`;
const CustomLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  text-align: center;
  user-select: none;
`;
const Logo = styled.img`
  height: 35px;
  ${mobile({ height: "25px" })}
  &.img {
    ${mobile({ display: "none" })}
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  ${mobile({ flex: "2", gap: "10px" })}
`;

const Menuitem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  height: 35px;
  user-select: none;
  ${mobile({ padding: "5px 0px", fontSize: "1.125rem" })}

  .userinfo {
    visibility: hidden;
    width: 180px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    font-size: 0.75rem;
    padding: 5px;
    border-radius: 5px;
    user-select: none;
  }
  &:hover {
    background-color: rgba(200, 200, 200, 0.1);
    .userinfo {
      visibility: visible;
      ${tabletBig({ display: "none" })}
    }
  }
`;

const MenuText = styled.p`
  font-size: 14px;
  padding: 5px 10px;
  ${mobile({ fontSize: "1rem" })}
`;

const MenuImg = styled.img`
  height: 35px;
  width: 35px;
  object-fit: cover;
  overflow: hidden;
  border-radius: 50%;
  cursor: pointer;
`;
const Nav = ({ position }) => {
  const [show, setShow] = useState(false);
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleCompanyMenu = () => {
    setShow((prev) => !prev);
  };

  const handleLogout = () => {
    userLogout(dispatch);
    return navigate("/login");
  };
  //Click outside close
  let menuRef = useRef();

  useEffect(() => {
    const ClickOutsideClose = (e) => {
      if (!menuRef?.current?.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", ClickOutsideClose);
    return () => {
      document.removeEventListener("mousedown", ClickOutsideClose);
    };
  }, []);
  // close company menu when page changed
  useEffect(() => {
    setShow(false);
  }, [pathname]);

  return (
    <Container position={position}>
      <Wrapper>
        <Left>
          <IconContainer onClick={handleCompanyMenu}>
            {show ? <CloseIcon /> : <MenuIcon />}
          </IconContainer>
          <CompanySideMenu ref={menuRef} show={show}>
            <CompanyMenuItem>
              <CustomLink to="/" className="companyMenu">
                首頁／HOME
              </CustomLink>
            </CompanyMenuItem>
            <CompanyMenuItem>
              <CustomLink to="/about" className="companyMenu">
                關於我們／About
              </CustomLink>
            </CompanyMenuItem>
            <CompanyMenuItem>
              <CustomLink to="/products/all" className="companyMenu">
                產品一覽／Product
              </CustomLink>
            </CompanyMenuItem>
            <CompanyMenuItem>
              <CustomLink to="/contact" className="companyMenu">
                聯繫我們／Contact
              </CustomLink>
            </CompanyMenuItem>
            <CompanyMenuItem></CompanyMenuItem>
          </CompanySideMenu>
          <CustomLink to="/">
            <Logo
              className="img"
              src="https://res.cloudinary.com/dh2splieo/image/upload/v1640706201/shop_website/imgs/logo/pad_logo_wkibae.png"
              alt="墊一店-Logo"
            />
            <Logo
              src="https://res.cloudinary.com/dh2splieo/image/upload/v1640706199/shop_website/imgs/logo/name_jzjdfr.jpg"
              alt="墊一店"
            />
          </CustomLink>
        </Left>

        <Right>
          {!user && (
            <CustomLink
              to="/register"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Menuitem>
                <MenuText>註冊</MenuText>
              </Menuitem>
            </CustomLink>
          )}
          {!user && (
            <CustomLink
              to="/login"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Menuitem>
                <MenuText>登入</MenuText>
              </Menuitem>
            </CustomLink>
          )}
          {user && (
            <Menuitem onClick={handleLogout}>
              <MenuText>登出</MenuText>
            </Menuitem>
          )}
          <CustomLink to="/cart">
            <Menuitem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlinedIcon style={{ color: "black" }} />
              </Badge>
            </Menuitem>
          </CustomLink>
          {user && (
            <CustomLink
              to="/profile"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Menuitem>
                <MenuImg src={user.img} alt="用戶照片" />
                <div className="userinfo">
                  <span>用戶名稱：{user.username}</span>
                  <span>Email：{user.email}</span>
                </div>
              </Menuitem>
            </CustomLink>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Nav;
