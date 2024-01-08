import FrontLayout from '@/Layouts/FrontLayout'
import Pagination from '@/components/Pagination'
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs'
import PageTitle from '@/components/front/PageTitle'
import { MiniCard, VenteVoitureCard } from '@/components/locations/LocaVoitureCard'
import LocationTop from '@/components/locations/LocationTop'
import TopVentes from '@/components/locations/TopVentes'
import { setTarif } from '@/tools/utils'
import React from 'react'

export default function Marque({ marque, ventes, marques }) {
  return (
    <FrontLayout>
      <PageTitle title={marque?.nom}>
        <FrontBreadcrumbs pages={[{ 'url': route("front.marques"), 'page': ("Marques de voitures") }, { 'url': "", 'page': marque?.nom }]} />

      </PageTitle>
      <div className="bg-slate-50_ md:shadow-inner__mt-[1px]">
        <div className="max-w-screen-xl mx-auto px-4 ">
        {ventes?.data != null && ventes?.data?.length > 0 &&
                <>
                  <div className="md:grid sm:grid-cols-2 lg:grid-cols-3 md:mt-4  md:gap-4">
                    {ventes?.data != null && ventes?.data?.length > 0 && ventes?.data?.map(({ voiture, id, tarif_location_heure,
                      tarif_location_journalier, tarif_location_hebdomadaire,
                      tarif_location_mensuel, duree_garantie, kilometrage, prix_vente
                    }, index) => {
                      return <VenteVoitureCard
                        id={id}
                        garantie={duree_garantie}
                        prix_vente={prix_vente}
                        kilometrage={kilometrage}
                        annee_fabrication={voiture?.annee_fabrication}
                        nb_personne={voiture?.nombre_place}
                        type_boite={voiture?.type_transmission}
                        vitesse={voiture?.nombre_vitesse}
                        nb_grande_valise={voiture?.nombre_grande_valise}
                        nb_petite_valise={voiture?.nombre_petite_valise}
                        volume_coffre={voiture?.volume_coffre}
                        marque={voiture?.marque?.nom}
                        categorie={voiture?.categorie?.nom}
                        nom={voiture?.nom}
                        carburant={voiture?.type_carburant?.nom}
                        photo={voiture?.photo}
                        puissance={voiture?.puissance_moteur}
                        tarif={setTarif(tarif_location_heure, tarif_location_journalier, tarif_location_hebdomadaire, tarif_location_mensuel)}
                        key={index} />
                    })}


                  </div>
                  <div className="mb-4">

                    <Pagination links={ventes?.data?.links} />
                  </div>
                </>
              }
        </div> 
        {marques?.data?.length > 0 && 
        <div className='bg-zinc-50 shadow-inner py-6'>
          <div className="max-w-screen-xl mx-auto px-4 ">
          <h2 className='font-bold text-gray-500 mb-4 tracking-widest hidden sm:flex uppercase line-clamp-5'>Autres marques</h2>

          <div className="grid pb-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-4">
                        {marques?.data?.length > 0 && marques?.data?.map((marque, index) => (
                            <MiniCard key={index} nom={marque.nom} slug={marque.slug} id={marque.id} info={marque.voitures_count ? marque.voitures_count + ' Voitures' : ''} image={marque.logo} />
                        ))}
                    </div>
          </div>          
        </div>  }            
      </div>
    </FrontLayout>
  )
}
