import { keyframes } from "styled-components";

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const moving = keyframes`
    
  from {

    right: 0%;
    transform: translateX(100%);
  }
  to {
    right:99%;
    transform: translateX(100%);
  }
`;

export const buttonHover = keyframes`
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
`;

export const scaleUp = keyframes`
  0% {
        transform: scale(0);
    }
  100% {
        transform: scale(1);
  }
`;

export const modalFadein = keyframes`
  0% {
    opacity:0;
    }
  100% {
    opacity:1;
    display:flex;
  }
`;