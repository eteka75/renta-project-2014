import React from 'react';

import { Link, usePage } from '@inertiajs/react';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import { Card, List, ListItem } from '@material-tailwind/react';
import { CiLock } from 'react-icons/ci';
import { FaRegUserCircle } from 'react-icons/fa';
import { TbUserEdit } from 'react-icons/tb';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { PiUserList } from 'react-icons/pi';

export default function ProfileMenu({ active = '' }) {
  const { auth,active_menu } = usePage().props;
  return (
    <>
      <div className="col-span-2 sm:col-span-3 lg:col-span-2 ">

        <div className="flex py-8 overflow-auto min-h-full dark:border-slate-700 sm:border-r md:pe-4 flex-col gap-2 max-w-[280px] mx-auto ">
          <div className="menu">
            <Card className='mb-4 border dark:text-white dark:bg-gray-800 dark:border-0' >
              <div className="border-b dark:border-slate-700 p-4">
                <h2 className=" px-4  text-sm font-bold text-gray-500 dark:text-slate-200 uppercase">MON PROFIL</h2>
                {auth?.user && <p className='text-xs text-slate-400 px-4 flex gap-1'> {auth?.user?.email}</p>}

              </div>
              <List>
                 
                 <Link href={route('profile.home')}>
                  <ListItem className={active_menu=='home_compte'?'bg-slate-200 font-bold dark:bg-gray-900':''+' hover:bg-slate-200 '}>
                    <PiUserList className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600' />
                    <span className="menu-label hidden sm:flex"> Mon compte </span>
                  </ListItem>
                </Link>
                <Link href={route('profile.edit')}>
                  <ListItem className={active_menu=='edit_compte'?'bg-slate-200 font-bold dark:bg-gray-900':''+' hover:bg-slate-200 '}>
                    <TbUserEdit  className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600' />
                    <span className="menu-label hidden sm:flex"> Editer mon compte </span>
                  </ListItem>
                </Link>
                <Link href={route('profile.identification')}>
                  <ListItem className={active_menu=='identification'?'bg-slate-200 font-bold dark:bg-gray-900':''+' hover:bg-slate-200 '}>
                    <IoMdCheckmarkCircleOutline  className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600' />
                    <span className="menu-label hidden sm:flex"> Identification </span>
                  </ListItem>
                </Link>
                <Link href={route('profile.edit_password')}>
                  <ListItem className={active_menu=='edit_pwd'?'bg-slate-200 font-bold dark:bg-gray-900':''+' hover:bg-slate-200 '}>
                    <CiLock className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-700' />
                    <span className="menu-label hidden sm:flex">Changer mot de passe</span>
                  </ListItem>
                </Link>

                <Link href={route('profile.account_delete')} className='flex'>
                  <ListItem className={active_menu=='delete'?'bg-slate-200 font-bold dark:bg-gray-900':''+' hover:bg-slate-200 '}>

                    <MdOutlineCancelPresentation className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600' />
                    <span className="menu-label hidden sm:flex">Suppression de compte</span>
                  </ListItem>
                </Link>
                {/*<Link href={route('profile.edit_settings')}>

                  <ListItem className={active_menu=='params'?'bg-slate-200 font-bold':''+' hover:bg-slate-200 '}>
                    <CiSettings className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-700' />
                    <span className="menu-label hidden sm:flex">Paramètres du compte</span>

                  </ListItem>
                </Link>*/}
              </List>
            </Card>       
            
          </div>
        </div>
      </div >
    </>
  )
}
