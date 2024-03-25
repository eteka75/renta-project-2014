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
    Badge,
    Tooltip
} from "@material-tailwind/react";
import { CiInboxIn } from "react-icons/ci";
import { DateToFront, convertDateToDiff, formaterMontant, getEtatReservation } from '@/tools/utils';
import Breadcrumb from '@/components/Breadcrumb';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { FaArchive, FaRegEdit } from 'react-icons/fa';
import { Inertia } from '@inertiajs/inertia';
import { FaEye } from 'react-icons/fa6';
import DeleteDialog from '@/components/dashboard/DeleteDialog';
import ViewTable from '@/components/dashboard/ViewTable';
import Translate from '@/components/Translate';
import { useTranslation } from 'react-i18next';
import SearchBar from '@/components/dashboard/SearchBar';
import { IoArchiveSharp, IoCarSportOutline } from 'react-icons/io5';
import { BsCalendar2Date } from 'react-icons/bs';
import { GiHouseKeys } from 'react-icons/gi';
import { MdOutlineCurrencyExchange } from 'react-icons/md';


export default function Index({ auth, notifications, page_id, page_subid, page_title, page_subtitle, search_text = '', count = 0 }) {

    const TABLE_HEAD = [""];
    const { data, get, errors, processing, setData } = useForm({
        search: '',
    });

    const [datas, setDatas] = useState([]);
    const [showHead, setShowHead] = useState(true);
    const [showSupDialog, setSupDialog] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        if (notifications?.data && notifications?.data.length > 0) {
            setDatas(notifications?.data);
        }
       
        if (notifications?.data && notifications?.data.length > 0) {
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
            //Inertia.delete(route('dashboard.notifications.delete', deleteId));
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
            get(route('dashboard.notifications'),
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
                    <Translate>Notifications</Translate>
                </Link>
            </Breadcrumb>
            <DashHeadTitle title={page_title} subtitle={page_subtitle} >

            </DashHeadTitle>
            <DeleteDialog showFunction={showSupDialog} closeFunction={CloseDialog} submitFunction={SubmitDeletion} />
            <Card className="h-full w-full dark:bg-gray-800/30 dark:border-slate-800 dark:border dark:text-white">
                <SearchBar
                    exportUrl={route('dashboard.notifications.export')}
                    message={errors.search}
                    onSubmit={Search}
                    disabled={processing}
                    searchText={data.search ?? ''}
                    onChange={handleSearch}
                    placeholder={t('Rechercher') + '...'}
                />
                <CardBody className={" p-0 overflow-auto"}>
                    <ViewTable count={count} head={TABLE_HEAD} links={notifications?.links} showHead={showHead}>
                        <tr>
                            <td className='p-2'>
                        {datas.length > 0 && datas.map(
                            ({ id, lien, type, message,created_at }, index) => {
                                const isLast = index === datas.length - 1;
                                const classes = isLast
                                    ? "p-4 dark:border-slate-800"
                                    : "p-4 border-b border-blue-gray-50 dark:border-slate-800 ";

                                return (
                                    <div key={index} className="w-full shadow-sm p-3 mb-2 border hover:bg-yellow-50 hover:border-yellow-500/60 dark:hover:bg-gray-800/70 dark:border-gray-700/90 bg-white dark:text-white dark:bg-gray-800  rounded flex items-center">
                                         <div tabindex="0" aria-label="post icon" role="img" className=" focus:outline-none w-8 h-8 dark:border rounded-full border-0 dark:border-gray-700 flex items-center justify-center">
                                                   {type ==="LOCATION" && <GiHouseKeys className="text-gray-900"/>}
                                                   {type==='ACHAT' && <MdOutlineCurrencyExchange className="text-gray-900"/>}
                                                   { type !=='ACHAT' && type!=='LOCATION' && <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                   <path d="M4.30325 12.6667L1.33325 15V2.66667C1.33325 2.48986 1.40349 2.32029 1.52851 2.19526C1.65354 2.07024 1.82311 2 1.99992 2H13.9999C14.1767 2 14.3463 2.07024 14.4713 2.19526C14.5963 2.32029 14.6666 2.48986 14.6666 2.66667V12C14.6666 12.1768 14.5963 12.3464 14.4713 12.4714C14.3463 12.5964 14.1767 12.6667 13.9999 12.6667H4.30325ZM5.33325 6.66667V8H10.6666V6.66667H5.33325Z" fill="#333" />
                                               </svg>
                                                    }
                                                </div>
                                            <div className="pl-3 w-full flex items-center justify-between">
                                              <div>
                                                <p tabindex="0" className="focus:outline-none text-gray-500 text-sm leading-none ">
                                                {(lien!=null && lien!=null) ? 
                                                    <a href={lien}>{message} </a>: message
                                                   
                                                }
                                                </p>
                                                <p tabindex="0" className="focus:outline-none text-xs leading-3 pt-1 dark:text-yellow-500 text-blue-500">{convertDateToDiff(created_at)} </p>

                                                </div>
                                                    <div tabindex="1" className="focus:outline-none text-xs flex gap-6  py-1  rounded-full leading-3 cursor-pointer me-2 text-right dark:text-white text-gray-700">
                                                    {lien!=null && lien!=null && 
                                                    <Tooltip placement="top" content="Voir">
                                                        <Link href={lien}><FaEye/></Link>
                                                    </Tooltip>

                                                        
                                                    }
                                                     <Tooltip placement="top" content="Archiver">
                                                        <Link href={route('dashboard.archiver',id)}><IoArchiveSharp /></Link>
                                                    </Tooltip>

                                                    </div>
                                            </div>
                                        </div>
                                );
                            },
                        )}
                        </td>
                        </tr>
                        {(datas.length === 0 || (data.search != null && search_text != null)) &&
                            <tr><td className="p-4 border-t dark:border-slate-800 border-blue-gray-50" colSpan={TABLE_HEAD.length}>
                                <div className='text-center text-gray-600 py-10'>
                                    {datas.length === 0 &&
                                        <>
                                            <CiInboxIn className="text-5xl  mx-auto  text-slate-400" />
                                            <div className="text-sm mb-4 mt-2"><Translate>Aucun enrégistrement</Translate> !</div>
                                        </>
                                    }
                                    {(data.search != null && search_text != null) && <Link href={route('dashboard.notifications')}>
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
