import React from "react";
import ReactPlayer from "react-player/youtube";
import styled from "styled-components";
import { tabletBig } from "../responsive";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 16 / 9;
  width: 60%;
  margin: 50px 0;
  ${tabletBig({ width: "100%" })}

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`;
const Video = () => {
  return (
    <Container>
      <ReactPlayer
        controls
        url="https://www.youtube.com/watch?v=9VnjHmoevXA"
        className="react-player"
        width="100%"
        height="100%"
        config={{
          youtube: { playerVars: { origin: "https://www.youtube.com" } },
        }}
      />
    </Container>
  );
};

export default Video;
