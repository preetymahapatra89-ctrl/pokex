// import { useEffect } from "react";
import PokemonCard from "./PokemonCard";
import type { FavouritesProps } from "../types/favourites";

export default function Favourites({
  favourites,
  componentName,
  setComponentName,
}: FavouritesProps) {
  if (favourites.length === 0) return <p>No favourites added yet</p>;

  return (
    <>
      <h2 className="text-lg md:text-2xl font-extrabold tracking-wide text-blue-700">
        Your Favourites
      </h2>
      <div className="pokemon-grid">
        {favourites.map((p) => (
          <PokemonCard
            key={p.name}
            pokemon={p}
            componentName={componentName}
            setComponentName={setComponentName}
          />
        ))}
      </div>
    </>
  );
}
