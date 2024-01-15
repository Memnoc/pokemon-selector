# Pokemon Dropdown App

In this app we demonstrate few fundamental concepts of handling API concepts in React.

### PokemonDropdown component

Selects a pokemon option from a dropdow and makes a single API call for each selection. This is done using only Axios as an external library and vanilla React.

- `ChangeEvent` is a built-in type for event handlers
- `pokemonData` stores the fetched data
- `setSelectedPokemon` tracks the currently selected pokemon's name (string)
- `setPokemonData` a function to update `pokemonData`

```typescript
ChangeEvent: Type from React, used for typing the event in event handlers.
```

- `useState` is used to manage the dropdown state and the fetched data
- `useEffect` to make the API call when the dropdown values changes, **but only if the data hasn't been fetched before**

- `selectedPokemon` state is updated when we select something from the dropdown.

```typescript
const [selectedPokemon, setSelectedPokemon] = useState("");
```

- `useEffect` hook listens for changes to `selectedPokemon`
- it is triggered when `pokemonData` or `selectedPokemon` changes.
- when you select a pokemon `(selectedPokemon)` and no data is loaded `(!pokemonData)` an API call is made fetching the data about that selected pokemon.

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

### Rendering

- when a different pokemon is selectd, `pokemonData` is reset to null by `handleSelect` to allow a new fetch.

```typescript
const handleSelect = (event) => {
  setPokemonData(null);
  setSelectedPokemon(event.target.value);
};
```

## More details

### State Initialization:

- `useState<string>("")`: Initializes `selectedPokemon` as an empty string.
- `useState<PokemonData | null>(null)`: Initializes `pokemonData` as null. `PokemonData` is likely a custom interface or type representing the structure of the data received from the Pokémon API.

### Fetching Data on State Change:

- `useEffect` is used for side effects, in this case, fetching data when the selected Pokémon changes.
- The API call is made only if a Pokémon is selected (`selectedPokemon`) and `pokemonData` is not already fetched.
- `axios.get` makes a GET request to the Pokémon API.
- The dependency array `[pokemonData, selectedPokemon]` means this effect runs when either `pokemonData` or `selectedPokemon` changes.

### Handling User Selection:

- `handleSelect` is an event handler for the `<select>` element.
- When a new Pokémon is selected, it resets `pokemonData` to null and sets `selectedPokemon` to the selected value.

### Conditional Rendering:

- The component conditionally renders Pokémon data (`<h3>` for the name and an `<img>` for the sprite) if `pokemonData` is available.

### Dropdown Options:

- The dropdown contains hardcoded options for Pokémon like "Pikachu", "Charmander", and "Bulbasaur".
- More options can be added similarly.

This component is a typical example of a React functional component utilizing hooks for state management and side effects. It demonstrates fetching and displaying data based on user input, a common pattern in React applications.
