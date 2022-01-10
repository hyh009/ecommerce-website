import React from "react";
import styled, { keyframes } from "styled-components";

const animation = keyframes`
    0% {opacity:0.8;transform:translateX(-110%); }
    50% {opacity:1;transform:translateX(0%); }
    100% {opacity:0.8;transform:translateX(calc(-110%));}
`;

const Container = styled.div`
  width: 200px;
  height: 40px;
  display: ${(props) => (props.showMessage ? "flex" : "none")};
  align-items: center;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  position: fixed;
  bottom: 20px;
  left: 5px;
  justify-content: center;
  letter-spacing: 2px;
  border-radius: 10px;
  animation: ${animation};
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  animation-timing-function: ease;
`;

const Message = ({ message, showMessage, setShowMessage }) => {
  return (
    <Container
      showMessage={showMessage}
      onAnimationEnd={() => setShowMessage(false)}
    >
      {message}
    </Container>
  );
};

export default Message;
