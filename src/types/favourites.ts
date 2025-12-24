import type { Pokemon } from "./pokemon";
export interface FavouritesProps {
  favourites: Pokemon[];
  setFavourites: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  componentName: string;
  setComponentName: React.Dispatch<React.SetStateAction<string>>;
}
