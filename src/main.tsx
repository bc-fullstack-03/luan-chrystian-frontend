import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes } from './routes'
import './styles/index.css'
import { AuthProvider } from './hooks/contexts/authContext'
import { PublicationProvider } from './hooks/contexts/publicationContext'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <PublicationProvider>
        <Routes />
      </PublicationProvider>
    </AuthProvider>
  </React.StrictMode>,
)
