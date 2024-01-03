import React from 'react';

import { FaAngleRight } from 'react-icons/fa6';
import { MiniCard } from './LocaVoitureCard';
export default function LocationTopMarque({marques=[]}) {
    return (
        <>
        {marques?.length>0 &&
        <div className="shadow-inner_ py-4">
            <div className="max-w-screen-xl mx-auto px-4">

                <h2 className="font-bold text-2xl mt-4 flex">
                    Les marques disponibles
                </h2>
                <p className="text-slate-500 mb-4">
                Idéales pour vos vacances, sorties en famille
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-4">
                    {marques?.length>0 && marques.map((marque,index)=>(
                        <MiniCard key={index} nom={marque.nom} slug={marque.slug} id={marque.id} info={marque.voitures_count?marque.voitures_count+' Voitures':''} image={marque.logo} />
                    ))}                  
                    
                </div>
                <div className='my-6'>
                        <a href={route('front.cat_locations')} className='font-bold text-blue-600 flex'>Trouver d'autres marques<FaAngleRight className="ms-1 mt-1" /> </a>
                    </div>
            </div>
            </div>
        }
        </>
    )
}

