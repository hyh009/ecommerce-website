import styled from "styled-components";
import { tabletBig, tablet, mobile } from "../responsive";
import React, { useState } from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { sliderItems } from "../data";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 90px);
  display: flex;
  position: relative;
  overflow: hidden;
  ${tabletBig({ minHeight: "max-content", height: "auto" })}
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  transition: all 1.5s ease;
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100%;
  justify-content: center;
  ${tabletBig({ minHeight: "max-content" })}
`;
const InnerBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
  ${tabletBig({ flexDirection: "column" })}
`;
const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  ${tabletBig({ width: "90%", aspectRatio: "1/1", flex: "auto" })}
  ${tablet({ width: "85%" })}
`;

const Image = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  ${tabletBig({
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "40px 20px",
    gap: "20px",
    flex: "auto",
    aspectRatio: "1/0.75",
  })}
`;

const Title = styled.h1`
  font-size: 6vmin;
  color: black;
  letter-spacing: 5px;
  font-weight: 500;
  text-shadow: 2px 2px lightgray;
  ${tabletBig({
    textAlign: "center",
    fontSize: "5vmin",
  })}
`;
const Description = styled.p`
  margin: 50px 0px;
  font-size: 4vmin;
  color: black;
  line-height: 6vmin;
  letter-spacing: 2px;
  ${tabletBig({
    textAlign: "center",
    margin: "20px 10px",
    lineHeight: "7vmin",
  })}
  ${mobile({
    margin: "10px 10px",
  })}
`;
const Button = styled.button`
  background: transparent;
  letter-spacing: 2px;
  font-size: 20px;
  padding: 5px 8px 5px 10px;
  cursor: pointer;
  border: 2px solid black;
  color: black;
  transition: all 0.5s ease;
  text-shadow: 1px 1px lightgray;
  ${tabletBig({
    fontSize: "3vmin",
  })}

  &:hover {
    background-color: black;
    color: white;
    text-shadow: none;
  }
`;

const Arrow = styled.div`
  width: 30px;
  height: 50px;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 2;
  margin: auto;
  left: ${(props) => props.direction === "left" && "0"};
  right: ${(props) => props.direction === "right" && "0"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: rgb(221, 221, 221);
  opacity: 0.8;
  &:hover {
    filter: brightness(90%);
  }
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 3);
    } else {
      setSlideIndex(slideIndex < 3 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow
        className="wrapper"
        direction="left"
        onClick={() => handleClick("left")}
      >
        <ArrowBackIosOutlinedIcon style={{ fontSize: 24 }} />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide key={item.id} active={item.id}>
            <InnerBlock bg={item.bg}>
              <ImgContainer>
                <Image src={item.img} alt={item.title} />
              </ImgContainer>
              <InfoContainer>
                <Title>{item.title}</Title>
                <Description>{item.description}</Description>
                <Link to={"/product/" + item.product_id}>
                  <Button>{item.button}</Button>
                </Link>
              </InfoContainer>
            </InnerBlock>
          </Slide>
        ))}
      </Wrapper>

      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowForwardIosOutlinedIcon style={{ fontSize: 24 }} />
      </Arrow>
    </Container>
  );
};

export default Slider;
