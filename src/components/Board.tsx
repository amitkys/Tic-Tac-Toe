import { Square } from "./Square";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import { calcuateStatus, calculateTurns, calculateWinner } from "../utils/helper";

const useGameStore = create(
  combine(
    { squares: Array(9).fill(null) as (string | null)[], xIsNext: true },
    (set) => {
      return {
        setSquares: (nextSquares: (string | null)[] | ((prev: (string | null)[]) => (string | null)[])) => {
          set((state) => ({
            squares:
              typeof nextSquares === 'function'
                ? nextSquares(state.squares)
                : nextSquares
          }))
        },
        setXIsNext: (nextXIsNext: boolean | ((prev: boolean) => boolean)) => {
          set((state) => ({
            xIsNext:
              typeof nextXIsNext === 'function'
                ? nextXIsNext(state.xIsNext)
                : nextXIsNext
          }))
        }
      }
    }
  ),
)

export default function Board() {
  const xIsNext = useGameStore((state) => state.xIsNext)
  const setXIsNext = useGameStore((state) => state.setXIsNext)
  const squares = useGameStore((state) => state.squares)
  const setSquares = useGameStore((state) => state.setSquares)
  const winner = calculateWinner(squares);
  const turns = calculateTurns(squares);
  const player = xIsNext ? 'X' : 'O'
  const status = calcuateStatus(winner, turns, player)

  function handleClick(i: number) {
    if (squares[i] || winner) return
    const nextSquares = squares.slice()
    nextSquares[i] = player
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  return (
    <>
      <div style={{ marginBottom: '0.5rem' }}>{status}</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          width: 'calc(3 * 2.5rem)',
          height: 'calc(3 * 2.5rem)',
          border: '1px solid #999',
        }}
      >
        {squares.map((square, squareIndex) => (
          <Square
            key={squareIndex}
            value={square}
            onSquareClick={() => handleClick(squareIndex)}
          />
        ))}
      </div>
    </>
  )
}
