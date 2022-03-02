import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  width: 100%;
  ${mobile({ flexDirection: "column", gap: "5px" })}
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgray;
  border-radius: 5px;
`;
const Input = styled.input`
  border: none;
  padding: 2px;
`;
const AddBtn = styled.button`
  border: none;
  background-color: teal;
  cursor: pointer;
  color: white;
  padding: 3px 10px;
  border-radius: 5px;
  letter-spacing: 2px;
  margin-left: 10px;
`;

export const AdminColorInput = ({ show, setInputs, setAddInputs }) => {
  const [singleInput, setSingleInput] = useState({
    code: "#ffffff",
    name: "",
  });

  const handleInput = (e) => {
    setSingleInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleAdd = (e) => {
    e.preventDefault();
    setAddInputs((prev) => {
      return { ...prev, colors: [...prev.colors, singleInput] };
    });
    setInputs((prev) => {
      return { ...prev, colors: [...prev.colors, singleInput] };
    });

    setSingleInput({ code: "#ffffff", name: "" });
  };
  return (
    <Container style={{ display: show ? "flex" : "none" }}>
      <InputContainer>
        <Input
          maxLength="6"
          placeholder="輸入顯示名稱(6字以內)"
          name="name"
          onChange={(e) => handleInput(e)}
          value={singleInput?.name}
        />
        <Input
          type="color"
          name="code"
          style={{ cursor: "pointer" }}
          onChange={(e) => handleInput(e)}
          value={singleInput?.code}
        />
      </InputContainer>
      <AddBtn onClick={handleAdd}>新增</AddBtn>
    </Container>
  );
};

export const AdminPatternInput = ({ show, setInputs, setAddInputs }) => {
  const [singleInput, setSingleInput] = useState("");
  const handleInput = (e) => {
    setSingleInput(e.target.value);
  };
  const handleAdd = (e) => {
    e.preventDefault();
    setAddInputs((prev) => {
      return { ...prev, patterns: [...prev.patterns, singleInput] };
    });
    setInputs((prev) => {
      return { ...prev, patterns: [...prev.patterns, singleInput] };
    });
    setSingleInput("");
  };
  return (
    <Container style={{ display: show ? "flex" : "none" }}>
      <InputContainer>
        <Input
          maxLength="10"
          placeholder="輸入樣式名稱(10字以內)"
          onChange={(e) => handleInput(e)}
          value={singleInput}
        />
      </InputContainer>
      <AddBtn onClick={handleAdd}>新增</AddBtn>
    </Container>
  );
};

export const AdminNoticeInput = ({
  show,
  setInputs,
  setAddInputs,
  inputs,
  deleteEle,
}) => {
  const [singleInput, setSingleInput] = useState("");
  const handleInput = (e) => {
    setSingleInput(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (inputs.notice.length - deleteEle.notice.length >= 5) {
      return window.alert("注意事項最多5項");
    } else {
      setAddInputs((prev) => {
        return { ...prev, notice: [...prev.notice, singleInput] };
      });
      setInputs((prev) => {
        return { ...prev, notice: [...prev.notice, singleInput] };
      });
      setSingleInput("");
    }
  };
  return (
    <Container
      style={{ marginBottom: "10px", display: show ? "flex" : "none" }}
    >
      <InputContainer style={{ width: "80%" }}>
        <Input
          maxLength="35"
          placeholder="輸入注意事項"
          style={{ width: "100%" }}
          onChange={(e) => handleInput(e)}
          value={singleInput}
        />
      </InputContainer>
      <AddBtn onClick={handleAdd}>新增</AddBtn>
    </Container>
  );
};
