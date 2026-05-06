import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Silence JS-originated console output immediately
const _log = console.log.bind(console)
const noop = () => {}
console.log = console.warn = console.error = console.info = console.debug = noop

const printBrand = () => {
  console.clear()
  _log(
    '%cDébora%c Alves%c  —  Analista de Dados & Desenvolvedora',
    'color:#FF1744;font-family:Outfit,sans-serif;font-size:16px;font-weight:800;',
    'color:#f2f2f5;font-family:Outfit,sans-serif;font-size:16px;font-weight:800;',
    'color:#6b7280;font-family:Montserrat,sans-serif;font-size:13px;font-weight:500;',
  )
}

// Print now, then clear again after browser/iframe warnings have appeared
printBrand()
setTimeout(printBrand, 1500)
setTimeout(printBrand, 4000)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
