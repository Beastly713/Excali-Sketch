import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // NOTE : React.StrictMode can sometimes cause double-mount issues with Canvas
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)