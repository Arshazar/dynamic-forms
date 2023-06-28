import { css } from '@emotion/react'

const appStyle = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  min-height: 100dvh;
  background: #0095ff;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
const containerStyle = css`
  height: 100%;
  padding: 1rem;
`
const subContainerStyle = css`
  border: 2px solid #ccc;
  border-radius: 10px;
  height: 95dvh;
  padding: 1rem;
  overflow-y: auto;
  background: #fff;

  @media (max-width: 768px) {
    height: 100%;
  }
`
const formStyle = css`
  overflow-y: auto;
`
const flexColumnStyle = css`
  display: flex;
  flex-direction: column;
`
const header1Style = css`
  width: fit-content;
  margin: auto auto 2rem;
`
const labelStyle = css`
  margin: 0.5rem 0;
`
const errorStyle = css`
  font-size: 0.9em;
  margin: -1rem 0 1rem;
  color: red;
`
const pageElStyle = css`
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid #000;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
`

export {
  appStyle,
  containerStyle,
  subContainerStyle,
  formStyle,
  flexColumnStyle,
  header1Style,
  labelStyle,
  errorStyle,
  pageElStyle
}
