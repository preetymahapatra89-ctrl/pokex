import type { Pokemon } from "../types/pokemon";
import PokemonCard from "./PokemonCard";

interface Props {
  data: Pokemon[];
  componentName: string;
  setComponentName: React.Dispatch<React.SetStateAction<string>>;
}

export default function PokemonGrid({
  data,
  componentName,
  setComponentName,
}: Props) {
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
