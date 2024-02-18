import { Link } from '@inertiajs/react'
import React from 'react'

export default function TopLieux({lieux}) {
    return (
        <>
         {//lieux?.lenght>0 && 
            <div className="max-w-screen-xl mx-auto p-4">
                <div className=" border-t">
                    <div>
                <h2 className="font-bold text-2xl  mt-8 flex">
                    Lieux prisés pour les locations de voiture
                </h2>
                <p className="text-slate-600">Découvrez plus d'options pour louer une voiture pas cher  </p>
                </div>
                <div className="py-4">
                    <div className="sm:grid sm:grid-cols-2 md:grid-cols-5 items-start justify-between lg:grid-cols-6 sm:gap-4 md:gap-6 ">
                        {lieux?.length>0 && lieux?.map(({ville,lieu},index)=>(
                            <div key={index} className="py-4  bg-white  hover:rounded-md">
                                <Link className='text-md font-semibold text-slate-600 hover:text-blue-700 border_px-6 py-2 mb-4 rounded-md'> {lieu?lieu+', ':''}</Link>
                                <div className="text-sm text-slate-400 ">{ville}</div>
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div>
            </div>
            }
        </>
    )
}
