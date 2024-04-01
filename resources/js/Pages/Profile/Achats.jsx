import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, Link, usePage } from '@inertiajs/react';
import DashHeadTitle from '@/components/dashboard/DashHeadTitle';
import ActivityLayout from '@/Layouts/ActivityLayout';
import { Avatar, Button, CardBody } from '@material-tailwind/react';
import ViewTable from '@/components/dashboard/ViewTable';
import { useState } from 'react';
import { useEffect } from 'react';
import { IoCarSportOutline, IoChevronForward } from 'react-icons/io5';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { DateToFront, getEtatReservation } from '@/tools/utils';
import i18n from '@/i18n';
import { CiInboxIn } from 'react-icons/ci';
import ModaleImage from '@/components/ModaleImage';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import Translate from '@/components/Translate';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { MdOutlineCurrencyExchange } from 'react-icons/md';
const TABLE_HEAD = ["Code", "Voiture", "Date début location", "Date fin location", "Etat", "Date d'ajout", "Actions"];

export default function Achats({ page_title, page_subtitle, achats, count = 0, search_text = null }) {
    const { auth } = usePage().props;
    const [showEmpty, setshowEmpty] = useState(false);
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        setDatas(achats.data);
        setshowEmpty(true);
    }, []);
    return (
        <ActivityLayout
            user={auth.user} auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Mon compte</h2>}
        >
            <div className="py-6">
                <DashHeadTitle title={page_title} subtitle={page_subtitle} />
                <Head title={auth.user.prenom + " " + auth.user.nom + " | " + page_title} />

                <div className=" space-y-6">
                    <div className=" bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <CardBody className={"p-0 overflow-auto_ dark:bg-slate-800 dark:text-white"}>
                            <ViewTable showHead={false} head={null} count={count} links={achats ? achats.links : []} >
                                {datas?.length > 0 && datas?.map(
                                    ({ id, code_achat, etat, voitures, created_at, updated_at }, index) => {
                                        const isLast = index === datas?.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50 dark:border-slate-700 ";

                                        return (

                                            <tr className='hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-500' key={id}>

                                                <td className={classes}>
                                                    <div className='flex gap-2 items-center'>


                                                        <span
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal px-4 py-1 text-sm  rounded-sm"
                                                        >

                                                            <div className='  px-2'> Achat du   <span className="text-sm dark:text-yellow-500  ">{DateToFront(created_at, i18n)}</span> </div>
                                                            <div className='font-bold rounded-md bg-gray-800 text-white dark:border-slate-700  dark:bg-slate-900   px-2'> Code achat :   <span className="text-sm text-yellow-500  ">{code_achat}</span> </div>
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className={classes + " w-min"}>
                                                    <div className="flex items-center space-x-2">
                                                        {voitures != null && voitures?.map(({ id, photo, nom, type_transmission, annee_fabrication }, index) => {
                                                            return <div key={index}>
                                                                <div className="flex gap-1 items-center">
                                                                    <ModaleImage url={HTTP_FRONTEND_HOME + '' + photo} title={nom + ", " + type_transmission + ", Année " + annee_fabrication}>
                                                                        <Avatar
                                                                            variant="circular"
                                                                            alt={nom}
                                                                            className="border-2 border-white hover:z-10 focus:z-10"
                                                                            src={HTTP_FRONTEND_HOME + '' + photo}
                                                                        />
                                                                    </ModaleImage>
                                                                    <div>
                                                                        <div>{nom}</div>
                                                                        <div className="text-sm -mt-1 text-slate-500">Année {annee_fabrication}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        })}
                                                    </div>

                                                </td>
                                                <td className={classes}>
                                                    {getEtatReservation(etat)}
                                                </td>

                                                <td nowrap='true' className={classes + ' text-end w-[180px]'}>
                                                    <Link href={route('profile.getachat', { id: id })}> <Button size='sm' color='blue' variant='text' className='normal-case border border-blue-500 flex gap-1 items-center text-sm '>Plus de détails <IoChevronForward />  </Button></Link>
                                                </td>
                                            </tr>
                                        );
                                    },
                                )}

                                {(datas?.length === 0) && showEmpty &&
                                    <tr><td className="p-4 border-t dark:border-slate-700 border-blue-gray-50" colSpan={TABLE_HEAD.length}>
                                        <div className='text-center text-gray-600 py-10'>
                                            <>
                                                <MdOutlineCurrencyExchange className="text-6xl  mx-auto  text-slate-600 dark:text-slate-700" />
                                                <div className="text-sm mb-4 mt-2 dark:text-slate-500"><Translate>Aucun achat pour le moment</Translate> !</div>
                                            </>


                                        </div>
                                    </td>
                                    </tr>
                                }
                            </ViewTable>
                        </CardBody>


                    </div>
                </div>
            </div>
        </ActivityLayout>
    );
}