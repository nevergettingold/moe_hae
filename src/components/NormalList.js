import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Comment } from "../svg/comment.svg";
import { ReactComponent as Like } from "../svg/like.svg";
import { ReactComponent as Time } from "../svg/time.svg";
const NormalList = (props) => {
  const { post_list } = props;
  const navigate = useNavigate();

  return (
    <List>
      <Category
        className="category-info"
        onClick={() => navigate(`/post/${post_list.postId}`)}
      >
        <div className="list-img">
          <img src={post_list.imageUrl} alt="포스트 사진" />
        </div>
        <div className="list-info">
          <div className="list-info-top">
            <div className="list-info-title">{post_list.title}</div>
            {/* <div className="list-info-nick">
              <span>by</span>
              <span>{post_list.userId}</span>
            </div> */}
          </div>
          <div className="list-info-bot">{post_list.content}</div>
        </div>
      </Category>

      <Category>
        <div className="list-info-sub">
          <Comment />
          <span>{post_list.commentCount}</span>
        </div>
        <div className="list-info-sub">
          <Like />
          <span>{post_list.likeCount}</span>
        </div>
        <div className="list-info-sub list_date">
          <Time />
          <span>
            {post_list.createdAt.slice(2, 10)}{" "}
            {post_list.createdAt.slice(11, 19)}
          </span>
        </div>
      </Category>
    </List>
  );
};

const List = styled.li`
  padding: 1rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e2e2;
  @media screen and (max-width: 1100px) {
    &.category-info {
      width: 60%;
    }
  }
`;

// const ListHeader = styled.div`
//   padding: 15px;
//   border-bottom: 1px solid green;
//   justify-content: flex-start;
// `;

const Category = styled.div`
  width: 30%;
  display: flex;

  .list-img {
    display: flex;
    margin-right: 2rem;
    width: 6rem;
    height: 6rem;
    overflow: hidden;
    cursor: pointer;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  .list-info {
    cursor: pointer;
    width: calc(100% - 8rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    .list-info-top {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      .list-info-title {
        margin-right: 2rem;
        font-weight: 900;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .list-info-nick {
        font-size: 1.2rem;
        span {
          &:first-child {
            margin-right: 0.8rem;
          }
        }
      }
    }
    .list-info-bot {
      margin-top: 1rem;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #555555;
    }
  }
  .list-info-sub {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    svg + span {
      margin-left: 1rem;
    }
    svg {
      width: 2rem;
      height: 2rem;
    }
    span {
      min-width: 4rem;
      text-align: left;
    }
    &:last-child {
      span {
        min-width: 15rem;
      }
    }
  }
  .list-info-sub + .list-info-sub {
    margin-left: 1.6rem;
  }
  @media screen and (max-width: 1100px) {
    width: 40%;
  }
  @media screen and (max-width: 856px) {
    justify-content: flex-end;
    .list-info-sub.list_date {
      display: none;
    }
  }
`;

export default NormalList;
