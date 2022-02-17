import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import instance from "../shared/Request";

const Card = (props) => {
  const { list } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Box>
      <img src={list.imageUrl} alt="" />
      <div
        className="dim"
        onClick={() => navigate(`/post/${list.postId}`)}
      ></div>
      <div className="card-info">
        <div className="card-title">
          <span>Title.</span>
          <span>{list.title}</span>
        </div>
        <div className="card-content">
          <span>Content.</span>
          <span>{list.content}</span>
        </div>
        <div className="card-date">
          <span>Date</span>
          <span>{list.createdAt.slice(0, 10)}</span>
        </div>
      </div>
    </Box>
  );
};
const Box = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  .dim {
    z-index: 5;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }
  .card-info {
    padding: 0 2rem;
    width: 100%;
    z-index: 6;
    position: absolute;
    left: 0rem;
    bottom: 1rem;
    color: #ffffff;
    div + div {
      margin-top: 0.4rem;
    }
    div {
      display: flex;
      justify-content: space-between;
      width: 100%;
      span {
        display: block;
        font-size: 2.5rem;
        font-weight: 500;
        &:first-child {
          font-weight: 900;
          width: 25%;
        }
        &:last-child {
          display: -webkit-box;
          width: 72%;
          overflow: hidden;
          text-overflow: ellipsis;
          //white-space: nowrap;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
      }
    }
    .card-title {
    }
    .card-content {
      margin-top: 0.7rem;
      font-size: 1.4rem;
      span {
        font-size: 1.5rem;
      }
    }
    .card-date {
      font-size: 1.4rem;
      span {
        font-size: 1.3rem;
      }
    }
  }
`;
const CardInfo = styled.div`
  z-index: 6;
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  /* text-align: left; */
`;

export default Card;
