import React from "react";

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10 px-4 md:px-0 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-4">
        About This Project
      </h1>

      <p className="mb-6">
        This project is a demo application built using the public
        <strong className="text-blue-600"> PokéAPI </strong>. It allows users to
        browse Pokémon, view details, and explore abilities. The main purpose of
        this project is to showcase API integration, component design, routing,
        and state management.
      </p>

      <h2 className="text-2xl font-bold text-blue-700 mb-3">What You Can Do</h2>

      <ul className="list-disc list-inside space-y-2 mb-6">
        <li>Browse a list of all Pokémon</li>
        <li>Search Pokémon by name</li>
        <li>View Pokémon details such as stats, types, and abilities</li>
        <li>Navigate between components using React Router</li>
        <li>Practice API calls and UI rendering</li>
      </ul>

      <h2 className="text-2xl font-bold text-blue-700 mb-3">Tech Stack</h2>

      <ul className="list-disc list-inside space-y-2 mb-6">
        <li>React + TypeScript</li>
        <li>PokéAPI</li>
        <li>React Router for navigation</li>
        <li>Hooks and reusable components</li>
      </ul>

      <p className="text-gray-700">
        This project is intended for learning purposes, helping developers
        understand how to work with public APIs and structure a small React
        application. Have fun exploring the Pokémon world! 🎉
      </p>
    </div>
  );
};

export default About;
