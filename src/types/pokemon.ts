export interface Pokemon {
  name: string;
  url: string;
  id: string;
  image: string;
  /* sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  base_experience: number;
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[]; */
}
export interface PokemonAdditionalDetails extends Pokemon {
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  base_experience: number;
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
}
