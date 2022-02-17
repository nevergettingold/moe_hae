import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CardList from "../components/CardList";
import CardSwiper from "../components/CardSwiper";
import instance from "../shared/Request";
import HomeSubBanner from "../components/HomeSubBanner";

import { actionCreators as postActions } from "../redux/modules/post";
import dislike from "../svg/dislike.svg";

const Home = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.post_list);
  const best_list = useSelector((state) => state.post.best_list);

  React.useEffect(() => {
    dispatch(postActions.getBestPostFB());
    dispatch(postActions.getPostFB());
  }, []);

  return (
    <Container>
      <div className="best-header">
        <h3>
          <span>이번 주의</span>
          <span>
            <strong>BEST </strong>관심
          </span>
        </h3>
      </div>
      <CardSwiper best_list={best_list} />
      <HomeSubBanner />
      <div className="board-header">
        <h3>
          <span>
            지금 일어나는,
            <strong> 순간들</strong>
          </span>
        </h3>
      </div>
      <CardList post_list={post_list} />
    </Container>
  );
};

const Container = styled.div`
  .best-header {
    margin-bottom: 4rem;
    padding: 0 0.5rem;
    h3 {
      font-size: 2.4rem;
      font-weight: 500;
      span {
        &:first-child {
          display: block;
          margin-bottom: 1rem;
        }
        &:last-child {
          padding-left: 4rem;
        }
        strong {
          font-size: 3.2rem;
          font-weight: 900;
        }
      }
    }
  }
  .board-header {
    margin-bottom: 4rem;
    padding: 0 0.5rem;
    h3 {
      font-size: 2.4rem;
      font-weight: 500;
      span {
        strong {
          font-size: 3.2rem;
          font-weight: 900;
        }
      }
    }
  }
`;

export default Home;
