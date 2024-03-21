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
    IconButton
} from "@material-tailwind/react";
import { CiInboxIn } from "react-icons/ci";
import { DateToFront } from '@/tools/utils';
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


export default function Index({ auth, carburants, page_id, page_subid,
    page_title, page_subtitle, search_text = '',count= 0}) {

    const TABLE_HEAD = ["Photo", "Nom",  "Date d'ajout", "Actions"];
    const { data, get, errors, processing, setData } = useForm({
        search: '',
    });

    const [datas, setDatas] = useState([]);
    const [showHead, setShowHead] = useState(true);
    const [showSupDialog, setSupDialog] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        if (carburants.data && carburants.data.length > 0) {
            setDatas(carburants.data);
        }
        
        if (carburants.data && carburants.data.length > 0) {
            setShowHead(true);
        }else{setShowHead(false);}

        if (search_text !== '') {
            setData('search', search_text);
        }
       // console.log(search_text);
    }, []);

    const CloseDialog = () => {
        setSupDialog(false);
        setDeleteId('');
    }

    const SubmitDeletion = () => {
        if (setDeleteId != '') {
            Inertia.delete(route('dashboard.carburants.delete', deleteId));
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
            get(route('dashboard.carburants.search'),
                {
                    onSuccess: (response) => {
                        setDatas(response.data);
                    },
                    onError: (error) => {
                        console.log(error);
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
                    <Translate>Types de carburant</Translate>
                </Link>
            </Breadcrumb>
            <DashHeadTitle title={page_title} subtitle={page_subtitle} >
                <Link className='inline-flex whitespace-nowrap items-center text-sm sm:text-md px-5 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 rounded-md md:ml-6 md:mb-3'
                    href={route('dashboard.carburants.create')}>
                    <AiOutlinePlus className='me-1' />   <Translate>Nouveau</Translate>
                </Link>
            </DashHeadTitle>
            <DeleteDialog showFunction={showSupDialog} closeFunction={CloseDialog} submitFunction={SubmitDeletion} />
            <Card className="h-full w-full dark:bg-gray-800/30 dark:border-slate-800 dark:border dark:text-white">
                <SearchBar
                    exportUrl={route('dashboard.carburants.export')}
                    message={errors.search}
                    onSubmit={Search}
                    disabled={processing}
                    searchText={data.search ?? ''}
                    onChange={handleSearch}
                    placeholder={t('Rechercher')+'...'}
                />
                <CardBody className={" p-0 overflow-auto"}>
                    <ViewTable count={count} head={TABLE_HEAD} links={carburants.links} showHead={showHead}>
                        {datas.length > 0 && datas.map(
                            ({ id, nom,  photo, created_at }, index) => {
                                const isLast = index === datas.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50 dark:border-slate-800";

                                return (
                                    <tr className='hover:bg-gray-100  dark:hover:bg-gray-900  transition-all duration-500' key={id}>
                                    {photo!='' && photo!=null &&                                        
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">

                                                {photo && <Link className='' href={route('dashboard.carburants.show', id)}><Avatar src={HTTP_FRONTEND_HOME + '' + photo} alt={nom} className='w-10 bg-white' size="sm" /></Link>}

                                            </div>
                                        </td>
                                        }
                                        <td colSpan={ photo!='' && photo!=null?'':'2'} className={classes}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    <Link className='block w-full' href={route('dashboard.carburants.show', id)}>
                                                        {nom}
                                                    </Link>
                                                </Typography>
                                            </div>
                                        </td>
                                        
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >

                                                {DateToFront(created_at, i18n.language)}

                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="md:flex grid-cols-1 grid md:grid-cols-3 gap-1">
                                                <IconButton title='Modifier' variant="text" className=' text-blue-500'>
                                                    <Link className='flex gap-1 cursor-pointer items-center' href={route('dashboard.carburants.edit', id)}>
                                                        <FaRegEdit className='h-6 w-4 text-gray-700' />
                                                        <span className="md:hidden"><Translate>Modifier</Translate></span>
                                                    </Link>
                                                </IconButton>
                                                <IconButton title='Voir' variant="text" className=' text-blue-500'>
                                                    <Link className='flex gap-1 cursor-pointer items-center' href={route('dashboard.carburants.show', id)}>
                                                        <FaEye className='h-6 w-4 text-gray-700' />
                                                        <span className="md:hidden"><Translate>Voir</Translate></span>
                                                    </Link>
                                                </IconButton>
                                                <IconButton variant='text' className='text-red-600 items-center flex gap-1' title="supprimer cet enrégistrement"
                                                    method="delete"
                                                    href={route('dashboard.carburants.delete', id)}
                                                    as="button"
                                                    onClick={() => handleDelete(id)}
                                                >

                                                    <AiOutlineDelete className='h-6 w-4' />
                                                    <span className="md:hidden">Supprimer</span>
                                                </IconButton>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                        {(datas.length === 0 || (data.search != null && search_text != null)) &&
                            <tr><td className="p-4 border-t border-blue-gray-50 dark:border-slate-800" colSpan={TABLE_HEAD.length}>
                                <div className='text-center text-gray-600 py-10'>
                                    {datas.length === 0 &&
                                        <>
                                            <CiInboxIn className="text-5xl  mx-auto  text-slate-400" />
                                            <div className="text-sm mb-4 mt-2"><Translate>Aucun enrégistrement</Translate> !</div>
                                        </>
                                    }
                                    {(data.search != null && search_text != null) && <Link href={route('dashboard.carburants')}>
                                        <Button className='clear-both max-auto px-6  py-2 bg-transparent font-bold flex items-center mx-auto text-gray-800 border shadow-sm  rounded-md'><AiOutlineArrowLeft className='me-1' />
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
