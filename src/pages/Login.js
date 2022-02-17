import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

/* Source */
import { actionCreator as userActions } from "../redux/modules/user";

/* Componenet */
import { Title } from "../components/component";

/* Elements */
import { Btn } from "../elements/element";

const Login = (props) => {
  const dispatch = useDispatch();
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const changeId = (e) => {
    setId(e.target.value);
  };

  const changePwd = (e) => {
    setPwd(e.target.value);
  };

  const login = () => {
    if (id === "" || pwd === "") {
      window.alert("아이디/비밀번호를 확인해주세요");
      return;
    }
    console.log("로그인진행중");
    dispatch(userActions.loginFB(id, pwd));
  };

  return (
    <React.Fragment>
      <Title text={"로그인"} />
      <Form>
        <div className="form-list">
          <label>
            <input
              value={id}
              onChange={changeId}
              type="text"
              placeholder="아이디를 입력하세요."
            />
          </label>
        </div>
        <div className="form-list">
          <label>
            <input
              value={pwd}
              onChange={changePwd}
              type="password"
              placeholder="비밀번호를 입력하세요."
            />
          </label>
        </div>
      </Form>
      <FormFoot>
        <Btn border _click={login} text={"로그인"} />
      </FormFoot>
    </React.Fragment>
  );
};
const Form = styled.form`
  margin: 5rem auto 0 auto;
  width: 40rem;
  display: flex;
  flex-direction: column;
  .form-list {
    display: flex;
    label {
      flex: 4;
      margin-bottom: 2rem;
      width: 100%;
      input {
        padding: 0 1rem;
        width: 100%;
        height: 4rem;
        border: 1px solid #dddddd;
        border-radius: 0.5rem;
      }
    }
    button {
      flex: 1;
      height: 4rem;
      /* border-left: 0; */
    }
  }
  .form-list + .form-list {
    /* margin-top: 2rem; */
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
// const Form = styled.form`
//     margin: 0 auto;
//     width: 20rem;
//     display: flex;
//     flex-direction: column;
//     label{
//         margin-bottom: 3rem;
//         input{
//             padding: 0 1rem;
//             width: 100%;
//             height: 2rem;
//             line-height: 2rem;
//         }
//     }
// `
export default Login;
