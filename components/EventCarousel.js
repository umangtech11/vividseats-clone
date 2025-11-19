"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function EventCarousel({ events = [] }) {
  return (
    <div className="mt-12">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={3}
        navigation={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {events.map((event) => (
          <SlideCard key={event.id} event={event} />
        ))}
      </Swiper>
    </div>
  );
}

/* ------------ SINGLE SLIDE CARD ------------ */

function SlideCard({ event }) {
  const [price, setPrice] = useState(null);

  // Generate price on client only (fixes hydration mismatch)
  useEffect(() => {
    setPrice(Math.floor(Math.random() * (4500 - 900) + 900));
  }, []);

  return (
    <SwiperSlide>
      <Link href={`/events/${event.id}`}>
        <div className="bg-gray-800 p-4 rounded-xl hover:scale-105 transition cursor-pointer shadow-lg">
          {/* IMAGE */}
          <img
            src={event.images?.[0]?.url}
            className="w-full h-48 object-cover rounded-lg"
            alt={event.name}
          />

          {/* TITLE */}
          <h3 className="font-semibold mt-3 text-white">
            {event.name?.slice(0, 50)}...
          </h3>

          {/* DATE */}
          <p className="text-gray-400 text-sm">
            {event.dates?.start?.localDate}
          </p>

          {/* PRICE */}
          <p className="text-green-400 mt-2 font-semibold">
            From ₹{price ?? "--"}
          </p>
        </div>
      </Link>
    </SwiperSlide>
  );
}
