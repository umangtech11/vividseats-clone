"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchEvents } from "../lib/fetchEvents";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [sort, setSort] = useState("date,asc"); // default sort
  const [page, setPage] = useState(0);

  useEffect(() => {
    loadEvents();
  }, [keyword, city, sort, page]);

  async function loadEvents() {
    const list = await fetchEvents(keyword, city, sort, page);
    setEvents(list);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 pb-20">

      <h1 className="text-4xl font-bold text-center py-10">Events</h1>

      {/* FILTER BAR */}
      <div className="grid md:grid-cols-4 gap-4 mb-10">

        {/* Search */}
        <input
          type="text"
          placeholder="Search event..."
          className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        {/* City */}
        <input
          type="text"
          placeholder="City..."
          className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        {/* SORTING */}
        <select
          className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="date,asc">Newest First</option>
          <option value="date,desc">Oldest First</option>
          <option value="name,asc">A → Z</option>
          <option value="name,desc">Z → A</option>
          <option value="price,asc">Price Low → High</option>
          <option value="price,desc">Price High → Low</option>
        </select>

        {/* Pagination */}
        <div className="flex gap-3">
          <button
            onClick={() => setPage(page > 0 ? page - 1 : 0)}
            className="px-4 py-3 bg-gray-700 rounded-lg"
          >
            Prev
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-3 bg-gray-700 rounded-lg"
          >
            Next
          </button>
        </div>

      </div>

      {/* EVENTS GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-gray-800 p-4 rounded-xl shadow hover:shadow-blue-500/30 transition"
          >
            <img
              src={event.images?.[0]?.url}
              className="w-full h-40 object-cover rounded-lg"
            />

            <h3 className="mt-3 text-xl font-semibold">{event.name}</h3>
            <p className="text-gray-400 mt-1">
              {event.dates?.start?.localDate}
            </p>

            <Link href={`/events/${event.id}`}>
              <button className="mt-4 w-full py-2 bg-blue-600 rounded-lg">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}
