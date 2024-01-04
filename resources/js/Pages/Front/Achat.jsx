import FrontLayout from '@/Layouts/FrontLayout'
import React from 'react'

export default function Achat() {
  return (
    <FrontLayout>
      <Head title={t("Achat de voitures")} />
      <div className="bg-slate-50_ shadow-inner_ mt-[1px]">
        <div className="max-w-screen-xl mx-auto px-4 ">
          <FrontBreadcrumbs pages={[{ 'url': "", 'page': t('Achat de voitures') }]} />

          <div className='grid grid-cols-12'>
            <h1 className="col-span-12 text-xl md:text-2xl md:gap-4 font-bold">Achats</h1>
          </div>
        </div>
      </div>
    </FrontLayout>
  )
}
