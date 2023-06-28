/** @jsxImportSource @emotion/react */

import { Fragment } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Checkbox, Dialog, RadioGroup, SelectMenu, TextInputField } from 'evergreen-ui'
import { useMutation } from '@tanstack/react-query'

import { errorStyle } from '@/styles/globalStyles'
import { Element, Page } from '@/types'
import { api } from '@/api'

const Input = ({ el, register, watch }) => {
  const { type, name, choices, requiredIf, editableIf, visibleIf } = el
  const isRequired = !watch(requiredIf)
  const isEditable = watch(editableIf)
  const isVisible = !watch(visibleIf)

  if (!isVisible) return null

  const Component = {
    text: TextInputField,
    radio: RadioGroup,
    select: SelectMenu,
    checkbox: Checkbox
  }[type]

  const regOptions = { required: isRequired, disabled: isEditable }

  const props = () => {
    switch (type) {
      case 'text':
        return { label: name }
      case 'checkbox':
        return { label: name, checked: watch(name) }
      case 'select':
        return {
          title: name,
          options: choices.map((choice: string) => ({ label: choice, value: choice }))
        }
      case 'radio':
        return {
          name,
          options: choices.map((choice: string) => ({ label: choice, value: choice }))
        }
      default:
        return null
    }
  }

  return <Component {...register(name, regOptions)} {...props()} />
}

const PageModal = ({ openModal, setOpenModal, data }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<Page>()

  const mutation = useMutation({
    mutationFn: (d) => api.saveForm(data.name, d)
  })

  const onSubmit: SubmitHandler<Page> = async (d) => {
    try {
      const result = await mutation.mutateAsync(d)
      if (result) {
        alert(`form inputs : ${JSON.stringify(d)}`)
        console.table(d)
        reset()
      }
    } catch (_error) {
      alert('failed!')
    }
  }

  return (
    <Dialog
      isShown={typeof openModal === 'number'}
      title={data.name}
      onCloseComplete={() => setOpenModal(false)}>
      {data.elements && data.elements.length > 0 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {data.elements.map((el: Element, i: number) => (
            <Fragment key={i}>
              <Input el={el} register={register} watch={watch} />
              {errors[el.name] && <p css={errorStyle}>{`${el.name} is required`}</p>}
            </Fragment>
          ))}
          <Button type="submit">Submit</Button>
        </form>
      )}
    </Dialog>
  )
}

export { PageModal }
