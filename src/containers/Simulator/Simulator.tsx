import React from 'react'
import useSimulator, { generateInitialState } from './useSimulator'
import { SimulatorProps } from './Simulator.types'
import { StyledSimulator, StyledActions, StyledTable, StyledTableCell } from './Simulator.styles'
import { Button, TableBody, TableRow, Typography } from '@material-ui/core'

export const Simulator: React.FC<SimulatorProps> = () => {
  const {
    grid,
    generations,
    setGrid,
    setIsRunning,
    setGenerations,
    handleNextGeneration,
    handleOnClickCell,
  } = useSimulator()

  return (
    <StyledSimulator>
      <StyledActions>
        <Button variant='outlined' onClick={() => setIsRunning(true)}>
          Start
        </Button>
        <Button variant='outlined' onClick={() => setIsRunning(false)}>
          Stop
        </Button>
        <Button variant='outlined' onClick={() => handleNextGeneration()}>
          Next generation
        </Button>
        <Button
          variant='outlined'
          onClick={() => {
            setGenerations(0)
            setGrid(generateInitialState())
          }}
        >
          Reset
        </Button>
      </StyledActions>
      <StyledTable>
        <TableBody>
          {grid.map((rows, rowIndex) => (
            <TableRow key={rowIndex}>
              {rows.map((col, colIndex) => (
                <StyledTableCell
                  key={`${rowIndex}-${colIndex}`}
                  data-testid={`${rowIndex}-${colIndex}`}
                  onClick={() => handleOnClickCell(rowIndex, colIndex)}
                  $isActive={grid[rowIndex][colIndex]}
                />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
      <Typography variant='subtitle1' align='center'>
        <b> Number of generations {generations}</b>
      </Typography>
    </StyledSimulator>
  )
}

export default Simulator
