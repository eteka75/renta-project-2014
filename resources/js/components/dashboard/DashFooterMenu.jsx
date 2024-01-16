import React from 'react';
import { Link } from '@inertiajs/react'

export default function DashFooterMenu() {
    return (
        <>
            <div id='footer' className=''>
                <footer className="p-4 border-t ">
                    <div className="mx-auto sm:text-sm lg:text-[1.4vh] w-full max-w-screen-2xl relative">
                        <div className="grid grid-cols-1 w-full md:grid-cols-2 mb-4">
                            <div className=' '>
                                <ul className="flex  lg:space-x-4 flex-col md:flex-row md:gap-4 text text-blue-500 dark:text-gray-300 font-medium">
                                <li className="border-b md:border-b-0 py-2 md:pb-4">
                                        <Link href={"/"} className="hover:underline">Accueil</Link>
                                    </li>
                                    <li className="border-b md:border-b-0 py-2 md:pb-4">
                                        <Link href={route("front.locations")} className="hover:underline">Locations</Link>
                                    </li>
                                    <li className="border-b md:border-b-0 py-2 md:pb-4">
                                        <Link href={route("front.achats")} className="hover:underline">Achat de voitures</Link>
                                    </li>
                                    <li className="border-b md:border-b-0 py-2 md:pb-4">
                                        <Link href={route("front.faqs")} className="hover:underline">Centre d'aide</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className='flex md:justify-end md:mt-0 space-x-5 rtl:space-x-reverse'>

                                <ul className="flex w-full  lg:space-x-4 flex-col md:flex-row lg:justify-end lg:me-4 md:gap-4   text-blue-500 dark:text-gray-300 font-medium">
                                    
                                    <li className="border-b md:border-b-0 py-2 md:pb-4">
                                        <Link href={route("front.apropos")} className="hover:underline">A propos</Link>
                                    </li>
                                    <li className="border-b md:border-b-0 py-2 md:pb-4">
                                        <Link href={route("front.services")} className="hover:underline">Services</Link>
                                    </li>
                                    <li className="border-b md:border-b-0 py-2 md:pb-4">
                                        <Link href={route("front.contact")} className="hover:underline">Nous contacter</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid_ grid-cols-2 hidden gap-8 px-4 py-6 lg:py-8 md:grid-cols-4 text-sm">
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-200 uppercase dark:text-white">La société</h2>
                                <ul className="text-blue-500 dark:text-gray-300 font-medium">
                                    <li className="">
                                        <a href={'/'} className="hover:underline">A propos</a>
                                    </li>
                                    <li className="">
                                        <a href={'/'} className="hover:underline">Services</a>
                                    </li>
                                    <li className="">
                                        <a href={'/'} className="hover:underline">Nous contacter</a>
                                    </li>
                                    <li className="">
                                        <a href={'/'} className="hover:underline">Blog</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-200 uppercase dark:text-white">Help center</h2>
                                <ul className="text-blue-500 dark:text-gray-300 font-medium">
                                   
                                    <li className="">
                                        <a href={'/'} className="hover:underline">Twitter</a>
                                    </li>
                                    <li className="">
                                        <a href={'/'} className="hover:underline">Facebook</a>
                                    </li>
                                    <li className="">
                                        <a href={'/'} className="hover:underline">Contact Us</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-200 uppercase dark:text-white">Legal</h2>
                                <ul className="text-blue-500 dark:text-gray-300 font-medium">
                                    <li className="">
                                        <a href={'/'} className="hover:underline">Privacy Policy</a>
                                    </li>
                                    <li className="">
                                        <a href={'/'} className="hover:underline">Licensing</a>
                                    </li>
                                    <li className="">
                                        <a href={'/'} className="hover:underline">Terms &amp; Conditions</a>
                                    </li>
                                </ul>
                            </div>
                            
                        </div>

                    </div>
                    <div className=" dark:bg-gray-700 ">
                        <div className='mx-auto max-w-screen-2xl md:flex md:items-center md:justify-between'>
                            <span className="md:text-sm text-gray-400 dark:text-gray-300  text-center">Copyright © {new Date().getFullYear()} Rental Car Services Bénin. Tous droits réservés.

                            </span>
                            
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}
