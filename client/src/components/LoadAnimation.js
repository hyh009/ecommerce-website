import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { mobile, tabletBig } from "../responsive";
import TextAnimation from "./TextAnimation";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const animation = keyframes`
    0% {transform:translateY(0%);}
    30% {transform:translateY(-60%); }
    70% {transform:translateY(-30%); }
    100% {transform:translateY(-100% );}
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  &.animation {
    animation: ${animation};
    animation-duration: 3s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;
const CoverImgContainer = styled.div`
  display: flex;
  width: 100%;
  height: ${(props) => (props.isFetching ? "0px" : "100vh")};
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CoverImg = styled.img`
  object-position: right 70%;
  object-fit: cover;
  height: 100%;
  width: 100%;
  opacity: 1;
  ${mobile({ objectPosition: "80%" })}
`;

const CoverText = styled.div`
  font-weight: 500;
  letter-spacing: 8px;
  position: absolute;
  top: 10%;
  left: 0;
  right: 0;
  margin: auto;
  writing-mode: vertical-rl;
  color: white;
  user-select: none;
  width: max-content;
`;

const Click = styled.div`
  font-family: "Aldrich", cursive;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 10%;
  text-align: center;
  cursor: pointer;
  font-size: 5vmin;
  letter-spacing: 2px;
  text-shadow: 1px 1px 4px #808080;
  font-weight: bold;
  color: white;
  padding: 5px;
  width: max-content;
  ${tabletBig({ fontSize: "8vmin" })}
  user-select:none;
`;

const LoadAnimation = ({ showAnimation, setShowAnimation }) => {
  const [isFetching, setIsFetching] = useState(true);

  return (
    <Container className={showAnimation ? "animation" : ""}>
      {isFetching && (
        <ProgressContainer>
          <Box sx={{ width: "30%" }}>
            <LinearProgress />
          </Box>
          <span style={{ textAlign: "center", width: "100%" }}>
            資料讀取中...
          </span>
        </ProgressContainer>
      )}

      <CoverImgContainer device="small" isFetching={isFetching}>
        <CoverImg
          src={
            "https://res.cloudinary.com/dh2splieo/image/upload/v1646313543/shop_website/imgs/cover/straw_rainbow_cover_z6gvtp.png"
          }
          onLoad={() => setIsFetching((prev) => !prev)}
          alt="封面照片"
        />
        {!isFetching && (
          <CoverText>
            <TextAnimation text="墊一店" />
            <br />

            <TextAnimation order="second" text="用液態矽膠照顧你的生活" />
          </CoverText>
        )}
        {!isFetching && (
          <Click
            title="點擊進入"
            onClick={() => setShowAnimation((prev) => !prev)}
          >
            Enter
          </Click>
        )}
      </CoverImgContainer>
    </Container>
  );
};

export default LoadAnimation;
