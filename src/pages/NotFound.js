import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = (prop) => {
  const navigate = useNavigate();
  return (
    <>
      <h1>주소가 올바르지 않아요!</h1>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </>
  );
};

export default NotFound;
