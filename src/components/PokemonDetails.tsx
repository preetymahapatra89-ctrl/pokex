import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import type { Pokemon } from "../types/pokemon";

interface Props {
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  addToFavourite: (pokemon: Pokemon) => void;  // ← FIX HERE
}

export default function PokemonDetails({ setError, error, setLoading, loading, addToFavourite }: Props) {

  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const { id } = useParams();
  

  useEffect(() => {
    if (!id) return; // stop if id is undefined  
    fetchPokemonDetails(id);
  }, [id]);

  const fetchPokemonDetails = async (id: string) => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
      const data = await res.json();
      setPokemon(data);
      setLoading(false);
    } catch {
      setError(true);
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Some Error Occured...</p>;

  const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");

  const isFavourite = favourites.some((p: Pokemon) => p.id === pokemon.id);

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon?.sprites?.front_default} alt={pokemon.name} />
       <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Base XP: {pokemon.base_experience}</p>
      <p><span className="label">Types: </span> 
        {pokemon?.types?.map(t => t.type.name).join(", ")}
      </p>
      {isFavourite ? "⭐ Added to Favourites!" : 
        <button onClick={() => addToFavourite(pokemon)}>
          Add to Favourite
        </button>
      }
      
    </div>
  );

}
