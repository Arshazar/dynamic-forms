export enum ElementType {
  Text = 'text',
  Checkbox = 'checkbox',
  Select = 'select',
  Radio = 'radio'
}

export interface Element {
  type: ElementType
  name: string
  choices?: string[]
  required?: string
  visible?: string
  editable?: string
}

export interface Page {
  name: string
  elements: Element[]
}
