import FrontLayout from '@/Layouts/FrontLayout'
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs'
import PageTitle from '@/components/front/PageTitle'
import React from 'react'
export default function Panier() {
  return (
    <FrontLayout>
       <PageTitle title={"Panier d'achat"}>
        <FrontBreadcrumbs pages={[{ 'url': route("front.achats"), 'page': ("Ventes de voitures") },{ 'url': "", 'page': ("Panier") }]} />

        </PageTitle>
    <div className="bg-slate-50_ md:shadow-inner__mt-[1px]">
      <div className="max-w-screen-xl mx-auto px-4 ">
       Panier
      </div>
    </div>
  </FrontLayout>
  )
}
