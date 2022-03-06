import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { tabletBig } from "../responsive";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  CartesianGrid,
} from "recharts";
import { LabelImportant } from "@mui/icons-material";

const Container = styled.div`
  padding: 10px;
  width: 100%;
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  border-radius: 5px;
  flex: 2;
  ${tabletBig({ minHeight: "200px" })}
`;

const Title = styled.h3`
  margin: 5px;
  letter-spacing: 2px;
  font-size: 1rem;
  font-weight: normal;
  display: flex;
  align-items: center;
  svg {
    font-size: 1.25rem;
    color: teal;
  }
`;

const Desc = styled.p`
  font-size: 0.625rem;
  margin: 5px;
  letter-spacing: 1px;
`;
const Nocontent = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
`;
const Chart = ({ data, title, desc, dataKey, gap }) => {
  const [device, setDevice] = useState();

  function handleCheckDevice() {
    if (window.innerWidth > 770) {
      setDevice("md");
    } else if (window.innerWidth < 480) {
      setDevice("sm");
    } else {
      setDevice("lg");
    }
  }
  useEffect(() => {
    handleCheckDevice();
    window.addEventListener("resize", handleCheckDevice);
    return () => {
      window.removeEventListener("resize", handleCheckDevice);
    };
  }, []);

  return (
    <Container>
      <Title>
        <LabelImportant />
        {title}
        {gap > 0 ? "(未達成)" : "(已達成)"}
      </Title>
      <Desc>{desc}</Desc>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="75%">
          <BarChart
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            data={data}
          >
            <Bar dataKey={dataKey} fill="#5ecec4" />
            <CartesianGrid strokeDasharray="3 3" stroke="lightgray" />
            <Tooltip itemStyle={{ color: "teal", fontSize: "1rem" }} />
            <XAxis
              tick={{ fontSize: device === "sm" ? 10 : 14 }}
              interval={0}
              dataKey="name"
            />
            <YAxis
              width={device === "sm" ? 20 : 30}
              tick={{ fontSize: device === "sm" ? 8 : 12 }}
              type="number"
              domain={[0, 5000]}
              dataKey="消費金額"
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Nocontent>今年度尚無消費紀錄</Nocontent>
      )}
    </Container>
  );
};

export default Chart;
