import type { PokemonAdditionalDetails } from "../types/pokemon";
export interface PokemonCardProps {
  pokemon: PokemonAdditionalDetails;
  componentName: string;
  setComponentName: React.Dispatch<React.SetStateAction<string>>;
}
