import React from 'react'
import { FcAutomotive, FcCurrencyExchange, FcSearch } from "react-icons/fc";
import vexpert from "../../assets/images/design/v-expert.png";


export default function LocationSteps() {
    return (
        <>
            <div className="px-4 mt-6">
                <div className="max-w-screen-xl bordershadow-sm mb-6 rounded-md mx-auto p-4 relative">

                    <div className="xl:px-10 mx-auto md:pt-2 md:pb-4 grid grid-cols-12 gap-4 lg:gap-6">
                        <div className="col-span-12  md:col-span-4 border-b md:border-b-0 md:border-e pb-4 md:pb-0 md:border-t-0">

                            <div className="flex text-xl font-bold ">
                                <div className='text-blue-700_ text-blue-700'>1- Recherchez et choisissez</div>
                                <FcSearch className='text-center justify-center leading-10 h-10 w-10 font-bold rounded-lg  text-sm  p-2' />
                            </div>
                            <div className="text-sm px-2 text-slate-600">
                                Renseignez votre localisation, la date de départ et d'arrivée à ce lieu
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-4 border-b md:border-b-0 md:border-e pb-4 md:pb-0 md:border-t-0">

                            <div className="flex text-xl font-bold">
                                <div className='text-green-600'>2- Renseignez-nous et payez</div>
                                <FcCurrencyExchange className='text-center justify-center leading-10 h-10 w-10 font-bold rounded-lg  text-sm  p-2' />
                            </div>
                            <div className="text-sm px-2 text-slate-600">
                                Créez un compte ou connectez vous à votre compte puis validez la transaction
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-4  md:border-b-0 md:border-e pb-4 md:pb-0 md:border-t-0">

                            <div className="flex text-xl font-bold">
                                <div className='text-red-600'>3- Récupérez votre voiture</div>
                                <FcAutomotive className='text-center justify-center leading-10 h-10 w-10 font-bold rounded-lg  text-sm  p-2' />
                            </div>
                            <div className="text-sm px-2 text-slate-600">
                            Suivez les indication qui vous sont envoyées pour passer récupéer votre voiture et c'est partie
                         </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </>
    )
}
