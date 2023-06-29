import localforage from 'localforage'
import { api } from '.'

jest.mock('localforage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn()
}))

describe('Api', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('savePage method saves page successfully', async () => {
    localforage.getItem.mockResolvedValueOnce(null)
    localforage.setItem.mockResolvedValueOnce(undefined)

    const mockPage = { name: 'Page 1', elements: [] }

    await api.savePage(mockPage)

    expect(localforage.getItem).toHaveBeenCalledWith('pages')
    expect(localforage.setItem).toHaveBeenCalledWith('pages', [mockPage])
  })
})
