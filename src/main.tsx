import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes } from './routes'
import './styles/index.css'
import { AuthProvider } from './hooks/contexts/authContext'
import { PublicationProvider } from './hooks/contexts/publicationContext'
import { UserProvider } from './hooks/contexts/UserContext'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <PublicationProvider>
          <Routes />
        </PublicationProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>,
)
