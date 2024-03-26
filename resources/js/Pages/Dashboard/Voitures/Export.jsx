import Translate from '@/components/Translate';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { Head, Link } from '@inertiajs/react';
import {  CardBody, Typography, Button } from '@material-tailwind/react'
import React from 'react'
import { AiOutlineArrowLeft,  AiOutlinePrinter } from 'react-icons/ai';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Export({ voitures, page_title, page_subtitle }) {
  const Print = () => {
    window.print();
  }
  return (
    <div className=' h-full  absolute w-full overflow-auto'>
      <div className=' mx-auto py-10 print:p-0'>
      <Head title={page_title}/>

        <CardBody>
          <div className="grid grid-cols-12 mb-0 pb-4 items-center border-b">
            <div className='col-span-10'>
              <Typography variant="h4" color="blue-gray" className="mb-0">
                {page_title}
              </Typography>
              <Typography variant="small" color="blue-gray" className="mb-2 text-gray-500">
                {page_subtitle}
              </Typography>
            </div>
            <div className='items-center col-span-2'>              
              <Button onClick={Print} variant='text' className='print:hidden float-right border flex'><AiOutlinePrinter className='me-1' /> Imprimer</Button>
              <Link href={route('dashboard.voitures')}>
              <Button variant='text' className='print:hidden items-center font-bold me-2 float-right border flex'>
                <AiOutlineArrowLeft className='me-1' /> Retour
                </Button>
                </Link>
            </div>
          </div>
          <div className='overflow-auto'>
            <table className=" w-full  min-w-max table-auto text-left">
             
              <tbody>
                <tr className=' border-b  bg-gray-100'>
                  <td className='py-2 px-4'>Voiture</td>
                  <td className='py-2 px-4'>Description</td>
                  <td className='py-2 px-4'>Etat</td>
                </tr>
                {voitures && voitures.length && voitures.map(({ id, nom,disponibilite, description,marque, photo, couleur, annee_fabrication }, index) => {
                  const isLast = index === voitures.length - 1;
                  const classes = isLast
                    ? "px-4 py-2 border-b"
                    : "px-4 py-2  border-b border-blue-gray-50 border-b";

                  return (
                    <tr className='hover:bg-gray-100 transition-all duration-500 dark:hover:bg-gray-900' key={id}>
                      <td className={classes}>
                        <div className="flex items-center">
                          {photo!=null ? <LazyLoadImage src={HTTP_FRONTEND_HOME + '' + photo} alt={nom} className='w-10 rounded-0 bg-white' size="sm" />:''}
                          <div className='ms-2'>{nom+"/"??''}</div>
                          <div className=''>{marque?.nom+"/"??''}</div>
                          <div>{couleur+"/"??''}</div><div>Année {annee_fabrication??''}</div>
                        </div>
                      </td>
                      <td className={classes}>
                      <div className='text-xs max-w-[700px] print:max-w-[400px] '  dangerouslySetInnerHTML={{ __html: description }}></div>

                      </td>
                      <td className={classes}>
                        {disponibilite>0?'Disponible':'Indisponible'}
                      </td>
                      
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </div>
    </div>
  )
}
