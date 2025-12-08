import { useParams } from "react-router-dom";

export default function Pokemon() {
  const { name } = useParams();
  return <h1>Pokemon: {name}</h1>;
}
