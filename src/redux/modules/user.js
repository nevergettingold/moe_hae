import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

import instance from "../../shared/Request";
import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// action creators
const logOut = createAction(LOG_OUT, (username) => ({ username }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// initialState
const initialState = {
  user: null,
  is_Login: false,
};

const user_initial = {
  user_name: "user_test",
};

//  middleware Actions
const loginFB = (id, pwd) => {
  return function (dispatch, getState) {
    //axious id, pwd전송/ 토큰요청
    // console.log("id : " + id,  "pwd : " + pwd)
    axios
      .post("http://3.34.193.226/user/login", {
        username: id,
        password: pwd,
      })
      .then((res) => {
        const accessToken = res.headers.authorization.split(" ")[1];
        console.log("로그인후 데이터", res);
        // console.log("res header 데이터", res.headers)
        // console.log("jwt",accessToken)
        dispatch(
          setUser({
            username: id,
            nickname: res.data.nickname,
            userId: res.data.userId,
          })
        );
        console.log(res.data);
        setCookie("is_login", id, accessToken);
        alert("로그인이 완료되었습니다!");
        window.location.replace("/");
      })
      .catch((error) => {
        alert("잘못된 유저 정보입니다!");
        window.location.reload();
        console.log(error);
      });
  };
};

const signupFb = (id, nickname, pwd) => {
  return function (dispatch, getState) {
    console.log("id : " + id, "pwd : " + pwd, "nick : " + nickname);
    instance
      .post("/user/signup", {
        username: id,
        nickname: nickname,
        password: pwd,
      })
      .then((res) => {
        console.log(res);
        if (res.data.statusHttp === "NG") {
          console.log("회원데이터기입 오류");
          window.alert(
            "아이디/닉네임/비밀번호를 확인해주세요\n아이디/닉네임 중복확인이 필요합니다."
          );
        } else {
          console.log("회원가입 성공");
          window.alert("환영합니다!\n회원가입이 완료되셨습니다");
          window.location.replace("/login");
        }
      })
      .catch((error) => {
        console.log("회원가입 오류", error);
        window.alert("아이디/닉네임/비밀번호를 확인해주세요");
      });
  };
};

const loginCheckFB = (token_key) => {
  return function (dispatch, getState) {
    axios({
      method: "post",
      url: "http://3.34.193.226/check/user",
      headers: {
        "content-type": "applicaton/json;charset=UTF-8",
        accept: "application/json",
        Authorization: `Bearer ${token_key}`,
      },
    })
      .then((res) => {
        if (res.data.check) {
          console.log("로그인유지중");
          dispatch(
            setUser({
              username: res.data.username,
              nickname: res.data.nickname,
              userId: res.data.userId,
            })
          );
        } else {
          dispatch(logOut());
          console.log("로그아웃 되었어요");
        }
      })
      .catch((error) => {
        console.log("로그유지 에러발생");
        console.log(error.code, error.message);
      });
  };
};

const logoutFB = () => {
  return function (dispatch, getState) {
    const username = getState().user.user.username;
    dispatch(logOut(username));
  };
};

const IdCheckFB = (id) => {
  return function (dispatch, getState) {
    console.log("아이디가 들어와버렷", id);
    instance
      .post("/user/checkid", {
        username: id,
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          console.log("아이디 사용가능");
          window.alert("사용 가능한 아이디입니다!");
        } else {
          console.log("아이디 중복");
          window.alert("이미 사용중인 아이디입니다!");
        }
      })
      .catch((error) => {
        console.log("axios:/user/signup/checkid:post 관련 통신에러발생", error);
      });
  };
};

const NiknameCheckFB = (nickname) => {
  return function (dispatch, getState) {
    console.log("닉네임이 들어와버렷", nickname);
    instance
      .post("/user/checknik", {
        nickname: nickname,
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          console.log("닉네임 사용가능");
          window.alert("사용 가능한 닉네임입니다!");
        } else {
          console.log("닉네임 중복");
          window.alert("이미 사용중인 닉네임입니다!");
        }
      })
      .catch((error) => {
        console.log(
          "axios:/user/signup/checknik:post 관련 통신에러발생",
          error
        );
      });
  };
};

//reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_Login = true;
        localStorage.setItem("user", action.payload.user.userId);
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        localStorage.removeItem("user");
        sessionStorage.removeItem(action.payload.username);
        deleteCookie("is_login");
        draft.user = null;
        draft.is_Login = false;
        window.location.replace("/");
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export
const actionCreator = {
  logOut,
  getUser,
  signupFb,
  loginFB,
  loginCheckFB,
  logoutFB,
  IdCheckFB,
  NiknameCheckFB,
};

export { actionCreator };
