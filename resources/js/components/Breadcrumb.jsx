import React from 'react';
import { Breadcrumbs } from '@material-tailwind/react'
import { VscDashboard } from 'react-icons/vsc';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from '@inertiajs/react';
import { MdOutlineArrowRight } from "react-icons/md";
import Translate from './Translate';

export default function Breadcrumb({children}) {
  return (
   
    <div className='overflow-auto absolutes ms-0 -mt-2 sm:mt-0 px-3 sm:px-0 bg-slate-100 sm:bg-transparent rounded-md left-0s w-full sm:w-auto sm:relative'>
     <Breadcrumbs className='px-0' separator={<MdOutlineArrowRight className='opacity-60 w-2' />} >
     <Link href={route('home')} className="opacity-60">
       <AiOutlineHome
        className='h-4  w-5 opacity-60'/>
      </Link>
      <Link href={route('dashboard')} className="opacity-60">
       <Translate>Tableau de bord</Translate>
      </Link>
      {children}
    </Breadcrumbs>
    </div>
  )
}
