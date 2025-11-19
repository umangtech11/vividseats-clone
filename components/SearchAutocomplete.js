"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SearchAutocomplete() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const delay = setTimeout(() => {
      searchEvents();
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  async function searchEvents() {
    const res = await fetch(`/api/search?q=${query}`);
    const data = await res.json();
    setResults(data);
    setShow(true);
  }

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search for events..."
        className="w-full px-6 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query && setShow(true)}
      />

      {/* DROPDOWN */}
      {show && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-gray-900 border border-gray-700 rounded-xl mt-2 max-h-80 overflow-y-auto z-50">
          {results.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              onClick={() => setShow(false)}
            >
              <div className="p-3 hover:bg-gray-800 cursor-pointer flex gap-3">
                <img
                  src={event.images?.[0]?.url}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold">{event.name}</p>
                  <p className="text-gray-400 text-sm">
                    {event.dates?.start?.localDate}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
