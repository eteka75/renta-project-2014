import InputLabel from '@/components/InputLabel';
import Translate from '@/components/Translate';
import i18n from '@/i18n';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { DateToFront, formaterMontant } from '@/tools/utils';
import { Head } from '@inertiajs/react';

import { Link } from '@inertiajs/react';
import { CardBody, Typography, Button } from '@material-tailwind/react'
import React from 'react'
import { AiOutlineArrowLeft, AiOutlinePrinter } from 'react-icons/ai';
//const head = ["fichier", "Nom", "Année", "Site Web", "Pays"];;
export default function Export({ locations, page_title, page_subtitle }) {
  const Print = () => {
    window.print();
  }
  return (
    <div className=' h-full_absolute text-black hover:bg-white bg-white w-full overflow-auto'>
      <div className=' mx-auto py-10 print__:p-0'>
        <Head title={page_title}/>
        <CardBody>
          <div className="grid grid-cols-12 mb-4 items-center print:border-b">
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
              <Link href={route('dashboard.locations')}>
              <Button variant='text' className='print:hidden items-center font-bold me-2 float-right border flex'>
                <AiOutlineArrowLeft className='me-1' /> Retour
                </Button>
                </Link>
            </div>
          </div>
          <div className='overflow-auto'>
            {locations && locations.length>0 && locations.map(({ id, nom_operation,conditions,tarif_location_heure, tarif_location_journalier,tarif_location_hebdomadaire,tarif_location_mensuel,date_debut_location,date_fin_location, date_operation, prix_operation,description , fichier, kilometrage,responsable_operation , created_at, updated_at , voiture}, index) => {
                  const isLast = index === locations.length - 1;
                  const classes = isLast
                    ? "px-4 py-2 print__:p-0"
                    : "px-4 py-2 print__:p-0 border-b_border-blue-gray-50 ";

                  return (
                    <div key={id} className='border mb-4 p-4 rounded-md'>
                      
                    <table className=" w-full   min-w-max table-auto text-left print:text-xs">
                      <tbody>
                      
                    <tr className='p-2_border-b'>
                        <th
                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-2"
                        >
                            <Typography
                                
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                            >
                                <Translate>Voiture</Translate>

                            </Typography>
                        </th>
                        <td>{voiture && voiture.nom}</td>
                    </tr>
                    {tarif_location_heure!=null && tarif_location_heure>0  &&
                    <tr className='p-2_border-b'>
                        <th
                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-2"
                        >
                            <Typography
                                
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                            >
                                <Translate>Tarif par heure</Translate>

                            </Typography>
                        </th>
                        <td>{formaterMontant(tarif_location_heure??0)??'-'}</td>
                    </tr>}
                    {tarif_location_journalier!=null && tarif_location_journalier>0 &&
                    <tr className='p-2_border-b'>
                        <th
                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-2"
                        >
                            <Typography
                                
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                            >
                                <Translate>Tarif journalier</Translate>

                            </Typography>
                        </th>
                        <td>{formaterMontant(tarif_location_journalier??0)??'-'}</td>
                    </tr>
                    }
                    {tarif_location_hebdomadaire!=null && tarif_location_hebdomadaire>0 &&
                    <tr className='p-2_border-b'>
                        <th
                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-2"
                        >
                            <Typography
                                
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                            >
                                <Translate>Tarif par semaine</Translate>

                            </Typography>
                        </th>
                        <td>{formaterMontant(tarif_location_hebdomadaire??0)??'-'}</td>
                    </tr>
                    }
                    {tarif_location_mensuel!=null && tarif_location_mensuel>0 &&
                    <tr className='p-2_border-b'>
                        <th
                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-2"
                        >
                            <Typography
                                
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                            >
                                <Translate>Tarif par mois</Translate>
                            </Typography>
                        </th>
                        <td>
                            {formaterMontant(tarif_location_mensuel??0)}

                        </td>
                    </tr>}
                    <tr className='p-2_border-b'>
                        <th
                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-2"
                        >
                            <Typography
                                
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                            >
                                <Translate>Date de début </Translate>
                            </Typography>
                        </th>
                        <td>
                           {DateToFront(date_debut_location,i18n.language,'d/m/Y')}                            
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
                                <Translate>Date de fin</Translate>
                            </Typography>
                        </th>
                        <td>
                        {DateToFront(date_fin_location,i18n.language,'d/m/Y')}
                        </td>
                    </tr>
                    {conditions!=null &&
                    <tr className='border-b__blue-gray-100 bg-blue-gray-50/50 p-2'>
                        <th
                            className="p-2 "
                        >
                            <Typography
                                
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                            >
                                <Translate>Conditions</Translate>
                            </Typography>
                        </th>
                        <td>
                           <div className='text-sm max-w-[600px] py-2 print:max-w-[400px]' dangerouslySetInnerHTML={{ __html: conditions }}></div>
                        </td>
                    </tr>}
                    {description!=null &&
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
                           <div className='text-xs max-w-[600px] print:max-w-[400px]' dangerouslySetInnerHTML={{ __html: description }}></div>
                        </td>
                    </tr>}

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
