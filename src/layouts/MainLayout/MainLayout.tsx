import React from 'react'
import { StyledMainLayout, StyledMainContent } from './MainLayout.styles'
import { Container } from '@material-ui/core'

export const MainLayout = ({ children }) => {
  return (
    <StyledMainLayout>
      <StyledMainContent>
        <Container data-testid='container' size='large'>
          {children}
        </Container>
      </StyledMainContent>
    </StyledMainLayout>
  )
}

export default MainLayout
