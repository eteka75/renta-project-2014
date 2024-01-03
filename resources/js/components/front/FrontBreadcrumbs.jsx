import { Link } from '@inertiajs/react'
import { Breadcrumbs } from '@material-tailwind/react'
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function FrontBreadcrumbs({pages,header=true}) {
    const { t } = useTranslation();

  return (
    <>
    <Breadcrumbs className='px-0 py-4'>
            <Link href={'/'} className="opacity-60 flex">
                <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 me-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg> Accueil
            </Link>
            {pages && pages?.length>0 && pages?.map(({url,page},index)=>{
                if(url=='' || url ==null || url=='#'){
                    return (
                        <Link key={index} href={"#"} className="font-bold opacity-100">
                            <span>{t(page)}</span>
                        </Link>)
                }else{
                    return (
                        <Link key={index}href={url??"#"} className="opacity-60">
                        <span>{t(page)}</span>
                    </Link>)
                }
            })}
        </Breadcrumbs>
    </>
  )
}
