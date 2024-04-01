import React from 'react';

import { BiMessageSquareDetail } from "react-icons/bi";
import { Link, usePage } from '@inertiajs/react';
import { MdFavoriteBorder, MdOutlineCurrencyExchange } from 'react-icons/md';
import { Card, List, ListItem } from '@material-tailwind/react';
import { GiHouseKeys } from 'react-icons/gi';
import { TbActivity } from 'react-icons/tb';
import { IoMdNotificationsOutline } from 'react-icons/io';

export default function ActivityMenu({ active = '' }) {
  const { auth,active_menu } = usePage().props;
  return (
    <>
      <div className="col-span-2 sm:col-span-3 lg:col-span-2 ">
        <div className="flex py-8 overflow-auto min-h-full sm:border-r md:pe-4 flex-col gap-2 max-w-[280px] mx-auto  dark:border-gray-700 ">
         <div className="menu">
          <Card className='my-4 border dark:bg-slate-800 dark:border-0 dark:text-white'>
              <div className="py-4">
                <h2 className=" text-sm text-gray-400 tracking-widest px-6 font-bold hidden sm:flex uppercase line-clamp-5">Activités</h2>

                <List>
                 {/* <Link href={route('profile.locations')}>

                    <ListItem className={active_menu=='messages'?'bg-slate-200 font-bold w-max lg:w-full ':''+' hover:bg-slate-200 dark:hover:bg-slate-900 '}>
                      <BiMessageSquareDetail className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600 dark:text-slate-100' />
                      <span className="menu-label hidden sm:flex">Messages</span>
                    </ListItem>
                  </Link>*/}
                  <Link href={route('profile.activity')}>
                  <ListItem className={active_menu=='activity'?'bg-slate-200  font-bold dark:bg-slate-900 w-max lg:w-full ':''+' hover:bg-slate-200 dark:hover:bg-slate-900 '}>
                    <TbActivity className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600 dark:text-slate-100' />
                    <span className="menu-label hidden sm:flex"> Mes activités </span>
                  </ListItem>
                </Link>
                  <Link href={route('profile.notifications')}>
                    <ListItem className={active_menu=='notifications'?'bg-slate-200 font-bold dark:bg-slate-900  w-max lg:w-full ':''+' hover:bg-slate-200 dark:hover:bg-slate-900 '}>
                      <IoMdNotificationsOutline className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600 dark:text-slate-100' />
                      <span className="menu-label hidden sm:flex">Notifications</span>
                    </ListItem>
                  </Link>
                  <Link href={route('profile.favoris')}>
                    <ListItem className={active_menu=='favoris'?'bg-slate-200  font-bold dark:bg-slate-900 w-max lg:w-full ':''+' hover:bg-slate-200 dark:hover:bg-slate-900 '}>
                      <MdFavoriteBorder className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600 dark:text-slate-100' />
                      <span className="menu-label hidden sm:flex">Mes favoris</span>
                    </ListItem>
                  </Link>
                  <Link href={route('profile.locations')}>

                    <ListItem className={active_menu=='locations'?'bg-slate-200  font-bold dark:bg-slate-900 w-max lg:w-full ':''+' hover:bg-slate-200 dark:hover:bg-slate-900 '}>
                      <GiHouseKeys  className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600 dark:text-slate-100' />
                      <span className="menu-label hidden sm:flex">Mes locations</span>
                    </ListItem>
                  </Link>
                  <Link href={route('profile.achats')}>

                    <ListItem className={active_menu=='achats'?'bg-slate-200  font-bold dark:bg-slate-900 w-max lg:w-full ':''+' hover:bg-slate-200 dark:hover:bg-slate-900 '}>
                      <MdOutlineCurrencyExchange className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600 dark:text-slate-100' />
                      <span className="menu-label hidden sm:flex">Mes achats</span>
                    </ListItem>
                  </Link>
                  
                </List>
              </div>
            </Card>
            
          </div>
        </div>
      </div >
    </>
  )
}
