import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper";

import bannerImg from "../images/subbanner.jpg";

import "swiper/css";
import "swiper/css/effect-fade";

import video from "../videos/test.mp4";
import video2 from "../videos/test2.mp4";
import video3 from "../videos/test3.mp4";
import video4 from "../videos/test4.mp4";

const Banner = (props) => {
  const params = useLocation();

  if (params.pathname === "/") {
    return (
      <Swiper
        className="bannerSwiper"
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        slidesPerView={1}
        speed={1500}
        effect={"fade"}
        // spaceBetween={40}
        // navigation={true}
        // pagination={{
        //   clickable: true,
        // }}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <StyleBanner>
            <div className="dim"></div>
            <video autoPlay loop muted>
              <source src={video} type="video/mp4" />
            </video>
            {/* <img className='banner-img' src={bannerImg} alt='배너이미지'/> */}
            <div className="banner-card">
              <span>지금 이 순간,</span>
              <span>당신은 무엇을 하고 계신가요?</span>
            </div>
          </StyleBanner>
        </SwiperSlide>
        <SwiperSlide>
          <StyleBanner>
            <div className="dim"></div>
            <video autoPlay loop muted>
              <source src={video4} type="video/mp4" />
            </video>
            {/* <img className='banner-img' src={bannerImg} alt='배너이미지'/> */}
            <div className="banner-card">
              <span>일, 공부, 취미,</span>
              <span>어떤 활동이 당신의 지금을 이끌고 있나요?</span>
            </div>
          </StyleBanner>
        </SwiperSlide>
        <SwiperSlide>
          <StyleBanner>
            <div className="dim"></div>
            <video autoPlay loop muted>
              <source src={video2} type="video/mp4" />
            </video>
            {/* <img className='banner-img' src={bannerImg} alt='배너이미지'/> */}
            <div className="banner-card">
              <span>당신의 소중한 이 순간에,</span>
              <span>한 움큼의 마음을 더해드릴게요</span>
            </div>
          </StyleBanner>
        </SwiperSlide>
        <SwiperSlide>
          <StyleBanner>
            <div className="dim"></div>
            <video autoPlay loop muted>
              <source src={video3} type="video/mp4" />
            </video>
            {/* <img className='banner-img' src={bannerImg} alt='배너이미지'/> */}
            <div className="banner-card">
              <span>순간을 공유하여,</span>
              <span>마음을 공유하는 Mo.HAE 입니다.</span>
            </div>
          </StyleBanner>
        </SwiperSlide>
      </Swiper>
    );
  } else {
    return (
      <StyleBanner type={"sub"}>
        <img className="banner-img" src={bannerImg} alt="배너이미지" />
        <div className="banner-card" style={{ left: "5%" }}>
          <span>순간을 공유하여,</span>
          <span>
            마음을 공유하는,{" "}
            <span style={{ fontSize: "5rem", paddingLeft: "0.5rem" }}>
              Mo.Hae
            </span>
          </span>
        </div>
      </StyleBanner>
    );
  }
};
const StyleBanner = styled.div`
  margin-top: ${(props) => (props.type === "sub" ? "9.1rem;" : ";")};
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
      color: #ffffff;
      &:first-child {
        font-size: 4.2rem;
      }
      &:last-child {
        padding-left: 4rem;
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
          padding-left: 4rem;
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

export default Banner;
