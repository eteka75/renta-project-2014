import React from "react";
import { FcAutomotive, FcCurrencyExchange, FcSearch } from "react-icons/fc";
import vexpert from "../../assets/images/design/v-expert.png";

export default function LocationSteps() {
    return (
        <>
            <div className="px-4 pt-6 border-b border-slate-100 dark:border-0 dark:bg-slate-900">
                <div className="max-w-screen-xl  bordershadow-sm  rounded-md mx-auto py-4 md:p-4 relative">
                    <div className="xl:px-4 border hover:shadow-inner md:hover:shadow-none p-4 rounded-md dark:border-gray-700/80 md:py-0 md:border-0 mx-auto md:pt-2 md:pb-4 grid grid-cols-12 gap-4 lg:gap-6">
                        <div className="col-span-12  dark:border-gray-700/80  md:col-span-4 border-b md:border-b-0 md:border-e pb-4 md:pb-0 md:border-t-0">
                            <div className="flex text-xl font-bold ">
                                <div className="text-blue-700_ text-blue-700">
                                    1- Recherchez et choisissez
                                </div>
                                <FcSearch className="text-center justify-center leading-10 h-10 w-10 font-bold rounded-lg  text-sm  p-2" />
                            </div>
                            <div className="text-sm px-2 text-slate-600 dark:text-slate-100">
                                Renseignez votre localisation, la date de départ
                                et d'arrivée à ce lieu
                            </div>
                        </div>
                        <div className="col-span-12 dark:border-gray-700/80 md:col-span-4 border-b md:border-b-0 md:border-e pb-4 md:pb-0 md:border-t-0">
                            <div className="flex text-xl font-bold">
                                <div className="text-green-600">
                                    2- Renseignez-nous et payez
                                </div>
                                <FcCurrencyExchange className="text-center justify-center leading-10 h-10 w-10 font-bold rounded-lg  text-sm  p-2" />
                            </div>
                            <div className="text-sm px-2 text-slate-600 dark:text-slate-100">
                                Créez un compte ou connectez vous à votre compte
                                puis validez la transaction
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-4  dark:border-gray-700/80 md:border-b-0  pb-4 md:pb-0 md:border-t-0">
                            <div className="flex text-xl font-bold">
                                <div className="text-red-600">
                                    3- Récupérez votre voiture
                                </div>
                                <FcAutomotive className="text-center justify-center leading-10 h-10 w-10 font-bold rounded-lg  text-sm  p-2" />
                            </div>
                            <div className="text-sm px-2 text-slate-600 dark:text-slate-100">
                                Suivez les indication qui vous sont envoyées
                                pour passer récupéer votre voiture et c'est
                                partie
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
