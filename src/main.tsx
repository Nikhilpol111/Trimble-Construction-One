import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@trimble-oss/moduswebcomponents/modus-wc-variables.css'
import '@trimble-oss/moduswebcomponents/modus-icons-2.css'
import '@trimble-oss/moduswebcomponents/modus-icons.css'
import './styles/modus-bridge.css'
import './index.css'
import { initModus } from './modus/initModus'
import App from './App.tsx'

initModus()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
