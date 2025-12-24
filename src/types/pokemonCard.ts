import type { Pokemon } from "../types/pokemon";
export interface PokemonCardProps {
  pokemon: Pokemon;
  componentName: string;
  setComponentName: React.Dispatch<React.SetStateAction<string>>;
}
