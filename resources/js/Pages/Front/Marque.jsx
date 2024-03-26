import FrontLayout from '@/Layouts/FrontLayout'
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs'
import PageTitle from '@/components/front/PageTitle'
import { MiniCard } from '@/components/locations/LocaVoitureCard'
import LocationTop from '@/components/locations/LocationTop'
import TopVentes from '@/components/locations/TopVentes'
import React from 'react'

export default function Marque({ marque, locations, ventes,marques }) {
  return (
    <FrontLayout>
      <PageTitle title={marque?.nom}>
        <FrontBreadcrumbs pages={[{ 'url': route("front.lesmarques"), 'page': ("Marques de voitures") }, { 'url': "", 'page': marque?.nom }]} />

      </PageTitle>
      <div className="bg-slate-50_ md:shadow-inner__mt-[1px]">
        <LocationTop nextbtn={2} marque_id={marque?.id??0} locations={locations} />
          <TopVentes marque_id={marque?.id??0} nextbtn={2} toptext='Les voitures disponible pour cette marque choisie' className="bg-gray-50 md:shadow-inner py-4"  ventes={ventes}/>
          {marques?.data?.length > 0 && 
        <div className=' py-6'>
          <div className="max-w-screen-xl mx-auto px-4 ">
            <h2 className='font-bold text-gray-500 mb-4 tracking-widest hidden sm:flex uppercase line-clamp-5'>Autres marques</h2>
          <div className="grid pb-8  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-4">
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
