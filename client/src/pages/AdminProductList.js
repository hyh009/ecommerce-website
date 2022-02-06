import styled from "styled-components";
import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../redux/apiCall";
import useMediaQuery from "@mui/material/useMediaQuery";

const Container = styled.div`
  flex: 4;
  height: calc(100vh - 50px);
`;

const Product = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 14px;
  }
`;
const ProductImg = styled.img`
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
  padding: 0px 5px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

const AdminProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const accessToken = useSelector((state) => state.user.accessToken);
  const mobile = useMediaQuery("(max-width:480px)");
  const tablet = useMediaQuery("(max-width:770px)");

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    window.confirm("確定刪除此產品嗎？") && deleteProduct(id, dispatch);
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "product",
      headerName: "產品",
      width: 250,
      renderCell: (params) => {
        return (
          <Product>
            <ProductImg
              src={params.row.imgs[0].src}
              alt={params.row.imgs[0].desc}
            />
            <span>{params.row.name}</span>
          </Product>
        );
      },
    },
    {
      field: "updatedAd",
      headerName: "上次更新",
      width: 150,
      renderCell: (params) => {
        return (
          <span>
            {params.row.updatedAt?.split("T")[0] ||
              params.row.createdAt?.split("T")[0]}
          </span>
        );
      },
    },
    {
      field: "categories",
      headerName: "分類",
      width: 150,
    },
    {
      field: "subProducts",
      headerName: "種類",
      width: 150,
      hide: true,
      renderCell: (params) => {
        return <>{params.row.colors.length + params.row.patterns.length}</>;
      },
    },
    {
      field: "price",
      headerName: "價格",
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
      <div style={{ height: "calc(100% - 50px)", width: "100%" }}>
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={6}
          checkboxSelection
          disableSelectionOnClick
          density="comfortable"
        />
      </div>
    </Container>
  );
};

export default AdminProductList;
