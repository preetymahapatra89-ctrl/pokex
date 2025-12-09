import { useEffect } from "react";
import PokemonCard from "./PokemonCard";
import type { Pokemon } from "../types/pokemon";

interface Props {
  favourites: Pokemon[];
  setFavourites: React.Dispatch<React.SetStateAction<any[]>>;
  componentName: string;
  setComponentName: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function Favourites({favourites, setFavourites, componentName, setComponentName} : Props) {
useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favourites") || "[]");
    setFavourites(favs);
  }, []);

  if( favourites.length === 0 ) return <p>No favourites added yet</p>;

  return (
    <>
      <h2>Your Favourites</h2>
      <div className="pokemon-grid">
          {favourites.map((p) => (
            <PokemonCard key={p.name} pokemon={p} componentName={componentName} setComponentName={setComponentName}/>
          ))}
      </div>
        
    </>
  );
}
