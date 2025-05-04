import React from "react";

const PokemonCard = ({ pokemon, onCompare, isSelected }) => {
  return (
    <div className="card" style={{ background: isSelected ? "#ffeaa7" : "white" }}>
      <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Type: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
      <button onClick={() => onCompare(pokemon)}>
        {isSelected ? "Remove" : "Compare"}
      </button>
    </div>
  );
};

export default PokemonCard;
