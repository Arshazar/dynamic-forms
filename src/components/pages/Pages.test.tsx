import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as ReactQuery from '@tanstack/react-query'
import { Pages } from './Pages'

// Mock the useQuery hook
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn()
}))

test('renders Pages component', async () => {
  // Mock the useQuery response
  const mockData = [
    { name: 'Page 1', elements: [] },
    { name: 'Page 2', elements: [] }
  ]
  const mockUseQuery = jest.spyOn(ReactQuery, 'useQuery')
  mockUseQuery.mockImplementation(() => ({
    isLoading: false,
    data: mockData,
    isFetching: false
  }))

  render(<Pages />)

  // Verify page names
  expect(screen.getByText('Page 1')).toBeInTheDocument()
  expect(screen.getByText('Page 2')).toBeInTheDocument()

  // Simulate opening modal
  userEvent.click(screen.getByText('Page 1'))
})
