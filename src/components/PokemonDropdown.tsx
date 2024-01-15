import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { PokemonData } from "../types/types";

const PokemonDropdown = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<string>("");
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

  useEffect(() => {
    if (selectedPokemon && !pokemonData) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
        .then((response) => {
          setPokemonData(response.data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [pokemonData, selectedPokemon]);

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setPokemonData(null); // Reset data
    setSelectedPokemon(event.target.value);
  };

  return (
    <div>
      <select value={selectedPokemon} onChange={handleSelect}>
        <option value="">Select a Pokémon</option>
        <option value="pikachu">Pikachu</option>
        <option value="charmander">Charmander</option>
        <option value="bulbasaur">Bulbasaur</option>
        {/* Add more options as needed */}
      </select>

      {pokemonData && (
        <div>
          <h3>{pokemonData.name}</h3>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          {/* Display more data as needed */}
        </div>
      )}
    </div>
  );
};

export default PokemonDropdown;
