import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NourishLanding from './pages/Landing'
import NourishApp from './pages/App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NourishLanding />} />
        <Route path="/app" element={<NourishApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
