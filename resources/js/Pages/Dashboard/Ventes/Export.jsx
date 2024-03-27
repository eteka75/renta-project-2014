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
import { LazyLoadImage } from 'react-lazy-load-image-component';
//const head = ["fichier", "Nom", "Année", "Site Web", "Pays"];;
export default function Export({ ventes, page_title, page_subtitle }) {
  const Print = () => {
    window.print();
  }
  return (
    <div className=' h-full_absolute text-black hover:bg-white bg-white w-full overflow-auto'>
      <div className=' mx-auto py-10 print__:p-0'>
        <Head title={page_title}/>
        <CardBody>
          <div className="grid grid-cols-12 mb-8 items-center border-b">
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
              <Link href={route('dashboard.ventes')}>
              <Button variant='text' className='print:hidden items-center font-bold me-2 float-right border flex'>
                <AiOutlineArrowLeft className='me-1' /> Retour
                </Button>
                </Link>
            </div>
          </div>
          <div className='overflow-auto'>
            
                {ventes && ventes.length>0 && ventes.map(({ id, date_fin_vente,lien_video,point_retrait, duree_garantie, date_debut_vente,prix_defaut, prix_vente,description , fichier, kilometrage,responsable_operation , created_at, updated_at , voiture}, index) => {
                  const isLast = index === ventes.length - 1;
                  const classes = isLast
                    ? "px-4 py-2 print__:p-0"
                    : "px-4 py-2 print__:p-0 border-b_border-blue-gray-50 ";

                  return (
                    <div key={id} className='border mb-8 p-4 rounded-md'>
                      
                    <table className=" w-full    table-auto text-left print:text-xs">
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
                        <td>
                            <div className="flex gap-2 text-sm w-max rounded-md p-2 border">
                        {voiture?.photo && <LazyLoadImage src={HTTP_FRONTEND_HOME + '' + voiture?.photo} alt={voiture?.nom} className='max-h-20 rounded-sm bg-white'  />}

                           <div>
                            <div className='font-bold'> {voiture && voiture.nom}</div>
                            <div> {voiture?.marque && voiture?.marque?.nom}</div>
                            <div> {kilometrage} Km</div>
                            
                            <div> Année {voiture && voiture.annee_fabrication}</div>
                           </div>
                           </div>
                            
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
                                <Translate>Prix</Translate>

                            </Typography>
                        </th>
                        <td>{formaterMontant(prix_vente??'0')}</td>
                    </tr>
                    <tr className='p-2_border-b'>
                        <th
                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-2"
                        >
                            <Typography
                                
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                            >
                                <Translate>Point de retrait</Translate>

                            </Typography>
                        </th>
                        <td>{point_retrait && point_retrait?.lieu}</td>
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
                        <td>{kilometrage??'0'} Km</td>
                    </tr>
                    {parseInt(prix_defaut)>0 &&
                    <tr className='p-2_border-b'>
                        <th
                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-2"
                        >
                            <Typography
                                
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                            >
                                <Translate>Prix par défaut</Translate>

                            </Typography>
                        </th>
                        <td>{formaterMontant(prix_defaut??'0')}</td>
                    </tr>}
                    <tr className='p-2_border-b'>
                        <th
                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-2"
                        >
                            <Typography
                                
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                            >
                                <Translate>Date début de la vente</Translate>
                            </Typography>
                        </th>
                        <td>
                            {DateToFront(date_debut_vente,i18n.language,'d/m/Y H:I:S',true)}

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
                                <Translate>Date fin de la vente</Translate>
                            </Typography>
                        </th>
                        <td>
                            {DateToFront(date_fin_vente,i18n.language,'d/m/Y H:I:S',true)}

                        </td>
                    </tr>
                    {duree_garantie!=null &&
                    <tr className='p-2_border-b'>
                        <th
                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-2"
                        >
                            <Typography
                                
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                            >
                                <Translate>Durée de la garantie</Translate>
                            </Typography>
                        </th>
                        <td>{duree_garantie}</td>
                    </tr>}
                    {lien_video!=null &&
                    <tr className='p-2_border-b'>
                        <th
                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-2"
                        >
                            <Typography
                                
                                color="blue-gray"
                                className="font-bold leading-none opacity-70"
                            >
                                <Translate>Lien vidéo</Translate>
                            </Typography>
                        </th>
                        <td>{lien_video}</td>
                    </tr>}
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
