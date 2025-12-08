import type { Pokemon } from "../types/pokemon";

interface Props {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: Props) {
  return (
    <div key={pokemon.name} className="pokemon-card">
      <img src={pokemon.image} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
    </div>
  );
}
