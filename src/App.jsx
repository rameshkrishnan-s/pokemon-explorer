import React, { useState, useEffect } from "react";
import FilterBar from "./components/FilterBar";
import PokemonCard from "./components/PokemonCard";
import CompareBox from "./components/CompareBox";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [types, setTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [compare, setCompare] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const data = await res.json();
      const details = await Promise.all(
        data.results.map((p) => fetch(p.url).then((res) => res.json()))
      );
      setPokemonList(details);
      setFilteredList(details);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTypes = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/type");
      const data = await res.json();
      setTypes(data.results.map((t) => t.name));
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    let filtered = pokemonList.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (selectedType) {
      filtered = filtered.filter((p) =>
        p.types.some((t) => t.type.name === selectedType)
      );
    }
    setFilteredList(filtered);
  }, [search, selectedType, pokemonList]);

  const toggleCompare = (pokemon) => {
    if (compare.some((p) => p.id === pokemon.id)) {
      setCompare(compare.filter((p) => p.id !== pokemon.id));
    } else if (compare.length < 2) {
      setCompare([...compare, pokemon]);
    }
  };

  const clearCompare = () => {
    setCompare([]);
  };

  return (
    <div className="container">
      <h1>Pokémon Explorer</h1>

      {/* If 2 Pokémon selected, show only compare box */}
      {compare.length === 2 ? (
        <CompareBox pokemons={compare} onClear={clearCompare} />
      ) : (
        <>
          <FilterBar
            search={search}
            setSearch={setSearch}
            types={types}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
          <div className="grid">
            {filteredList.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onCompare={toggleCompare}
                isSelected={compare.some((p) => p.id === pokemon.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
