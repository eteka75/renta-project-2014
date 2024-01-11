import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, Link } from '@inertiajs/react';
import DashHeadTitle from '@/components/dashboard/DashHeadTitle';
import ActivityLayout from '@/Layouts/ActivityLayout';
import { Avatar, Badge, Button, Chip } from '@material-tailwind/react';
import { FaChevronRight } from 'react-icons/fa';
import ProfilLayout from '@/Layouts/ProfilLayout';
import { DateToFront } from '@/tools/utils';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import ModaleShow from '@/components/ModaleShow';
import i18n from '@/i18n';
import { CiEdit } from 'react-icons/ci';

export default function Profile({ auth, page_title, page_subtitle }) {
    const { user } = auth;
    return (
        <ProfilLayout
            user={auth.user} auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Mon compte</h2>}
        >
            <div className="py-6">
                <Head title={auth.user.prenom + " " + auth.user.nom + " | Editer mon profil "} />
                <DashHeadTitle title={page_title} subtitle={page_subtitle} />
                <div className=" space-y-6 max-w-screen-lg">

                    <div className='grid-cols-1 lg:grid lg:grid-cols-5 rounded-sm  items-start gap-4 bg-white shadow-sm p-3 mb-4 border-t-4 border-green-500'>
                    <div class=" lg:col-span-2 ">
                        <div class="sm:flex sm:justify-between">
                            <div class="flex items-center">
                                {user?.photo !== null && user?.photo !== '' &&
                                    <ModaleShow url={HTTP_FRONTEND_HOME + '' + user?.photo} title={auth?.user?.nom + " " + auth?.user?.prenom}>  <Avatar src={HTTP_FRONTEND_HOME + '' + user?.photo} alt={user?.nom} className='border-4  hover:shadow-lg' size="lg" /></ModaleShow>

                                }<div class="ml-2">
                                    <h1 class="text-gray-900 font-bold text-lg leading-5 mt-1 mb-0">{auth?.user?.nom + " " + auth?.user?.prenom}</h1>

                                    <span class="text-gray-600">{auth?.user?.email}</span>

                                </div>
                            </div>

                            <div class="mt-2 sm:mt-0">
                                <Chip size='sm' variant='ghost' value={user.role == 'ADMIN' ? "Administrateur" : 'Membre RCS'} />
                            </div>
                        </div>

                        <ul
                            class="bg-gray-100 mt-6 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3  divide-y rounded shadow-sm">
                            <li class="flex items-center py-3">
                                <span>Status du compte</span>
                                <span class="ml-auto">
                                    {(auth?.user?.etat == 1) ?
                                        <span class="bg-green-500 py-1 px-2 rounded text-white text-sm">Validé</span> :
                                        <span class="bg-yellow-500 py-1 px-2 rounded text-black text-sm">Non validé</span>
                                    }
                                </span>
                            </li>
                            <li class="flex items-center py-3">
                                <span>Vous êtes membre depuis</span>
                                <span class="ml-auto text-sm">{DateToFront(auth?.user?.created_at)}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:col-span-3 ">
                    <div class="bg-white md:py-2 py-4 ">
                    <div class="text-gray-700 relative">
                            <Link href={route('profile.edit')} className='text-xs absolute hover:bg-gray-800 rounded-md py-1 px-2 hover:text-white right-4 top-0 pap-2 flex'><CiEdit className='me-1 h-4 w-4'/> Modifier</Link>
                        <div class="grid lg:grid-cols-1 grid-cols-1 text-sm">
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Nom</div>
                                <div class="px-4 py-2">{auth?.user?.nom}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Prénom</div>
                                <div class="px-4 py-2">{auth?.user?.prenom}</div>
                            </div>
                            {auth?.user?.sexe!=null && auth?.user?.sexe!='' &&

                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Sexe</div>
                                <div class="px-4 py-2">{auth?.user?.sexe}</div>
                            </div>}
                            {auth?.user?.telephone!=null && auth?.user?.telephone!='' &&
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Contact No.</div>
                                <div class="px-4 py-2">{auth?.user?.telephone}</div>
                            </div>
                            }
                            {auth?.user?.adresse!=null && auth?.user?.adresse!='' &&
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Address</div>
                                <div class="px-4 py-2">{auth?.user?.adresse}</div>
                            </div>
                            }
                            {auth?.user?.email!=null && auth?.user?.email!='' &&
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Email</div>
                                <div class="px-4 py-2">
                                    <a class="text-blue-800" href={"mailto:"+auth?.user?.email}>{auth?.user?.email}</a>
                                </div>
                            </div>
                            }
                            {auth?.user?.date_naissance!=null && auth?.user?.date_naissance!='' &&                            
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Date de naissance</div>
                                <div class="px-4 py-2">{DateToFront(auth?.user?.date_naissance,i18n.language,'d/m/Y')}</div>
                            </div>
                            }
                        </div>
                    </div>
                    
                </div>
                    </div>
                                    
                    </div>
                </div>
                <div className=" space-y-6 max-w-screen-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-4">

                        <div className="p-4 sm:p-8 hover:shadow-md shadow-sm  bg-white dark:bg-gray-800   rounded-sm ">
                            <h2 className="text-xl font-bold">Mon compte</h2>
                            <p className="text-slate-500 dark:text-slate-100">Editer les informations de mon profil</p>
                            <Link href={route('profile.edit')}>
                                <Button color='white' variant='filled' size='md' className='mt-4  shadow-none border flex gap-2 text-gray-500 hover:border-blue-500 hover:text-blue-500
                           items-center'>  Editer <FaChevronRight /> </Button>  </Link>
                        </div>

                        <div className="p-4 sm:p-8 hover:shadow-md bg-white dark:bg-gray-800  rounded-sm shadow-sm shadow_rounded-md_sm:rounded-lg">
                            <h2 className="text-xl font-bold">Mot de passe</h2>
                            <p className="text-slate-500 dark:text-slate-100">Changer mon ancien mot de passe pour un nouveau</p>
                            <Link href={route('profile.favoris')}>
                                <Button color='white' variant='filled' size='md' className='mt-4  shadow-none border flex gap-2 text-gray-500 hover:border-blue-500 hover:text-blue-500
                           items-center'>  Changer <FaChevronRight /> </Button>
                            </Link>
                        </div>
                        <div className="p-4 sm:p-8 hover:shadow-md bg-white dark:bg-gray-800  rounded-sm shadow-sm shadow_rounded-md_sm:rounded-lg">
                            <h2 className="text-xl font-bold">Suppression</h2>
                            <p className="text-slate-500 dark:text-slate-100">Supprimer définitivement votre compte</p>
                            <Link href={route('profile.account_delete')}>
                                <Button color='white' variant='filled' size='md' className='mt-4  shadow-none border flex gap-2 text-gray-500 hover:border-red-500 hover:text-red-500
                           items-center'>  Supprimer <FaChevronRight /> </Button>
                            </Link>
                        </div>

                    </div>
                    {/*
                    <div className="p-4 sm:p-8 hover:shadow-md bg-white dark:bg-gray-800 rounded-sm shadow-sm shadow_rounded-md_sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 hover:shadow-md bg-white dark:bg-gray-800 rounded-sm shadow-sm shadow_rounded-md_sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>*/}
                </div>
            </div>
        </ProfilLayout>
    );
}
