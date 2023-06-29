import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as ReactQuery from '@tanstack/react-query'
import { Form } from './Form'

jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn()
}))

describe('Form component', () => {
  const mockUseMutation = jest.spyOn(ReactQuery, 'useMutation')

  beforeEach(() => {
    mockUseMutation.mockReturnValueOnce({
      mutateAsync: jest.fn()
    })
  })

  test('submits the form successfully', async () => {
    render(<Form />)

    const nameInput = screen.getByLabelText('Name')
    const addButton = screen.getByRole('button', { name: 'Add page' })

    fireEvent.change(nameInput, { target: { value: 'Page 1' } })

    userEvent.click(addButton)

    expect(mockUseMutation).toHaveBeenCalledTimes(1)
    expect(mockUseMutation).toHaveBeenCalledWith({
      mutationFn: expect.any(Function)
    })
  })
})
