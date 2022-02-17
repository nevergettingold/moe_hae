import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

// Import Components
import Card from "./Card";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../css/swiper.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const CardSwiper = (props) => {
  const { best_list } = props;
  console.log("!!!!!HOME->CARDSWIPER BEST LIST 전달!!!!!", best_list);

  return (
    <Swiper
      className="mySwiper"
      modules={[Autoplay, Pagination, Navigation]}
      slidesPerView={4}
      spaceBetween={40}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        360: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        870: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {best_list.map((list, idx) => {
        return (
          <SwiperSlide key={idx}>
            <Card list={list} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

const CardInfo = styled.div`
  /* text-align: left; */
`;

export default CardSwiper;
