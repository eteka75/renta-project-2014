import React from 'react'
  
import FrontLayout from '@/Layouts/FrontLayout'
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs'
import PageTitle from '@/components/front/PageTitle'
import { MiniCard } from '@/components/locations/LocaVoitureCard'
export default function SearchLocation({search}) {
  return (    
        <FrontLayout>
            <PageTitle title={"Recherche"}>
                <FrontBreadcrumbs pages={[{ 'url': route("front.locations"), 'page': ("Locations") }, { 'url': "", 'page': ("Recherche...") }]} />

            </PageTitle>
            <div className="bg-slate-50_ md:shadow-inner__mt-[1px]">
                <div className="max-w-screen-xl mx-auto px-4 ">
                    <div className="grid py-8 mb-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-4">
                        Recherche...
                    </div>
                </div>
            </div>
        </FrontLayout>
    )
}
