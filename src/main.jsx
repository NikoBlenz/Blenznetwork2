import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BlenzNetwork from './BlenzNetwork.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BlenzNetwork />
  </StrictMode>,
)
