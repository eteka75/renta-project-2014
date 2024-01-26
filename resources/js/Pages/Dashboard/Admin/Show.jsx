import DashboardLayout from '@/Layouts/DashboardLayout'
import Breadcrumb from '@/components/Breadcrumb'
import DashHeadTitle from '@/components/dashboard/DashHeadTitle'
import { Head, Link } from '@inertiajs/react'
import { Button, Card, CardBody, Typography } from '@material-tailwind/react'
import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Translate from '@/components/Translate'
import { HTTP_FRONTEND_HOME } from '@/tools/constantes'
import { DateToFront } from '@/tools/utils'
import i18n from '@/i18n'
import ModaleImage from '@/components/ModaleImage'
import { LuBadgeCheck, LuFolderInput } from 'react-icons/lu'
import { CiEdit } from 'react-icons/ci'
import { PiFolderStarLight } from 'react-icons/pi'
import { MdOutlineCheckCircle } from 'react-icons/md'

export default function Show({ auth, user,client=null, page_id = '', page_subid = '', page_title = '', page_subtitle = '' }) {
    return (
        <DashboardLayout auth={auth} page_id={page_id} page_subid={page_subid}>
            <Breadcrumb>
                <Link href={route('dashboard.clients')} className="opacity-60">
                    <span>Clients</span>
                </Link>
                <Link href='#'>
                    <span>Affichage</span>
                </Link>
            </Breadcrumb>

            <Head title={page_title} />
            <DashHeadTitle title={page_title} subtitle={page_subtitle} >
                <Link className='px-4 font-bold flex items-center py-2 bg-white shadow-sm  rounded-md'
                    href={route('dashboard.clients')}>
                    <AiOutlineArrowLeft className='me-1' />    <Translate>Retour</Translate>
                </Link>
            </DashHeadTitle>
            <div className="grid grid-cols-3 items-start gap-4">
                {user?.photo &&
                    <Card className='col-span-3 lg:col-span-1'>
                        <CardBody className="App w-full md:m-auto">
                        <ModaleImage title={user?.nom} url={HTTP_FRONTEND_HOME + '' + user?.photo}>

                            {
                                user?.photo && <img
                                    className="max-h-44 mx-auto w-auto  rounded-lg object-cover object-center"
                                    src={HTTP_FRONTEND_HOME + '' + user?.photo}
                                    alt={user?.nom}
                                />
                            }
                            </ModaleImage>
                        </CardBody>
                    </Card>
                }
                <div className='col-span-3 lg:col-span-2'>
                <Card className=''>
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
                                    <td>{user?.nom}</td>
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
                                            <Translate>Prénom</Translate>
                                        </Typography>
                                    </th>
                                    <td>{user?.prenom}</td>

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
                                            <Translate>Email</Translate>
                                        </Typography>
                                    </th>
                                    <td>{user?.email}</td>

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
                                            <Translate>Téléphone</Translate>
                                        </Typography>
                                    </th>
                                    <td>{user?.telephone}</td>

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
                                            <Translate>Date d'inscription</Translate>
                                        </Typography>
                                    </th>
                                    <td>{DateToFront(user?.created_at,i18n.language)}</td>

                                </tr>

                            </tbody>
                        </table>
                    </div>
                </Card>
                {client===null?
                    <div className="p-4 sm:p-8flex my-6 justify-center min-h-[460px] bg-white dark:bg-gray-800 shadow-md sm:rounded-lg">

                            <div className="py-20 text-center">
                                <PiFolderStarLight className='h-32 mx-auto w-32 text-slate-200'/> 
                               <div className="font-semibold"> Aucun dossier soumis</div>
                               <div className="text-xs text-slate-600"> Les informations du dossier client apparaissent ici.</div>
                               
                            </div>
                    </div>
                    :
                    <div className="my-6 max-w-screen-lg bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        
                        <div className="bg-white overflow-hidden   rounded-lg ">
                            <div className="px-4 py-5 sm:px-6 flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Dossier</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        
                                    </p>
                                </div>
                               
                                {/*<button className='text-emerald-600 flex items-center bg-emerald-50 px-3 rounded-full py-1 gap-1 text-sm'><MdOutlineCheckCircle className='w-4 h-4'/> Validé </button>
                                */}
                                <div className='flex gap-2'>
                                
                                <Button size='sm' variant='text' className='py-2 bg-blue-500 text-white shadow-sm flex gap-1 ' >
                                    <LuBadgeCheck className='h-4 w-4'  />  Valider
                                </Button>
                                <Link className='' href={route('profile.identification.edit')}>
                                <Button size='sm' variant='text' className='py-2 flex gap-1 border' >
                                    <CiEdit />  Modifier
                                </Button></Link>
                                </div>

                            </div>
                            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                                <dl className="sm:divide-y sm:divide-gray-200">
                                    {client?.sexe != null && <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Sexe
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {client?.sexe == 'M' && 'Masculin'}
                                            {client?.sexe == 'F' && 'Féminin'}
                                        </dd>
                                    </div>}
                                    {client?.nom != null && <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Nom
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {client?.nom}
                                        </dd>
                                    </div>}
                                    {client?.prenom != null && <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Prénom(s)
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {client?.prenom}
                                        </dd>
                                    </div>}
                                    {client?.ville_residence != null && <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Ville de résidence
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {client?.ville_residence}
                                        </dd>
                                    </div>}
                                    {(client?.numero_permis != null || client?.date_expiration_permis != null) && <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Permis de conduire
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {client?.numero_permis}
                                            {client?.date_expiration_permis != null && <>&nbsp;&nbsp;  / &nbsp;&nbsp; Expire le
                                               &nbsp; {DateToFront(client?.date_expiration_permis,i18n.language,'d/m/Y')}</>
                                            }
                                        </dd>
                                    </div>}
                                    {(client?.nb_annee_conduite != null) && <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Nombre d'année de conduite
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {client?.nb_annee_conduite}
                                            {client?.nb_annee_conduite != null && <>&nbsp;an{parseInt(client?.nb_annee_conduite) > 1 ? 's' : ''}</>
                                            }
                                        </dd>
                                    </div>}
                                    {(client?.fichier_permis != null && client?.fichier_permis != '') && <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Fichier du permis
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <a target='_blanck' className='text-blue-500' href={HTTP_FRONTEND_HOME + '' + client?.fichier_permis}>Télécharger le fichier</a>
                                        </dd>
                                    </div>}
                                    {(client?.date_naissance != null || client?.lieu_naissance != null) && <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Date et lieu de naissance
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {DateToFront(client?.date_naissance, i18n.language, 'd/m/Y')}
                                            {client?.lieu_naissance != null && <>&nbsp;&nbsp;  à &nbsp;&nbsp;
                                                {client?.lieu_naissance}</>
                                            }
                                        </dd>
                                    </div>}
                                    {(client?.fichier_identite != null) && <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Fichier d'identité
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <a target='_blanck' className='text-blue-500' href={HTTP_FRONTEND_HOME + '' + client?.fichier_identite}>Télécharger le fichier</a>
                                        </dd>
                                    </div>}
                                    {(client?.type_piece_identite != null || client?.numero_piece_identite != null) && <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Pièce d'identité
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {client?.type_piece_identite} &nbsp;&nbsp; / &nbsp;&nbsp;
                                            {client?.numero_piece_identite}
                                        </dd>
                                    </div>}
                                    {client?.adresse != null && <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Adresse de résidence
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {client?.adresse}
                                        </dd>
                                    </div>}
                                    {(client?.fichier_residence != null) && <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Fichier de résidence
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <a target='_blanck' className='text-blue-500' href={HTTP_FRONTEND_HOME + '' + client?.fichier_residence}>Télécharger le fichier</a>
                                        </dd>
                                    </div>}

                                </dl>
                            </div>
                        </div>
                    </div>}
                    </div>
            </div>
        </DashboardLayout>
    )
}
