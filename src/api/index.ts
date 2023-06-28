import localforage from 'localforage'

import { Page } from '@/types'

class Api {
  savePage = async (data: Page) => {
    const pages: Page[] | null = await localforage.getItem('pages')
    return await localforage.setItem('pages', pages !== null ? [...pages, data] : [data])
  }
  getPages = async () => {
    const data = await localforage.getItem('pages')
    return data
  }
  saveForm = async (name: string, data: any) => {
    let forms: any = await localforage.getItem('forms')
    forms = forms.filter((form: any) => form.name !== name)
    return await localforage.setItem('forms', [...forms, { name, data }])
  }
}

const api = new Api()
export { api }
