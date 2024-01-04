import FrontLayout from '@/Layouts/FrontLayout'
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs'
import PageTitle from '@/components/front/PageTitle'
import React from 'react'

export default function CatLocations() {
  return (
    <FrontLayout>
    <PageTitle title={"Catégories de voitures"} head={true}>
        <FrontBreadcrumbs pages={[{ 'url': "", 'page': ('Catégories de voitures') }]} />
    </PageTitle>
    <div className="bg-slate-50_ md:shadow-inner__mt-[1px]">
      <div className="max-w-screen-xl mx-auto px-4 ">
        
      </div>
    </div>
  </FrontLayout>
  )
}
