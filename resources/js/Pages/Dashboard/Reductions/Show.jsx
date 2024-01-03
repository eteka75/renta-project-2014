import DashboardLayout from '@/Layouts/DashboardLayout'
import Breadcrumb from '@/components/Breadcrumb'
import DashHeadTitle from '@/components/dashboard/DashHeadTitle'
import { Head, Link } from '@inertiajs/react'
import { Button, Card, CardBody, Typography } from '@material-tailwind/react'
import React, { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Translate from '@/components/Translate'
import { HTTP_FRONTEND_HOME } from '@/tools/constantes'
import { DateToFront } from '@/tools/utils'
import i18n from '@/i18n';
import ModaleImage from '@/components/ModaleImage';
import { IoMdCheckmark } from 'react-icons/io'
import { IoDuplicate } from 'react-icons/io5'

export default function Show({ auth, location_option='', page_id = '', page_subid = '', page_title = '', page_subtitle = '' }) {
    const [value, copy] = useState('');
    const [copied, setCopied] = React.useState(false); 
    const copyText=(t)=>{ 
        navigator.clipboard.writeText(t)
    }
    return (
        <DashboardLayout auth={auth} page_id={page_id} page_subid={page_subid}>
            <Breadcrumb>
                <Link href={route('dashboard.location_reductions')} className="opacity-60">
                    <span>Code de réductions</span>
                </Link>
                <Link href='#'>
                    <span>Affichage</span>
                </Link>
            </Breadcrumb>

            <Head title={page_title} />
            <DashHeadTitle title={page_title} subtitle={page_subtitle} >
                <Link className='px-4 font-bold flex items-center py-2 bg-white shadow-sm  rounded-md'
                    href={route('dashboard.location_reductions')}>
                    <AiOutlineArrowLeft className='me-1' />    <Translate>Retour</Translate>
                </Link>
            </DashHeadTitle>
            <div className="grid grid-cols-3 gap-4 items-start justify-start">
                {location_option && location_option.photo &&
                    <Card className='col-span-3 lg:col-span-1'>
                        <CardBody className="App w-full md:m-auto">
                           <ModaleImage title={location_option.nom} url={HTTP_FRONTEND_HOME + '' + location_option.photo}>
                            {
                                location_option.photo && <img
                                    className="max-w-full  rounded-lg object-cover object-center"
                                    src={HTTP_FRONTEND_HOME + '' + location_option.photo}
                                    alt={location_option.nom}
                                />
                            }
                        </ModaleImage>
                        </CardBody>
                    </Card>
                }
                { location_option!=null && 
                <Card className='col-span-3 lg:col-span-2 items-start justify-start'>
                    <div className="App w-full md:m-auto overflow-auto">
                        <table className='w-full min-w-max table-auto text-left h-full ' align='top'>
                            <tbody>

                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Nom</Translate>
                                        </Typography>
                                    </th>
                                    <td>{location_option.nom}</td>

                                </tr>
                                {location_option.code_reduction!=null && location_option.code_reduction!='' &&
                                <tr className='p-4 border-b'>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Code</Translate>

                                        </Typography>
                                    </th>
                                    <td>
                                    <Button
                                        onMouseLeave={() => setCopied(false)}
                                        onClick={() => {
                                            copyText(location_option.code_reduction);
                                            setCopied(true);
                                        }}
                                        className="flex text-yellow-500 items-center gap-x-3 px-4 py-2.5 lowercase"
                                        >
                                        <Typography
                                            className="border-r py-0 border-gray-400/50 pr-3 uppercase"
                                            variant="lg"
                                        >
                                            {location_option.code_reduction}
                                        </Typography>
                                        {copied ? (
                                            <IoMdCheckmark/> 
                                        ) : (
                                            <IoDuplicate/>
                                        )}
                                        </Button>
                                    </td>
                                </tr>
                                }
                                {location_option.type_reduction!=null && location_option.type_reduction!='' &&
                                <tr className='p-4 border-b'>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Type</Translate>

                                        </Typography>
                                    </th>
                                    <td>
                                        {location_option.type_reduction=='M'?'Montant':(location_option.type_reduction=='P'?'Pourcentage':'-')}
                                    </td>
                                </tr>
                                }
                               
                                 {location_option.montant!=null && location_option.type_reduction!='P' &&
                                <tr className='p-4 border-b'>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Montant</Translate>

                                        </Typography>
                                    </th>
                                    <td>
                                        {location_option.montant??'-'}
                                    </td>
                                </tr>
                                }
                                 {location_option.pourcentage!=null && location_option.pourcentage!==0 &&
                                <tr className='p-4 border-b'>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Pourcentage</Translate>

                                        </Typography>
                                    </th>
                                    <td>
                                        {location_option.pourcentage+'%'??'-'}
                                    </td>
                                </tr>
                                }
                                 {location_option.montant_min_reduction!=null && location_option.montant_min_reduction!='' &&
                                <tr className='p-4 border-b'>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Montant minumum</Translate>

                                        </Typography>
                                    </th>
                                    <td>
                                        {location_option.montant_min_reduction??'-'}
                                    </td>
                                </tr>
                                }
                                 {location_option.montant_max_reduction!=null && location_option.montant_max_reduction!='' &&
                                <tr className='p-4 border-b'>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Montant maximum</Translate>

                                        </Typography>
                                    </th>
                                    <td>
                                        {location_option.montant_max_reduction??'-'}
                                    </td>
                                </tr>
                                }
                                 {location_option.date_debut_reduction!=null && location_option.date_debut_reduction!='' &&
                                <tr className='p-4 border-b'>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Date début</Translate>

                                        </Typography>
                                    </th>
                                    <td>
                                        {DateToFront(location_option.date_debut_reduction,i18n.language,'d/m/Y')??'-'}
                                    </td>
                                </tr>
                                }
                                 {location_option.date_fin_reduction!=null && location_option.date_fin_reduction!='' &&
                                <tr className='p-4 border-b'>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Date fin</Translate>

                                        </Typography>
                                    </th>
                                    <td>
                                        {DateToFront(location_option.date_fin_reduction,i18n.language,'d/m/Y')??'-'}
                                    </td>
                                </tr>
                                }
                                 {location_option.tarif_option_hebdomadaire!=null && location_option.tarif_option_hebdomadaire!='' &&
                                <tr className='p-4 border-b'>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Tarif par semaine</Translate>

                                        </Typography>
                                    </th>
                                    <td>{location_option.tarif_option_hebdomadaire}</td>
                                </tr>
                                }
                                 {location_option.tarif_option_mensuel!=null && location_option.tarif_option_mensuel!='' &&
                                <tr className='p-4 border-b'>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Tarif par mois</Translate>

                                        </Typography>
                                    </th>
                                    <td>{location_option.tarif_option_mensuel}</td>
                                </tr>
                                }

                                <tr className='p-4 border-b'>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Date d'ajout</Translate>
                                        </Typography>
                                    </th>
                                    <td> {DateToFront(location_option.created_at, i18n.language)}</td>
                                </tr>
                                {location_option.created_at!=location_option.updated_at &&
                                <tr className='p-4 border-b'>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Dernière modification</Translate>
                                        </Typography>
                                    </th>
                                    <td> {DateToFront(location_option.updated_at, i18n.language)}</td>
                                </tr>
                                }
                                <tr className='p-4 '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Description</Translate>
                                        </Typography>
                                    </th>
                                    <td>
                                        <Typography variant='small' className='break-words bg-white overflow-auto max-w-xs xl:max-w-lg lg:max-w-md md:max-w-sm py-4'>
                                            {location_option.description}
                                        </Typography>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>}
            </div>
        </DashboardLayout>
    )
}
