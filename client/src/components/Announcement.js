import styled, { keyframes } from "styled-components";
import { mobile } from "../responsive";
const Container = styled.div`
  height: 30px;
  width: 100%;
  background-color: #ffa122;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })};
`;

const moving = keyframes`
    
  from {

    right: 0%;
    transform: translateX(100%);
  }
  to {
    right:99%;
    transform: translateX(100%);
  }
`;

const Text = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  position: absolute;
  top: 5px;
  right: 0;
  animation: ${moving} 20s linear;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  white-space: nowrap;
`;
const Announcement = () => {
  return (
    <Container>
      <Text>2021/11/15 ~ 2021/12/1 全店結帳滿300打9折，滿500折8折！</Text>
    </Container>
  );
};

export default Announcement;
