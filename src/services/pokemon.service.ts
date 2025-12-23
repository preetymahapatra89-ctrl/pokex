import { apiGet } from "./api";
import type { Pokemon } from "../types/pokemon";
import type { PokemonStat } from "../types/pokemonStat";

export function getPokemonList(limit = 20) {
  return apiGet<{ results: Pokemon[] }>(`/pokemon?limit=${limit}`);
}

export function getPokemonByName(name: string) {
  return apiGet<PokemonStat>(`/pokemon/${name.toLowerCase()}`);
}
