import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { tabletBig, mobile } from "../responsive";
import { Chart, ProfileCart, UserInfo } from "../components";
import OrderService from "../services/order.service";
import { Stars, AccountCircle } from "@mui/icons-material";
import { Helmet } from "react-helmet";

const Container = styled.div`
  grid-column: 2/6;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  ${tabletBig({ gridColumn: "1/2", gridTemplateColumns: "repeat(1,1fr)" })}
`;

const Middle = styled.div`
  grid-column: 1/2;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${tabletBig({ gridColumn: "1/2", gridRow: "2/3" })}
`;
const MiddleTop = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  flex: 1;
  ${mobile({ gridTemplateColumns: "repeat(1,1fr)" })}
`;
const SmallBlock = styled.div`
  display: flex;
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  border-radius: 10px;
  padding: 5px;
  flex-direction: column;
  justify-content: space-evenly;
`;

const BadgeTitle = styled.span`
  font-size: 12px;
  letter-spacing: 1px;
  color: #545454;
`;
const BadgeContent = styled.span`
  font-size: 20px;
  text-align: center;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 20px;
    color: #104646;
  }
`;

const Calc = styled.span`
  font-size: 9px;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 14px;
    color: #fce149;
  }
`;

const MiddleBottom = styled.div`
  flex: 2;
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  border-radius: 10px;
`;

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const accessToken = useSelector((state) => state.user.accessToken);
  const [userSpent, setUserSpent] = useState([]);
  const [amountToVIP, setAmountToVIP] = useState(5000);
  const MONTHS = useMemo(
    () =>
      [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ].map((month) => ({
        name: month,
      })),
    []
  );
  //get User spent every month in current year
  useEffect(() => {
    const getSpent = async () => {
      try {
        const res = await OrderService.getUserSpent(user._id, accessToken);
        res.data.map((item) =>
          setUserSpent(() =>
            MONTHS.map(
              (row, index) =>
                (item._id.month - 1 === index &&
                  Object.assign(row, { 消費金額: item.total })) ||
                Object.assign(row, { 消費金額: 0 })
            )
          )
        );
      } catch (err) {
        console.log(err);
      }
    };
    // calculate the amount to become VIP menber
    getSpent();
  }, [user]);

  useEffect(() => {
    const getVipAmount = () => {
      let vipAmount = 5000;
      userSpent.forEach((monthData) => (vipAmount -= monthData["消費金額"]));
      return vipAmount;
    };
    setAmountToVIP(() => getVipAmount());
  }, [userSpent]);

  return (
    <Container>
      <Helmet>
        <title>{`${user.username}的頁面 | 墊一店`}</title>
        <meta name="description" content="用戶頁面，查看用戶資訊。"></meta>
      </Helmet>
      <Middle>
        <MiddleTop>
          <SmallBlock>
            <BadgeTitle>今年度會員分級</BadgeTitle>
            {user.lank === "普通會員" ? (
              <BadgeContent>
                <AccountCircle />
                {user.lank}
              </BadgeContent>
            ) : (
              <BadgeContent>
                <Stars />
                {user.lank}
              </BadgeContent>
            )}
            <Calc>消費折扣：{amountToVIP > 0 ? "無" : "消費享9折優惠"}</Calc>
          </SmallBlock>
          <SmallBlock>
            <BadgeTitle>下年度會員分級</BadgeTitle>

            {amountToVIP > 0 ? (
              <BadgeContent>
                <AccountCircle />
                普通會員
              </BadgeContent>
            ) : (
              <BadgeContent>
                <Stars />
                VIP會員
              </BadgeContent>
            )}

            <Calc>
              {amountToVIP > 0
                ? `再消費 NT${amountToVIP} 升級VIP會員`
                : `恭喜下年度升級VIP會員`}
            </Calc>
          </SmallBlock>
          <SmallBlock>
            <BadgeTitle>我的優惠券</BadgeTitle>
            <BadgeContent>{user?.coupon?.length}</BadgeContent>
            <Calc>本月過期優惠券0</Calc>
          </SmallBlock>
        </MiddleTop>
        <Chart
          title="會員分級達成圖"
          desc="年累積消費滿NT$5000(不含運費)下年度升級VIP會員，購物享9折優惠。"
          data={userSpent}
          dataKey="消費金額"
          gap={amountToVIP}
        />
        <MiddleBottom>
          <ProfileCart />
        </MiddleBottom>
      </Middle>
      <UserInfo edit={false} />
    </Container>
  );
};

export default Profile;
