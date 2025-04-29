import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

const Slider = () => {
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
            src="/assets/images/juego/hero_4.png"
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
            src="/assets/images/juego/hero_1.png"
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
            src="/assets/images/juego/hero_2.png"
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