import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';

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
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="hero-slider"
      >
        {posters.map((poster) => (
          <SwiperSlide key={poster.id}>
            <div className="relative w-full h-[40vh] md:h-[65vh] bg-black">
              <img
                src={poster.image}
                alt={`Poster ${poster.id}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PosterSlider;