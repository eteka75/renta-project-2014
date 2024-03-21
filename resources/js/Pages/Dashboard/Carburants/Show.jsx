import DashboardLayout from '@/Layouts/DashboardLayout'
import Breadcrumb from '@/components/Breadcrumb'
import DashHeadTitle from '@/components/dashboard/DashHeadTitle'
import { Head, Link } from '@inertiajs/react'
import { Card, CardBody, Typography } from '@material-tailwind/react'
import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Translate from '@/components/Translate'
import { HTTP_FRONTEND_HOME } from '@/tools/constantes'
import { DateToFront } from '@/tools/utils'
import i18n from '@/i18n'
import ModaleImage from '@/components/ModaleImage'

export default function Show({ auth, carburant='', page_id = '', page_subid = '', page_title = '', page_subtitle = '' }) {
    return (
        <DashboardLayout auth={auth} page_id={page_id} page_subid={page_subid}>
            <Breadcrumb>
                <Link href={route('dashboard.carburants')} className="opacity-60">
                    <span>Types de carburant</span>
                </Link>
                <Link href='#'>
                    <span>Affichage</span>
                </Link>
            </Breadcrumb>

            <Head title={page_title} />
            <DashHeadTitle title={page_title} subtitle={page_subtitle} >
                <Link className='px-4 font-bold flex items-center py-2 bg-white shadow-sm  rounded-md'
                    href={route('dashboard.carburants')}>
                    <AiOutlineArrowLeft className='me-1' />    <Translate>Retour</Translate>
                </Link>
            </DashHeadTitle>
            <div className="grid grid-cols-3 gap-4">
                {carburant && carburant.photo &&
                    <Card className='col-span-3 lg:col-span-1'>
                        <CardBody className="App w-full md:m-auto">
                        <ModaleImage title={carburant.nom} url={HTTP_FRONTEND_HOME + '' + carburant.photo}>
                            {
                                carburant.photo && <img
                                    className="max-h-44 mx-auto w-auto  rounded-lg object-cover object-center"
                                    src={HTTP_FRONTEND_HOME + '' + carburant.photo}
                                    alt={carburant.nom}
                                />
                            }
                            </ModaleImage>
                        </CardBody>
                    </Card>
                }
                { carburant!=null && 
                <Card className='col-span-3 lg:col-span-2 '>
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
                                    <td>{carburant.nom}</td>

                                </tr>

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
                                    <td> {DateToFront(carburant.created_at, i18n.language)}</td>
                                </tr>
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
                                    <td> {DateToFront(carburant.updated_at, i18n.language)}</td>
                                </tr>
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
                                            {carburant.description}
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
