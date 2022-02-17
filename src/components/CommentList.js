import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { getCookie } from "../shared/Cookie";
import axios from "axios";

import { Btn } from "../elements/element";
import { ReactComponent as Delete } from "../svg/commentdelete.svg";
import { useNavigate } from "react-router-dom";
import instance from "../shared/Request";
// import CommentItemTest from "./CommentItemTest";

// import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentList = (props) => {
  const { post_id } = props;
  console.log(post_id);
  const dispatch = useDispatch();
  const comment_list = useSelector((state) => state.comment.list);

  console.log(comment_list);

  React.useEffect(() => {
    if (!comment_list[post_id]) {
      dispatch(commentActions.getCommentFB(post_id));
      //
    }
  }, []);

  if (!comment_list[post_id] || !post_id) {
    return null;
  }

  return (
    <React.Fragment>
      {comment_list[post_id].map((a, idx) => {
        return (
          <CommentListWrap key={idx}>
            {/* <div>slidesPerView</div> */}
            <CommentItem {...a} />
          </CommentListWrap>
        );
      })}
    </React.Fragment>
  );
};

const CommentListWrap = styled.div`
  padding: 1rem 0.3rem;
`;

CommentList.defaultProps = {
  post_id: null,
};

export default CommentList;

const CommentItem = (props) => {
  const cookie = getCookie("is_login");
  const dispatch = useDispatch();
  const { nickname, comment, insert_dt, commentId } = props;
  const user_nickname = useSelector((state) => state.user.user?.nickname);
  const deleteComment = () => {
    dispatch(commentActions.deleteCommentFB(commentId));
    // axios({
    //   method: "post",
    //   url: `http://3.34.193.226/api/count/${commentId}`,
    //   data: {
    //     commentId: commentId,
    //   },
    //   headers: {
    //     Authorization: `Bearer ${cookie}`,
    //   },
    // })
    //   .then(() => {
    //     alert("댓글이 삭제되었습니다! :)");
    //     window.location.reload();
    //   })
    //   .catch((error) => {
    //     console.log("axios: comment delete 통신 오류", error);
    //     window.alert(
    //       "댓글 카운트를 실패하였습니다! :( \n관리자에게 문의하시길 바랍니다."
    //     );
    //   });
  };

  console.log(user_nickname);
  return (
    <Container>
      <div className="comment-wrap">
        <div className="comment-list">
          <div className="comment-info">
            <div className="comment-nickname">{nickname}</div>
            <div className="comment-contents">{comment}</div>
          </div>
          <div className="comment-created">{insert_dt}</div>
          {nickname === user_nickname && (
            <>
              {/* <Btn text="수정" _click={() => navigate(`/write/${id}`)} /> */}
              <Delete onClick={deleteComment} style={{ cursor: "pointer" }} />
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .comment-wrap {
    min-height: 3rem;
    .comment-list {
      position: relative;
      display: flex;
      justify-content: space-between;
      .comment-info {
        flex: 4;
        display: flex;
        width: 100%;
        .comment-nickname {
          flex: 1;
          min-width: 6rem;
          font-weight: 700;
        }
        .comment-contents {
          flex: 4;
          width: 100%;
        }
      }
      .comment-created {
        flex: 1;
        width: 10rem;
        text-align: right;
      }
      svg {
        position: absolute;
        top: 50%;
        right: -3rem;
        transform: translateY(-50%);
        width: 1.6rem;
        height: 1.6rem;
      }
    }
  }
`;

CommentItem.defaultProps = {
  user_name: "닉네임 테스트",
  user_id: "",
  post_id: 1,
  contents: "댓글 테스트",
  insert_dt: "2022-02-12 19:00:00",
};
