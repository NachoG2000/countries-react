import React, {useContext} from 'react'
import { DarkModeContext } from './contexts/DarkModeContext'
import { Link } from 'react-router-dom'

import emptyMoon from '../assets/emptyMoon.svg' 
import filledMoon from '../assets/filledMoon.svg' 

function Header() {

    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

    function handleDarkModeToggle(){
      toggleDarkMode();
    }

    return (
        <div className={`flex justify-between  shadow-black p-10 items-center ${darkMode ? "bg-[#2E3742]" : "bg-white"}`}>
            <h1 className={`font-bold text-lg md:text-2xl ${darkMode ? "text-white" : ""}`}><Link to={"/"}>Where in the world?</Link></h1>
            <button className='flex items-center gap-2' onClick={handleDarkModeToggle}>
                <img src={darkMode ? emptyMoon : filledMoon} alt="darkMode" className='h-6'/>
                <h3 className={`hidden sm:block ${darkMode ? "text-white" : ""}`}>Dark Mode</h3>
            </button>
        </div>
    )
}

export default Header