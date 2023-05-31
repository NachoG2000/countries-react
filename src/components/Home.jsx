import React, { useContext } from 'react'
import { DarkModeContext } from './contexts/DarkModeContext'
import CountryCard from './CountryCard'

import search from '../assets/search.svg'
import searchWhite from '../assets/searchWhite.svg'
import expand from '../assets/expand.svg'
import expandWhite from '../assets/expandWhite.svg'

function Home(props) {
    const { darkMode } = useContext(DarkModeContext)

    const countriesElements = props.countriesArray.map(country => (
        <CountryCard
          key={country.name.common}
          id={country.name.common}
          name={country.name.common}
          population={country.population}
          region={country.region}
          capital={country.capital}
          image={country.flags.png}
        />
      ));   

  return (
    <div className={`${darkMode ? "bg-[#232C35] text-white" : "bg-[#F5F5F5]"} mt-0`}>
        <div className={`flex flex-wrap justify-between`}>
            <div className={`flex items-center mt-6 mx-10 p-4 gap-4 rounded-lg ${darkMode ? "bg-[#2E3742]" : "bg-white"}`}>
                <img src={darkMode ? searchWhite : search} alt="search" className='h-6'/>
                <input type="text" placeholder='Search for a country...' className={`${darkMode ? "bg-[#2E3742]" : ""}`}/>
            </div>
            <button className={`flex items-center justify-around rounded-lg mt-6 gap-1 mx-10 p-4 ${darkMode ? "bg-[#2E3742]" : "bg-white"}`}>
                Filter by region
                <img src={darkMode ? expandWhite : expand} alt="" className='h-6'/>
            </button>
        </div>
        <div className='flex flex-wrap items-center justify-center mt-6 sm:mx-10'>
            {countriesElements}
        </div>
    </div>
  )
}

export default Home




//card element 

            