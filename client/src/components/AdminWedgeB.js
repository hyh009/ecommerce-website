import styled from "styled-components";
import { useState, useEffect } from "react";
import OrderService from "../services/order.service";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import { tabletBig } from "../responsive";

const Container = styled.div`
  flex: 2;
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  padding: 20px;
  border-radius: 5px;
`;
const TransactionTable = styled.table`
  border-collapse: separate;
  width: 100%;
  border-spacing: 0px 5px;
`;
const Title = styled.h3`
  font-size: 3vmin;
  margin-bottom: 10px;
  font-weight: normal;
`;

const TableRow = styled.tr`
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;
const Column = styled.th`
  font-size: 2.25vmin;
  letter-spacing: 1px;
`;
const Data = styled.td`
  font-size: 2.5vmin;
  text-align: center;
  padding: 10px 0;
  &.user {
    display: flex;
    align-items: center;
  }
  ${tabletBig({
    justifyContent: "center",
  })}
`;

const User = styled.div`
  display: flex;
  align-items: center;
  ${tabletBig({
    flexDirection: "column",
    gap: "10px",
  })}
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
  }, [accessToken]);
  return (
    <Container>
      <Title>最新交易資訊</Title>
      <TransactionTable>
        <thead>
          <TableRow>
            <Column>用戶</Column>
            <Column>金額</Column>
            <Column>更新日期</Column>
            <Column>狀態</Column>
          </TableRow>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <TableRow key={order._id}>
              <Data className="user">
                <User>
                  <UserImg src={order.user.img} alt={order.user.username} />
                  <Name>{order.user.username}</Name>
                </User>
              </Data>
              <Data>NT$ {order.amount}</Data>
              <Data>{format(order.createdAt)}</Data>
              <Data>
                <Button type={order.status}>{order.status}</Button>
              </Data>
            </TableRow>
          ))}
        </tbody>
      </TransactionTable>
    </Container>
  );
};

export default AdminWedgeB;
