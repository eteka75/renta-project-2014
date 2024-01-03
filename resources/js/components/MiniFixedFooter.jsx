import { Link } from '@inertiajs/react'
import React from 'react'

export default function MiniFixedFooter() {
    return (
        <div className="p-4  clear-both md:px-8 fixed  lg:left-10 bottom-6 ">
            <ul className="md:flex space-y-2 md:space-y-0 md:gap-4">
                <li>
                        <Link href={route("front.contact")} className='text-sm  text-blue-500 md:text-slate-300 hover:text-gray-900 hover:underline'>Nous contacter</Link>
                </li>
                <li>
                    <Link href={route("front.faqs")} className='text-sm  text-blue-500 md:text-slate-300 hover:text-gray-900 hover:underline'>Forums aux questions</Link>
                </li>
                <li>
                    <Link href={route("front.termes")} className='text-sm  text-blue-500 md:text-slate-300 hover:text-gray-900 hover:underline'>Termes et condiftions</Link>
                </li>
            </ul>
        </div>
    )
}
