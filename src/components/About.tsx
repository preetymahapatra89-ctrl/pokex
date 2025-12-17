import React from "react";

const About: React.FC = () => {
  return (
    <div style={{ maxWidth: 800, margin: "40px auto", lineHeight: 1.6 }}>
      <h1>About This Project</h1>

      <p>
        This project is a demo application built using the public 
        <strong> PokéAPI </strong>. 
        It allows users to browse Pokémon, view details, explore abilities.
        The main purpose of this project is to showcase API integration, 
        component design, routing, and state management.
      </p>

      <h2>What You Can Do</h2>
      <ul>
        <li>Browse a list of all Pokémon</li>
        <li>Search Pokémon by name</li>
        <li>View Pokémon details such as stats, types, and abilities</li>
        <li>Navigate between components using React Router</li>
        <li>Practice API calls and UI rendering</li>
      </ul>

      <h2>Tech Stack</h2>
      <ul>
        <li>React + TypeScript</li>
        <li>PokéAPI (https://pokeapi.co)</li>
        <li>React Router for navigation</li>
        <li>Use of Hooks + Components</li>
      </ul>

      <p style={{ marginTop: 20 }}>
        This project is intended for learning purposes, helping developers
        understand how to work with public APIs and structure a small React
        application. Have fun exploring the Pokémon world!
      </p>
    </div>
  );
};

export default About;
