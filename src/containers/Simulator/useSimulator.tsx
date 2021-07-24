import { useState, useCallback, useEffect } from 'react'
import produce from 'immer'
import { GridType } from './Simulator.types'
import { NUMBER_ROWS, NUMBER_COLUMNS } from 'config'

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
]

export const generateInitialState = () =>
  Array.from({ length: NUMBER_ROWS }).map(() => Array.from({ length: NUMBER_COLUMNS }).fill(0)) as number[][]

export const useSimulator = () => {
  const [grid, setGrid] = useState<GridType>(() => {
    return generateInitialState()
  })
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [generations, setGenerations] = useState<number>(0)

  const handleOnClickCell = (rowIndex: number, colIndex: number) => {
    const newGrid = produce(grid, (gridCopy) => {
      gridCopy[rowIndex][colIndex] = grid[rowIndex][colIndex] ? 0 : 1
    })
    setGrid(newGrid)
  }

  const handleNextGeneration = useCallback(() => {
    setGenerations((prev) => prev + 1)
    setGrid((grid) => {
      return produce(grid, (newGrid) => {
        for (let rowsIndex = 0; rowsIndex < NUMBER_ROWS; rowsIndex++) {
          for (let columnIndex = 0; columnIndex < NUMBER_COLUMNS; columnIndex++) {
            let neighbors = 0

            operations.forEach(([x, y]) => {
              const newRowIndex = rowsIndex + x
              const newColumnIndex = columnIndex + y
              if (
                newRowIndex >= 0 &&
                newRowIndex < NUMBER_ROWS &&
                newColumnIndex >= 0 &&
                newColumnIndex < NUMBER_COLUMNS
              ) {
                neighbors += grid[newRowIndex][newColumnIndex]
              }
            })
            if (neighbors < 2 || neighbors > 3) {
              newGrid[rowsIndex][columnIndex] = 0
            } else if (grid[rowsIndex][columnIndex] === 0 && neighbors === 3) {
              newGrid[rowsIndex][columnIndex] = 1
            }
          }
        }
      })
    })
  }, [])

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      handleNextGeneration()
    }, 1000)

    return () => clearInterval(interval)
  }, [handleNextGeneration, isRunning])

  return {
    grid,
    generations,
    setGrid,
    setIsRunning,
    setGenerations,
    handleNextGeneration,
    handleOnClickCell,
  }
}

export default useSimulator
