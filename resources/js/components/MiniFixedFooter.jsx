import { Link } from '@inertiajs/react'
import React from 'react'

export default function MiniFixedFooter() {
    return (
        <div className="p-4 print:hidden  clear-both md:px-8 md:fixed  lg:left-10 bottom-6 ">
            <ul className="md:flex space-y-2 md:text-start text-center  md:space-y-0 md:gap-4">
                <li>
                        <Link href={("/")} className='text-sm md:border-none   text-blue-500 md:text-slate-300 hover:text-blue-600 hover:underline'>Accueil</Link>
                </li>
                <li>
                        <Link href={route("front.contact")} className='text-sm  text-blue-500 md:text-slate-300 hover:text-blue-600 hover:underline'>Nous contacter</Link>
                </li>
                <li>
                    <Link href={route("front.faqs")} className='text-sm  text-blue-500 md:text-slate-300 hover:text-blue-600 hover:underline'>Forums aux questions</Link>
                </li>
                <li>
                    <Link href={route("front.termes")} className='text-sm  text-blue-500 md:text-slate-300 hover:text-blue-600 hover:underline'>Termes et condiftions</Link>
                </li>
            </ul>
        </div>
    )
}
