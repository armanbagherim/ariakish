"use client";
import { Navigation, Pagination, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Cards from "../Cards";

const PureCarousel = ({ data }) => {
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
      {data.map((item, key) => (
        <SwiperSlide>

          <Cards
            color={item.cardColor}
            cardName={item.title}
            cardNumber="**** **** **** ****"
            expireDate="**/**"
            price={item?.fee}
            realPrice={item?.price}
          />
        </SwiperSlide>
      ))}


    </Swiper>
  );
};

export default PureCarousel;
