import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import UserService from "../services/user.service";
import OrderService from "../services/order.service";
import { useSelector } from "react-redux";
import {
  AdminFeatureInfo,
  AdminChart,
  AdminWedgeS,
  AdminWedgeB,
} from "../components";

import { v4 as uuidv4 } from "uuid";

const Container = styled.div`
  flex: 4;
  padding: 0 20px;
`;

const FeatureContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const WedgeContainer = styled.div`
  display: flex;
  padding: 0 20px;
`;

const AdminHome = () => {
  const [userStats, setUserStats] = useState([]);
  const [featureData, setFeatureData] = useState([]);
  const accessToken = useSelector((state) => state.user.accessToken);
  const [year, setYear] = useState(new Date().getFullYear());

  const MONTHS = useMemo(
    () =>
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ].map((month) => ({
        name: month,
      })),
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await UserService.getStats(year, accessToken);
        res.data.map((item) =>
          setUserStats(() =>
            MONTHS.map(
              (row, index) =>
                (item._id - 1 === index &&
                  Object.assign(row, { 新增用戶: item.total })) ||
                Object.assign(row, { 新增用戶: 0 })
            )
          )
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS, year]);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await OrderService.getIncome(
          new Date().getFullYear(),
          accessToken,
          new Date().getMonth()
        );
        console.log(res.data);
        // let newData = res.data.map((data) => {
        //   if (data._id === monthObject.month + 1) {
        //     return {
        //       title: monthObject.title,
        //       amount: data.total,
        //     };
        //   }
        // });
        // if (!newData[0]) {
        //   newData = [{ title: monthObject.title, amount: 0 }];
        // }
        // setFeatureData((prev) => [...prev, ...newData]);

        // setFeatureData([
        //   {
        //     title: "本月成交金額",
        //     amount: thisYearData.data[]?.total || 0,
        //     rate:
        //       Math.floor(
        //         ((res.data[1]?.total * 100) / res.data[0]?.total - 100) * 100
        //       ) / 100,
        //   },
        // ]);
      } catch (err) {
        console.log(err);
      }
    };
    // getIncome({ month: new Date().getMonth(), title: "本月成交金額" });
    // getIncome({ month: new Date().getMonth() - 1, title: "上月成交金額" });
    getIncome();
  }, []);

  console.log(featureData);

  return (
    <Container>
      <FeatureContainer>
        <AdminFeatureInfo key={uuidv4()} data={featureData[0]} />
        <AdminFeatureInfo key={uuidv4()} data={featureData[1]} />
      </FeatureContainer>
      <AdminChart
        data={userStats}
        title="新註冊用戶"
        dataKey="新增用戶"
        year={year}
        setYear={setYear}
      />
      <WedgeContainer>
        <AdminWedgeS />
        <AdminWedgeB />
      </WedgeContainer>
    </Container>
  );
};

export default AdminHome;
