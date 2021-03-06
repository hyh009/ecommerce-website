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
import UserService from "../services/user.service";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tabletBig } from "../responsive";

const Container = styled.div`
  grid-column: 2/6;
  height: calc(100vh - 50px);
  position: relative;

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

const CreateLink = styled(Link)`
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  letter-spacing: 2px;
  color: white;
  background-color: teal;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
  text-decoration: none;
  font-size: 2.5vmin;
`;
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
    </GridToolbarContainer>
  );
}

const AdminUserList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector((state) => state.user.accessToken);
  const mobile = useMediaQuery("(max-width:480px)");
  const tablet = useMediaQuery("(max-width:770px)");
  useEffect(() => {
    let mounted = true;
    const getAllUser = async () => {
      try {
        setLoading(true);
        const res = await UserService.getAll(accessToken);
        if (mounted) {
          setData(res.data);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getAllUser();
    return () => {
      mounted = false;
    };
  }, [accessToken]);
  const handleDelete = (id) => {
    window.confirm("???????????????????????????") &&
      setData(data.filter((item) => item._id !== id));
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "user",
      headerName: "??????",
      width: 200,
      renderCell: (params) => {
        return (
          <User>
            <UserImg src={params.row.img} alt="" />
            <span>{params.row.username}</span>
          </User>
        );
      },
    },
    {
      field: "date",
      headerName: "????????????",
      width: 150,
      hide: mobile,
      renderCell: (params) => {
        return <span>{params.row.createdAt.split("T")[0]}</span>;
      },
    },
    {
      field: "email",
      headerName: "????????????",
      width: 150,
      hide: tablet,
    },
    {
      field: "lastLogin",
      headerName: "????????????",
      width: 150,
      hide: true,
      renderCell: (params) => {
        return <span>{params.row.lastLogin.split("T")[0]}</span>;
      },
    },
    {
      field: "gender",
      headerName: "??????",
      width: 120,
      hide: tablet,
    },
    {
      field: "lank",
      headerName: "????????????",
      width: 150,
      hide: mobile,
    },

    {
      field: "action",
      headerName: "??????",
      width: 150,
      renderCell: (params) => {
        return (
          <Active>
            <Link to={params.row._id}>
              <Button>??????</Button>
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
      <CreateLink to="/admin/users/newuser">????????????</CreateLink>
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
export default AdminUserList;
