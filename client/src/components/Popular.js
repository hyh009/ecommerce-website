import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { tabletBig, tablet, mobile } from "../responsive";
import Products from "./Products";
import ProductService from "../services/product.service";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  ${tabletBig({ gridTemplateColumns: "repeat(3, 1fr)" })};
  ${tablet({ padding: "20px 0", gridTemplateColumns: "repeat(2, 1fr)" })};
  ${mobile({ padding: "20px 0", gridTemplateColumns: "repeat(1, 1fr)" })};
`;

const Popular = ({ sort, filters }) => {
  const [items, setItems] = useState([]);
  const [filtereditems, setFiltereditems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        if (typeof filters === "undefined") {
          const res = await ProductService.getAll();
          setFiltereditems(res.data.slice(0, 8));
        } else {
          const res = await ProductService.getAll(filters.category);
          setItems(res.data);
          navigate(`/products/${filters.category}`, { replace: true });
        }
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
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
      setFiltereditems(items);
    }
  }, [items, filters, navigate]);

  useEffect(() => {
    if (sort === "newest") {
      setFiltereditems((prev) =>
        [...prev].sort(
          (a, b) =>
            new Date(b?.createdAt?.split("T")[0]) -
            new Date(alert?.createdAt?.split("T")[0])
        )
      );
    } else if (sort === "asc") {
      setFiltereditems((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFiltereditems((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <Container>
      {filtereditems.map((item) => (
        <Products key={item._id} item={item} />
      ))}
    </Container>
  );
};

export default Popular;
