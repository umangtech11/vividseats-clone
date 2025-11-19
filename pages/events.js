"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchEvents } from "../lib/fetchEvents";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents(keyword = "") {
    const data = await fetchEvents(keyword);
    setEvents(data || []);
  }

  // Autocomplete search
  async function handleSearchInput(value) {
    setSearch(value);

    if (!value.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const result = await fetchEvents(value);
    setSuggestions(result.slice(0, 5));
    setShowDropdown(true);
  }

  function handleSelectSuggestion(name) {
    setSearch(name);
    loadEvents(name);
    setShowDropdown(false);
  }

  // Category Filters
  const categories = [
    "Sports",
    "Concert",
    "Comedy",
    "Arts & Theatre",
    "Family",
    "Music",
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">

      <h1 className="text-4xl font-bold text-center mb-8">Events</h1>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => loadEvents(cat)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 hover:border-blue-500 rounded-full text-sm transition"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Box + Autocomplete */}
      <div className="max-w-xl mx-auto relative">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => handleSearchInput(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"
        />

        {showDropdown && suggestions.length > 0 && (
          <ul className="absolute w-full bg-gray-800 border border-gray-700 mt-2 rounded-xl shadow-xl z-50">
            {suggestions.map((event) => (
              <li
                key={event.id}
                onClick={() => handleSelectSuggestion(event.name)}
                className="p-3 hover:bg-gray-700 cursor-pointer"
              >
                {event.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Events Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.id}
              className="bg-gray-800 p-4 rounded-xl shadow hover:shadow-blue-500/30 transition"
            >
              {/* Image */}
              <img
                src={event.images?.[0]?.url}
                className="w-full h-48 object-cover rounded-lg"
                alt={event.name}
              />

              {/* Name */}
              <h2 className="text-xl font-semibold mt-4">{event.name}</h2>

              {/* Date */}
              <p className="text-gray-400 mt-1">
                {event.dates?.start?.localDate || "No date available"}
              </p>

              {/* ⭐ Ratings */}
              <div className="flex items-center gap-1 mt-2 text-yellow-400">
                ⭐⭐⭐⭐☆ <span className="text-gray-300 ml-1 text-sm">(4.2)</span>
              </div>

              {/* 💰 Pricing */}
              <p className="mt-2 text-green-400 font-semibold text-lg">
                Starting from ₹{Math.floor(Math.random() * (4500 - 800) + 800)}
              </p>

              {/* 🎟️ Ticket Status */}
              <p className="text-sm mt-1">
                {(() => {
                  const r = Math.random();
                  if (r < 0.33)
                    return <span className="text-green-400">● Available</span>;
                  if (r < 0.66)
                    return <span className="text-yellow-400">● Limited Seats</span>;
                  return <span className="text-red-400">● Sold Out</span>;
                })()}
              </p>

              {/* Button */}
              <Link href={`/events/${event.id}`}>
                <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg">
                  View Details
                </button>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-gray-400 text-center">
            No events found.
          </div>
        )}
      </div>
    </div>
  );
}
