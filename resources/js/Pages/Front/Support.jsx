import FrontLayout from '@/Layouts/FrontLayout'
import Pagination from '@/components/Pagination'
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs'
import PageTitle from '@/components/front/PageTitle'
import { SupportInfoCard } from '@/components/locations/LocaVoitureCard'
import { HTTP_FRONTEND_HOME } from '@/tools/constantes'
import { truncateString } from '@/tools/utils'
import { Link } from '@inertiajs/react'
import { Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Support({infos}) {
  const { t } = useTranslation();
  const [listInfo, setListInfo] = useState([]);

  useEffect(() => {
    setListInfo(infos?.data ?? [])
  }, [])
  return (
    <FrontLayout>
    <PageTitle head={false} title={"Support clients"}>
      <FrontBreadcrumbs pages={[{ 'url': "", 'page': t('Support clients') }]} />
    </PageTitle>
    <div className="bg-slate-50_">
      <div className="max-w-screen-xl mx-auto px-4 ">
        
    <div>
       {listInfo && listInfo?.length > 0 &&
          <div className=" rounded-lg  md:p-8 my-8 md:my-16">
          <div className=" text-center mb-4">
            <h2 className="text-4xl lg:text-5xl  font-extrabold">Support clients</h2>
            <p className="text-slate-500 text-md md:text-xl ">Découvrez notre guide pour mieux en servir</p>
          </div>
          
          
          <div className=" md:py-8 py-4   md:grid  md:grid-cols-2 lg:grid-cols-3 md:mb-10 gap-4 ">
            {listInfo && listInfo?.length > 0 && listInfo?.map(({ titre, photo, id, slug }, index) => (
              <SupportInfoCard
              key={index}
                id={id}
                titre={titre}
                slug={slug}
                photo={photo}
              />
            ))}
          </div>
          </div>
          }
          {listInfo && listInfo?.length > 0 &&
          <div className="p-4 mb-4 flex justify-center mx-auto">
            <Pagination links={infos?.links}/>
          </div> 
        }     
    </div>
    </div>
    </div>
    </FrontLayout>
  )
}
