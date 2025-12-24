import type { PokemonAdditionalDetails } from "./pokemon";
export interface FavouritesProps {
  favourites: PokemonAdditionalDetails[];
  setFavourites: React.Dispatch<
    React.SetStateAction<PokemonAdditionalDetails[]>
  >;
  componentName: string;
  setComponentName: React.Dispatch<React.SetStateAction<string>>;
}
