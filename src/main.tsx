import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Calculadora from './Pages/Calculadora.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Calculadora />
  </StrictMode>,
)


