import React from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

//Components
import {
  Home,
  MyPage,
  CardDetail,
  NotFound,
  NormalListDetail,
  Login,
  Signup,
  Write,
} from "../pages/page";
import { Header, Banner } from "../components/component";

/* Source */
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreator as userActions } from "../redux/modules/user";
import { getCookie } from "../shared/Cookie";

//CSS
import "../css/App.css";

function App() {
  const dispatch = useDispatch();
  const cookie = getCookie("is_login");
  console.log("쿠키 : " + cookie);

  const is_token = cookie ? true : false;

  React.useEffect(() => {
    if (!is_token) {
      return;
    }
    if (is_token) {
      dispatch(userActions.loginCheckFB(cookie));
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Banner />
      <Wrap>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/write" element={<Write />} />
          <Route path="/write/:id" element={<Write />} />
          <Route path="/post/:id" element={<CardDetail />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Wrap>
    </div>
  );
}
const Wrap = styled.div`
  padding: 6rem 0 10rem;
  width: 1280px;
  margin: 0 auto;
  @media screen and (max-width: 1280px) {
    width: 100%;
    padding: 6rem 2rem 10rem;
  }
`;
export default App;
