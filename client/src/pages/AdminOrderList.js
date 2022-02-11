import styled from "styled-components";
import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
} from "@material-ui/data-grid";
import { Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import OrderService from "../services/order.service";
import { tabletBig } from "../responsive";

const Container = styled.div`
  grid-column: 2/6;
  height: calc(100vh - 50px);
  ${tabletBig({
    minHeight: "calc(100vh - 80px)",
    gridColumn: "1/2",
    marginTop: "10px",
  })}
`;
const User = styled.div`
  display: flex;
  align-items: center;
`;
const UserImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  overflow: hidden;
  margin: 0 10px;
`;
const Active = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const Button = styled.button`
  border: none;
  background-color: teal;
  color: white;
  border-radius: 5px;
  padding: 0 5px;
  cursor: pointer;
`;

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
    </GridToolbarContainer>
  );
}
const AdminOrderList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector((state) => state.user.accessToken);

  const mobile = useMediaQuery("(max-width:480px)");
  const tablet = useMediaQuery("(max-width:770px)");
  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const res = await OrderService.get(accessToken);
        setData(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    getOrders();
  }, []);
  const handleDelete = (id) => {
    window.confirm("確定刪除此訂單嗎？") &&
      setData(data.filter((item) => item._id != id));
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "createdAt",
      headerName: "下單日期",
      width: 150,
      renderCell: (params) => {
        return <span>{params.row.createdAt.split("T")[0]}</span>;
      },
    },
    {
      field: "user",
      headerName: "用戶",
      width: 180,
      renderCell: (params) => {
        return (
          <Link
            to={`/admin/users/${params.row.user._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <User>
              <UserImg src={params.row.user.img} alt="" />
              <span>{params.row.user.username}</span>
            </User>
          </Link>
        );
      },
    },
    {
      field: "status",
      headerName: "狀態",
      width: 150,
      hide: mobile,
    },
    {
      field: "amount",
      headerName: "金額",
      width: 150,
      hide: mobile,
      renderCell: (params) => {
        return <span>NT$ {params.row.amount + params.row.shipping}</span>;
      },
    },
    {
      field: "products",
      headerName: "數量",
      width: 120,
      hide: tablet,
      renderCell: (params) => {
        return (
          <span>
            {params.row.products.reduce(
              (sum, productInfo) => sum + productInfo.quantity,
              0
            )}
            件
          </span>
        );
      },
    },

    {
      field: "action",
      headerName: "管理",
      width: 150,
      renderCell: (params) => {
        return (
          <Active>
            <Link to={params.row._id}>
              <Button>編輯</Button>
            </Link>
            <Delete
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete(params.row._id)}
            />
          </Active>
        );
      },
    },
  ];
  return (
    <Container>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={data}
          columns={columns}
          pageSize={mobile ? 7 : tablet ? 10 : 5}
          disableSelectionOnClick
          loading={loading}
          density="comfortable"
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </div>
    </Container>
  );
};

export default AdminOrderList;
