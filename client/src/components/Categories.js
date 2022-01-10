import styled from "styled-components";
import { useState, useEffect } from "react";
import { mobile } from "../responsive";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";

const Container = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 20px 0;
  position: relative;
  --cardWidth: calc(100% / ${(props) => props.catColNumber});

  ${mobile({ padding: "20px 0" })}
`;
const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, var(--cardWidth));
  transform: translateX(
    calc(${(props) => props.index} * var(--cardWidth) * -1)
  );
  transition: all 0.5s ease;
`;
const CustomArrowLeftOutlined = styled(ArrowLeftOutlined)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: -10px;
  margin: auto;
  cursor: pointer;
  z-index: 2;
  color: rgba(255, 255, 255, 0.8);
`;
const CustomArrowRightOutlined = styled(ArrowRightOutlined)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: -10px;
  margin: auto;
  cursor: pointer;
  z-index: 2;
  color: rgba(255, 255, 255, 0.8);
`;

const Categories = () => {
  const [index, setIndex] = useState(0);
  const [catColNumber, setCatColNumber] = useState();

  function handleCheckDevice() {
    if (window.innerWidth > 770) {
      setCatColNumber(4);
      setIndex(0);
    } else if (window.innerWidth < 480) {
      setCatColNumber(2);
      setIndex(0);
    } else {
      setCatColNumber(3);
      setIndex(0);
    }
  }
  useEffect(() => {
    handleCheckDevice();
    window.addEventListener("resize", handleCheckDevice);
    return () => {
      window.removeEventListener("resize", handleCheckDevice);
    };
  }, []);

  const handleSlide = (direction) => {
    if (direction === "left") {
      if (index === 0) {
        return;
      } else {
        setIndex((prev) => prev - 1);
      }
    } else if (direction === "right") {
      if (index + catColNumber >= categories.length) {
        setIndex(0);
      } else {
        setIndex((prev) => prev + 1);
      }
    }
  };
  return (
    <Container catColNumber={catColNumber}>
      <CustomArrowLeftOutlined
        style={{ fontSize: catColNumber === 2 ? "50px" : "60px" }}
        onClick={() => handleSlide("left")}
      />
      <CardContainer index={index}>
        {categories?.map((item) => (
          <CategoryItem key={item.id} item={item} />
        ))}
      </CardContainer>
      <CustomArrowRightOutlined
        style={{ fontSize: catColNumber === 2 ? "50px" : "60px" }}
        onClick={() => handleSlide("right")}
      />
    </Container>
  );
};

export default Categories;
