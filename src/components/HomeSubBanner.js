import React from "react";
import styled from "styled-components";
import bannerImg from "../images/homesubbanner.jpg";

const HomeSubBanner = () => {
  return (
    <StyleBanner type={"sub"}>
      <img className="banner-img" src={bannerImg} alt="배너이미지" />
      <div className="banner-card" style={{ left: "62%", top: "15%" }}>
        <span>소중하지 않은 순간은</span>
        <span>없습니다.</span>
      </div>
    </StyleBanner>
  );
};

const StyleBanner = styled.div`
  margin-top: ${(props) => (props.type === "sub" ? "9.1rem;" : ";")};
  margin-bottom: 4rem;
  position: relative;
  overflow: hidden;
  max-height: ${(props) => (props.type === "sub" ? "40vw;" : "50vw;")};
  .banner-img {
    transform: translateY(-20%);
  }
  .dim {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }
  video {
    width: 100%;
  }
  .banner-card {
    position: absolute;
    top: 35%;
    left: 10%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    transition: 0.2s;
    span {
      font-weight: 900;
      text-align: left;
      color: #ffffffe0;
      &:first-child {
        font-size: 4.2rem;
      }
      &:last-child {
        padding-left: 20rem;
        font-size: 3.2rem;
      }
    }
    span + span {
      margin-top: 2rem;
    }
  }
  @media screen and (max-width: 1080px) {
    .banner-card {
      top: 50%;
      span {
        &:first-child {
          font-size: 2.4rem;
        }
        &:last-child {
          padding-left: 13rem;
          font-size: 1.6rem;
        }
      }
    }
  }
  @media screen and (max-width: 520px) {
    .banner-card {
      left: 5%;
      span {
        &:first-child {
          font-size: 2rem;
        }
        &:last-child {
          padding-left: 2rem;
          font-size: 1.2rem;
        }
      }
    }
  }
`;

export default HomeSubBanner;
