import React from 'react'
import { render, screen } from '@testing-library/react'
import MainLayout from './MainLayout'

describe('MainLayout', () => {
  it('should render all components', () => {
    const children = <div data-testid='children'>children</div>

    render(<MainLayout>{children}</MainLayout>)

    expect(screen.getByTestId('children')).not.toBeNull()
    expect(screen.getByTestId('container')).not.toBeNull()
  })
})
