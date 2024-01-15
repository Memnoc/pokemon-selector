# Pokemon Dropdown App

In this app we demonstrate few fundamental concepts of handling API concepts in React.

### PokemonDropdown.tsx

Selects a pokemon option from a dropdow and makes a single API call for each selection. This is done using only Axios as an external library and vanilla React.

- `useState` is used to manage the dropdown state and the fetched data
- `useEffect` to make the API call when the dropdown values changes, **but only if the data hasn't been fetched before**

### Data flow

- `selectedPokemon` state is updated when we select something from the dropdown.

```typescript
const [selectedPokemon, setSelectedPokemon] = useState("");
```

- `useEffect` hook listens for changes to `selectedPokemon`

```typescript
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
```

- when `selectedPokemon` is udpated, and `pokemonData` is `null` it means no data has been fetched,and therfore an API call is made for to fetch the data of the selected pokemon.
- the data is stored in `pokemonData` and this persists across renders.
- when a different pokemon is selectd, `pokemonData` is reset to null by `handleSelect` to allow a new fetch.

```typescript
const handleSelect = (event) => {
  setPokemonData(null);
  setSelectedPokemon(event.target.value);
};
```
