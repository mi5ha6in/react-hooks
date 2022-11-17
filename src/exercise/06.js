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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {hasError: false, error: null}
  }

  static getDerivedStateFromError(error) {
    return {hasError: true, error: error}
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div role="alert">
          There was an error:{' '}
          <pre style={{whiteSpace: 'normal'}}>{this.state.error?.message}</pre>
        </div>
      )
    }

    return this.props.children
  }
}

function PokemonInfo({pokemonName}) {
  const initialState = {
    pokemon: null,
    error: null,
    status: 'idle',
  }

  const [state, setState] = React.useState(initialState)

  React.useEffect(() => {
    const getPokemon = async () => {
      if (pokemonName) {
        setState(state => ({...state, ...{pokemon: null, status: 'pending'}}))
        try {
          const pokemonInfo = await fetchPokemon(pokemonName)
          setState(state => ({
            ...state,
            ...{pokemon: pokemonInfo, status: 'resolved'},
          }))
        } catch (error) {
          setState(state => ({...state, ...{error, status: 'rejected'}}))
        }
      }
    }
    getPokemon()
  }, [pokemonName])

  const getInfoMessage = () => {
    switch (state.status) {
      case 'idle':
        return 'Submit a pokemon'
      case 'pending':
        return <PokemonInfoFallback name={pokemonName} />
      case 'resolved':
        return <PokemonDataView pokemon={state.pokemon} />
      case 'rejected':
        throw new Error()
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
        <ErrorBoundary>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
