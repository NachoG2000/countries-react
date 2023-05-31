import React, { useContext, useEffect, useState } from 'react';
import { DarkModeContext } from './contexts/DarkModeContext';
import { useParams } from 'react-router-dom';

import back from '../assets/back.svg';
import backWhite from '../assets/backWhite.svg';

function CountryDetail() {
  const [countryInfo, setCountryInfo] = useState({});
  const { darkMode } = useContext(DarkModeContext);
  const params = useParams();

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${params.id}`)
      .then((res) => res.json())
      .then((data) => setCountryInfo(data[0]));
  }, []);

  return (
    <div className={`${darkMode ? 'bg-[#232C35] text-white' : 'bg-[#F5F5F5]'}`}>
      <div className={`flex`}>
        <button className={`flex items-center justify-around rounded-lg mt-6 gap-1 mx-4 sm:mx-10 py-4 px-8 ${darkMode ? 'bg-[#2E3742]' : 'bg-white'}`}>
          <img src={darkMode ? backWhite : back} alt="" className="h-6" />
          Back
        </button>
      </div>
      <div className="flex flex-col sm:flex-row justify-center my-10 gap-x-10 mx-4 sm:mx-10">
        <div className="sm:w-[50%]">
          {countryInfo.flags && countryInfo.flags.png && (
            <img src={countryInfo.flags.png} alt="flag" className="w-full" />
          )}
        </div>
        <div className='sm:w-[50%]'>
        {countryInfo && countryInfo.name && <h1 className='my-6 text-4xl font-bold mx-[2%] lg:mx-[3%]'>{countryInfo.name.common}</h1>}
          <div className="grid grid-cols-4 gap-2 items-center text-center text-xs">
            <button className={`${darkMode ? "bg-[#2E3742]" : "bg-white"} rounded p-1 overflow-hidden break-words`}>General Information</button>
            <button className={`${darkMode ? "bg-[#2E3742]" : "bg-white"} rounded p-1 overflow-hidden break-words`}>Capital and Location</button>
            <button className={`${darkMode ? "bg-[#2E3742]" : "bg-white"} rounded p-1 overflow-hidden break-words`}>Borders and Language</button>
            <button className={`${darkMode ? "bg-[#2E3742]" : "bg-white"} rounded p-1 overflow-hidden break-words`}>Currency and Timezone</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetail;
