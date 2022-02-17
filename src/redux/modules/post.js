import { createAction, handleActions } from "redux-actions";
import { uploadString, ref, getDownloadURL } from "firebase/storage";
import { produce } from "immer";
import "moment";
import moment from "moment";

import { db, storage } from "../../shared/firebase";
import { actionCreator as imgActions } from "./image";
import instance from "../../shared/Request";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";

// import Like from "../../components/Like";

const SET_POST = "SET_POST";
const SET_BESTPOST = "SET_BESTPOST";
const SET_MYLIKEPOST = "SET_MYLIKEPOST";
const SET_MYPOST = "SET_MYPOST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";
const LIKE_POST = "LIKE_POST";
const DELETE_POST = "DELETE_POST";

//Action Creators

//Call NormalList
const setPost = createAction(SET_POST, (list) => ({ list }));
const setBestPost = createAction(SET_BESTPOST, (list) => ({ list }));
const setMyPost = createAction(SET_MYPOST, (list) => ({ list }));
const setMyLikePost = createAction(SET_MYLIKEPOST, (list) => ({ list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const deletePost = createAction(DELETE_POST, (postId) => ({ postId }));
// const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const likePost = createAction(LIKE_POST, (post_id, likeCount) => ({
  post_id,
  likeCount,
}));

// const dislikePost = createAction(DISLIKE_POST, (post_id, post) => ({
//   post_id,
//   post,
// }));

// const deletePost = createAction(DELETE_POST, (post_id) => ({
//   post_id,
// }));

const initialState = {
  post_list: [],
  best_list: [],
  my_list: [],
  my_like_list: [],
  is_loading: false,
  // paging: { start: null, next: null, size: 3 },
};

// 게시글 Sample
const initialPost = {
  like: {
    like_cnt: 0,
    is_check: false,
  },
  comment_cnt: 0,
};

//middlewares
const addPostFB = (title = "", contents = "", image) => {
  return async function (dispatch, getState) {
    // userId와 nikname을 state에서 불러오기
    const user = getState().user.user;
    const cookie = getCookie("is_login");
    const _img = getState().image.preview;
    if (!_img) {
      alert("이미지를 선택해주세요!");
      return;
    }
    //초기 리스트값
    const _list = {
      ...initialPost,
      userId: user.userId,
      nickname: user.nickname,
    };

    // 약속한 api url로 정했던 데이터를 전송
    axios({
      method: "post",
      url: "http://3.34.193.226/api/post/write",
      data: {
        userId: user.userId,
        title: title,
        content: contents,
        // "imageUrl" : image,
      },
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    })
      .then((res) => {
        alert("소중한 순간이 작성 중입니다! 잠시만 기다려주세요! :)");
        //console.log(res);
        let _post = {
          ..._list,
          postId: res.data.postId,
          insert_dt: res.data.createdAt,
        };
        const postId = res.data.postId;

        const storageRef = ref(storage, `images/${postId}`);
        const _upload = uploadString(storageRef, _img, "data_url").then(
          (snapshot) => {
            console.log("Uploaded a data_url string!");
            getDownloadURL(snapshot.ref)
              .then((url) => {
                console.log(url);

                return url;
              })
              .then((url) => {
                const new_post = { ..._post, imageUrl: url };
                console.log(new_post);

                axios({
                  method: "put",
                  url: "http://3.34.193.226/api/post/write/image",
                  data: {
                    postId: postId,
                    imageUrl: url,
                  },
                  headers: {
                    Authorization: `Bearer ${cookie}`,
                  },
                })
                  .then(() => {
                    console.log("post작성완료");
                    dispatch(addPost(new_post));
                    dispatch(imgActions.setPreview(null));
                    alert("소중한 순간이 작성되었습니다! :)");
                    window.location.replace("/mypage");
                  })
                  .catch((error) => {
                    console.log("이미지업로드 후, axios통신 error", error);
                  });
              })
              .catch((error) => {
                window.alert("포스트 작성에 문제가 생겼습니다");
                console.log("getDownloadURL 이미지업로드 문제", error);
                //window.location.replace('/');
              });
          }
        );
      })
      .catch((error) => {
        window.alert("이미지를 선택해주세요!");
        console.log("addPost axios first error", error);
      });
  };
};

const editPostFB = (postId = null, post = {}) => {
  return function (dispatch, getState) {
    if (!postId) {
      console.log("게시물 정보가 없어요!");
      return;
    }
    //console.log("넘어온 id", postId)
    const cookie = getCookie("is_login");
    const _img = getState().image.preview;
    const _post_idx = getState().post.post_list.findIndex(
      (p) => parseInt(p.postId) === parseInt(postId)
    );
    const _post = getState().post.post_list[_post_idx];

    //console.log("찾은 포스터",_post);
    //console.log(_img)
    //console.log(_post.imageUrl)
    //console.log(_img === _post.imageUrl)
    if (_img === _post.imageUrl) {
      axios({
        method: "put",
        url: `http://3.34.193.226/api/post/write/${postId}`,
        data: {
          postId: postId,
          imageUrl: _post.imageUrl,
          title: post.title,
          content: post.contents,
        },
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      })
        .then((res) => {
          dispatch(editPost(postId, { ...post }));
          alert("수정이 완료되었습니다!:)");
          window.location.replace("/mypage");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const user_id = getState().user.user.userid;
      const storageRef = ref(storage, `images/${postId}`);
      const _upload = uploadString(storageRef, _img, "data_url");
      // const _upload = storage
      //     .ref(`images/${user_id}_${new Date().getTime()}`)
      //     .putString(_image, "data_url");

      dispatch(imgActions.deleteImgFB(postId));
      _upload.then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            console.log(url);

            return url;
          })
          .then((url) => {
            const imageUrl = url;

            axios({
              method: "put",
              url: `http://3.34.193.226/api/post/write/${postId}`,
              data: {
                postId: postId,
                imageUrl: url,
                title: post.title,
                content: post.contents,
              },
              headers: {
                Authorization: `Bearer ${cookie}`,
              },
            })
              .then((res) => {
                dispatch(editPost(postId, { ...post, imageUrl: imageUrl }));
                alert("수정이 완료되었습니다!:)");
                window.location.replace("/mypage");
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            window.alert("앗! 이미지 업로드에 문제가 있어요!");
            console.log("앗! 이미지 업로드에 문제가 있어요!", error);
          });
      });
    }
  };
};

const deletePostFB = (postId) => {
  return async function (dispatch, getState) {
    if (!postId) window.alert("데이터 아이디가 없네요");
    const cookie = getCookie("is_login");

    axios({
      method: "delete",
      url: `http://3.34.193.226/api/post/${postId}`,
      data: {
        postId: postId,
      },
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(imgActions.deleteImgFB(postId));
        dispatch(deletePost(postId));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//GET POST FB
const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    const postDB = instance;
    let all_list = [];
    // let best_list = [];
    // let normal_list = [];

    postDB.get("/user/main").then((res) => {
      console.log("!!!!!전체 LIST 서버에서 가져왔다!!!!!", res.data);
      res.data.forEach((list) => {
        let post = Object.keys(list).reduce((acc, cur) => {
          return { ...acc, [cur]: list[cur] };
        }, {});
        all_list.push(post);
      });
      dispatch(setPost(all_list));
    });
  };
};

const getBestPostFB = () => {
  return function (dispatch, getState, { history }) {
    let best_list = [];
    instance
      .get("/user/best")
      .then((res) => {
        console.log("!!!!!BEST LIST 서버에서 가져왔다!!!!!", res.data);
        res.data.forEach((a) => best_list.push(a));
        dispatch(setBestPost(best_list));
      })
      .catch((err) => {
        console.log("mypage my_list error", err);
      });
  };
};

// dispatch(setPost(post_list, paging));
//     console.log("GET POST FB");

// let _paging = getState().post.paging;

// if (_paging.start && !_paging.next) {
//   return;
//   //next data가 없으면 바로 return
// }

// dispatch(loading(true));
// const postDB = firestore.collection("post");

// let query = postDB.orderBy("insert_dt", "desc");
// //desc를 써서 시간 내림차순 (최신 -> 예전), limit로 가져올 Data 수 제한

// if (start) {
//   query = query.startAt(start);
// }

// query
//   .limit(size + 1) //size + 1개를 다 가져왔으면, size개짜리 (redux에서 3개로 설정) 리스트에서 다음 페이지가 있다는 것을 의미

//   .get()
//   .then((docs) => {
//     let post_list = [];

//     let paging = {
//       start: docs.docs[0],
//       next:
//         docs.docs.length === size + 1
//           ? docs.docs[docs.docs.length - 1]
//           : null,
//       size: size,
//     };

//     docs.forEach((doc) => {
//       // DB와 Post component의 데이터 모양 맞추기
//       let _post = doc.data();

//       let post = Object.keys(_post).reduce(
//         //reduce를 쓰기 위해 Object.keys를 써서 key값만 빼고 array형태로 만들어 줌
//         (acc, cur) => {
//           if (cur.indexOf("user_") !== -1) {
//             //!==-1 은 포함이 된다는 뜻
//             return {
//               ...acc,
//               user_info: { ...acc.user_info, [cur]: _post[cur] },
//             };
//           }
//           return { ...acc, [cur]: _post[cur] };
//         },
//         { id: doc.id, user_info: {} }
//       );
//       post_list.push(post);
//     });

//     if (paging.next !== null) {
//       post_list.pop();
//     }

//     dispatch(setPost(post_list, paging));
//     console.log("GET POST FB");
//   });

const getOnePostFB = (id) => {
  return function (dispatch, getState, { history }) {
    const cookie = getCookie("is_login");
    const session_id = localStorage.getItem("user");

    // const postDB = firestore.collection("post");
    // const postDB = instance;
    // postDB.get(`/user/post/${id}`).then((res) => {
    axios({
      method: "post",
      url: `http://3.34.193.226/user/post/detail`,
      data: {
        userId: session_id ? session_id : 0,
        postId: id,
      },
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    })
      .then((res) => {
        console.log("res다", res);
        //console.log("onepost res값", [{...res.data, likeCount: res.data.likeDto.likeCount}])
        dispatch(
          setPost([{ ...res.data, likeCount: res.data.likeDto.likeCount }])
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
//여기까지 저장

const likePostFB = (post_id, _is_Check, like_Count) => {
  return function (dispatch, getState, { history }) {
    const session_id = localStorage.getItem("user");
    const cookie = getCookie("is_login");
    console.log("포스트 아이디", post_id);
    console.log("치크체크초크", _is_Check);
    instance
      .put(
        `/api/posts/${post_id}`,
        {
          postId: post_id,
          userId: session_id,
          is_Check: _is_Check,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      )
      .then(() => {
        const num = _is_Check ? 1 : -1;
        const _likeCount = {
          likeCount: like_Count + num,
          likeDto: { likeCount: like_Count + num, is_check: _is_Check },
        };
        console.log("num", num);
        console.log("likeCount 카운트 전", like_Count);
        console.log("_likeCount 카운트 후", _likeCount);
        dispatch(likePost(post_id, _likeCount));
      });
  };
};

const getMyLikePostFB = () => {
  const cookie = getCookie("is_login");
  const session_id = localStorage.getItem("user");
  return function (dispatch, getState, { history }) {
    // let list = [];
    instance
      .post(
        "/api/post/mylikepage",
        { userId: session_id },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      )
      .then((res) => {
        console.log("!!!!!MY LIKE LIST 서버에서 가져왔다!!!!!", res.data);
        // const data = list.push(res.data);
        // console.log("순서", data);
        dispatch(setMyLikePost(Array.from(res.data).reverse()));
      })
      .catch((err) => {
        console.log("mypage my_list error", err);
      });
  };
};
const getMyPostFB = () => {
  const cookie = getCookie("is_login");
  const session_id = localStorage.getItem("user");
  return function (dispatch, getState, { history }) {
    console.log(session_id);
    instance
      .post(
        "/api/post/mypage",
        { userId: session_id },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      )
      .then((res) => {
        console.log(
          "!!!!!MY LIST 서버에서 가져왔다!!!!!",
          Array.from(res.data).reverse()
        );
        dispatch(setMyPost(Array.from(res.data).reverse()));
      })
      .catch((err) => {
        console.log("mypage my_list error", err);
      });
  };
};

// reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list.push(...action.payload.list);

        // 중복 post 처리
        draft.post_list = draft.post_list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.postId === cur.postId) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.postId === cur.postId)] = cur;
            return acc;
          }
        }, []);

        // if (action.payload.paging) {
        //   draft.paging = action.payload.paging;
        // }
        // draft.is_loading = false;
      }),

    [SET_BESTPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.best_list.push(...action.payload.list);

        // 중복 post 처리
        draft.best_list = draft.best_list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.postId === cur.postId) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.postId === cur.postId)] = cur;
            return acc;
          }
        }, []);
      }),

    [SET_MYPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.my_list.unshift(...action.payload.list);

        // 중복 post 처리
        draft.my_list = draft.my_list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.postId === cur.postId) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.postId === cur.postId)] = cur;
            return acc;
          }
        }, []);
      }),

    [SET_MYLIKEPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.my_like_list.unshift(...action.payload.list);

        // 중복 post 처리
        draft.my_like_list = draft.my_like_list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.postId === cur.postId) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.postId === cur.postId)] = cur;
            return acc;
          }
        }, []);
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list.unshift(action.payload.post);
      }),

    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.post_list.findIndex(
          (p) => p.id === action.payload.post_id
        );

        draft.post_list[idx] = {
          ...draft.post_list[idx],
          ...action.payload.post,
        };
      }),

    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        let delete_list = draft.post_list.filter((cur) => {
          return cur.postId !== action.payload.postId;
        });
        draft.post_list = { ...delete_list };
        alert("게시물이 삭제되었습니다!");
        window.location.replace("/");
      }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),

    [LIKE_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.post_list.findIndex(
          (p) => p.id === action.payload.post_id
        );
        draft.post_list[idx] = {
          ...draft.post_list[idx],
          ...action.payload.likeCount,
        };
      }),

    // [DISLIKE_POST]: (state, action) =>
    //   produce(state, (draft) => {
    //     let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
    //     draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
    //   }),
  },
  initialState
);

// action creator export
const actionCreators = {
  setPost,
  setBestPost,
  setMyLikePost,
  setMyPost,
  getMyLikePostFB,
  getMyPostFB,
  addPost,
  addPostFB,
  editPost,
  editPostFB,
  getPostFB,
  getOnePostFB,
  deletePostFB,
  likePostFB,
  getBestPostFB,
  // dislikePostFB,
};

export { actionCreators };
