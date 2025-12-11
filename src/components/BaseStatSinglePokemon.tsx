import { useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Tooltip,
} from "recharts";

export default function BaseStatSinglePokemon() {
  const [pokemonName, setPokemonName] = useState("");
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchPokemon() {
    if (!pokemonName.trim()) return;

    setLoading(true);
    setError("");
    setStats([]);

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );

      if (!res.ok) {
        setError("Pokemon not found!");
        setLoading(false);
        return;
      }

      const data = await res.json();

      const formattedStats = data.stats.map((s: any) => ({
        stat: s.stat.name,
        value: s.base_stat,
      }));

      setStats(formattedStats);
    } catch (err) {
      setError("Something went wrong!");
    }

    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
      <h2>Pokemon Base Stat Viewer</h2>

      {/* SEARCH INPUT */}
      <div style={{ display: "flex", marginBottom: 20, gap: 10 }}>
        <input
          type="text"
          placeholder="Enter Pokemon name (e.g., pikachu)"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchPokemon()}
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "16px",
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={fetchPokemon}
          style={{
            padding: "10px 16px",
            fontSize: "16px",
            borderRadius: 6,
            cursor: "pointer",
            background: "#4e8cff",
            color: "white",
            border: "none",
          }}
        >
          Load
        </button>
      </div>

      {/* ERRORS */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* LOADING */}
      {loading && <p>Loading stats...</p>}

      {/* RADAR CHART */}
      {stats.length > 0 && (
        <RadarChart
          cx={250}
          cy={200}
          outerRadius={150}
          width={500}
          height={400}
          data={stats}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="stat" />
          <Tooltip />
          <Radar
            name={pokemonName}
            dataKey="value"
            stroke="#4e8cff"
            fill="#4e8cff"
            fillOpacity={0.6}
          />
        </RadarChart>
      )}
    </div>
  );
}
