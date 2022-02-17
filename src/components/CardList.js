import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post";

import NormalList from "./NormalList";

const CardList = (props) => {
  const post_list = props.post_list;

  return (
    <List>
      {/* <ListHeader>
        <Category style={{ width: "9rem" }}>활동</Category>
        <Category style={{ width: "95rem" }}>
          제목 <br />
          닉네임 내용
        </Category>
        <Category style={{ width: "100px" }}>관심 수</Category>
        <Category style={{ width: "100px" }}>댓글 수 </Category>
      </ListHeader> */}
      {[...post_list].map((list, idx) => {
        return <NormalList key={idx} post_list={list} />;
      })}
    </List>
  );
};

const List = styled.div`
  border-top: 1px solid #000000;
`;

const ListHeader = styled.div`
  padding: 15px;
  border-bottom: 1px solid green;
  justify-content: flex-start;
`;

const Category = styled.div`
  padding-left: 1px;
  display: inline-block;
`;

export default CardList;
