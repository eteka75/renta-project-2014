import FrontLayout from '@/Layouts/FrontLayout'
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs'
import PageTitle from '@/components/front/PageTitle'
import React from 'react'
import '@/css/front.css'
import { SupportInfoCard } from '@/components/locations/LocaVoitureCard'
import { HTTP_FRONTEND_HOME } from '@/tools/constantes'
import { LazyLoadImage } from 'react-lazy-load-image-component'
export default function FaqInfo({page,suggestions}) {
  return (
    <FrontLayout>
      {console.log("SUGG",suggestions)}
       <PageTitle title={page?.titre??''} head={false}>
        <FrontBreadcrumbs pages={[{ 'url': route("front.support"), 'page': ("Support clients") },{ 'url': "", 'page': (page?.titre??'') }]} />

        </PageTitle>
    <div className="bg-slate-50_ md:shadow-inner__mt-[1px]">
      <div className="max-w-screen-xl mx-auto px-4 ">
       <div className="max-w-screen-md mx-auto">
        <div className="">
           <h1 className="text-3xl lg:text-5xl text-center lg:text-start xl py-8 font-bold">
            {page?.titre}
            </h1> 
        </div>
        {page?.photo!=null && <div className="py-4">
              <LazyLoadImage src={HTTP_FRONTEND_HOME + "" + page?.photo} className='h-fullmax-w-full mx-auto rounded-lg object-cover shadow-sm object-center' alt={page?.titre} />

            </div>}
        <div className="p-4 text-md mb-8 text-justify text-lg html">
        <div className='html dark:text-slate-100' dangerouslySetInnerHTML={{__html:page?.contenu}}></div>

        </div>
       </div>
       
      </div>
<div className="bg-gray-50 dark:bg-slate-800 dark:border-slate-700  dark:border-t pt-4">
<div className="max-w-screen-lg px-4 mx-auto">
      <div className=" md:py-8 py-4   md:grid  md:grid-cols-2 lg:grid-cols-3  gap-4 ">
        { suggestions?.map(({titre, photo, id, slug},index)=>(
          <SupportInfoCard
          key={index}
            id={id}
            photo={photo}
            slug={slug}
            titre={titre}
          />
        ))}
       </div>
       </div>
       </div>
    </div>
  </FrontLayout>
  )
}
