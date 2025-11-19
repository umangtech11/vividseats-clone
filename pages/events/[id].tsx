"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchEventDetails, fetchEvents } from "../../lib/fetchEvents";

export default function EventDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [event, setEvent] = useState(null);
  const [related, setRelated] = useState([]);
  const [ticketCount, setTicketCount] = useState(1);

  // Pricing Engine States
  const [selectedZone, setSelectedZone] = useState("Standard");
  const [basePrice, setBasePrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  // Pricing Map
  const priceTable = {
    VIP: 6500,
    Premium: 4500,
    Standard: 2500,
    Balcony: 1800,
    Economy: 1200,
  };

  useEffect(() => {
    if (!id) return;
    loadEvent();
  }, [id]);

  async function loadEvent() {
    const details = await fetchEventDetails(id);
    setEvent(details);

    if (details?.name) {
      const similar = await fetchEvents(details.name.split(" ")[0]);
      setRelated(similar.slice(0, 4));
    }

    generatePrice();
  }

  // Pricing Engine (Demand Based)
  function generatePrice(zone = "Standard", count = 1) {
    const base = priceTable[zone];

    // Demand-based multiplier (random)
    const demandMultiplier = 1 + Math.random() * 0.7; // 1.0 to 1.7

    // Final price calculation
    const calculated = Math.floor(base * demandMultiplier * count);

    setBasePrice(base);
    setFinalPrice(calculated);
  }

  function changeZone(zone) {
    setSelectedZone(zone);
    generatePrice(zone, ticketCount);
  }

  function changeCount(type) {
    let updatedCount = ticketCount;

    if (type === "minus" && ticketCount > 1) updatedCount--;
    if (type === "plus") updatedCount++;

    setTicketCount(updatedCount);
    generatePrice(selectedZone, updatedCount);
  }

  if (!event) {
    return (
      <div className="text-white text-center mt-20 text-lg">
        Loading event details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">

      {/* Hero Image */}
      <div className="w-full h-80 relative">
        <img
          src={event.images?.[0]?.url}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-center">{event.name}</h1>
          <p className="text-gray-300 mt-2">
            {event.dates?.start?.localDate} • {event._embedded?.venues?.[0]?.name}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* LEFT SIDE */}
        <div className="md:col-span-2">

          <div className="flex items-center gap-1 text-yellow-400 text-xl mb-3">
            ⭐⭐⭐⭐☆ <span className="text-gray-400 text-sm ml-2">(4.5 Reviews)</span>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Event Information</h2>

          <p className="text-gray-300 leading-relaxed">
            {event.info || "No description available for this event."}
          </p>

          {/* Seating Chart */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-3">Seating Chart</h3>

            <div className="bg-gray-800 p-6 rounded-xl">

              <div className="flex justify-center my-4">
                <div className="rounded-full bg-gray-700 w-40 h-40 flex items-center justify-center text-gray-300">
                  STAGE
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                {Object.keys(priceTable).map((zone) => (
                  <div
                    key={zone}
                    onClick={() => changeZone(zone)}
                    className={`p-4 text-center rounded-lg cursor-pointer transition 
                      ${selectedZone === zone ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}
                    `}
                  >
                    {zone}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE — Pricing */}
        <div className="bg-gray-800 p-6 rounded-xl sticky top-20 h-fit">

          <h2 className="text-2xl font-semibold mb-4">Buy Tickets</h2>

          <p className="text-gray-300">Selected Zone: <b>{selectedZone}</b></p>
          <p className="text-green-400 text-xl font-bold mt-2">
            ₹{finalPrice}
          </p>

          {/* Ticket Counter */}
          <div className="flex items-center gap-4 mt-4">
            <button
              className="bg-gray-700 px-3 py-1 rounded-lg text-xl"
              onClick={() => changeCount("minus")}
            >
              −
            </button>

            <span className="text-lg">{ticketCount}</span>

            <button
              className="bg-gray-700 px-3 py-1 rounded-lg text-xl"
              onClick={() => changeCount("plus")}
            >
              +
            </button>
          </div>

          {/* Buy Button */}
          <button className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-lg font-semibold">
            Buy Tickets
          </button>

          <p className="text-yellow-400 text-sm mt-3">
            ⚠ Prices vary based on demand & seat zone
          </p>
        </div>
      </div>

      {/* Related Events */}
      {related.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mt-16">
          <h2 className="text-2xl font-semibold mb-4">Related Events</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {related.map((ev) => (
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
      )}

    </div>
  );
}
