import React, {useEffect, useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import CountryDetail from './components/CountryDetail'

import './App.css'

function App() {
  const [countriesArray, setCountriesArray] = useState([])

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(res => res.json())
      .then(data => setCountriesArray(data))
  }, [])

  return (
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home countriesArray={countriesArray} />} />
      <Route path=":id" element={<CountryDetail />} />
    </Route>
    {/* <Route path="*" element={<h1>Page not found!</h1>} /> */}
  </Routes>
</BrowserRouter>

  )
}

export default App