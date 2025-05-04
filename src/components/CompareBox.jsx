import React from "react";

const CompareBox = ({ pokemons, onClear }) => {
  return (
    <div className="compare-box">
      {pokemons.map((p) => (
        <div key={p.id} className="card" style={{ width: "280px" }}>
          <h3>{p.name}</h3>
          <img src={p.sprites.front_default} alt={p.name} />
          <p>Type: {p.types.map((t) => t.type.name).join(", ")}</p>
          <p>Height: {p.height}</p>
          <p>Weight: {p.weight}</p>
          <p>Base XP: {p.base_experience}</p>
          <h4>Stats</h4>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {p.stats.map((s) => (
              <li key={s.stat.name}>
                {s.stat.name}: {s.base_stat}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
        <button onClick={onClear}>Clear Comparison</button>
      </div>
    </div>
  );
};

export default CompareBox;
