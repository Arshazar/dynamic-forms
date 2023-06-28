/** @jsxImportSource @emotion/react */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div css={appStyle}>
        <Form />
        <Pages />
      </div>
    </QueryClientProvider>
  )
}

export default App
