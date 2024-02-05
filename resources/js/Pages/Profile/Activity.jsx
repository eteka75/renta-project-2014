import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, Link } from '@inertiajs/react';
import DashHeadTitle from '@/components/dashboard/DashHeadTitle';
import ActivityLayout from '@/Layouts/ActivityLayout';
import { Button } from '@material-tailwind/react';
import { FaChevronRight } from 'react-icons/fa';

export default function Activity({ auth,page_title , page_subtitle}) {
    return (
        <ActivityLayout
            user={auth.user} auth={auth}
            header={<h2 className="font-semibold text-xl dark:text-slate-100 text-gray-800  leading-tight">Mon compte</h2>}
        >
            <div className="py-6">
            <Head title={auth.user.prenom +" "+auth.user.nom +" | Editer mon profil "} />
            <DashHeadTitle title={page_title} subtitle={page_subtitle}/>
                <div className=" space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-4">

                    <div className="p-4 sm:p-8 bg-white dark:bg-slate-800  shadow rounded-md sm:rounded-lg">
                        <h2 className="text-xl dark:text-slate-100 font-bold">Notifications</h2>
                        <p className="text-slate-500 dark:text-slate-100">Découvrez les notifications liées à votre compte</p>
                        <Link href={route('profile.notifications')}>
                        <Button color='white' variant='filled' size='md' className='mt-4  shadow-none border flex gap-2 text-gray-500 hover:border-blue-500 hover:text-blue-500
                           items-center'>  Découvrir <FaChevronRight/> </Button>  </Link>
                    </div>
                   
                    <div className="p-4 sm:p-8 bg-white dark:bg-slate-800  shadow rounded-md sm:rounded-lg">
                        <h2 className="text-xl dark:text-slate-100 font-bold">Favoris</h2>
                        <p className="text-slate-500 dark:text-slate-100">Consultez les voitures que vous avez sauvegardés à vos favoris</p>
                        <Link href={route('profile.favoris')}>
                         <Button color='white' variant='filled' size='md' className='mt-4  shadow-none border flex gap-2 text-gray-500 hover:border-blue-500 hover:text-blue-500
                           items-center'>  Consulter <FaChevronRight/> </Button> 
                            </Link>
                    </div>
                    <div className="p-4 sm:p-8 bg-white dark:bg-slate-800  shadow rounded-md sm:rounded-lg">
                        <h2 className="text-xl dark:text-slate-100 font-bold">Locations</h2>
                        <p className="text-slate-500 dark:text-slate-100">Jetez un coup d'oeil sur vos commandes de locations de voitures</p>
                        <Link href={route('profile.locations')}>
                         <Button color='white' variant='filled' size='md' className='mt-4  shadow-none border flex gap-2 text-gray-500 hover:border-blue-500 hover:text-blue-500
                           items-center'>  Jeter un coup d'oeil <FaChevronRight/> </Button> 
                            </Link>
                    </div>
                    <div className="p-4 sm:p-8 bg-white dark:bg-slate-800  shadow rounded-md sm:rounded-lg">
                        <h2 className="text-xl dark:text-slate-100 font-bold">Achats</h2>
                        <p className="text-slate-500 dark:text-slate-100">En savoir plus sur vos achats de voitures</p>
                        <Link href={route('profile.locations')}>
                         <Button color='white' variant='filled' size='md' className='mt-4  shadow-none border flex gap-2 text-gray-500 hover:border-blue-500 hover:text-blue-500
                           items-center'> En savoir plus <FaChevronRight/> </Button> 
                            </Link>
                    </div>
                    </div>
                {/*
                    <div className="p-4 sm:p-8 bg-white dark:bg-slate-800 shadow rounded-md sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-slate-800 shadow rounded-md sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>*/}
                </div>
            </div>
        </ActivityLayout>
    );
}
