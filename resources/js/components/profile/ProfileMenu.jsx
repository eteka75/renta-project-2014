import React from 'react';

import Menudropdown from '../../components/Menudropdown';
import { VscDashboard } from 'react-icons/vsc';
import { AiOutlineLock, AiOutlineSetting, AiOutlineStop, AiOutlineUser } from 'react-icons/ai';
import { BsCart2 } from "react-icons/bs";
import { BiMessageSquareDetail } from "react-icons/bi";
import { IoCarSportOutline, IoKeyOutline } from 'react-icons/io5';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Link } from '@inertiajs/react';
import { PiUsersThree } from 'react-icons/pi';
import { MdCarRental } from 'react-icons/md';
import { FcApproval, FcAutomotive, FcCancel, FcCurrencyExchange, FcDataBackup, FcDataEncryption, FcLock, FcSettings } from 'react-icons/fc';

export default function ProfileMenu({active=''}) {
 
  return (
    <>
      <div className="col-span-2 sm:col-span-3 lg:col-span-2 ">

        <div className="flex py-8 min-h-full sm:border-r md:pe-4 flex-col gap-2 max-w-[280px] mx-auto ">
          <h2 className="text-sm text-gray-500 tracking-widest px-4 font-bold uppercase line-clamp-5"></h2>
         
           
              
          <div className="menu">
            
            <Menudropdown></Menudropdown>
            <Menudropdown is_open={true} has_submenu={false}>
              <Menudropdown.Trigger>
                <span className="inline-flex w-full py-1 ">
                  <button
                    type="button"
                    className="inline-flex items-center  text-start px-2 py-1 ms-2 text-md leading-4 font-medium rounded-md text-gray-900 dark:text-gray-100  dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                  >

                    <FcApproval className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600' />
                    <span className="menu-label hidden sm:flex">Mon profile </span>
                  </button>
                </span>
              </Menudropdown.Trigger>              
            </Menudropdown>
            <Menudropdown is_open={true} has_submenu={false}>
              <Menudropdown.Trigger>
                <span className="inline-flex w-full py-1 ">
                  <button
                    type="button"
                    className="inline-flex items-center  text-start px-2 py-1 ms-2 text-md leading-4 font-medium rounded-md text-gray-900 dark:text-gray-100  dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                  >

                    <FcAutomotive      className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600' />
                    <span className="menu-label hidden sm:flex">Mes locations</span>
                  </button>
                </span>
              </Menudropdown.Trigger>              
            </Menudropdown>
            <Menudropdown is_open={true} has_submenu={false}>
              <Menudropdown.Trigger>
                <span className="inline-flex w-full py-1 ">
                  <button
                    type="button"
                    className="inline-flex items-center  text-start px-2 py-1 ms-2 text-md leading-4 font-medium rounded-md text-gray-900 dark:text-gray-100  dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                  >

                    <FcCurrencyExchange   className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600' />
                    <span className="menu-label hidden sm:flex">Mes achats</span>
                  </button>
                </span>
              </Menudropdown.Trigger>              
            </Menudropdown>
            
            <Menudropdown is_open={true} has_submenu={false}>
              <Menudropdown.Trigger>
                <span className="inline-flex w-full py-1 ">
                  <button
                    type="button"
                    className="inline-flex items-center  text-start px-2 py-1 ms-2 text-md leading-4 font-medium rounded-md text-gray-900 dark:text-gray-100  dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                  >

                    <FcLock className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600' />
                    <span className="menu-label hidden sm:flex">Changer mot de passe</span>
                  </button>
                </span>
              </Menudropdown.Trigger>              
            </Menudropdown>
            <Menudropdown is_open={true} has_submenu={false}>
              <Menudropdown.Trigger>
                <span className="inline-flex w-full py-1 ">
                  <button
                    type="button"
                    className="inline-flex items-center  text-start px-2 py-1 ms-2 text-md leading-4 font-medium rounded-md text-gray-900 dark:text-gray-100  dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                  >

                    <FcCancel className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600' />
                    <span className="menu-label hidden sm:flex">Suppression de compte</span>
                  </button>
                </span>
              </Menudropdown.Trigger>              
            </Menudropdown>
            <Menudropdown is_open={true} has_submenu={false}>
              <Menudropdown.Trigger>
                <span className="inline-flex w-full py-1 ">
                  <button
                    type="button"
                    className="inline-flex items-center  text-start px-2 py-1 ms-2 text-md leading-4 font-medium rounded-md text-gray-900 dark:text-gray-100  dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                  >

                    <FcSettings  className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600' />
                    <span className="menu-label hidden sm:flex">Paramètres du compte</span>
                  </button>
                </span>
              </Menudropdown.Trigger>              
            </Menudropdown>
          </div>
        </div>
      </div>
    </>
  )
}
