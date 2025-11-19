"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchEvents } from "../lib/fetchEvents";

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [category, setCategory] = useState("all");

  useEffect(() => {
    if (!q) return;
    loadResults();
  }, [q]);

  async function loadResults() {
    setLoading(true);
    const results = await fetchEvents(q);
    setEvents(results);
    setLoading(false);
  }

  // Filter by segment
  const filteredEvents =
    category === "all"
      ? events
      : events.filter(
          (ev) => ev.classifications?.[0]?.segment?.name === category
        );

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold">
        Search Results for:{" "}
        <span className="text-blue-500">"{q}"</span>
      </h1>

      {/* FILTERS */}
      <div className="mt-6 flex gap-4">
        <select
          className="bg-gray-800 px-4 py-2 rounded-lg"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Sports">Sports</option>
          <option value="Music">Concerts</option>
          <option value="Arts & Theatre">Theatre</option>
        </select>
      </div>

      {/* RESULTS */}
      <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {loading && (
          <p className="text-gray-300">Loading...</p>
        )}

        {!loading && filteredEvents.length === 0 && (
          <p className="text-gray-400">No events found.</p>
        )}

        {filteredEvents.map((ev) => (
          <Link key={ev.id} href={`/events/${ev.id}`}>
            <div className="bg-gray-800 p-4 rounded-xl hover:scale-105 transition cursor-pointer">
              <img
                src={ev.images?.[0]?.url}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="mt-3 font-semibold">{ev.name}</h3>
              <p className="text-gray-400 text-sm">
                {ev.dates?.start?.localDate}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
