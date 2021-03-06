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
        <title>{`???????????? - ${
          cat === "all" ? "????????????" : cat
        } | ?????????`}</title>
        <meta
          name="description"
          content={`${
            categories?.cat?.desc ||
            "??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"
          }`}
        ></meta>
      </Helmet>
      <Title>{cat === "all" ? "????????????" : cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>???????????????</FilterText>
          <Select name="category" onChange={handleFilterChange}>
            <Option value="all">???????????????</Option>
            <Option value="all">????????????</Option>
            <Option>??????PAD??????</Option>
            <Option>???????????????</Option>
            <Option>???????????????</Option>
            <Option>??????????????????</Option>
            <Option>???????????????</Option>
            <Option>????????????</Option>
          </Select>
          <Select name="color" onChange={handleFilterChange}>
            <Option value="all">???????????????</Option>
            <Option>???</Option>
            <Option>???</Option>
            <Option>???</Option>
            <Option>???</Option>
            <Option>???</Option>
            <Option>???</Option>
            <Option>???</Option>
            <Option>???</Option>
            <Option>???</Option>
            <Option>???</Option>
            <Option value="others">??????</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>???????????????</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">?????????(??????)</Option>
            <Option value="desc">?????????(?????????)</Option>
            <Option value="asc">?????????(?????????)</Option>
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
