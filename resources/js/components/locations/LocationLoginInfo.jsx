import { Link } from "@inertiajs/react";
import React from "react";
import { FcAssistant } from "react-icons/fc";

function LocationLoginInfo() {
    return (
        <div className="px-4  mt-6">
            <div className="max-w-screen-xl md:mb-6  pb-6 rounded-md mx-auto md:p-4 py-4 relative">
                <div className="p-4 md:p-6 border border-slate-100 dark:border-gray-700 gap-2 md:gap-4 rounded-md hover:shadow-sm flex justify-between">
                    <div className="order-1md:order-0">
                        <h1 className="md:text-xl font-bold">
                            Connectez-vous pour dénicher rapidement les
                            meilleures offres.
                        </h1>
                        <div className="text-gray-500 text-sm  md:text-md">
                            En vous connectant à votre compte, vous pouvez
                            trouver et réserver des meilleures offres bien avant
                            les autres.
                        </div>
                        <div className="mt-2">
                            <Link
                                className="text-blue-500 text-sm md:text-md hover:underline"
                                href={route("login")}
                            >
                                {" "}
                                Se connecter
                            </Link>
                        </div>
                    </div>
                    <div className="text-end order-0md:order-1">
                        <FcAssistant className="w-12 h-20 md:h-20 md:w-24" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LocationLoginInfo;
