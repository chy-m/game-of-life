import React from 'react'
import { MainLayoutProps } from './MainLayout.types'
import { StyledMainLayout, StyledMainContent } from './MainLayout.styles'
import { Container } from '@material-ui/core'

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <StyledMainLayout>
      <StyledMainContent>
        <Container data-testid='container'>
          <div>{children}</div>
        </Container>
      </StyledMainContent>
    </StyledMainLayout>
  )
}

export default MainLayout
