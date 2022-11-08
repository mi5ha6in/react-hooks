// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName

  const useLocalStorageState = (initialValue, storName) => {
    const getValue = () => {
      const storeyedValue = window.localStorage.getItem(storName)
      const value = storeyedValue ? JSON.parse(storeyedValue) : initialValue
      return value
    }
  
    const [value, setValue] = React.useState(() => getValue())
  
    // 🐨 Here's where you'll use `React.useEffect`.
    // The callback should set the `name` in localStorage.
    // 💰 window.localStorage.setItem('name', name)
    React.useEffect(() => {
      window.localStorage.setItem(storName, JSON.stringify(value))
    }, [value, storName]);

    return [value, setValue]
  }

  const [name, setName] = useLocalStorageState(initialName, 'name')


  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
