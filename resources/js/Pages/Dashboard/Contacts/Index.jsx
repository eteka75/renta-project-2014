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
import { DateToFront, truncateString } from '@/tools/utils';
import i18n from '@/i18n';
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
import { FiMessageSquare } from 'react-icons/fi';


export default function Index({ auth, contacts, page_id, 
    page_subid, page_title, page_subtitle, search_text = '',count }) {

    const TABLE_HEAD = ["Nom",  "Date d'ajout", "Actions"];
    const { data, get, errors, processing, setData } = useForm({
        search: '',
    });

    const [datas, setDatas] = useState([]);
    const [showHead, setShowHead] = useState(true);
    const [showSupDialog, setSupDialog] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        if (contacts.data && contacts.data.length > 0) {
            setDatas(contacts.data);
        }
        
        if (contacts.data && contacts.data.length > 0) {
            setShowHead(true);
        }else{setShowHead(false);}

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
            Inertia.delete(route('dashboard.contacts.delete', deleteId));
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
            get(route('dashboard.contacts.search'),
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
                    <Translate>Catégories</Translate>
                </Link>
            </Breadcrumb>
            <DashHeadTitle title={page_title} subtitle={page_subtitle} >
                
            </DashHeadTitle>
            <DeleteDialog showFunction={showSupDialog} closeFunction={CloseDialog} submitFunction={SubmitDeletion} />
            <Card className="h-full w-full dark:bg-gray-800/30 dark:border-slate-800 dark:border dark:text-white">
                <SearchBar
                    exportUrl={route('dashboard.contacts.export')}
                    message={errors.search}
                    onSubmit={Search}
                    disabled={processing}
                    searchText={data.search ?? ''}
                    onChange={handleSearch}
                    placeholder={t('Rechercher')+'...'}
                />
                <CardBody className={" p-0 overflow-auto"}>
                    <ViewTable count={count}  head={TABLE_HEAD} links={contacts.links} showHead={showHead}>
                        {datas.length > 0 && datas.map(
                            ({ id, nom_prenom,  objet,read, created_at }, index) => {
                                const isLast = index === datas.length - 1;
                                const readClass= (parseInt(read)===0)? 'bg-blue-50 dark:bg-slate-700':'bg-white dark:bg-gray-800/30';
                                let classes = isLast
                                    ? "p-4 "+readClass
                                    : "p-4 border-b border-blue-gray-50  "+readClass;

                                return (
                                    <tr className='hover:bg-gray-100 transition-all duration-500 dark:hover:bg-gray-900' key={id}>
                                    
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold "
                                                >
                                                    <Link href={route('dashboard.contacts.show', id)}>
                                                        {truncateString (nom_prenom,100)??''}
                                                    </Link>
                                                </Typography>
                                            </div>
                                        
                                            <div className="flex text-slate-500 items-center ">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="flex gap-2 items-center flex-wrap"
                                                >
                                                    <Link title={objet} href={route('dashboard.contacts.show', id)}>
                                                        {truncateString (objet,80)??''}
                                                    </Link>
                                                </Typography>
                                            </div>
                                        </td>
                                        
                                        <td className={classes+" w-1/5"}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >

                                                {DateToFront(created_at, i18n.language)}

                                            </Typography>
                                        </td>
                                        <td className={classes +" w-1/6"}>
                                            <div className="md:flex grid-cols-1 grid md:grid-cols-3 gap-1">
                                                
                                                <IconButton title='Voir' variant="text" className=' text-blue-500'>
                                                    <Link className='flex gap-1 cursor-pointer items-center' href={route('dashboard.contacts.show', id)}>
                                                        <FaEye className='h-6 w-4 text-gray-700 dark:text-white' />
                                                        <span className="md:hidden"><Translate>Voir</Translate></span>
                                                    </Link>
                                                </IconButton>
                                                <IconButton variant='text' className='text-red-600 items-center flex gap-1' title="supprimer cet enrégistrement"
                                                    method="delete"
                                                    href={route('dashboard.contacts.delete', id)}
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
                                    {(data.search != null && search_text != null) && <Link href={route('dashboard.contacts')}>
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
