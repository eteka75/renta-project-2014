{/*import { HTTP_FRONTEND_HOME } from "@/tools/constantes";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsEvStation, BsTaxiFront } from "react-icons/bs";
import { IoInformationCircleOutline, IoLogoCapacitor } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { MdOutlineCardTravel, MdOutlineSignalWifiStatusbarNull } from "react-icons/md";
import { TbCircuitCapacitorPolarized, TbWindowMaximize } from "react-icons/tb";
import ModaleImage from "../ModaleImage";
import { FaLightbulb, FaMapMarkerAlt, FaRegImages, FaSmoking } from "react-icons/fa";
import { Button, Card, CardBody, Tooltip } from "@material-tailwind/react";
import { formaterMontant } from "@/tools/utils";
import i18n from "@/i18n";
import { GiCarDoor, GiFuelTank, GiSuspensionBridge } from "react-icons/gi";

function LocaVoitureCard({ id = 0, nom, photo, tarif, className, nb_personne, puissance, type_boite, carburant, nb_grande_valise, nb_petite_valise, vitesse, volume_coffre, marque, categorie }) {
    const { t } = useTranslation()
    return (
        <div className=" bg-white mb-4 shadow-sm  relative hover:bg-gray-50 hover:shadow-lg  transition-all duration-500 shadow-inner_ border border-gray-100 rounded-lg  dark:bg-gray-800 dark:text-white dark:border-gray-700">
            <div className="p-3 lg:p-4">
                <Link href={route('front.location', { 'id': id })}>
                    <img className=" rounded-md h-64 md:h-52  transition-all duration-300  mx-auto w-full max-w-full border object-cover shadow-sm object-center" src={HTTP_FRONTEND_HOME + '' + photo} alt={nom} />
                </Link>
            </div>
            <div className="px-4 md:mb-12 pb-4 md:min-h-[10vh]">
                <Link href={route('front.location', { 'id': id })}>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{nom}</h5>
                </Link>
                <div className="flex">
                    <div className="text-sm mb-2 font-normal text-slate-600 dark:text-white">{marque}</div>
                </div>
                <div className="grid dark:text-white text-slate-800 grid-cols-2 items-center mt-2.5 mb-5">
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
                                <img className='h-5 leading-5 me-1  dark:text-white' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgUlEQVR4nO2U4QqAIAyE790yaPT+/6of2XsYA4tJsFQWVPjBYHDHjiEOaBQyAtgAeABkpCWwIcRajbSEWRgnIy3BCWNnpF04jJbaTwNCZb0n4Ptv8EiAE0buJb2iZQfIL8+9ZFG07IDag+ZutjuhOIgHDAWatrkJPvdc10LKdg2o7ExWkc4uK+5nAAAAAElFTkSuQmCC" />

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
                <div className='py-4 hidden grid_grid-cols-2 border-1 border-b mb-4 border-t'>
                    <div>
                        <a className=' text-sm font-bold text-blue-500 flex' href="">
                            <AiOutlineInfoCircle className="me-1 dark:text-white text-xl" /> Infos importantes</a>
                    </div>
                    <div>
                        <div className="flex items-center ">
                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                            </div>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
                        </div>
                    </div>
                </div>

            </div>
            <div className="p-4 md:absolute dark:bg-gray-800 dark:text-white dark:border-gray-700 left-0 right-0 w-full bottom-0 bg-gray-100 border-t rounded-b-md">
                <div className="md:flex  items-center justify-between">
                    {tarif && <div className="text-sm text-center marker:text-start py-2 md:py-0 font-bold text-gray-600 dark:text-white">{t('À partir de')} {tarif}</div>}
                    <Link href={route('front.location', { 'id': id })} className="text-white block md:inline-block bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Voir l'offre</Link>
                </div>
            </div>
        </div>
    )
}

function LocaVoitureCard2({ id = 0, nom, photo, tarif,points, nb_personne, puissance, type_boite, carburant, nb_grande_valise, nb_petite_valise, vitesse, volume_coffre, marque, categorie, nb_images }) {
    const { t } = useTranslation()
    return (
        <>
        {console.log("points",points)}
            <div className="md:grid hover:shadow-lg transition-all duration-500 mb-4 border rounded-lg shadow-sm bg-white md:grid-cols-3">
                <div className="md:col-span-1 relative justify-center items-center border-r p-4">
                <Link className="relative" href={route('front.location', { 'id': id })}>
                        {photo && <img src={HTTP_FRONTEND_HOME + "" + photo} className='h-fullmax-w-full rounded-lg object-cover shadow-sm object-center' alt={nom} />}
                    {nb_images >0 && <span className="text-white absolute pb-4 bg-[rgba(0,0,0,.48)] px-2 rounded-sm h-4 top-2 right-2 flex gap-1 text-xs"><FaRegImages className="h-4 w-4 "/>{parseInt(nb_images)+1} </span>}
                </Link>
                </div>
                <div className="md:col-span-2  md:rounded-r-sm md:border-l-0 p-4">
                    
                    <div className="flex pb-2 border-b items-center gap-2"><span className="text-slate-500 text-sm">À partir de </span> <h3 className="text-md md:text-lg  font-bold text-red-600">{tarif}</h3></div>
                    <div>
                        <div className="grid grid-cols-2 lg:grid-cols-3 text-slate-800 items-center py-4 pb-2">
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
                                        <img className='h-5 leading-5 me-1  dark:text-white' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgUlEQVR4nO2U4QqAIAyE790yaPT+/6of2XsYA4tJsFQWVPjBYHDHjiEOaBQyAtgAeABkpCWwIcRajbSEWRgnIy3BCWNnpF04jJbaTwNCZb0n4Ptv8EiAE0buJb2iZQfIL8+9ZFG07IDag+ZutjuhOIgHDAWatrkJPvdc10LKdg2o7ExWkc4uK+5nAAAAAElFTkSuQmCC" />

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
                        {Array.isArray(points) && points?.length>0 &&
                        <Tooltip placement="top-start" content={"Points de retrait"} >
                            <div className="flex flex-w pb-2 gap-1  text-sm items-center  text-light">
                                <div className="flex min-w-max">
                                <FaMapMarkerAlt className="me-1 h-4 w-4" />
                                   Point{points?.length>1?'s':''} de retrait :
                                </div>
                                   
                                {points?.map(({lieu,id},index)=>{
                                    let l_cl=(index+1==points.length)?'fin':' /';
                                    return(
                                    <div key={index} className="flex text-slate-400  w-auto font-light flex-wrap">
                                    <div className="w-auto text-sm flex">  {lieu+l_cl}</div>
                                    </div>)
                                })} 
                        </div>
                        </Tooltip>
                        }
                        <div className="relative">
                            <div className="px-4 py-2 left-0 right-0 w-full bottom-0 bg-gray-100">
                                <div className="md:flex  items-center justify-between">
                                    {tarif && <div className="text-md text-center marker:text-start py-2 md:py-0 font-bold gap-1 text-blue-600 flex dark:text-white"><IoInformationCircleOutline className="h-6 w-4"/> Autres informations </div>}
                                    <Link href={route('front.location', { 'id': id })} className="text-white block md:inline-block bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Voir l'offre</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

function MiniCard({nom,info,image,slug,id=0}){
    return(
        <div className="border shadow-sm hover:bg-zinc-50 flex justify-between  rounded-lg  h-min-20">
            <div className='p-4'>
               <Link href={route('front.marq_voiture',{'slug':slug,'id':id})}><h3 className='font-bold text-xl'>{nom}</h3></Link> 
                <small className='text-slate-500'>{info} </small>
            </div>
            <div className=''>
            {image && 
            <Link href={route('front.marq_voiture',{'slug':slug,'id':id})}> <img className='h-12 m-4' src={HTTP_FRONTEND_HOME+''+image} alt={nom} /></Link> 
            }
            </div>
        </div>
    )
}


function VenteVoitureCard({ id = 0, nom, className, photo,garantie,prix_vente, annee_fabrication,couleur,kilometrage, tarif, nb_personne, puissance, type_boite, carburant, nb_grande_valise, nb_petite_valise, vitesse, volume_coffre, marque, categorie }) {
    const { t } = useTranslation()
    return (
<div className={className}>
        <div className=" bg-white mb-4 shadow-sm max-w-[500px] _mx-auto relative hover:shadow-lg  transition-all duration-500 shadow-inner_ border border-gray-100 rounded-lg  dark:bg-gray-800 dark:text-white dark:border-gray-700">
            <div className="">
                <Link href={route('front.achat', { 'id': id })}>
                    <img className=" rounded-t-md h-48  mx-auto w-full max-w-full  object-cover shadow-sm object-center" src={HTTP_FRONTEND_HOME + '' + photo} alt={nom} />
                </Link>
            </div>
            { garantie && 
            <div className="p-2 px-4 bg-emerald-500 text-white font-bold">Garantie 2 ans</div>
            }
            <div className="px-4 pt-3 ">
                <Link href={route('front.achat', { 'id': id })}>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{nom}</h5>
                </Link>
                <div className="flex">
                    <div className="text-sm mb-2 font-normal text-slate-600 dark:text-white">{marque}</div>
                </div>
                </div>
            <div>
                <div className="inner-card px-4">
                    {kilometrage!=null && 
                <div className="flex  border-t bg-zinc-50_shadow-sm justify-start py-2 border-b border-slate-100 flex-wrap bg gap-4  ">
                    <div className=' w-1/3 md:w-1/4 font-bold'>
                        {t('Catégorie')} 
                    </div>
                    <div  className='text-sm text-slate-500'>
                        {categorie}
                    </div>
                </div>}
                    {kilometrage!=null && 
                <div className="flex   bg-zinc-50_shadow-sm justify-start py-2 border-b border-slate-100 flex-wrap bg gap-4  ">
                    <div className=' w-1/3 md:w-1/4 font-bold'>
                        {t('Kilométrage')} 
                    </div>
                    <div  className='text-sm text-slate-500'>
                        {kilometrage}
                    </div>
                </div>}
                {carburant != "null" &&
                    <div className="flex   py-2 border-b justify-start border-slate-100 flex-wrap gap-4  ">
                        <div className='w-1/3 md:w-1/4 font-bold'>
                            {t('Carburation')}
                        </div>
                        <div className='text-sm text-slate-500'>
                            {carburant}
                        </div>
                    </div>
                }
                {annee_fabrication != null &&
                    <div className="flex   py-2 border-b justify-start border-slate-100 flex-wrap gap-4  ">
                        <div className='w-1/3 md:w-1/4 font-bold'>
                            {t('Année')}
                        </div>
                        <div className='text-sm text-slate-500'>
                            {annee_fabrication}
                        </div>
                    </div>
                }
                {prix_vente != null &&
                    <div className="flex   py-2 border-b justify-start border-slate-100 flex-wrap gap-4  ">
                        <div className='w-1/3 md:w-1/4 font-bold'>
                            {t('Prix')}
                        </div>
                        <div className='text-sm text-slate-500'>
                            {formaterMontant(prix_vente,i18n.language)}
                        </div>
                    </div>
                }
                
                {couleur != null &&
                    <div className="flex justify-between py-4 border-b   flex-wrap gap-4  ">
                        <div className='w-1/3 md:w-1/4 font-bold'>
                            {t('Couleur')}
                        </div>
                        <div>
                            {couleur}
                        </div>
                    </div>
                }
                </div>
                <div className="p-4">
                    <Link className=" p-" href={route('front.achat',id)}>                    
                            <Button color='black' className="w-fulls dark:text-white" >
                                Consulter l'offre
                            </Button>
                    </Link>
            </div>*/}
                {/************************************** */}
          {/*      { false && 
                <div className="grid grid-cols-2 items-center mt-2.5 mb-5">
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
                                <img className='h-5 leading-5 me-1  dark:text-white' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgUlEQVR4nO2U4QqAIAyE790yaPT+/6of2XsYA4tJsFQWVPjBYHDHjiEOaBQyAtgAeABkpCWwIcRajbSEWRgnIy3BCWNnpF04jJbaTwNCZb0n4Ptv8EiAE0buJb2iZQfIL8+9ZFG07IDag+ZutjuhOIgHDAWatrkJPvdc10LKdg2o7ExWkc4uK+5nAAAAAElFTkSuQmCC" />

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
                    }
                <div className='py-4 hidden grid_grid-cols-2 border-1 border-b mb-4 border-t'>
                    <div>
                        <a className=' text-sm font-bold text-blue-500 flex' href="">
                            <AiOutlineInfoCircle className="me-1 dark:text-white text-xl" /> Infos importantes</a>
                    </div>
                    
                </div>

            </div>
        </div>
        </div>
    )
}

function ShowInfo({ id = 0, nom, photo, tarif, np_portes,consommation, dimenssions, eclairage, emission_co2, suspenssion, capacite, nb_personne, puissance, type_boite, carburant, nb_grande_valise, nb_petite_valise, vitesse, volume_coffre, marque, categorie }) {
    const { t } = useTranslation()
    
    return (
        <div >
            <Card className='border shadow-none'>
                <CardBody>

                    <h2 className="text-slate-600 font-bold">
                        {t('Caractéristiques')}
                    </h2>
                    <div className="sm:grid sm:grid-cols-2 items-center mt-4 mb-5">
                        {nb_personne > 0 &&
                            <Tooltip placement="top-start" className="flex" content={t("Nombre places")}>
                                <div className="flex mb-3">
                                    <LuUsers className='me-2 h-6 w-8 dark:text-white' />
                                    <div className='text-xl font-normal'>{nb_personne} personnes</div>
                                </div>
                            </Tooltip>
                        }
                        {carburant != null && carburant != '' &&
                            <Tooltip placement="top-start" content={t('Type de carburant')}>

                                <div className="flex mb-3">
                                    <div title={t('Type de carburant')}>
                                        <BsEvStation className='h-6 w-8 leading-10 me-2  dark:text-white' />
                                    </div>
                                    <div className='text-xl font-normal'>{carburant}</div>
                                </div>
                            </Tooltip>
                        }
                        {puissance != null && puissance != '' &&
                            <Tooltip placement="top-start" content={t('Puissance du moteur')}>
                                <div className="flex mb-3">
                                    <div title={t('Puissance du moteur')}>
                                        <IoLogoCapacitor className='h-6 w-8 leading-10 me-2  dark:text-white' />
                                    </div>
                                    <div className='text-xl font-normal'>{puissance}</div>
                                </div>
                            </Tooltip>
                        }

                        {type_boite != null &&
                            <Tooltip placement="top-start" content={t('Type de boite')}>
                                <div className="flex mb-3">
                                    <div title={t('Type de boite')}>
                                        <TbCircuitCapacitorPolarized className='h-6 w-8 leading-10 me-2  dark:text-white' />
                                    </div>
                                    <div className='text-xl font-normal'>{type_boite}</div>
                                </div>
                            </Tooltip>
                        }
                        {np_portes != null &&
                            <Tooltip placement="top-start" content={t('Nombre de portes')}>
                                <div className="flex mb-3">
                                    <div title={t('Nombre de portes')}>
                                        <GiCarDoor  className='h-6 w-8 leading-10 me-2  dark:text-white' />
                                    </div>
                                    <div className='text-xl font-normal'>{np_portes} porte{np_portes>1?'s':null}</div>
                                </div>
                            </Tooltip>
                        }


                        {vitesse > 0 &&
                            <Tooltip placement="top-start" content={t('Nombre vitesses')}>

                                <div className="flex mb-3">
                                    <div title={t('Nombre vitesses')}>
                                        <img className='h-6 w-8 leading-10 me-2  dark:text-white' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgUlEQVR4nO2U4QqAIAyE790yaPT+/6of2XsYA4tJsFQWVPjBYHDHjiEOaBQyAtgAeABkpCWwIcRajbSEWRgnIy3BCWNnpF04jJbaTwNCZb0n4Ptv8EiAE0buJb2iZQfIL8+9ZFG07IDag+ZutjuhOIgHDAWatrkJPvdc10LKdg2o7ExWkc4uK+5nAAAAAElFTkSuQmCC" />

                                    </div>
                                    <div className='text-xl  font-normal'>{vitesse} Vitesse{vitesse > 1 ? 's' : null}</div>
                                </div>
                            </Tooltip>
                        }

                        {volume_coffre != null &&
                            <Tooltip placement="top-start" content={t('Type de carburant')}>

                                <div title={t('Type de carburant')} className="flex mb-3">
                                    <div>
                                        <BsTaxiFront className='h-6 w-8 leading-8 me-2 dark:text-white' />
                                    </div>
                                    <div className='text-xl  font-normal'>{volume_coffre}</div>
                                </div>
                            </Tooltip>
                        }
                        {nb_grande_valise > 0 &&
                            <Tooltip placement="top-start" content={t('Nombre de grandes valises')}>
                                <div className="flex mb-3">
                                    <div title={t('Nombre de grandes valises')}>
                                        <MdOutlineCardTravel className=' h-6 w-8 leading-10 me-2 dark:text-white' />
                                    </div>
                                    <div className='text-xl  font-normal'>{nb_grande_valise} Grande{nb_petite_valise > 1 ? 's' : null} valise{nb_grande_valise > 1 ? 's' : null}</div>
                                </div>
                            </Tooltip>
                        }
                        {nb_petite_valise > 0 &&
                            <Tooltip placement="top-start" content={t('Nombre de petites valises')}>

                                <div className="flex mb-3">
                                    <div title={t('Nombre de petites valises')}>
                                        <svg className='h-6 w-8 me-2 dark:text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="m 15 14.75 H 9 a 0.75 0.75 0 0 1 0 -1.5 h 6 a 0.75 0.75 0 0 1 0 1.5 z M 15.75 18 C 15.745 17.588 15.412 17.255 15 17.25 H 9 a 0.75 0.75 0 0 0 0 1.5 h 6 c 0.412 -0.005 0.745 -0.338 0.75 -0.75 z m 3 -6.5 v 9 c 0 1.243 -1.007 2.25 -2.25 2.25 h -0.75 v 0.5 a 0.75 0.75 0 0 1 -1.5 0 v -0.5 h -4.5 v 0.5 a 0.75 0.75 0 0 1 -1.5 0 v -0.5 H 7.5 c -1.243 0 -2.25 -1.007 -2.25 -2.25 v -9 c 0 -1.243 1.007 -2.25 2.25 -2.25 h 1.75 v -8 C 9.25 0.56 9.81 0 10.5 0 h 3 c 0.69 0 1.25 0.56 1.25 1.25 v 8 h 1.75 c 1.243 0 2.25 1.007 2.25 2.25 z m -8 -2.25 h 2.5 V 1.5 h -2.5 z m 6.5 2.25 C 17.245 11.088 16.912 10.755 16.5 10.75 h -9 C 7.088 10.755 6.755 11.088 6.75 11.5 v 9 c 0.005 0.412 0.338 0.745 0.75 0.75 h 9 c 0.412 -0.005 0.745 -0.338 0.75 -0.75 z"></path>
                                        </svg>
                                    </div>
                                    <div className='text-xl font-normal'>{nb_petite_valise} petite{nb_petite_valise > 1 ? 's' : null} valise{nb_petite_valise > 1 ? 's' : null}</div>
                                </div>
                            </Tooltip>
                        }
                        {capacite != null &&

                            <Tooltip placement="top-start" content={t('Capacité du réservoir')}>
                                <div className="flex mb-3">
                                    
                                    <GiFuelTank className=' h-6 w-8 leading-10 me-2 dark:text-white' />
                                    <div className='text-xl font-normal'>{capacite} </div>
                                </div>
                            </Tooltip>
                        }
                        {consommation != null &&

                            <Tooltip placement="top-start" content={t('Consommation du moteur')}>
                                <div className="flex mb-3">
                                    
                                    <MdOutlineSignalWifiStatusbarNull  className=' h-6 w-8 leading-10 me-2 dark:text-white' />
                                    <div className='text-xl font-normal'>{consommation} </div>
                                </div>
                            </Tooltip>
                        }
                        {eclairage != null &&
                            <Tooltip placement="top-start" content={t("Type d'éclairage")}>
                                <div className="flex mb-3">
                                    <div className='flex' >
                                        <FaLightbulb className=' h-6 w-6 leading-10 me-2 dark:text-white' />
                                        <div className='text-xl font-normal'>{eclairage} </div>
                                    </div>
                                </div>
                            </Tooltip>
                        }
                        {emission_co2 != null &&
                            <Tooltip placement="top-start" content={t('Emission du co2')}>
                                <div className="flex mb-3">

                                    <div className='flex'>
                                        <FaSmoking className=' h-6 w-6 leading-10 me-2 dark:text-white' />
                                        <div className='text-xl font-normal'>{emission_co2} </div>
                                    </div>
                                </div>
                            </Tooltip>
                        }
                        {suspenssion != null &&
                            <Tooltip placement="top-start" content={t("Type de suspenssion")}>
                                <div className="flex mb-3">
                                    <div className='flex'>
                                        <GiSuspensionBridge className=' h-6 w-6 leading-10 me-2 dark:text-white' />

                                        <div className='text-xl font-normal'>{suspenssion} </div>
                                    </div>
                                </div>
                            </Tooltip>
                        }
                        {dimenssions != null &&
                            <Tooltip placement="top-start" content={t("Dimessions")}>
                                <div className="flex mb-3">
                                    <div className='flex'>
                                        <TbWindowMaximize  className=' h-6 w-6 leading-10 me-2 dark:text-white' />
                                        <div className='text-xl font-normal'>{dimenssions} </div>
                                    </div>
                                </div>
                            </Tooltip>
                        }
                    </div>

                </CardBody>
            </Card>
        </div>
    )
}

export { LocaVoitureCard, LocaVoitureCard2, MiniCard, VenteVoitureCard,ShowInfo};
*/}