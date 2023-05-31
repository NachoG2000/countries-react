import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { DarkModeProvider } from './components/contexts/DarkModeContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(<DarkModeProvider><App /></DarkModeProvider>)
