import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from 'react-router-dom'
// CSS 
import 'bootstrap/dist/css/bootstrap.css'
// Components
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
