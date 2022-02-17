import React from "react";
import { Navigate } from "react-router-dom";
import styled, { css } from "styled-components";

const Button = (props) => {
  const { text, _click, style, border } = props;

  return (
    <Btn type="click" onClick={_click} style={style} border={border}>
      {text}
    </Btn>
  );
};

const Btn = styled.button`
  padding: 1rem;
  color: ${(props) => (!props.border ? "#888888;" : "#444444;")};
  font-weight: 700;
  border: ${(props) => (!props.border ? "0;" : "border: 1px solid #dddddd;")};
  transition: 0.3s;
  &:hover {
    transition: 0.3s;
    ${(props) =>
      !props.border
        ? css`
            color: #000000;
          `
        : css`
            background-color: #000000;
            color: #ffffff;
          `}
  }
`;

export default Button;
