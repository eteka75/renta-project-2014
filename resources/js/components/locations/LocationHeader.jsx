import React from 'react';
import { useState } from 'react';;

import Logo from "../../assets/images/logo-v0-min.png";

import "../../Index.css"


/**Icones */
import { FiShoppingCart } from "react-icons/fi";
import { FaCarAlt } from "react-icons/fa";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdCarRental} from "react-icons/md";

/** fin Icones */

import { Link } from '@inertiajs/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "react-tailwindcss-datepicker";
import { AiOutlineSearch } from 'react-icons/ai';
import TopNav from '../topNav';
//import "@/css/bg.css"
import { useEffect } from 'react';
import { default_heures, default_minutes } from '@/tools/utils';
import i18n from '@/i18n';

export default function LocationHeader({ auth }) {
    const [time, setTime] = useState('12:34pm');
    const [date_debut, setDateDebut] = useState({
        startDate: null,
        endDate: null
      });
    
      const [date_fin, setDateFin] = useState({
        startDate: null,
        endDate: null
      });
      const handleDateDebutChange = (newValue) => {
        if (newValue) {
          const { startDate } = newValue;
          let year = getYearFromStringDate(startDate);
          if (startDate != '' && startDate != null && year != '1970') {
            alert(startDate)
            setDateDebut(newValue);
            let frDate = DateToFront(startDate, i18n.language, 'd/m/Y');
            setData("date_debut", frDate);
          } else {
            setDateDebut({
              startDate: null,
              endDate: null
            });
            setData("date_debut", '');
          }
        }
      }
      const getStartedDate = () => {

        const currentDate = new Date();
    
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = currentDate.getFullYear();
    
        return `${day}/${month}/${year}`;
      }
    const heures= [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    const minutes= [0,15,30,45];
    return (
        <>
        <div className="dark:bg-gray-900">
            <div className="bg-[#334155]  overflow-hidden  bg-[url('@/assets/images/design/bg-3.jpg')] bg-[left_calc(50%)_top_calc(20%)] hover:bg-[left_calc(50%)_top_calc(24%)] transition-all duration-500 bg-cover bg-no-repeat _bg-[#003b95] text-white  relativ">
                <div className="bg-[#000] pb-12 group bg-gradient-to-t from-[rgba(0,0,0,.65)] bg-opacity-40 h-full mb-0 w-full">
                    <TopNav auth={auth} />

                    <div aria-hidden="true" className="hidden_ top-12 group-hover:opacity-100 transition-all duration-700 h-0 relative md:opacity-50">
                        <div className="blur-[56px] h-20 bg-gradient-to-br rotate-45 from-primary to-purple-800 dark:from-blue-700"></div>
                        <div className="blur-[56px] h-14 bg-gradient-to-r  from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
                    </div>
                    <div className="max-w-screen-xl mt-4 flex flex-wrap items-center justify-start mx-auto px-4 pb-4 relative">
                        <ul className="flex flex-wrap text-sm font-medium  text-center  border-gray-200 text-white">
                            
                            <li className="me-2   text-lg">
                                <Link
                                    href={route('front.locations')}
                                    className="flex flex-auto px-2 md:px-4 py-2 text-sm md:text-lg rounded-full hover:bg-[rgba(255,255,255,.2)] dark:hover:bg-gray-800 dark:hover:text-gray-300"
                                >
                                    <FaCarAlt className="text-sm md:text-xl  me-1 mt-0.5 md:mt-1" /> 
                                    Location
                                    <span className='ms-1 hidden md:inline-block transition-all duration-100 '> de voitures</span>
                                </Link>
                            </li>
                            <li className="me-2   text-lg">
                                <Link
                                    href={route('front.achats')}
                                    className="flex flex-auto px-2 md:px-4 py-2 text-sm md:text-lg rounded-full hover:bg-[rgba(255,255,255,.2)] dark:hover:bg-gray-800 dark:hover:text-gray-300"
                                >
                                    <FaCarAlt className="text-sm md:text-xl  me-1 mt-0.5 md:mt-1" /> Achat
                                    <span className='ms-1 hidden md:inline-block transition-all duration-100 '> de voitures</span>
                                </Link>
                            </li>
                            <li className="me-2   text-lg">
                                <Link
                                    href={route('front.faq')}
                                    className="flex flex-auto px-2 md:px-4 py-2 text-sm md:text-lg rounded-full hover:bg-[rgba(255,255,255,.2)] dark:hover:bg-gray-800 dark:hover:text-gray-300"
                                >
                                    <IoMdHelpCircleOutline className="text-sm md:text-2xl  me-1 mt-0.5 md:mt-1" />{" "}
                                    Aides
                                </Link>
                            </li>
                        </ul>
                        <div
                            className="in-message w-full h-10 md:h-20"
                            id="message-top"
                        ></div>
                        <div className="text-center_ w-full" id="form-head">
                            <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                                Location de voiture pour tout type de voyage
                            </h1>
                            <h2 className="sm:text-md lg:text-2xl text-center_">
                                De super offres à des tarifs avantageux, proposées par
                                les plus grandes sociétés de location de voitures.
                            </h2>
                        </div>
                    </div>

                    
                </div>
                
            </div>
            <div className="max-w-screen-xl mx-auto mt-4 md:-mt-8 transition-all duration-500  z-10  px-4 _pb-10">
                        <div className=" flex  rounded-md flex-wrap  bg-yellow-500 shadow  w-full  p-2 md:p-1">
                            <div className="grid grid-cols-12 w-full  gap-2">
                                <div className="col-span-12 lg:col-span-10 grid grid-cols-12 gap-2 lg:gap-0">
                                    <div className="col-span-12 lg:col-span-4 flex">
                                        <input
                                            type="text"
                                            className="border text-gray-800  inset-4 border-slate-100 focus:ring-0 text-xl rounded-sm w-full"
                                            placeholder="Saisir le lieu de location...."
                                        />
                                    </div>
                                    <div className="col-span-12 sm:col-span-8 lg:col-span-2 lg:ms-2 border-0  flex">
                                    <Datepicker
                                        required
                                        id="date_debut"
                                        asSingle={true}
                                        useRange={false}
                                        inputClassName="w-full rounded-sm focus:ring-0 font-normal py-4 border border-white dark:placeholder:text-slate-100"
                                        value={date_debut}
                                        onChange={handleDateDebutChange}
                                        i18n={i18n.language}
                                        displayFormat={"DD/MM/YYYY"}
                                        placeholder={getStartedDate()}
                                    />
                                    </div>
                                    <div className="col-span-12 md:ms-1 sm:col-span-4 text-black lg:col-span-2 grid grid-cols-2">
                                        <select name='heur_debut' className='text-sm pe-0  rounded-sm border-0 rounded-0 bg-white'>
                                            <option value=''>Heure</option>
                                            {default_heures.map((v) =>
                                                <option key={v} value={v}>{v > 9 ? v : '0' + v}H</option>

                                            )}
                                        </select>
                                        <select name='min_debut' className='text-md border-slate-100  rounded-sm -ms-1 border-l-white'>
                                            <option value=''>min</option>
                                            {default_minutes.map((v) =>
                                                <option key={v} value={v}>{v > 9 ? v : '0' + v}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="col-span-12 sm:col-span-8 lg:col-span-2 flex lg:ms-2">
                                    <Datepicker
                                        required
                                        id="date_fin"
                                        asSingle={true}
                                        useRange={false}
                                        inputClassName="w-full rounded-sm focus:ring-0 font-normal py-4 border border-white dark:placeholder:text-slate-100"
                                        value={date_fin}
                                        onChange={handleDateDebutChange}
                                        i18n={i18n.language}
                                        displayFormat={"DD/MM/YYYY"}
                                        placeholder={getStartedDate()}
                                    />
                                    </div>
                                    <div className="col-span-12 sm:col-span-4 md:ms-1 text-black lg:col-span-2 grid grid-cols-2">
                                        <select name='heur_debut' className='text-sm  pe-0 border rounded-sm border-white bg-white '>
                                            <option value=''>Heure</option>
                                            {heures.map((v) =>
                                                <option  key={v}>{v}H</option>
                                            )}
                                        </select>
                                        <select name='min_debut' className='text-md border-slate-100 rounded-sm -ms-1 border-l-white'>
                                            <option value=''>min</option>
                                            {minutes.map((v) =>
                                                <option  key={v}>{v > 9 ? v : '0' + v}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-2 text-end">
                                    <button className="px-4 mx-auto justify-center text-center py-3.5 items-center text-xl text-white bg-gray-900 flex rounded-sm w-full">
                                        <AiOutlineSearch className='me-1' />   Rechercher
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
        </>
    )
};
