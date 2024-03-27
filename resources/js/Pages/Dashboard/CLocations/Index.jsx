import DashboardLayout from '@/Layouts/DashboardLayout'
import DashHeadTitle from '@/components/dashboard/DashHeadTitle'
import { Head, Link, useForm } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import {
    AiOutlineArrowLeft,
    AiOutlineDelete,
    AiOutlinePlus
} from 'react-icons/ai';

import {
    Card,
    Typography,
    Button,
    CardBody,
    Avatar,
    IconButton,
    Badge
} from "@material-tailwind/react";
import { CiInboxIn } from "react-icons/ci";
import { DateToFront, formaterMontant, getEtatReservation } from '@/tools/utils';
import Breadcrumb from '@/components/Breadcrumb';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { FaRegEdit } from 'react-icons/fa';
import { Inertia } from '@inertiajs/inertia';
import { FaEye } from 'react-icons/fa6';
import DeleteDialog from '@/components/dashboard/DeleteDialog';
import ViewTable from '@/components/dashboard/ViewTable';
import Translate from '@/components/Translate';
import { useTranslation } from 'react-i18next';
import SearchBar from '@/components/dashboard/SearchBar';
import { IoCarSportOutline } from 'react-icons/io5';
import { BsCalendar2Date } from 'react-icons/bs';


export default function Index({ auth, commandes, page_id, page_subid, page_title, page_subtitle, search_text = '', count = 0 }) {

    const TABLE_HEAD = ["Voiture", "Période", "Prix", "Etat", "Actions"];
    const { data, get, errors, processing, setData } = useForm({
        search: '',
    });

    const [datas, setDatas] = useState([]);
    const [showHead, setShowHead] = useState(true);
    const [showSupDialog, setSupDialog] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        if (commandes?.data && commandes?.data.length > 0) {
            setDatas(commandes?.data);
        }

        if (commandes?.data && commandes?.data.length > 0) {
            setShowHead(true);
        } else { setShowHead(false); }

        if (search_text !== '') {
            setData('search', search_text);
        }
    }, []);

    const CloseDialog = () => {
        setSupDialog(false);
        setDeleteId('');
    }

    const SubmitDeletion = () => {
        if (setDeleteId != '') {
            Inertia.delete(route('dashboard.commandes?.delete', deleteId));
            setDeleteId('')
            setSupDialog(false);
        } else {
            ReloadPage();
        }
    }

    const handleDelete = (id) => {
        setDeleteId(id);
        setSupDialog(true);
    }
    const ReloadPage = () => {
        const url = window.location.href;
        router.visit(url);
    }
    const handleSearch = (e) => {
        setData('search', e.target.value);
    }
    const Search = (e) => {
        e.preventDefault();
        if (data.search !== '') {
            // alert('');
            //return;
            get(route('dashboard.clocations'),
                {
                    onSuccess: (response) => {
                        setDatas(response.data);
                    },
                    onError: (error) => {
                        console.error(error);
                    },
                });
        }

    }
    const { t, i18n } = useTranslation();
    return (
        <DashboardLayout auth={auth} page_id={page_id} page_subid={page_subid}>
            <Head title={page_title} />
            <Breadcrumb>
                <Link href='#'>
                    <Translate>Réservations de location</Translate>
                </Link>
            </Breadcrumb>
            <DashHeadTitle title={page_title} subtitle={page_subtitle} >

            </DashHeadTitle>
            <DeleteDialog showFunction={showSupDialog} closeFunction={CloseDialog} submitFunction={SubmitDeletion} />
            <Card className="h-full w-full dark:bg-gray-800/30 dark:border-slate-800 dark:border dark:text-white">
                <SearchBar
                    exportUrl={route('dashboard.clocations.export')}
                    message={errors.search}
                    onSubmit={Search}
                    disabled={processing}
                    searchText={data.search ?? ''}
                    onChange={handleSearch}
                    placeholder={t('Rechercher') + '...'}
                />
                <CardBody className={" p-0 overflow-auto"}>
                    <ViewTable count={count} head={TABLE_HEAD} links={commandes?.links} showHead={showHead}>
                        {datas.length > 0 && datas.map(
                            ({ id, nom, prenom, voiture, montant, date_debut, date_fin, created_at, etat }, index) => {
                                const isLast = index === datas.length - 1;
                                const classes = isLast
                                    ? "p-4 dark:border-slate-800"
                                    : "p-4 border-b border-blue-gray-50 dark:border-slate-800 ";

                                return (
                                    <tr className='hover:bg-gray-100 dark:hover:bg-slate-900 transition-all duration-500' key={id}>

                                        <td className={classes}>
                                            <div className='text-sm'>
                                                <Link href={route('dashboard.voitures.show', voiture?.id)}>
                                                    <div className="flex gap-1 items-center">
                                                        <div>
                                                            <Avatar src={HTTP_FRONTEND_HOME + "" + voiture?.photo} alt={voiture?.nom} />
                                                        </div>
                                                        <div className=''>
                                                            <div className='font-bold '> {voiture?.nom} </div>
                                                            <div className='text-xs'>{voiture?.immatriculation}</div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>

                                        </td>
                                        <td className={classes}>
                                            <div className="flex gap-1 items-center">
                                            <Link className='flex gap-1 cursor-pointer items-center ' href={route('dashboard.clocation', id)}>
                                                {DateToFront(date_debut, i18n.language)} - <span className='text-gray-600 dark:text-white/80'> {DateToFront(date_fin, i18n.language)}</span>
                                            </Link>
                                            </div>
                                            {<div className="text-sm text-slate-500">
                                                Effectuée le {DateToFront(created_at, i18n.language)}
                                </div>}
                                        </td>

                                        <td className={classes + ' font-bold'}>
                                            <span className='px-2 bg-slate-200 py-.5 rounded-xl dark:bg-slate-700 dark:text-white'> {formaterMontant(montant, i18n.language)}</span>
                                        </td>
                                        <td className={classes}>
                                            {getEtatReservation(etat)}
                                        </td>
                                        <td className={classes}>
                                            <IconButton title='Voir' variant="text" className=' text-blue-500 dark:border dark:border-slate-700'>
                                                <Link className='flex gap-1 cursor-pointer items-center ' href={route('dashboard.clocation', id)}>
                                                    <FaEye className='h-6 w-4 text-gray-700 dark:text-white' />
                                                    <span className="md:hidden"><Translate>Voir</Translate></span>
                                                </Link>
                                            </IconButton>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                        {(datas.length === 0 || (data.search != null && search_text != null)) &&
                            <tr><td className="p-4 border-t dark:border-slate-800 border-blue-gray-50" colSpan={TABLE_HEAD.length}>
                                <div className='text-center text-gray-600 py-10'>
                                    {datas.length === 0 &&
                                        <>
                                            <CiInboxIn className="text-5xl  mx-auto  text-slate-400" />
                                            <div className="text-sm mb-4 mt-2"><Translate>Aucun enrégistrement</Translate> !</div>
                                        </>
                                    }
                                    {(data.search != null && search_text != null) && <Link href={route('dashboard.clocations')}>
                                        <Button className='clear-both max-auto dark:text-slate-200 px-6 dark:border-slate-800  py-2 bg-transparent font-bold flex items-center mx-auto text-gray-800 border shadow-sm  rounded-md'><AiOutlineArrowLeft className='me-1' />
                                            <Translate>Retour </Translate>
                                        </Button>
                                    </Link>}

                                </div>
                            </td>
                            </tr>
                        }
                    </ViewTable>
                </CardBody>
            </Card>
        </DashboardLayout>
    )
}
