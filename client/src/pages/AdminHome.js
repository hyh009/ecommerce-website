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
import { tabletBig } from "../responsive";
import { v4 as uuidv4 } from "uuid";

const Container = styled.div`
  padding: 20px;
  grid-column: 2/6;
  width: 100%;
  ${tabletBig({
    minHeight: "calc(100vh - 80px)",
    gridColumn: "1/2",
    padding: "10px 0",
    marginTop: "10px",
  })}
`;

const FeatureContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 20px;
  gap: 20px;
  ${tabletBig({
    flexDirection: "column",
  })}
`;

const WedgeContainer = styled.div`
  display: flex;
  padding: 0 20px;
  gap: 10px;

  ${tabletBig({
    flexDirection: "column",
    gap: "20px",
    width: "100vw",
    overflow: "hidden",
  })}
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
        新增用戶: 0,
      })),
    []
  );

  useEffect(() => {
    let mounted = true;
    const getStats = async () => {
      try {
        const res = await UserService.getStats(year, accessToken);

        if (mounted) {
          setUserStats(() =>
            MONTHS.map((month, index) => {
              let updateData = month;
              res.data.forEach((item) => {
                if (item._id.month === index + 1) {
                  updateData = { ...month, 新增用戶: item.total };
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
    getStats();
    return () => {
      mounted = false;
    };
  }, [MONTHS, year, accessToken]);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const CurrentYear = new Date().getFullYear();
        const CurrentMonth = new Date().getMonth();

        const res = await OrderService.getIncome(
          CurrentYear,
          accessToken,
          CurrentMonth
        );
        const newData = res.data.map((data, index) => {
          return {
            title: `${data._id}月銷售金額`,
            amount: data.total,
            rate:
              Math.floor(
                ((res.data[index]?.total * 100) / res.data?.[index - 1]?.total -
                  100) *
                  100
              ) / 100,
          };
        });
        setFeatureData(newData.reverse());
      } catch (err) {
        console.log(err);
      }
    };
    getIncome();
  }, [accessToken]);

  return (
    <Container>
      <FeatureContainer>
        {featureData.map((data) => (
          <AdminFeatureInfo key={uuidv4()} data={data} />
        ))}
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
