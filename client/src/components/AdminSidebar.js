import React, { useState, useEffect, useCallback } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { tabletBig, mobile } from "../responsive";
import {
  Home,
  Insights,
  Person,
  AddShoppingCart,
  PointOfSaleOutlined,
  ChatOutlined,
  ForumOutlined,
  AccountTreeOutlined,
  Report,
  CategoryOutlined,
  Mail,
  ManageAccounts,
  ArrowDropDown,
  ArrowDropUp,
} from "@mui/icons-material";

const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  ${tabletBig({ gridTemplateColumns: "repeat(1,1fr)", position: "relative" })}
`;

const SideContainer = styled.div`
  position: sticky;
  top: 50px;
  left: 0;
  background-color: #f6fffa;
  height: calc(100vh - 50px);
  grid-column: 1/2;
  ${tabletBig({
    top: "50px",
    zIndex: "3",
    width: "100%",
    height: "max-content",
    minHeight: "max-content",
    gridColumn: "1/6",
  })}
`;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  ${tabletBig({
    padding: "0",
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
  font-size: 2vmin;
  color: #acb2ac;
  margin-bottom: 5px;
  font-weight: 550;
  display: flex;
  align-items: center;
  ${tabletBig({ marginBottom: "0", padding: "0 10px", height: "30px" })}
  ${mobile({ fontSize: "2.5vmin" })}
`;
const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: 2vmin;
  list-style-type: none;
  padding-left: 5px;
  gap: 5px;
  ${tabletBig({ padding: "20px 10px" })}
  ${mobile({ padding: "5px 10px", fontSize: "3vmin" })}
`;
const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 5px 0;
  cursor: pointer;
  letter-spacing: 2px;
  svg {
    font-size: 1rem;
  }
  span {
    margin-left: 5px;
  }
`;

const CustomLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  cursor: pointer;
  &:hover {
    background-color: #e8fcdf;
    border-radius: 10px;
  }
  &.active {
    background-color: #bff7f2;
    border-radius: 10px;
  }
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

const AdminSidebar = () => {
  const [showList, setShowList] = useState(true);
  const [showUpArrow, setShowUpArrow] = useState(false);
  const [device, setDevice] = useState("desktop");
  const { pathname } = useLocation();
  const handleCheckDevice = useCallback(() => {
    if (window.innerWidth > 1024) {
      setShowList(true);
      setShowUpArrow(false);
      setDevice("desktop");
    } else {
      setShowList(false);
      setShowUpArrow(false);
      setDevice("tablet");
    }
  }, []);
  useEffect(() => {
    handleCheckDevice();
    window.addEventListener("resize", handleCheckDevice);
    return () => {
      window.removeEventListener("resize", handleCheckDevice);
    };
  }, [handleCheckDevice]);

  //set show to false when path change( only for tablet and mobile)
  useEffect(() => {
    if (device === "tablet") {
      setShowList(false);
      setShowUpArrow(false);
    }
  }, [pathname, device]);
  return (
    <Container>
      <SideContainer>
        <Wrapper>
          {device !== "desktop" && (
            <Title style={{ backgroundColor: "black" }}>
              ????????????
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
          )}
          {showList && (
            <>
              {" "}
              <Menu>
                <Title>???????????????</Title>
                <ListContainer>
                  <CustomLink
                    end
                    to="/admin"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <ListItem>
                      <Home />
                      <span>??????</span>
                    </ListItem>
                  </CustomLink>
                  <ListItem>
                    <Insights />
                    <span>??????????????????</span>
                  </ListItem>
                </ListContainer>
              </Menu>
              <Menu>
                <Title>????????????</Title>
                <ListContainer>
                  <CustomLink
                    to="/admin/users"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <ListItem>
                      <Person />
                      <span>???????????????</span>
                    </ListItem>
                  </CustomLink>
                  <CustomLink
                    to="/admin/products"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <ListItem>
                      <CategoryOutlined />
                      <span>????????????</span>
                    </ListItem>
                  </CustomLink>
                  <CustomLink
                    to="/admin/orders"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <ListItem>
                      <PointOfSaleOutlined />
                      <span>????????????</span>
                    </ListItem>
                  </CustomLink>
                  <ListItem>
                    <AddShoppingCart />
                    <span>???????????????</span>
                  </ListItem>
                </ListContainer>
              </Menu>
              <Menu>
                <Title>??????</Title>
                <ListContainer>
                  <ListItem>
                    <Mail />
                    <span>Email</span>
                  </ListItem>
                  <ListItem>
                    <ForumOutlined />
                    <span>???????????????</span>
                  </ListItem>
                  <ListItem>
                    <ChatOutlined />
                    <span>????????????</span>
                  </ListItem>
                </ListContainer>
              </Menu>
              <Menu>
                <Title>????????????</Title>
                <ListContainer>
                  <ListItem>
                    <ManageAccounts />
                    <span>????????????</span>
                  </ListItem>
                  <ListItem>
                    <AccountTreeOutlined />
                    <span>????????????</span>
                  </ListItem>
                  <ListItem>
                    <Report />
                    <span>????????????</span>
                  </ListItem>
                </ListContainer>
              </Menu>
            </>
          )}
        </Wrapper>
      </SideContainer>
      <Outlet />
    </Container>
  );
};

export default AdminSidebar;
