import { Head, Link, usePage } from '@inertiajs/react';
import DashHeadTitle from '@/components/dashboard/DashHeadTitle';
import ActivityLayout from '@/Layouts/ActivityLayout';
import { Button, Card, CardBody } from '@material-tailwind/react';
import ViewTable from '@/components/dashboard/ViewTable';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IoCarSportOutline, IoChevronForward } from 'react-icons/io5';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { DateToFront, getEtatReservation } from '@/tools/utils';
import Translate from '@/components/Translate';
import i18n from '@/i18n';
import { useEffect } from 'react';
import { Pagination } from '@mui/material';
const TABLE_HEAD = ["Code", "Voiture", "Date début location", "Date fin location", "Etat", "Date d'ajout", "Actions"];

export default function Locations({ page_title, page_subtitle, reservations, count = 0 }) {
    const [showHead, setShowHead] = useState(true);
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        setDatas(reservations.data);
    }, [])
    const { auth } = usePage().props;
    return (
        <ActivityLayout
            user={auth.user} auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Mon compte</h2>}
        >
            <div className="py-6">
                <DashHeadTitle title={page_title} subtitle={page_subtitle} />
                <Head title={auth.user.prenom + " " + auth.user.nom + " | " + page_title} />

                <div className=" ">

                    <Card className=''>
                        <CardBody className={"p-0 overflow-auto_ dark:bg-slate-800 dark:text-white"}>
                            <ViewTable showHead={false} head={TABLE_HEAD} count={count} links={reservations ? reservations.links : []} >
                                {datas?.length > 0 && datas?.map(
                                    ({ id, code_reservation, date_debut, date_fin, etat, voiture, created_at, updated_at }, index) => {
                                        const isLast = index === datas?.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50 ";

                                        return (

                                            <tr className='hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-500' key={id}>

                                                <td className={classes}>
                                                    <div className='flex gap-2 items-center'>

                                                        {(voiture?.photo != "" && voiture?.photo != null) ?
                                                            <div className="flex items-center gap-3">

                                                                {<Link href={('dashboard.ventes.show', id)}>
                                                                    <LazyLoadImage src={HTTP_FRONTEND_HOME + '' + voiture?.photo} alt={voiture?.nom} className='w-14  object-cover rounded-md border bg-white' /></Link>}

                                                            </div>
                                                            :
                                                            <Link href={('dashboard.ventes.show', id)}>
                                                                <IoCarSportOutline className='border-1 w-10 h-10 bg-white  rounded-sm' />
                                                            </Link>
                                                        }
                                                        <span
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal px-4 py-1 text-sm  rounded-sm"
                                                        >
                                                            <Link href={('dashboard.ventes.show', id)}>
                                                                {voiture ? voiture.nom : ''}
                                                            </Link>
                                                            <div className='font-bold rounded-md bg-gray-800 text-white   px-2'> Code :  <span className="text-sm text-yellow-500  ">{code_reservation}</span> </div>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    Du  {DateToFront(date_debut, i18n.language, 'd/m/Y') ?? ''}
                                                    &nbsp; au &nbsp;

                                                    {DateToFront(date_fin, i18n.language, 'd/m/Y') ?? ''}
                                                </td>
                                                <td className={classes}>
                                                    {getEtatReservation(etat)}
                                                </td>
                                                <td className={classes + " text-sm text-slate-500"}>

                                                    Réservée le<br></br>   {DateToFront(updated_at, i18n.language) ?? ''}
                                                </td>
                                                <td nowrap='true' className={classes + ' text-end w-[180px]'}>
                                                    <Link href={route('profile.getlocation', { id: id })}> <Button size='sm' color='blue' variant='text' className='normal-case border border-blue-500 flex gap-1 items-center text-sm '>Plus de détails <IoChevronForward />  </Button></Link>
                                                </td>
                                            </tr>
                                        );
                                    },
                                )}
                                {(reservations?.length === 0) &&
                                    <tr><td className="p-4 border-t border-blue-gray-50" colSpan={TABLE_HEAD.length}>
                                        <div className='text-center text-gray-600 py-10'>
                                            {reservations?.length === 0 &&
                                                <>
                                                    <CiInboxIn className="text-5xl  mx-auto  text-slate-400" />
                                                    <div className="text-sm mb-4 mt-2"><Translate>Aucune réservation pour le moment</Translate> !</div>
                                                </>
                                            }
                                            {(data.search != null && search_text != null) && <Link href={('#dashboard.ventes')}>
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
                    <Pagination  className='my-4' links={reservations.links}/>
                </div>
            </div>
        </ActivityLayout>
    );
}
