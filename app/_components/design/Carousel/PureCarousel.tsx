"use client";
import { Navigation, Pagination, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Cards from "../Cards";

const PureCarousel = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={12}
      slidesPerView={3.5}
      breakpoints={{
        320: {
          slidesPerView: 1.2,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 2.5,
          spaceBetween: 10,
        },
        769: {
          slidesPerView: 2.2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 2.2,
          spaceBetween: 10,
        },
        1280: {
          slidesPerView: 3.5,
          spaceBetween: 10,
        },
        1536: {
          slidesPerView: 3.5,
          spaceBetween: 20,
        },
      }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide>
        <Cards
          color="#000000"
          cardName="مشکی"
          cardNumber="**** **** **** ****"
          expireDate="**/**"
          price={5000000}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Cards
          color="#2563EB"
          cardName="آبی"
          cardNumber="**** **** **** ****"
          expireDate="**/**"
          price={1000000}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Cards
          color="#9C25EB"
          cardName="قرمز"
          cardNumber="**** **** **** ****"
          expireDate="**/**"
          price={12000000}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Cards
          color="#000000"
          cardName="مشکی"
          cardNumber="**** **** **** ****"
          expireDate="**/**"
          price={12000000}
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default PureCarousel;
