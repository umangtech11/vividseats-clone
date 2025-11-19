"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchEvents } from "../lib/fetchEvents";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


export default function Home() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const data = await fetchEvents(""); // load trending events
    setEvents(data || []);
  }

  // Search Autocomplete
  async function handleSearchInput(e) {
    const value = e.target.value;
    setSearch(value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    const data = await fetchEvents(value);
    setSuggestions(data.slice(0, 6));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">

      {/* HERO SLIDER */}
      <section className="px-6 md:px-16 pt-10 pb-16">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          navigation={true}
          className="rounded-2xl overflow-hidden shadow-2xl"
        >
          {events.slice(0, 5).map((ev) => (
            <SwiperSlide key={ev.id}>
              <div className="relative h-[400px] md:h-[500px] w-full">
                <img
                  src={ev.images?.[0]?.url}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40">
                  <h1 className="text-3xl md:text-5xl font-bold text-center">
                    {ev.name}
                  </h1>
                  <p className="text-gray-300 mt-2 text-center">
                    {ev.dates?.start?.localDate} • {ev._embedded?.venues?.[0]?.name}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* SEARCH BAR */}
        <div className="mt-10 max-w-3xl mx-auto relative">
          <input
            type="text"
            placeholder="Search for events, teams or venues..."
            className="w-full px-6 py-4 rounded-xl bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            value={search}
            onChange={handleSearchInput}
          />

          {/* Autocomplete Box */}
          {suggestions.length > 0 && (
            <div className="absolute left-0 right-0 bg-gray-800 border border-gray-700 rounded-xl mt-2 z-20">
              {suggestions.map((s) => (
                <Link key={s.id} href={`/events/${s.id}`}>
                  <div className="px-4 py-3 hover:bg-gray-700 cursor-pointer">
                    {s.name}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CATEGORIES */}
 {/* CATEGORIES */}
<section className="px-6 md:px-16 py-14">
  <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {[
      { name: "sports", img: "/images/sports.jpg" },
      { name: "concerts", img: "/images/concerts.jpg" },
      { name: "theatre", img: "/images/theatre.jpg" },
      { name: "festivals", img: "/images/festival.jpg" },
    ].map((item, index) => (
      <Link key={index} href={`/categories/${item.name}`}>
        <div className="relative rounded-xl overflow-hidden group cursor-pointer shadow-lg">
          <Image
            src={item.img}
            width={400}
            height={300}
            alt={item.name}
            className="group-hover:scale-110 transition duration-500"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-xl font-bold capitalize">
            {item.name}
          </div>
        </div>
      </Link>
    ))}
  </div>
</section>




      {/* TRENDING EVENTS */}
      <section className="px-6 md:px-16 py-14">
        <h2 className="text-3xl font-bold mb-6">Trending Events</h2>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1.2}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
          }}
        >
          {events.slice(0, 10).map((event) => (
            <SwiperSlide key={event.id}>
              <Link href={`/events/${event.id}`}>
                <div className="bg-gray-800 rounded-xl p-5 shadow-lg hover:scale-105 transition cursor-pointer">
                  <img
                    src={event.images?.[0]?.url}
                    className="w-full h-48 object-cover rounded-xl"
                  />

                  <h3 className="text-xl font-semibold mt-3">{event.name}</h3>
                  <p className="text-gray-400 mt-1">
                    {event._embedded?.venues?.[0]?.name}
                  </p>
                  <p className="text-gray-400">{event.dates?.start?.localDate}</p>

                  <p className="text-green-400 mt-2 font-semibold">
                    From ₹{1200 + (event.id.length * 10)}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* CTA SECTION */}
      <section className="px-6 md:px-16 py-16 text-center bg-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold">
          Never Miss an Event Again
        </h2>
        <p className="text-gray-400 mt-2">
          Subscribe for updates on your favorite teams and artists.
        </p>

        <button className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-lg font-medium">
          Subscribe Now
        </button>
      </section>
    </div>
  );
}
