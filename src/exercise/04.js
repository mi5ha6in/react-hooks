// useState: tic tac toe
// 💯 useLocalStorageState
// http://localhost:3000/isolated/final/04.extra-2.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({onClick, squares}) {

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {

  const [history, setHistory] = useLocalStorageState(
    'history',
    [Array(9).fill(null)]
  )

  const [step, setStep] = useLocalStorageState('step', 0)
  const [squares, setSquares] = React.useState(history[step])

  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)

  function selectSquare(square) {
    if (winner || squares[square]) {
      return
    }

    const squaresCopy = [...squares]
    squaresCopy[square] = nextValue;
    setSquares(squaresCopy)
    setStep(() => step + 1)
    const historyCopy = history.slice(0, step + 1);
    historyCopy.push(squaresCopy)
    setHistory(historyCopy)
  }

  function restart() {
    setHistory([Array(9).fill(null)])
    setSquares(Array(9).fill(null))
    setStep(0)
  }

  function HistoryButton({index, ...props}) {
    const calculateHistory = () => {
      setSquares(history[index])
      setStep(index)
    }
    return <button {...props} onClick={calculateHistory}>{index}</button>
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={squares} />
        <button className="restart" onClick={restart}>
        restart
      </button>
      </div>
      <div className="game-info">
      <div>{status}</div>
      {history.map((i, index) => {
        if (step === index) {
          return <HistoryButton style={{backgroundColor: 'red'}} key={index} index={index}/>
        } else {
          return <HistoryButton key={index} index={index}/>
        }
      })}
    </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
