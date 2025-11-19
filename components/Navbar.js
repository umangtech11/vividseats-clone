"use client";
import { useState } from "react";
import Link from "next/link";
import AuthModal from "./AuthModal";
import { motion } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <Link href="/">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-blue-400 cursor-pointer"
            >
              VividSeats Clone
            </motion.h1>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">

            <Link href="/" className="text-gray-300 hover:text-white">
              Home
            </Link>

            <Link href="/events" className="text-gray-300 hover:text-white">
              Events
            </Link>

            {/* TEAMS DROPDOWN */}
            <div className="relative group">
              <span className="text-gray-300 hover:text-white cursor-pointer">
                Teams ▾
              </span>

              {/* DROPDOWN */}
              <div className="absolute left-0 mt-3 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl 
                              opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">

                <Link href="/team/cowboys" className="flex items-center gap-3 p-3 hover:bg-gray-700">
                  <img src="/images/teams/cowboys.png" className="w-7 h-7 rounded-full" />
                  <span className="text-white">Dallas Cowboys</span>
                </Link>

                <Link href="/team/packers" className="flex items-center gap-3 p-3 hover:bg-gray-700">
                  <img src="/images/teams/packers.png" className="w-7 h-7 rounded-full" />
                  <span className="text-white">Green Bay Packers</span>
                </Link>

                <Link href="/team/eagles" className="flex items-center gap-3 p-3 hover:bg-gray-700">
                  <img src="/images/teams/eagles.png" className="w-7 h-7 rounded-full" />
                  <span className="text-white">Philadelphia Eagles</span>
                </Link>

                <Link href="/team/giants" className="flex items-center gap-3 p-3 hover:bg-gray-700">
                  <img src="/images/teams/giants.png" className="w-7 h-7 rounded-full" />
                  <span className="text-white">NY Giants</span>
                </Link>

                <Link href="/teams" className="block p-3 text-blue-400 text-center border-t border-gray-700 hover:bg-gray-700">
                  View All Teams →
                </Link>

              </div>
            </div>

            {/* STADIUM LINK */}
            <Link href="/stadium" className="text-gray-300 hover:text-white">
              Stadium
            </Link>

            {/* LOGIN BUTTON */}
            <button
              onClick={() => setShowAuth(true)}
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition"
            >
              Login
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            className="md:hidden text-gray-300 text-3xl"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden px-6 pb-4 space-y-4 bg-gray-900 border-t border-gray-800">

            <Link href="/" className="block text-gray-300 hover:text-white" onClick={() => setOpen(false)}>
              Home
            </Link>

            <Link href="/events" className="block text-gray-300 hover:text-white" onClick={() => setOpen(false)}>
              Events
            </Link>

            <Link href="/teams" className="block text-gray-300 hover:text-white" onClick={() => setOpen(false)}>
              Teams
            </Link>

            <Link href="/stadium" className="block text-gray-300 hover:text-white" onClick={() => setOpen(false)}>
              Stadium
            </Link>

            {/* MOBILE LOGIN BUTTON */}
            <button
              onClick={() => {
                setOpen(false);
                setShowAuth(true);
              }}
              className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-500 transition"
            >
              Login
            </button>
          </div>
        )}
      </nav>

      {/* AUTH MODAL */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}
