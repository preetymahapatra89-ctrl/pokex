import type { Pokemon } from "../types/pokemon";
import { Link } from "react-router-dom";

interface Props {
  pokemon: Pokemon;
  componentName: string
  setComponentName: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function PokemonCard({ pokemon, componentName,  setComponentName}: Props) {
  return (
    <div key={pokemon.name} className="pokemon-card">
      <Link to={`/pokemon/${pokemon.id}`}>
      {componentName === "Favourites" ? (
        <img src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={60}
            height={60}
        />
      ) : (
        <>
          <img src={pokemon.image} alt={pokemon.name} />
        </>
        
      )}
        <h3>{pokemon.name}</h3>
      </Link>
    </div>
  );
}
