import type { Pokemon } from "../types/pokemon";
import PokemonCard from "./PokemonCard";

interface Props {
  data: Pokemon[];
}

export default function PokemonGrid({ data }: Props) {
  return (
    <div className="pokemon-grid">
      {data.map((p) => (
        <PokemonCard key={p.name} pokemon={p} />
      ))}
    </div>
  );
}
