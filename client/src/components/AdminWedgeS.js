import styled from "styled-components";
import { Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

const Container = styled.div`
  flex: 1;
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  margin-right: 10px;
  padding: 20px;
  border-radius: 5px;
`;
const Title = styled.h3`
  font-size: 3vmin;
  font-weight: normal;
`;

const ListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #eee;
  }
`;
const UserList = styled.li`
  display: flex;
  align-items: center;
  font-size: 2.25vmin;
  width: 100%;
  justify-content: space-around;
`;
const UserImg = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  object-fit: cover;
  overflow: hidden;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
const UserName = styled.span`
  letter-spacing: 2px;
`;
const CreatedDate = styled.span``;
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
  }, []);
  const defaultUser =
    "https://res.cloudinary.com/dh2splieo/image/upload/v1642260982/shop_website/user/defaultUser_z2hlsg.png";

  return (
    <Container>
      <Title>新加入用戶</Title>
      {users?.map((user) => (
        <ListContainer key={user._id}>
          <UserList>
            <UserImg src={user.img || defaultUser} />
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
                <Visibility style={{ fontSize: "14px" }} />
              </Display>
            </Link>
          </UserList>
        </ListContainer>
      ))}
    </Container>
  );
};

export default AdminWedgeS;
