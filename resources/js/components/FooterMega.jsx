import React from 'react';
import { Link } from '@inertiajs/react';
import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebookSquare } from 'react-icons/fa';
import { usePage } from '@inertiajs/react';



export default function FooterMega() {
    const {info_bas_page}=usePage().props;
    return (
        <>
            <div id='footer' className=''>
                <footer className="bg-gray-950  dark:bg-gray-900 bg-gradient-to-b from-gray-800 to-gray-90">
                    <div className="border-b-[6px]  border-yellow-500">
                    <div className="mx-auto  w-full max-w-screen-xl relative">
                        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-3 text-sm">
                        <div className='col-span-2 md:col-span-1'>
                                <h2 className="mb-2 text-sm font-semibold text-gray-50 uppercase dark:text-white">Rental Car services</h2>
                               <div className="text-slate-400">
                               <div dangerouslySetInnerHTML={{__html:info_bas_page?.contenu}}>

                               </div>
                               
                               </div>
                               <div className="flex mt-4 pt-4 md:mt-0 space-x-5 rtl:space-x-reverse">
                                <a href="https://twitter.com/?lang=fr" className="text-gray-400 hover:text-gray-50 dark:hover:text-white">
                                   <FaXTwitter className='text-3xl md:text-xl' />
                                    <span className="sr-only">Facebook page</span>
                                </a>
                                <a href="https://facebook.com" className="text-gray-400 hover:text-gray-50 dark:hover:text-white">
                                <FaFacebookSquare className='text-3xl md:text-xl'/> 
                                    <span className="sr-only">Twitter page</span>
                                </a>
                            </div>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-50 uppercase dark:text-white">La société</h2>
                                <ul className="text-gray-400  dark:text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <Link href={route('front.apropos')} className="hover:underline hover:text-yellow-500">A propos</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href={route('front.services')} className="hover:underline hover:text-yellow-500">Services</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href={route('front.contact')} className="hover:underline hover:text-yellow-500">Nous contacter</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href={route('front.locations')} className="hover:underline hover:text-yellow-500">Louer une voiture</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href={route('front.achats')} className="hover:underline hover:text-yellow-500">Acheter une voiture</Link>
                                    </li>
                                   
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-50 uppercase dark:text-white">Centre d'aide</h2>
                                <ul className="text-gray-400  dark:text-gray-400 font-medium">
                                    
                                    <li className="mb-4">
                                        <Link href={route('front.faq')} className="hover:underline hover:text-yellow-500">Forum aux questions</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href={route('front.avis')} className="hover:underline hover:text-yellow-500">Avis de nos clients</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href={route('front.support')} className="hover:underline hover:text-yellow-500">Support clients</Link>
                                    </li>
                                    
                                    <li className="mb-4">
                                    <Link href={route('front.termes')} className="hover:underline hover:text-yellow-500">Terms &amp; Conditions</Link>

                                    </li>
                                </ul>
                            </div>
                            
                        </div>

                    </div>
                    </div>
                    <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 ">
                        <div className='mx-auto max-w-screen-xl text-center md:flex md:items-center md:justify-center'>
                            <span className="text-xs text-gray-500 dark:text-gray-300  text-center">Copyright © {new Date().getFullYear()} Rental Car Services Bénin. Tous droits réservés.

                            </span>
                            
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}
