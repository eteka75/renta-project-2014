import React from 'react'
import { FcCallback } from 'react-icons/fc'
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { FaAngleRight } from 'react-icons/fa';
import { Link } from '@inertiajs/react';

function Icon({ id, open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
}
export default function LocationFaq({faqs}) {
    const [open, setOpen] = React.useState(0);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    return (
        <>
            
            <div className="max-w-screen-xl mx-auto px-4 ">
                <div className=" mx-auto">
                   
                    <div className=" max-w-3xl py-6  lg:py-8 mx-auto">
                    
                        <h2 className="text-3xl   font-bold"> Questions fréquentes</h2>
                        <div className="text-slate-600 mb-4">Découvrez la réponse aux questions que la plupart de nos clients</div>
                    <div className="p6 border rounded-xl font-normalmb-mt-8">
                        {faqs?.length > 0 && faqs.map(({ question, reponse,id }, index) =>{
                            let class_last =((index+1)===faqs.length)?'border-b-0':'';
                            let class_last_b =((index+1)===faqs.length)?'rounded-b-xl':'';
                           return (
                           <Accordion key={index} open={open === id} icon={<Icon id={id} open={open} />}>
                            <AccordionHeader className={'text-lg px-4 '+class_last} onClick={() => handleOpen(id)}>{question}</AccordionHeader>
                            <AccordionBody className='p-0 bg-red '>
                            <div className={'text-lg text-gray-800 bg-gray-100 p-4 '+class_last_b} dangerouslySetInnerHTML={{__html:reponse}}></div>

                            </AccordionBody>
                        </Accordion>
                        )
                        })}


                    </div>
                    <div className='justify-between flex my-6'>
                    <Link href={route('front.faqs')} className=' items-center py-2 px-0 mx-auto flex bg-white hover:opacity-70  rounded-md text-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold   text-center dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                        Consulter le forum aux questions
                        <FaAngleRight className="ms-1" />
                    </Link>
                    <div></div>
                </div>
                    <div className="text-center hidden max-w-sm mx-auto p-4 md:p-6 mt-8  rounded-xl font-normalmb-8">
                            <FcCallback className='text-8xl mx-auto mb-4' />
                            <h3 className="text-2xl font-extrabold">Services client</h3>
                            <div className='text-sm text-slate-500'>Nous sommes situé à Cotonou, Scoa-gbéto et ouvert du Lundi au Samedi de 9Heures à 17Heures</div>
                            <div className='mb-4'>
                                <a className='font-bold' href="tel:">(+229) 44 17 77 44</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
