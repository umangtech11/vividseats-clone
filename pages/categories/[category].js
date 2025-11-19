"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchEvents } from "../../lib/fetchEvents";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;

  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!category) return;
    loadEventsByCategory();
  }, [category]);

  async function loadEventsByCategory() {
    const keyword = category; // sports / concerts / etc.
    const data = await fetchEvents(keyword);
    setEvents(data || []);
  }

  if (!category) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 md:px-16 py-14">

      <h1 className="text-3xl md:text-4xl font-bold mb-8 capitalize">
        {category} Events
      </h1>

      {/* if no events */}
      {events.length === 0 && (
        <p className="text-gray-400">No events found.</p>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {events.map((ev) => (
          <Link key={ev.id} href={`/events/${ev.id}`}>
            <div className="bg-gray-800 p-5 rounded-xl shadow hover:scale-105 transition cursor-pointer">
              <img
                src={ev.images?.[0]?.url}
                className="w-full h-48 object-cover rounded-xl"
              />
              <h2 className="text-xl font-semibold mt-3">{ev.name}</h2>
              <p className="text-gray-400">{ev.dates?.start?.localDate}</p>
              <p className="text-gray-500 text-sm">
                {ev._embedded?.venues?.[0]?.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
