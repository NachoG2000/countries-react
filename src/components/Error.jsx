import React, {useContext} from 'react'
import { useLocation, useRouteError, Link } from 'react-router-dom'
import { DarkModeContext } from './contexts/DarkModeContext'

import back from '../assets/back.svg'
import backWhite from '../assets/backWhite.svg'

function Error() {
    const location = useLocation()
    const { darkMode } = useContext(DarkModeContext)

    const error = useRouteError()

    console.log(error.status)

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
            <div className='my-6 mx-4 sm:mx-10 lg:w-[60%]'>
                <h2 className='text-2xl md:text-3xl font-bold mb-4'>Oops! We couldn't find the country you're searching for. Please double-check the spelling or try another country.</h2>
                <h4>Error: {error.status} ({error.statusText})</h4>
            </div>
        </div>
    )
}

export default Error