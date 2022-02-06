import { useState } from "react";
import styled from "styled-components";
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
  font-size: 16px;
  font-weight: normal;
`;
const Select = styled.select`
  padding: 0px 10px;
  border-radius: 10px;
  border: none;
  letter-spacing: 1px;
  border: 1px solid gray;
`;
const AdminChart = ({ data, title, dataKey, margin, year, setYear }) => {
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
  return (
    <Container margin={margin}>
      <Top>
        <Title>{title}</Title>
        <Select valye={year} onChange={(e) => setYear(e.target.value)}>
          <option>{new Date().getFullYear()}</option>
          <option>{new Date().getFullYear() - 1}</option>
        </Select>
      </Top>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
