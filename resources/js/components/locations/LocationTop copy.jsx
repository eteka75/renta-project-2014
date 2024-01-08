
{/*import '@/css/front.css';
import { setTarif } from '@/tools/utils';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { FaAngleRight } from "react-icons/fa6";
import { LocaVoitureCard } from './LocaVoitureCard';
import { useState } from 'react';
import { useEffect } from 'react';



export default function LocationTop({ locations, className,nextbtn=1, toptext="Louez à petit prix et voyagez en grand" }) {
    const {t}=useTranslation();
    const datats=useState([]);


    return (
        <>
        {locations?.length>0 && 
            <div className={"max-w-screen-xl mx-auto p-4 "+className}>
                <h2 className="font-bold text-2xl  mt-8 flex">
                    En location
                </h2>
                <p className="text-slate-600">{toptext}</p>
                <div id='car' className="car-vehicules overflow-auto mt-6 mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                    
                   {locations?.map(({voiture,id,tarif_location_heure,
                    tarif_location_journalier,tarif_location_hebdomadaire,
                    tarif_location_mensuel
                }, index) =>
                        <LocaVoitureCard  
                        id={id}
                        nb_personne={voiture?.nombre_place}
                        type_boite ={voiture?.type_transmission} 
                        vitesse={voiture?.nombre_vitesse}
                        nb_grande_valise={voiture?.nombre_grande_valise}
                        nb_petite_valise={voiture?.nombre_petite_valise}
                        volume_coffre={voiture?.volume_coffre}
                        marque={voiture?.marque?.nom}
                        categorie ={voiture?.nombre_petite_valise}
                        nom={voiture?.nom} 
                        carburant={voiture?.type_carburant?.nom} 
                        photo={voiture?.photo} 
                        puissance={voiture?.puissance_moteur} 
                        tarif={setTarif(tarif_location_heure,tarif_location_journalier,tarif_location_hebdomadaire,tarif_location_mensuel)} 
                        key={index}/>
                        )}
                </div>


                {nextbtn>0 && nextbtn==1 &&
                <div className='  my-6'>
                    <Link href={route('front.achats')} className=' items-center px-0 mx-auto dark:text-white flex bg-white hover:opacity-70   text-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold   text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                    Découvrir plus
                        <FaAngleRight className="ms-1" />
                    </Link>
                </div>
                }
                
            </div>
            }
        </>
    )
}
*/
}