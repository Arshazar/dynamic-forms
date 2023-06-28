/** @jsxImportSource @emotion/react */

import { FC, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { containerStyle, subContainerStyle, header1Style, pageElStyle } from '@/styles/globalStyles'
import { PageModal } from '..'
import { api } from '@/api'
import { Page } from '@/types'

const Pages: FC = () => {
  const [openModal, setOpenModal] = useState<number | false>(false)
  const { isLoading, data, isFetching } = useQuery({
    queryKey: ['pages'],
    queryFn: () => api.getPages()
  })

  // console.log(data)

  return (
    <div css={containerStyle}>
      <div css={subContainerStyle}>
        <h1 css={header1Style}>Pages</h1>
        {isFetching && <p>updating...</p>}
        {isLoading && <p>loading...</p>}
        {data &&
          data.map((page: Page, i: number) => {
            return (
              <div css={pageElStyle} onClick={() => setOpenModal(i)}>
                <span>{page.name}</span>
              </div>
            )
          })}
      </div>
      <PageModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        data={typeof openModal === 'number' && data[openModal]}
      />
    </div>
  )
}

export { Pages }
