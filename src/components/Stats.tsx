import { useEffect, useState } from "react";
import BaseStatSinglePokemon from "./BaseStatSinglePokemon";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
  XAxis,
  YAxis,
} from "recharts";
import type { PokemonStat, PokemonStatForChart } from "../types/pokemonStat";
import { getPokemonList } from "../services/pokemon.service";
import { ENV } from "../config/env";

export default function PokemonTypeDistribution() {
  const [data, setData] = useState<PokemonStatForChart[]>([]);
  const [loading, setLoading] = useState(true);

  // COLORS FOR PIE
  const COLORS = ENV.COLORS;

  useEffect(() => {
    async function loadTypes() {
      try {
        // Fetch Pokémon
        const list = await getPokemonList(100);

        const typeCount: Record<string, number> = {};

        for (const p of list.results) {
          const pokemonRes = await fetch(p.url);
          const pokemon = await pokemonRes.json();

          pokemon.types.forEach((t: PokemonStat) => {
            const typeName = t.type.name;
            typeCount[typeName] = (typeCount[typeName] || 0) + 1;
          });
        }

        // Convert to Recharts format
        const formatted: PokemonStatForChart[] = Object.entries(typeCount).map(
          ([type, count]) => ({
            name: type,
            value: count,
          })
        );

        setData(formatted);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch Pokemon List:", err);
        setData([]);
        setLoading(false);
      }
    }

    loadTypes();
  }, [data]);

  if (loading) return <p>Loading…</p>;

  return (
    <>
      <div className="flex justify-center items-start gap-6 md:gap-10 flex-wrap">
        <PieChart
          width={450}
          height={450}
          className="border-2 border-black pt-10 mt-5 rounded-lg shadow-md"
        >
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={150}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
        <div className="w-full max-w-[800px] max-h-[80vh] aspect-[1.618] border-2 border-black mt-5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis
                type="number"
                width={100}
                label={{
                  value: "No. of Pokemons",
                  position: "insideLeft",
                  dx: 0,
                  dy: 20,
                  angle: -90,
                }}
              />
              <Bar dataKey="value" unit="" />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* <BarChart
          style={{
            width: "100%",
            maxWidth: "800px",
            maxHeight: "80vh",
            aspectRatio: 1.618,
            border: "2px solid black",
            marginTop: "20px",
          }}
          responsive
          data={data}
        >
          <XAxis dataKey="name" />
          <YAxis
            type="number"
            width={100}
            label={{
              value: "No. of Pokemons",
              position: "insideLeft",
              dx: 0,
              dy: 20,
              angle: -90,
            }}
          />
          <Bar dataKey="value" unit="" />
          <Tooltip />
        </BarChart> */}
      </div>
      <BaseStatSinglePokemon />
    </>
  );
}
