import { Link } from '@inertiajs/react';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { FaCarAlt } from 'react-icons/fa';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { MdCarRental } from 'react-icons/md';

export default function Top3Links({page=null}) {
    const [active_loc, SetActiveLoc] = useState('');
    const [active_achat, SetActiveAchat] = useState('');
    const [active_aide, SetActiveAide] = useState('');
    const active_css = "border-yellow-500 text-black bg-yellow-500 hover:bg:bg-yellow-600 hover:border-yellow-500";
    const active_css_no = "hover:border-gray-900 dark:text-slate-100 hover:text-white transition-all duration-300 hover:bg-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-300";

    useEffect(() => {
        if (page == null || page == 'locations') {
            SetActiveLoc(active_css);
        } else {
            SetActiveLoc(active_css_no);
        }
        if (page === 'achats') {
            SetActiveAchat(active_css);
        } else {
            SetActiveAchat(active_css_no);
        }

        if (page === 'aides') {
            SetActiveAide(active_css);
        } else {
            SetActiveAide(active_css_no);

        }
    }, [])
    return (
        <div className="max-w-screen-xl mt-4 pb-4 flex flex-wrap items-center justify-start mx-auto px-4 relative">
            <ul className="flex flex-wrap text-sm font-medium  text-center  border-gray-200 ">
                <li className="me-2  text-lg">
                    <Link
                        href={route('front.locations')}
                        aria-current="page"
                        className={"flex px-2 md:px-4 py-2  text-sm md:text-lg   hover:opacity-100  _bg-[rgba(255,255,255,.2)] rounded-full " + active_loc}
                    >
                        <MdCarRental className="md:text-2xl  me-1 mt-0.5 md:mt-1" />
                        Location <span className='ms-1 hidden md:inline-block transition-all duration-100 '> de voitures</span>
                    </Link>
                </li>
                <li className="me-2   text-lg">
                    <Link
                        href={route('front.achats')}
                        className={"flex flex-auto px-2 md:px-4 py-2 text-sm md:text-lg rounded-full  " + active_achat}
                    >
                        <FaCarAlt className="text-sm md:text-xl  me-1 mt-0.5 md:mt-1" /> Achat
                        <span className='ms-1 hidden md:inline-block transition-all duration-100 '> de voitures</span>
                    </Link>
                </li>
                <li className="me-2 dark:text-slate-100  text-lg">
                    <Link
                        href={route('front.faq')}
                        className={"flex flex-auto px-2 md:px-4 py-2 text-sm md:text-lg rounded-full " + active_aide}
                    >
                        <IoMdHelpCircleOutline className="text-sm md:text-2xl  me-1 mt-0.5 md:mt-1" />
                        Aides
                    </Link>
                </li>
            </ul>

        </div>
    )
}
