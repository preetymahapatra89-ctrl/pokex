import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { PokemonDetailsProps } from "../types/pokemonDetails";
import type { Pokemon, PokemonAdditionalDetails } from "../types/pokemon";
import ConfirmModal from "./ui/ConfirmModal";
import { getPokemonById } from "../services/pokemon.service";

export default function PokemonDetails({
  setError,
  error,
  setLoading,
  loading,
  addToFavourite,
}: PokemonDetailsProps) {
  const [pokemon, setPokemon] = useState<PokemonAdditionalDetails | null>(null);
  const { id } = useParams();
  const [showConfirm, setShowConfirm] = useState(false);
  const [pokemonToRemove, setPokemonToRemove] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // stop if id is undefined

    const fetchPokemonDetails = async (id: string) => {
      try {
        const data = await getPokemonById(id);
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
  if (!pokemon) {
    return <p>Loading Pokémon...</p>;
  }

  const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");

  const isFavourite = favourites.some((p: Pokemon) => p.id === pokemon.id);

  const handleRemoveFromFavourites = (id: string) => {
    setPokemonToRemove(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (pokemonToRemove === null) return;

    const updatedFavourites = favourites.filter(
      (p: Pokemon) => p.id !== pokemonToRemove
    );
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    setPokemonToRemove(null);
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setPokemonToRemove(null);
    setShowConfirm(false);
  };

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
        <div>
          <p className="text-yellow-500 font-semibold flex items-center justify-center gap-1">
            ⭐ Added to Favourites!
          </p>
          <button
            onClick={() => handleRemoveFromFavourites(pokemon.id)}
            className="
            ml-3mt-3
            w-full
            text-red-600 hover:text-red-800 
            text-sm 
            py-2 px-4
            rounded-lg
            transition 
            cursor-pointer"
          >
            ❌ Remove From Favourites
          </button>

          {/* Modal For Delete Confirmation */}
          <ConfirmModal
            open={showConfirm}
            title="Delete Favourite?"
            message="Are you sure you want to remove the pokemon from Favourites?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        </div>
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
