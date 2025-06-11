import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const posters = [
  { id: 1, image: "/posters/mission.jpg" },
  { id: 2, image: "/posters/punisher.jpg" },
  { id: 3, image: "/posters/spiderman.jpg" },
  { id: 4, image: "/posters/superman.jpg" },
  { id: 5, image: "/posters/topgun.jpg" },
  { id: 6, image: "/posters/venom.jpg" },
];

const PosterSlider = () => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {posters.map((poster) => (
          <SwiperSlide key={poster.id}>
            <div className="w-full h-[600px] flex flex-col items-center">
              <img
                src={poster.image}
                alt={`Poster ${poster.id}`}
                className="h-full w-full object-contain rounded-lg shadow-md"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PosterSlider;
