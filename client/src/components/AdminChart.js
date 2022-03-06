import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { tabletBig } from "../responsive";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  Tooltip,
  Line,
  CartesianGrid,
} from "recharts";

const Container = styled.div`
  padding: 20px;
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  border-radius: 5px;
  margin: ${(props) => props.margin || "20px"};
  ${tabletBig({ minHeight: "200px", width: "calc(100vw - 40px)" })}
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;
const Title = styled.h3`
  margin: 5px;
  letter-spacing: 2px;
  font-size: 1rem;
  font-weight: normal;
`;
const Select = styled.select`
  padding: 0px 10px;
  border-radius: 10px;
  border: none;
  letter-spacing: 1px;
  border: 1px solid gray;
  cursor: pointer;
  background-color: white;
`;
const AdminChart = ({ data, title, dataKey, margin, year, setYear }) => {
  const [device, setDevice] = useState();

  const handleCheckDevice = useCallback(() => {
    if (window.innerWidth > 770) {
      setDevice("md");
    } else if (window.innerWidth < 480) {
      setDevice("sm");
    } else {
      setDevice("lg");
    }
  }, []);
  useEffect(() => {
    handleCheckDevice();
    window.addEventListener("resize", handleCheckDevice);
    return () => {
      window.removeEventListener("resize", handleCheckDevice);
    };
  }, [handleCheckDevice]);

  return (
    <Container margin={margin}>
      <Top>
        <Title>{title}</Title>
        <Select valye={year} onChange={(e) => setYear(e.target.value)}>
          <option>{new Date().getFullYear()}</option>
          <option>{new Date().getFullYear() - 1}</option>
        </Select>
      </Top>
      <ResponsiveContainer
        width="100%"
        aspect={device === "sm" ? 2 / 1 : 4 / 1}
      >
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: device === "sm" ? 10 : 30,
            left: device === "sm" ? 10 : 20,
            bottom: device === "sm" ? 0 : 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="lightgray" />
          <XAxis
            interval={0}
            dataKey="name"
            tick={{ fontSize: device === "sm" ? 10 : 14 }}
          />
          <Tooltip itemStyle={{ color: "teal", fontSize: "2.5vmin" }} />
          <Line type="monotone" dataKey={dataKey} stroke="#7bcfc4" />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default AdminChart;
