import SearchBar from "./SearchBar";
import NavBar from "./NavBar"
import type {Pokemon} from "../types/pokemon"
import { Link } from "react-router-dom";

interface Props {
  pokemon: Pokemon[];
  setFiltered: React.Dispatch<React.SetStateAction<Pokemon[]>>;
}

export default function Header({ pokemon, setFiltered }: Props) {
  const handleSearch = (value: string) => {
    value = value.toLowerCase();
    const result = pokemon.filter((p) => p.name.includes(value));
    setFiltered(result);
  };
  return (
    <header className="poke-header">
        <div className="logo">
            <Link to="/">
              <img src="../project_pokex.png" alt="Pokex Logo" />
            </Link>
            <h1>Project Pokex</h1>
        </div>

        <SearchBar onSearch={handleSearch} />
        <NavBar />
     </header>
  );
}
