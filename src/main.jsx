import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import SeasonFruitsApp from './SeasonFruitsApp'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SeasonFruitsApp />
    </BrowserRouter>
  </StrictMode>
)
