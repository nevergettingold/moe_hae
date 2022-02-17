import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CardList from "../components/CardList";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../components/Card";
import { getCookie } from "../shared/Cookie";
import { actionCreators as postActions } from "../redux/modules/post";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../css/swiper.css";

import { Autoplay, Pagination, Navigation } from "swiper";
import instance from "../shared/Request";

const MyPage = () => {
  const dispatch = useDispatch();
  const my_list = useSelector((state) => state.post.my_list);
  const my_like_list = useSelector((state) => state.post.my_like_list);

  React.useEffect(() => {
    dispatch(postActions.getMyLikePostFB());
    dispatch(postActions.getMyPostFB());
  }, []);

  return (
    <Container>
      <MyCards>
        <h3 className="my-title">나의 순간들</h3>
        <Swiper
          className="mySwiper"
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={4}
          spaceBetween={40}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
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
        >
          {my_list.map((list, idx) => {
            return (
              <SwiperSlide key={idx}>
                <Card list={list} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </MyCards>
      <MyLikedCards>
        <h3 className="my-title">나의 관심을 가져간 순간들</h3>
        <Swiper
          className="mySwiper"
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={4}
          spaceBetween={40}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
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
        >
          {my_like_list.map((list, idx) => {
            return (
              <SwiperSlide key={idx}>
                <Card list={list} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </MyLikedCards>
    </Container>
  );
};

const Container = styled.div`
  .my-title {
    margin-bottom: 4rem;
    font-size: 3.2rem;
    font-weight: 700;
  }
`;
const MyCards = styled.div`
  margin-bottom: 8rem;
`;
const MyLikedCards = styled.div``;

export default MyPage;
