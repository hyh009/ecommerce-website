import styled from "styled-components";
import { useState, useEffect } from "react";
import OrderService from "../services/order.service";
import { format } from "timeago.js";
import { useSelector } from "react-redux";

const Container = styled.div`
  flex: 2;
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  padding: 20px;
  border-radius: 5px;
`;
const TransactionTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;
const Title = styled.h3`
  font-size: 3vmin;
  margin-bottom: 10px;
  font-weight: normal;
`;

const TableHead = styled.tr``;

const TableRow = styled.tr`
  cursor: pointer;

  &:hover {
    background-color: #eee;
    border-radius: 10px;
  }
`;
const Column = styled.th`
  font-size: 2.25vmin;
  margin: 10px 0;
  letter-spacing: 1px;
`;
const Data = styled.td`
  font-size: 2.5vmin;
  text-align: center;
  padding: 10px;
  &.user {
    display: flex;
    align-items: center;
  }
`;
const UserImg = styled.img`
  height: 35px;
  width: 35px;
  object-fit: cover;
  overflow: hidden;
  border-radius: 50%;
  margin: 0 10px;
`;
const Name = styled.span`
  letter-spacing: 2px;
`;

const Button = styled.button`
  border: none;
  font-size: 2.25vmin;
  font-weight: bold;
  padding: 5px 7px;
  letter-spacing: 1px;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) =>
    props.type === "待付款"
      ? "aliceblue"
      : props.type === "訂單取消"
      ? "#fff0f1"
      : props.type === "訂單處理中"
      ? "#e5faf2"
      : "lightgray"};

  color: ${(props) =>
    props.type === "待付款"
      ? "#2a7ade"
      : props.type === "訂單取消"
      ? "#d95087"
      : props.type === "訂單處理中"
      ? "#3bb077"
      : "gray"};
`;

const AdminWedgeB = () => {
  const [orders, setOrders] = useState([]);
  const accessToken = useSelector((state) => state.user.accessToken);
  const defaultUser =
    "https://res.cloudinary.com/dh2splieo/image/upload/v1642260982/shop_website/user/defaultUser_z2hlsg.png";

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await OrderService.get5NewOrders(accessToken);
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);
  return (
    <Container>
      <Title>最新交易資訊</Title>
      <TransactionTable>
        <TableHead>
          <Column>用戶</Column>
          <Column>金額</Column>
          <Column>更新日期</Column>
          <Column>狀態</Column>
        </TableHead>
        {orders?.map((order) => (
          <TableRow key={order._id}>
            <Data className="user">
              <UserImg src={order.user.img || defaultUser} />
              <Name>{order.user.username}</Name>
            </Data>
            <Data>NT$ {order.amount}</Data>
            <Data>{format(order.createdAt)}</Data>
            <Data>
              <Button type={order.status}>{order.status}</Button>
            </Data>
          </TableRow>
        ))}
      </TransactionTable>
    </Container>
  );
};

export default AdminWedgeB;
