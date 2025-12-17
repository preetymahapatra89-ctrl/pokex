
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About"
import Stats from "./components/Stats"
import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import Favourites from "./components/Favourites"
import PokemonDetails from "./components/PokemonDetails"
import CommentBox from "./components/CommentBox"
import './App.css'
import Footer from './components/footer'
import type {Pokemon} from "../src/types/pokemon"
import  PokemonGrid from "../src/components/PokemonGrid"

function App() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([])
  const [filtered, setFiltered] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [companentName, setComponentName] = useState("Favourites");
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem("favourites") || "[]"));

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
          id,
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

  const handleSearch = (value: string) => {
    setSearchKey(value);
    value = value.toLowerCase();
    const result = allPokemon.filter((p) => p.name.includes(value));
    setFiltered(result);
  };

  const addToFavourite = (pokemon) => {
    const already = favourites.find((p) => p.id === pokemon.id);
    if (!already) {
      const newFavs = [...favourites, pokemon];
      setFavourites(newFavs);
      localStorage.setItem("favourites", JSON.stringify(newFavs));
    }
  };

  return (
    <BrowserRouter>
      <Header />

      <main className="container">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
               <SearchBar onSearch={handleSearch} searchKey={searchKey}/>
                {loading && <div className="loading">Loading Pokémon...</div>}
                {error && <div className="error">Failed to load data.</div>}
                {!loading && !error && <PokemonGrid data={filtered} />}
              </>
            }
          />

          {/* About Page */}
          <Route path="/about" element={<About />} />
          <Route path="/pokemon/:id" element={
            <PokemonDetails setError={setError}
              error={error} setLoading={setLoading}
              loading={loading} addToFavourite={addToFavourite}
            />
          } 
          />
          <Route path="/stats" element={<Stats />} />
          <Route path="/comments" element={<CommentBox />} />
          <Route path="/favourites" element={<Favourites  setFavourites={setFavourites} 
                  favourites={favourites} componentName={companentName}
                  setComponentName={setComponentName}
            />} 
          />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App
