import React from 'react'

import FrontLayout from '@/Layouts/FrontLayout'
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs'
import PageTitle from '@/components/front/PageTitle'
import { LocaVoitureCard, LocaVoitureCard2, MiniCard, ModalInfo } from '@/components/locations/LocaVoitureCard';
import { useState } from 'react';;


import "../../Index.css"


/**Icones */
import { FiShoppingCart } from "react-icons/fi";
import { FaCarAlt, FaCarCrash, FaChevronLeft } from "react-icons/fa";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdCarRental } from "react-icons/md";

/** fin Icones */

import { Link, useForm } from '@inertiajs/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "react-tailwindcss-datepicker";
import { AiOutlineSearch } from 'react-icons/ai';
//import "@/css/bg.css"
import { useEffect } from 'react';
import { DateToDbFormat, DateToFront, default_heures, default_minutes, formaterDateHeure, formaterHeure, setTarif } from '@/tools/utils';
import i18n from '@/i18n';
import { Button, ButtonGroup, Card, CardBody } from '@material-tailwind/react';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import Pagination from '@/components/Pagination';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ModaleShow from '@/components/ModaleShow';
import { FaRegRectangleList } from 'react-icons/fa6';
import { TfiLayoutListLargeImage } from 'react-icons/tfi';
export default function SearchLocation({ search, locations, page_title, local, locals, first_ville }) {
    const [grid, setGrid] = useState(false);
    const active_gclass="bg-gray-900 text-white";
    const [List, setList]=useState(false);
    const [titleDialog, setTitleDialog] = useState(null);
    const [contentDialog, setContentDialog] = useState(null);
    const [btntext, setBtntext] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

  const CloseDialog = () => setDialogOpen(false);

    const [date_debut, setDateDebut] = useState({
        startDate: null,
        endDate: null
    });
    const handleToggleList=(state)=>{
        if(state==true){
            setList(true)

        }
    }
    const [date_fin, setDateFin] = useState({
        startDate: null,
        endDate: null
    });

    const { data, get, errors, processing, setData } = useForm({
        search: search?.search ?? '',
        date_debut: search?.date_debut ?? '',
        lieu: search?.lieu ?? '',
        heure_debut: search?.heure_debut ?? '',
        minute_debut: search?.minute_debut ?? '',
        date_fin: search?.date_fin ?? '',
        heure_fin: search?.heure_fin ?? '',
        minute_fin: search?.minute_fin ?? ''
    });
    useEffect(() => {
        let fdate_debut = DateToDbFormat(search.date_debut);
        setDateDebut({ startDate: fdate_debut, endDate: fdate_debut });
        let fdate_fin = DateToDbFormat(search.date_fin);
        setDateFin({ startDate: fdate_fin, endDate: fdate_fin });
    }, [])
    const handleDateDebutChange = (newValue) => {
        if (newValue) {
            const { startDate } = newValue;
            let year = getYearFromStringDate(startDate);
            if (startDate != '' && startDate != null && year != '1970') {
                setDateDebut(newValue);
                let frDate = DateToFront(startDate, 'fr', 'd/m/Y');
                setData("date_debut", frDate);
            } else {
                setDateDebut({
                    startDate: null,
                    endDate: null
                });
                setData("date_debut", '');
            }
        }
    }
    const showSupDialog = (title, content, btntxt) => {
        setBtntext(btntxt);
        setTitleDialog(title);
        setContentDialog(content);
        setDialogOpen(true)
      }
    const handleDateFinChange = (newValue) => {
        if (newValue) {
            const { startDate } = newValue;
            let year = getYearFromStringDate(startDate);
            if (startDate != '' && startDate != null && year != '1970') {
                setDateFin(newValue);
                let frDate = DateToFront(startDate, 'fr', 'd/m/Y');
                setData("date_fin", frDate);
            } else {
                setDateDebut({
                    startDate: null,
                    endDate: null
                });
                setData("date_debut", '');
            }
        }
    }
    function getYearFromStringDate(dateStr) {
        if (dateStr == null) { return null; }
        var dateObj = new Date(dateStr);
        var annee = dateObj.getFullYear();
        return annee;
    }
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setData(id, value);
    };
    const handleSearch = (e) => {
        e.preventDefault();
        get(route('front.location.search'), data, {
            onSuccess: () => {
                //alert('Ok')
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    }
    return (
        <FrontLayout>
            <PageTitle head={false} title={page_title}>
                <FrontBreadcrumbs pages={[{ 'url': route("front.locations"), 'page': ("Locations") }, { 'url': "", 'page': ("Recherche...") }]} />

            </PageTitle>
            
            <div className="bg-white dark:bg-gray-700 shadow md:shadow-inner__mt-[1px]">
            <ModalInfo
                title={titleDialog}
                content={contentDialog}
                showFunction={dialogOpen}
                closeFunction={CloseDialog}
                btntext={btntext}
            />
                <div className="max-w-screen-xl mx-auto px-4 ">
                    <div className="py-6">
                        <div className="  transition-all duration-500  z-10   _pb-10">
                            <div className=" flex  rounded-md flex-wrap  bg-yellow-500 shadow  w-full  p-2 md:p-1">
                                <form onSubmit={handleSearch} className='grid grid-cols-12 w-full  gap-2'>
                                    <div className="col-span-12 lg:col-span-10 grid grid-cols-12 gap-2 lg:gap-0">
                                        <div className="col-span-12 lg:col-span-4 flex">
                                            <input required
                                                type="text"
                                                id='lieu'
                                                value={data.lieu}
                                                onChange={handleInputChange}
                                                className="border text-gray-800  inset-4 border-slate-100 focus:ring-0 text-xl rounded-sm w-full"
                                                placeholder="Saisir le lieu de location...."
                                            />
                                        </div>
                                        <div className="col-span-12 sm:col-span-8 lg:col-span-2 lg:ms-2 border-0  flex">
                                            <Datepicker
                                                required
                                                id="date_debut"
                                                asSingle={true}
                                                useRange={false}
                                                inputClassName="w-full rounded-sm focus:ring-0 font-normal py-4 border border-white dark:placeholder:text-slate-100"
                                                value={date_debut}
                                                minDate={new Date()}
                                                onChange={handleDateDebutChange}
                                                i18n={i18n.language}
                                                displayFormat={"DD/MM/YYYY"}
                                                placeholder={"Date début..."}
                                            />
                                        </div>
                                        <div className="col-span-12 md:ms-1 sm:col-span-4 text-black lg:col-span-2 grid grid-cols-2">
                                            <select required id='heure_debut'
                                                onChange={handleInputChange}
                                                value={data.heure_debut} className='text-sm pe-0  rounded-sm border-0 rounded-0 bg-white'>
                                                <option value=''>Heure</option>
                                                {default_heures.map((v) =>
                                                    <option key={v} value={v}>{v > 9 ? v : '0' + v}H</option>

                                                )}
                                            </select>
                                            <select required
                                                onChange={handleInputChange}
                                                id='minute_debut' value={data.minute_debut} className='text-md border-slate-100  rounded-sm -ms-1 border-l-white'>
                                                <option value=''>min</option>
                                                {default_minutes.map((v) =>
                                                    <option key={v} value={v}>{v > 9 ? v : '0' + v}</option>
                                                )}
                                            </select>
                                        </div>
                                        <div className="col-span-12 sm:col-span-8 lg:col-span-2 flex lg:ms-2">
                                            <Datepicker
                                                required
                                                minDate={new Date()}
                                                id="date_fin"
                                                asSingle={true}
                                                useRange={false}
                                                inputClassName="w-full rounded-sm focus:ring-0 font-normal py-4 border border-white dark:placeholder:text-slate-100"
                                                value={date_fin}
                                                onChange={handleDateFinChange}
                                                i18n={i18n.language}
                                                displayFormat={"DD/MM/YYYY"}
                                                placeholder={"Date fin"}
                                            />
                                        </div>
                                        <div className="col-span-12 sm:col-span-4 md:ms-1 text-black lg:col-span-2 grid grid-cols-2">
                                            <select
                                                required
                                                onChange={handleInputChange} id='heure_fin' value={data.heure_fin} className='text-sm  pe-0 border rounded-sm border-white bg-white '>
                                                <option value=''>Heure</option>
                                                {default_heures.map((v) =>
                                                    <option key={v}>{v}H</option>
                                                )}
                                            </select>
                                            <select
                                                required
                                                onChange={handleInputChange} id='minute_fin' value={data.minute_fin} className='text-md border-slate-100 rounded-sm -ms-1 border-l-white'>
                                                <option value=''>min</option>
                                                {default_minutes.map((v) =>
                                                    <option key={v}>{v > 9 ? v : '0' + v}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-span-12 lg:col-span-2 text-end">
                                        <button className="px-4 mx-auto justify-center text-center py-3.5 items-center text-xl text-white bg-gray-900 flex rounded-sm w-full">
                                            <AiOutlineSearch className='me-1' />   Rechercher
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-gray-50 py-4 pb-12 border-b '>
                <div className="max-w-screen-xl mx-auto px-4 ">
                    {locations?.data?.length > 0 &&
                        <div className=''>
                            <div className="flex justify-between">
                                <div>
                                    {local?.length > 0 && <div className="md:text-lg font-bold">Disponibilités pour vos voyages sur :

                                        {local.map(({ id, nom }, index) => (index == 0 ? <span key={index} className='text-blue-500 hover:text-gray-800 mx-1'>
                                        <Link href={route("front.location.search",
                                                            {
                                                                lieu: nom,
                                                                date_debut: search?.date_debut,
                                                                heure_debut: search?.heure_debut,
                                                                minute_debut: search?.minute_debut,
                                                                date_fin: search?.date_fin,
                                                                heure_fin: search?.heure_fin,
                                                                minute_fin: search?.minute_fin,
                                                            })}>{nom}</Link>
                                            </span> : <span key={index} className='text-blue-500 hover:text-gray-800'>
                                            <Link href={route("front.location.search",
                                                            {
                                                                lieu: nom,
                                                                date_debut: search?.date_debut,
                                                                heure_debut: search?.heure_debut,
                                                                minute_debut: search?.minute_debut,
                                                                date_fin: search?.date_fin,
                                                                heure_fin: search?.heure_fin,
                                                                minute_fin: search?.minute_fin,
                                                            })}>{", " + nom}</Link></span>))}</div>
                                    } </div>
                                <div>
                                <div>
                                <ButtonGroup size='md' className='border border-slate-100' variant="outlined">
                                    <Button onClick={()=>setList(true)} className={List===true?active_gclass:''}><FaRegRectangleList /></Button>
                                    <Button onClick={()=>setList(false)}  className={List===false?active_gclass:''}><TfiLayoutListLargeImage /></Button>
                                </ButtonGroup>
                                </div>
                                </div>
                            </div>
                            {List==true ?                           
                            <div className="car-vehicules overflow-auto mt-6 mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                                {locations?.data?.length > 0 && locations?.data?.map(({ voiture, id, tarif_location_heure,
                                    tarif_location_journalier, tarif_location_hebdomadaire,
                                    tarif_location_mensuel, points_retrait
                                }, index) =>
                               
                                    <LocaVoitureCard
                                        id={id}
                                        nb_personne={voiture?.nombre_place}
                                        type_boite={voiture?.type_transmission}
                                        vitesse={voiture?.nombre_vitesse}
                                        nb_grande_valise={voiture?.nombre_grande_valise}
                                        nb_petite_valise={voiture?.nombre_petite_valise}
                                        volume_coffre={voiture?.volume_coffre}
                                        marque={voiture?.marque?.nom}
                                        categorie={voiture?.nombre_petite_valise}
                                        nom={voiture?.nom}
                                        carburant={voiture?.type_carburant?.nom}
                                        photo={voiture?.photo}
                                        points={points_retrait}
                                        puissance={voiture?.puissance_moteur}
                                        tarif={setTarif(tarif_location_heure, tarif_location_journalier, tarif_location_hebdomadaire, tarif_location_mensuel)}
                                        key={index} />
                                        
                                )}
                            </div>
                            :
                            <div className='py-6'>
                                {locations?.data?.length > 0 && locations?.data?.map(({ voiture, id, tarif_location_heure,
                                    tarif_location_journalier, tarif_location_hebdomadaire,
                                    tarif_location_mensuel, points_retrait, conditions, description
                                }, index) =>
                               
                                    
                                <LocaVoitureCard2
                                id={id}
                                nb_personne={voiture?.nombre_place}
                                type_boite={voiture?.type_transmission}
                                vitesse={voiture?.nombre_vitesse}
                                nb_grande_valise={voiture?.nombre_grande_valise}
                                nb_petite_valise={voiture?.nombre_petite_valise}
                                volume_coffre={voiture?.volume_coffre}
                                marque={voiture?.marque?.nom}
                                categorie={voiture?.nombre_petite_valise}
                                nom={voiture?.nom}
                                carburant={voiture?.type_carburant?.nom}
                                photo={voiture?.photo}
                                points={points_retrait}
                                showInfoFunc={() => showSupDialog("Conditions de location", "<div class='font-bold text-xl text-red-500 mb-2 '>" + voiture?.nom + "</div>" + conditions ?? '' + " <hr/> " + description ?? '', "Compris")}
                                nb_images={voiture?.location_medias?.length}
                                puissance={voiture?.puissance_moteur}
                                tarif={setTarif(tarif_location_heure, tarif_location_journalier, tarif_location_hebdomadaire, tarif_location_mensuel)}
                                key={index} 
                                
                                date_debut={formaterDateHeure(data?.date_debut,data?.heure_debut,data?.minute_debut)}
                                date_fin={formaterDateHeure(data?.date_fin,data?.heure_fin, data?.minute_fin)}
                                theure={tarif_location_heure}
                                tjour={tarif_location_journalier}
                                thebdo={tarif_location_hebdomadaire}
                                tmois={tarif_location_mensuel}
                                
                                />
                                        
                                )}

                            </div>
                            }
                            <div >
                                <Pagination className={"py-2"} links={locations.links} />
                            </div>
                        </div>
                    }
                    {(locations?.data == null || locations?.data?.length === 0) &&
                        <div className='p-10 md:py-28 bg-white border  shadow-md mb-12 mx-auto text-center  rounded-lg'>
                            <FaCarCrash className='h-60 w-60 mx-auto  mb-4 text-slate-200' />
                            <span className='text-slate-500'>Aucune voiture ne correspond à vos critères de recherche !</span>
                            <div className='font-bold'>Veuillez réessayer en choississant d'autres paramètres</div>

                        </div>
                    }
                </div>


            </div>
            {first_ville != null && first_ville?.id != null &&
                <div className="max-w-screen-xl mx-auto px-4 md:-mt-8 mt-4 md:mb-12">
                    <div className="md:grid md:grid-cols-12">
                        <div className='md:col-span-8 border bg-white rounded-md shadow-md'>
                            <div className='p-4 overflow-auto'>
                                <div className="flex flex-wrap gap-4 pb-4 md:border-b">
                                    <div>
                                        <ModaleShow title={"Photo de a ville de " + first_ville?.nom} url={HTTP_FRONTEND_HOME + '' + first_ville?.photo}>
                                            <LazyLoadImage effect='blur' src={HTTP_FRONTEND_HOME + '' + first_ville?.photo} alt={first_ville?.nom} className='object-contain  w-auto hover:shadow-lg rounded-md shadow' />
                                        </ModaleShow>
                                    </div>
                                    <div className=''>

                                        <h2 className="font-bold text-xl">{first_ville?.nom}</h2>
                                        {first_ville?.ville != null &&
                                            <div className="flex text-sm text-slate-500 flex-wrap">
                                                <span className="font-bold me-2">Ville : </span>
                                                <span>{first_ville?.ville}</span>
                                            </div>
                                        }
                                        {first_ville?.commune != null &&
                                            <div className="flex text-sm text-slate-500 flex-wrap">
                                                <span className="font-bold me-2">Commune : </span>
                                                <span>{first_ville?.commune}</span>
                                            </div>
                                        }
                                        {first_ville?.departement != null &&

                                            <div className="flex text-sm text-slate-500 flex-wrap">
                                                <span className="font-bold me-2">Département : </span>
                                                <span>{first_ville?.departement}</span>
                                            </div>
                                        }


                                    </div>
                                </div>
                                {first_ville?.description != null &&

                                    <div className='py-2 text-lg' dangerouslySetInnerHTML={{ __html: first_ville?.description }}></div>
                                }
                                {first_ville?.adresse != null &&
                                    <>
                                        <h2 className="font-bold mt-4 py-2">Adresse</h2>
                                        <div className='rounded-xl object-contain' dangerouslySetInnerHTML={{ __html: first_ville?.adresse }}></div>
                                    </>
                                }

                            </div>
                        </div>
                        <div className='md:col-span-4'>
                            {locals?.length > 0 &&
                                <div className="py-8">
                                    <div className="max-w-screen-xl  mx-auto px-4 py-8">
                                        <h2 className='font-bold mb-4 text-slate-500'>Autres villes qui pourraient vous intéresser</h2>
                                        <div className="flex flex-col gap-4 ">
                                            {locals?.length > 0 && locals?.map(({ id, nom, ville, photo, description }, index) => (
                                                <div key={index} className='flex flex-wrap transition-all duration-300 gap-2'>
                                                    <div className="img">
                                                        <Link href={route("front.location.search",
                                                            {
                                                                lieu: nom,
                                                                date_debut: search?.date_debut,
                                                                heure_debut: search?.heure_debut,
                                                                minute_debut: search?.minute_debut,
                                                                date_fin: search?.date_fin,
                                                                heure_fin: search?.heure_fin,
                                                                minute_fin: search?.minute_fin,
                                                            })}>
                                                            <LazyLoadImage effect='blur' src={HTTP_FRONTEND_HOME + '' + photo} alt={nom} className='object-contain w-24 hover:shadow-lg rounded-md shadow' /></Link>
                                                    </div>
                                                    <div>
                                                        <Link href={route("front.location.search", {
                                                            lieu: nom,
                                                            date_debut: search?.date_debut,
                                                            heure_debut: search?.heure_debut,
                                                            minute_debut: search?.minute_debut,
                                                            date_fin: search?.date_fin,
                                                            heure_fin: search?.heure_fin,
                                                            minute_fin: search?.minute_fin,
                                                        })}>  <h2 className="text-md hover:text-blue-500 font-bold">{nom}</h2>
                                                            <p className="text-slate-600 text-sm">{ville}</p></Link>
                                                    </div>
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
            {first_ville == null && locals?.length > 0 &&
                <div className="shadow-inner">
                    <div className="max-w-screen-xl  mx-auto px-4 py-8">
                        <h2 className='font-bold mb-4 text-slate-500'>Autres villes qui pourraient vous intéresser</h2>
                        <div className="flex flex-wrap gap-8 ">
                            {locals?.length > 0 && locals?.map(({ id, nom, ville, photo, description }, index) => (
                                <div key={index} className='flex flex-wrap transition-all duration-300 gap-2'>
                                    <div className="img">
                                        <Link href={route("front.location.search",
                                            {
                                                lieu: nom,
                                                date_debut: search?.date_debut,
                                                heure_debut: search?.heure_debut,
                                                minute_debut: search?.minute_debut,
                                                date_fin: search?.date_fin,
                                                heure_fin: search?.heure_fin,
                                                minute_fin: search?.minute_fin,
                                            })}>
                                            <LazyLoadImage effect='blur' src={HTTP_FRONTEND_HOME + '' + photo} alt={nom} className='object-contain h-14 w-full hover:shadow-lg rounded-md shadow' /></Link>
                                    </div>
                                    <div>
                                        <Link href={route("front.location.search", {
                                            lieu: nom,
                                            date_debut: search?.date_debut,
                                            heure_debut: search?.heure_debut,
                                            minute_debut: search?.minute_debut,
                                            date_fin: search?.date_fin,
                                            heure_fin: search?.heure_fin,
                                            minute_fin: search?.minute_fin,
                                        })}>  <h2 className="text-md hover:text-blue-500 font-bold">{nom}</h2>
                                            <p className="text-slate-600 text-sm">{ville}</p></Link>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            }
        </FrontLayout>
    )
}
