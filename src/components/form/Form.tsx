/** @jsxImportSource @emotion/react */

import { FC } from 'react'
import { css } from '@emotion/react'
import { Button, TextInputField } from 'evergreen-ui'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'

import {
  containerStyle,
  subContainerStyle,
  header1Style,
  formStyle,
  errorStyle
} from '@/styles/globalStyles'
import { Page } from '@/types'
import { api } from '@/api'
import { ElementsInput } from './ElementsInput'

const buttonStyle = css`
  margin-top: 3rem;
  width: fit-content;
`

const Form: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Page>()

  // Mutations
  const mutation = useMutation({
    mutationFn: (d) => api.savePage(d)
  })

  const handleSortData = (data: Page): Page => {
    const elements = Object.entries(data)
      .filter(([key]) => key.startsWith('element '))
      .reduce((els, [key, value]) => {
        const matchResult = key.match(/element (\d+) (.+)/)
        if (matchResult) {
          const [, index, prop] = matchResult
          if (!els[index]) {
            els[index] = {
              choices: []
            }
          }

          if (prop.startsWith('choice')) {
            els[index].choices.push(value)
          } else {
            els[index][prop] = value
          }
        }
        return els
      }, [] as any)
      .map(({ choices, ...rest }: any) => ({
        choices,
        ...rest
      }))
      .filter((el: Element) => el)

    return {
      name: data.name,
      elements
    }
  }

  const onSubmit: SubmitHandler<Page> = async (data) => {
    try {
      const result = await mutation.mutateAsync(handleSortData(data))
      if (result) {
        alert('Page added!')
        reset()
      }
    } catch (_error) {
      alert('Adding page failed!')
    }
  }

  const _renderErrorText = (name: string) => <p css={errorStyle}>{`${name} is required`}</p>

  return (
    <div css={containerStyle}>
      <div css={subContainerStyle}>
        <h1 css={header1Style}>Form Generator</h1>
        <form css={formStyle} onSubmit={handleSubmit(onSubmit)}>
          <TextInputField label="Name" {...register('name', { required: true })} />
          {errors['name'] && _renderErrorText('name')}
          <ElementsInput register={register} errors={errors} _renderErrorText={_renderErrorText} />
          {errors['elements'] && _renderErrorText('elements')}
          <Button css={buttonStyle} size="medium" appearance="primary" type="submit">
            Add page
          </Button>
        </form>
      </div>
    </div>
  )
}

export { Form }
