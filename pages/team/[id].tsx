import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { teams } from "@/data/teamData";

export default function TeamPage() {
  const router = useRouter();
  const { id: teamId } = router.query;

  const team = teams[teamId as string];

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // LOAD REAL EVENTS FROM SEATGEEK API
  useEffect(() => {
    if (!teamId) return;

    async function fetchEvents() {
      try {
        const res = await fetch(
          `https://api.seatgeek.com/2/events?performers.slug=${teamId}&client_id=YOUR_CLIENT_ID`
        );

        const data = await res.json();

        const formatted = data.events.map((ev: any) => ({
          id: ev.id,
          title: ev.title,
          date: ev.datetime_local,
          venue: ev.venue.name,
          city: ev.venue.city,
          price: ev.stats.lowest_price || "N/A",
          image: ev.performers?.[0]?.image || "/images/stadium.jpg",
        }));

        setEvents(formatted);
      } catch (err) {
        console.log("Error fetching team events:", err);
      }

      setLoading(false);
    }

    fetchEvents();
  }, [teamId]);

  if (!team) {
    return (
      <div className="pt-24 text-center text-white text-xl">
        Team not found.
      </div>
    );
  }

  return (
    <div className="pb-20">

      {/* BANNER */}
      <div className="relative w-full h-72">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${team.banner})` }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80" />

        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-4xl font-bold drop-shadow-lg">
            {team.name}
          </h1>
        </div>

        {/* FLOATING LOGO */}
        <div className="absolute -bottom-10 right-6">
          <img
            src={team.logo}
            alt={team.name}
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* TEAM DETAILS */}
      <div className="px-6 mt-16">

        {/* STATS */}
        <div className="grid grid-cols-3 bg-white p-5 rounded-xl shadow-md gap-4">
          <div className="text-center">
            <div className="text-xl font-bold">9 - 3</div>
            <div className="text-gray-500 text-sm">Record</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">#2</div>
            <div className="text-gray-500 text-sm">Conference Rank</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">NFC East</div>
            <div className="text-gray-500 text-sm">Division</div>
          </div>
        </div>

        {/* UPCOMING EVENTS */}
        <h2 className="text-3xl font-semibold mt-12 mb-4 text-white">
          Upcoming Events
        </h2>

        {loading ? (
          <div className="text-gray-400">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="text-gray-400">No upcoming events found.</div>
        ) : (
          <div className="space-y-4">
            {events.map((ev) => (
              <div
                key={ev.id}
                onClick={() => router.push(`/event/${ev.id}`)}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg border transition cursor-pointer"
              >
                <div className="flex justify-between items-start">

                  <div>
                    <h3 className="text-xl font-bold">{ev.title}</h3>

                    <div className="text-gray-500 mt-1">
                      {new Date(ev.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>

                    <div className="mt-1 text-gray-700">
                      {ev.venue} • {ev.city}
                    </div>
                  </div>

                  <div>
                    <span className="text-indigo-600 font-semibold text-lg">
                      ${ev.price}
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
