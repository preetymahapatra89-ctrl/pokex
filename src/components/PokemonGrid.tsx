import type { PokemonGridProps } from "../types/pokemonGrid";
import PokemonCard from "./PokemonCard";

export default function PokemonGrid({
  data,
  componentName,
  setComponentName,
}: PokemonGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2.5 pb-15">
      {data.map((p) => (
        <PokemonCard
          key={p.name}
          pokemon={p}
          componentName={componentName}
          setComponentName={setComponentName}
        />
      ))}
    </div>
  );
}
