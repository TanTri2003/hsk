import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // <-- Thêm vào đây
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- Bọc BrowserRouter ở đây */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)