import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Three-dot button (mobile only) */}
      <button
        onClick={() => setOpen(!open)}
        className="sm:hidden p-2 rounded-md hover:bg-yellow-300"
        aria-label="Open menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-blue-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6h.01M12 12h.01M12 18h.01"
          />
        </svg>
      </button>

      {/* Desktop menu */}
      <nav className="hidden sm:flex gap-6 font-semibold text-blue-700">
        <Link to="/">Home</Link>
        <Link to="/favourites">Favorites</Link>
        <Link to="/stats">Stats</Link>
        <Link to="/comments">Comments</Link>
        <Link to="/about">About</Link>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="
            absolute right-0 mt-2 w-44
            bg-white border rounded-md shadow-lg
            flex flex-col
            sm:hidden
            z-50
          "
        >
          <Link
            to="/"
            className="px-4 py-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/favourites"
            className="px-4 py-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Favorites
          </Link>
          <Link
            to="/stats"
            className="px-4 py-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Stats
          </Link>
          <Link
            to="/comments"
            className="px-4 py-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Comments
          </Link>
          <Link
            to="/about"
            className="px-4 py-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
        </div>
      )}
    </div>
  );
}
