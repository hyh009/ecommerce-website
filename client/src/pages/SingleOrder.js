import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import OrderService from "../services/order.service";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { tabletBig } from "../responsive";
import NotFound from "./NotFound";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Container = styled.div`
  grid-column: 2/6;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  ${tabletBig({
    gridColumn: "1/2",
    gridTemplateColumns: "repeat(1,1fr)",
    marginTop: "50px",
  })};
`;
const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 90px);
  gap: 20px;
  grid-column: 1/3;
  ${tabletBig({ gridColumn: "1/2", height: "50vh" })}
`;

const Title = styled.h3`
  font-size: 3vmin;
  padding: 5px 0;
`;
const InfoContainer = styled.div`
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  height: 100%;
  border-radius: 5px;
  padding: 10px;
`;
const Card = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;
const Product = styled.div`
  border-bottom: 1px solid lightgray;
  padding: 5px;
  display: flex;
  gap: 10px;
  align-items: center;
`;
const List = styled.li`
  font-size: 2.5vmin;
  color: black;
  padding: 3px 5px;
`;
const Price = styled.span`
  font-size: ${(props) => (props.text === "total" ? "2.75vmin" : "2.5vmin")};
  color: ${(props) => (props.text === "total" ? "teal" : "black")};
  text-align: right;
  display: block;
`;
const Image = styled.img`
  object-fit: cover;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

const Detail = styled.ul`
  list-style-type: none;
`;

const ShowMore = styled.button`
  border: none;
  cursor: pointer;
  letter-spacing: 1px;
  padding: 5px;
  background-color: #eee;
  border-radius: 5px;
  width: 100%;
  margin: 2px 0;
  letter-spacing: 1px;
`;

const Info = styled.ul`
  margin-bottom: 10px;
  background-color: #eee;
  border-radius: 5px;
  padding: 5px;
  list-style-type: disclosure-closed;
  list-style-position: inside;
`;
const LinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const CustomLink = styled(Link)`
  color: white;
  text-decoration: none;
  background-color: teal;
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 2.5vmin;
  letter-spacing: 1px;
  ${tabletBig({ width: "100%", textAlign: "center" })}
`;

const SingleOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const [order, setOrder] = useState(null);
  const [displayPackages, setDisplayPackages] = useState(3);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    const getOrder = async () => {
      setIsFetching(true);
      try {
        const res = await OrderService.getOrderById(orderId);
        setOrder(res.data);
        isFetching(false);
      } catch (err) {
        setIsFetching(false);
      }
    };
    getOrder();
  }, [orderId]);

  // handle show more button
  const handleShowMore = (e) => {
    e.preventDefault();
    if (displayPackages === 3) {
      setDisplayPackages(order?.products.length);
    } else {
      setDisplayPackages(3);
    }
  };

  return (
    <Container>
      <Helmet>
        <title>訂單詳細資訊 | 墊一店</title>
        <meta name="description" content="顯示單筆訂單的詳細資訊"></meta>
      </Helmet>
      {isFetching ? (
        <ProgressContainer>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
          <span style={{ textAlign: "center", width: "100%" }}>
            資料讀取中...
          </span>
        </ProgressContainer>
      ) : !order ? (
        <NotFound content="order" grid="1 / 3" />
      ) : (
        <>
          <Card>
            <InfoContainer>
              <Title>訂單商品資訊</Title>
              {order?.products
                .slice(0, displayPackages)
                .map((product, index) => (
                  <Product key={index + product._id}>
                    <Image src={product?.imgUrl} alt={product.title} />
                    <Detail>
                      <List>
                        商品名稱：
                        <Link
                          style={{ color: "navy", textDecoration: "none" }}
                          to={`/product/${product._id}`}
                        >
                          {product.title}
                        </Link>
                      </List>
                      <List>
                        商品樣式：
                        {product?.color ? product.color : product.pattern}
                      </List>
                      <List>數量：{product.quantity}</List>
                      <List>單價：{product.price}</List>
                    </Detail>
                  </Product>
                ))}
              {order?.products.length > 3 && (
                <ShowMore onClick={handleShowMore}>
                  {displayPackages === 3 ? "顯示全部" : "顯示部分"}
                </ShowMore>
              )}
              <Price>運費：{order?.shipping}</Price>
              <Price>商品總價：{order?.amount}</Price>
              <Price text="total">
                付款金額：{order?.amount + order?.shipping}
              </Price>
            </InfoContainer>
          </Card>
          <Card>
            <InfoContainer>
              <Info>
                <Title>訂單資訊</Title>
                <List>訂單編號：{order?._id}</List>
                <List>訂單狀態：{order?.status}</List>
                <List>付款方式：{order?.payment?.method}</List>
                <List>付款狀態：{order?.payment?.status}</List>
              </Info>
              <Info>
                <Title>寄送資訊</Title>
                <List>收件人：{order?.recevier}</List>
                <List>收件地址：{order?.address}</List>
                <List>聯絡電話：{order?.phone}</List>
              </Info>
              <LinkContainer>
                <CustomLink to="/profile/order">回訂單一覽</CustomLink>
              </LinkContainer>
            </InfoContainer>
          </Card>
        </>
      )}
    </Container>
  );
};

export default SingleOrder;
