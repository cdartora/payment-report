import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AppointmentsProvider from './context/AppointmentsProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppointmentsProvider>
        <App />
      </AppointmentsProvider>
    </BrowserRouter>
  </React.StrictMode>
)
