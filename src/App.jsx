import React, {useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import CountryDetail from './components/CountryDetail'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(prevState => !prevState)
  }

  console.log(darkMode)
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>}>
          <Route path="/" element={<Home />}/>
          <Route path="/:id" element={<CountryDetail />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App