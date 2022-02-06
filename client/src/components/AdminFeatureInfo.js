import styled from "styled-components";
import { ArrowDownward, ArrowUpward, Remove } from "@mui/icons-material";

const Container = styled.div`
  box-shadow: 0 0 10px rgba(122, 122, 122, 0.25);
  flex: 1;
  padding: 20px;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  cursor: pointer;
`;
const Title = styled.span`
  font-size: 16px;
  letter-spacing: 2px;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Amount = styled.span`
  font-size: 24px;
  letter-spacing: 2px;
  color: teal;
  font-weight: bold;
`;

const Rate = styled.span`
  margin-left: 10px;
  font-size: 12px;
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
  font-size: 12px;
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
              : "blue"
          }
        >
          {props.data?.rate}%
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
