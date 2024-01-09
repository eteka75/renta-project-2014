import DashboardLayout from '@/Layouts/DashboardLayout'
import Breadcrumb from '@/components/Breadcrumb'
import DashHeadTitle from '@/components/dashboard/DashHeadTitle'
import { Head, Link } from '@inertiajs/react'
import { Card, CardBody, Typography } from '@material-tailwind/react'
import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Translate from '@/components/Translate'
import { HTTP_FRONTEND_HOME } from '@/tools/constantes'
import { DateToFront, formaterMontant } from '@/tools/utils'
import i18n from '@/i18n'
import ModaleImage from '@/components/ModaleImage'

export default function Show({ auth, localisation, page_id = '', page_subid = '', page_title = '', page_subtitle = '' }) {
    return (
        <DashboardLayout auth={auth} page_id={page_id} page_subid={page_subid}>
            <Breadcrumb>
                <Link href={route('dashboard.localisations')} className="opacity-60">
                    <span>Options de vente</span>
                </Link>
                <Link href='#'>
                    <span>Affichage</span>
                </Link>
            </Breadcrumb>

            <Head title={page_title} />
            <DashHeadTitle title={page_title} subtitle={page_subtitle} >
                <Link className='px-4 font-bold flex items-center py-2 bg-white shadow-sm  rounded-md'
                    href={route('dashboard.localisations')}>
                    <AiOutlineArrowLeft className='me-1' />    <Translate>Retour</Translate>
                </Link>
            </DashHeadTitle>
            <div className="grid items-start grid-cols-3 gap-4">
                {localisation.photo &&
                    <Card className='col-span-3 lg:col-span-1'>
                        <CardBody className="App w-full md:m-auto">
                        <ModaleImage title={localisation.nom} url={HTTP_FRONTEND_HOME + '' + localisation.photo}>

                            {
                                localisation.photo && <img
                                    className="max-w-full mx-auto h-auto  rounded-lg object-cover object-center"
                                    src={HTTP_FRONTEND_HOME + '' + localisation.photo}
                                    alt={localisation.nom}
                                />
                            }
                            </ModaleImage>
                        </CardBody>
                    </Card>
                }
                <Card className='col-span-3 lg:col-span-2'>
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
                                    <td>{localisation.nom}</td>

                                </tr>
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Ville</Translate>
                                        </Typography>
                                    </th>
                                    <td>{localisation.ville}</td>

                                </tr>
                                {localisation?.commune!=null &&
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Commune</Translate>
                                        </Typography>
                                    </th>
                                    <td>{localisation?.commune}</td>
                                </tr>
                                }
                                {localisation?.departement!=null &&
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Département</Translate>
                                        </Typography>
                                    </th>
                                    <td>{localisation?.departement}</td>
                                </tr>
                                }
                                {localisation?.adresse!=null &&
                                <tr className='p-4 border-b '>
                                    <th
                                     colSpan={2}   className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Adresse</Translate>
                                        </Typography>
                                        <br/>
                                        <div className='py-2 px-4' dangerouslySetInnerHTML={{__html:localisation?.adresse}}>
                                    </div>
                                    </th>
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
                                    <td> {DateToFront(localisation.created_at, i18n.language)}</td>
                                </tr>
                                {localisation.updated_at!=localisation.created_at &&
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
                                    <td> {DateToFront(localisation.updated_at, i18n.language)}</td>
                                </tr>
                                }
                                <tr className='p-4 '>
                                    <th colSpan={2}
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Description</Translate>
                                        </Typography>
                                    <br/>
                                    <div className='pb-4 font-normal text-sm max-w-xl' dangerouslySetInnerHTML={{__html:localisation?.description}}>
</div>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    )
}
