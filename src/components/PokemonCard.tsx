import type { Pokemon } from "../types/pokemon";
import { Link } from "react-router-dom";

interface Props {
  pokemon: Pokemon;
  componentName: string;
  setComponentName: React.Dispatch<React.SetStateAction<string>>;
}

export default function PokemonCard({ pokemon, componentName }: Props) {
  return (
    <div key={pokemon.name} className="bg-gray-200 p-4 rounded-2xl">
      <Link to={`/pokemon/${pokemon.id}`}>
        {componentName === "Favourites" ? (
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={60}
            height={60}
            className="inline"
          />
        ) : (
          <>
            <img src={pokemon.image} alt={pokemon.name} className="inline" />
          </>
        )}
        <h2>{pokemon.name}</h2>
      </Link>
    </div>
  );
}
