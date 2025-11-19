import { useEffect, useState } from "react";
import { teams } from "../data/teams";
import { FaHeart } from "react-icons/fa";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  const favoriteTeams = teams.filter((team) => favorites.includes(team.id));

  return (
    <div className="max-w-7xl mx-auto px-6 pt-10">
      <h1 className="text-4xl font-bold mb-6 text-white">My Favorite Teams</h1>

      {favoriteTeams.length === 0 ? (
        <p className="text-gray-400">No favorite teams yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favoriteTeams.map((team) => (
            <div
              key={team.id}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-blue-500/30 transition transform hover:-translate-y-1"
            >
              <img
                src={team.logo}
                alt={team.name}
                className="w-24 h-24 object-contain mx-auto"
              />

              <h2 className="text-xl text-center font-semibold text-white mt-4">
                {team.name}
              </h2>

              <p className="text-center text-gray-400">{team.sport}</p>

              <div className="flex justify-center mt-4 text-2xl">
                <FaHeart className="text-red-500" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
