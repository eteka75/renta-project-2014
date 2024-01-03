import React from 'react'
import { MdAttachMoney, MdChecklistRtl } from 'react-icons/md';
import { TbCalculator, TbSettingsDollar } from 'react-icons/tb'
import vexpert from "../../assets/images/design/v-expert.png";

export default function LocationExpert() {
    return (
        <>
            <div className="bg-slate-50  py-8 ">
                <div className="max-w-screen-xl mx-auto p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div>
                            <img src={vexpert} alt="h-auto max-w-full" />
                        </div>
                        <div className='py-10'>
                            <h1 className="text-2xl lg:text-4xl font-extrabold mb-4">Notre expertise à votre service</h1>
                            <div className="flex text-lg lg:text-xl items-center mb-4">
                            <span className='text-center items-center justify-center leading-10  font-bold rounded-full me-2 text-sm bg-white shadow p-2'>
                                    <MdAttachMoney className='h-6  w-6' />                                
                                </span>
                                <div>Une analyse objective des prix</div>
                            </div>
                            <div className="flex text-lg lg:text-xl items-center mb-4">
                               <span className='text-center items-center justify-center leading-10  font-bold rounded-full me-2 text-sm bg-white shadow p-2'>
                                    <MdChecklistRtl className='h-6  w-6' />                                
                                </span>
                                <div>Une visibilité complète sur l'historique du voiture</div>
                            </div>
                            <div className="flex text-lg lg:text-xl items-center mb-4">
                               <span className='text-center items-center justify-center leading-10  font-bold rounded-full me-2 text-sm bg-white shadow p-2'>
                                <TbCalculator className='h-6  w-6' />
                                </span> 
                                <div>Votre budget maîtrisé avec notre simulateur de financement</div>
                            </div>
                            <div className="flex text-lg lg:text-xl items-center mb-4">
                            <span className='text-center items-center justify-center leading-10  font-bold rounded-full me-2 text-sm bg-white shadow p-2'>
                                    <TbSettingsDollar className='h-6  w-6' />                                
                                </span>
                                <div>Une projection claire sur les futurs entretiens de votre voiture</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
