import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/components/Breadcrumb';
import DashHeadTitle from '@/components/dashboard/DashHeadTitle';
import { Head, Link } from '@inertiajs/react';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineEdit } from 'react-icons/ai';
import Translate from '@/components/Translate';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { DateToFront, formaterMontant } from '@/tools/utils';
import i18n from '@/i18n';
import ModaleImage from '@/components/ModaleImage';
import { useTranslation } from 'react-i18next';
import { Inertia } from '@inertiajs/inertia';
import DeleteDialog from '@/components/dashboard/DeleteDialog';
import { IoInformation, IoInformationCircle } from 'react-icons/io5';

export default function Show({ auth, location, page_id = '', voiture = '', page_subid = '', page_title = '', page_subtitle = '' }) {
    const [showSupDialog, setSupDialog] = useState(false);
    const { t } = useTranslation();
    const [deleteId, setDeleteId] = useState('');
    const [deleteIdImg, setDeleteIdImg] = useState('');

    const handleDeleteImage = (id, imgId) => {
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
        if (deleteId != '' && setDeleteIdImg != '') {
            Inertia.delete(route('dashboard.voitures.image_location.delete', { 'img': deleteIdImg, 'id': deleteId }));
            setDeleteId('');
            setDeleteIdImg("");
            setSupDialog(false);
        } else {
            setDeleteIdImg("")
            setDeleteId('');
        }
    }
    return (
        <DashboardLayout auth={auth} page_id={page_id} page_subid={page_subid}>
            <Breadcrumb>
                <Link href={route('dashboard.locations')} className="opacity-60">
                    <span>Locations</span>
                </Link>
                <Link href='#'>
                    <span>Affichage</span>
                </Link>
            </Breadcrumb>

            <Head title={page_title} />
            <DeleteDialog showFunction={showSupDialog} message={t('Voulez-vous supprimer cette photo ?')} closeFunction={CloseDialog} submitFunction={SubmitDeletion} />

            <DashHeadTitle title={page_title} subtitle={page_subtitle} >
                <Link className='px-4 font-bold flex items-center py-2 bg-white shadow-sm  rounded-md'
                    href={route('dashboard.locations')}>
                    <AiOutlineArrowLeft className='me-1' />    <Translate>Retour</Translate>
                </Link>
                <Link className='px-4 font-bold flex ms-2 items-center py-2 bg-gray-600 text-white shadow-sm  rounded-md'
                    href={route('dashboard.locations.edit',location?.id)}>
                    <AiOutlineEdit className='me-1' />    <Translate>Modifier</Translate>
                </Link>
            </DashHeadTitle>
            <div className="grid grid-cols-3 gap-4 items-start  justify-between ">
                <Card className='col-span-3   lg:col-span-1'>
                    <CardBody className="w-full md:m-auto">
                        <Typography variant='h5' className='mb-3 flex justify-between'> {location?.voiture?.nom ?? ''} <Link className='text-sm mx-2 text-slate-600 flex' href={route('dashboard.voitures.show', { 'id': voiture?.id ?? '0' })}><IoInformationCircle className='h-4' /> Détail sur la voiture</Link></Typography>
                        {location.voiture && location.voiture.photo != '' && location.voiture.photo != null &&
                            <div className='group relative'>
                                <ModaleImage title={location.voiture.nom} url={HTTP_FRONTEND_HOME + '' + location.voiture.photo}>

                                    {
                                        <img
                                            className="max-h-auto mx-auto max-w-full  rounded-lg object-cover object-center"
                                            src={HTTP_FRONTEND_HOME + '' + location.voiture.photo}
                                            alt={location.voiture.nom}
                                        />
                                    }
                                </ModaleImage>
                                <div className="hidden group-hover:block h-32 rounded-md absolute top-0 bg-gradient-to-b from-gray-800 z-10 bottom-2 w-full">
                                    <button onClick={() => handleDeleteImage(location.voiture_id, -1)} className='items-center hover:uderline hover:text-red-500 bg-none mt-2 text-white text-sm   w-full'>
                                        <span>Supprimer</span>
                                    </button>
                                </div>
                            </div>
                        }
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 py-2">
                            {voiture && voiture.location_medias.length > 0 && voiture.location_medias.map(({ id, nom, url }, index) => (
                                <div key={index} className='group relative'>
                                    <ModaleImage title={nom} url={HTTP_FRONTEND_HOME + '' + url}>

                                        {
                                            <div key={id} className='group relative'>
                                                <img
                                                    className="h-40 w-full max-w-full rounded-md border object-cover shadow-sm object-center"
                                                    src={HTTP_FRONTEND_HOME + '' + url}
                                                    alt={HTTP_FRONTEND_HOME + '' + url}
                                                />
                                                <div className="hidden group-hover:block rounded-md absolute h-full top-0 bg-gradient-to-b from-gray-800 z-10 bottom-2 w-full">
                                                    <button onClick={() => handleDeleteImage(location.voiture_id, id)} className='items-center  bg-none mt-2 text-white text-sm   w-full'>
                                                        <span>Supprimer</span>
                                                    </button>
                                                </div>
                                            </div>
                                        } </ModaleImage>
                                    <div className="hidden group-hover:block h-min rounded-md absolute top-0 bg-gradient-to-b from-gray-800 z-10 bottom-2 w-full">
                                        <button onClick={() => handleDeleteImage(location.voiture_id, id)} className='items-center hover:uderline hover:text-red-500 bg-none mt-2 text-white text-sm   w-full'>
                                            <span>Supprimer</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>
                <Card className='col-span-3 lg:col-span-2'>
                    <div className="App w-full md:m-auto overflow-auto">
                        <table className='w-full min-w-max table-auto text-left h-full ' align='top'>
                            <tbody>
                                {location.voiture != null && location.voiture.nom != '' &&
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
                                        <td>{location.voiture.nom}</td>
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
                                    <td>{DateToFront(location.date_debut_location, i18n.language, 'd/m/Y')}</td>
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
                                    <td>{DateToFront(location.date_fin_location, i18n.language, 'd/m/Y')}</td>
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
                                            <Translate>Points de retrait </Translate>

                                        </Typography>
                                    </th>
                                    <td>
                                    <div className="flex flex-wrap gap-2">

                                        {location.points_retrait && location.points_retrait.length > 0 && location.points_retrait.map(({ lieu }, index) => (


                                            <span key={index} className='my-2  block float-left 
                                       bg-gray-200 rounded-sm py-1 px-2 text-xs'>
                                                *<Translate>{lieu ?? ''}</Translate>
                                            </span>
                                        ))}
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
                                            <Translate>Localisations </Translate>

                                        </Typography>
                                    </th>
                                    <td>
                                        <div className="flex flex-wrap gap-2">
                                            {location.localisations && location.localisations.length > 0 && location.localisations.map(({ nom }, index) => (


                                                <span key={index} className='my-2 block 
                                       bg-gray-200 rounded-sm py-1 px-2 text-xs'>
                                                    *<Translate>{nom ?? ''}</Translate>
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                                <tr className='p-4 border-b'>
                                    <td colSpan={2}
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Conditions </Translate>
                                        </Typography>
                                    
                                        <div className='html py-4 text-sm' dangerouslySetInnerHTML={{__html:location.conditions}}></div>

                                    </td>
                                </tr>
                                {location.lien_video!=null &&
                                <tr className='p-4 border-b'>
                                    <td colSpan={2}
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Vidéo </Translate>
                                        </Typography>
                                    
                                        <div className='html py-4 text-sm' dangerouslySetInnerHTML={{__html:location.lien_video}}></div>

                                    </td>
                                </tr>}
                                <tr className='p-4 border-b'>
                                    <td colSpan={2}
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Instructions de retrait </Translate>
                                        </Typography>
                                    
                                        <div className='html py-4 text-sm max-w-screen-sm' dangerouslySetInnerHTML={{__html:location.instruction_retrait}}></div>

                                    </td>
                                </tr>
                                {location.tarif_location_heure != null && location.tarif_location_heure != '' &&
                                    <tr className='p-4 border-b'>
                                        <th
                                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                            <Typography
                                                variant="lead"
                                                color="blue-gray"
                                                className="font-bold leading-none opacity-70"
                                            >
                                                <Translate>Tarif par heure</Translate>

                                            </Typography>
                                        </th>
                                        <td>{formaterMontant(location.tarif_location_heure,i18n.language)}</td>
                                    </tr>
                                }
                                {location.tarif_location_journalier != null && location.tarif_location_journalier != '' &&
                                    <tr className='p-4 border-b'>
                                        <th
                                            className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                            <Typography
                                                variant="lead"
                                                color="blue-gray"
                                                className="font-bold leading-none opacity-70"
                                            >
                                                <Translate>Tarif par jour</Translate>

                                            </Typography>
                                        </th>
                                        <td>{formaterMontant(location.tarif_location_journalier,i18n.language)}</td>
                                    </tr>
                                }
                                {location.tarif_location_hebdomadaire != null && location.tarif_location_hebdomadaire != '' &&
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
                                        <td>{formaterMontant(location.tarif_location_hebdomadaire,i18n.language)}</td>
                                    </tr>
                                }
                                {location.tarif_location_mensuel != null && location.tarif_location_mensuel != '' &&
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
                                        <td>{formaterMontant(location.tarif_location_mensuel,i18n.language)}</td>
                                    </tr>
                                }


                                <tr className='border-b blue-gray-100 bg-blue-gray-50/50 p-4'>
                                    <th
                                        className="p-4 "
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
                                         
                                        <div dangerouslySetInnerHTML={{__html:location.description }}></div>

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
                                    <td> {DateToFront(location.created_at, i18n.language)}</td>
                                </tr>
                                {location.created_at != location.updated_at &&
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
                                        <td> {DateToFront(location.updated_at, i18n.language)}</td>
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
