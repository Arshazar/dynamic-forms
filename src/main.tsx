import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, defaultTheme } from 'evergreen-ui'

import App from './App'
import '@/styles/global.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider value={defaultTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
