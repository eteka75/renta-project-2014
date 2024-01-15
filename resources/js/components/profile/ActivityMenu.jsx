import React from 'react';

import Menudropdown from '../../components/Menudropdown';
import { VscDashboard } from 'react-icons/vsc';
import { AiOutlineLock, AiOutlineSetting, AiOutlineStop, AiOutlineUser } from 'react-icons/ai';
import { BsCart2, BsCurrencyExchange } from "react-icons/bs";
import { BiMessageSquareDetail } from "react-icons/bi";
import { IoCarSportOutline, IoKeyOutline } from 'react-icons/io5';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Link, usePage } from '@inertiajs/react';
import { PiUsersThree } from 'react-icons/pi';
import { MdCarRental, MdFavoriteBorder, MdOutlineCancelPresentation, MdOutlineCurrencyExchange } from 'react-icons/md';
import { FcApproval, FcAutomotive, FcCancel, FcCurrencyExchange, FcDataBackup, FcDataEncryption, FcLock, FcSettings } from 'react-icons/fc';
import { Card, List, ListItem } from '@material-tailwind/react';
import { FaCircleCheck } from 'react-icons/fa6';
import { CiHeart, CiLock, CiSettings } from 'react-icons/ci';
import { FaRegUserCircle, FaUser } from 'react-icons/fa';
import { GiHouseKeys } from 'react-icons/gi';
import { TbActivity } from 'react-icons/tb';

export default function ActivityMenu({ active = '' }) {
  const { auth,active_menu } = usePage().props;
  return (
    <>
      <div className="col-span-2 sm:col-span-3 lg:col-span-2 ">
        <div className="flex py-8 overflow-auto min-h-full sm:border-r md:pe-4 flex-col gap-2 max-w-[280px] mx-auto ">
         <div className="menu">
          <Card className='my-4 border'>
              <div className="py-4">
                <h2 className=" text-sm text-gray-400 tracking-widest px-6 font-bold hidden sm:flex uppercase line-clamp-5">Activités</h2>

                <List>
                 {/* <Link href={route('profile.locations')}>

                    <ListItem className={active_menu=='messages'?'bg-slate-200 font-bold w-max lg:w-full ':''+' hover:bg-slate-200 '}>
                      <BiMessageSquareDetail className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600' />
                      <span className="menu-label hidden sm:flex">Messages</span>
                    </ListItem>
                  </Link>*/}
                  <Link href={route('profile.activity')}>
                  <ListItem className={active_menu=='activity'?'bg-slate-200 font-bold w-max lg:w-full ':''+' hover:bg-slate-200 '}>
                    <TbActivity className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600' />
                    <span className="menu-label hidden sm:flex"> Mes activités </span>
                  </ListItem>
                </Link>
                  <Link href={route('profile.notifications')}>
                    <ListItem className={active_menu=='notifications'?'bg-slate-200 font-bold w-max lg:w-full ':''+' hover:bg-slate-200 '}>
                      <BiMessageSquareDetail className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600' />
                      <span className="menu-label hidden sm:flex">Notifications</span>
                    </ListItem>
                  </Link>
                  <Link href={route('profile.favoris')}>
                    <ListItem className={active_menu=='favoris'?'bg-slate-200 font-bold w-max lg:w-full ':''+' hover:bg-slate-200 '}>
                      <MdFavoriteBorder className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600' />
                      <span className="menu-label hidden sm:flex">Mes favoris</span>
                    </ListItem>
                  </Link>
                  <Link href={route('profile.locations')}>

                    <ListItem className={active_menu=='locations'?'bg-slate-200 font-bold w-max lg:w-full ':''+' hover:bg-slate-200 '}>
                      <GiHouseKeys  className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600' />
                      <span className="menu-label hidden sm:flex">Mes locations</span>
                    </ListItem>
                  </Link>
                  <Link href={route('profile.achats')}>

                    <ListItem className={active_menu=='achats'?'bg-slate-200 font-bold w-max lg:w-full ':''+' hover:bg-slate-200 '}>
                      <MdOutlineCurrencyExchange className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600' />
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
