import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="nav-menu">
        <Link to="">Home</Link>
        <Link to="/favourites">Favorites</Link>
        <Link to="/stats">Stats</Link>
        <Link to="/about">About</Link>
    </nav>
  );
}
