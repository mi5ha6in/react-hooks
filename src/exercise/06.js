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
  const [error, setError] = React.useState(null)
  const [status, setStatus] = React.useState('idle')

  React.useEffect(() => {
    const getPokemon = async () => {
      if (pokemonName) {
        setPokemon(null)
        setStatus('pending')
        try {
          const pokemonInfo = await fetchPokemon(pokemonName)
          setPokemon(pokemonInfo)
          setStatus('resolved')
        } catch (error) {
          setError(error)
          setStatus('rejected')
        }
      }
    }
    getPokemon()
  }, [pokemonName])

  const errorElement = (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error?.message}</pre>
    </div>
  )

  const getInfoMessage = () => {
    switch (status) {
      case 'idle':
        return 'Submit a pokemon'
      case 'pending':
        return <PokemonInfoFallback name={pokemonName} />
      case 'resolved':
        return <PokemonDataView pokemon={pokemon} />
      case 'rejected':
        return errorElement
      default:
        return 'Submit a pokemon'
    }
  }

  return <>{getInfoMessage()}</>
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
