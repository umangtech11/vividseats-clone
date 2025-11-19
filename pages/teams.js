import { useState } from "react";
import Link from "next/link";
import { teams } from "@/data/teamData";

export default function TeamsPage() {
  const [search, setSearch] = useState("");

  const teamList = Object.keys(teams).map((key) => ({
    id: key,
    ...teams[key],
  }));

  const filtered = teamList.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-24 pb-16 max-w-6xl mx-auto px-6">

      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold text-white mb-6">Teams</h1>

      {/* SEARCH BAR */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search teams..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* TEAMS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {filtered.map((team) => (
          <Link
            href={`/team/${team.id}`}
            key={team.id}
            className="group"
          >
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 flex flex-col items-center text-center 
                            hover:bg-gray-700 transition shadow-lg">

              {/* TEAM LOGO */}
              <img
                src={team.logo}
                alt={team.name}
                className="w-20 h-20 object-contain mb-3 group-hover:scale-110 transition"
              />

              {/* TEAM NAME */}
              <h2 className="text-white font-semibold text-lg group-hover:text-blue-400 transition">
                {team.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>

      {/* IF NO RESULTS */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-400 mt-10">No teams found.</p>
      )}
    </div>
  );
}
