import React from "react";
import styled, { keyframes } from "styled-components";
import { mobile } from "../responsive";

// define function to create css by loop

const duration = 0.1; // the delay time of each word in animation
const arrayLength = 11; // longest length of the texts

function template(i, duration) {
  return `
          &:nth-child(${i + 1}) {
            animation-delay: ${`${duration * i}s`};
           }
        `;
}

function getAnimations(arrayLength) {
  let str = "";
  for (let index = 0; index < arrayLength; index++) {
    str += template(index, duration);
  }
  return str;
}

const animation = keyframes`
    0% {opacity:0; transform:translateY(-100px) skewY(20deg) skewX(20deg) rotate(30deg); filter:blur(10px);}
    30% {opacity:1;transform:translateY(0)skewY(0deg) skewY(0deg) rotate(0deg); filter:blur(0);}
    70% {opacity:1;transform:translateY(0)skewY(0deg) skewX(0deg) rotate(0deg); filter:blur(0);}
    100% {opacity:0;transform:translateY(-100px )skewY(20deg) skewX(20deg) rotate(30deg); filter:blur(10px);}


`;

const Container = styled.span`
  display: inline-block;
  margin-left: 10px;
  font-weight: 700;
  text-shadow: 1px 1px 4px #808080;
  margin-top: ${(props) => (props.order === "second" ? "30px" : 0)};

  span {
    display: inline-block;
    opacity: 0;
    font-size: 3.5vmin;
    animation: ${animation};
    animation-duration: 6s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1.5;
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    animation-delay: 2s;
    ${getAnimations(arrayLength)}
    ${mobile({
      fontSize: "5vmin",
    })};
  }
`;

const TextAnimation = (props) => {
  const textArray = props.text.split("");

  return (
    <Container order={props.order}>
      {textArray.map((text, index) => (
        <span key={index}>{text}</span>
      ))}
    </Container>
  );
};

export default TextAnimation;
