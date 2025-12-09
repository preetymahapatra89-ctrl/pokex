import type { Pokemon } from "../types/pokemon";
import PokemonCard from "./PokemonCard";

interface Props {
  data: Pokemon[];
  componentName: string
  setComponentName: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function PokemonGrid({ data, componentName, setComponentName }: Props) {
  return (
    <div className="pokemon-grid">
      {data.map((p) => (
        <PokemonCard key={p.name} pokemon={p} componentName={componentName} setComponentName={setComponentName}/>
      ))}
    </div>
  );
}
