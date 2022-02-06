import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserService from "../services/user.service";
import useMediaQuery from "@mui/material/useMediaQuery";

const Container = styled.div`
  flex: 4;
  height: calc(100vh - 50px);
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

const AdminUserList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector((state) => state.user.accessToken);
  const mobile = useMediaQuery("(max-width:480px)");
  const tablet = useMediaQuery("(max-width:770px)");
  const defaultUser =
    "https://res.cloudinary.com/dh2splieo/image/upload/v1642260982/shop_website/user/defaultUser_z2hlsg.png";
  useEffect(() => {
    const getAllUser = async () => {
      try {
        setLoading(true);
        const res = await UserService.getAll(accessToken);
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getAllUser();
  }, []);
  const handleDelete = (id) => {
    setData(data.filter((item) => item._id != id));
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "user",
      headerName: "用戶",
      width: 200,
      renderCell: (params) => {
        return (
          <User>
            <UserImg src={params.row.img || defaultUser} alt="" />
            <span>{params.row.username}</span>
          </User>
        );
      },
    },
    {
      field: "date",
      headerName: "加入日期",
      width: 150,
      renderCell: (params) => {
        return <span>{params.row.createdAt.split("T")[0]}</span>;
      },
    },
    {
      field: "email",
      headerName: "電子郵件",
      width: 200,
    },
    {
      field: "lank",
      headerName: "會員階級",
      width: 150,
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
          pageSize={6}
          disableSelectionOnClick
          loading={loading}
          checkboxSelection
          density="comfortable"
        />
      </div>
    </Container>
  );
};
export default AdminUserList;
