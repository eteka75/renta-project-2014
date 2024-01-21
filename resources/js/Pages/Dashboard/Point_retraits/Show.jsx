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
import i18n from '@/i18n';

export default function Show({ auth, point_retrait, page_id = '', page_subid = '', page_title = '', page_subtitle = '' }) {
    return (
        <DashboardLayout auth={auth} page_id={page_id} page_subid={page_subid}>
            <Breadcrumb>
                <Link href={route('dashboard.point_retraits')} className="opacity-60">
                    <span>Points de retrait</span>
                </Link>
                <Link href='#'>
                    <span>Affichage</span>
                </Link>
            </Breadcrumb>

            <Head title={page_title} />
            <DashHeadTitle title={page_title} subtitle={page_subtitle} >
                <Link className='px-4 font-bold flex items-center py-2 bg-white shadow-sm  rounded-md'
                    href={route('dashboard.point_retraits')}>
                    <AiOutlineArrowLeft className='me-1' />    <Translate>Retour</Translate>
                </Link>
            </DashHeadTitle>
            <div className="grid grid-cols-3 gap-4">
                {point_retrait && point_retrait.photo &&
                    <Card className='col-span-3 lg:col-span-1'>
                        <CardBody className="App w-full md:m-auto">
                            {
                                point_retrait.photo && <img
                                    className="max-h-44 mx-auto w-auto  rounded-lg object-cover object-center"
                                    src={HTTP_FRONTEND_HOME + '' + point_retrait.photo}
                                    alt={point_retrait.nom}
                                />
                            }
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
                                            <Translate>Lieu</Translate>
                                        </Typography>
                                    </th>
                                    <td>{point_retrait.lieu}</td>

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
                                    <td>{point_retrait.ville}</td>

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
                                            <Translate>Quartier</Translate>
                                        </Typography>
                                    </th>
                                    <td>{point_retrait.quartier}</td>

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
                                            <Translate>Adresse</Translate>
                                        </Typography>
                                    </th>
                                    <td>{point_retrait.adresse}</td>

                                </tr>
                                <tr className='p-4 border-b '>
                                    <th colSpan={2}
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Lien de la locatisation (sur Google Maps local)</Translate>
                                        </Typography>
                                    
                          <div className='html max-w-full py-4 mb-2 overflow-auto' dangerouslySetInnerHTML={{__html:point_retrait?.map_local}}></div>

                                    </th>

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
                                            <Translate>Contacts</Translate>
                                        </Typography>
                                    </th>
                                    <td>{point_retrait.contacts}</td>

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
                                    <td> {DateToFront(point_retrait.updated_at, i18n.language)}</td>
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
                                            {point_retrait.description}
                                        </Typography>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    )
}
