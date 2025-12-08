import { useParams } from "react-router-dom";

export default function PokemonDetails() {
  const { name } = useParams();

  return <h2>Details for {name}</h2>;
}
