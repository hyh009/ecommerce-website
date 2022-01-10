import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { tabletBig } from "../responsive";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  Home,
  Person,
  AddShoppingCart,
  PointOfSaleOutlined,
  Favorite,
  Password,
  LocalOffer,
  ArrowDropDown,
  ArrowDropUp,
} from "@mui/icons-material";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  ${tabletBig({ overflowX: "visible" })}
`;

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  ${tabletBig({ gridTemplateColumns: "repeat(1,1fr)" })}
`;

const SideContainer = styled.div`
  position: sticky;
  top: 60px;
  left: 0;
  background-color: #fffdf6;
  height: calc(100vh - 60px);
  grid-column: 1/2;
  ${tabletBig({
    position: "absolute",
    top: "0",
    height: "120px",
    zIndex: "3",
    width: "100%",
    height: "max-content",
  })}
`;

const SidebarWrapper = styled.div`
  padding: 20px;
  display: flex;
  height: 100%;
  flex-direction: column;
  ${tabletBig({
    padding: "5px",
  })}
`;
const Menu = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  ${tabletBig({ marginBottom: "0px" })}
`;
const Title = styled.h3`
  letter-spacing: 3px;
  font-size: 14px;
  color: #acb2ac;
  margin-bottom: 5px;
  font-weight: 550;
  display: flex;
  align-items: center;
`;

const CustomArrowDropDown = styled(ArrowDropDown)`
  &.css-i4bv87-MuiSvgIcon-root {
    display: none;
    ${tabletBig({ display: "inline-block" })}
  }
`;

const CustomArrowDropUp = styled(ArrowDropUp)`
  &.css-i4bv87-MuiSvgIcon-root {
    display: none;
    ${tabletBig({ display: "inline-block" })}
  }
`;

const CustomLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  &:hover {
    background-color: #fffde2;
    border-radius: 10px;
  }
  &.active {
    background-color: #e2fff4;
    border-radius: 10px;
  }
`;
const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  list-style-type: none;
  padding-left: 5px;
  gap: 10px;
`;
const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 5px 0;
  cursor: pointer;
  letter-spacing: 2px;
  font-size: 16px;
  ${tabletBig({
    justifyContent: "center",
  })}
  svg {
    font-size: 20px;
  }
  span {
    margin-left: 5px;
  }
`;

const Sidebar = () => {
  const [showList, setShowList] = useState(true);
  const [showUpArrow, setShowUpArrow] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  function handleCheckDevice() {
    if (window.innerWidth > 1024) {
      setShowList(true);
      setShowUpArrow(false);
    } else {
      setShowList(false);
      setShowUpArrow(false);
    }
  }
  useEffect(() => {
    handleCheckDevice();
    window.addEventListener("resize", handleCheckDevice);
    return () => {
      window.removeEventListener("resize", handleCheckDevice);
    };
  }, []);
  return (
    <Container>
      <Wrapper>
        <SideContainer>
          <SidebarWrapper>
            <Menu>
              <Title>
                {user?.name}的頁面
                <CustomArrowDropDown
                  onClick={() => {
                    setShowList(true);
                    setShowUpArrow(true);
                  }}
                  style={{ visibility: showUpArrow ? "hidden" : "visible" }}
                />
                <CustomArrowDropUp
                  onClick={() => {
                    setShowList(false);
                    setShowUpArrow(false);
                  }}
                  style={{ display: showUpArrow ? "inline-block" : "none" }}
                />
              </Title>
              {showList ? (
                <ListContainer>
                  <CustomLink end to="/profile">
                    <ListItem>
                      <Home />
                      <span>我的頁面</span>
                    </ListItem>
                  </CustomLink>
                  <CustomLink to="/profile/edit">
                    <ListItem>
                      <Person />
                      <span>編輯帳戶資訊</span>
                    </ListItem>
                  </CustomLink>
                  <ListItem>
                    <Password />
                    <span>更改密碼</span>
                  </ListItem>
                  <ListItem>
                    <PointOfSaleOutlined />
                    <span>我的訂單</span>
                  </ListItem>
                  <CustomLink to="/cart">
                    <ListItem>
                      <AddShoppingCart />
                      <span>我的購物車</span>
                    </ListItem>
                  </CustomLink>
                  <CustomLink to="/wish">
                    <ListItem>
                      <Favorite />
                      <span>我的願望清單</span>
                    </ListItem>
                  </CustomLink>
                  <ListItem>
                    <LocalOffer />
                    <span>我的優惠券</span>
                  </ListItem>
                </ListContainer>
              ) : (
                <></>
              )}
            </Menu>
          </SidebarWrapper>
        </SideContainer>
        <Outlet />
      </Wrapper>
    </Container>
  );
};

export default Sidebar;
