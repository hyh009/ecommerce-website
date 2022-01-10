import { useEffect, useState } from "react";
import { ArrowDropUp } from "@mui/icons-material";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 90vh;
  right: 20px;
  z-index: 200;
  cursor: pointer;
  border-radius: 50%;
  background-color: rgba(56, 236, 206, 0.5);
  svg {
    color: white;
    font-size: 30px;
  }
`;

const ScrollToTopBtn = () => {
  const [isVisable, setIsVisable] = useState(false);

  const changeVisability = () => {
    if (window.pageYOffset > 500) {
      setIsVisable(true);
    } else {
      setIsVisable(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", changeVisability);

    return () => {
      window.removeEventListener("scroll", changeVisability);
    };
  }, []);
  return (
    <Container
      style={{ display: isVisable ? "flex" : "none" }}
      onClick={scrollToTop}
    >
      <ArrowDropUp />
    </Container>
  );
};
export default ScrollToTopBtn;
