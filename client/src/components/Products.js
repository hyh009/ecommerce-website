import { useEffect, useCallback } from "react";
import styled from "styled-components";
import { tabletBig, tablet, mobile } from "../responsive";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PaletteIcon from "@mui/icons-material/Palette";
import ImageIcon from "@mui/icons-material/Image";
import ClearTwoTone from "@mui/icons-material/ClearTwoTone";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/apiCall";

const Container = styled.div`
  position: relative;
  flex: 1;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafaf2;
  flex-direction: column;
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
`;
const ImageContainer = styled.div`
  overflow: hidden;
  display: flex;
  width: 95%;
  height: 75%;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
const Info = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: all 0.5s ease;
  &:hover {
    opacity: 1;
  }
`;

const Desc = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: teal;
  transform: scale(0);
  transition: all 0.5s ease;
  z-index: 3;
  padding: 20px;
  color: white;
  line-height: 200%;
  &.scaleUp {
    transform: scale(1);
  }
`;

const CustomClearTwoTone = styled(ClearTwoTone)`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    background-color: #f6f0fa;
  }
`;

const CustomShoppingCartOutlinedIcon = styled(ShoppingCartOutlinedIcon)`
  &:hover {
    color: darkblue;
  }
`;

const CustomFavoriteIcon = styled(FavoriteIcon)`
  color: ${(props) => (props.like === "true" ? "red" : "black")};
  &:hover {
    color: red;
  }
`;

const CustomSearchIcon = styled(SearchIcon)`
  color: black;
  &:hover {
    color: teal;
  }
`;

const Title = styled.span`
  font-size: 1rem;
  font-weight: 200;
  margin-bottom: 5px;
  transform: translateY(-10px);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 70%;
`;

const CustomPaletteIcon = styled(PaletteIcon)`
  color: white;
  &.css-i4bv87-MuiSvgIcon-root {
    ${tablet({ fontSize: "28px" })};
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.name === "pattern" ? "#ffa122" : "teal"};
  z-index: 2;
  cursor: pointer;
  &:hover ${CustomPaletteIcon} {
    color: lightgray;
  }
  ${tabletBig({ width: "3.5vmin", height: "3.5vmin" })};
  ${tablet({ width: "5vmin", height: "5vmin" })};
  ${mobile({ width: "10vmin", height: "10vmin" })};
`;

const Color = styled.div`
  height: 25px;
  width: 40px;
  border: 1px solid #eee;
  position: absolute;
  top: ${(props) => props.index * 25 + 40}px;
  background-color: ${(props) => props.color};
  display: ${(props) => (props.show ? "block" : "none")};
  z-index: 3;
  &:hover {
    filter: brightness(80%);
  }
`;
const PatternText = styled.span`
  font-size: 0.9rem;
  color: white;
  ${mobile({ fontSize: "1rem" })}
`;

const Pattern = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  text-align: center;
  height: 35px;
  width: 180px;
  position: absolute;
  right: 0;
  top: ${(props) => props.index * 35 + 40}px;
  border-bottom: 0.5px solid #eee;
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: rgba(200, 200, 200, 0.8);
  }

  &:hover ${PatternText} {
    color: black;
  }
`;

const CurstomImageIcon = styled(ImageIcon)`
  color: white;
  &.css-i4bv87-MuiSvgIcon-root {
    ${tablet({ fontSize: "28px" })};
  }
`;
const Product = ({ item }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const accessToken = useSelector((state) => state.user.accessToken);
  const [display, setDisplay] = useState(false);
  const [desc, setDesc] = useState(false);
  const checkLike = useCallback(() => {
    return user?.like?.includes(item._id);
  }, [user, item._id]);
  const [like, setLike] = useState(() => checkLike());

  // on mounse enter & leave event handler
  const showBlock = (e) => {
    setDisplay(true);
  };
  const hideBlock = (e) => {
    setDisplay(false);
  };

  // handle add wishlist (only for login user)
  const handleWish = (e) => {
    if (user) {
      if (!like) {
        const updatedLike = { _id: user._id, like: [...user.like, item._id] };
        updateUser(dispatch, updatedLike, accessToken);
      } else {
        const removedLike = user.like.filter(
          (productId) => productId !== item._id
        );
        const updatedLike = { _id: user._id, like: removedLike };
        updateUser(dispatch, updatedLike, accessToken);
      }
    } else {
      window.alert("請先登入會員");
    }
  };

  // check if heart icon is black or red after every time user updated (like is a column in User schema)
  useEffect(() => {
    if (user) {
      setLike(() => checkLike());
    }
  }, [user, checkLike]);

  return (
    <Container>
      {item.colors.length > 0 && (
        <LogoContainer
          name="color"
          onMouseEnter={showBlock}
          onMouseLeave={hideBlock}
        >
          <CustomPaletteIcon />
          {item.colors.map((color, index) => (
            <Color
              key={color._id}
              color={color.code}
              index={index}
              title={color.name}
              show={display}
            />
          ))}
        </LogoContainer>
      )}
      {item.patterns.length > 0 && (
        <LogoContainer
          name="pattern"
          onMouseEnter={showBlock}
          onMouseLeave={hideBlock}
        >
          <CurstomImageIcon />
          {item.patterns.map((pattern, index) => (
            <Pattern key={index} index={index} title={pattern} show={display}>
              <PatternText>{pattern}</PatternText>
            </Pattern>
          ))}
        </LogoContainer>
      )}

      <Title>{item.name}</Title>

      <ImageContainer>
        <Image src={item.imgs[0].src} alt={item.imgs[0].desc} />
      </ImageContainer>
      <Info title={item.name}>
        <Desc
          className={desc ? "scaleUp" : ""}
          onMouseLeave={() => setDesc(false)}
        >
          <CustomClearTwoTone onClick={() => setDesc(false)} />
          {item.desc}
        </Desc>
        <Icon title="查看商品介紹" onClick={() => setDesc(true)}>
          <CustomSearchIcon />
        </Icon>
        <Icon title="前往購買商品">
          <CustomLink to={`/product/${item._id}`}>
            <CustomShoppingCartOutlinedIcon />
          </CustomLink>
        </Icon>
        <Icon title="加入願望清單" id={item._id} onClick={handleWish}>
          <CustomFavoriteIcon like={like?.toString()} />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
