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
  font-size: 0.75rem;
  letter-spacing: 1px;
  color: #545454;
`;
const BadgeContent = styled.span`
  font-size: 1.25rem;
  text-align: center;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 1.25rem;
    color: #104646;
  }
`;

const Calc = styled.span`
  font-size: 0.56rem;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 0.875rem;
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
  //get User spent every month in current year
  const MONTHS = useMemo(
    () =>
      [
        "1???",
        "2???",
        "3???",
        "4???",
        "5???",
        "6???",
        "7???",
        "8???",
        "9???",
        "10???",
        "11???",
        "12???",
      ].map((month) => ({
        name: month,
        ????????????: 0,
      })),
    []
  );
  useEffect(() => {
    let mounted = true;
    const getSpent = async () => {
      try {
        const res = await OrderService.getUserSpent(user._id, accessToken);
        if (mounted) {
          setUserSpent(() =>
            MONTHS.map((month, index) => {
              let updateData = month;
              res.data.forEach((item) => {
                if (item._id.month === index + 1) {
                  updateData = { ...month, ????????????: item.total };
                  return;
                }
              });
              return updateData;
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    };

    getSpent();
    return () => {
      mounted = false;
    };
  }, [user, MONTHS, accessToken]);

  useEffect(() => {
    const getVipAmount = () => {
      let vipAmount = 5000;
      userSpent.forEach((monthData) => (vipAmount -= monthData["????????????"]));
      setAmountToVIP(vipAmount);
    };
    if (userSpent) {
      getVipAmount();
    }
  }, [userSpent]);

  return (
    <Container>
      <Helmet>
        <title>{`${user.username}????????? | ?????????`}</title>
        <meta name="description" content="????????????????????????????????????"></meta>
      </Helmet>
      <Middle>
        <MiddleTop>
          <SmallBlock>
            <BadgeTitle>?????????????????????</BadgeTitle>
            {user.lank === "????????????" ? (
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
            <Calc>???????????????{amountToVIP > 0 ? "???" : "?????????9?????????"}</Calc>
          </SmallBlock>
          <SmallBlock>
            <BadgeTitle>?????????????????????</BadgeTitle>

            {amountToVIP > 0 ? (
              <BadgeContent>
                <AccountCircle />
                ????????????
              </BadgeContent>
            ) : (
              <BadgeContent>
                <Stars />
                VIP??????
              </BadgeContent>
            )}

            <Calc>
              {amountToVIP > 0
                ? `????????? NT${amountToVIP} ??????VIP??????`
                : `?????????????????????VIP??????`}
            </Calc>
          </SmallBlock>
          <SmallBlock>
            <BadgeTitle>???????????????</BadgeTitle>
            <BadgeContent>{user?.coupon?.length}</BadgeContent>
            <Calc>?????????????????????0</Calc>
          </SmallBlock>
        </MiddleTop>
        <Chart
          title="?????????????????????"
          desc="??????????????????NT$5000(????????????)???????????????VIP??????????????????9????????????"
          data={userSpent}
          dataKey="????????????"
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
