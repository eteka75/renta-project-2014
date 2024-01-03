import FrontLayout from '@/Layouts/FrontLayout'
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs'
import PageTitle from '@/components/front/PageTitle'
import { MiniCard } from '@/components/locations/LocaVoitureCard copy'
import React from 'react'

export default function Marques({marques}) {
    return (
        <FrontLayout>
    <PageTitle title={"Marques"}>
     <FrontBreadcrumbs pages={[{ 'url': route("front.locations"), 'page': ("Locations") },{ 'url': "", 'page': ("Marques") }]} />

     </PageTitle>
 <div className="bg-slate-50_ shadow-inner mt-[1px]">
   <div className="max-w-screen-xl mx-auto px-4 ">
   <div className="grid py-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-4">
        {marques?.data?.length>0 && marques?.data?.map((marque,index)=>(
            <MiniCard key={index} nom={marque.nom} slug={marque.slug} id={marque.id} info={marque.voitures_count?marque.voitures_count+' Voitures':''} image={marque.logo} />
        ))} 
        </div> 
   </div>
 </div>
</FrontLayout>
    )
}
