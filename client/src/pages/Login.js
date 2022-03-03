import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { tabletBig, mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCall";
import { getCartData, updateCart, checkProductInCart } from "../redux/apiCall";
import { Helmet } from "react-helmet";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(122, 122, 122, 0.5)
    ),
    url("https://res.cloudinary.com/dh2splieo/image/upload/v1640706201/shop_website/imgs/cover/cover1_j6l2we.jpg");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  background-position: center;
  ${tabletBig({ backgroundPosition: "bottom right" })}
`;
const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  background: rgba(255, 255, 255, 1);
  ${tabletBig({ width: "60%" })}
  ${mobile({ width: "85%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 1px;
  text-align: center;
  margin-bottom: 10px;
  ${tabletBig({ fontSize: "32px", margin: "10px" })}
  ${mobile({ fontSize: "28px", margin: "5px" })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  width: 100%;
  background: white;
  border: 1px solid lightgray;
  margin: 5px 0;
  padding: 8px 5px;
  ${tabletBig({ fontSize: "24px", padding: "10px 8px", margin: "15px" })}
  ${tabletBig({ fontSize: "22px", padding: "10px 8px", margin: "10px" })}
  &:hover {
    filter: brightness(95%);
  }
`;

const LinkContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const CustomLink = styled(Link)`
  color: black;
  font-size: 14px;
  ${tabletBig({ fontSize: "18px" })}
`;

const Button = styled.button`
  margin-top: 10px;
  width: 30%;
  border: none;
  padding: 5px;
  cursor: pointer;
  background: #ffa211;
  text-align: center;
  ${tabletBig({ fontSize: "20px", marginTop: "20px" })}
  ${tabletBig({ fontSize: "18px", marginTop: "15px" })}
  &:disabled {
    color: #ffa211;
    cursor: not-allowed;
  }
`;

const Error = styled.div`
  background-color: pink;
  color: #545454;
  width: 100%;
  border-radius: 10px;
  font-size: 14px;
  color: red;
  letter-spacing: 2px;
  padding: 5px;
`;
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, errMessage } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const accessToken = useSelector((state) => state.user.accessToken);

  //將未登入時加入購物車的產品儲存至資料庫
  const getSavedCart = useCallback(
    async (user, mounted) => {
      const productsInTempCart = [...cart.products];
      // get saved cart from database
      let savedCart = await getCartData(dispatch, user, accessToken);
      if (mounted) {
        if (productsInTempCart.length > 0) {
          //if there are some products in the cart before login
          let newProducts;
          let repeat;
          if (savedCart?.products?.length > 0) {
            //if there are some products in database
            productsInTempCart.forEach((newProduct) => {
              [repeat, newProducts] = checkProductInCart(
                savedCart.products,
                newProduct,
                newProduct.quantity
              );
              if (!repeat) {
                //new items not in the cart
                newProducts.push(newProduct);
                savedCart.products = newProducts;
              } else {
                //new items already in the cart (just add quantity)
                savedCart.products = newProducts;
              }
            });
            //update redux & DB
            return updateCart(dispatch, user, newProducts, accessToken);
          }
          //no savedCart but have tempCart
          return updateCart(dispatch, user, productsInTempCart, accessToken);
        }
      }
    },
    [accessToken, cart, dispatch]
  );
  // handle login
  const handleClick = async (e) => {
    e.preventDefault();
    await login(dispatch, { email, password });
  };

  useEffect(() => {
    let mounted = true;
    if (user) {
      getSavedCart(user, mounted);
    }
    return () => {
      mounted = false;
      navigate("/profile");
    };
  }, [user, getSavedCart, navigate]);

  return (
    <Container>
      <Helmet>
        <title>用戶登入 | 墊一店</title>
        <meta name="description" content="登入墊一店會員。"></meta>
      </Helmet>
      <Wrapper>
        <Title>登入帳號</Title>
        {errMessage && <Error>{errMessage}</Error>}
        <Form>
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="密碼"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            autocomplete="on"
          />

          <Button onClick={handleClick} disabled={isFetching}>
            登入
          </Button>

          <LinkContainer>
            <CustomLink to="/">忘記密碼</CustomLink>
            <CustomLink to="/register">註冊會員</CustomLink>
          </LinkContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
