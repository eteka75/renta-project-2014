import Translate from '@/components/Translate';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { DateToFront } from '@/tools/utils';
import { Head, Link } from '@inertiajs/react';
import {  CardBody, Typography, Button } from '@material-tailwind/react'
import React from 'react'
import { AiOutlineArrowLeft,  AiOutlinePrinter } from 'react-icons/ai';

export default function Export({ notifications, page_title, page_subtitle }) {
  const Print = () => {
    window.print();
  }
  return (
    <div className=' h-full_absolute text-black hover:bg-white bg-white w-full overflow-auto'>
      <div className=' mx-auto py-10 print__:p-0'>
      <Head title={page_title}/>

        <CardBody>
          <div className="grid grid-cols-12 pb-4 mb-8 items-center border-b">
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
              <Link href={route('dashboard.notifications')}>
              <Button variant='text' className='print:hidden items-center font-bold me-2 float-right border flex'>
                <AiOutlineArrowLeft className='me-1' /> Retour
                </Button>
                </Link>
            </div>
          </div>
          <div className='overflow-auto'>
            <table className=" w-full text-xs border min-w-max table-auto text-left">
             
              <tbody>
              <tr className='bg-gray-100  border-b'>
                <th className='py-2 px-4'>Message</th>
                <th className='py-2 px-4'>Date d'envoie</th>
                <th className='py-2 px-4'>Archives</th>
              </tr>
                {notifications && notifications.length && notifications.map(({ id, message, lien,archived_at,  created_at }, index) => {
                  const isLast = index === notifications.length - 1;
                  const classes = isLast
                    ? "px-4 py-2  gap-4"
                    : "px-4 py-2  border-b border-blue-gray-50  gap-4";

                  return (
                    <tr className='hover:bg-gray-100 transition-all duration-500 dark:hover:bg-white' key={id}>
                      <td className={classes}>
                        
                      
                        <div className="flex flex-col">                         
                            <div className='text-xs break-words text-wrap '>
                            {message??''}
                            </div>
                         <div className='text-sm text-blue-500'>
                        <a href={lien}> {lien}</a>
                         </div>
                        </div>
                      </td>
                      <td className={classes}>
                      {DateToFront(created_at)}
                      </td>
                      <td className={classes}>
                      {archived_at!=null?"Archivé":'Non'}
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
