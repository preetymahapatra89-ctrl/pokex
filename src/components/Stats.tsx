import { useEffect, useState } from "react";
import BaseStatSinglePokemon from "./BaseStatSinglePokemon"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { Bar, BarChart,  XAxis, YAxis   } from 'recharts';

export default function PokemonTypeDistribution() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Optional: nice colors
  const COLORS = [
    "#FF5959", "#4E8CFF", "#78C850", "#F5DE50", "#AA5BAA",
    "#FF9C54", "#9DB7F5", "#A7DB8D", "#FA92B2", "#D1C17D",
    "#A292BC", "#A38C21", "#EE99AC", "#C03028", "#705848",
    "#6F35FC", "#98D8D8", "#735797"
  ];

  useEffect(() => {
    async function loadTypes() {
      // Fetch Pokémon
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
      const list = await res.json();

      const typeCount: Record<string, number> = {};

      for (const p of list.results) {
        const pokemonRes = await fetch(p.url);
        const pokemon = await pokemonRes.json();

        pokemon.types.forEach((t: any) => {
          const typeName = t.type.name;
          typeCount[typeName] = (typeCount[typeName] || 0) + 1;
        });
      }

      // Convert to Recharts format
      const formatted = Object.entries(typeCount).map(([type, count]) => ({
        name: type,
        value: count
      }));

      setData(formatted);
      setLoading(false);
      console.log({data})
    }

    loadTypes();
  }, []);

  if (loading) return <p>Loading…</p>;

  return (
    
  <>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: "40px",          // space between charts
      flexWrap: "wrap"      // allows wrap on small screens
    }}
  >
    <PieChart width={450} height={450} style={{border:"2px solid black", paddingTop: "40px", marginTop: "20px"}}>
      <Pie
        dataKey="value"
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={150}
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
    <BarChart
      style={{
        width: '100%',
        maxWidth: '800px',
        maxHeight: '80vh',
        aspectRatio: 1.618,
        border:"2px solid black",
        marginTop: "20px"
      }}
      responsive
      data={data}
    >
      <XAxis dataKey="name" />
      <YAxis
        type="number"
        width={100}
        label={{ value: 'No. of Pokemons', position: 'insideLeft', dx: 0, dy: 20, angle: -90 }}
      />
      <Bar dataKey="value" unit="" />
      <Tooltip />
    </BarChart>
  </div>
      <BaseStatSinglePokemon />

  </>
    
  );
}
