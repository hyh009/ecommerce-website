import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { tabletBig, tablet, mobile } from "../responsive";
import Products from "./Products";
import ProductService from "../services/product.service";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: 1fr;
  ${tabletBig({ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" })};
  ${tablet({
    padding: "20px 0",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  })};
  ${mobile({
    padding: "20px 0",
    gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
  })};
`;
const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70vh;
  gap: 20px;
  grid-column: 1/5;
  ${tabletBig({ height: "50vh", gridColumn: "1/4" })};
  ${tablet({ gridColumn: "1/3" })}
  ${mobile({ gridColumn: "1/2" })}
`;

const NocontentContainer = styled.div`
  grid-column: 1/5;
  width: 100%;
  display: flex;
  height: 60vh;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  gap: 20px;
  ${tabletBig({ flexDirection: "column", gap: "40px" })};
`;

const NocontentImg = styled.img`
  height: 70%;
  object-fit: cover;
  ${tabletBig({ height: "50%" })};
  ${mobile({ height: "40%" })};
`;
const NocontentText = styled.span`
  font-size: 5vmin;
  letter-spacing: 2px;
`;
const Popular = ({ sort, filters }) => {
  const [items, setItems] = useState([]);
  const [filtereditems, setFiltereditems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let mounted = true;
    let timer;
    const getProducts = async () => {
      setIsFetching(true);
      try {
        if (typeof filters === "undefined") {
          const res = await ProductService.getAll();
          if (mounted) {
            setFiltereditems(() => res.data.slice(0, 8));
          }
        } else {
          const res = await ProductService.getAll(filters.category);
          if (mounted) {
            setItems(res.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
      timer = setTimeout(() => setIsFetching(false), 500);
    };
    getProducts();
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [filters]);

  useEffect(() => {
    if (filters && "color" in filters) {
      let result = [];
      let recordedName = [];
      if (filters.color === "all") {
        result = items;
      } else if (filters.color === "others") {
        items.forEach(
          (item) =>
            (Object.values(item.patterns).length > 0 && // Add products with patterns
              result.push(item) &&
              recordedName.push(item.name)) ||
            Object.values(item.colors).forEach(
              // filter colors not included in filters
              (i) =>
                !recordedName.includes(item.name) &&
                ![
                  "紅",
                  "橘",
                  "黃",
                  "綠",
                  "藍",
                  "靛",
                  "紫",
                  "黑",
                  "白",
                  "灰",
                ].some((color) => i.name.includes(color)) &&
                result.push(item) &&
                recordedName.push(item.name)
            )
        );
      } else {
        items.forEach((item) =>
          Object.values(item.colors).forEach(
            (i) =>
              !recordedName.includes(item.name) &&
              i.name.includes(filters.color) &&
              result.push(item) &&
              recordedName.push(item.name)
          )
        );
      }

      setFiltereditems(result);
    } else {
      if (typeof filters === "undefined") {
        return;
      } else {
        setFiltereditems(items);
      }
    }
  }, [items, filters]);

  useEffect(() => {
    if (sort) {
      if (sort === "asc") {
        setFiltereditems((prev) => [...prev].sort((a, b) => a.price - b.price));
      } else if (sort === "desc") {
        setFiltereditems((prev) => [...prev].sort((a, b) => b.price - a.price));
      } else if (sort === "newest") {
        setFiltereditems((prev) =>
          [...prev].sort(
            (a, b) =>
              new Date(b?.createdAt?.split("T")[0]) -
              new Date(a?.createdAt?.split("T")[0])
          )
        );
      }
    }
  }, [sort]);
  return (
    <Container>
      {isFetching ? (
        <ProgressContainer>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
          <span style={{ textAlign: "center", width: "100%" }}>
            資料讀取中...
          </span>
        </ProgressContainer>
      ) : filtereditems.length > 0 ? (
        filtereditems.map((item) => <Products key={item._id} item={item} />)
      ) : (
        <NocontentContainer>
          <NocontentImg src="https://res.cloudinary.com/dh2splieo/image/upload/v1641970932/shop_website/imgs/undraw_notify_re_65on_q6oigl.svg" />
          <NocontentText>目前沒有尋找中的商品...</NocontentText>
        </NocontentContainer>
      )}
    </Container>
  );
};

export default Popular;
