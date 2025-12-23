export interface PokemonStatsItem {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  stats: PokemonStatsItem[];
  type: {
    name: string;
  };
  name: string;
  value: number;
}

export interface PokemonStatForChart {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface BaseStatForSinglePokemon {
  stat: string;
  value: number;
  [key: string]: string | number;
}
