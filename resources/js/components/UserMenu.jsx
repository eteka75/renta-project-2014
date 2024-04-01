import React from 'react'
import userprofil from "@/assets/images/design/user-profil.jpeg";

import Dropdown from '@/Components/Dropdown';
import { FaRegUserCircle } from 'react-icons/fa';
import { VscDashboard } from "react-icons/vsc";
import { MdFavoriteBorder } from 'react-icons/md';
import { AiOutlineLogout, AiOutlineSetting } from 'react-icons/ai';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { TbActivity, TbUserEdit } from 'react-icons/tb';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { PiUserList } from 'react-icons/pi';
export default function UserMenu({auth}) {
    return (
        <>
            <Dropdown>
                <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                        <button
                            type="button"
                            className="inline-flex items-center  py-0 ms-1 border border-transparent text-sm  font-medium rounded-md text-gray-50 dark:text-gray-100  dark:bg-transparent hover:text-gray-300 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                        >
                            <span type="button" className="flex text-sm  rounded-full md:me-0 focus:ring-4  bg-white focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                                <span className="sr-only">Open user menu</span>
                                
                                {auth?.user?.photo!==null && auth?.user?.photo!=='' ?
                                <img className="w-7 h-7 rounded-full " src={HTTP_FRONTEND_HOME+''+auth?.user?.photo} alt={auth?.user?.nom} />

                                :
                                <img className="w-7 h-7 rounded-full " src={userprofil} alt="user photo" />
                                }
                            </span>
                            <span className="ms-1">{auth.user.prenom}</span>

                            <svg
                                className="ms-2 -me-0.5 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </span>
                </Dropdown.Trigger>

                <Dropdown.Content >
                    {auth?.user!=null && auth?.user?.role=='ADMIN' &&
                    <Dropdown.Link className='flex border-b dark:border-slate-600' href={route('dashboard')}><VscDashboard className='me-1 text-xl' /> Tableau de bord</Dropdown.Link>
                    }<Dropdown.Link className='flex  border-b dark:border-slate-600' href={route('profile.home')}><PiUserList className='me-1 text-lg' /> Gérer mon profil</Dropdown.Link>
                    <Dropdown.Link className='flex  border-b dark:border-slate-600' href={route('profile.notifications')}><IoMdNotificationsOutline className='me-1 text-lg' /> Notifications</Dropdown.Link>
                    <Dropdown.Link className='flex  border-b dark:border-slate-600' href={route('profile.activity')}><TbActivity  className='me-1 text-lg' />Gérer mes activités</Dropdown.Link>
                    {/*<Dropdown.Link className='flex  border-b dark:border-slate-600' href={route('profile.edit')}><BiMessageSquareDetail className='me-1 text-lg' />Messages</Dropdown.Link>
                    <Dropdown.Link className='flex  border-b dark:border-slate-600' href={route('profile.edit')}><IoMdNotificationsOutline className='me-1 text-lg' /> Notifications</Dropdown.Link>*/}
                    <Dropdown.Link className='flex  border-b dark:border-slate-600' href={route('profile.favoris')}><MdFavoriteBorder className='me-1 text-lg' /> Favoris</Dropdown.Link>
                    <Dropdown.Link className='flex items-center text-red-500 dark:text-red-500' href={route('logout')} method="post" as="button">
                        <AiOutlineLogout className='me-1 text-lg ' />   Déconnexion
                    </Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>
        </>
    )
}
