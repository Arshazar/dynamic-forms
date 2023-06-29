/** @jsxImportSource @emotion/react */

import { FC, MouseEvent, useState } from 'react'
import { css } from '@emotion/react'
import { Button, TextInputField, SelectField } from 'evergreen-ui'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

import { flexColumnStyle, header1Style } from '@/styles/globalStyles'
import { ElementType, Element, Page } from '@/types'

const buttonStyle = css`
  display: flex;
  width: fit-content;
  margin: 1rem auto;
`
const header3Style = css`
  margin-bottom: 1rem;
`

interface Props {
  _renderErrorText: (n: string) => void
  register: UseFormRegister<Page>
  errors: FieldErrors<Page>
}

const ElementsInput: FC<Props> = ({ register, _renderErrorText, errors }) => {
  const [elements, setElements] = useState<Element[] | []>([])

  // const debouncedElements = useDebounce(elements, 600)
  const elementTypes = Object.keys(ElementType).map((key) => ElementType[key])

  const handleAddingElement = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setElements([
      ...elements,
      {
        type: ElementType.Text,
        name: '',
        choices: [],
        required: false,
        visible: true,
        editable: true
      }
    ])
  }

  const handleEditElement = (
    name: string,
    value: string | boolean | string[],
    index: number,
    jj?: number
  ) => {
    const newElements = elements.map((el: Element, i: number) => {
      if (i === index) {
        let newValue: string | string[] | boolean

        if (typeof value === 'string' && typeof el.choices !== 'undefined' && name === 'choices') {
          newValue = el.choices.map((ch: any, ii: number | undefined) => {
            return ii === jj ? value : ch
          })
        } else newValue = value

        return {
          ...el,
          [name]: newValue
        }
      }
      return el
    })
    setElements(newElements)
  }

  const handleAddingChoice = (e: MouseEvent<HTMLButtonElement>, i: number) => {
    e.preventDefault()
    if (elements[i] && elements[i].choices) {
      const newChoices = [...elements[i].choices, '']
      handleEditElement('choices', newChoices, i)
    }
  }

  return (
    <div css={flexColumnStyle}>
      <h2 css={header1Style}>Elements</h2>
      {elements.map((element: Element, i: number) => {
        return (
          <div id={`element-${i + 1}`}>
            <h3 css={header3Style}>{`Element ${i + 1}`}</h3>
            <TextInputField
              label="name"
              {...register(`element ${i + 1} name`, { required: true })}
              onChange={({ target: { value } }) => handleEditElement('name', value, i)}
            />
            {errors[`element name ${i + 1}`] && _renderErrorText(`element ${i + 1} name`)}
            <SelectField
              label="Type"
              {...register(`element ${i + 1} type`)}
              onChange={({ target: { value } }) => handleEditElement('type', value, i)}>
              {elementTypes.map((elType) => {
                return <option value={elType}>{elType}</option>
              })}
            </SelectField>
            <TextInputField
              label="Required if"
              value={element.requiredIf}
              {...register(`element ${i + 1} requiredIf`)}
              onChange={({ target: { value } }) =>
                handleEditElement(`element ${i + 1} requiredIf`, value, i)
              }
            />
            <TextInputField
              label="Editable if"
              {...register(`element ${i + 1} editableIf`)}
              onChange={({ target: { value } }) =>
                handleEditElement(`element ${i + 1} editableIf`, value, i)
              }
            />
            <TextInputField
              label="Visible if"
              {...register(`element ${i + 1} visibleIf`)}
              onChange={({ target: { value } }) =>
                handleEditElement(`element ${i + 1} visibleIf`, value, i)
              }
            />
            {(element.type === 'select' || element.type === 'radio') && (
              <>
                <h3>Choices</h3>
                {element.choices?.map(
                  (_choice: string | number | string[] | undefined, j: number) => (
                    <TextInputField
                      key={j}
                      label={`Choice ${j + 1}`}
                      {...register(`element ${i + 1} choice ${j + 1}`)}
                      onChange={({ target: { value } }) =>
                        handleEditElement('choices', value, i, j)
                      }
                    />
                  )
                )}
                <Button
                  css={buttonStyle}
                  size="medium"
                  appearance="primary"
                  intent="success"
                  onClick={(e: MouseEvent<HTMLButtonElement>) => handleAddingChoice(e, i)}>
                  Add choice
                </Button>
              </>
            )}
          </div>
        )
      })}
      <Button
        css={buttonStyle}
        size="medium"
        appearance="primary"
        intent="danger"
        onClick={handleAddingElement}>
        Add element
      </Button>
    </div>
  )
}

export { ElementsInput }
