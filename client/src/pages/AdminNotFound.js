import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: black;
  span {
    color: white;
  }
`;

const AdminNotFound = () => {
  return <Container>404 page not found</Container>;
};

export default AdminNotFound;
