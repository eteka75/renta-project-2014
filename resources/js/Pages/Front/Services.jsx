import FrontLayout from '@/Layouts/FrontLayout'
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs'
import PageTitle from '@/components/front/PageTitle'
import { HTTP_FRONTEND_HOME } from '@/tools/constantes'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function Services({page}) {
  return (
    <FrontLayout>
      <PageTitle title={"Services"} head={false}>
          <FrontBreadcrumbs pages={[{ 'url': "", 'page': ('Services') }]} />
      </PageTitle>
      <div className="bg-slate-50_ md:shadow-inner__mt-[1px]">
        <div className="max-w-screen-xl mx-auto px-4 ">
          <div className="max-w-screen-lg ">
            <div className="">
              <h1 className="text-3xl lg:text-5xl  xl py-4 font-bold">
                {page?.titre}
              </h1>
            </div>
           {page?.photo!=null && <div className="py-4">
              <LazyLoadImage src={HTTP_FRONTEND_HOME + "" + page?.photo} className='h-fullmax-w-full mx-auto rounded-lg object-cover shadow-sm object-center' alt={page?.titre} />

            </div>}
            
            <div className="py-4 text-md mb-8 text-start text-lg html">
              <div className='html body_main dark:text-white' dangerouslySetInnerHTML={{ __html: page?.contenu }}></div>

            </div>
          </div>
        </div>
      </div>
    </FrontLayout>
  )
}
