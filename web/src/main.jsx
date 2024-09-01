import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import WebFuzzForgeDashboard from './components/WebFuzzForgeDashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WebFuzzForgeDashboard />
  </StrictMode>,
)
