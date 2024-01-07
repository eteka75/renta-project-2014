import DashboardLayout from '@/Layouts/DashboardLayout'
import Breadcrumb from '@/components/Breadcrumb'
import DashHeadTitle from '@/components/dashboard/DashHeadTitle'
import { Head, Link } from '@inertiajs/react'
import { Card, CardBody, Typography } from '@material-tailwind/react'
import React, { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineEdit } from 'react-icons/ai';
import Translate from '@/components/Translate'
import { HTTP_FRONTEND_HOME } from '@/tools/constantes'
import { DateToFront, formaterMontant } from '@/tools/utils'
import i18n from '@/i18n'
import ModaleImage from '@/components/ModaleImage'
import { Inertia } from '@inertiajs/inertia'
import DeleteDialog from '@/components/dashboard/DeleteDialog'
import { useTranslation } from 'react-i18next'
import { IoInformationCircle } from 'react-icons/io5'

export default function Show({ auth, vente, voiture, page_id = '', page_subid = '', page_title = '', page_subtitle = '' }) {
    const [showSupDialog, setSupDialog] = useState(false);
    const {t}=useTranslation();
    const [deleteId, setDeleteId] = useState('');
    const [deleteIdImg, setDeleteIdImg] = useState('');
    
    const handleDeleteImage = (id,imgId) => {
        setDeleteId(id);
        setDeleteIdImg(imgId)
        setSupDialog(true);
    }
    const CloseDialog = () => {
        setSupDialog(false);
        setDeleteIdImg("")
        setDeleteId('');
    }
    const SubmitDeletion = () => {
        if (deleteId != '' && setDeleteIdImg!='') {
            Inertia.delete(route('dashboard.voitures.image.delete', {'img':deleteIdImg,'id':deleteId}));
            setDeleteId('');
            setDeleteIdImg("");

            setSupDialog(false);
        }else{
            setDeleteIdImg("")
        setDeleteId(''); 
        }
    }
    return (
        <DashboardLayout auth={auth} page_id={page_id} page_subid={page_subid}>
            <Breadcrumb>
                <Link href={route('dashboard.ventes')} className="opacity-60">
                    <span>Voitures en vente</span>
                </Link>
                <Link href='#'>
                    <span>Affichage</span>
                </Link>
            </Breadcrumb>

            <Head title={page_title} />
            <DeleteDialog showFunction={showSupDialog} message={t('Voulez-vous supprimer cette photo ?')} closeFunction={CloseDialog} submitFunction={SubmitDeletion} />

            <DashHeadTitle title={page_title} subtitle={page_subtitle} >
                <Link className='px-4 font-bold flex items-center py-2 bg-white shadow-sm  rounded-md'
                    href={route('dashboard.ventes')}>
                    <AiOutlineArrowLeft className='me-1' />    <Translate>Retour</Translate>
                </Link>
                <Link className='px-4 font-bold flex ms-2 items-center py-2 bg-gray-600 text-white shadow-sm  rounded-md'
                    href={route('dashboard.ventes.edit',vente?.id)}>
                    <AiOutlineEdit className='me-1' />    <Translate>Modifier</Translate>
                </Link>
            </DashHeadTitle>
            <div className="grid grid-cols-3 gap-4 items-start  justify-between ">
                <div className='space-y-4'>
                    {vente.voiture &&
                        <Card className='col-span-3   lg:col-span-1'>
                            <CardBody className="w-full md:m-auto">
                            <Typography variant='h5' className='mb-3 flex justify-between'> {vente?.voiture?.nom ?? ''} <Link className='text-sm mx-2 text-slate-600 flex' href={route('dashboard.voitures.show', { 'id': voiture?.id ?? '0' })}><IoInformationCircle className='h-4' /> Détail sur la voiture</Link></Typography>
                 {vente.voiture && vente.voiture.photo != '' && vente.voiture.photo != null &&
                                    <div className='group relative'>
                                        <ModaleImage title={vente.voiture.nom} url={HTTP_FRONTEND_HOME + '' + vente.voiture.photo}>

                                            {
                                                <div className=''>

                                                    <img
                                                        className="max-h-auto mx-auto max-w-full  rounded-lg object-cover object-center"
                                                        src={HTTP_FRONTEND_HOME + '' + vente.voiture.photo}
                                                        alt={vente.voiture.nom}
                                                    />

                                                </div>
                                            }

                                        </ModaleImage>
                                        <div className="hidden group-hover:block rounded-md absolute h-32  top-0 bg-gradient-to-b from-gray-800 z-10 bottom-2 w-full">
                                            <button onClick={() => handleDeleteImage(vente.voiture_id,-1)} className='items-center hover:uderline hover:text-red-500 bg-none mt-2 text-white text-sm   w-full'>
                                                <span>Supprimer</span>
                                            </button>
                                        </div>
                                    </div>
                                }
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 py-2">
                                    {voiture.medias.map(({ id, nom, url }, index) => (
                                        <div key={index} className='group relative'>
                                            <ModaleImage  title={nom} url={HTTP_FRONTEND_HOME + '' + url}>

                                                {
                                                    <div key={id} className='group relative'>
                                                        <img
                                                            className="h-40 w-full max-w-full rounded-md border object-cover shadow-sm object-center"
                                                            src={HTTP_FRONTEND_HOME + '' + url}
                                                            alt={HTTP_FRONTEND_HOME + '' + url}
                                                        />
                                                        <div className="hidden group-hover:block rounded-md absolute h-full top-0 bg-gradient-to-b from-gray-800 z-10 bottom-2 w-full">
                                                            <button onClick={() =>handleDeleteImage(vente.voiture_id,id)} className='items-center  bg-none mt-2 text-white text-sm   w-full'>
                                                                <span>Supprimer</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                } </ModaleImage>
                                            <div className="hidden group-hover:block h-min rounded-md absolute top-0 bg-gradient-to-b from-gray-800 z-10 bottom-2 w-full">
                                                <button onClick={() => handleDeleteImage(vente.voiture_id,id)} className='items-center hover:uderline hover:text-red-500 bg-none mt-2 text-white text-sm   w-full'>
                                                    <span>Supprimer</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    }

                </div>
                <Card className='col-span-3 lg:col-span-2'>
                    <div className="App w-full md:m-auto  overflow-auto">
                        <table className='w-full min-w-max   table-auto text-left h-full ' align='top'>
                            <tbody>
                                {vente.voiture != null && vente.voiture.nom != '' &&
                                    <tr className='p-4 border-b'>
                                        <th
                                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                            <Typography
                                                variant="lead"
                                                color="blue-gray"
                                                className="font-bold leading-none opacity-70"
                                            >
                                                <Translate>voiture</Translate>

                                            </Typography>
                                        </th>
                                        <td>{vente.voiture.nom}</td>
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
                                            <Translate>Date début </Translate>

                                        </Typography>
                                    </th>
                                    <td>{DateToFront(vente.date_debut_vente, i18n.language, 'd/m/Y')}</td>
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
                                            <Translate>Date fin </Translate>

                                        </Typography>
                                    </th>
                                    <td>{DateToFront(vente.date_fin_vente, i18n.language, 'd/m/Y')}</td>
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
                                            <Translate>Point de retrait </Translate>

                                        </Typography>
                                    </th>
                                    <td>
                                        {console.log(vente)}
                                        {vente && vente.point_retrait != null && vente.point_retrait != '' &&

                                            <>
                                                <span className='my-2 mx-1 block float-left 
                                       bg-gray-200 rounded-sm py-1 px-2 text-xs'>
                                                    *<Translate>{vente.point_retrait.lieu ?? ''}</Translate>
                                                </span>
                                            </>
                                        }
                                    </td>
                                </tr>
                                {vente && vente.prix_vente != null && vente.prix_vente != '' &&

                                    <tr className='p-4 border-b'>
                                        <th
                                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                            <Typography
                                                variant="lead"
                                                color="blue-gray"
                                                className="font-bold leading-none opacity-70"
                                            >
                                                <Translate>Prix de vente </Translate>

                                            </Typography>
                                        </th>
                                        <td>

                                            {formaterMontant(vente.prix_vente, i18n.language)}
                                        </td>
                                    </tr>
                                }
                                {vente && vente.date_debut_vente != null && vente.date_debut_vente != '' &&

                                    <tr className='p-4 border-b'>
                                        <th
                                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                            <Typography
                                                variant="lead"
                                                color="blue-gray"
                                                className="font-bold leading-none opacity-70"
                                            >
                                                <Translate>Date début vente</Translate>

                                            </Typography>
                                        </th>
                                        <td>

                                            {DateToFront(vente.date_debut_vente, i18n.language, 'd/m/Y')}
                                        </td>
                                    </tr>
                                }
                                {vente && vente.date_fin_vente != null && vente.date_fin_vente != '' &&

                                    <tr className='p-4 border-b'>
                                        <th
                                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                            <Typography
                                                variant="lead"
                                                color="blue-gray"
                                                className="font-bold leading-none opacity-70"
                                            >
                                                <Translate>Date début vente</Translate>

                                            </Typography>
                                        </th>
                                        <td>
                                            {DateToFront(vente.date_fin_vente, i18n.language, 'd/m/Y')}
                                        </td>
                                    </tr>
                                }
                                {vente && vente.delai_livraison != null && vente.delai_livraison != '' &&

                                    <tr className='p-4 border-b'>
                                        <th
                                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                            <Typography
                                                variant="lead"
                                                color="blue-gray"
                                                className="font-bold leading-none opacity-70"
                                            >
                                                <Translate>Délai de livraison</Translate>

                                            </Typography>
                                        </th>
                                        <td>

                                            {vente.delai_livraison}
                                        </td>
                                    </tr>
                                }
                                {vente && vente.kilometrage != null && vente.kilometrage != '' &&

                                    <tr className='p-4 border-b'>
                                        <th
                                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                            <Typography
                                                variant="lead"
                                                color="blue-gray"
                                                className="font-bold leading-none opacity-70"
                                            >
                                                <Translate>Kilométrage</Translate>

                                            </Typography>
                                        </th>
                                        <td>

                                            {vente.kilometrage}
                                        </td>
                                    </tr>
                                }
                                {vente && vente.duree_garantie != null && vente.duree_garantie != '' &&

                                    <tr className='p-4 border-b'>
                                        <th
                                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                            <Typography
                                                variant="lead"
                                                color="blue-gray"
                                                className="font-bold leading-none opacity-70"
                                            >
                                                <Translate>Durée de la garantie</Translate>

                                            </Typography>
                                        </th>
                                        <td>

                                            {vente.duree_garantie}
                                        </td>
                                    </tr>
                                }
                                {vente && vente.option_ventes != null && vente.option_ventes.length > 0 &&

                                    <tr className='p-4 border-b'>
                                        <th
                                            align='top' className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                            <Typography
                                                variant="lead"
                                                color="blue-gray"
                                                className="font-bold leading-none opacity-70"
                                            >
                                                <Translate>Options de vente</Translate>

                                            </Typography>
                                        </th>
                                        <td>

                                            {vente.option_ventes && vente.option_ventes.map(({ id, nom, prix }, index) =>

                                                <div key={id} className='my-3 mx-1  text-xs'>
                                                   <span className="bg-gray-200 rounded-sm  py-1 px-3">
                                                     - <Translate>{nom + ' (' + formaterMontant(prix, i18n.language) + ')' ?? ''}</Translate>
                                                     </span>
                                                     </div>)

                                            }
                                        </td>
                                    </tr>
                                }



                                <tr className='border-b items-start justify-start blue-gray-100 bg-blue-gray-50/50 p-4'>
                                    <th
                                        align='top' className="p-4 "
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
                                        <div variant='small' className='text-sm break-words bg-white overflow-auto max-w-xs xl:max-w-lg lg:max-w-md md:max-w-sm py-4'>
                                            
                                            <div dangerouslySetInnerHTML={{__html:vente.description}}></div>
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
                                    <td> {DateToFront(vente.created_at, i18n.language)}</td>
                                </tr>
                                {vente.created_at != vente.updated_at &&
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
                                        <td> {DateToFront(vente.updated_at, i18n.language)}</td>
                                    </tr>
                                }

                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    )
}
