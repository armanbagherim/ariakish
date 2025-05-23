"use client";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Cards from "../Cards";

const PureCarousel = ({ data }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (!swiperInstance) return;

    const updateState = () => {
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);
    };

    swiperInstance.on("slideChange", updateState);
    swiperInstance.on("reachEnd", updateState);
    swiperInstance.on("reachBeginning", updateState);

    updateState(); // Set initial state
  }, [swiperInstance]);

  return (
    <div className="relative w-full" dir="rtl">
      {/* Custom Navigation Buttons with Enabled/Disabled States */}
      <button
        ref={prevRef}
        disabled={isBeginning}
        className={`absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition 
          ${isBeginning ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100 cursor-pointer"}`}
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>

      <button
        ref={nextRef}
        disabled={isEnd}
        className={`absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition 
          ${isEnd ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100 cursor-pointer"}`}
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={12}
        slidesPerView={3.5}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          setTimeout(() => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          });
        }}
        breakpoints={{
          320: { slidesPerView: 1.2, spaceBetween: 20 },
          640: { slidesPerView: 2.5, spaceBetween: 10 },
          769: { slidesPerView: 2.2, spaceBetween: 10 },
          1024: { slidesPerView: 2.2, spaceBetween: 10 },
          1280: { slidesPerView: 3.5, spaceBetween: 10 },
          1536: { slidesPerView: 3.5, spaceBetween: 20 },
        }}
      >
        {data.map((item, key) => (
          <SwiperSlide key={key}>
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
    </div>
  );
};

export default PureCarousel;
