import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: black;
  span {
    color: white;
  }
`;

const AdminError = () => {
  return (
    <Container>
      <span>請先登入管理帳號</span>
    </Container>
  );
};

export default AdminError;
