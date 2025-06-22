import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import SeasonFruitsApp from './SeasonFruitsApp'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SeasonFruitsApp />
    </BrowserRouter>
  </StrictMode>
)
