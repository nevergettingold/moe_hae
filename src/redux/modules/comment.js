import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import { firestore, realtime } from "../../shared/firebase";
import "moment";
import moment from "moment";
// import firebase from "firebase";
import axios from "axios";
import { actionCreators as postActions } from "./post";
import instance from "../../shared/Request";
import { getCookie } from "../../shared/Cookie";

//action type
const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
// const EDIT_COMMENT = "EDIT_COMMENT";
// const LOADING = "LOADING";

//action creators
const setComment = createAction(SET_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));
const deleteComment = createAction(DELETE_COMMENT, (commentId) => ({
  commentId,
}));
// const editComment = createAction(
//   EDIT_COMMENT,
//   (post_id, comment, comment_id) => ({
//     post_id,
//     comment,
//     comment_id,
//   })
// );
// const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  // is_loading: false,
};

//ADD COMMENT FB
const addCommentFB = (post_id, contents, userId, nickname) => {
  return function (dispatch, getState, { history }) {
    const cookie = getCookie("is_login");
    const commentDB = instance;
    // const user_info = getState().user.user;

    let comment = {
      postId: +post_id,
      userId: userId,
      nickname: nickname,
      // user_profile: user_info.user_profile,
      comment: contents,
      insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    commentDB
      .post(
        "/api/comments/write",
        { ...comment },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      )
      .then((res) => {
        console.log("댓글 작성 콘솔");
        dispatch(addComment(post_id, comment));
        alert("댓글 작성이 완료되었습니다! :)");
        window.location.reload();
      })

      .catch(function (error) {
        console.log(error);
      });
  };
};

//GET COMMENT FB
const getCommentFB = (post_id) => {
  console.log(post_id);
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      return;
    }
    instance
      .get(`/user/comments/${post_id}`)
      .then((res) => {
        let list = [];
        res.data.forEach((res) => {
          list.unshift(res);
        });
        console.log("!!!!!COMMENT 불러왔다!!!!!", list);

        dispatch(setComment(post_id, list));
      })
      .catch((err) => {
        console.log("댓글 정보를 가져올 수가 없어요! :(");
      });
  };
};

const deleteCommentFB = (commentId) => {
  const cookie = getCookie("is_login");
  console.log(cookie);
  return function (dispatch, getState) {
    if (!commentId) window.alert("댓글 정보가 없어요! :(");
    console.log(commentId);
    // instance
    //   .delete(
    //     `/api/comments/${commentId}`,
    //     { commentId: commentId },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${cookie}`,
    //       },
    //     } //
    //   )
    axios({
      method: "delete",
      url: `http://3.34.193.226/api/comments/${commentId}`,
      data: {
        commentId: commentId,
      },
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    })
      .then((res) => {
        dispatch(deleteComment(commentId));
        window.alert("댓글이 삭제되었습니다!");
      })
      .catch((error) => {
        console.log("axios: comment delete 통신 오류", error);
        window.alert(
          "댓글 삭제를 실패하였습니다! :( \n관리자에게 문의하시길 바랍니다."
        );
      });

    //delete 후 comment count api
    axios({
      method: "post",
      url: `http://3.34.193.226/api/count/${commentId}`,
      data: {
        commentId: commentId,
      },
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log("axios: comment delete 통신 오류", error);
        window.alert(
          "댓글 카운트를 실패하였습니다! :( \n관리자에게 문의하시길 바랍니다."
        );
      });
  };
};

// //EDIT COMMENT FB
// const editCommentFB = (post_id) => {
//   return function (dispatch, getState, { history }) {
//     if (!post_id) {
//       return;
//     }
//   };
// };

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.comment;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id].unshift(action.payload.comment); //push로 주면 배열의 맨 마지막에 쌓이기 때문에, 뷰에서 맨 밑에 쌓인다. 따라서 배열의 맨 앞에 쌓는 unshift로 넘겨준다
      }),
    // [EDIT_COMMENT]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.list[action.payload.post_id].unshift(action.payload.comment); //push로 주면 배열의 맨 마지막에 쌓이기 때문에, 뷰에서 맨 밑에 쌓인다. 따라서 배열의 맨 앞에 쌓는 unshift로 넘겨준다
    //   }),
    [DELETE_COMMENT]: (state, action) => produce(state, (draft) => {}),
    // let delete_list = draft.list.filter((cur) => {
    //   return cur.commentId !== action.payload.commentId;
    // });
    // draft.list = { ...delete_list };

    // [LOADING]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.is_loading = action.payload.is_loading;
    //   }),
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  setComment,
  addComment,
  addCommentFB,
  deleteCommentFB,
  deleteComment,
  // editCommentFB,
};

export { actionCreators };
