import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

const Slider = ({ slides = [] }) => {
  const [slide1, slide2, slide3] = slides;
  return (
    <Swiper
      modules={[Navigation, Autoplay, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={20}
      slidesPerView={1}
      loop
      autoplay={{ delay: 3000, disableOnInteraction: false }}
    >
      <SwiperSlide className="relative">
        <div className="w-full h-[603px] overflow-hidden mx-auto">
          <img
            className="w-full h-full object-cover"
            src={slide1?.src}
            width={slide1?.width}
            height={slide1?.height}
            alt="Slide 1"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white font-nunito font-extrabold text-[3.75rem]">
            Nuestras actividades
          </h2>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative">
        <div className="w-full h-[603px] overflow-hidden mx-auto">
          <img
            className="w-full h-full object-cover"
            src={slide2?.src}
            width={slide2?.width}
            height={slide2?.height}
            alt="Slide 1"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white font-nunito font-extrabold text-[3.75rem]">
            
          </h2>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative">
        <div className="w-full h-[603px] overflow-hidden mx-auto">
          <img
            className="w-full h-full object-cover"
            src={slide3?.src}
            width={slide3?.width}
            height={slide3?.height}
            alt="Slide 1"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white font-nunito font-extrabold text-[3.75rem]">
            
          </h2>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;