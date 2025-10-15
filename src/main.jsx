import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// If you named the component WebNovelLanding.jsx and put it in /src/pages
import WebNovelLanding from './pages/WebNovelLanding.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WebNovelLanding />
  </React.StrictMode>
)
