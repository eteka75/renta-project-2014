import InputLabel from '@/components/InputLabel';
import Translate from '@/components/Translate';
import i18n from '@/i18n';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { DateToFront } from '@/tools/utils';
import { Head } from '@inertiajs/react';

import { Link } from '@inertiajs/react';
import { CardBody, Typography, Button } from '@material-tailwind/react'
import React from 'react'
import { AiOutlineArrowLeft, AiOutlinePrinter } from 'react-icons/ai';
//const head = ["fichier", "Nom", "Année", "Site Web", "Pays"];;
export default function Export({ controles, page_title, page_subtitle }) {
  const Print = () => {
    window.print();
  }
  return (
    <div className=' h-full_absolute text-black hover:bg-white bg-white w-full overflow-auto'>
      <div className=' mx-auto py-10 print__:p-0'>
        <Head title={page_title}/>
        <CardBody>
          <div className="grid grid-cols-12 mb-4 items-center print:border-b">
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
              <Link href={route('dashboard.controle_techniques')}>
              <Button variant='text' className='print:hidden items-center font-bold me-2 float-right border flex'>
                <AiOutlineArrowLeft className='me-1' /> Retour
                </Button>
                </Link>
            </div>
          </div>
          <div className='overflow-auto'>
            
             
                {controles && controles.length>0 && controles.map(({ id, nom_controle, date_controle,description , fichier, kilometrage,organisme_controle , created_at, updated_at , voiture}, index) => {
                  const isLast = index === controles.length - 1;
                  const classes = isLast
                    ? "px-4 py-2 print__:p-0"
                    : "px-4 py-2 print__:p-0 border-b_border-blue-gray-50 ";

                  return (
                    <div key={id} className='border mb-8 p-4 rounded-md'>
                      
                    <table className=" w-full   min-w-max table-auto text-left print:text-xs">
                      <tbody>
                    <tr  className='p-2_border-b '>
                        <th
                            className="w-1/5 border-blue-gray-100 bg-blue-gray-50/50 p-2"
                        >
                         <h1 className="text3xl">{index+1}</h1> 
                            <Typography
                                
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                            >
                                <Translate>Nom</Translate>
                            </Typography>
                        </th>
                        <td>{nom_controle}</td>

                    </tr>
                    <tr className='p-2_border-b'>
                        <th
                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-2"
                        >
                            <Typography
                                
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                            >
                                <Translate>voiture</Translate>

                            </Typography>
                        </th>
                        <td>{voiture && voiture.nom}</td>
                    </tr>
                    <tr className='p-2_border-b'>
                        <th
                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-2"
                        >
                            <Typography
                                
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                            >
                                <Translate>Organise de contôle</Translate>

                            </Typography>
                        </th>
                        <td>{organisme_controle??'-'}</td>
                    </tr>
                    <tr className='p-2_border-b'>
                        <th
                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-2"
                        >
                            <Typography
                                
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                            >
                                <Translate>Date du contrôle</Translate>
                            </Typography>
                        </th>
                        <td>
                            {DateToFront(date_controle,i18n.language,'d/m/Y')}

                        </td>
                    </tr>
                    <tr className='p-2_border-b'>
                        <th
                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-2"
                        >
                            <Typography
                                
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                            >
                                <Translate>Kilométrage</Translate>
                            </Typography>
                        </th>
                        <td>{kilometrage}</td>
                    </tr>
                    <tr className='p-2_border-b'>
                        <th
                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-2"
                        >
                            <Typography
                                
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                            >
                                <Translate>Fichier</Translate>
                            </Typography>
                        </th>
                        <td>
                        {fichier!='' && fichier!=null && <a className=' py-2 text-sm text-blue-600 rounded-md' href={HTTP_FRONTEND_HOME+''+fichier}>{HTTP_FRONTEND_HOME+''+fichier}</a>}
                        </td>
                    </tr>
                    <tr className='border-b__blue-gray-100 bg-blue-gray-50/50 p-2'>
                        <th
                            className="p-2 "
                        >
                            <Typography
                                
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                            >
                                <Translate>Description</Translate>
                            </Typography>
                        </th>
                        <td>
                            <div variant='small' className='text-sm break-words bg-white overflow-auto max-w-xs xl:max-w-lg lg:max-w-md md:max-w-sm py-4'>
                                {description??''}
                            </div>
                        </td>
                    </tr>

                    <tr className='p-2_border-b'>
                        <th
                            className=" border-blue-gray-100__bg-blue-gray-50/50 p-2"
                        >
                            <Typography
                                
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                            >
                                <Translate>Date d'ajout</Translate>
                            </Typography>
                        </th>
                        <td> {DateToFront(created_at, i18n.language)}</td>
                    </tr>
                    {created_at!=updated_at && 
                    <tr className='p-2_border-b'>
                        <th
                            className=" border-blue-gray-100__bg-blue-gray-50/50 p-2"
                        >
                            <Typography
                                
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                            >
                                <Translate>Dernière modification</Translate>
                            </Typography>
                        </th>
                        <td> {DateToFront(updated_at, i18n.language)}</td>
                    </tr>}
            </tbody>
            </table>
                    </div>
                  );
                })}
          </div>
        </CardBody>
      </div>
    </div>
  )
}
