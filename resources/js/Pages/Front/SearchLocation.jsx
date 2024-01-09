import React from 'react'
  
import FrontLayout from '@/Layouts/FrontLayout'
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs'
import PageTitle from '@/components/front/PageTitle'
import { LocaVoitureCard, MiniCard } from '@/components/locations/LocaVoitureCard';
import { useState } from 'react';;


import "../../Index.css"


/**Icones */
import { FiShoppingCart } from "react-icons/fi";
import { FaCarAlt } from "react-icons/fa";
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
import { DateToDbFormat, DateToFront, default_heures, default_minutes, setTarif } from '@/tools/utils';
import i18n from '@/i18n';
export default function SearchLocation({search,locations,page_title}) {
    const [date_debut, setDateDebut] = useState({
        startDate: null,
        endDate: null
    });

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
    useEffect(()=>{
        let fdate_debut= DateToDbFormat(search.date_debut);
        setDateDebut({startDate: fdate_debut,endDate: fdate_debut});
        let fdate_fin= DateToDbFormat(search.date_debut);
        setDateFin({startDate: fdate_fin,endDate: fdate_fin});
        console.log(date_debut);
    },[])
    const handleDateDebutChange = (newValue) => {
        if (newValue) {
            const { startDate } = newValue;
            console.log(newValue);
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
    const handleDateFinChange = (newValue) => {
        if (newValue) {
            const { startDate } = newValue;
            console.log(newValue);
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
        if(dateStr==null){return null;}
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
                <div className="max-w-screen-xl mx-auto px-4 ">
                    <div className="py-6">
                
                
                    <div className="  transition-all duration-500  z-10   _pb-10">
                    <div className=" flex  rounded-md flex-wrap  bg-yellow-500 shadow  w-full  p-2 md:p-1">
                        <form onSubmit={handleSearch} className='grid grid-cols-12 w-full  gap-2'>
{console.log(search)}
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
            <div className='bg-slate-50 py-4'>
                <div className="max-w-screen-xl mx-auto px-4 ">

                    <div className="car-vehicules overflow-auto mt-6 mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                    {locations?.length>0 && locations?.map(({voiture,id,tarif_location_heure,
                    tarif_location_journalier,tarif_location_hebdomadaire,
                    tarif_location_mensuel, points_retrait
                }, index) =>
                        <LocaVoitureCard   
                        id={id}
                        nb_personne={voiture?.nombre_place}
                        type_boite ={voiture?.type_transmission} 
                        vitesse={voiture?.nombre_vitesse}
                        nb_grande_valise={voiture?.nombre_grande_valise}
                        nb_petite_valise={voiture?.nombre_petite_valise}
                        volume_coffre={voiture?.volume_coffre}
                        marque={voiture?.marque?.nom}
                        categorie ={voiture?.nombre_petite_valise}
                        nom={voiture?.nom} 
                        carburant={voiture?.type_carburant?.nom} 
                        photo={voiture?.photo} 
                        points={points_retrait}
                        puissance={voiture?.puissance_moteur} 
                        tarif={setTarif(tarif_location_heure,tarif_location_journalier,tarif_location_hebdomadaire,tarif_location_mensuel)} 
                        key={index}/>
                        )}
                </div>
                    </div>
                    </div>
        </FrontLayout>
    )
}
