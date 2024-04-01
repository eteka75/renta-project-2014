import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, Link, usePage } from '@inertiajs/react';
import DashHeadTitle from '@/components/dashboard/DashHeadTitle';
import ActivityLayout from '@/Layouts/ActivityLayout';
import Pagination from '@/components/Pagination';
import { convertDateToDiff } from '@/tools/utils';
import { MdOutlineCurrencyExchange } from 'react-icons/md';
import { GiHouseKeys } from 'react-icons/gi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import Translate from '@/components/Translate';
import { Card, CardBody } from '@material-tailwind/react';

export default function Notifications({ notifications, page_title, page_subtitle }) {
    const { auth } = usePage().props;
    return (
        <ActivityLayout
            user={auth.user} auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Mon compte</h2>}
        >
            <div className="py-6">
                <DashHeadTitle title={page_title} subtitle={page_subtitle} />
                <Head title={auth.user.prenom + " " + auth.user.nom + " | " + page_title} />

                <div className=" space-y-6">
                    <div className="p-4_sm:p-8_bg-white__  shadow_sm:rounded-lg">
                        <div>
                        </div>
                        <div className="" id="chec-div">
                            <div className=" z-10 right-0 h-full overflow-x-hidden_ transform translate-x-0 transition ease-in-out duration-700" id="notification">
                                <div className=" ">
                                    { notifications!=null && notifications?.data?.length > 0 && notifications?.data?.map(({ message,type,lien,created_at }, index) => (
                                         <div key={index} className="w-full shadow-sm p-3 mt-2 border hover:bg-yellow-50 hover:border-yellow-500/60 dark:hover:bg-gray-800/70 dark:border-gray-700/90 bg-white dark:text-white dark:bg-gray-800  rounded flex items-center">
                                         <div tabindex="0" aria-label="post icon" role="img" className="bg-[#f6bb44] focus:outline-none w-9 md:w-8 h-8 dark:border rounded-full border-0 dark:border-gray-700 flex items-center justify-center">
                                                   {type ==="LOCATION" && <GiHouseKeys className="text-gray-900"/>}
                                                   {type==='ACHAT' && <MdOutlineCurrencyExchange className="text-gray-900"/>}
                                                   { type !=='ACHAT' && type!=='LOCATION' && <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                   <path d="M4.30325 12.6667L1.33325 15V2.66667C1.33325 2.48986 1.40349 2.32029 1.52851 2.19526C1.65354 2.07024 1.82311 2 1.99992 2H13.9999C14.1767 2 14.3463 2.07024 14.4713 2.19526C14.5963 2.32029 14.6666 2.48986 14.6666 2.66667V12C14.6666 12.1768 14.5963 12.3464 14.4713 12.4714C14.3463 12.5964 14.1767 12.6667 13.9999 12.6667H4.30325ZM5.33325 6.66667V8H10.6666V6.66667H5.33325Z" fill="#333" />
                                               </svg>
                                                    }
                                                </div>
                                            <div className="pl-3 w-full flex items-center justify-between">
                                              <div>
                                                <p tabindex="0" className="focus:outline-none text-gray-500 dark:text-white text-sm  ">
                                                {(lien!=null && lien!=null) ? 
                                                    <a href={lien}>{message} {type}</a>: message
                                                   
                                                }
                                                </p>
                                                <p tabindex="0" className="focus:outline-none text-xs leading-3 pt-1 dark:text-yellow-500 text-blue-500">{convertDateToDiff(created_at)}</p>

                                                </div>
                                                {lien!=null && lien!=null && 
                                                    <p tabindex="0" className="focus:outline-none text-xs px-3 py-1 bg-gray-200  dark:bg-gray-600 rounded-full leading-3 cursor-pointer me-2 text-right dark:text-white text-gray-700">
                                                        <Link href={lien}>Consulter</Link>
                                                    </p>
                                                }
                                            </div>
                                        </div>
                                    ))}
                                       <Pagination className={'my-4'} links={notifications.links} />   
                                
                                {(notifications?.data?.length === 0)  &&
                                 <Card >
                                    <CardBody className={"p-0 rounded-md py-20 border dark:border-gray-700 dark:bg-slate-800 dark:text-white"}>
                                        
                                            <div className='text-center text-gray-600 py-10'>
                                           
                                                <>
                                                    <IoMdNotificationsOutline className="text-6xl  mx-auto  text-slate-600" />
                                                    <div className="text-sm mb-4 mt-2 text-slate-600 dark:text-slate-400"><Translate>Aucune notification pour le moment</Translate> !</div>
                                                </>
                                    </div>
                                    </CardBody>
                                </Card>
                                }
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ActivityLayout>
    );
}
