import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, Link, usePage } from '@inertiajs/react';
import DashHeadTitle from '@/components/dashboard/DashHeadTitle';
import ActivityLayout from '@/Layouts/ActivityLayout';
import Pagination from '@/components/Pagination';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import default_photo1 from "@/assets/images/design/default_voiture.jpg";
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { LuUsers } from 'react-icons/lu';
import { BsCart4, BsEvStation, BsTaxiFront } from 'react-icons/bs';
import { IoHeartDislikeOutline, IoLogoCapacitor } from 'react-icons/io5';
import { TbCircuitCapacitorPolarized, TbHeartOff } from 'react-icons/tb';
import { MdOutlineCardTravel } from 'react-icons/md';
import { t } from 'i18next';
import { DateToFront, formaterMontant, setTarif } from '@/tools/utils';
import i18n from '@/i18n';
import { Chip, Tooltip } from '@material-tailwind/react';
import { FaHeartCrack } from 'react-icons/fa6';


export default function Favoris({ page_title, list_favoris, page_subtitle }) {
    const { auth } = usePage().props;
    return (
        <ActivityLayout
            user={auth.user} auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Mon compte</h2>}
        >
            <div className="py-6">
                <DashHeadTitle title={page_title} subtitle={page_subtitle} />
                <Head title={auth.user.prenom + " " + auth.user.nom + " | " + page_title} />

                <div className=" space-y-0">
                    {list_favoris?.data && list_favoris?.data?.map(({ created_at, locations, achats }, index) => (

                        <div key={index}>
                            {locations == null && achats != null &&
                                <>
                                    <FavoriAchat nom={achats?.voiture?.nom}
                                        id={achats?.id}
                                        photo={achats?.voiture?.photo}
                                        marque={achats?.voiture?.marque?.nom}
                                        nb_personne={achats?.voiture?.nombre_place}
                                        type_boite={achats?.voiture?.type_transmission}
                                        vitesse={achats?.voiture?.nombre_vitesse}
                                        nb_grande_valise={achats?.voiture?.nombre_grande_valise}
                                        nb_petite_valise={achats?.voiture?.nombre_petite_valise}
                                        volume_coffre={achats?.voiture?.volume_coffre}
                                        carburant={achats?.voiture?.type_carburant?.nom}
                                        puissance={achats?.voiture?.puissance_moteur}
                                        date_ajout={created_at}
                                        tarif={achats?.prix_vente}

                                    />
                                </>
                            }
                            {achats == null && locations != null &&
                                <FavoriLocation
                                    nom={locations?.voiture?.nom}
                                    id={locations?.id}
                                    photo={locations?.voiture?.photo}
                                    marque={locations?.voiture?.marque?.nom}
                                    nb_personne={locations?.voiture?.nombre_place}
                                    type_boite={locations?.voiture?.type_transmission}
                                    vitesse={locations?.voiture?.nombre_vitesse}
                                    nb_grande_valise={locations?.voiture?.nombre_grande_valise}
                                    nb_petite_valise={locations?.voiture?.nombre_petite_valise}
                                    volume_coffre={locations?.voiture?.volume_coffre}
                                    carburant={locations?.voiture?.type_carburant?.nom}
                                    puissance={locations?.voiture?.puissance_moteur}
                                    date_ajout={created_at}
                                    tarif={(setTarif(locations?.tarif_location_heure, locations?.tarif_location_journalier,
                                        locations?.tarif_location_hebdomadaire, locations?.tarif_location_mensuel))}


                                />
                            }

                        </div>

                    ))}
                    {list_favoris?.data?.length <= 0 &&

                        <div className='p-4 border py-32 bg-white dark:bg-slate-700/70 rounded-md shadow-sm text-center'>
                            <IoHeartDislikeOutline className='text-5xl text-slate-300 mb-4 mx-auto' />
                            <h2 className='text-lg'>  {t('La liste des favoris est vide !')}</h2>
                            <p className="text-sm text-slate-500">{t('Les voitures ajoutées à vos favoris apparaissent ici...')}</p>

                        </div>
                    }
                    <div className="py-2">
                        <Pagination links={list_favoris?.links} />
                    </div>
                </div>
            </div>
        </ActivityLayout>
    );
}

function FavoriAchat({ id = 0, nom, className, prix_defaut, photo, garantie, prix_vente, annee_fabrication, couleur, kilometrage, tarif, nb_personne, puissance, type_boite, carburant, nb_grande_valise, nb_petite_valise, vitesse, volume_coffre, marque, categorie, date_ajout }) {
    return (

        <div className="py-2 px-4 rounded-md_ border-b dark:border-slate-700 dark:bg-gray-800 dark:text-white dark:hover:bg-slate-800 hover:bg-slate-50 hover:shadow-lg border-emerald-500_ shadow-sm bg-white flex flex-wrap gap-2 md:gap-4 relative">
            <div className="md:absolute top-2 right-2"
                content={t('Retirer des favoris')}>
                <Link href={route('front.favoris.remove', { achat_id: id, type: "ACHAT" })}
                    method="post" className="flex px-4 dark:text-slate-100 rounded-md hover:text-white bg-red-700 text-white md:text-black md:bg-transparent hover:bg-red-700 transition-all duration-500 text-xs items-center py-3 md:py-1 font-medium gap-2 uppercase">
                    <TbHeartOff className=" h-4 w-4" /> <span className=''>Retirer des favoris</span>
                </Link>
            </div>
            <div>
                {(photo != null && photo != '') ? <Link href={route('front.achat', { 'id': id })}>
                    <LazyLoadImage className=" rounded-md md:max-h-20  mx-auto w-full max-w-full transition-all duration-500 object-cover shadow-sm object-center" src={HTTP_FRONTEND_HOME + '' + photo} alt={nom} />
                </Link>
                    :
                    <Link href={route('front.achat', { 'id': id })}>
                        <LazyLoadImage className=" rounded-md h-20 w-full bg-[#fed023] mx-auto_ w-full_h-full_max-w-full hover:scale-125 transition-all duration-500 object-contain shadow-sm object-center" src={default_photo1} alt={nom} />
                    </Link>
                }
            </div>
            <div className='relative'>

                <div className="flex w-full flex-wrap  gap-2 md:gap-4 me-24">

                    <Link href={route('front.achat', { 'id': id })}> <h3 className=" font-bold">{nom}</h3></Link>
                    <div className=" font-bold text-red-500">{formaterMontant(tarif, i18n.language)}</div>
                    <div className="text-md mb-2 font-normal text-slate-600 dark:text-white">{annee_fabrication ? ' - ' + annee_fabrication : ''}</div>
                </div>
                <div className="flex gap-4 flex-wrap text-slate-500">
                    {nb_personne > 0 &&
                        <div title={t('Nombre places')} className="flex mb-2">
                            <LuUsers className='me-1 dark:text-white' />
                            <div className='text-sm font-normal'>{nb_personne} personnes</div>
                        </div>
                    }
                    {carburant != null && carburant != '' &&
                        <div className="flex mb-2">
                            <div title={t('Type de carburant')}>
                                <BsEvStation className='h-5 leading-5 me-1  dark:text-white' />
                            </div>
                            <div className='text-sm font-normal'>{carburant}</div>
                        </div>
                    }
                    {puissance != null && puissance != '' &&
                        <div className="flex mb-2">
                            <div title={t('Puissance du moteur')}>
                                <IoLogoCapacitor className='h-5 leading-5 me-1  dark:text-white' />
                            </div>
                            <div className='text-sm font-normal'>{puissance}</div>
                        </div>
                    }

                    {type_boite != null &&
                        <div className="flex mb-2">
                            <div title={t('Type de boite')}>
                                <TbCircuitCapacitorPolarized className='h-5 leading-5 me-1  dark:text-white' />
                            </div>
                            <div className='text-sm font-normal'>{type_boite}</div>
                        </div>
                    }


                    {vitesse > 0 &&
                        <div className="flex mb-2">
                            <div title={t('Nombre vitesses')}>
                                <LazyLoadImage className='h-5 leading-5 me-1  dark:text-white' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgUlEQVR4nO2U4QqAIAyE790yaPT+/6of2XsYA4tJsFQWVPjBYHDHjiEOaBQyAtgAeABkpCWwIcRajbSEWRgnIy3BCWNnpF04jJbaTwNCZb0n4Ptv8EiAE0buJb2iZQfIL8+9ZFG07IDag+ZutjuhOIgHDAWatrkJPvdc10LKdg2o7ExWkc4uK+5nAAAAAElFTkSuQmCC" />

                            </div>
                            <div className='text-sm  font-normal'>{vitesse} Vitesse{vitesse > 1 ? 's' : null}</div>
                        </div>
                    }

                    {volume_coffre != null &&
                        <div title={t('Volume du coffre')} className="flex mb-2">
                            <div>
                                <BsTaxiFront className='me-1 dark:text-white' />
                            </div>
                            <div className='text-sm  font-normal'>{volume_coffre}</div>
                        </div>
                    }
                    {nb_grande_valise > 0 &&
                        <div className="flex mb-2">
                            <div title={t('Nombre de grandes valises')}>
                                <MdOutlineCardTravel className=' h-5 leading-5 me-1 dark:text-white' />
                            </div>
                            <div className='text-sm  font-normal'>{nb_grande_valise} Grande{nb_petite_valise > 1 ? 's' : null} valise{nb_grande_valise > 1 ? 's' : null}</div>
                        </div>
                    }
                    {nb_petite_valise > 0 &&

                        <div className="flex mb-2">
                            <div title={t('Nombre de petites valises')}>
                                <svg className='h-4 w-4 me-1 dark:text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="m 15 14.75 H 9 a 0.75 0.75 0 0 1 0 -1.5 h 6 a 0.75 0.75 0 0 1 0 1.5 z M 15.75 18 C 15.745 17.588 15.412 17.255 15 17.25 H 9 a 0.75 0.75 0 0 0 0 1.5 h 6 c 0.412 -0.005 0.745 -0.338 0.75 -0.75 z m 3 -6.5 v 9 c 0 1.243 -1.007 2.25 -2.25 2.25 h -0.75 v 0.5 a 0.75 0.75 0 0 1 -1.5 0 v -0.5 h -4.5 v 0.5 a 0.75 0.75 0 0 1 -1.5 0 v -0.5 H 7.5 c -1.243 0 -2.25 -1.007 -2.25 -2.25 v -9 c 0 -1.243 1.007 -2.25 2.25 -2.25 h 1.75 v -8 C 9.25 0.56 9.81 0 10.5 0 h 3 c 0.69 0 1.25 0.56 1.25 1.25 v 8 h 1.75 c 1.243 0 2.25 1.007 2.25 2.25 z m -8 -2.25 h 2.5 V 1.5 h -2.5 z m 6.5 2.25 C 17.245 11.088 16.912 10.755 16.5 10.75 h -9 C 7.088 10.755 6.755 11.088 6.75 11.5 v 9 c 0.005 0.412 0.338 0.745 0.75 0.75 h 9 c 0.412 -0.005 0.745 -0.338 0.75 -0.75 z"></path>
                                </svg>
                            </div>
                            <div className='text-sm font-normal'>{nb_petite_valise} petite{nb_petite_valise > 1 ? 's' : null} valise{nb_petite_valise > 1 ? 's' : null}</div>
                        </div>
                    }
                </div>
                {date_ajout != null &&
                    <div className='text-xs text-slate-600 dark:text-slate-400 flex flex-wrap'>
                        Ajouté le {DateToFront(date_ajout)}    <span className="bg-emerald-500 block mx-2 text-white tex-xs px-2 py-0 rounded-full">À vendre</span>
                    </div>}
            </div>
        </div>
    )
}
function FavoriLocation({ id = 0, nom, className, prix_defaut, photo, garantie, prix_vente, annee_fabrication, couleur, kilometrage, tarif, nb_personne, puissance, type_boite, carburant, nb_grande_valise, nb_petite_valise, vitesse, volume_coffre, marque, categorie, date_ajout }) {
    return (

        <div className="py-2 px-4 rounded-md_ border-b dark:border-slate-700 dark:bg-gray-800 dark:text-white dark:hover:bg-slate-800 hover:bg-slate-50 hover:shadow-lg border-yellow-500_ shadow-sm bg-white flex flex-wrap gap-2 md:gap-4  relative">
            <div className="md:absolute top-2 right-2 text-center"
                content={t('Retirer des favoris')}>
                <Link href={route('front.favoris.remove', { location_id: id, type: "LOCATION" })}
                    method="post" className="flex px-4 dark:text-slate-100  rounded-md hover:text-white  bg-red-700 text-white md:text-black md:bg-transparent hover:bg-red-700 transition-all duration-500 text-xs items-center py-3 md:py-1 font-medium gap-2 uppercase">
                    <TbHeartOff className=" h-4 w-4" /> <span className=''>Retirer des favoris</span>
                </Link>
            </div>
            <div>
                {(photo != null && photo != '') ? <Link href={route('front.location', { 'id': id })}>
                    <LazyLoadImage className=" rounded-md md:max-h-20  mx-auto w-full max-w-full transition-all duration-500 object-cover shadow-sm object-center" src={HTTP_FRONTEND_HOME + '' + photo} alt={nom} />
                </Link>
                    :
                    <Link href={route('front.location', { 'id': id })}>
                        <LazyLoadImage className=" rounded-md h-20 w-full bg-[#fed023] mx-auto_ w-full_h-full_max-w-full hover:scale-125 transition-all duration-500 object-contain shadow-sm object-center" src={default_photo1} alt={nom} />
                    </Link>
                }
            </div>
            <div className='relative'>

                <div className="flex w-auto flex-wrap gap-2 md:gap-4 me-24">

                    <Link href={route('front.location', { 'id': id })}> <h3 className=" font-bold">{nom}</h3></Link>
                    {tarif && <div className='flex gap-2 text-sm text-slate-500'>À  partir de <div className=" font-bold text-md text-red-500">{tarif}</div></div>}
                    {annee_fabrication && <div className="text-md mb-2 font-normal text-slate-600 dark:text-white">{annee_fabrication ? ' - ' + annee_fabrication : ''}
                    </div>}
                </div>
                <div className="flex gap-4 flex-wrap text-slate-500">
                    {nb_personne > 0 &&
                        <div title={t('Nombre places')} className="flex mb-2">
                            <LuUsers className='me-1 dark:text-white' />
                            <div className='text-sm font-normal'>{nb_personne} personnes</div>
                        </div>
                    }
                    {carburant != null && carburant != '' &&
                        <div className="flex mb-2">
                            <div title={t('Type de carburant')}>
                                <BsEvStation className='h-5 leading-5 me-1  dark:text-white' />
                            </div>
                            <div className='text-sm font-normal'>{carburant}</div>
                        </div>
                    }
                    {puissance != null && puissance != '' &&
                        <div className="flex mb-2">
                            <div title={t('Puissance du moteur')}>
                                <IoLogoCapacitor className='h-5 leading-5 me-1  dark:text-white' />
                            </div>
                            <div className='text-sm font-normal'>{puissance}</div>
                        </div>
                    }

                    {type_boite != null &&
                        <div className="flex mb-2">
                            <div title={t('Type de boite')}>
                                <TbCircuitCapacitorPolarized className='h-5 leading-5 me-1  dark:text-white' />
                            </div>
                            <div className='text-sm font-normal'>{type_boite}</div>
                        </div>
                    }


                    {vitesse > 0 &&
                        <div className="flex mb-2">
                            <div title={t('Nombre vitesses')}>
                                <LazyLoadImage className='h-5 leading-5 me-1  dark:text-white' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgUlEQVR4nO2U4QqAIAyE790yaPT+/6of2XsYA4tJsFQWVPjBYHDHjiEOaBQyAtgAeABkpCWwIcRajbSEWRgnIy3BCWNnpF04jJbaTwNCZb0n4Ptv8EiAE0buJb2iZQfIL8+9ZFG07IDag+ZutjuhOIgHDAWatrkJPvdc10LKdg2o7ExWkc4uK+5nAAAAAElFTkSuQmCC" />
                            </div>
                            <div className='text-sm  font-normal'>{vitesse} Vitesse{vitesse > 1 ? 's' : null}</div>
                        </div>
                    }

                    {volume_coffre != null &&
                        <div title={t('Volume du coffre')} className="flex mb-2">
                            <div>
                                <BsTaxiFront className='me-1 dark:text-white' />
                            </div>
                            <div className='text-sm  font-normal'>{volume_coffre}</div>
                        </div>
                    }
                    {nb_grande_valise > 0 &&
                        <div className="flex mb-2">
                            <div title={t('Nombre de grandes valises')}>
                                <MdOutlineCardTravel className=' h-5 leading-5 me-1 dark:text-white' />
                            </div>
                            <div className='text-sm  font-normal'>{nb_grande_valise} Grande{nb_petite_valise > 1 ? 's' : null} valise{nb_grande_valise > 1 ? 's' : null}</div>
                        </div>
                    }
                    {nb_petite_valise > 0 &&

                        <div className="flex mb-2">
                            <div title={t('Nombre de petites valises')}>
                                <svg className='h-4 w-4 me-1 dark:text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="m 15 14.75 H 9 a 0.75 0.75 0 0 1 0 -1.5 h 6 a 0.75 0.75 0 0 1 0 1.5 z M 15.75 18 C 15.745 17.588 15.412 17.255 15 17.25 H 9 a 0.75 0.75 0 0 0 0 1.5 h 6 c 0.412 -0.005 0.745 -0.338 0.75 -0.75 z m 3 -6.5 v 9 c 0 1.243 -1.007 2.25 -2.25 2.25 h -0.75 v 0.5 a 0.75 0.75 0 0 1 -1.5 0 v -0.5 h -4.5 v 0.5 a 0.75 0.75 0 0 1 -1.5 0 v -0.5 H 7.5 c -1.243 0 -2.25 -1.007 -2.25 -2.25 v -9 c 0 -1.243 1.007 -2.25 2.25 -2.25 h 1.75 v -8 C 9.25 0.56 9.81 0 10.5 0 h 3 c 0.69 0 1.25 0.56 1.25 1.25 v 8 h 1.75 c 1.243 0 2.25 1.007 2.25 2.25 z m -8 -2.25 h 2.5 V 1.5 h -2.5 z m 6.5 2.25 C 17.245 11.088 16.912 10.755 16.5 10.75 h -9 C 7.088 10.755 6.755 11.088 6.75 11.5 v 9 c 0.005 0.412 0.338 0.745 0.75 0.75 h 9 c 0.412 -0.005 0.745 -0.338 0.75 -0.75 z"></path>
                                </svg>
                            </div>
                            <div className='text-sm font-normal'>{nb_petite_valise} petite{nb_petite_valise > 1 ? 's' : null} valise{nb_petite_valise > 1 ? 's' : null}</div>
                        </div>
                    }
                </div>
                {date_ajout != null &&
                    <div className='text-xs text-slate-600 dark:text-slate-400 flex flex-wrap'>
                        Ajouté le {DateToFront(date_ajout)}   <span className="bg-yellow-500 dark:text-black block mx-2 tex-xs px-2 py-0 rounded-full">
                            En location</span>
                    </div>}
            </div>
        </div>
    )
}