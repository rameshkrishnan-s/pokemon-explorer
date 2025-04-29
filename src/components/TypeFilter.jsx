const types = ["All", "Fire", "Water", "Grass", "Electric", "Flying", "Bug", "Poison", "Ground", "Psychic", "Normal", "Fighting", "Ghost", "Rock", "Ice", "Dragon", "Fairy", "Dark", "Steel"];

const TypeFilter = ({ setSelectedType }) => {
  return (
    <select onChange={(e) => setSelectedType(e.target.value)}>
      {types.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default TypeFilter;
