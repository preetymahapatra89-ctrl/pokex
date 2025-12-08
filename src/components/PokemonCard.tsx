import type { Pokemon } from "../types/pokemon";
import { Link } from "react-router-dom";

interface Props {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: Props) {
  return (
    <div key={pokemon.name} className="pokemon-card">
      <img src={pokemon.image} alt={pokemon.name} />
      <Link to={`/pokemon/${pokemon.name}`}>
        <h3>{pokemon.name}</h3>
      </Link>
    </div>
  );
}
