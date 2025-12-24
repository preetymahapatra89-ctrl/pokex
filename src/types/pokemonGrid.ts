import type { Pokemon } from "./pokemon";
export interface PokemonGridProps {
  data: Pokemon[];
  componentName: string;
  setComponentName: React.Dispatch<React.SetStateAction<string>>;
}
