import { useEffect, useState } from 'react'
import Header from "./components/Header"
import './App.css'
import Footer from './components/footer'
import type {Pokemon} from "../src/types/pokemon"
import  PokemonGrid from "../src/components/PokemonGrid"

function App() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([])
  const [filtered, setFiltered] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try{
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
      const data = await res.json();

      const formatted = data.results.map((p: any) => {
        const id = p.url.split("/")[6];
        return {
          name: p.name,
          url: p.url,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        
        }
      });
      setAllPokemon(formatted);
      setFiltered(formatted);
      setLoading(false);
    } catch {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <>
      <Header pokemon={allPokemon} setFiltered={setFiltered}/>

      <main className="container">
        {loading && <div className="loading">Loading Pokémon...</div>}
        {error && <div className="error">Failed to load data.</div>}
        {!loading && !error && <PokemonGrid data={filtered} />}
      </main>

      < Footer />
    </>
  )
}

export default App
