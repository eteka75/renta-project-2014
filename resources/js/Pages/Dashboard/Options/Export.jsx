import Translate from '@/components/Translate';
import i18n from '@/i18n';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { DateToFront } from '@/tools/utils';
import { Head, Link } from '@inertiajs/react';
import { Avatar, Card, CardBody, Typography, Button } from '@material-tailwind/react'
import React from 'react'
import { AiOutlineArrowLeft,  AiOutlinePrinter } from 'react-icons/ai';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const head = ["Photo", "Nom",  "Description"];;
export default function Export({ location_options, page_title, page_subtitle }) {
  const Print = () => {
    window.print();
  }
  return (
    <div className=' h-full  absolute w-full _overflow-visible'>
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
              <Link href={route('dashboard.location_options')}>
              <Button variant='text' className='print:hidden items-center font-bold me-2 float-right border flex'>
                <AiOutlineArrowLeft className='me-1' /> Retour
                </Button>
                </Link>
            </div>
          </div>
          <div className='overflow-auto_ justify-start'>
            <table className=" w-full  min-w-max table-auto text-left">
             
              <tbody>
                {location_options && location_options.length && 
                location_options.map(({ id, nom, description, photo,tarif_option_heure,tarif_option_journalier,tarif_option_hebdomadaire,tarif_option_mensuel }, index) => {
                  const isLast = index === location_options.length - 1;
                  const classes = isLast
                    ? "px-4 py-2 print:p-0"
                    : "px-4 py-2 print:p-0  border-b border-blue-gray-50 ";

                  return (
                    <tr className='hover:bg-gray-100 transition-all duration-500' key={id}>
                      <td className={classes} align='top'>
                        <div className="flex justify-start items-start gap-3 max-w-screen-md whitespace-normal overflow-hidden break-words">
                          <div className='py-3'>
                          {photo!=null && <LazyLoadImage src={HTTP_FRONTEND_HOME + '' + photo} alt={nom} className='w-20 rounded-md bg-white' />}

                         </div>           
                        <div className="flex flex-col py-2">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >

                            {nom??''}
                         
                          
                        </Typography>
                        <div className='flex flex-wrap gap-4'>
                        {tarif_option_heure!=null && tarif_option_heure!=0 &&
                        <div className="flex gap-2">
                          <div className="font-bold">Tarif par heure :</div>
                          <div>{tarif_option_heure}</div>
                        </div>
                        }
                        {tarif_option_journalier!=null && tarif_option_journalier!=0 &&
                        <div className="flex gap-2">
                          <div className="font-bold">Tarif jour :</div>
                          <div>{tarif_option_journalier}</div>
                        </div>
                        }
                        {tarif_option_hebdomadaire!=null && tarif_option_hebdomadaire!=0 &&
                        <div className="flex gap-2">
                          <div className="font-bold">Tarif semaine :</div>
                          <div>{tarif_option_hebdomadaire}</div>
                        </div>
                        }
                        {tarif_option_mensuel!=null && tarif_option_mensuel!=0 &&
                        <div className="flex gap-2">
                          <div className="font-bold">Tarif mois :</div>
                          <div>{tarif_option_mensuel}</div>
                        </div>
                        }
                        </div>
                        <div className="">
                          {description!=null?  description:''}
                        </div>
                        </div>
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
