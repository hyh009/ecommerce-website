import { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
} from "@material-ui/data-grid";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { tabletBig } from "../responsive";
import OrderService from "../services/order.service";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { localtext } from "../localtext";
import useMediaQuery from "@mui/material/useMediaQuery";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 90px);
  grid-column: 2/6;
  ${tabletBig({
    height: "calc(100vh - 80px)",
    gridColumn: "1/2",
    marginTop: "50px",
  })}
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
  padding: 2px 5px;
  cursor: pointer;
`;

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
    </GridToolbarContainer>
  );
}

const ProfileOrders = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const accessToken = useSelector((state) => state.user.accessToken);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // get orders data
    let mounted = true;
    setLoading(true);
    const getOrders = async () => {
      try {
        const res = await OrderService.getOrdersbyUser(user._id, accessToken);
        if (mounted) {
          setOrders(res.data);
        }
      } catch (err) {}
      setLoading(false);
    };
    getOrders();
    return () => {
      mounted = false;
    };
  }, [user._id, accessToken]);

  const mobile = useMediaQuery("(max-width:480px)");
  const tablet = useMediaQuery("(max-width:770px)");

  const columns = [
    { field: "_id", headerName: "ID", width: 100, hide: mobile },
    {
      field: "createdAt",
      headerName: "??????",
      width: 150,
      renderCell: (params) => {
        return <span>{params.row.createdAt.split("T")[0]}</span>;
      },
    },
    {
      field: "address",
      headerName: "????????????",
      width: 150,
      hide: tablet,
    },
    {
      field: "status",
      headerName: "??????",
      width: 150,
      hide: mobile,
    },
    {
      field: "amount",
      headerName: "??????",
      width: 150,
      hide: mobile,
      renderCell: (params) => {
        return <span>NT$ {params.row.amount + params.row.shipping}</span>;
      },
    },
    {
      field: "products",
      headerName: "????????????",
      width: 150,
      hide: tablet,
      renderCell: (params) => {
        return <span>{params.row.products.length}???</span>;
      },
    },
    {
      field: "action",
      headerName: "??????",
      width: 150,
      renderCell: (params) => {
        return (
          <Active>
            <Link to={`${params.row._id}`}>
              <Button>????????????</Button>
            </Link>
          </Active>
        );
      },
    },
  ];

  return (
    <Container>
      <Helmet>
        <title>???????????? | ?????????</title>
        <meta
          name="description"
          content="????????????????????????????????????????????????"
        ></meta>
      </Helmet>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={orders}
          columns={columns}
          pageSize={mobile ? 7 : tablet ? 10 : 5}
          disableSelectionOnClick
          loading={loading}
          localeText={localtext}
          density="comfortable"
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </div>
    </Container>
  );
};

export default ProfileOrders;
