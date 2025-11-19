import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20 pt-16 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* FOOTER TOP */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* BRAND INFO */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Vivid<span className="text-blue-500">Seats</span>
            </h2>
            <p className="text-gray-400">
              Your trusted platform for finding exciting concerts, sports games,
              theatre shows and festivals.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mt-6">
              {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition"
                >
                  <Icon className="text-white text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/events" className="hover:text-white transition">Events</Link></li>
              <li><Link href="/teams" className="hover:text-white transition">Teams</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a className="hover:text-white transition" href="#">About Us</a></li>
              <li><a className="hover:text-white transition" href="#">Careers</a></li>
              <li><a className="hover:text-white transition" href="#">Press</a></li>
              <li><a className="hover:text-white transition" href="#">Our Blog</a></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a className="hover:text-white transition" href="#">Help Center</a></li>
              <li><a className="hover:text-white transition" href="#">Tickets & Refunds</a></li>
              <li><a className="hover:text-white transition" href="#">Contact Us</a></li>
              <li><a className="hover:text-white transition" href="#">Terms & Policy</a></li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-800 my-10"></div>

        {/* COPYRIGHT */}
        <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} VividSeats. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
