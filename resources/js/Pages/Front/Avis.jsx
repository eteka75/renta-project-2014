import FrontLayout from '@/Layouts/FrontLayout'
import Pagination from '@/components/Pagination';
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs'
import PageTitle from '@/components/front/PageTitle'
import { ShowEtoiles } from '@/components/locations/LocaVoitureCard';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import React, { useEffect, useState } from 'react'
export default function Avis({ avis }) {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    //return()=>{ 
    if (avis?.data && avis?.data?.length > 0) {
      setDatas(avis.data)
    }
    //}
  }, [])
  return (
    <FrontLayout>
      <PageTitle title={"Avis clients"}>
        <FrontBreadcrumbs pages={[{ 'url': "", 'page': ("Avis de nos clients") }]} />
      </PageTitle>
      <div className="bg-slate-50_ shadow-inner mt-[1px]">
        <div className="max-w-screen-lg mx-auto px-4 ">

          <div className="py-6 md:py-12">
            <div className="">
              {console.log(datas)}
              {datas?.length > 0 && datas?.map(({ auteur, profession, nombre_etoile, message, photo, created_at }, index) => (
                <div key={index} className="">

                  <div className="bg-white min-h-full mb-4 shadow-sm border   rounded-2xl px-8 py-6 shadow-lg_ hover:shadow-md transition duration-500">
                    <div className="">
                      <ShowEtoiles nb={nombre_etoile} />
                    </div>
                    <p className="mt-2 text-lg text-gray-600 ">{message}</p>
                    <div className="flex justify-between items-center">
                      <div className="mt-4 flex items-center space-x-4 py-4">
                        <div className="">
                          <img className="w-12 h-12 object-cover rounded-full" src={HTTP_FRONTEND_HOME + '' + photo} alt="" />
                        </div>
                        <div>

                        <div className="text-sm font-semibold">{auteur} </div>
                        <div className='text-slate-500 text-sm'>{profession}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
           
          </div>
          <div className='py-4 mb-4'>
              <Pagination links={avis?.links}/>
            </div>
        </div>
      </div>
    </FrontLayout>
  )
}
