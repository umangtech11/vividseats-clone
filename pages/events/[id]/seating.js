"use client";
import { useState } from "react";
import Link from "next/link";

export default function SeatingChart() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seatPrices = {
    A: 150,
    B: 120,
    C: 90,
    D: 60,
  };

  const sections = ["A", "B", "C", "D"];

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-6 pb-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        {/* STADIUM */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">Select Your Seats</h1>

          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl">
            {/* STAGE AREA */}
            <div className="bg-blue-600 text-center py-3 rounded-xl mb-6">
              <span className="text-lg font-semibold">STAGE</span>
            </div>

            {/* SECTIONS */}
            <div className="grid grid-cols-2 gap-6">
              {sections.map((sec) => (
                <div key={sec} className="bg-gray-700 p-4 rounded-xl shadow">
                  <h2 className="text-xl font-semibold mb-3">Section {sec}</h2>

                  <div className="grid grid-cols-6 gap-2">
                    {Array.from({ length: 24 }).map((_, index) => {
                      const seatId = `${sec}${index + 1}`;
                      const isSelected = selectedSeats.includes(seatId);

                      return (
                        <div
                          key={seatId}
                          onClick={() => handleSeatClick(seatId)}
                          className={`h-8 w-8 rounded cursor-pointer flex items-center justify-center text-xs border
                            ${
                              isSelected
                                ? "bg-green-500 border-green-400"
                                : "bg-gray-600 hover:bg-gray-500"
                            }
                          `}
                        >
                          {index + 1}
                        </div>
                      );
                    })}
                  </div>

                  <p className="mt-3 text-sm text-gray-300">
                    Price: ₹{seatPrices[sec]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/events"
            className="inline-block mt-6 text-blue-400 hover:text-blue-300"
          >
            ← Back to Events
          </Link>
        </div>

        {/* SIDEBAR */}
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Your Selection</h2>

          {selectedSeats.length === 0 ? (
            <p classw="text-gray-400">No seats selected.</p>
          ) : (
            <>
              <ul className="space-y-2 mb-4">
                {selectedSeats.map((seat) => (
                  <li key={seat} className="text-gray-300">
                    Seat <strong>{seat}</strong> — ₹
                    {seatPrices[seat.charAt(0)]}
                  </li>
                ))}
              </ul>

              <p className="text-xl font-semibold">
                Total: ₹
                {selectedSeats.reduce(
                  (sum, seat) => sum + seatPrices[seat.charAt(0)],
                  0
                )}
              </p>

              <button className="mt-6 w-full bg-blue-600 py-3 rounded-xl hover:bg-blue-500 transition">
                Continue
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
