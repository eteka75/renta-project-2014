import React from 'react';
import { Head } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout'
import DashHeadTitle from '@/components/dashboard/DashHeadTitle';
import { IoCarSportOutline } from 'react-icons/io5';
import { formaterMontant } from '@/tools/utils';
import i18n from '@/i18n';
import { MdCarRental, MdOutlineMonetizationOn } from 'react-icons/md';
import { TbCarSuv, TbShoppingCartPin } from 'react-icons/tb';
import { FaCarAlt } from 'react-icons/fa';

export default function Index({auth={},nb_voitures,nb_en_location,nb_en_vente}) {
    return (
        <DashboardLayout user={auth.user} auth={auth}>
            <Head title="Tableau de bord" />
            <DashHeadTitle  className='mt-8' title="Bienvenue dans votre tableau de bord" subtitle='Gérez vos voitures et interagissez avec votre clientèle en toute sécurité' />

            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 space-y-4">
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                        <TbCarSuv  className='w-8 h-8'/>
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">{nb_voitures??0}</span>
                        <span className="block text-gray-500">Voiture{nb_voitures>1?'s':''} enrégistrée{nb_voitures>1?'s':''}</span>
                    </div>
                </div>
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
                    <MdCarRental   className='w-8 h-8'/>                        
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">{nb_en_vente}</span>
                        <span className="block text-gray-500">Actuellement en location</span>
                    </div>
                </div>
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                    <TbShoppingCartPin   className='w-8 h-8'/>                        
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">{nb_en_location}</span>
                        <span className="block text-gray-500">Actuellemnt en vente</span>
                    </div>
                </div>
                
                {/*<div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">27.6%</span>
                        <span className="block text-gray-500">Evolution des entrées</span>
                    </div>
                </div>
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                        <MdOutlineMonetizationOn  className='w-8 h-8' />
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">{formaterMontant(12000000,i18n.language)}</span>
                        <span className="block text-gray-500">Total des ventes</span>
                    </div>
    </div>*/}
            </section>
            <section className="">
                <div className="flex flex-col md:col-span-2 md:row-span-2  bg-white shadow rounded-lg mt-8">
                    <div className="px-6 py-5 font-semibold border-b border-gray-100">Graphe d'évolution des locations et vente de voitures.</div>
                    <div className="p-4 flex-grow">
                        <div className="flex items-center justify-center min-h-[300px] px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">Chart</div>
                    </div>
                </div>
                
            </section>
        </DashboardLayout>
    )
}
