import React from 'react'
import { LocaVoitureCard } from './LocaVoitureCard'
import { setTarif } from '@/tools/utils'

export default function SuggestionsLocation({locations}) {
  return (
    <div className='py-4 bg-slate-50 md:shadow-inner'>
       
        <div className="max-w-screen-xl bordershadow-sm mb-6 rounded-md mx-auto p-4 relative">
            <h2 className="text-xl uppercase font-bold ">
                Recommandations
            </h2>

            <div className="">
            <div className="car-vehicules overflow-auto mt-6 mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                    {locations?.length>0 && locations?.map(({voiture,id,tarif_location_heure,
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
            </div>
        </div>
    </div>
  )
}
