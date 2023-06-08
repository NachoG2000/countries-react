import React from 'react'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import CountryDetail from './components/CountryDetail'

import './App.css'

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path=":id" element={<CountryDetail />} />
    </Route>
  ))

  return ( 
    <RouterProvider router={router}/>
  )
}

export default App