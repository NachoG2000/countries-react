import React, {useContext, useState} from 'react'
import { DarkModeContext } from './contexts/DarkModeContext'
import { Link } from 'react-router-dom'

import emptyMoon from '../assets/emptyMoon.svg' 
import filledMoon from '../assets/filledMoon.svg' 
import warningIcon from '../assets/warning.svg' 
import closeWhite from '../assets/closeWhite.svg' 
import close from '../assets/close.svg' 

function Header(props) {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

    function handleDarkModeToggle(){
      toggleDarkMode();
    }

    return (
        <div className={`flex justify-between shadow-black p-10 items-center ${darkMode ? "bg-[#2E3742]" : "bg-white"}`}>
            <h1 className={`font-bold text-lg md:text-2xl ${darkMode ? "text-white" : ""}`}><Link to={"/"} >Where in the world?</Link></h1>
            <div className='flex items-center gap-2'>
                <img src={warningIcon} alt="warningIcon" className='h-6 cursor-pointer' onClick={props.toggleMenu}/>
                <div className={`absolute ${!props.isMenuDisplayed ? "hidden" : ""} bg-black bg-opacity-50 w-full top-0 left-0 bottom-[-200px] z-10`} onClick={props.toggleMenu}> 
                </div>
                <div className={`absolute ${!props.isMenuDisplayed ? "hidden" : ""} ${darkMode ? "bg-[#2E3742] text-white" : "bg-white"} rounded-lg shadow-2xl top-[88px] right-2 left-2 sm:right-[5%] min-[425px]:left-auto min-[425px]:w-[400px] z-20 items-start p-4 `}>
                    <div className='flex justify-end'>
                        <img src={darkMode ? closeWhite : close} alt="close icon" className='h-6 cursor-pointer' onClick={props.toggleMenu}/>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                        Currently, information about China, Taiwan, and Antarctica is not available.
                    </h3>
                    <h3 className="text-lg mb-4">
                        Please try searching for another country. Thank you for your understanding.
                    </h3>
                </div>
                <button className='flex items-center gap-2' onClick={handleDarkModeToggle}>
                    <img src={darkMode ? emptyMoon : filledMoon} alt="darkMode" className='h-6'/>
                    <h3 className={`hidden sm:block ${darkMode ? "text-white" : ""}`}>Dark Mode</h3>
                </button>
            </div>
        </div>
    )
}

export default Header