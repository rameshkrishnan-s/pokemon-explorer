// src/App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";
import TypeFilter from "./components/TypeFilter";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=150");
      const results = res.data.results;

      const pokemonData = await Promise.all(
        results.map((p) => axios.get(p.url).then((res) => res.data))
      );

      setPokemonList(pokemonData);
      setFilteredPokemon(pokemonData);
      setLoading(false);
    } catch (err) {
      setError("Failed to load Pokémon.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    let filtered = pokemonList;

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== "All") {
      filtered = filtered.filter((p) =>
        p.types.some((t) => t.type.name === selectedType.toLowerCase())
      );
    }

    setFilteredPokemon(filtered);
  }, [searchTerm, selectedType, pokemonList]);

  return (
    <div className="app-container">
      <header>
        <h1>Pokémon Explorer</h1>
      </header>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TypeFilter setSelectedType={setSelectedType} />
      {loading && <p>Loading Pokémon...</p>}
      {error && <p>{error}</p>}
      {!loading && filteredPokemon.length === 0 && <p>No Pokémon found.</p>}
      <div className="pokemon-grid">
        {filteredPokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    </div>
  );
};

export default App;
