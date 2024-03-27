import Translate from '@/components/Translate';
import i18n from '@/i18n';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { DateToFront, formaterMontant, getEtatReservation } from '@/tools/utils';
import { Head, Link } from '@inertiajs/react';
import {  CardBody, Typography, Button } from '@material-tailwind/react'
import React from 'react'
import { useState } from 'react';
import { AiOutlineArrowLeft,  AiOutlinePrinter } from 'react-icons/ai';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Export({ achats, page_title, page_subtitle }) {
  const [total,setTotal]=useState(0);
  const calculateTotal = (dataArray) => {
    return dataArray.reduce((acc, curr) => acc + curr?.montant, 0);
  };
  useState(() => {
    setTotal(calculateTotal(achats));
  }, [achats]);

  const Print = () => {
    window.print();
  }
  return (
    <div className=' h-full_absolute text-black hover:bg-white bg-white w-full overflow-auto'>
      <div className=' mx-auto py-10 print__:p-0'>
      <Head title={page_title}/>

        <CardBody>
          <div className="grid grid-cols-12 mb-8 pb-4 items-center border-b">
            <div className='col-span-8'>
              <Typography variant="h4" color="blue-gray" className="mb-0">
                {page_title}
              </Typography>
              <Typography variant="small" color="blue-gray" className="mb-2 text-gray-500">
                {page_subtitle} 
              </Typography>
            </div>
            <div className='items-center col-span-4'>              
              <Button onClick={Print} variant='text' className='print:hidden float-right border flex'><AiOutlinePrinter className='me-1' /> Imprimer</Button>
              <Link href={route('dashboard.cventes')}>
              <Button variant='text' className='print:hidden items-center font-bold me-2 float-right border flex'>
                <AiOutlineArrowLeft className='me-1' /> Retour
                </Button>
                </Link>
            </div>
          </div>
          <div className='overflow-auto'>
            <table className=" w-full border text-xs  min-w-max table-auto text-left">
             
              <tbody>
              <tr className='border-b  bg-gray-100'>
                  <th className=' px-4 py-2'>Code</th>
                  <th className=' px-4 py-2'>Voiture</th>
                  <th className=' px-4 py-2'>Prix location</th>
                  <th className=' px-4 py-2'>Période</th>
                  <th className=' px-4 py-2'>Commandé par</th>
                  <th className=' px-4 py-2'>Etat</th>
                </tr>
                {achats && achats.length && achats.map(({ id,code_achat, nom,prenom,etat, created_at,montant, voitures, photo, site_web, pays }, index) => {
                  const isLast = index === achats.length - 1;
                  const classes = isLast
                    ? "px-4 py-2 border-b "
                    : "px-4 py-2  border-b border-blue-gray-50 ";
                  return (
                    <tr className='hover:bg-gray-100 transition-all duration-500 dark:hover:bg-white' key={id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">


                        </div>
                      
                        <div className="flex flex-col">
                            {code_achat??''}
                        </div>
                      </td>
                      <td className={classes}>
                     
                     {voitures?.length>0 && voitures?.map(({nom, annee_fabrication, photo, type_transmission})=>(
                      <div className='flex gap-2 items-center border bg-white mb-2 rounded-sm shadow-sm w-max'>
                        <div>
                        {photo!=null ? <LazyLoadImage src={HTTP_FRONTEND_HOME + '' + photo} alt={nom} className='w-10 rounded-sm  bg-white' size="sm" />:''}

                        </div>
                        <div className='px-2'>
                          {nom+"/Année "+annee_fabrication+"/"+type_transmission}
                        </div>
                      </div>
                     ))}
                      </td>
                      <td className={classes}>
                      {formaterMontant(montant??'0')}

                      </td>
                      <td className={classes}>
                      {DateToFront(created_at,i18n.language,"d/m/Y H:I:S")}
                      </td>
                      <td className={classes}>
                      {nom+' '+prenom}
                      </td>
                      <td className={classes}>
                      {getEtatReservation(etat,true)}
                      </td>
                      
                    </tr>
                  );
                })}
                <tr className='border-b text-lg border-t'>
                  <th className=' px-4 py-2 text-end' colSpan={2}>Total</th>
                  <th className=' px-4 py-2' colSpan={3}>{formaterMontant(total)}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </CardBody>
      </div>
    </div>
  )
}
