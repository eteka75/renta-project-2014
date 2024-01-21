import React, { Children } from 'react';
import { Link } from '@inertiajs/react';


export default function DashHeadTitle({children, title='',subtitle='', className}) {
  return (
    <>
    <div className={className} >
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between mb-4">
        <div className="mr-6">
            <h1 className="text-xl lg:text-3xl dark:text-white font-semibold my-0 ">{title}</h1>
            <h2 className="text-gray-600 dark:text-slate-400 ml-0.5">{subtitle}</h2>
        </div>
        <div className="flex flex-wrap md:items-start md:justify-end  md:-mb-3">            
            {children}
        </div>
    </div>
    </div>
    </>
  )
}
