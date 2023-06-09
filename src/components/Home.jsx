import React, { useContext, useState, useEffect } from 'react'
import { DarkModeContext } from './contexts/DarkModeContext'
import CountryCard from './CountryCard'
import { useSearchParams, useLoaderData } from 'react-router-dom'

import search from '../assets/search.svg'
import searchWhite from '../assets/searchWhite.svg'
import expand from '../assets/expand.svg'
import expandWhite from '../assets/expandWhite.svg'

export function loader(){
  return fetch("https://restcountries.com/v3.1/all")
          .then(res => res.json())
          .then(data => data)
}

function Home() {
    const { darkMode } = useContext(DarkModeContext)
    const [isFilterMenuDisplayed, setIsFilterMenuDisplayed] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchInput, setSearchInput] = useState(searchParams.get('name') || "")
    const countriesArray = useLoaderData()
    
    useEffect(() => {
        if(searchParams.get('region') === "All"){
            setSearchParams('')
        }
        if(!searchParams.get('name')){
            setSearchInput("")
        }
    }, [searchParams])

    function handleFilterChange(key, value) {
        setIsFilterMenuDisplayed(false)
        setSearchParams(prevParams => {
          if (value === null) {
            prevParams.delete(key)
          } else {
            prevParams.set(key, value)
          }
          return prevParams
        })
      }

    function handleChange(input){
        setSearchInput(input.target.value)
    }
    function handleKeyDown(event){
        if (event.keyCode === 13) {
            searchInput === "" ? handleFilterChange("name", null) : handleFilterChange("name", searchInput)
        }
    }
    
    const displayedCountriesElements = (
        (!searchParams.get('region') || searchParams.get('region') === "All") && !searchParams.get('name')
          ? countriesArray
          : countriesArray.filter(country => {
              if (searchParams.get('region') && searchParams.get('name')) {
                return (
                  country.region === searchParams.get('region') &&
                  country.name.common.toLowerCase().includes(searchParams.get('name').toLowerCase())
                );
              } else if (!searchParams.get('region')) {
                return country.name.common.toLowerCase().includes(searchParams.get('name').toLowerCase());
              } else if (!searchParams.get('name')) {
                return country.region === searchParams.get('region');
              }
            })
      );
      
      const countriesElements = displayedCountriesElements.map(country => country.cca2 === "AQ" || country.cca2 === "CN" ? "" : (
        <CountryCard
          key={country.name.common}
          id={country.name.common}
          name={country.name.common}
          population={country.population}
          region={country.region}
          capital={country.capital}
          image={country.flags.png}
          search={searchParams.toString()}
        />
      ));
      

  return (
    <div className={`${darkMode ? "bg-[#232C35] text-white" : "bg-[#F5F5F5]"} mt-0 min-h-screen`}>
        <div className={`flex flex-wrap justify-between`}>
            <div className={`flex items-center mt-6 ml-10 p-4 gap-4 rounded-lg ${darkMode ? "bg-[#2E3742]" : "bg-white"}`}>
                <img src={darkMode ? searchWhite : search} alt="search" className='h-6 cursor-pointer' onClick={searchInput === "" ? () => handleFilterChange("name", null) : () => handleFilterChange("name", searchInput)}/>
                <input type="text" onChange={handleChange} onKeyDown={handleKeyDown} autoComplete="off" value={searchInput} name="searchInput" placeholder='Search for a country...' className={`${darkMode ? "bg-[#2E3742]" : ""} outline-none`}/>
            </div>
            <div className="relative">
                <div className="flex flex-col items-start">
                    <button
                    className={`flex items-center justify-between rounded-lg mt-6 gap-1 mx-10 p-4 w-[167px] ${darkMode ? "bg-[#2E3742]" : "bg-white"}`}
                    onClick={() => setIsFilterMenuDisplayed(prevState => !prevState)}
                    >
                    {(!searchParams.get('region') || searchParams.get('region') === "") ? "Filter by region" : searchParams.get('region')}
                    <img src={darkMode ? expandWhite : expand} alt="" className="h-6" />
                    </button>
                    <div className={`absolute ${!isFilterMenuDisplayed ? "hidden" : ""} ${darkMode ? "bg-[#2E3742] text-white" : "bg-white"} rounded-lg shadow-2xl top-[88px] left-10 w-[167px] z-10 items-start`}>
                        <h3 className="flex px-4 py-2 pt-4 cursor-pointer" onClick={() => handleFilterChange("region", null)}>All</h3>
                        <h3 className="flex px-4 py-2 cursor-pointer" onClick={() => handleFilterChange("region", "Africa")}>Africa</h3>
                        <h3 className="flex px-4 py-2 cursor-pointer" onClick={() => handleFilterChange("region", "Americas")}>Americas</h3>
                        <h3 className="flex px-4 py-2 cursor-pointer" onClick={() => handleFilterChange("region", "Asia")}>Asia</h3>
                        <h3 className="flex px-4 py-2 cursor-pointer" onClick={() => handleFilterChange("region", "Europe")}>Europe</h3>
                        <h3 className="flex px-4 py-2 pb-4 cursor-pointer" onClick={() => handleFilterChange("region", "Oceania")}>Oceania</h3>
                    </div>
                </div>
            </div>
        </div>
        {
            searchParams.toString() !== ""
            ? 
            <div className='flex justify-start items-center mt-4 mx-14'>
                <h3 className='underline cursor-pointer' onClick={() => setSearchParams("")}>Clear filters</h3>
            </div>
            :
            ""
        }
        <div className='flex flex-wrap items-center justify-center mt-6 lg:mx-10'>
            {countriesElements}
        </div>
    </div>
  )
}

export default Home




//card element 

            