import React, { useContext, useState } from 'react'
import { DarkModeContext } from './contexts/DarkModeContext'
import CountryCard from './CountryCard'

import search from '../assets/search.svg'
import searchWhite from '../assets/searchWhite.svg'
import expand from '../assets/expand.svg'
import expandWhite from '../assets/expandWhite.svg'

function Home(props) {
    const { darkMode } = useContext(DarkModeContext)
    const [isFilterMenuDisplayed, setIsFilterMenuDisplayed] = useState(false)
    const [filterSelection, setFilterSelection] = useState("")
    const [searchInput, setSearchInput] = useState("")

    console.log(searchInput)
    
    function filterCountries(input){
        setFilterSelection(input)
        setIsFilterMenuDisplayed(false)
    }

    function handleChange(input){
        setSearchInput(input.target.value)
    }

    const countriesElements = props.countriesArray.map(country => country.cca2 === "AQ" || country.cca2 === "CN" ? "" : (
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
    <div className={`${darkMode ? "bg-[#232C35] text-white" : "bg-[#F5F5F5]"} mt-0 min-h-screen`}>
        <div className={`flex flex-wrap justify-between`}>
            <div className={`flex items-center mt-6 mx-10 p-4 gap-4 rounded-lg ${darkMode ? "bg-[#2E3742]" : "bg-white"}`}>
                <img src={darkMode ? searchWhite : search} alt="search" className='h-6'/>
                <input type="text" onChange={handleChange} value={searchInput} name="searchInput" placeholder='Search for a country...' className={`${darkMode ? "bg-[#2E3742]" : ""} outline-none`}/>
            </div>
            <div className="relative">
                <div className="flex flex-col items-start">
                    <button
                    className={`flex items-center justify-between rounded-lg mt-6 gap-1 mx-10 p-4 w-[167px] ${darkMode ? "bg-[#2E3742]" : "bg-white"}`}
                    onClick={() => setIsFilterMenuDisplayed(prevState => !prevState)}
                    >
                    {filterSelection === "" ? "Filter by region" : filterSelection}
                    <img src={darkMode ? expandWhite : expand} alt="" className="h-6" />
                    </button>
                    <div className={`absolute ${!isFilterMenuDisplayed ? "hidden" : ""} ${darkMode ? "bg-[#2E3742] text-white" : "bg-white"} rounded-lg shadow-2xl top-[88px] left-10 w-[167px] z-10 items-start`}>
                        <h3 className="flex px-4 py-2 pt-4 cursor-pointer" onClick={() => filterCountries("All")}>All</h3>
                        <h3 className="flex px-4 py-2 cursor-pointer" onClick={() => filterCountries("Africa")}>Africa</h3>
                        <h3 className="flex px-4 py-2 cursor-pointer" onClick={() => filterCountries("Americas")}>Americas</h3>
                        <h3 className="flex px-4 py-2 cursor-pointer" onClick={() => filterCountries("Asia")}>Asia</h3>
                        <h3 className="flex px-4 py-2 cursor-pointer" onClick={() => filterCountries("Europe")}>Europe</h3>
                        <h3 className="flex px-4 py-2 pb-4 cursor-pointer" onClick={() => filterCountries("Oceania")}>Oceania</h3>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-wrap items-center justify-center mt-6 sm:mx-10'>
            {countriesElements}
        </div>
    </div>
  )
}

export default Home




//card element 

            