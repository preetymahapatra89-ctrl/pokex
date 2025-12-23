import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Pokemon } from "../types/pokemon";

interface Props {
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  addToFavourite: (pokemon: Pokemon) => void;
}

export default function PokemonDetails({
  setError,
  error,
  setLoading,
  loading,
  addToFavourite,
}: Props) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return; // stop if id is undefined

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

    fetchPokemonDetails(id);
  }, [id, setLoading, setError]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Some Error Occured...</p>;

  const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");

  const isFavourite = favourites.some((p: Pokemon) => p.id === pokemon.id);

  return (
    <div
      className="
    max-w-sm mx-auto
    bg-white rounded-xl shadow-lg
    p-6
    text-center
    space-y-3
  "
    >
      <h2 className="text-2xl font-bold capitalize text-gray-800">
        {pokemon.name}
      </h2>

      <img
        src={pokemon?.sprites?.front_default}
        alt={pokemon.name}
        className="mx-auto w-32 h-32 object-contain"
      />

      <div className="text-gray-700 space-y-1">
        <p>
          <span className="font-semibold">Height:</span> {pokemon.height}
        </p>
        <p>
          <span className="font-semibold">Weight:</span> {pokemon.weight}
        </p>
        <p>
          <span className="font-semibold">Base XP:</span>{" "}
          {pokemon.base_experience}
        </p>

        <p>
          <span className="font-semibold">Types:</span>{" "}
          <span className="capitalize">
            {pokemon?.types?.map((t) => t.type.name).join(", ")}
          </span>
        </p>
      </div>

      {isFavourite ? (
        <p className="text-yellow-500 font-semibold flex items-center justify-center gap-1">
          ⭐ Added to Favourites!
        </p>
      ) : (
        <button
          onClick={() => addToFavourite(pokemon)}
          className="
        mt-3
        w-full
        bg-blue-600 hover:bg-blue-700
        text-white font-semibold
        py-2 px-4
        rounded-lg
        transition
      "
        >
          Add to Favourite
        </button>
      )}
    </div>
  );
}
