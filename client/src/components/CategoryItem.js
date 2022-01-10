import styled from "styled-components";
import { mobile, tabletBig } from "../responsive";
import { Link } from "react-router-dom";

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  opacity: 0.8;
  filter: brightness(70%);
  ${mobile({ height: "40vh" })}
`;

const Button = styled.button`
  border: none;
  padding: 5px 10px;
  font-size: 3.5vmin;
  background-color: white;
  cursor: pointer;
  color: black;
  font-weight: 700;
  letter-spacing: 2px;
  transition: all 0.5s ease;
  ${tabletBig({ fontSize: "2.5vmin" })}

  &:hover {
    background-color: black;
  }
`;

const Container = styled.div`
  padding: 2px;
  height: 70vh;
  width: 100%;
  position: relative;
  ${tabletBig({ height: "40vh" })}

  :hover ${Image} {
    filter: brightness(50%);
  }
  &:hover ${Button} {
    background-color: black;
    color: white;
  }
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;
const Title = styled.h3`
  font-size: 4.5vmin;
  font-weight: 450;
  text-shadow: 2px 2px 4px #000000;
  letter-spacing: 5px;
  color: white;
  ${tabletBig({ fontSize: "3vmin" })}
  ${mobile({ fontSize: "4vmin" })}
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.title}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
