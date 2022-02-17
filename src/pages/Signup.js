import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { emailCheck } from "../shared/emailvalidate";

/* Source */
import { actionCreator as userActions } from "../redux/modules/user";

/* Componenet */
import { Title } from "../components/component";

/* Elements */
import { Btn } from "../elements/element";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState("");

  const checkId = () => {
    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }
    dispatch(userActions.IdCheckFB(id));
  };

  const checkNickname = () => {
    dispatch(userActions.NiknameCheckFB(nickname));
  };

  const signup = () => {
    if (id === "" || pwd === "" || nickname === "") {
      window.alert("아이디, 닉네임, 비밀번호를 모두 입력해주세요!");
      return;
    }
    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }
    if (pwd !== pwd_check) {
      window.alert("비밀번호와 비밀번호 확인이 일치하지 않습니다!");
      return;
    }
    dispatch(userActions.signupFb(id, nickname, pwd));
  };

  return (
    <React.Fragment>
      <Title text={"회원가입"} />
      <Form>
        <div className="form-list">
          <label>
            <input
              type="text"
              onChange={(e) => {
                setId(e.target.value);
              }}
              placeholder="이메일을 입력해주세요"
              className="with-btn"
            />
          </label>
          <Btn border _click={() => checkId()} text={"중복확인"} />
        </div>
        <div className="form-list">
          <label>
            <input
              type="text"
              onChange={(e) => {
                setNickname(e.target.value);
              }}
              placeholder="닉네임을 입력해주세요"
              className="with-btn"
            />
          </label>
          <Btn border _click={() => checkNickname()} text={"중복확인"} />
        </div>
        <div className="form-list">
          <label>
            <input
              type="password"
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              placeholder="비밀번호를 입력해주세요"
            />
          </label>
        </div>
        <div className="form-list">
          <label>
            <input
              type="password"
              onChange={(e) => {
                setPwdCheck(e.target.value);
              }}
              placeholder="비밀번호를 재입력해주세요"
            />
          </label>
        </div>
        {/* <Btn _click={() => signup()} text={"회원가입하기"}/> */}
      </Form>
      <FormFoot>
        <Btn border _click={() => signup()} text={"회원가입하기"} />
      </FormFoot>
    </React.Fragment>
  );
};
const Form = styled.div`
  margin: 4rem auto 0 auto;
  width: 40rem;
  display: flex;
  flex-direction: column;
  .form-list {
    display: flex;
    label {
      flex: 4;
      margin-bottom: 3rem;
      width: 100%;
      input {
        padding: 0 1rem;
        width: 100%;
        height: 4rem;
        border: 1px solid #dddddd;
        border-radius: 5px;
        &.with-btn {
          border-radius: 5px 0 0 5px;
        }
      }
    }
    button {
      flex: 1;
      height: 4rem;
      border-left: 0;
      font-size: 1.5rem;
      border-radius: 0 5px 5px 0;
    }
  }
  .form-list + .form-list {
    margin-top: 1rem;
  }
`;

const FormFoot = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    border-radius: 0.5rem;
  }
`;
export default Signup;
