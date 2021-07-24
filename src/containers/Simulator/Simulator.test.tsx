import React from 'react'
import { render, fireEvent, screen, act } from '@testing-library/react'
import Simulator from './Simulator'
import { IS_ACTIVE_COLOR } from './Simulator.styles'

const initialActiveCells = ['1-2', '2-3', '3-3', '3-2', '3-1']
const expectedFirstGenDeadCells = ['1-2', '3-1']
const secondGenCells = ['2-1', '2-3', '3-2', '3-3', '4-2']
const expectedSecondGenDeadCells = ['2-1', '3-2']
const thirdGenCells = ['2-3', '3-1', '3-3', '4-2', '4-3']
const expectedThirdGenDeadCells = ['2-3', '3-1']
const fourthGenCells = ['2-2', '3-3', '3-4', '4-2', '4-3']

describe('Simulator', () => {
  it('should increase number of generations when user clicks next generation', () => {
    render(<Simulator />)

    expect(screen.getByText('Number of generations 0')).not.toBeNull()

    fireEvent.click(screen.getByText('Next generation'))

    expect(screen.getByText('Number of generations 1')).not.toBeNull()
  })

  it('should update cells correctly when user clicks next generation', () => {
    render(<Simulator />)

    initialActiveCells.forEach((cell) => {
      expect(screen.getByTestId(cell)).toHaveStyle(`background-color: undefined`)
    })

    initialActiveCells.forEach((cell) => {
      fireEvent.click(screen.getByTestId(cell))
    })

    initialActiveCells.forEach((cell) => {
      expect(screen.getByTestId(cell)).toHaveStyle(`background-color: ${IS_ACTIVE_COLOR}`)
    })

    fireEvent.click(screen.getByText('Next generation'))

    expectedFirstGenDeadCells.forEach((cell) => {
      expect(screen.getByTestId(cell)).toHaveStyle(`background-color: undefined`)
    })

    secondGenCells.forEach((cell) => {
      expect(screen.getByTestId(cell)).toHaveStyle(`background-color: ${IS_ACTIVE_COLOR}`)
    })

    fireEvent.click(screen.getByText('Next generation'))

    expectedSecondGenDeadCells.forEach((cell) => {
      expect(screen.getByTestId(cell)).toHaveStyle(`background-color: undefined`)
    })

    thirdGenCells.forEach((cell) => {
      expect(screen.getByTestId(cell)).toHaveStyle(`background-color: ${IS_ACTIVE_COLOR}`)
    })

    fireEvent.click(screen.getByText('Next generation'))

    expectedThirdGenDeadCells.forEach((cell) => {
      expect(screen.getByTestId(cell)).toHaveStyle(`background-color: undefined`)
    })

    fourthGenCells.forEach((cell) => {
      expect(screen.getByTestId(cell)).toHaveStyle(`background-color: ${IS_ACTIVE_COLOR}`)
    })
  })

  it('should reset cells when user clicks reset', () => {
    render(<Simulator />)

    initialActiveCells.forEach((cell) => {
      expect(screen.getByTestId(cell)).toHaveStyle(`background-color: undefined`)
    })

    initialActiveCells.forEach((cell) => {
      fireEvent.click(screen.getByTestId(cell))
    })

    initialActiveCells.forEach((cell) => {
      expect(screen.getByTestId(cell)).toHaveStyle(`background-color: ${IS_ACTIVE_COLOR}`)
    })

    fireEvent.click(screen.getByText('Reset'))

    initialActiveCells.forEach((cell) => {
      expect(screen.getByTestId(cell)).toHaveStyle(`background-color: undefined`)
    })
  })

  it('should run every one second when user selects start and stop when they click stop', () => {
    jest.useFakeTimers()

    render(<Simulator />)

    expect(screen.getByText('Number of generations 0')).not.toBeNull()

    fireEvent.click(screen.getByText('Start'))

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(screen.getByText('Number of generations 1')).not.toBeNull()

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(screen.getByText('Number of generations 2')).not.toBeNull()

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(screen.getByText('Number of generations 3')).not.toBeNull()

    fireEvent.click(screen.getByText('Stop'))

    expect(screen.getByText('Number of generations 3')).not.toBeNull()
  })
})
