import NavBar from "./NavBar";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 flex flex-col gap-3
                       md:flex-row md:items-center md:justify-between
                       px-4 md:px-12 py-3
                       bg-yellow-400 border-b-4 border-blue-700 shadow-md"
    >
      <div className="flex items-center gap-x-3 md:gap-x-4">
        <Link to="/">
          <img
            src="../project_pokex.png"
            alt="Pokex Logo"
            className="w-16 h-16 md:w-24 md:h-24 object-contain"
          />
        </Link>

        <h1 className="text-lg md:text-2xl font-extrabold tracking-wide text-blue-700">
          Project Pokex
        </h1>
      </div>

      <NavBar />
    </header>
  );
}
