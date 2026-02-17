import { StrictMode } from 'react'
import { FeatureFlags } from '@carbon/react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FeatureFlags enableV12TileRadioIcons>
      <App />
    </FeatureFlags>
  </StrictMode>,
)
