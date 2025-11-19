import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroSlider() {
  const slides = [
    {
      img: "/hero/slide1.jpg",
      title: "Experience Live Events Like Never Before",
      sub: "Concerts • Sports • Festivals • Shows",
    },
    {
      img: "/hero/slide2.jpg",
      title: "Find Your Favorite Teams & Artists",
      sub: "Real-time tickets & updates",
    },
    {
      img: "/hero/slide3.jpg",
      title: "Exclusive Deals & VIP Access",
      sub: "Get early access to top events",
    },
  ];

  return (
    <div className="w-full mb-12">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="rounded-2xl overflow-hidden"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div
              className="h-[500px] bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${s.img})` }}
            >
              <div className="bg-black/50 backdrop-blur-md p-6 rounded-xl text-center">
                <h2 className="text-4xl font-bold text-white">{s.title}</h2>
                <p className="text-gray-200 mt-2 text-lg">{s.sub}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
