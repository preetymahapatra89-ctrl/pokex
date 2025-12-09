import NavBar from "./NavBar"
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="poke-header">
        <div className="logo">
            <Link to="/">
              <img src="../project_pokex.png" alt="Pokex Logo" />
            </Link>
            <h1>Project Pokex</h1>
        </div>

        <NavBar />
     </header>
  );
}
