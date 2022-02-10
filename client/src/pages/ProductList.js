import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { tablet, mobile } from "../responsive";
import { Popular } from "../components";
import NotFound from "../pages/NotFound";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { categories } from "../data";
import { useNavigate } from "react-router-dom";

const Container = styled.div``;
const Title = styled.h1`
  padding: 20px;
  font-weight: 400;
  font-size: 5vmin;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  ${tablet({ flexDirection: "column" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
  ${tablet({ margin: "10px 0" })}
  ${mobile({
    flexDirection: "column",
    alignItems: "flex-start",
    margin: "0",
  })}
`;

const FilterText = styled.span`
  ${mobile({ margin: "10px 0" })}
`;

const Select = styled.select`
  margin: 0 10px;
  cursor: pointer;
  padding: 5px 0;
  border-radius: 5px;
  text-align: center;
  border: 1.5px solid black;
  background-color: white;
  ${mobile({ margin: "10px 0" })}
  &:hover {
    border: 2px solid teal;
  }
`;
const Option = styled.option``;

const ProductList = () => {
  // get the category's name from path
  const location = useLocation();
  const navigate = useNavigate();
  const cat = decodeURIComponent(location.pathname.split("/")[2]);
  const [filters, setfilters] = useState({ category: cat });
  const [sort, setSort] = useState("newest");
  const [catExist, setCatExist] = useState(true);
  const handleFilterChange = (e) => {
    if (e.target.name === "category") {
      navigate(`/products/${e.target.value}`, { replace: true });
    } else {
      const value = e.target.value;
      setfilters({ ...filters, [e.target.name]: value });
    }
  };
  useEffect(() => {
    setfilters((f) => {
      return { ...f, category: cat };
    });
    //check if category exist
    const titles = categories.map((cat) => cat.title);
    if (!titles.includes(cat) && cat !== "all") {
      setCatExist(false);
    }
  }, [cat]);

  return (
    <Container>
      <Helmet>
        <title>{`商品一覽 - ${
          cat === "all" ? "全部商品" : cat
        } | 墊一店`}</title>
        <meta
          name="description"
          content={`${
            categories?.cat?.desc ||
            "墊一店商品總覽，在這裡可以查看墊一店的所有商品，包括吸管、窗貼、門擋、靠墊、坐墊等。"
          }`}
        ></meta>
      </Helmet>
      <Title>{cat === "all" ? "全類商品" : cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>篩選商品：</FilterText>
          <Select name="category" onChange={handleFilterChange}>
            <Option value="all">請選擇分類</Option>
            <Option>隨你PAD吸管</Option>
            <Option>矽膠小餐墊</Option>
            <Option>蜂巢坐靠墊</Option>
            <Option>環保無痕窗貼</Option>
            <Option>不倒翁門擋</Option>
            <Option>矽膠鍋墊</Option>
          </Select>
          <Select name="color" onChange={handleFilterChange}>
            <Option value="all">請選擇顏色</Option>
            <Option>白</Option>
            <Option>黑</Option>
            <Option>灰</Option>
            <Option>紅</Option>
            <Option>橘</Option>
            <Option>黃</Option>
            <Option>綠</Option>
            <Option>藍</Option>
            <Option>靛</Option>
            <Option>紫</Option>
            <Option value="others">其它</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>排列順序：</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">依時間(最新)</Option>
            <Option value="desc">依價格(高到低)</Option>
            <Option value="asc">依價格(低到高)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      {catExist ? (
        <Popular filters={filters} sort={sort} />
      ) : (
        <NotFound content="category" />
      )}
    </Container>
  );
};

export default ProductList;
