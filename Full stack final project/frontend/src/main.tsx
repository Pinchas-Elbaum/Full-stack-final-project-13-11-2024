import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

import SnakeBarProvider from './providers/SnakeBarProvider.tsx'

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <BrowserRouter>
      <SnakeBarProvider>
        <App />
      </SnakeBarProvider>
    </BrowserRouter>
  </StrictMode>,
)
