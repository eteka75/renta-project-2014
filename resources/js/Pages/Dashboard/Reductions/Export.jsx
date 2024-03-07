import Translate from '@/components/Translate';
import i18n from '@/i18n';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { DateToFront } from '@/tools/utils';
import { Head, Link } from '@inertiajs/react';
import { Avatar, Card, CardBody, Typography, Button } from '@material-tailwind/react'
import React from 'react'
import { AiOutlineArrowLeft, AiOutlinePrinter } from 'react-icons/ai';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const head = ["Photo", "Nom", "Description"];;
export default function Export({ location_reductions, page_title, page_subtitle }) {
  const Print = () => {
    window.print();
  }
  return (
    <div className=' h-full  absolute w-full _overflow-visible'>
      <div className=' mx-auto py-10 print:p-0'>
        <Head title={page_title} />

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
              <Link href={route('dashboard.location_reductions')}>
                <Button variant='text' className='print:hidden items-center font-bold me-2 float-right border flex'>
                  <AiOutlineArrowLeft className='me-1' /> Retour
                </Button>
              </Link>
            </div>
          </div>
          <div className='overflow-auto_ justify-start'>
            <table className=" w-full  min-w-max table-auto text-left">

              <tbody>
                {location_reductions && location_reductions.length &&
                  location_reductions.map(({ id, nom, description, photo, type_reduction, code_reduction, montant_min_reduction
                    , montant_max_reduction, date_debut_reduction, date_fin_reduction, pourcentage, montant }, index) => {
                    const isLast = index === location_reductions.length - 1;
                    const classes = isLast
                      ? "px-4 py-2 print:p-0"
                      : "px-4 py-2 print:p-0  border-b border-blue-gray-50 ";

                    return (
                      <tr className='hover:bg-gray-100 transition-all duration-500 dark:hover:bg-gray-900' key={id}>
                        <td className={classes} align='top'>
                          <div className="flex justify-start items-start gap-3 max-w-screen-md whitespace-normal overflow-hidden break-words">
                            <div className='py-3'>
                              {photo != null && <LazyLoadImage src={HTTP_FRONTEND_HOME + '' + photo} alt={nom} className='w-20 rounded-md bg-white' />}

                            </div>
                            <div className="flex flex-col py-2">
                              <Typography
                                variant="h5"
                                color="blue-gray"
                                className="font-bold"
                              >

                                {nom ?? ''}


                              </Typography>
                              <div className='flex flex-wrap gap-4'>
                                {type_reduction != null && type_reduction != '' &&
                                  <div className="flex gap-2">
                                    <div className="font-bold">Type :</div>
                                    <div>{type_reduction == 'M' ? 'Montant' : (type_reduction == 'P' ? 'Pourcentage' : '')}</div>
                                  </div>
                                }
                                {montant != null && code_reduction != 0 &&
                                  <div className="flex gap-2">
                                    <div className="font-bold">Montant :</div>
                                    <div>{montant ?? ''}</div>
                                  </div>
                                }
                                {pourcentage != null && pourcentage != 0 &&
                                  <div className="flex gap-2">
                                    <div className="font-bold">Montant :</div>
                                    <div>{pourcentage + '%' ?? ''}</div>
                                  </div>
                                }

                              </div>
                              {code_reduction != null && code_reduction != '' &&
                                <div className="flex gap-2">
                                  <div className="font-bold">Code :</div>
                                  <div>{code_reduction ?? ''}</div>
                                </div>
                              }
                              {montant_min_reduction != null && montant_min_reduction != '' &&
                                <div className="flex gap-2">
                                  <div className="font-bold">Montant minimum :</div>
                                  <div>{montant_min_reduction ?? ''}</div>
                                </div>
                              }
                              {montant_max_reduction != null && montant_max_reduction != '' &&
                                <div className="flex gap-2">
                                  <div className="font-bold">Montant maximum :</div>
                                  <div>{montant_max_reduction ?? ''}</div>
                                </div>
                              }
                              {date_debut_reduction != null && date_debut_reduction != '' &&
                                <div className="flex gap-2">
                                  <div className="font-bold">Date début :</div>
                                  <div>{DateToFront(date_debut_reduction, i18n.language, 'd/m/Y') ?? ''}</div>
                                </div>
                              }
                              {date_fin_reduction != null && date_fin_reduction != '' &&
                                <div className="flex gap-2">
                                  <div className="font-bold">Date début :</div>
                                  <div>{DateToFront(date_fin_reduction, i18n.language, 'd/m/Y') ?? ''}</div>
                                </div>
                              }
                              {description != null && description != '' &&
                                <div className="flex gap-2">
                                  <div className="font-bold">Description :</div>
                                  <div>{description ?? ''}</div>
                                </div>
                              }
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
