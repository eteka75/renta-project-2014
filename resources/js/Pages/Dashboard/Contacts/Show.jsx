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

export default function Show({ auth, contact, page_id = '', page_subid = '', page_title = '', page_subtitle = '' }) {
    return (
        <DashboardLayout auth={auth} page_id={page_id} page_subid={page_subid}>
            <Breadcrumb>
                <Link href={route('dashboard.contacts')} className="opacity-60">
                    <span>Message contact</span>
                </Link>
                <Link href='#'>
                    <span>Affichage</span>
                </Link>
            </Breadcrumb>

            <Head title={page_title} />
            <DashHeadTitle title={page_title} subtitle={page_subtitle} >
                <Link className='px-4 font-bold flex items-center py-2 bg-white shadow-sm  rounded-md'
                    href={route('dashboard.contacts')}>
                    <AiOutlineArrowLeft className='me-1' />    <Translate>Retour</Translate>
                </Link>
            </DashHeadTitle>
            <div className="grid grid-cols-3 gap-4">
                
                
                <Card className='col-span-3 lg:col-span-3'>
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
                                            <Translate>Nom et prénom(s)</Translate>
                                        </Typography>
                                    </th>
                                    <td>{contact?.nom_prenom}</td>
                                </tr>
                                {contact?.email!=null &&
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Email</Translate>
                                        </Typography>
                                    </th>
                                    <td>
                                        <div className="max-w-lg break-words">
                                            {contact?.email}
                                        </div>
                                    </td>
                                </tr>
                                }
                                {contact?.telephone!=null &&
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Téléphone</Translate>
                                        </Typography>
                                    </th>
                                    <td>
                                        <div className="max-w-lg break-words">
                                        {contact.telephone}
                                        </div>
                                    </td>

                                </tr>
                                    }
                                     {contact?.objet!=null &&
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Objet du message</Translate>
                                        </Typography>
                                    </th>
                                    <td>
                                        <div className="max-w-lg break-words">
                                        {contact.objet}
                                        </div>
                                    </td>

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
                                    <td> {DateToFront(contact?.created_at, i18n.language)}</td>
                                </tr>
                                {contact?.created_at!=contact?.updated_at &&
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
                                    <td> {DateToFront(contact.updated_at, i18n.language)}</td>
                                </tr>
                            }
                                {contact?.message &&
                                <>
                                 
                                <tr>
                                 <td colSpan='2'>
                                 <Typography
                                         variant="lead"
                                         color="blue-gray"
                                         className="font-bold px-4 py-3 leading-none opacity-70"
                                     >
                                         <Translate>Contenu du message</Translate>
                                     </Typography>
                                     <div className="max-w-2xl px-4 pb-4 break-words">
                                     {contact.message}
                                     </div>
                                 </td>

                             </tr>
                             </>
                                }
                              
                               
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    )
}
