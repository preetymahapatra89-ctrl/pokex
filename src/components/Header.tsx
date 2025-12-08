import SearchBar from "./SearchBar";
import type {Pokemon} from "../types/pokemon"

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
            <a href="" target="_blank">
            <img src="../project_pokex.png" alt="Pokex Logo" />
            </a>
            <h1>Project Pokex</h1>
        </div>

        <SearchBar onSearch={handleSearch} />

        <nav className="nav-menu">
            <a href="">Home</a>
            <a href="#pokemon">Favorites</a>
            <a href="#types">Stats</a>
            <a href="#about">About</a>
        </nav>
     </header>
  );
}
