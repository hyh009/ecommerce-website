import styled from "styled-components";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
} from "@material-ui/data-grid";
import { Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../redux/apiCall";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tabletBig } from "../responsive";

const Container = styled.div`
  grid-column: 2/6;
  height: calc(100vh - 50px);

  ${tabletBig({
    minHeight: "calc(100vh - 80px)",
    gridColumn: "1/2",
    marginTop: "10px",
  })}
  position:relative;
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
const AdminProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const accessToken = useSelector((state) => state.user.accessToken);
  const mobile = useMediaQuery("(max-width:480px)");
  const tablet = useMediaQuery("(max-width:770px)");

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
      hide: tablet,
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
      hide: mobile,
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
      hide: tablet,
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
      <CreateLink to="/admin/products/newproduct">新增產品</CreateLink>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={mobile ? 7 : tablet ? 10 : 5}
          disableSelectionOnClick
          density="comfortable"
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </div>
    </Container>
  );
};

export default AdminProductList;
