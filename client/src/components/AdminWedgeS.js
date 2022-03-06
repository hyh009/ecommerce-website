import styled from "styled-components";
import { Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { tabletBig } from "../responsive";

const Container = styled.div`
  flex: 1;
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  padding: 20px;
  border-radius: 5px;
  &::-webkit-scrollbar-thumb {
    background: transparent; /* Optional: just make scrollbar invisible */
  }
  &::-webkit-scrollbar {
    width: 0;
  }
  ${tabletBig({
    overflowX: "auto",
    width: "100%",
  })}
`;
const Title = styled.h3`
  font-size: 3vmin;
  font-weight: normal;
`;

const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  width: 100%;
  cursor: pointer;
  ${tabletBig({
    flexDirection: "row",
    width: "max-content",
  })}
`;
const UserList = styled.li`
  display: flex;
  align-items: center;
  font-size: 2.25vmin;
  width: 100%;
  justify-content: space-around;
  margin: 10px 0;
  padding: 5px;
  border-radius: 5px;
  &:hover {
    background-color: #eee;
  }
  ${tabletBig({
    flexDirection: "column",
    gap: "5px",
    width: "150px",
  })}
`;
const UserImg = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  object-fit: cover;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
const UserName = styled.span`
  letter-spacing: 2px;
  ${tabletBig({
    textAlign: "center",
  })}
`;
const CreatedDate = styled.span`
  ${tabletBig({
    textAlign: "center",
  })}
`;
const Display = styled.div`
  font-size: 2.25vmin;
  cursor: pointer;
  padding: 5px 7px;
  border-radius: 10px;
  background-color: #bff7f2;
  display: flex;
  align-items: center;
  span {
    color: gray;
    margin-right: 5px;
    letter-spacing: 1px;
  }
  svg path {
    color: gray;
  }
  &:hover {
    background-color: teal;

    span {
      color: white;
    }
    svg path {
      color: white;
    }
  }
`;
const AdminWedgeS = () => {
  const [users, setUsers] = useState([]);
  const accessToken = useSelector((state) => state.user.accessToken);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await UserService.get5NewUsers(accessToken);

        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [accessToken]);

  return (
    <Container>
      <Title>新加入用戶</Title>

      <ListContainer>
        {users?.map((user) => (
          <UserList key={user._id}>
            <UserImg src={user.img} alt={user.username} />
            <Info>
              <UserName>{user.username}</UserName>
              <CreatedDate>{format(user.createdAt)}</CreatedDate>
            </Info>
            <Link
              style={{ textDecoration: "none" }}
              to={`/admin/users/${user._id}`}
            >
              <Display>
                <span>顯示用戶</span>
                <Visibility style={{ fontSize: "0.875rem" }} />
              </Display>
            </Link>
          </UserList>
        ))}
      </ListContainer>
    </Container>
  );
};

export default AdminWedgeS;
