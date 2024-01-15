import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { PokemonData } from "../types/types";

const PokemonDropdown = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<string>("");
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

  //NOTE: This is one good use of useEffect
  // notice the double array dependency -> check the README
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

  //NOTE: let handlers validate onClicks
  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setPokemonData(null); // Reset state
    setSelectedPokemon(event.target.value);
  };

  return (
    <div>
      <select value={selectedPokemon} onChange={handleSelect}>
        <option value="">Select a Pokémon</option>
        <option value="pikachu">Pikachu</option>
        <option value="charmander">Charmander</option>
        <option value="bulbasaur">Bulbasaur</option>
      </select>

      {pokemonData && (
        <div>
          <h3>{pokemonData.name}</h3>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        </div>
      )}
    </div>
  );
};

export default PokemonDropdown;
