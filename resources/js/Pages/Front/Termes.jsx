import FrontLayout from '@/Layouts/FrontLayout'
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs'
import PageTitle from '@/components/front/PageTitle'
import React from 'react'
export default function Termes({ page }) {
  return (
    <FrontLayout>
      <PageTitle head={false} title={"Termes et conditions d'utilisation"}>
        <FrontBreadcrumbs pages={[{ 'url': "", 'page': ("Termes et conditions d'utilisation") }]} />

      </PageTitle>
      <div className="bg-slate-50_ md:shadow-inner__mt-[1px]">
        <div className="max-w-screen-xl mx-auto px-4 ">
          <div className="max-w-screen-lg mx-auto ">
            <div className="">
              <h1 className="text-2xl lg:text-3xl lg:text-5xl  xl py-4 md:py-6 font-bold">
                {page?.titre}
              </h1>
            </div>
            <div className="py-4 text-md mb-8 text-start text-lg html">
              <div dangerouslySetInnerHTML={{ __html: page?.contenu }}></div>

            </div>
          </div>
        </div>
      </div>
    </FrontLayout>
  )
}
