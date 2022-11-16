// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {

  const [pokemon, setPokemon] = React.useState(null)

  React.useEffect(() => {
    const getPokemon = async () => {
      if (pokemonName) {
        setPokemon(null)
        const pokemonInfo = await fetchPokemon(pokemonName)
        setPokemon(pokemonInfo)
      }
    }
    getPokemon()
  }, [pokemonName])

  const info = pokemon ? (
    <PokemonDataView pokemon={pokemon} />
  ) : pokemonName ? (
    <PokemonInfoFallback name={pokemonName} />
  ) : (
    'Submit a pokemon'
  )
  // 💣 remove this
  return <>{info}</>
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
