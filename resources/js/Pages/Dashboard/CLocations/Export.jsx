import Translate from '@/components/Translate';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { DateToFront, formaterMontant, getEtatReservation } from '@/tools/utils';
import { Head, Link } from '@inertiajs/react';
import {  CardBody, Typography, Button } from '@material-tailwind/react'
import React from 'react'
import { useState } from 'react';
import { AiOutlineArrowLeft,  AiOutlinePrinter } from 'react-icons/ai';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Export({ commandes, page_title, page_subtitle }) {
  const [total,setTotal]=useState(0);
  const calculateTotal = (dataArray) => {
    return dataArray.reduce((acc, curr) => acc + curr?.montant, 0);
  };
  useState(() => {
    setTotal(calculateTotal(commandes));
  }, [commandes]);
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
              <Link href={route('dashboard.clocations')}>
              <Button variant='text' className='print:hidden items-center font-bold me-2 float-right border flex'>
                <AiOutlineArrowLeft className='me-1' /> Retour
                </Button>
                </Link>
            </div>
          </div>
          <div className='overflow-auto'>
            <table className=" w-full border  min-w-max table-auto text-left">
             
              <tbody>
                <tr className='border-b  bg-gray-100'>
                  <th className=' px-4 py-2'>Code</th>
                  <th className=' px-4 py-2'>Voiture</th>
                  <th className=' px-4 py-2'>Prix location</th>
                  <th className=' px-4 py-2'>Période</th>
                  <th className=' px-4 py-2'>Commandé par</th>
                  <th className=' px-4 py-2'>Etat</th>

                </tr>
                {commandes && commandes.length && commandes.map(({ id, etat,nom,prenom,date_debut, date_fin, montant, code_reservation, description, photo, voiture, transactions }, index) => {
                  const isLast = index === commandes.length - 1;
                  const classes = isLast
                    ? "px-4 py-2 text-xs print:w-min "
                    : "px-4 py-2 text-xs  border-b border-blue-gray-50";

                  return (
                    <tr className='hover:bg-gray-100 transition-all duration-500 dark:hover:bg-white' key={id}>
                      
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
                      <td className={classes}>
                      {getEtatReservation(etat,true)}
                      </td>
                      
                    </tr>
                  );
                })}
                 <tr className='border-b text-lg border-t '>
                  <th className=' px-4 py-2 text-end' colSpan={3}>Total</th>
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
