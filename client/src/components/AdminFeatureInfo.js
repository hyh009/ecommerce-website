import styled from "styled-components";
import { ArrowDownward, ArrowUpward, Remove } from "@mui/icons-material";
import { tabletBig } from "../responsive";

const Container = styled.div`
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  cursor: pointer;
  ${tabletBig({ width: "100%" })}
`;
const Title = styled.span`
  font-size: 1rem;
  letter-spacing: 2px;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Amount = styled.span`
  font-size: 1.5rem;
  letter-spacing: 2px;
  color: teal;
  font-weight: bold;
`;

const Rate = styled.span`
  margin-left: 10px;
  font-size: 0.75rem;
  font-weight: bold;
  letter-spacing: 1px;
  color: ${(props) => props.color};
`;
const CustomArrowDownward = styled(ArrowDownward)`
  margin-left: 5px;
  path {
    color: red;
  }
`;
const CustomArrowUpward = styled(ArrowUpward)`
  margin-left: 5px;
  path {
    color: green;
  }
`;
const CustomRemove = styled(Remove)`
  margin-left: 5px;
  path {
    color: #4400ff;
  }
`;
const Desc = styled.span`
  font-size: 0.75rem;
  color: #acb2ac;
  letter-spacing: 1px;
`;

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NTD",
  minimumFractionDigits: 0,
});

const AdminFeatureInfo = (props) => {
  return (
    <Container>
      <Title>{props.data?.title}</Title>
      <AmountContainer>
        <Amount>{formatter.format(props.data?.amount)}</Amount>

        <Rate
          color={
            props.data?.rate < 0
              ? "red"
              : props.data?.rate > 0
              ? "green"
              : props.data?.rate === 0
              ? "blue"
              : "gray"
          }
        >
          {props.data?.rate || "-"}%
        </Rate>
        {props.data?.rate < 0 && (
          <CustomArrowDownward style={{ fontSize: 14 }} />
        )}
        {props.data?.rate > 0 && <CustomArrowUpward style={{ fontSize: 14 }} />}
        {props.data?.rate === 0 && <CustomRemove style={{ fontSize: 14 }} />}
      </AmountContainer>
      <Desc>相較於上個月</Desc>
    </Container>
  );
};

export default AdminFeatureInfo;
