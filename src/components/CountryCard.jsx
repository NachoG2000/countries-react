import React, { useContext } from 'react'
import { DarkModeContext } from './contexts/DarkModeContext'
import { Link } from 'react-router-dom'

function CountryCard(props) {
    const { darkMode } = useContext(DarkModeContext)
  return (
    <div className={`w-60 ${darkMode ? "bg-[#2E3742]" : "bg-white"} rounded-lg m-4 h-[320px]`}>
        <Link to={`/${props.id}`} state={{search: props.search}}>
            <img src={props.image} alt="flag" className='rounded-t-lg h-[45%] w-full' />
            <div className='p-4 flex flex-col justify-center'>
                <h2 className='font-bold text-xl mb-2'>{props.name}</h2>
                <div>
                    <div className='flex gap-1'>
                        <h3 className='font-bold'>Population:</h3>
                        <h3>{props.population}</h3>
                    </div>
                    <div className='flex gap-1'>
                        <h3 className='font-bold'>Region:</h3>
                        <h3>{props.region}</h3>
                    </div>
                    <div className='flex gap-1'>
                        <h3 className='font-bold'>Capital:</h3>
                        <h3>{props.capital}</h3>
                    </div>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default CountryCard

