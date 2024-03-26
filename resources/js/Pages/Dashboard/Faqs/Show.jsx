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

export default function Show({ auth, faq, page_id = '', page_subid = '', page_title = '', page_subtitle = '' }) {
    return (
        <DashboardLayout auth={auth} page_id={page_id} page_subid={page_subid}>
            <Breadcrumb>
                <Link href={route('dashboard.faqs')} className="opacity-60">
                    <span>Forum aux questions</span>
                </Link>
                <Link href='#'>
                    <span>Affichage</span>
                </Link>
            </Breadcrumb>

            <Head title={page_title} />
            <DashHeadTitle title={page_title} subtitle={page_subtitle} >
                <Link className='px-4 font-bold flex items-center py-2 bg-white shadow-sm  rounded-md'
                    href={route('dashboard.faqs')}>
                    <AiOutlineArrowLeft className='me-1' />    <Translate>Retour</Translate>
                </Link>
            </DashHeadTitle>
            <div className="grid grid-cols-3 gap-4">
                {faq.photo &&
                    <Card className='col-span-3 lg:col-span-1'>
                        <CardBody className="App w-full md:m-auto">
                        <ModaleImage title={faq.nom} url={HTTP_FRONTEND_HOME + '' + faq.photo}>

                            {
                                faq.photo && <img
                                    className="max-w-full rounded-lg object-cover object-center"
                                    src={HTTP_FRONTEND_HOME + '' + faq.photo}
                                    alt={faq.nom}
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
                                            <Translate>Question</Translate>
                                        </Typography>
                                    </th>
                                    <td>{faq.question}</td>

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
                                            <Translate>Slug</Translate>
                                        </Typography>
                                    </th>
                                    <td>
                                        <div className="max-w-lg break-words">
                                        {faq.slug}
                                        </div>
                                    </td>

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
                                    <td> {DateToFront(faq.created_at, i18n.language)}</td>
                                </tr>
                                {faq.created_at!=faq.updated_at &&
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
                                    <td> {DateToFront(faq.updated_at, i18n.language)}</td>
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
                                            <Translate>Réponse</Translate>
                                        </Typography>
                                    </th>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <div className="max-w-3xl mx-auto p-4 pt-0 break-words">
                                        <div dangerouslySetInnerHTML={{__html:faq.reponse}}></div>

                                        </div>
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
