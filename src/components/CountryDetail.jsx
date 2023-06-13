import React, { useContext, useEffect } from 'react'
import { DarkModeContext } from './contexts/DarkModeContext'
import { Link, useLocation, useLoaderData } from 'react-router-dom'
import Error from './Error'

import back from '../assets/back.svg'
import backWhite from '../assets/backWhite.svg'

export function loader(params) {

  return fetch(`https://restcountries.com/v3.1/name/${params.id}`)
    .then((response) => {
        if(!response.ok){
          throw {
            message: "Country not found", 
            statusText: response.statusText,
            status: response.status
          }
        } 
        else if(country.cca2 === "AQ" || country.cca2 === "CN"){
          throw {
            message: "This country is not available", 
            statusText: response.statusText,
            status: response.status
          }
        }
        return response.json()})
    .then((data) => {
      const countryInfo = data[0];

      if (countryInfo.borders) {
        const borderPromises = countryInfo.borders.map((border) =>
          fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then((data2) => data2[0].name.common)
        );

        return Promise.all(borderPromises).then((borderArray) => {
          return { countryInfo, borderArray };
        });
      }


      return { countryInfo, borderArray: [] };
    });
}


function CountryDetail() {
  const { darkMode } = useContext(DarkModeContext)
  const location = useLocation()
  const {countryInfo, borderArray} = useLoaderData()

  const borderElements = borderArray.map(item => <Link key={item} to={`/${item}`}><button className={`${darkMode ? "bg-[#2E3742] text-white" : "bg-white"} py-2 px-4 rounded-md`}>{item}</button></Link>)
  

  console.log(countryInfo)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
      <div className={`${darkMode ? 'bg-[#232C35] text-white' : 'bg-[#F5F5F5]'} min-h-[100vh]`}>
        <div className={`flex`}>
          <button className={`flex items-center justify-around rounded-lg mt-6 mx-4 sm:mx-10 ${darkMode ? 'bg-[#2E3742]' : 'bg-white'}`}>
          <Link to={location.state && location.state.search ? `..?${location.state.search}` : ".."} relative='path'>
            <div className='flex items-center justify-around gap-2 py-4 px-8'>
              <img src={darkMode ? backWhite : back} alt="" className="h-6" />
              Back
            </div>
          </Link>
          </button>
        </div>
          <div className="flex flex-col sm:flex-row justify-center mt-10 gap-x-10 mx-4 sm:mx-10">
            <div className="sm:w-[50%]">
              <img src={countryInfo.flags.png} alt="flag" className="w-full object-contain" />
            </div>
            <div className='sm:w-[50%]'>
              <h1 className='my-6 sm:mt-0 xl:mt-6 text-4xl font-bold'>{countryInfo.name.common}</h1>
                <div className='flex flex-col md:flex-row md:flex-wrap gap-x-20'>
                  <div>
                    <div className='flex flex-wrap gap-x-2'><h3 className='font-bold'>Official name:</h3><h3>{countryInfo.name.official}</h3></div>
                    <div className='flex flex-wrap gap-x-2'><h3 className='font-bold'>Population:</h3><h3>{countryInfo.population}</h3></div>
                    <div className='flex flex-wrap gap-x-2'><h3 className='font-bold'>Region:</h3><h3>{countryInfo.region}</h3></div>
                    <div className='flex flex-wrap gap-x-2'><h3 className='font-bold'>Sub Region:</h3><h3>{countryInfo.subregion}</h3></div>
                    <div className='flex flex-wrap gap-x-2'><h3 className='font-bold'>Capital:</h3><h3>{countryInfo.capital}</h3></div>
                  </div>
                  <div className='mt-10 mb-4'>
                    <div className='flex flex-wrap gap-x-2'><h3 className='font-bold'>Top Level Domain:</h3><h3>{countryInfo.tld.join(" ")}</h3></div>
                    <div className='flex flex-wrap gap-x-2'><h3 className='font-bold'>Currencies:</h3><h3>{Object.keys(countryInfo.currencies).join(", ")}</h3></div>
                    <div className='flex flex-wrap gap-x-2'><h3 className='font-bold'>Languages:</h3><h3>{Object.keys(countryInfo.languages).join(", ")}</h3></div>
                  </div>
                </div>
                {
                  borderElements.length > 0 ?
                  <div className='mt-6'>
                    <h3 className='font-bold'>Border Countries:</h3>
                    <div className='my-4 flex gap-4 flex-wrap'>{borderElements}</div>
                  </div> : ""
                }
            </div>
          </div>
      </div>
  )
}

export default CountryDetail
