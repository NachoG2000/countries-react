import React, {useState} from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

function Layout() {
  const [isMenuDisplayed, setIsMenuDisplayed] = useState(false)

  function toggleMenu(){
    setIsMenuDisplayed(prevState => !prevState)
  }

  return (
    <div className={isMenuDisplayed ? "fixed" : ""}>
        <Header isMenuDisplayed={isMenuDisplayed} toggleMenu={toggleMenu}/>    
        <Outlet />
    </div>
  )
}

export default Layout