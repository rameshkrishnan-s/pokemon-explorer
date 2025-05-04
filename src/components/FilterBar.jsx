import React from "react";

const FilterBar = ({ search, setSearch, types, selectedType, setSelectedType }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type}>{type}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
