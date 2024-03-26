import Translate from '@/components/Translate';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { DateToFront } from '@/tools/utils';
import { Head, Link } from '@inertiajs/react';
import {  CardBody, Typography, Button } from '@material-tailwind/react'
import React from 'react'
import { AiOutlineArrowLeft,  AiOutlinePrinter } from 'react-icons/ai';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Export({ commandes, page_title, page_subtitle }) {
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
              <Link href={route('dashboard.clocations')}>
              <Button variant='text' className='print:hidden items-center font-bold me-2 float-right border flex'>
                <AiOutlineArrowLeft className='me-1' /> Retour
                </Button>
                </Link>
            </div>
          </div>
          <div className='overflow-auto'>
            <table className=" w-full  min-w-max table-auto text-left">
             
              <tbody>
                <tr className='border-b  bg-gray-100'>
                  <th className=' px-4 py-2'>Code</th>
                  <th>Voiture</th>
                  <th>Prix location</th>
                  <th>Période</th>
                  <th>Commandé par</th>
                </tr>
                {commandes && commandes.length && commandes.map(({ id, nom,prenom,date_debut, date_fin, montant, code_reservation, description, photo, voiture, transactions }, index) => {
                  const isLast = index === commandes.length - 1;
                  const classes = isLast
                    ? "px-4 py-2 text-xs print:w-min "
                    : "px-4 py-2 text-xs  border-b border-blue-gray-50";

                  return (
                    <tr className='hover:bg-gray-100 transition-all duration-500 dark:hover:bg-gray-900' key={id}>
                      
                      <td className={classes}>
                        {code_reservation}
                        </td>
                      <td className={classes}>
                        <div className="flex gap-1 items-center ">

                          {voiture?.photo!=null ? <LazyLoadImage src={HTTP_FRONTEND_HOME + '' + voiture?.photo} alt={voiture?.photo} className='w-10 rounded-0 bg-white' size="sm" />:''}
                          <div>{voiture?.nom}</div>
                        </div>
                        </td>
                      <td className={classes}>
                      
                        <div className="flex flex-col">
                          {montant} FCFA
                        </div>
                      </td>
                      <td className={classes}>
                      
                        <div className="flexflex-col">
                       <span>{DateToFront(date_debut)}</span>
                       <span> - </span>  
                          <span>{DateToFront(date_fin)}</span>
                        </div>
                      </td>
                      <td className={classes}>
                      
                        <div className="flex flex-col">
                          <div>{nom+" "+prenom}</div>
                        </div>
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
