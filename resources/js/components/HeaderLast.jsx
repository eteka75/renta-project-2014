import React from 'react';
import { useState } from 'react';;

import Logo from "../../assets/images/logo-v0-min.png";
import "../../Index.css"


/**Icones */
import { FiShoppingCart } from "react-icons/fi";
import { FaCar, FaCarOn } from "react-icons/fa6";
import { MdManageHistory } from "react-icons/md";
import { FaCarAlt, FaSearch } from "react-icons/fa";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { AiOutlineInfoCircle, AiOutlineMail, AiOutlineSearch } from "react-icons/ai";
import { MdCarRental, MdChecklistRtl } from "react-icons/md";

/** fin Icones */

import { Link } from '@inertiajs/react';
import { MdKey } from "react-icons/md";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function LocationHeader({ auth }) {
    const [time, setTime] = useState('12:34pm');
    const heures= [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    const minutes= [0,15,30,45];
    return (
        <>
            <div className="bg-[#333] overflow-hidden  bg-[url('@/assets/images/design/bg-2.jpg')] bg-[left_calc(0%)_top_calc(50%)] bg-cover bg-no-repeat _bg-[#003b95] text-white  relativ">
                <div className="bg-[#000] bg-gradient-to-t from-[rgba(0,0,0,.65)] bg-opacity-40">

                    <nav className="max-w-screen-xl mx-auto relative absolute_">
                        <div className="  flex flex-wrap items-center justify-between p-4">
                            <a
                                href={"/"}
                                className="flex items-center mb-4 space-x-3 rtl:space-x-reverse"
                            >
                                <img
                                    src={Logo}
                                    className="h-8"
                                    alt="Logo CRS Bénin"
                                />
                                <span className="self-center text-xl uppercase font-semibold whitespace-nowrap dark:text-white">
                                    Rental Car Services
                                </span>
                            </a>
                            <div
                                className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                                id="navbar-language"
                            >
                                <ul className="flex flex-col relative font-medium p-4 md:p-0 mt-4 border rounded-lg  md:space-x-2 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                                    {!auth.user ? (
                                        <>
                                            <li>
                                                <Link
                                                    href={route('login')}
                                                    className="inline-flex items-center border-slate-200 border-0 text-white font-medium justify-center px-2 py-2 text-sm hover:text-gray-900 dark:text-white rounded-lg cursor-pointer  dark:hover:bg-gray-700 dark:hover:text-white"
                                                >
                                                    Se connecter
                                                </Link>
                                            </li>

                                            <li>
                                                <Link
                                                    href={route('register')}
                                                    className="inline-flex items-center border-slate-50 border-0 text-white font-medium justify-center px-2 py-2 text-sm hover:text-gray-900 dark:text-white rounded-lg cursor-pointer  dark:hover:bg-gray-700 dark:hover:text-white"
                                                >
                                                    S'inscrire
                                                </Link>
                                            </li>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                    <li className='hidden'>
                                        <button
                                            type="button"
                                            data-dropdown-toggle="language-dropdown-menu"
                                            className="hidden _inline-flex items-center text-slate-900 border border-yellow-500 bg-yellow-500 font-medium justify-center px-4 py-1.5 text-sm hover:text-b  dark:text-white rounded-lg cursor-pointer hover:opacity-90 dark:hover:bg-gray-700 dark:hover:text-white"
                                        >
                                            <FaCarOn className="me-1 text-xl" /> Gérer mes locations
                                        </button>
                                    </li>
                                    <li className='hidden'>
                                        <button className="hidden --inline-flex bg-slate-200 items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white mx-2">
                                            <svg
                                                className="w-5 h-5 rounded-full me-3"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                viewBox="0 0 3900 3900"
                                            >
                                                <path
                                                    fill="#b22234"
                                                    d="M0 0h7410v3900H0z"
                                                />
                                                <path
                                                    d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0"
                                                    stroke="#fff"
                                                    strokeWidth="300"
                                                />
                                                <path
                                                    fill="#3c3b6e"
                                                    d="M0 0h2964v2100H0z"
                                                />
                                                <g fill="#fff">
                                                    <g id="d">
                                                        <g id="c">
                                                            <g id="e">
                                                                <g id="b">
                                                                    <path
                                                                        id="a"
                                                                        d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"
                                                                    />
                                                                    <use
                                                                        xlinkHref="#a"
                                                                        y="420"
                                                                    />
                                                                    <use
                                                                        xlinkHref="#a"
                                                                        y="840"
                                                                    />
                                                                    <use
                                                                        xlinkHref="#a"
                                                                        y="1260"
                                                                    />
                                                                </g>
                                                                <use
                                                                    xlinkHref="#a"
                                                                    y="1680"
                                                                />
                                                            </g>
                                                            <use
                                                                xlinkHref="#b"
                                                                x="247"
                                                                y="210"
                                                            />
                                                        </g>
                                                        <use
                                                            xlinkHref="#c"
                                                            x="494"
                                                        />
                                                    </g>
                                                    <use xlinkHref="#d" x="988" />
                                                    <use xlinkHref="#c" x="1976" />
                                                    <use xlinkHref="#e" x="2470" />
                                                </g>
                                            </svg>
                                            English (US)
                                        </button>
                                        
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            className="inline-flex text-gray-900 bg-slate-200 hover:bg-slate-50 items-center px-4 py-1 text-sm font-medium justify-center rounded-lg  "
                                        >
                                            <FiShoppingCart />
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div aria-hidden="true" className="hidden_  h-0 relative opacity-50">
                        <div className="blur-[56px] h-20 bg-gradient-to-br rotate-45 from-primary to-purple-800 dark:from-blue-700"></div>
                        <div className="blur-[56px] h-14 bg-gradient-to-r  from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
                    </div>

                    <div className="max-w-screen-xl flex flex-wrap items-center justify-start mx-auto px-4 pb-4 relative">
                        <ul className="flex flex-wrap text-sm font-medium  text-center  border-gray-200 text-white">
                            <li className="me-2  text-lg">
                                <a
                                    href="#"
                                    aria-current="page"
                                    className="flex px-4 py-2 text-black   hover:opacity-100 opacity-95 border-yellow-500  bg-yellow-500 _bg-[rgba(255,255,255,.2)] rounded-full active"
                                >
                                    <MdCarRental className="text-2xl  me-1" />
                                    Location <span className='ms-1 hidden md:inline-block transition-all duration-100 '> de voitures</span>
                                </a>
                            </li>
                            <li className="me-2   text-lg">
                                <a
                                    href="#"
                                    className="flex flex-auto px-4 py-2 rounded-full hover:bg-[rgba(255,255,255,.2)] dark:hover:bg-gray-800 dark:hover:text-gray-300"
                                >
                                    <FaCarAlt className="text-xl  me-1 mt-1" /> Achat
                                    <span className='ms-1 hidden md:inline-block transition-all duration-100 '> de voitures</span>
                                </a>
                            </li>
                            <li className="me-2   text-lg">
                                <a
                                    href="#"
                                    className="flex flex-auto px-4 py-2 rounded-full hover:bg-[rgba(255,255,255,.2)] dark:hover:bg-gray-800 dark:hover:text-gray-300"
                                >
                                    <IoMdHelpCircleOutline className="text-2xl  me-1" />{" "}
                                    Aides
                                </a>
                            </li>
                        </ul>
                        <div
                            className="in-message w-full h-10 lg:h-20"
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

                    <div className="max-w-screen-xl mx-auto  px-4 pb-10">
                        <div className=" flex  rounded-md flex-wrap  bg-yellow-500 shadow  w-full  p-2">
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
                                        <LocalizationProvider className="" dateAdapter={AdapterDayjs}>
                                            <DatePicker className='w-full bg-white ' label="Date départ..." />
                                        </LocalizationProvider>
                                    </div>
                                    <div className="col-span-12 md:ms-1 sm:col-span-4 text-black lg:col-span-2 grid grid-cols-2">
                                        <select name='heur_debut' className='text-sm pe-0  rounded-sm border-0 rounded-0 bg-white'>
                                            <option value=''>Heure</option>
                                            {heures.map((v) =>
                                                <option key={v} value={v}>{v > 9 ? v : '0' + v}H</option>

                                            )}
                                        </select>
                                        <select name='min_debut' className='text-md border-slate-100  rounded-sm -ms-1 border-l-white'>
                                            <option value=''>min</option>
                                            {minutes.map((v) =>
                                                <option key={v} value={v}>{v > 9 ? v : '0' + v}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="col-span-12 sm:col-span-8 lg:col-span-2 flex lg:ms-2">
                                        <LocalizationProvider className="bg-white" dateAdapter={AdapterDayjs}>
                                            <DatePicker className=' w-full bg-white' label="Date arrivé..." />
                                        </LocalizationProvider>
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
                                    <button className="px-4 mx-auto justify-center text-center py-3.5 items-center text-xl text-white bg-gray-800 flex rounded-sm w-full">
                                        <AiOutlineSearch className='me-1' />   Rechercher
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
