import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
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
} from "@mui/icons-material";

const Container = styled.div`
  display: flex;
`;

const SideContainer = styled.div`
  flex: 1;
  position: sticky;
  top: 50px;
  left: 0;
  background-color: #f6fffa;
  height: calc(100vh - 55px);
`;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
`;
const Menu = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const Title = styled.h3`
  letter-spacing: 3px;
  font-size: 12px;
  color: #acb2ac;
  margin-bottom: 5px;
  font-weight: 550;
`;
const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  list-style-type: none;
  padding-left: 5px;
  gap: 5px;
`;
const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 5px 0;
  cursor: pointer;
  letter-spacing: 2px;
  svg {
    font-size: 16px;
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

const AdminSidebar = () => {
  return (
    <Container>
      <SideContainer>
        <Wrapper>
          <Menu>
            <Title>我的儀錶板</Title>
            <ListContainer>
              <CustomLink
                end
                to="/admin"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem>
                  <Home />
                  <span>首頁</span>
                </ListItem>
              </CustomLink>
              <ListItem>
                <Insights />
                <span>網站洞察報告</span>
              </ListItem>
            </ListContainer>
          </Menu>
          <Menu>
            <Title>資料管理</Title>
            <ListContainer>
              <CustomLink
                to="/admin/users"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem>
                  <Person />
                  <span>使用者管理</span>
                </ListItem>
              </CustomLink>
              <CustomLink
                to="/admin/products"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem>
                  <CategoryOutlined />
                  <span>產品管理</span>
                </ListItem>
              </CustomLink>
              <CustomLink
                to="/admin/orders"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem>
                  <PointOfSaleOutlined />
                  <span>訂單管理</span>
                </ListItem>
              </CustomLink>
              <ListItem>
                <AddShoppingCart />
                <span>購物車管理</span>
              </ListItem>
            </ListContainer>
          </Menu>
          <Menu>
            <Title>通知</Title>
            <ListContainer>
              <ListItem>
                <Mail />
                <span>Email</span>
              </ListItem>
              <ListItem>
                <ForumOutlined />
                <span>消費者回饋</span>
              </ListItem>
              <ListItem>
                <ChatOutlined />
                <span>訊息通知</span>
              </ListItem>
            </ListContainer>
          </Menu>
          <Menu>
            <Title>管理設定</Title>
            <ListContainer>
              <ListItem>
                <ManageAccounts />
                <span>帳號管理</span>
              </ListItem>
              <ListItem>
                <AccountTreeOutlined />
                <span>網站管理</span>
              </ListItem>
              <ListItem>
                <Report />
                <span>問題報告</span>
              </ListItem>
            </ListContainer>
          </Menu>
        </Wrapper>
      </SideContainer>
      <Outlet />
    </Container>
  );
};

export default AdminSidebar;
