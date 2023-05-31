import React, { useContext } from 'react'
import { DarkModeContext } from './contexts/DarkModeContext'

import search from '../assets/search.svg'
import searchWhite from '../assets/searchWhite.svg'
import expand from '../assets/expand.svg'
import expandWhite from '../assets/expandWhite.svg'

function Home() {
    const { darkMode } = useContext(DarkModeContext)

  return (
    <div className={`h-[100vh] ${darkMode ? "bg-[#232C35] text-white" : "bg-[#F5F5F5]"} mt-0`}>
        <div className={`flex flex-wrap justify-between`}>
            <div className={`flex items-center mt-10 mx-10 p-4 rounded-lg ${darkMode ? "bg-[#2E3742]" : "bg-white"}`}>
                <img src={darkMode ? searchWhite : search} alt="search" className='h-6'/>
                <input type="text" placeholder='' className={`${darkMode ? "bg-[#2E3742]" : ""}`}/>
            </div>
            <button className={`flex items-center justify-around rounded-lg mt-10 mx-10 p-4 ${darkMode ? "bg-[#2E3742]" : "bg-white"}`}>
                Filter by region
                <img src={darkMode ? expandWhite : expand} alt="" className='h-6'/>
            </button>
        </div>
        
    </div>
  )
}

export default Home




//card element 

{/* <div className='items-center justify-around mt-10 gap-10'>
    <div className={`w-60 ${darkMode ? "bg-[#2E3742]" : "bg-white"} rounded-lg`}>
        <img src="https://flagcdn.com/w320/ar.png" alt="flag" className='rounded-t-lg' />
        <div className='p-4'>
            <h2 className='font-bold text-2xl mb-2'>Argentina</h2>
            <div>
                <div className='flex gap-1'>
                    <h3 className='font-bold'>Population:</h3>
                    <h3>50.000.000</h3>
                </div>
                <div className='flex gap-1'>
                    <h3 className='font-bold'>Region:</h3>
                    <h3>South America</h3>
                </div>
                <div className='flex gap-1'>
                    <h3 className='font-bold'>Capital:</h3>
                    <h3>Buenos Aires</h3>
                </div>
            </div>
        </div>
    </div>
</div> */}
            