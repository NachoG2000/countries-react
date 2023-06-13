import React from 'react'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home, {loader as homeLoader} from './components/Home'
import CountryDetail, {loader as detailsLoader} from './components/CountryDetail'
import Error from './components/Error'

import './App.css'

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} loader={homeLoader} />
      <Route path=":id" element={<CountryDetail />} loader={({params}) => detailsLoader(params)} errorElement={<Error />}/>
      <Route path='*' element={<h1>Error</h1>} />
    </Route>
  ))

  return ( 
    <RouterProvider router={router}/>
  )
}

export default App