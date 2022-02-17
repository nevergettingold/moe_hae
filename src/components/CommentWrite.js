import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Btn, Input } from "../elements/element";
import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const [comment_text, setCommentText] = React.useState();
  const user_info = useSelector((state) => state.user?.user);

  // console.log(user_info);
  const { post_id } = props;
  console.log(post_id);

  const onChange = (e) => {
    setCommentText(e.target.value);
  };
  console.log(comment_text);
  const write = () => {
    if (!user_info) {
      alert("로그인 먼저 부탁드려요!");
      window.location.replace("/login");
      return;
    }
    dispatch(
      commentActions.addCommentFB(
        post_id,
        comment_text,
        user_info.userId,
        user_info.nickname
      )
    );
    setCommentText("");
    console.log(comment_text);
  };
  return (
    <CommentWrap>
      <Input
        is_submit
        placeholder="댓글 내용을 입력해주세요 :)"
        _onChange={onChange}
        value={comment_text}
        onSubmit={write}
        width="100%"
      />

      <Btn _click={write} text="작성" />
    </CommentWrap>
  );
};

const CommentWrap = styled.div`
  margin-bottom: 4rem;
  width: 100%;
  display: flex;
  div {
    width: 100%;
    input {
      padding: 1.4rem;
      border-radius: 0.5rem 0 0 0.5rem;
      border-right: 0;
    }
  }
  button {
    min-width: 8rem;
    border: 0.1rem solid #e2e2e2;
    border-radius: 0 0.5rem 0.5rem 0;
    padding: 0.7rem 0.5rem;
    font-size: 1.4rem;
  }
`;

export default CommentWrite;
