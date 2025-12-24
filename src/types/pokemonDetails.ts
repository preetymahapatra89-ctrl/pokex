import type { Pokemon, PokemonAdditionalDetails } from "../types/pokemon";

export interface PokemonDetailsProps {
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  addToFavourite: (pokemon: Pokemon) => void;
  favourites: PokemonAdditionalDetails[];
  setFavourites: React.Dispatch<
    React.SetStateAction<PokemonAdditionalDetails[]>
  >;
}
