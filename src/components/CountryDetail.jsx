import React, { useContext, useEffect, useState } from 'react'
import { DarkModeContext } from './contexts/DarkModeContext'
import { Link, useParams, useLocation } from 'react-router-dom'

import back from '../assets/back.svg'
import backWhite from '../assets/backWhite.svg'

function CountryDetail() {
  const [countryInfo, setCountryInfo] = useState({})
  const [borderArray, setBorderArray] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const { darkMode } = useContext(DarkModeContext)
  const params = useParams()
  const location = useLocation()

  const borderElements = borderArray.map(item => <Link key={item} to={`/${item}`}><button className={`${darkMode ? "bg-[#2E3742] text-white" : "bg-white"} py-2 px-4 rounded-md`}>{item}</button></Link>)
  
  useEffect(() => {
    setIsLoading(true);
    setBorderArray([]);
  
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${params.id}`
        );
        if (!response.ok) {
          throw new Error('Country not found');
        }
        const data = await response.json();
        setCountryInfo(data[0]);
        if (data[0].borders) {
          data[0].borders.map((border) =>
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
              .then((res) => res.json())
              .then((data2) =>
                setBorderArray((prevState) => [
                  ...prevState,
                  data2[0].name.common,
                ])
              )
          );
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsError(true)
        // Handle the 404 error here, e.g., show an error message or redirect
      }
    };
  
    fetchData();
  }, [params.id]);
  

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
        {
          !isError
          ?
          <div className="flex flex-col sm:flex-row justify-center mt-10 gap-x-10 mx-4 sm:mx-10">
            <div className="sm:w-[50%]">
              {!isLoading && (
                <img src={countryInfo.flags.png} alt="flag" className="w-full object-contain" />
              )}
            </div>
            <div className='sm:w-[50%]'>
              {!isLoading && <h1 className='my-6 sm:mt-0 xl:mt-6 text-4xl font-bold'>{countryInfo.name.common}</h1>}
              {!isLoading && 
                <div className='flex flex-col md:flex-row md:flex-wrap gap-x-20 gap-y-10'>
                  <div>
                    <div className='flex flex-wrap gap-x-2'><h3 className='font-bold'>Official name:</h3><h3>{countryInfo.name.official}</h3></div>
                    <div className='flex flex-wrap gap-x-2'><h3 className='font-bold'>Population:</h3><h3>{countryInfo.population}</h3></div>
                    <div className='flex flex-wrap gap-x-2'><h3 className='font-bold'>Region:</h3><h3>{countryInfo.region}</h3></div>
                    <div className='flex flex-wrap gap-x-2'><h3 className='font-bold'>Sub Region:</h3><h3>{countryInfo.subregion}</h3></div>
                    <div className='flex flex-wrap gap-x-2'><h3 className='font-bold'>Capital:</h3><h3>{countryInfo.capital}</h3></div>
                  </div>
                  <div>
                    <div className='flex flex-wrap gap-x-2'><h3 className='font-bold'>Top Level Domain:</h3><h3>{countryInfo.tld.join(" ")}</h3></div>
                    <div className='flex flex-wrap gap-x-2'><h3 className='font-bold'>Currencies:</h3><h3>{Object.keys(countryInfo.currencies).join(", ")}</h3></div>
                    <div className='flex flex-wrap gap-x-2'><h3 className='font-bold'>Languages:</h3><h3>{Object.keys(countryInfo.languages).join(", ")}</h3></div>
                  </div>
                </div>
              }
              {!isLoading && borderArray.length > 0 && 
                <div className='mt-10'>
                  <h3 className='font-bold'>Border Countries:</h3>
                  <div className='my-4 flex gap-4 flex-wrap'>{borderElements}</div>
                </div>
              }
            </div>
          </div>
          :
          <div>
            <h2 className='my-6 text-2xl md:text-3xl font-bold mx-4 sm:mx-10'>Oops! We couldn't find the country you're searching for. Please double-check the spelling or try another country.</h2>
          </div>
        }
      </div>
  )
}

export default CountryDetail