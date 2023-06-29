import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as ReactQuery from '@tanstack/react-query'
import { PageModal } from './PageModal'

jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn()
}))

describe('PageModal component', () => {
  const mockSetOpenModal = jest.fn()
  const mockUseMutation = jest.spyOn(ReactQuery, 'useMutation')

  beforeEach(() => {
    mockUseMutation.mockReturnValueOnce({
      mutateAsync: jest.fn()
    })
  })

  test('renders form elements and submits successfully', async () => {
    const mockData = {
      name: 'Page 1',
      elements: [
        { type: 'text', name: 'Name', requiredIf: '', editableIf: '', visibleIf: '' },
        { type: 'checkbox', name: 'Agree', requiredIf: '', editableIf: '', visibleIf: '' }
      ]
    }
    render(<PageModal openModal={1} setOpenModal={mockSetOpenModal} data={mockData} />)

    const nameInput = screen.getByLabelText('Name')
    const agreeCheckbox = screen.getByLabelText('Agree')
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.click(agreeCheckbox)

    userEvent.click(submitButton)

    expect(mockUseMutation).toHaveBeenCalled()
    expect(mockUseMutation).toHaveBeenCalledWith({
      mutationFn: expect.any(Function)
    })
  })
})
