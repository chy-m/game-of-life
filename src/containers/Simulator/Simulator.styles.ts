import styled from 'styled-components'
import { Table, TableCell } from '@material-ui/core'

export const StyledSimulator = styled.div`
  display: grid;
  grid-gap: 32px 0;
`

export const StyledActions = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-gap: 0 24px;
  align-items: center;
  justify-content: center;
`

export const StyledTable = styled(Table)`
  && {
    width: fit-content;
  }
  margin: 0 auto;
  border-collapse: separate;
  border-spacing: 0px;
  tr,
  td {
    border: solid 1px #5f5252de;
  }
`

export const StyledTableCell = styled(TableCell)<{ $isActive: number }>`
  height: 20px;
  width: 20px;
  background-color: ${({ $isActive }) => ($isActive ? '#ffe1e6' : undefined)};
`
